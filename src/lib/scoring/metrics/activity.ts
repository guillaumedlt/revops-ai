// Activity metrics (A1-A6)

import type { MetricResult, MetricFilter, DealRow, ContactRow } from "@/types/metrics";
import { metricResult, trendDir, statusFromThresholdsInverse } from "@/types/metrics";
import { formatNumber, formatPercent } from "@/lib/utils/formatting";

// ── Helpers ──────────────────────────────────────────────────────────

function filterContacts(contacts: ContactRow[], filter?: MetricFilter): ContactRow[] {
  let result = contacts;
  if (filter?.dateRange) {
    const start = filter.dateRange.start.getTime();
    const end = filter.dateRange.end.getTime();
    result = result.filter((c) => {
      if (!c.createdate) return false;
      const t = new Date(c.createdate).getTime();
      return t >= start && t <= end;
    });
  }
  if (filter?.ownerIds?.length) {
    const ids = new Set(filter.ownerIds);
    result = result.filter((c) => c.hubspot_owner_id && ids.has(c.hubspot_owner_id));
  }
  return result;
}

function filterDeals(deals: DealRow[], filter?: MetricFilter): DealRow[] {
  let result = deals;
  if (filter?.dateRange) {
    const start = filter.dateRange.start.getTime();
    const end = filter.dateRange.end.getTime();
    result = result.filter((d) => {
      if (!d.createdate) return false;
      const t = new Date(d.createdate).getTime();
      return t >= start && t <= end;
    });
  }
  if (filter?.ownerIds?.length) {
    const ids = new Set(filter.ownerIds);
    result = result.filter((d) => d.hubspot_owner_id && ids.has(d.hubspot_owner_id));
  }
  if (filter?.pipeline) {
    result = result.filter((d) => d.pipeline === filter.pipeline);
  }
  return result;
}

function computeTrend(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return ((current - previous) / previous) * 100;
}

// ── A1: Activity Volume by Owner ────────────────────────────────────

export function computeActivityVolume(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);

  // Count contacts with notes_last_updated in the period
  let active = filtered;
  if (filter?.dateRange) {
    const start = filter.dateRange.start.getTime();
    const end = filter.dateRange.end.getTime();
    active = filtered.filter((c) => {
      if (!c.notes_last_updated) return false;
      const t = new Date(c.notes_last_updated).getTime();
      return t >= start && t <= end;
    });
  } else {
    active = filtered.filter((c) => c.notes_last_updated !== null);
  }

  const byOwner: Record<string, number> = {};
  for (const c of active) {
    const owner = c.hubspot_owner_id ?? "unassigned";
    byOwner[owner] = (byOwner[owner] ?? 0) + 1;
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, count]) => ({ ownerId, count }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: active.length,
    displayValue: formatNumber(active.length),
    status: active.length > 0 ? "good" : "warning",
    sampleSize: filtered.length,
    metadata: { byOwner: owners, activeContacts: active.length, totalContacts: filtered.length },
  });
}

// ── A2: Unworked Deals ──────────────────────────────────────────────

export function computeUnworkedDeals(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  const unworked = open.filter((d) => {
    if (!d.hs_last_sales_activity_date) return true;
    return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
  }).length;

  const total = open.length;
  const pct = total === 0 ? 0 : (unworked / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = filterDeals(previousPeriodData, filter).filter((d) => !d.hs_is_closed);
    const prevUnworked = prevOpen.filter((d) => {
      if (!d.hs_last_sales_activity_date) return true;
      return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
    }).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevUnworked / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 10, 25),
    sampleSize: total,
    metadata: { unworked, total },
    alerts: pct > 25
      ? [{ id: "unworked_deals_high", type: "activity", severity: "warning", title: "Deals sans activité", description: `${unworked} deals ouverts (${formatPercent(pct)}) sans activité depuis 14+ jours.` }]
      : [],
  });
}

// ── A4: Contact Engagement Rate ─────────────────────────────────────

