// Data Quality metrics (D1-D10)

import type { MetricResult, MetricFilter, DealRow, ContactRow, CompanyRow } from "@/types/metrics";
import { metricResult, trendDir, statusFromThresholds, statusFromThresholdsInverse } from "@/types/metrics";
import { formatPercent, formatNumber } from "@/lib/utils/formatting";

// ── Helpers ──────────────────────────────────────────────────────────

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

function openDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => !d.hs_is_closed);
}

function closedDeals(deals: DealRow[]): DealRow[] {
  return deals.filter((d) => d.hs_is_closed === true);
}

// ── D2: Deals No Amount ─────────────────────────────────────────────

export function computeDealsNoAmount(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = openDeals(filterDeals(deals, filter));
  const noAmount = open.filter((d) => d.amount === null || d.amount === 0).length;
  const total = open.length;
  const pct = total === 0 ? 0 : (noAmount / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = openDeals(filterDeals(previousPeriodData, filter));
    const prevNoAmount = prevOpen.filter((d) => d.amount === null || d.amount === 0).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevNoAmount / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 5, 15),
    sampleSize: total,
    metadata: { noAmount, total },
  });
}

// ── D3: Overdue Deals ───────────────────────────────────────────────

export function computeOverdueDeals(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = openDeals(filterDeals(deals, filter));
  const now = Date.now();
  const overdue = open.filter((d) => {
    if (!d.closedate) return false;
    return new Date(d.closedate).getTime() < now;
  }).length;
  const total = open.length;
  const pct = total === 0 ? 0 : (overdue / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = openDeals(filterDeals(previousPeriodData, filter));
    const prevOverdue = prevOpen.filter((d) => {
      if (!d.closedate) return false;
      return new Date(d.closedate).getTime() < now;
    }).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevOverdue / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 10, 25),
    sampleSize: total,
    metadata: { overdue, total },
    alerts: pct > 25
      ? [{ id: "overdue_high", type: "data_quality", severity: "warning", title: "Deals en retard", description: `${overdue} deals ouverts (${formatPercent(pct)}) ont une date de clôture dépassée.` }]
      : [],
  });
}

// ── D4: Deals No Contact ────────────────────────────────────────────

export function computeDealsNoContact(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = openDeals(filterDeals(deals, filter));
  const noContact = open.filter((d) => d.contact_ids.length === 0).length;
  const total = open.length;
  const pct = total === 0 ? 0 : (noContact / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = openDeals(filterDeals(previousPeriodData, filter));
    const prevNoContact = prevOpen.filter((d) => d.contact_ids.length === 0).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevNoContact / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 5, 20),
    sampleSize: total,
    metadata: { noContact, total },
  });
}

// ── D5: Deals No Company ────────────────────────────────────────────

export function computeDealsNoCompany(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = openDeals(filterDeals(deals, filter));
  const noCompany = open.filter((d) => d.company_ids.length === 0).length;
  const total = open.length;
  const pct = total === 0 ? 0 : (noCompany / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = openDeals(filterDeals(previousPeriodData, filter));
    const prevNoCompany = prevOpen.filter((d) => d.company_ids.length === 0).length;
    const prevPct = prevOpen.length === 0 ? 0 : (prevNoCompany / prevOpen.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholdsInverse(pct, 5, 20),
    sampleSize: total,
    metadata: { noCompany, total },
  });
}

// ── D6: Field Completeness ──────────────────────────────────────────

export function computeFieldCompleteness(
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  const filtered = filterDeals(deals, filter);
  const total = filtered.length;

  if (total === 0) {
    return metricResult({
      value: 0,
      displayValue: formatPercent(0),
      status: "critical",
      sampleSize: 0,
      metadata: { fields: [] },
    });
  }

  const fields: { field: string; filled: number; rate: number }[] = [
    {
      field: "amount",
      filled: filtered.filter((d) => d.amount !== null && d.amount > 0).length,
      rate: 0,
    },
    {
      field: "closedate",
      filled: filtered.filter((d) => d.closedate !== null).length,
      rate: 0,
    },
    {
      field: "dealstage",
      filled: filtered.filter((d) => d.dealstage !== null).length,
      rate: 0,
    },
    {
      field: "owner",
      filled: filtered.filter((d) => d.hubspot_owner_id !== null).length,
      rate: 0,
    },
    {
      field: "contact",
      filled: filtered.filter((d) => d.contact_ids.length > 0).length,
      rate: 0,
    },
    {
      field: "company",
      filled: filtered.filter((d) => d.company_ids.length > 0).length,
      rate: 0,
    },
    {
      field: "source",
      filled: filtered.filter((d) => d.hs_analytics_source !== null).length,
      rate: 0,
    },
  ];

  for (const f of fields) {
    f.rate = (f.filled / total) * 100;
  }

  const avgRate = fields.reduce((s, f) => s + f.rate, 0) / fields.length;

  return metricResult({
    value: avgRate,
    displayValue: formatPercent(avgRate),
    status: statusFromThresholds(avgRate, 80, 60),
    sampleSize: total,
    metadata: { fields },
  });
}

