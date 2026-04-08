import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var supabase = createAdminClient();
  var { data: job } = await supabase
    .from("report_jobs")
    .select("id, tenant_id, status, progress, retry_count, max_retries")
    .eq("id", params.id)
    .single();

  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  if (job.tenant_id !== auth.tenantId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (job.retry_count >= job.max_retries) return NextResponse.json({ error: "Max retries reached" }, { status: 400 });

  // Reset only failed agents back to "pending"
  var progress = job.progress as Record<string, any>;
  var resetCount = 0;
  for (var key in progress) {
    if (progress[key].status === "failed") {
      progress[key] = { status: "pending", text: "", error: null, toolCalls: [] };
      resetCount++;
    }
  }

  if (resetCount === 0) {
    return NextResponse.json({ error: "No failed agents to retry" }, { status: 400 });
  }

  await supabase
    .from("report_jobs")
    .update({
      status: "pending",
      progress: progress,
      retry_count: job.retry_count + 1,
      error_message: null,
      error_code: null,
      locked_at: null,
      locked_by: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", job.id);

  // Trigger immediate processing
  fetch(new URL("/api/cron/process-reports?jobId=" + job.id, request.url).toString(), {
    method: "POST",
    headers: { Authorization: "Bearer " + (process.env.CRON_SECRET || "") },
  }).catch(function() {});

  return NextResponse.json({ data: { jobId: job.id, retried: resetCount } });
}
