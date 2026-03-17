import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeDataQualityScore,
  computeMissingFields,
  computeDuplicates,
  computeStaleness,
} from "@/lib/scoring/metrics/data-quality";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const overallScore = computeDataQualityScore(data, filter);
  const missingFields = computeMissingFields(data, filter);
  const duplicates = computeDuplicates(data, filter);
  const staleness = computeStaleness(data, filter);

  const score = overallScore.score;
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";

  return {
    overallScore: score,
    grade,
    lastAudit: new Date().toISOString(),
    missingFields,
    duplicates,
    staleness,
    recommendations: overallScore.recommendations,
    trend: overallScore.trend,
  };
});
