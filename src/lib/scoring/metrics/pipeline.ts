// Pipeline metrics (P1-P12)

import type { MetricResult, MetricFilter, DealRow } from "@/types/metrics";
import { metricResult, trendDir, statusFromThresholds, statusFromThresholdsInverse } from "@/types/metrics";
import { formatCurrency, formatNumber, formatPercent, formatRatio } from "@/lib/utils/formatting";

// ── Helpers ──────────────────────────────────────────────────────────

function filterDeals(deals: DealRow[], filter?: MetricFilter, dateField: "createdate" | "closedate" = "createdate"): DealRow[] {
  let result = deals;
  if (filter?.dateRange) {
    const start = filter.dateRange.start.getTime();
    const end = filter.dateRange.end.getTime();
    result = result.filter((d) => {
      const raw = dateField === "closedate" ? d.closedate : d.createdate;
      if (!raw) return false;
      const t = new Date(raw).getTime();
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

function ageDays(createdate: string | null): number {
  if (!createdate) return 0;
  return (Date.now() - new Date(createdate).getTime()) / (1000 * 60 * 60 * 24);
}

// ── P1: Pipeline Value ──────────────────────────────────────────────

export function computePipelineValue(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const current = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const value = current.reduce((sum, d) => sum + (d.amount ?? 0), 0);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterDeals(previousPeriodData, filter).filter((d) => !d.hs_is_closed);
    const prevValue = prev.reduce((sum, d) => sum + (d.amount ?? 0), 0);
    trend = computeTrend(value, prevValue);
  }

  return metricResult({
    value,
    displayValue: formatCurrency(value),
    trend,
    trendDirection: trendDir(trend),
    status: value > 0 ? "good" : "warning",
    sampleSize: current.length,
    metadata: { dealCount: current.length },
  });
}

// ── P2: Pipeline by Stage ───────────────────────────────────────────

export function computePipelineByStage(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const byStage: Record<string, { value: number; count: number }> = {};

  for (const d of filtered) {
    const stage = d.dealstage ?? "unknown";
    if (!byStage[stage]) byStage[stage] = { value: 0, count: 0 };
    byStage[stage].value += d.amount ?? 0;
    byStage[stage].count++;
  }

  const stages = Object.entries(byStage)
    .map(([stage, data]) => ({ stage, ...data }))
    .sort((a, b) => b.value - a.value);

  const totalValue = filtered.reduce((s, d) => s + (d.amount ?? 0), 0);

  return metricResult({
    value: totalValue,
    displayValue: formatCurrency(totalValue),
    sampleSize: filtered.length,
    metadata: { stages },
  });
}

// ── P3: Pipeline by Owner ───────────────────────────────────────────

export function computePipelineByOwner(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const byOwner: Record<string, number> = {};

  for (const d of filtered) {
    const owner = d.hubspot_owner_id ?? "unassigned";
    byOwner[owner] = (byOwner[owner] ?? 0) + (d.amount ?? 0);
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, value]) => ({ ownerId, value }))
    .sort((a, b) => b.value - a.value);

  const totalValue = filtered.reduce((s, d) => s + (d.amount ?? 0), 0);

  return metricResult({
    value: totalValue,
    displayValue: formatCurrency(totalValue),
    sampleSize: filtered.length,
    metadata: { byOwner: owners },
  });
}

// ── P4: Deal Count by Stage ─────────────────────────────────────────

export function computeDealCountByStage(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const byStage: Record<string, number> = {};

  for (const d of filtered) {
    const stage = d.dealstage ?? "unknown";
    byStage[stage] = (byStage[stage] ?? 0) + 1;
  }

  const stages = Object.entries(byStage)
    .map(([stage, count]) => ({ stage, count }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: filtered.length,
    displayValue: formatNumber(filtered.length),
    sampleSize: filtered.length,
    metadata: { stages },
  });
}

// ── P5: Weighted Pipeline ───────────────────────────────────────────

export function computeWeightedPipeline(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const current = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const value = current.reduce(
    (sum, d) => sum + (d.amount ?? 0) * ((d.hs_deal_stage_probability ?? 0) / 100),
    0,
  );

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterDeals(previousPeriodData, filter).filter((d) => !d.hs_is_closed);
    const prevValue = prev.reduce(
      (sum, d) => sum + (d.amount ?? 0) * ((d.hs_deal_stage_probability ?? 0) / 100),
      0,
    );
    trend = computeTrend(value, prevValue);
  }

  return metricResult({
    value,
    displayValue: formatCurrency(value),
    trend,
    trendDirection: trendDir(trend),
    status: value > 0 ? "good" : "warning",
    sampleSize: current.length,
    metadata: {},
  });
}

// ── P6: Pipeline Coverage ───────────────────────────────────────────

export function computePipelineCoverage(
  deals: DealRow[],
  target: number,
  filter?: MetricFilter,
): MetricResult {
  const open = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const pipelineValue = open.reduce((s, d) => s + (d.amount ?? 0), 0);
  const ratio = target === 0 ? 0 : pipelineValue / target;

  return metricResult({
    value: ratio,
    displayValue: formatRatio(ratio),
    status: statusFromThresholds(ratio, 3, 2),
    sampleSize: open.length,
    metadata: { pipelineValue, target },
  });
}

// ── P7: Deal Flow ───────────────────────────────────────────────────

