// Closing metrics (C1-C12)

import type { MetricResult, MetricFilter, DealRow, ContactRow, PipelineStageRow } from "@/types/metrics";
import { metricResult, trendDir, statusFromThresholds } from "@/types/metrics";
import { median } from "@/lib/utils/statistics";
import { formatPercent, formatCurrency, formatDays, formatNumber } from "@/lib/utils/formatting";

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

function closedDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => d.hs_is_closed === true);
}

function wonDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => d.hs_is_closed_won === true);
}

function lostDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => d.hs_is_closed === true && d.hs_is_closed_won !== true);
}

function monthKey(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// ── C1: Win Rate ────────────────────────────────────────────────────

export function computeWinRate(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const won = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const total = filtered.length;
  const rate = total === 0 ? 0 : (won / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prev = closedDeals(filterDeals(previousPeriodData, filter));
    const prevWon = prev.filter((d) => d.hs_is_closed_won === true).length;
    const prevRate = prev.length === 0 ? 0 : (prevWon / prev.length) * 100;
    trend = computeTrend(rate, prevRate);
  }

  return metricResult({
    value: rate,
    displayValue: formatPercent(rate),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(rate, 30, 20),
    sampleSize: total,
    metadata: { won, lost: total - won, total },
  });
}

// ── C2: Win Rate by Owner ───────────────────────────────────────────

export function computeWinRateByOwner(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const byOwner: Record<string, { won: number; total: number }> = {};

  for (const d of filtered) {
    const owner = d.hubspot_owner_id ?? "unassigned";
    if (!byOwner[owner]) byOwner[owner] = { won: 0, total: 0 };
    byOwner[owner].total++;
    if (d.hs_is_closed_won === true) byOwner[owner].won++;
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, s]) => ({ ownerId, rate: s.total === 0 ? 0 : (s.won / s.total) * 100, won: s.won, total: s.total }))
    .sort((a, b) => b.rate - a.rate);

  const totalWon = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const overallRate = filtered.length === 0 ? 0 : (totalWon / filtered.length) * 100;

  return metricResult({
    value: overallRate,
    displayValue: formatPercent(overallRate),
    sampleSize: filtered.length,
    metadata: { byOwner: owners },
  });
}

// ── C3: Win Rate by Amount ──────────────────────────────────────────

export function computeWinRateByAmount(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));

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
      return amt >= b.min && amt < b.max;
    });
    const won = matching.filter((d) => d.hs_is_closed_won === true).length;
    return {
      bracket: b.label,
      rate: matching.length === 0 ? 0 : (won / matching.length) * 100,
      won,
      total: matching.length,
    };
  });

  const totalWon = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const overallRate = filtered.length === 0 ? 0 : (totalWon / filtered.length) * 100;

  return metricResult({
    value: overallRate,
    displayValue: formatPercent(overallRate),
    sampleSize: filtered.length,
    metadata: { byBracket },
  });
}

// ── C4: Win Rate by Source ──────────────────────────────────────────

export function computeWinRateBySource(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const bySource: Record<string, { won: number; total: number }> = {};

  for (const d of filtered) {
    const source = d.hs_analytics_source ?? "unknown";
    if (!bySource[source]) bySource[source] = { won: 0, total: 0 };
    bySource[source].total++;
    if (d.hs_is_closed_won === true) bySource[source].won++;
  }

  const sources = Object.entries(bySource)
    .map(([source, s]) => ({ source, rate: s.total === 0 ? 0 : (s.won / s.total) * 100, won: s.won, total: s.total }))
    .sort((a, b) => b.rate - a.rate);

  const totalWon = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const overallRate = filtered.length === 0 ? 0 : (totalWon / filtered.length) * 100;

  return metricResult({
    value: overallRate,
    displayValue: formatPercent(overallRate),
    sampleSize: filtered.length,
    metadata: { bySource: sources },
  });
}

// ── C5: Win/Loss Trend ──────────────────────────────────────────────

