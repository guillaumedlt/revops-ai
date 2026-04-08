import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { selectAgents } from "@/lib/ai/agents";
import { checkCredits } from "@/lib/ai/credits";

var BodySchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  var parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // Check credits (report = 5 credits)
  var credits = await checkCredits(auth.tenantId, "report");
  if (!credits.allowed) {
    return NextResponse.json({
      error: "You have " + credits.remaining + " credits left, /report needs " + credits.cost + ".",
      errorCode: "INSUFFICIENT_CREDITS",
      errorTitle: "Out of credits",
      action: "Buy credits",
      actionUrl: "/settings?tab=billing",
    }, { status: 402 });
  }

  var supabase = createAdminClient();

  // Check Lemlist availability for agent selection
  var { data: lemlistConn } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();
  var hasLemlist = !!(lemlistConn?.settings as any)?.lemlist?.api_key;

  // Select agents based on the message
  var agentIds = selectAgents(parsed.data.message, hasLemlist);

  // If no multi-agent path matches, force the standard /report bundle
  if (agentIds.length === 0) {
    agentIds = ["pipeline", "performance", "data_quality", "forecast"];
    if (hasLemlist) agentIds.push("outreach");
  }

  // Initialize progress map
  var progress: Record<string, any> = {};
  for (var id of agentIds) {
    progress[id] = { status: "pending", text: "", error: null, toolCalls: [] };
  }

  // Create the job
  var { data: job, error: jobError } = await supabase
    .from("report_jobs")
    .insert({
      tenant_id: auth.tenantId,
      user_id: auth.userId,
      conversation_id: parsed.data.conversationId || null,
      message: parsed.data.message,
      agent_ids: agentIds,
      model: "claude-sonnet-4-6",
      status: "pending",
      progress: progress,
    })
    .select("id")
    .single();

  if (jobError || !job) {
    console.error("[reports/start] Failed to create job:", jobError);
    return NextResponse.json({ error: "Failed to start report" }, { status: 500 });
  }

  // Trigger immediate processing (best-effort, don't wait)
  fetch(new URL("/api/cron/process-reports?jobId=" + job.id, request.url).toString(), {
    method: "POST",
    headers: { Authorization: "Bearer " + (process.env.CRON_SECRET || "") },
  }).catch(function() {});

  return NextResponse.json({ data: { jobId: job.id, agentIds: agentIds } });
}
