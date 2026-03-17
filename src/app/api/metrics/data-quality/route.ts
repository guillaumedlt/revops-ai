import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeDataQualityScore,
  computeFieldCompleteness,
  computeDuplicates,
  computePipelineHygiene,
} from "@/lib/scoring/metrics/data-quality";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const overallScore = computeDataQualityScore(data.deals, data.contacts, filter);
  const fieldCompleteness = computeFieldCompleteness(data.deals, filter);
  const duplicates = computeDuplicates(data.contacts, data.companies, data.deals, filter);
  const pipelineHygiene = computePipelineHygiene(data.deals, filter);

  return {
    overallScore: overallScore.value,
    grade: overallScore.value >= 90 ? "A" : overallScore.value >= 80 ? "B" : overallScore.value >= 70 ? "C" : overallScore.value >= 60 ? "D" : "F",
    lastAudit: new Date().toISOString(),
    fieldCompleteness,
    duplicates,
    pipelineHygiene,
    alerts: overallScore.alerts,
    trend: overallScore.trend,
  };
});
