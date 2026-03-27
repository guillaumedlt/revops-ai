import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateAlerts } from "@/lib/alerts/engine";
import { computeAdoptionScore } from "@/lib/scoring/adoption-score";
import { computeDataQualityScore } from "@/lib/scoring/metrics/data-quality";
import { computeStalledDeals, computeInactiveDeals } from "@/lib/scoring/metrics/pipeline";
import { computeUnworkedDeals } from "@/lib/scoring/metrics/activity";
import { computePipelineHygiene, computeDealsNoAmount, computeOverdueDeals, computeDealsNoContact, computeDealsNoCompany, computeFieldCompleteness, computeClosedDealCompleteness } from "@/lib/scoring/metrics/data-quality";
import { computeUnworkedLeads } from "@/lib/scoring/metrics/lead-management";
import type { DealRow, ContactRow, PipelineStageRow, MetricResult } from "@/types/metrics";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: connections } = await supabase
    .from("hubspot_connections")
    .select("tenant_id")
    .neq("sync_status", "error");

  if (!connections?.length) {
    return NextResponse.json({ message: "No tenants to score", scored: 0 });
  }

  const results = [];

  for (const { tenant_id } of connections) {
    try {
      const [
        { data: deals },
        { data: contacts },
        { data: stages },
      ] = await Promise.all([
        supabase.from("hs_deals").select("*").eq("tenant_id", tenant_id),
        supabase.from("hs_contacts").select("*").eq("tenant_id", tenant_id),
        supabase.from("hs_pipeline_stages").select("*").eq("tenant_id", tenant_id),
      ]);

      const d = (deals ?? []) as unknown as DealRow[];
      const c = (contacts ?? []) as unknown as ContactRow[];
      const s = (stages ?? []) as unknown as PipelineStageRow[];

      // Compute key metrics for adoption score inputs
      const metricResults: Record<string, MetricResult> = {};
      metricResults["data_quality_score"] = computeDataQualityScore(d, c);
      metricResults["deals_no_amount"] = computeDealsNoAmount(d);
      metricResults["overdue_deals"] = computeOverdueDeals(d);
      metricResults["deals_no_contact"] = computeDealsNoContact(d);
      metricResults["deals_no_company"] = computeDealsNoCompany(d);
      metricResults["field_completeness"] = computeFieldCompleteness(d);
      metricResults["pipeline_hygiene"] = computePipelineHygiene(d);
      metricResults["stalled_deals"] = computeStalledDeals(d);
      metricResults["inactive_deals"] = computeInactiveDeals(d);
      metricResults["unworked_deals"] = computeUnworkedDeals(d);
      metricResults["unworked_leads"] = computeUnworkedLeads(c);
      metricResults["closed_deal_completeness"] = computeClosedDealCompleteness(d);

      const adoption = computeAdoptionScore(d, c, s, metricResults);

      const today = new Date().toISOString().split("T")[0];

      await supabase.from("daily_scores").upsert(
        {
          tenant_id,
          score_date: today,
          adoption_score: adoption.overall,
          data_discipline_score: adoption.dataDiscipline,
          pipeline_rigor_score: adoption.pipelineRigor,
          activity_logging_score: adoption.activityLogging,
          process_adherence_score: adoption.processAdherence,
          tool_usage_score: adoption.toolUsage,
          domain_data_quality: metricResults["data_quality_score"].value,
          domain_pipeline: metricResults["pipeline_hygiene"].value,
          metrics_snapshot: metricResults,
          computed_at: new Date().toISOString(),
        },
        { onConflict: "tenant_id,score_date" }
      );

      // Generate proactive alerts
      var alertResult = await generateAlerts(tenant_id);

      results.push({
        tenant_id,
        success: true,
        score: adoption.overall,
        grade: adoption.grade,
        alerts: alertResult.generated,
      });
    } catch (error) {
      results.push({
        tenant_id,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return NextResponse.json({
    scored: results.length,
    results,
  });
}
