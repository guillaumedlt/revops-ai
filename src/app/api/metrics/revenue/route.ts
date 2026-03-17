import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeRevenueWon,
  computeRevenueByOwner,
  computeRevenueByAccount,
  computeRevenueForecast,
} from "@/lib/scoring/metrics/revenue";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const totalRevenue = computeRevenueWon(data.deals, filter);
  const byOwner = computeRevenueByOwner(data.deals, filter);
  const byAccount = computeRevenueByAccount(data.deals, data.companies, filter);
  const forecast = computeRevenueForecast(data.deals, 0, filter);

  return {
    totalRevenue,
    byOwner,
    byAccount,
    forecast,
  };
});
