// Velocity metrics (V1-V10)

import type { MetricResult, MetricFilter, DealRow, PipelineStageRow } from "@/types/metrics";
import { metricResult, trendDir } from "@/types/metrics";
import { median } from "@/lib/utils/statistics";
import { formatDays, formatNumber, formatPercent, formatCurrency } from "@/lib/utils/formatting";

// ── Helpers ──────────────────────────────────────────────────────────

function filterDeals(deals: DealRow[], filter?: MetricFilter, dateField: "createdate" | "closedate" = "closedate"): DealRow[] {
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

function wonDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => d.hs_is_closed_won === true);
}

function monthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ── V1: Sales Cycle ─────────────────────────────────────────────────

export function computeSalesCycle(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const current = wonDeals(filterDeals(deals, filter));
  const dtcValues = current.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const value = median(dtcValues);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = wonDeals(filterDeals(previousPeriodData, filter));
    const prevDtc = prev.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
    trend = computeTrend(value, median(prevDtc));
  }

  return metricResult({
    value,
    displayValue: formatDays(value),
    trend,
    trendDirection: trendDir(trend),
    status: value <= 30 ? "good" : value <= 60 ? "warning" : "critical",
    sampleSize: dtcValues.length,
    metadata: {},
  });
}

// ── V2: Sales Cycle by Owner ────────────────────────────────────────

export function computeSalesCycleByOwner(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = wonDeals(filterDeals(deals, filter));
  const byOwner: Record<string, number[]> = {};

  for (const d of filtered) {
    if (d.days_to_close === null || d.days_to_close <= 0) continue;
    const owner = d.hubspot_owner_id ?? "unassigned";
    if (!byOwner[owner]) byOwner[owner] = [];
    byOwner[owner].push(d.days_to_close);
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, values]) => ({ ownerId, median: median(values), count: values.length }))
    .sort((a, b) => a.median - b.median);

  const allDtc = filtered.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const overall = median(allDtc);

  return metricResult({
    value: overall,
    displayValue: formatDays(overall),
    sampleSize: allDtc.length,
    metadata: { byOwner: owners },
  });
}

// ── V3: Sales Cycle by Amount ───────────────────────────────────────

export function computeSalesCycleByAmount(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = wonDeals(filterDeals(deals, filter));

  const brackets: { label: string; min: number; max: number }[] = [
    { label: "<5K", min: 0, max: 5000 },
    { label: "5-15K", min: 5000, max: 15000 },
    { label: "15-30K", min: 15000, max: 30000 },
    { label: "30-50K", min: 30000, max: 50000 },
    { label: "50-100K", min: 50000, max: 100000 },
    { label: ">100K", min: 100000, max: Infinity },
  ];

  const byBracket = brackets.map((b) => {
    const matching = filtered.filter((d) => {
      const amt = d.amount ?? 0;
      return amt >= b.min && amt < b.max && d.days_to_close !== null && d.days_to_close > 0;
    });
    const dtcValues = matching.map((d) => d.days_to_close!);
    return {
      bracket: b.label,
      median: median(dtcValues),
      count: matching.length,
    };
  });

  const allDtc = filtered.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const overall = median(allDtc);

  return metricResult({
    value: overall,
    displayValue: formatDays(overall),
    sampleSize: allDtc.length,
    metadata: { byBracket },
  });
}

// ── V4: Time per Stage ──────────────────────────────────────────────

export function computeTimePerStage(
  deals: DealRow[],
  stages: PipelineStageRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = wonDeals(filterDeals(deals, filter));
  const stageOrder = [...stages].sort((a, b) => a.display_order - b.display_order);

  const perStage = stageOrder.map((stage) => {
    const times: number[] = [];
    for (const d of filtered) {
      const ms = d.cumulative_stage_times[stage.stage_id];
      if (ms !== null && ms !== undefined && ms > 0) {
        times.push(ms / (1000 * 60 * 60 * 24)); // ms to days
      }
    }
    return {
      stageId: stage.stage_id,
      stageLabel: stage.stage_label,
      avgDays: times.length === 0 ? 0 : times.reduce((s, v) => s + v, 0) / times.length,
      count: times.length,
    };
  });

  const totalAvg = perStage.reduce((s, p) => s + p.avgDays, 0);

  return metricResult({
    value: totalAvg,
    displayValue: formatDays(totalAvg),
    sampleSize: filtered.length,
    metadata: { perStage },
  });
}

