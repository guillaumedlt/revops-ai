import { NextRequest } from "next/server";
import { metricRoute } from "@/lib/api-helpers";
import {
  computeActivityVolume,
  computeUnworkedDeals,
  computeContactEngagementRate,
} from "@/lib/scoring/metrics/activity";

export const GET = metricRoute((data, query) => {
  const filter = { dateRange: query.dateRange, ownerIds: query.ownerIds, pipeline: query.pipeline };

  const activityVolume = computeActivityVolume(data.contacts, filter);
  const unworkedDeals = computeUnworkedDeals(data.deals, filter);
  const contactEngagementRate = computeContactEngagementRate(data.contacts, filter);

  return {
    activityVolume,
    unworkedDeals,
    contactEngagementRate,
  };
});