export function computeContactEngagementRate(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const total = current.length;
  const engaged = current.filter((c) => c.hs_sales_email_last_replied !== null).length;
  const rate = total === 0 ? 0 : (engaged / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    const prevTotal = prev.length;
    const prevEngaged = prev.filter((c) => c.hs_sales_email_last_replied !== null).length;
    const prevRate = prevTotal === 0 ? 0 : (prevEngaged / prevTotal) * 100;
    trend = computeTrend(rate, prevRate);
  }

  return metricResult({
    value: rate,
    displayValue: formatPercent(rate),
    trend,
    trendDirection: trendDir(trend),
    status: rate >= 30 ? "good" : rate >= 15 ? "warning" : "critical",
    sampleSize: total,
    metadata: { engaged, total },
  });
}

// ── A5: Activity by Stage ───────────────────────────────────────────

export function computeActivityByStage(
  deals: DealRow[],
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter);
  const contactMap = new Map(contacts.map((c) => [c.hubspot_contact_id, c]));

  const byStage: Record<string, { totalNotes: number; dealCount: number }> = {};

  for (const d of filtered) {
    const stage = d.dealstage ?? "unknown";
    if (!byStage[stage]) byStage[stage] = { totalNotes: 0, dealCount: 0 };
    byStage[stage].dealCount++;

    // Sum notes from associated contacts
    for (const cid of d.contact_ids) {
      const contact = contactMap.get(cid);
      if (contact?.num_notes) {
        byStage[stage].totalNotes += contact.num_notes;
      }
    }
  }

  const stages = Object.entries(byStage)
    .map(([stage, data]) => ({
      stage,
      avgActivities: data.dealCount === 0 ? 0 : data.totalNotes / data.dealCount,
      dealCount: data.dealCount,
      totalActivities: data.totalNotes,
    }))
    .sort((a, b) => b.avgActivities - a.avgActivities);

  const totalActivities = stages.reduce((s, st) => s + st.totalActivities, 0);
  const avgPerDeal = filtered.length === 0 ? 0 : totalActivities / filtered.length;

  return metricResult({
    value: avgPerDeal,
    displayValue: `${avgPerDeal.toFixed(1)} / deal`,
    sampleSize: filtered.length,
    metadata: { byStage: stages },
  });
}

// ── A6: Effort vs Result ────────────────────────────────────────────

export function computeEffortVsResult(
  deals: DealRow[],
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = filterDeals(deals, filter).filter((d) => d.hs_is_closed_won === true);
  const contactMap = new Map(contacts.map((c) => [c.hubspot_contact_id, c]));

  // Per owner: activities (sum of num_notes from contacts) and revenue
  const byOwner: Record<string, { activities: number; revenue: number; dealCount: number }> = {};

  for (const d of won) {
    const owner = d.hubspot_owner_id ?? "unassigned";
    if (!byOwner[owner]) byOwner[owner] = { activities: 0, revenue: 0, dealCount: 0 };
    byOwner[owner].revenue += d.amount ?? 0;
    byOwner[owner].dealCount++;

    for (const cid of d.contact_ids) {
      const contact = contactMap.get(cid);
      if (contact?.num_notes) {
        byOwner[owner].activities += contact.num_notes;
      }
    }
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, data]) => ({
      ownerId,
      ...data,
      revenuePerActivity: data.activities === 0 ? 0 : data.revenue / data.activities,
    }))
    .sort((a, b) => b.revenuePerActivity - a.revenuePerActivity);

  const totalRevenue = won.reduce((s, d) => s + (d.amount ?? 0), 0);
  const totalActivities = owners.reduce((s, o) => s + o.activities, 0);
  const efficiency = totalActivities === 0 ? 0 : totalRevenue / totalActivities;

  return metricResult({
    value: efficiency,
    displayValue: `${formatNumber(Math.round(efficiency))}€/activité`,
    sampleSize: won.length,
    metadata: { byOwner: owners, totalRevenue, totalActivities },
  });
}