// ── D7: Pipeline Hygiene ────────────────────────────────────────────

export function computePipelineHygiene(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const open = openDeals(filterDeals(deals, filter));
  const total = open.length;

  if (total === 0) {
    return metricResult({
      value: 100,
      displayValue: formatPercent(100),
      status: "good",
      sampleSize: 0,
      metadata: {},
    });
  }

  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  const stalledPct = (open.filter((d) => d.hs_is_stalled === true).length / total) * 100;
  const overduePct = (open.filter((d) => d.closedate && new Date(d.closedate).getTime() < now).length / total) * 100;
  const inactivePct = (open.filter((d) => {
    if (!d.hs_last_sales_activity_date) return true;
    return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
  }).length / total) * 100;
  const noAmountPct = (open.filter((d) => d.amount === null || d.amount === 0).length / total) * 100;

  const score = Math.max(0, 100 - stalledPct * 0.3 - overduePct * 0.3 - inactivePct * 0.2 - noAmountPct * 0.2);

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevOpen = openDeals(filterDeals(previousPeriodData, filter));
    const prevTotal = prevOpen.length;
    if (prevTotal > 0) {
      const prevStalledPct = (prevOpen.filter((d) => d.hs_is_stalled === true).length / prevTotal) * 100;
      const prevOverduePct = (prevOpen.filter((d) => d.closedate && new Date(d.closedate).getTime() < now).length / prevTotal) * 100;
      const prevInactivePct = (prevOpen.filter((d) => {
        if (!d.hs_last_sales_activity_date) return true;
        return now - new Date(d.hs_last_sales_activity_date).getTime() > fourteenDaysMs;
      }).length / prevTotal) * 100;
      const prevNoAmountPct = (prevOpen.filter((d) => d.amount === null || d.amount === 0).length / prevTotal) * 100;
      const prevScore = Math.max(0, 100 - prevStalledPct * 0.3 - prevOverduePct * 0.3 - prevInactivePct * 0.2 - prevNoAmountPct * 0.2);
      trend = computeTrend(score, prevScore);
    }
  }

  return metricResult({
    value: score,
    displayValue: formatPercent(score, 0),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(score, 75, 50),
    sampleSize: total,
    metadata: { stalledPct, overduePct, inactivePct, noAmountPct },
  });
}

// ── D8: DQ Trend ────────────────────────────────────────────────────

export function computeDqTrend(
  weeklyScores: number[],
): MetricResult {
  const latest = weeklyScores.length > 0 ? weeklyScores[weeklyScores.length - 1] : 0;

  let trend: number | null = null;
  if (weeklyScores.length >= 2) {
    const prev = weeklyScores[weeklyScores.length - 2];
    trend = computeTrend(latest, prev);
  }

  return metricResult({
    value: latest,
    displayValue: formatPercent(latest, 0),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(latest, 75, 50),
    sampleSize: weeklyScores.length,
    metadata: { weeklyScores },
  });
}

// ── D9: Duplicates ──────────────────────────────────────────────────

export function computeDuplicates(
  contacts: ContactRow[],
  companies: CompanyRow[],
  deals: DealRow[],
  filter?: MetricFilter,
): MetricResult {
  let duplicateCount = 0;
  const details: { type: string; count: number }[] = [];

  // Duplicate contacts by email
  const emailCounts: Record<string, number> = {};
  const filteredContacts = filterContacts(contacts, filter);
  for (const c of filteredContacts) {
    if (c.email) {
      const email = c.email.toLowerCase().trim();
      emailCounts[email] = (emailCounts[email] ?? 0) + 1;
    }
  }
  const dupEmails = Object.values(emailCounts).filter((n) => n > 1).reduce((s, n) => s + (n - 1), 0);
  duplicateCount += dupEmails;
  details.push({ type: "contacts_email", count: dupEmails });

  // Duplicate companies by domain
  const domainCounts: Record<string, number> = {};
  for (const c of companies) {
    if (c.domain) {
      const domain = c.domain.toLowerCase().trim();
      domainCounts[domain] = (domainCounts[domain] ?? 0) + 1;
    }
  }
  const dupDomains = Object.values(domainCounts).filter((n) => n > 1).reduce((s, n) => s + (n - 1), 0);
  duplicateCount += dupDomains;
  details.push({ type: "companies_domain", count: dupDomains });

  // Duplicate deals by dealname + amount
  const dealKeys: Record<string, number> = {};
  const filteredDeals = filterDeals(deals, filter);
  for (const d of filteredDeals) {
    if (d.dealname && d.amount !== null) {
      const key = `${d.dealname.toLowerCase().trim()}|${d.amount}`;
      dealKeys[key] = (dealKeys[key] ?? 0) + 1;
    }
  }
  const dupDeals = Object.values(dealKeys).filter((n) => n > 1).reduce((s, n) => s + (n - 1), 0);
  duplicateCount += dupDeals;
  details.push({ type: "deals_name_amount", count: dupDeals });

  const status = duplicateCount > 20 ? "critical" : duplicateCount > 5 ? "warning" : "good";

  return metricResult({
    value: duplicateCount,
    displayValue: formatNumber(duplicateCount),
    status,
    sampleSize: filteredContacts.length + companies.length + filteredDeals.length,
    metadata: { details },
    alerts: duplicateCount > 20
      ? [{ id: "duplicates_critical", type: "data_quality", severity: "critical", title: "Doublons détectés", description: `${duplicateCount} doublons potentiels trouvés.` }]
      : [],
  });
}