// ── V5: Bottleneck Stage ────────────────────────────────────────────

export function computeBottleneck(
  deals: DealRow[],
  stages: PipelineStageRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = wonDeals(filterDeals(deals, filter));
  const stageOrder = [...stages].sort((a, b) => a.display_order - b.display_order);

  const perStage = stageOrder.map((stage) => {
    const times: number[] = [];
    for (const d of filtered) {
      const ms = d.cumulative_stage_times[stage.stage_id];
      if (ms !== null && ms !== undefined && ms > 0) {
        times.push(ms / (1000 * 60 * 60 * 24));
      }
    }
    return {
      stageId: stage.stage_id,
      stageLabel: stage.stage_label,
      avgDays: times.length === 0 ? 0 : times.reduce((s, v) => s + v, 0) / times.length,
    };
  });

  const totalTime = perStage.reduce((s, p) => s + p.avgDays, 0);
  const bottleneck = perStage.reduce((max, p) => (p.avgDays > max.avgDays ? p : max), perStage[0] ?? { stageId: "", stageLabel: "N/A", avgDays: 0 });
  const pctOfTotal = totalTime === 0 ? 0 : (bottleneck.avgDays / totalTime) * 100;

  const alerts = pctOfTotal > 40
    ? [{ id: "bottleneck_critical", type: "velocity", severity: "critical" as const, title: "Goulot d'étranglement", description: `L'étape "${bottleneck.stageLabel}" représente ${formatPercent(pctOfTotal)} du cycle total.` }]
    : [];

  return metricResult({
    value: bottleneck.avgDays,
    displayValue: `${bottleneck.stageLabel}: ${formatDays(bottleneck.avgDays)}`,
    status: pctOfTotal > 40 ? "critical" : pctOfTotal > 25 ? "warning" : "good",
    sampleSize: filtered.length,
    metadata: { bottleneck, perStage, pctOfTotal },
    alerts,
  });
}

// ── V6: Stage Conversion Rates ──────────────────────────────────────

export function computeStageConversion(
  deals: DealRow[],
  stages: PipelineStageRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter, "createdate");
  const stageOrder = [...stages]
    .filter((s) => !s.is_closed_won && !s.is_closed_lost)
    .sort((a, b) => a.display_order - b.display_order);

  // Count deals that reached each stage
  const reachedStage: Record<string, number> = {};
  for (const d of filtered) {
    for (const stage of stageOrder) {
      if (d.stage_timestamps[stage.stage_id] !== null && d.stage_timestamps[stage.stage_id] !== undefined) {
        reachedStage[stage.stage_id] = (reachedStage[stage.stage_id] ?? 0) + 1;
      }
    }
  }

  // Compute transition rates between consecutive stages
  const transitions: { from: string; to: string; fromLabel: string; toLabel: string; rate: number; fromCount: number; toCount: number }[] = [];
  for (let i = 0; i < stageOrder.length - 1; i++) {
    const fromId = stageOrder[i].stage_id;
    const toId = stageOrder[i + 1].stage_id;
    const fromCount = reachedStage[fromId] ?? 0;
    const toCount = reachedStage[toId] ?? 0;
    transitions.push({
      from: fromId,
      to: toId,
      fromLabel: stageOrder[i].stage_label,
      toLabel: stageOrder[i + 1].stage_label,
      rate: fromCount === 0 ? 0 : (toCount / fromCount) * 100,
      fromCount,
      toCount,
    });
  }

  const avgConversion = transitions.length === 0 ? 0 : transitions.reduce((s, t) => s + t.rate, 0) / transitions.length;

  return metricResult({
    value: avgConversion,
    displayValue: formatPercent(avgConversion),
    status: avgConversion > 50 ? "good" : avgConversion > 30 ? "warning" : "critical",
    sampleSize: filtered.length,
    metadata: { transitions, reachedStage },
  });
}

// ── V7: Time in Current Stage ───────────────────────────────────────

