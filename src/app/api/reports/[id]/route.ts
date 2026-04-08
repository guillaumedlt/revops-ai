import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { AGENTS } from "@/lib/ai/agents";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var supabase = createAdminClient();
  var { data: job } = await supabase
    .from("report_jobs")
    .select("id, tenant_id, status, agent_ids, progress, final_text, final_blocks, error_message, error_code, created_at, completed_at, retry_count")
    .eq("id", params.id)
    .single();

  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  if (job.tenant_id !== auth.tenantId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // If job is stuck (pending or running but not locked), kick the worker
  // This is the "self-healing" mechanism for the hobby plan (no minute-level cron)
  var needsKick = false;
  if (job.status === "pending") needsKick = true;
  if (job.status === "running") {
    // Check if any agent is still pending
    var pg = (job.progress || {}) as Record<string, any>;
    for (var k in pg) {
      if (pg[k].status === "pending") { needsKick = true; break; }
    }
  }
  if (needsKick) {
    // Fire-and-forget worker trigger
    fetch(new URL("/api/cron/process-reports?jobId=" + job.id, request.url).toString(), {
      method: "POST",
      headers: { Authorization: "Bearer " + (process.env.CRON_SECRET || "") },
    }).catch(function() {});
  }

  // Build agent metadata for the frontend
  var agents = (job.agent_ids as string[]).map(function(id) {
    var profile = AGENTS[id];
    var p = (job.progress as any)[id] || { status: "pending" };
    return {
      id: id,
      name: profile?.name || id,
      emoji: profile?.emoji || "🤖",
      color: profile?.color || "#999",
      status: p.status,
      text: p.text || "",
      error: p.error || null,
      toolCalls: (p.toolCalls || []).length,
    };
  });

  return NextResponse.json({
    data: {
      jobId: job.id,
      status: job.status,
      agents: agents,
      finalText: job.final_text,
      finalBlocks: job.final_blocks,
      error: job.error_message,
      errorCode: job.error_code,
      createdAt: job.created_at,
      completedAt: job.completed_at,
      retryCount: job.retry_count,
    },
  });
}
