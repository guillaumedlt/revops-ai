// Revenue metrics (R1-R11)

import type { MetricResult, MetricFilter, DealRow, CompanyRow } from "@/types/metrics";
import { metricResult, trendDir } from "@/types/metrics";
import { giniCoefficient } from "@/lib/utils/statistics";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils/formatting";

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

// ── R1: Revenue Won ─────────────────────────────────────────────────

export function computeRevenueWon(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const value = won.reduce((s, d) => s + (d.amount ?? 0), 0);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevWon = wonDeals(filterDeals(previousPeriodData, filter));
    const prevValue = prevWon.reduce((s, d) => s + (d.amount ?? 0), 0);
    trend = computeTrend(value, prevValue);
  }

  return metricResult({
    value,
    displayValue: formatCurrency(value),
    trend,
    trendDirection: trendDir(trend),
    status: value > 0 ? "good" : "warning",
    sampleSize: won.length,
    metadata: { dealCount: won.length },
  });
}

// ── R2: Revenue by Owner ────────────────────────────────────────────

export function computeRevenueByOwner(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const byOwner: Record<string, number> = {};

  for (const d of won) {
    const owner = d.hubspot_owner_id ?? "unassigned";
    byOwner[owner] = (byOwner[owner] ?? 0) + (d.amount ?? 0);
  }

  const owners = Object.entries(byOwner)
    .map(([ownerId, revenue]) => ({ ownerId, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const total = won.reduce((s, d) => s + (d.amount ?? 0), 0);

  return metricResult({
    value: total,
    displayValue: formatCurrency(total),
    sampleSize: won.length,
    metadata: { byOwner: owners },
  });
}

// ── R3: Revenue by Account ──────────────────────────────────────────

export function computeRevenueByAccount(
  deals: DealRow[],
  companies: CompanyRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const companyMap = new Map(companies.map((c) => [c.hubspot_company_id, c]));

  const byCompany: Record<string, { name: string; revenue: number; dealCount: number }> = {};

  for (const d of won) {
    for (const cid of d.company_ids) {
      const company = companyMap.get(cid);
      const name = company?.name ?? cid;
      if (!byCompany[cid]) byCompany[cid] = { name, revenue: 0, dealCount: 0 };
      byCompany[cid].revenue += d.amount ?? 0;
      byCompany[cid].dealCount++;
    }
    // Deals without a company
    if (d.company_ids.length === 0) {
      const key = "__no_company__";
      if (!byCompany[key]) byCompany[key] = { name: "Sans entreprise", revenue: 0, dealCount: 0 };
      byCompany[key].revenue += d.amount ?? 0;
      byCompany[key].dealCount++;
    }
  }

  const top20 = Object.entries(byCompany)
    .map(([companyId, data]) => ({ companyId, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 20);

  const total = won.reduce((s, d) => s + (d.amount ?? 0), 0);

  return metricResult({
    value: total,
    displayValue: formatCurrency(total),
    sampleSize: won.length,
    metadata: { top20 },
  });
}

// ── R4: Revenue Segmentation ────────────────────────────────────────

export function computeRevenueSegmentation(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));

  // Identify companies that had previous won deals (expansion) vs new
  const companyDeals: Record<string, DealRow[]> = {};
  const allWon = wonDeals(deals); // all time
  for (const d of allWon) {
    for (const cid of d.company_ids) {
      if (!companyDeals[cid]) companyDeals[cid] = [];
      companyDeals[cid].push(d);
    }
  }

  let newRevenue = 0;
  let expansionRevenue = 0;

  for (const d of won) {
    const amt = d.amount ?? 0;
    const isNew = d.company_ids.length === 0 || d.company_ids.every((cid) => {
      const prev = companyDeals[cid]?.filter(
        (pd) => pd.hubspot_deal_id !== d.hubspot_deal_id && pd.closedate && d.closedate && new Date(pd.closedate) < new Date(d.closedate),
      );
      return !prev || prev.length === 0;
    });

    if (isNew) {
      newRevenue += amt;
    } else {
      expansionRevenue += amt;
    }
  }

  const total = newRevenue + expansionRevenue;

  return metricResult({
    value: total,
    displayValue: formatCurrency(total),
    sampleSize: won.length,
    metadata: {
      new: { revenue: newRevenue, percent: total === 0 ? 0 : (newRevenue / total) * 100 },
      expansion: { revenue: expansionRevenue, percent: total === 0 ? 0 : (expansionRevenue / total) * 100 },
    },
  });
}

// ── R5: ACV Trend ───────────────────────────────────────────────────

export function computeAcvTrend(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));

  const byMonth: Record<string, { total: number; count: number }> = {};
  for (const d of won) {
    if (!d.closedate) continue;
    const key = monthKey(d.closedate);
    if (!byMonth[key]) byMonth[key] = { total: 0, count: 0 };
    byMonth[key].total += d.amount ?? 0;
    byMonth[key].count++;
  }

  const monthly = Object.entries(byMonth)
    .map(([month, s]) => ({ month, avg: s.count === 0 ? 0 : s.total / s.count, count: s.count, total: s.total }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const totalRevenue = won.reduce((s, d) => s + (d.amount ?? 0), 0);
  const avgDealSize = won.length === 0 ? 0 : totalRevenue / won.length;

  return metricResult({
    value: avgDealSize,
    displayValue: formatCurrency(avgDealSize),
    sampleSize: won.length,
    metadata: { monthly },
  });
}

// ── R6: Revenue Forecast ────────────────────────────────────────────

export function computeRevenueForecast(
  deals: DealRow[],
  target: number,
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const actual = won.reduce((s, d) => s + (d.amount ?? 0), 0);

  // Weighted pipeline (open deals)
  const open = filterDeals(deals, filter, "createdate").filter((d) => !d.hs_is_closed);
  const weighted = open.reduce(
    (s, d) => s + (d.amount ?? 0) * ((d.hs_deal_stage_probability ?? 0) / 100),
    0,
  );

  const forecast = actual + weighted;
  const pctOfTarget = target === 0 ? 0 : (forecast / target) * 100;

  return metricResult({
    value: forecast,
    displayValue: formatCurrency(forecast),
    status: pctOfTarget >= 100 ? "good" : pctOfTarget >= 75 ? "warning" : "critical",
    sampleSize: won.length + open.length,
    metadata: { actual, weighted, target, pctOfTarget },
  });
}

// ── R7: Client LTV ──────────────────────────────────────────────────

export function computeClientLtv(
  deals: DealRow[],
  companies: CompanyRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const companyMap = new Map(companies.map((c) => [c.hubspot_company_id, c]));

  const byCompany: Record<string, { name: string; ltv: number; dealCount: number }> = {};

  for (const d of won) {
    for (const cid of d.company_ids) {
      const company = companyMap.get(cid);
      if (!byCompany[cid]) byCompany[cid] = { name: company?.name ?? cid, ltv: 0, dealCount: 0 };
      byCompany[cid].ltv += d.amount ?? 0;
      byCompany[cid].dealCount++;
    }
  }

  const ltvValues = Object.values(byCompany).map((c) => c.ltv);
  const avgLtv = ltvValues.length === 0 ? 0 : ltvValues.reduce((s, v) => s + v, 0) / ltvValues.length;

  const topClients = Object.entries(byCompany)
    .map(([companyId, data]) => ({ companyId, ...data }))
    .sort((a, b) => b.ltv - a.ltv)
    .slice(0, 20);

  return metricResult({
    value: avgLtv,
    displayValue: formatCurrency(avgLtv),
    sampleSize: ltvValues.length,
    metadata: { topClients, totalCompanies: ltvValues.length },
  });
}

// ── R8: Client Churn ────────────────────────────────────────────────

export function computeClientChurn(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(deals);
  const now = new Date();

  // P-1: last 6 months, P-2: 6-12 months ago
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const companiesP2 = new Set<string>();
  const companiesP1 = new Set<string>();

  for (const d of won) {
    if (!d.closedate) continue;
    const close = new Date(d.closedate);
    for (const cid of d.company_ids) {
      if (close >= twelveMonthsAgo && close < sixMonthsAgo) companiesP2.add(cid);
      if (close >= sixMonthsAgo && close <= now) companiesP1.add(cid);
    }
  }

  const churned = Array.from(companiesP2).filter((cid) => !companiesP1.has(cid));
  const churnRate = companiesP2.size === 0 ? 0 : (churned.length / companiesP2.size) * 100;

  return metricResult({
    value: churnRate,
    displayValue: formatPercent(churnRate),
    status: churnRate <= 10 ? "good" : churnRate <= 25 ? "warning" : "critical",
    sampleSize: companiesP2.size,
    metadata: { churnedCount: churned.length, p2Count: companiesP2.size, p1Count: companiesP1.size },
  });
}

// ── R9: Revenue Concentration ───────────────────────────────────────

export function computeRevenueConcentration(
  deals: DealRow[],
  companies: CompanyRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const byCompany: Record<string, number> = {};

  for (const d of won) {
    for (const cid of d.company_ids) {
      byCompany[cid] = (byCompany[cid] ?? 0) + (d.amount ?? 0);
    }
    if (d.company_ids.length === 0) {
      byCompany["__none__"] = (byCompany["__none__"] ?? 0) + (d.amount ?? 0);
    }
  }

  const revenues = Object.values(byCompany).sort((a, b) => b - a);
  const total = revenues.reduce((s, v) => s + v, 0);
  const gini = giniCoefficient(revenues);

  const top3Revenue = revenues.slice(0, 3).reduce((s, v) => s + v, 0);
  const top5Revenue = revenues.slice(0, 5).reduce((s, v) => s + v, 0);
  const top10Revenue = revenues.slice(0, 10).reduce((s, v) => s + v, 0);

  const top3Pct = total === 0 ? 0 : (top3Revenue / total) * 100;
  const top5Pct = total === 0 ? 0 : (top5Revenue / total) * 100;
  const top10Pct = total === 0 ? 0 : (top10Revenue / total) * 100;

  return metricResult({
    value: gini,
    displayValue: `Gini: ${gini.toFixed(2)}`,
    status: top3Pct > 50 ? "warning" : "good",
    sampleSize: revenues.length,
    metadata: { gini, top3Pct, top5Pct, top10Pct, totalCompanies: revenues.length },
    alerts: top3Pct > 50
      ? [{ id: "concentration_high", type: "revenue", severity: "warning", title: "Concentration revenus", description: `Top 3 clients = ${formatPercent(top3Pct)} du CA. Risque de dépendance.` }]
      : [],
  });
}

// ── R10: MRR Approximation ──────────────────────────────────────────

export function computeMrrApprox(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Won in last 12 months
  const recent = wonDeals(deals).filter((d) => {
    if (!d.closedate) return false;
    const t = new Date(d.closedate).getTime();
    return t >= oneYearAgo.getTime() && t <= now.getTime();
  });

  // Apply additional filters
  let filtered = recent;
  if (filter?.ownerIds?.length) {
    const ids = new Set(filter.ownerIds);
    filtered = filtered.filter((d) => d.hubspot_owner_id && ids.has(d.hubspot_owner_id));
  }

  const totalRevenue = filtered.reduce((s, d) => s + (d.amount ?? 0), 0);
  const mrr = totalRevenue / 12;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOneYearAgo = new Date(oneYearAgo);
    prevOneYearAgo.setFullYear(prevOneYearAgo.getFullYear() - 1);
    const prevRecent = wonDeals(previousPeriodData).filter((d) => {
      if (!d.closedate) return false;
      const t = new Date(d.closedate).getTime();
      return t >= prevOneYearAgo.getTime() && t <= oneYearAgo.getTime();
    });
    const prevMrr = prevRecent.reduce((s, d) => s + (d.amount ?? 0), 0) / 12;
    trend = computeTrend(mrr, prevMrr);
  }

  return metricResult({
    value: mrr,
    displayValue: formatCurrency(mrr),
    trend,
    trendDirection: trendDir(trend),
    status: mrr > 0 ? "good" : "warning",
    sampleSize: filtered.length,
    metadata: { annualRevenue: totalRevenue },
  });
}

// ── R11: Revenue by Industry ────────────────────────────────────────

export function computeRevenueByIndustry(
  deals: DealRow[],
  companies: CompanyRow[],
  filter?: MetricFilter,
): MetricResult {
  const won = wonDeals(filterDeals(deals, filter));
  const companyMap = new Map(companies.map((c) => [c.hubspot_company_id, c]));

  const byIndustry: Record<string, { revenue: number; dealCount: number }> = {};

  for (const d of won) {
    let industry = "inconnu";
    for (const cid of d.company_ids) {
      const company = companyMap.get(cid);
      if (company?.industry) {
        industry = company.industry;
        break;
      }
    }
    if (!byIndustry[industry]) byIndustry[industry] = { revenue: 0, dealCount: 0 };
    byIndustry[industry].revenue += d.amount ?? 0;
    byIndustry[industry].dealCount++;
  }

  const total = won.reduce((s, d) => s + (d.amount ?? 0), 0);

  const industries = Object.entries(byIndustry)
    .map(([industry, data]) => ({
      industry,
      ...data,
      percent: total === 0 ? 0 : (data.revenue / total) * 100,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  return metricResult({
    value: total,
    displayValue: formatCurrency(total),
    sampleSize: won.length,
    metadata: { industries },
  });
}
