import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeLeadVolume,
  computeLeadSourceDistribution,
  computeLeadToDealRate,
  computeLeadVolumeByOwner,
} from "@/lib/scoring/metrics/lead-management";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const totalLeads = computeLeadVolume(data.contacts, filter);
  const bySource = computeLeadSourceDistribution(data.contacts, filter);
  const conversionRate = computeLeadToDealRate(data.contacts, filter);
  const byOwner = computeLeadVolumeByOwner(data.contacts, filter);

  return {
    totalLeads,
    bySource,
    conversionRate,
    byOwner,
  };
});