// ── D10: Closed Deal Completeness ───────────────────────────────────

export function computeClosedDealCompleteness(
  deals: DealRow[],
  filter?: MetricFilter,
  previousPeriodData?: DealRow[],
): MetricResult {
  const closed = closedDeals(filterDeals(deals, filter));
  const total = closed.length;

  const complete = closed.filter((d) =>
    d.amount !== null && d.amount > 0 &&
    d.closedate !== null &&
    d.dealstage !== null &&
    d.hubspot_owner_id !== null &&
    d.contact_ids.length > 0 &&
    d.company_ids.length > 0 &&
    d.hs_analytics_source !== null,
  ).length;

  const pct = total === 0 ? 0 : (complete / total) * 100;

  let trend: number | null = null;
  if (previousPeriodData) {
    const prevClosed = closedDeals(filterDeals(previousPeriodData, filter));
    const prevComplete = prevClosed.filter((d) =>
      d.amount !== null && d.amount > 0 &&
      d.closedate !== null &&
      d.dealstage !== null &&
      d.hubspot_owner_id !== null &&
      d.contact_ids.length > 0 &&
      d.company_ids.length > 0 &&
      d.hs_analytics_source !== null,
    ).length;
    const prevPct = prevClosed.length === 0 ? 0 : (prevComplete / prevClosed.length) * 100;
    trend = computeTrend(pct, prevPct);
  }

  return metricResult({
    value: pct,
    displayValue: formatPercent(pct),
    trend,
    trendDirection: trendDir(trend),
    status: statusFromThresholds(pct, 90, 70),
    sampleSize: total,
    metadata: { complete, total },
  });
}

// ── D1: Data Quality Score (Composite) ──────────────────────────────

export function computeDataQualityScore(
  deals: DealRow[],
  contacts: ContactRow[],
  filter?: MetricFilter,
): MetricResult {
  // Compute sub-metrics
  const d2 = computeDealsNoAmount(deals, filter);
  const d3 = computeOverdueDeals(deals, filter);
  const d4 = computeDealsNoContact(deals, filter);
  const d5 = computeDealsNoCompany(deals, filter);
  const d6 = computeFieldCompleteness(deals, filter);
  const d7 = computePipelineHygiene(deals, filter);
  const d10 = computeClosedDealCompleteness(deals, filter);

  // Convert % issues to scores (100 - pct for inverse metrics)
  const noAmountScore = 100 - d2.value;
  const overdueScore = 100 - d3.value;
  const noContactScore = 100 - d4.value;
  const noCompanyScore = 100 - d5.value;
  const completenessScore = d6.value;
  const hygieneScore = d7.value;
  const closedCompleteScore = d10.value;

  // Weighted composite
  const score =
    noAmountScore * 0.20 +
    overdueScore * 0.15 +
    noContactScore * 0.15 +
    noCompanyScore * 0.10 +
    completenessScore * 0.15 +
    hygieneScore * 0.10 +
    closedCompleteScore * 0.05 +
    50 * 0.10; // D9 duplicates placeholder (will be computed separately if needed)

  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  // Collect all alerts
  const alerts = [...d2.alerts, ...d3.alerts, ...d4.alerts, ...d5.alerts, ...d6.alerts, ...d7.alerts, ...d10.alerts];

  return metricResult({
    value: clamped,
    displayValue: formatPercent(clamped, 0),
    status: statusFromThresholds(clamped, 75, 50),
    sampleSize: filterDeals(deals, filter).length,
    metadata: {
      breakdown: {
        noAmount: { score: noAmountScore, weight: 0.20 },
        overdue: { score: overdueScore, weight: 0.15 },
        noContact: { score: noContactScore, weight: 0.15 },
        noCompany: { score: noCompanyScore, weight: 0.10 },
        completeness: { score: completenessScore, weight: 0.15 },
        hygiene: { score: hygieneScore, weight: 0.10 },
        closedComplete: { score: closedCompleteScore, weight: 0.05 },
        duplicates: { score: 50, weight: 0.10 },
      },
    },
    alerts,
  });
}
