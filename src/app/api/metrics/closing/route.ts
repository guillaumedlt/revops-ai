import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeWinRate,
  computeWinRateByOwner,
  computeWinLossTrend,
  computeLostReasons,
  computeCompetitiveWinRate,
  computeDealSizeWonVsLost,
  computeRevenueLost,
} from "@/lib/scoring/metrics/closing";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const winRate = computeWinRate(data.deals, filter);
  const winRateByOwner = computeWinRateByOwner(data.deals, filter);
  const winLossTrend = computeWinLossTrend(data.deals, filter);
  const lostReasons = computeLostReasons(data.deals, filter);
  const competitiveWinRate = computeCompetitiveWinRate(data.deals, filter);
  const dealSizeWonVsLost = computeDealSizeWonVsLost(data.deals, filter);
  const revenueLost = computeRevenueLost(data.deals, filter);

  return {
    winRate,
    winRateByOwner,
    winLossTrend,
    lostReasons,
    competitiveWinRate,
    dealSizeWonVsLost,
    revenueLost,
  };
});
