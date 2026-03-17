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

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  try {
    const supabase = createAdminClient();

    // Fetch latest daily score for this tenant
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

    // Fetch previous score for trend
    const { data: prevScores } = await supabase
      .from("daily_scores")
      .select("*")
      .eq("tenant_id", auth.tenantId)
      .order("computed_at", { ascending: false })
      .range(1, 1);

    const prev = prevScores?.[0];

    function getTrend(current: number, previous: number | undefined): "improving" | "stable" | "declining" {
      if (previous === undefined) return "stable";
      const diff = current - previous;
      if (diff > 2) return "improving";
      if (diff < -2) return "declining";
      return "stable";
    }

    // Default scores if no daily_scores exist yet
    const dataQualityScore = latestScore?.data_quality_score ?? 0;
    const engagementScore = latestScore?.engagement_score ?? 0;
    const forecastScore = latestScore?.forecast_score ?? 0;
    const velocityScore = latestScore?.velocity_score ?? 0;
    const overallScore = latestScore?.overall_score ?? 0;

    const prevDataQuality = prev?.data_quality_score;
    const prevEngagement = prev?.engagement_score;
    const prevForecast = prev?.forecast_score;
    const prevVelocity = prev?.velocity_score;

    // Build risk areas and recommendations
    const potentialRiskAreas: string[] = [];
    const recommendations: string[] = [];

    if (dataQualityScore < 60) {
      potentialRiskAreas.push("Low data quality — many records have missing fields");
      recommendations.push("Run a data cleanup to fill critical fields (email, phone, company)");
    }
    if (engagementScore < 60) {
      potentialRiskAreas.push("Low engagement — deals are not receiving enough activity");
      recommendations.push("Increase deal touches to 5+ per month");
    }
    if (forecastScore < 60) {
      potentialRiskAreas.push("Forecast accuracy is below target");
      recommendations.push("Review and update close dates on open deals weekly");
    }
    if (velocityScore < 60) {
      potentialRiskAreas.push("Sales cycle is longer than expected");
      recommendations.push("Identify and address pipeline bottleneck stages");
    }

    const result = {
      overallScore,
      lastUpdated: latestScore?.computed_at ?? new Date().toISOString(),
      dimensions: {
        dataQuality: {
          score: dataQualityScore,
          status: scoreToStatus(dataQualityScore),
          trend: getTrend(dataQualityScore, prevDataQuality),
        },
        engagement: {
          score: engagementScore,
          status: scoreToStatus(engagementScore),
          trend: getTrend(engagementScore, prevEngagement),
          avgActivitiesPerDeal: latestScore?.avg_activities_per_deal ?? 0,
        },
        forecast: {
          score: forecastScore,
          status: scoreToStatus(forecastScore),
          trend: getTrend(forecastScore, prevForecast),
          forecastAccuracy: latestScore?.forecast_accuracy ?? 0,
        },
        velocity: {
          score: velocityScore,
          status: scoreToStatus(velocityScore),
          trend: getTrend(velocityScore, prevVelocity),
          avgSalesCycleDays: latestScore?.avg_sales_cycle_days ?? 0,
        },
      },
      domainHealth: {
        potentialRiskAreas,
        recommendations,
      },
    };

    return NextResponse.json(apiSuccess(result));
  } catch (error) {
    console.error("Adoption score route error:", error);
    return NextResponse.json(
      apiError(error instanceof Error ? error.message : "Internal server error"),
      { status: 500 }
    );
  }
}