export function computeWinLossTrend(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));

  const byMonth: Record<string, { won: number; total: number }> = {};
  for (const d of filtered) {
    if (!d.closedate) continue;
    const key = monthKey(d.closedate);
    if (!byMonth[key]) byMonth[key] = { won: 0, total: 0 };
    byMonth[key].total++;
    if (d.hs_is_closed_won === true) byMonth[key].won++;
  }

  const monthly = Object.entries(byMonth)
    .map(([month, s]) => ({ month, rate: s.total === 0 ? 0 : (s.won / s.total) * 100, won: s.won, lost: s.total - s.won, total: s.total }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const totalWon = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const overallRate = filtered.length === 0 ? 0 : (totalWon / filtered.length) * 100;

  return metricResult({
    value: overallRate,
    displayValue: formatPercent(overallRate),
    sampleSize: filtered.length,
    metadata: { monthly },
  });
}

// ── C6: Lost Reasons ────────────────────────────────────────────────

export function computeLostReasons(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const lost = lostDeals(filterDeals(deals, filter));
  const byReason: Record<string, number> = {};

  for (const d of lost) {
    const reason = d.closed_lost_reason ?? "non renseigné";
    byReason[reason] = (byReason[reason] ?? 0) + 1;
  }

  const reasons = Object.entries(byReason)
    .map(([reason, count]) => ({ reason, count, percent: lost.length === 0 ? 0 : (count / lost.length) * 100 }))
    .sort((a, b) => b.count - a.count);

  return metricResult({
    value: lost.length,
    displayValue: formatNumber(lost.length),
    sampleSize: lost.length,
    metadata: { reasons },
  });
}

// ── C7: Competitive Win Rate ────────────────────────────────────────

export function computeCompetitiveWinRate(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const competitive = filtered.filter((d) =>
    d.closed_lost_reason?.toLowerCase().includes("compet") ||
    d.hs_is_closed_won === true // include won deals in competitive pool
  );

  // Only deals with a competitive loss reason or won deals that had competition
  const competitiveDeals = filtered.filter((d) =>
    d.closed_lost_reason?.toLowerCase().includes("compet"),
  );
  const allCompetitive = [...competitiveDeals, ...wonDeals(filtered)];
  // Actually: competitive deals = those lost to competition + all won
  // Win rate among deals where competition was a factor
  // Simplified: won / (won + lost-to-competition)
  const lostToCompetition = competitiveDeals.length;
  const won = wonDeals(filtered).length;
  const total = won + lostToCompetition;
  const rate = total === 0 ? 0 : (won / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevFiltered = closedDeals(filterDeals(previousPeriodData, filter));
    const prevLostToComp = prevFiltered.filter((d) => d.closed_lost_reason?.toLowerCase().includes("compet")).length;
    const prevWon = wonDeals(prevFiltered).length;
    const prevTotal = prevWon + prevLostToComp;
    const prevRate = prevTotal === 0 ? 0 : (prevWon / prevTotal) * 100;
    trend = computeTrend(rate, prevRate);
  }

  return metricResult({
    value: rate,
    displayValue: formatPercent(rate),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(rate, 50, 30),
    sampleSize: total,
    metadata: { won, lostToCompetition, total },
  });
}

// ── C8: Deal Size Won vs Lost ───────────────────────────────────────

export function computeDealSizeWonVsLost(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const won = wonDeals(filtered).filter((d) => (d.amount ?? 0) > 0);
  const lost = lostDeals(filtered).filter((d) => (d.amount ?? 0) > 0);

  const avgWon = won.length === 0 ? 0 : won.reduce((s, d) => s + (d.amount ?? 0), 0) / won.length;
  const avgLost = lost.length === 0 ? 0 : lost.reduce((s, d) => s + (d.amount ?? 0), 0) / lost.length;

  return metricResult({
    value: avgWon,
    displayValue: `${formatCurrency(avgWon)} vs ${formatCurrency(avgLost)}`,
    sampleSize: won.length + lost.length,
    metadata: { avgWon, avgLost, wonCount: won.length, lostCount: lost.length },
  });
}

// ── C9: Close Time Comparison ───────────────────────────────────────

export function computeCloseTimeComparison(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const wonDtc = wonDeals(filtered).map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);
  const lostDtc = lostDeals(filtered).map((d) => d.days_to_close).filter((v): v is number => v !== null && v > 0);

  const medianWon = median(wonDtc);
  const medianLost = median(lostDtc);

  return metricResult({
    value: medianWon,
    displayValue: `${formatDays(medianWon)} vs ${formatDays(medianLost)}`,
    sampleSize: wonDtc.length + lostDtc.length,
    metadata: { medianWon, medianLost, wonCount: wonDtc.length, lostCount: lostDtc.length },
  });
}

