import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeSalesCycle,
  computeTimePerStage,
  computeBottleneck,
  computeVelocityTrend,
} from "@/lib/scoring/metrics/velocity";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const overallSalesCycle = computeSalesCycle(data.deals, filter);
  const byStage = computeTimePerStage(data.deals, data.stages, filter);
  const bottleneck = computeBottleneck(data.deals, data.stages, filter);
  const velocityTrend = computeVelocityTrend(data.deals, filter);

  return {
    overallSalesCycle,
    byStage,
    bottleneck,
    velocityTrend,
  };
});