export function computeDealFlow(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const allFiltered = filterDeals(deals, filter);

  // Created in period
  let created = allFiltered;
  let closed = deals;

  if (filter?.dateRange) {
    const start = filter.dateRange.start.getTime();
    const end = filter.dateRange.end.getTime();
    created = deals.filter((d) => {
      if (!d.createdate) return false;
      const t = new Date(d.createdate).getTime();
      return t >= start && t <= end;
    });
    closed = deals.filter((d) => {
      if (!d.closedate || !d.hs_is_closed) return false;
      const t = new Date(d.closedate).getTime();
      return t >= start && t <= end;
    });
  } else {
    closed = deals.filter((d) => d.hs_is_closed);
  }

  if (filter?.ownerIds?.length) {
    const ids = new Set(filter.ownerIds);
    created = created.filter((d) => d.hubspot_owner_id && ids.has(d.hubspot_owner_id));
    closed = closed.filter((d) => d.hubspot_owner_id && ids.has(d.hubspot_owner_id));
  }

  const createdCount = created.length;
  const closedCount = closed.length;
  const net = createdCount - closedCount;

  return metricResult({
    value: net,
    displayValue: `+${createdCount} / -${closedCount}`,
    status: net >= 0 ? "good" : "warning",
    sampleSize: createdCount + closedCount,
    metadata: { created: createdCount, closed: closedCount, net },
  });
}

// ── P8: Average Deal Size ───────────────────────────────────────────

export function computeAverageDealSize(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const current = filterDeals(deals, filter).filter((d) => (d.amount ?? 0) > 0);
  const avg = current.length === 0 ? 0 : current.reduce((s, d) => s + (d.amount ?? 0), 0) / current.length;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterDeals(previousPeriodData, filter).filter((d) => (d.amount ?? 0) > 0);
    const prevAvg = prev.length === 0 ? 0 : prev.reduce((s, d) => s + (d.amount ?? 0), 0) / prev.length;
    trend = computeTrend(avg, prevAvg);
  }

  return metricResult({
    value: avg,
    displayValue: formatCurrency(avg),
    trend,
    trendDirection: trendDir(trend),
    status: avg > 0 ? "good" : "warning",
    sampleSize: current.length,
    metadata: {},
  });
}

// ── P9: Stalled Deals ───────────────────────────────────────────────

export function computeStalledDeals(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const stalled = open.filter((d) => d.hs_is_stalled === true).length;
  const total = open.length;
  const pct = total === 0 ? 0 : (stalled / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = filterDeals(previousPeriodData, filter).filter((d) => !d.hs_is_closed);
    const prevStalled = prevOpen.filter((d) => d.hs_is_stalled === true).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevStalled / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 10, 25),
    sampleSize: total,
    metadata: { stalled, total },
    alerts: pct > 25
      ? [{ id: "stalled_high", type: "pipeline", severity: "warning", title: "Deals en stagnation", description: `${stalled} deals (${formatPercent(pct)}) sont en stagnation.` }]
      : [],
  });
}

// ── P10: Inactive Deals ─────────────────────────────────────────────

export function computeInactiveDeals(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);
  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  const inactive = open.filter((d) => {
    if (!d.hs_last_sales_activity_date) return true;
    return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
  }).length;

  const total = open.length;
  const pct = total === 0 ? 0 : (inactive / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = filterDeals(previousPeriodData, filter).filter((d) => !d.hs_is_closed);
    const prevInactive = prevOpen.filter((d) => {
      if (!d.hs_last_sales_activity_date) return true;
      return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
    }).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevInactive / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 15, 30),
    sampleSize: total,
    metadata: { inactive, total },
  });
}

// ── P11: Pipeline Age ───────────────────────────────────────────────

export function computePipelineAge(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const open = filterDeals(deals, filter).filter((d) => !d.hs_is_closed);

  const buckets = { "0-30d": 0, "30-60d": 0, "60-90d": 0, "90-180d": 0, "180d+": 0 };

  for (const d of open) {
    const age = ageDays(d.createdate);
    if (age <= 30) buckets["0-30d"]++;
    else if (age <= 60) buckets["30-60d"]++;
    else if (age <= 90) buckets["60-90d"]++;
    else if (age <= 180) buckets["90-180d"]++;
    else buckets["180d+"]++;
  }

  const total = open.length;
  const over90 = buckets["90-180d"] + buckets["180d+"];
  const over90Pct = total === 0 ? 0 : (over90 / total) * 100;

  const distribution = Object.entries(buckets).map(([bucket, count]) => ({
    bucket,
    count,
    percent: total === 0 ? 0 : (count / total) * 100,
  }));

  return metricResult({
    value: over90Pct,
    displayValue: formatPercent(over90Pct),
    status: over90Pct > 25 ? "critical" : over90Pct > 15 ? "warning" : "good",
    sampleSize: total,
    metadata: { distribution, over90Count: over90 },
  });
}

// ── P12: New Pipeline ───────────────────────────────────────────────

export function computeNewPipeline(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const current = filterDeals(deals, filter);
  const value = current.reduce((s, d) => s + (d.amount ?? 0), 0);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = filterDeals(previousPeriodData, filter);
    const prevValue = prev.reduce((s, d) => s + (d.amount ?? 0), 0);
    trend = computeTrend(value, prevValue);
  }

  return metricResult({
    value,
    displayValue: formatCurrency(value),
    trend,
    trendDirection: trendDir(trend),
    status: value > 0 ? "good" : "warning",
    sampleSize: current.length,
    metadata: { dealCount: current.length },
  });
}
