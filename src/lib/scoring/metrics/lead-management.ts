// Lead Management metrics (L1-L10)

import type { MetricResult, MetricFilter, ContactRow } from "@/types/metrics";
import { metricResult, trendDir, statusFromThresholds, statusFromThresholdsInverse } from "@/types/metrics";
import { median } from "@/lib/utils/statistics";
import { formatNumber, formatPercent, formatHours } from "@/lib/utils/formatting";

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

function computeTrend(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return ((current - previous) / previous) * 100;
}

function ageDays(createdate: string | null): number {
  if (!createdate) return 0;
  return (Date.now() - new Date(createdate).getTime()) / (1000 * 60 * 60 * 24);
}

// ── L1: Lead Volume ─────────────────────────────────────────────────

export function computeLeadVolume(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const value = current.length;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    trend = computeTrend(value, prev.length);
  }

  return metricResult({
    value,
    displayValue: formatNumber(value),
    trend,
    trendDirection: trendDir(trend),
    status: value > 0 ? "good" : "warning",
    sampleSize: value,
    metadata: {},
  });
}

// ── L2: Lead Volume by Owner ────────────────────────────────────────

export function computeLeadVolumeByOwner(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);
  const byOwner: Record<string, number> = {};

  for (const c of filtered) {
    const owner = c.hubspot_owner_id ?? "unassigned";
    byOwner[owner] = (byOwner[owner] ?? 0) + 1;
  }

  const ownerArray = Object.entries(byOwner)
    .map(([ownerId, count]) => ({ ownerId, count }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: filtered.length,
    displayValue: formatNumber(filtered.length),
    sampleSize: filtered.length,
    metadata: { byOwner: ownerArray },
  });
}

// ── L3: Lead-to-Deal Rate ───────────────────────────────────────────

export function computeLeadToDealRate(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const total = current.length;
  const withDeal = current.filter((c) => c.deal_ids.length > 0).length;
  const rate = total === 0 ? 0 : (withDeal / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    const prevTotal = prev.length;
    const prevWithDeal = prev.filter((c) => c.deal_ids.length > 0).length;
    const prevRate = prevTotal === 0 ? 0 : (prevWithDeal / prevTotal) * 100;
    trend = computeTrend(rate, prevRate);
  }

  return metricResult({
    value: rate,
    displayValue: formatPercent(rate),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(rate, 20, 10),
    sampleSize: total,
    metadata: { converted: withDeal, total },
  });
}

// ── L4: Lead-to-Deal by Owner ───────────────────────────────────────

export function computeLeadToDealByOwner(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);
  const ownerStats: Record<string, { total: number; converted: number }> = {};

  for (const c of filtered) {
    const owner = c.hubspot_owner_id ?? "unassigned";
    if (!ownerStats[owner]) ownerStats[owner] = { total: 0, converted: 0 };
    ownerStats[owner].total++;
    if (c.deal_ids.length > 0) ownerStats[owner].converted++;
  }

  const byOwner = Object.entries(ownerStats)
    .map(([ownerId, s]) => ({
      ownerId,
      rate: s.total === 0 ? 0 : (s.converted / s.total) * 100,
      total: s.total,
      converted: s.converted,
    }))
    .sort((a, b) => b.rate - a.rate);

  const totalRate = filtered.length === 0
    ? 0
    : (filtered.filter((c) => c.deal_ids.length > 0).length / filtered.length) * 100;

  return metricResult({
    value: totalRate,
    displayValue: formatPercent(totalRate),
    sampleSize: filtered.length,
    metadata: { byOwner },
  });
}

// ── L5: Lead Source Distribution ────────────────────────────────────

export function computeLeadSourceDistribution(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);
  const bySource: Record<string, number> = {};

  for (const c of filtered) {
    const source = c.hs_analytics_source ?? "unknown";
    bySource[source] = (bySource[source] ?? 0) + 1;
  }

  const distribution = Object.entries(bySource)
    .map(([source, count]) => ({ source, count, percent: filtered.length === 0 ? 0 : (count / filtered.length) * 100 }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: Object.keys(bySource).length,
    displayValue: `${Object.keys(bySource).length} sources`,
    sampleSize: filtered.length,
    metadata: { distribution },
  });
}

// ── L6: Speed to Lead ───────────────────────────────────────────────