export function computeTimeInCurrentStage(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const open = filterDeals(deals, filter, "createdate").filter((d) => !d.hs_is_closed);
  const times = open
    .map((d) => d.hs_time_in_current_stage)
    .filter((v): v is number => v !== null && v > 0)
    .map((ms) => ms / (1000 * 60 * 60 * 24)); // ms to days

  const med = median(times);

  return metricResult({
    value: med,
    displayValue: formatDays(med),
    status: med <= 7 ? "good" : med <= 21 ? "warning" : "critical",
    sampleSize: times.length,
    metadata: { avgDays: times.length === 0 ? 0 : times.reduce((s, v) => s + v, 0) / times.length },
  });
}

// ── V8: Velocity Trend ──────────────────────────────────────────────

export function computeVelocityTrend(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = wonDeals(filterDeals(deals, filter));

  // Group by month
  const byMonth: Record<string, number[]> = {};
  for (const d of filtered) {
    if (!d.closedate || d.days_to_close === null || d.days_to_close <= 0) continue;
    const key = monthKey(d.closedate);
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(d.days_to_close);
  }

  const monthly = Object.entries(byMonth)
    .map(([month, values]) => ({ month, median: median(values), count: values.length }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const allDtc = filtered.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const overall = median(allDtc);

  // Determine trend from last two months
  let trendVal: number | null = null;
  if (monthly.length >= 2) {
    const last = monthly[monthly.length - 1].median;
    const prev = monthly[monthly.length - 2].median;
    trendVal = computeTrend(last, prev);
  }

  return metricResult({
    value: overall,
    displayValue: formatDays(overall),
    trend: trendVal,
    trendDirection: trendDir(trendVal),
    sampleSize: allDtc.length,
    metadata: { monthly },
  });
}

// ── V9: Lost Entry Stage ────────────────────────────────────────────

export function computeLostEntryStage(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const lost = filterDeals(deals, filter).filter((d) => d.hs_is_closed === true && d.hs_is_closed_won !== true);
  const byStage: Record<string, number> = {};

  for (const d of lost) {
    const stage = d.dealstage ?? "unknown";
    byStage[stage] = (byStage[stage] ?? 0) + 1;
  }

  const stages = Object.entries(byStage)
    .map(([stage, count]) => ({ stage, count, percent: lost.length === 0 ? 0 : (count / lost.length) * 100 }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: lost.length,
    displayValue: formatNumber(lost.length),
    sampleSize: lost.length,
    metadata: { byStage: stages },
  });
}

// ── V10: Sales Velocity Index ───────────────────────────────────────

export function computeSalesVelocityIndex(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const filtered = filterDeals(deals, filter);
  const closed = filtered.filter((d) => d.hs_is_closed === true);
  const won = closed.filter((d) => d.hs_is_closed_won === true);
  const lost = closed.filter((d) => d.hs_is_closed_won !== true);

  const count = won.length;
  const winRate = closed.length === 0 ? 0 : won.length / closed.length;
  const avgSize = won.length === 0 ? 0 : won.reduce((s, d) => s + (d.amount ?? 0), 0) / won.length;
  const dtcValues = won.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const cycleLength = dtcValues.length === 0 ? 1 : median(dtcValues);

  const svi = cycleLength === 0 ? 0 : (count * winRate * avgSize) / cycleLength;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevFiltered = filterDeals(previousPeriodData, filter);
    const prevClosed = prevFiltered.filter((d) => d.hs_is_closed === true);
    const prevWon = prevClosed.filter((d) => d.hs_is_closed_won === true);

    const prevCount = prevWon.length;
    const prevWinRate = prevClosed.length === 0 ? 0 : prevWon.length / prevClosed.length;
    const prevAvgSize = prevWon.length === 0 ? 0 : prevWon.reduce((s, d) => s + (d.amount ?? 0), 0) / prevWon.length;
    const prevDtc = prevWon.map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
    const prevCycle = prevDtc.length === 0 ? 1 : median(prevDtc);

    const prevSvi = prevCycle === 0 ? 0 : (prevCount * prevWinRate * prevAvgSize) / prevCycle;
    trend = computeTrend(svi, prevSvi);
  }

  return metricResult({
    value: svi,
    displayValue: formatCurrency(svi),
    trend,
    trendDirection: trendDir(trend),
    status: svi > 0 ? "good" : "warning",
    sampleSize: won.length,
    metadata: { count, winRate, avgSize, cycleLength },
  });
}