// ── C10: Close Rate by Stage Reached ────────────────────────────────

export function computeCloseRateByStage(
  deals: DealRow[],
  stages: PipelineStageRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = closedDeals(filterDeals(deals, filter));
  const stageOrder = [...stages]
    .filter((s) => !s.is_closed_won && !s.is_closed_lost)
    .sort((a, b) => a.display_order - b.display_order);

  const perStage = stageOrder.map((stage) => {
    const reached = filtered.filter((d) =>
      d.stage_timestamps[stage.stage_id] !== null && d.stage_timestamps[stage.stage_id] !== undefined,
    );
    const won = reached.filter((d) => d.hs_is_closed_won === true).length;
    return {
      stageId: stage.stage_id,
      stageLabel: stage.stage_label,
      rate: reached.length === 0 ? 0 : (won / reached.length) * 100,
      won,
      total: reached.length,
    };
  });

  const totalWon = filtered.filter((d) => d.hs_is_closed_won === true).length;
  const overallRate = filtered.length === 0 ? 0 : (totalWon / filtered.length) * 100;

  return metricResult({
    value: overallRate,
    displayValue: formatPercent(overallRate),
    sampleSize: filtered.length,
    metadata: { perStage },
  });
}

// ── C11: First Contact to Close ─────────────────────────────────────

export function computeFirstContactToClose(
  deals: DealRow[],
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const contactMap = new Map(contacts.map((c) => [c.hubspot_contact_id, c]));

  const daysToClose: number[] = [];

  for (const d of won) {
    if (!d.closedate || d.contact_ids.length === 0) continue;
    const closeTime = new Date(d.closedate).getTime();

    // Find earliest contact createdate
    let earliest = Infinity;
    for (const cid of d.contact_ids) {
      const contact = contactMap.get(cid);
      if (contact?.createdate) {
        const t = new Date(contact.createdate).getTime();
        if (t < earliest) earliest = t;
      }
    }

    if (earliest !== Infinity) {
      const days = (closeTime - earliest) / (1000 * 60 * 60 * 24);
      if (days > 0) daysToClose.push(days);
    }
  }

  const value = median(daysToClose);

  return metricResult({
    value,
    displayValue: formatDays(value),
    sampleSize: daysToClose.length,
    metadata: { avgDays: daysToClose.length === 0 ? 0 : daysToClose.reduce((s, v) => s + v, 0) / daysToClose.length },
  });
}

// ── C12: Revenue Lost ───────────────────────────────────────────────

export function computeRevenueLost(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const lost = lostDeals(filterDeals(deals, filter));
  const value = lost.reduce((s, d) => s + (d.amount ?? 0), 0);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevLost = lostDeals(filterDeals(previousPeriodData, filter));
    const prevValue = prevLost.reduce((s, d) => s + (d.amount ?? 0), 0);
    trend = computeTrend(value, prevValue);
  }

  return metricResult({
    value,
    displayValue: formatCurrency(value),
    trend,
    trendDirection: trendDir(trend),
    status: "good", // informational metric
    sampleSize: lost.length,
    metadata: { dealCount: lost.length },
  });
}