export function computeSpeedToLead(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const times = current
    .map((c) => c.hs_time_to_first_engagement)
    .filter((t): t is number => t !== null && t > 0);

  const hours = times.length === 0 ? 0 : median(times.map((t) => t / (1000 * 60 * 60)));

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    const prevTimes = prev
      .map((c) => c.hs_time_to_first_engagement)
      .filter((t): t is number => t !== null && t > 0);
    const prevHours = prevTimes.length === 0 ? 0 : median(prevTimes.map((t) => t / (1000 * 60 * 60)));
    trend = computeTrend(hours, prevHours);
  }

  // Lower is better: good < 4h, warning < 24h
  return metricResult({
    value: hours,
    displayValue: formatHours(hours),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(hours, 4, 24),
    sampleSize: times.length,
    metadata: { medianMs: times.length === 0 ? 0 : median(times) },
  });
}

// ── L7: Unworked Leads ──────────────────────────────────────────────

export function computeUnworkedLeads(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const total = current.length;
  const unworked = current.filter((c) => c.hs_is_unworked === true).length;
  const pct = total === 0 ? 0 : (unworked / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    const prevTotal = prev.length;
    const prevUnworked = prev.filter((c) => c.hs_is_unworked === true).length;
    const prevPct = prevTotal === 0 ? 0 : (prevUnworked / prevTotal) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 5, 15),
    sampleSize: total,
    metadata: { unworked, total },
  });
}

// ── L8: Lead Aging ──────────────────────────────────────────────────

export function computeLeadAging(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);

  const buckets = { "0-7d": 0, "7-14d": 0, "14-30d": 0, "30-60d": 0, "60d+": 0 };

  for (const c of filtered) {
    const age = ageDays(c.createdate);
    if (age <= 7) buckets["0-7d"]++;
    else if (age <= 14) buckets["7-14d"]++;
    else if (age <= 30) buckets["14-30d"]++;
    else if (age <= 60) buckets["30-60d"]++;
    else buckets["60d+"]++;
  }

  const total = filtered.length;
  const over30 = buckets["30-60d"] + buckets["60d+"];
  const over30Pct = total === 0 ? 0 : (over30 / total) * 100;

  const distribution = Object.entries(buckets).map(([bucket, count]) => ({
    bucket,
    count,
    percent: total === 0 ? 0 : (count / total) * 100,
  }));

  return metricResult({
    value: over30Pct,
    displayValue: formatPercent(over30Pct),
    status: over30Pct > 30 ? "critical" : over30Pct > 15 ? "warning" : "good",
    sampleSize: total,
    metadata: { distribution, over30Count: over30 },
  });
}

// ── L9: Lead Status Distribution ────────────────────────────────────

export function computeLeadStatusDistribution(
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterContacts(contacts, filter);
  const byStatus: Record<string, number> = {};

  for (const c of filtered) {
    const status = c.hs_lead_status ?? "unknown";
    byStatus[status] = (byStatus[status] ?? 0) + 1;
  }

  const distribution = Object.entries(byStatus)
    .map(([status, count]) => ({ status, count, percent: filtered.length === 0 ? 0 : (count / filtered.length) * 100 }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: Object.keys(byStatus).length,
    displayValue: `${Object.keys(byStatus).length} statuts`,
    sampleSize: filtered.length,
    metadata: { distribution },
  });
}

// ── L10: Contact-Company Rate ───────────────────────────────────────

export function computeContactCompanyRate(
  contacts: ContactRow[],
  filter?: MetricFilter,
  previousPeriodData?: ContactRow[],
): MetricResult {
  const current = filterContacts(contacts, filter);
  const total = current.length;
  const withCompany = current.filter((c) => c.company_ids.length > 0).length;
  const rate = total === 0 ? 0 : (withCompany / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterContacts(previousPeriodData, filter);
    const prevTotal = prev.length;
    const prevWithCompany = prev.filter((c) => c.company_ids.length > 0).length;
    const prevRate = prevTotal === 0 ? 0 : (prevWithCompany / prevTotal) * 100;
    trend = computeTrend(rate, prevRate);
  }

  return metricResult({
    value: rate,
    displayValue: formatPercent(rate),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(rate, 80, 60),
    sampleSize: total,
    metadata: { withCompany, total },
  });
}
