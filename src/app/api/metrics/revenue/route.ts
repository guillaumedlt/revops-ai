import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeTotalRevenue,
  computeRevenueByOwner,
  computeRevenueByAccount,
  computeRevenueForecast,
} from "@/lib/scoring/metrics/revenue";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const totalRevenue = computeTotalRevenue(data.deals, filter);
  const byOwner = computeRevenueByOwner(data.deals, filter);
  const byAccount = computeRevenueByAccount(data.deals, data.companies, filter);
  const forecast = computeRevenueForecast(data.deals, filter);

  return {
    totalRevenue,
    byOwner,
    byAccount,
    forecast,
  };
});
