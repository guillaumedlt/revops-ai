import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

function scoreToStatus(score: number): "excellent" | "good" | "fair" | "poor" {
  if (score >= 90) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "fair";
  return "poor";
}

function getTrend(current: number, previous: number | undefined): "improving" | "stable" | "declining" {
  if (previous === undefined) return "stable";
  const diff = current - previous;
  if (diff > 2) return "improving";
  if (diff < -2) return "declining";
  return "stable";
}

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  try {
    const supabase = createAdminClient();

    const { data: latestScore, error: scoreError } = await supabase
      .from("daily_scores")
      .select("*")
      .eq("tenant_id", auth.tenantId)
      .order("computed_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (scoreError) {
      return NextResponse.json(apiError(scoreError.message), { status: 500 });
    }

    const { data: prevScores } = await supabase
      .from("daily_scores")
      .select("*")
      .eq("tenant_id", auth.tenantId)
      .order("computed_at", { ascending: false })
      .range(1, 1);

    const prev = prevScores?.[0];

    const overallScore = latestScore?.adoption_score ?? 0;
    const dataQualityScore = latestScore?.data_discipline_score ?? 0;
    const pipelineRigorScore = latestScore?.pipeline_rigor_score ?? 0;
    const activityScore = latestScore?.activity_logging_score ?? 0;
    const processScore = latestScore?.process_adherence_score ?? 0;
    const toolScore = latestScore?.tool_usage_score ?? 0;

    const potentialRiskAreas: string[] = [];
    const recommendations: string[] = [];

    if (dataQualityScore < 60) {
      potentialRiskAreas.push("Qualite des donnees insuffisante");
      recommendations.push("Completer les champs manquants sur les deals");
    }
    if (pipelineRigorScore < 60) {
      potentialRiskAreas.push("Pipeline peu rigoureux");
      recommendations.push("Traiter les deals stalled et mettre a jour les close dates");
    }
    if (activityScore < 60) {
      potentialRiskAreas.push("Volume d activite faible");
      recommendations.push("Augmenter les touches par deal a 5+ par mois");
    }

    return NextResponse.json(apiSuccess({
      overallScore,
      grade: latestScore ? undefined : "N/A",
      lastUpdated: latestScore?.computed_at ?? new Date().toISOString(),
      dataDiscipline: dataQualityScore,
      pipelineRigor: pipelineRigorScore,
      activityLogging: activityScore,
      processAdherence: processScore,
      toolUsage: toolScore,
      dimensions: {
        dataQuality: { score: dataQualityScore, status: scoreToStatus(dataQualityScore), trend: getTrend(dataQualityScore, prev?.data_discipline_score) },
        pipelineRigor: { score: pipelineRigorScore, status: scoreToStatus(pipelineRigorScore), trend: getTrend(pipelineRigorScore, prev?.pipeline_rigor_score) },
        activityLogging: { score: activityScore, status: scoreToStatus(activityScore), trend: getTrend(activityScore, prev?.activity_logging_score) },
        processAdherence: { score: processScore, status: scoreToStatus(processScore), trend: getTrend(processScore, prev?.process_adherence_score) },
        toolUsage: { score: toolScore, status: scoreToStatus(toolScore), trend: getTrend(toolScore, prev?.tool_usage_score) },
      },
      domainHealth: { potentialRiskAreas, recommendations },
    }));
  } catch (error) {
    console.error("Adoption score route error:", error);
    return NextResponse.json(apiError(error instanceof Error ? error.message : "Internal server error"), { status: 500 });
  }
}
