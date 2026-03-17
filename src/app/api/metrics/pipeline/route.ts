import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computePipelineValue,
  computePipelineByStage,
  computePipelineByOwner,
  computeWeightedPipeline,
  computePipelineCoverage,
  computeAverageDealSize,
  computeStalledDeals,
  computeNewPipeline,
} from "@/lib/scoring/metrics/pipeline";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const pipelineValue = computePipelineValue(data.deals, filter);
  const pipelineByStage = computePipelineByStage(data.deals, filter);
  const pipelineByOwner = computePipelineByOwner(data.deals, filter);
  const weightedPipeline = computeWeightedPipeline(data.deals, filter);
  const pipelineCoverage = computePipelineCoverage(data.deals, 0, filter);
  const averageDealSize = computeAverageDealSize(data.deals, filter);
  const stalledDeals = computeStalledDeals(data.deals, filter);
  const newPipeline = computeNewPipeline(data.deals, filter);

  return {
    pipelineValue,
    pipelineByStage,
    pipelineByOwner,
    weightedPipeline,
    pipelineCoverage,
    averageDealSize,
    stalledDeals,
    newPipeline,
  };
});
