import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeOverallSalesCycle,
  computeVelocityByStage,
  computeBottlenecks,
  computeTimeDistribution,
} from "@/lib/scoring/metrics/velocity";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const overallSalesCycle = computeOverallSalesCycle(data.deals, filter);
  const byStage = computeVelocityByStage(data.deals, data.stages, filter);
  const bottlenecks = computeBottlenecks(data.deals, data.stages, filter);
  const timeDistribution = computeTimeDistribution(data.deals, filter);

  return {
    overallSalesCycle,
    byStage,
    bottlenecks,
    timeDistribution,
  };
});
