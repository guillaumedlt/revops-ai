import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { runSingleAgent } from "@/lib/ai/run-single-agent";
import { AGENTS } from "@/lib/ai/agents";
import { SYSTEM_PROMPT, buildTenantContext } from "@/lib/ai/prompts/system";
import { getToolsForTenant } from "@/lib/connectors";
import { parseContentBlocks } from "@/lib/ai/parse-blocks";
import { deductCredit } from "@/lib/ai/credits";

export var maxDuration = 300; // 5 min Vercel max for hobby plan

// Authorization: cron secret OR explicit job trigger
function isAuthorized(request: NextRequest): boolean {
  var auth = request.headers.get("authorization");
  if (auth === "Bearer " + process.env.CRON_SECRET) return true;
  // Vercel cron sends this header automatically
  if (request.headers.get("x-vercel-cron")) return true;
  return false;
}

export async function GET(request: NextRequest) { return processReports(request); }
export async function POST(request: NextRequest) { return processReports(request); }

async function processReports(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  var supabase = createAdminClient();
  var workerId = "worker-" + Math.random().toString(36).slice(2, 10);
  var processed: string[] = [];

  // Optional: process a specific job (when triggered from /reports/start)
  var url = new URL(request.url);
  var specificJobId = url.searchParams.get("jobId");

  // Pick up to 1 job at a time (sequential to avoid rate limits)
  // If specific job requested, only that one. Otherwise oldest pending/running.
  var query = supabase
    .from("report_jobs")
    .select("*")
    .or("status.eq.pending,status.eq.running")
    .is("locked_at", null);

  if (specificJobId) query = query.eq("id", specificJobId);
  query = query.order("created_at", { ascending: true }).limit(1);

  var { data: jobs } = await query;
  if (!jobs || jobs.length === 0) {
    return NextResponse.json({ data: { processed: 0, message: "No jobs to process" } });
  }

  for (var job of jobs) {
    // Lock the job
    var { error: lockError } = await supabase
      .from("report_jobs")
      .update({ locked_at: new Date().toISOString(), locked_by: workerId, status: "running", updated_at: new Date().toISOString() })
      .eq("id", job.id)
      .is("locked_at", null);
    if (lockError) {
      console.warn("[worker] Could not lock job " + job.id + " (already locked)");
      continue;
    }

    try {
      await processJob(supabase, job);
      processed.push(job.id);
    } catch (e: any) {
      console.error("[worker] Job " + job.id + " crashed:", e);
      await supabase
        .from("report_jobs")
        .update({
          status: "failed",
          error_message: e?.message || "Worker crash",
          error_code: "WORKER_CRASH",
          locked_at: null,
          locked_by: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);
    }
  }

  return NextResponse.json({ data: { processed: processed.length, jobIds: processed } });
}

async function processJob(supabase: any, job: any) {
  var systemPrompt = (SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })).trim();
  var anthropicApiKey = process.env.ANTHROPIC_API_KEY || "";
  if (!anthropicApiKey) {
    await supabase.from("report_jobs").update({
      status: "failed",
      error_message: "Anthropic API key not configured",
      error_code: "ANTHROPIC_KEY_MISSING",
      locked_at: null,
    }).eq("id", job.id);
    return;
  }

  // Load tools for this tenant
  var allTools = await getToolsForTenant(job.tenant_id);

  var progress = (job.progress || {}) as Record<string, any>;
  var toolCache = (job.tool_cache || {}) as Record<string, any>;
  var agentIds = (job.agent_ids || []) as string[];
  var hadFailure = false;
  var hadSuccess = false;

  // Process each agent in order, skipping those already done
  for (var agentId of agentIds) {
    var agentProgress = progress[agentId] || { status: "pending" };

    // Skip if already done or skipped (from a previous worker run)
    if (agentProgress.status === "done") {
      hadSuccess = true;
      continue;
    }
    if (agentProgress.status === "failed") {
      hadFailure = true;
      continue;
    }

    var agent = AGENTS[agentId];
    if (!agent) {
      progress[agentId] = { status: "failed", text: "", error: "Unknown agent: " + agentId, toolCalls: [] };
      hadFailure = true;
      continue;
    }

    // Mark as running and persist
    progress[agentId] = { ...agentProgress, status: "running" };
    await supabase.from("report_jobs").update({
      progress: progress,
      updated_at: new Date().toISOString(),
    }).eq("id", job.id);

    // Run the agent
    var result;
    try {
      result = await runSingleAgent(
        agent,
        job.message,
        systemPrompt,
        allTools,
        anthropicApiKey,
        job.model || "claude-sonnet-4-6",
        job.tenant_id,
        toolCache,
      );
    } catch (e: any) {
      console.error("[worker] Agent " + agentId + " threw:", e);
      progress[agentId] = { status: "failed", text: "", error: e?.message || "Agent crashed", toolCalls: [] };
      hadFailure = true;
      // Persist and continue with next agent
      await supabase.from("report_jobs").update({
        progress: progress,
        tool_cache: toolCache,
        updated_at: new Date().toISOString(),
      }).eq("id", job.id);
      continue;
    }

    // Update tool cache with new entries
    Object.assign(toolCache, result.newCacheEntries);

    if (result.error) {
      progress[agentId] = { status: "failed", text: result.text || "", error: result.error, toolCalls: result.toolCalls };
      hadFailure = true;
      // If rate limit, leave job in running state so cron picks it up later
      if (result.errorCode === "RATE_LIMIT") {
        await supabase.from("report_jobs").update({
          progress: progress,
          tool_cache: toolCache,
          status: "running",
          locked_at: null, // Release lock so next cron can retry this agent
          locked_by: null,
          updated_at: new Date().toISOString(),
        }).eq("id", job.id);
        // Reset this agent to pending so it retries
        progress[agentId] = { status: "pending", text: "", error: null, toolCalls: [] };
        await supabase.from("report_jobs").update({ progress: progress }).eq("id", job.id);
        return; // Exit, let next cron run continue
      }
    } else {
      progress[agentId] = { status: "done", text: result.text, error: null, toolCalls: result.toolCalls };
      hadSuccess = true;
    }

    // Persist progress after each agent
    await supabase.from("report_jobs").update({
      progress: progress,
      tool_cache: toolCache,
      updated_at: new Date().toISOString(),
    }).eq("id", job.id);

    // Brief pause between agents to spread API load
    await new Promise(function(r) { setTimeout(r, 500); });
  }

  // All agents processed — consolidate
  var sections: string[] = [];
  for (var id of agentIds) {
    var p = progress[id];
    var a = AGENTS[id];
    if (!a) continue;
    if (p.status === "done" && p.text) {
      sections.push("## " + a.emoji + " " + a.name + "\n\n" + p.text);
    } else if (p.status === "failed") {
      sections.push("## " + a.emoji + " " + a.name + "\n\n*" + (p.error || "Failed") + "*");
    }
  }

  var finalText = sections.join("\n\n---\n\n");
  var finalBlocks = finalText ? parseContentBlocks(finalText) : null;

  var finalStatus = hadSuccess && !hadFailure ? "completed" : hadSuccess && hadFailure ? "partial" : "failed";

  await supabase.from("report_jobs").update({
    status: finalStatus,
    progress: progress,
    tool_cache: toolCache,
    final_text: finalText,
    final_blocks: finalBlocks,
    locked_at: null,
    locked_by: null,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("id", job.id);

  // Persist as a chat message + deduct credits if at least partially successful
  if (hadSuccess && job.conversation_id && finalText) {
    await supabase.from("messages").insert({
      conversation_id: job.conversation_id,
      tenant_id: job.tenant_id,
      role: "assistant",
      content: finalText,
      content_blocks: finalBlocks,
      model: "kairo-multi",
    });
    await deductCredit(job.tenant_id, job.user_id, "report");
  }
}
