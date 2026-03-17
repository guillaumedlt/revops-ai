import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeLeadVolume,
  computeLeadsBySource,
  computeConversionFunnel,
  computeLeadsByOwner,
} from "@/lib/scoring/metrics/lead-management";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const totalLeads = computeLeadVolume(data.contacts, filter);
  const bySource = computeLeadsBySource(data.contacts, filter);
  const conversionFunnel = computeConversionFunnel(data.contacts, data.deals, filter);
  const byOwner = computeLeadsByOwner(data.contacts, filter);

  return {
    totalLeads,
    bySource,
    conversionFunnel,
    byOwner,
  };
});
