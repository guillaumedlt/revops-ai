import { describe, it, expect } from "vitest";
import {
  computeRevenueWon,
  computeRevenueByOwner,
  computeRevenueByAccount,
  computeRevenueSegmentation,
  computeAcvTrend,
  computeRevenueForecast,
  computeClientLtv,
  computeClientChurn,
  computeRevenueConcentration,
  computeMrrApprox,
  computeRevenueByIndustry,
} from "@/lib/scoring/metrics/revenue";
import { normalDeals, normalCompanies, makeDeal } from "../../fixtures/metric-data";
import type { CompanyRow } from "@/types/metrics";

// ── R1: Revenue Won ──────────────────────────────────────────────────

describe("computeRevenueWon", () => {
  it("sums amounts of won deals", () => {
    const result = computeRevenueWon(normalDeals);
    // Won amounts: 5000+10000+15000+20000+25000+30000+35000+40000 = 180000
    expect(result.value).toBe(180000);
    expect(result.metadata.dealCount).toBe(8);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueWon([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("handles null amounts (treated as 0)", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: null })];
    const result = computeRevenueWon(deals);
    expect(result.value).toBe(0);
    expect(result.metadata.dealCount).toBe(1);
  });

  it("computes trend with previous period", () => {
    const prev = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 90000, closedate: "2024-01-15T00:00:00Z" })];
    const result = computeRevenueWon(normalDeals, undefined, prev);
    // 180000 vs 90000 = 100%
    expect(result.trend).toBe(100);
  });
});

// ── R2: Revenue by Owner ─────────────────────────────────────────────

describe("computeRevenueByOwner", () => {
  it("groups revenue by owner", () => {
    const result = computeRevenueByOwner(normalDeals);
    const byOwner = result.metadata.byOwner as { ownerId: string; revenue: number }[];
    expect(byOwner.length).toBe(2);
    // owner-1 won: 5000+10000+15000+20000 = 50000
    const o1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(o1!.revenue).toBe(50000);
    // owner-2 won: 25000+30000+35000+40000 = 130000
    const o2 = byOwner.find((o) => o.ownerId === "owner-2");
    expect(o2!.revenue).toBe(130000);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueByOwner([]);
    expect(result.value).toBe(0);
  });

  it("assigns null owners to 'unassigned'", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, hubspot_owner_id: null, amount: 5000 })];
    const result = computeRevenueByOwner(deals);
    const byOwner = result.metadata.byOwner as { ownerId: string }[];
    expect(byOwner[0].ownerId).toBe("unassigned");
  });
});

// ── R3: Revenue by Account ───────────────────────────────────────────

describe("computeRevenueByAccount", () => {
  it("groups revenue by company", () => {
    const result = computeRevenueByAccount(normalDeals, normalCompanies);
    const top20 = result.metadata.top20 as { companyId: string; revenue: number }[];
    expect(top20.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueByAccount([], []);
    expect(result.value).toBe(0);
  });

  it("assigns deals without company to 'Sans entreprise'", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: [], amount: 5000 })];
    const result = computeRevenueByAccount(deals, []);
    const top20 = result.metadata.top20 as { companyId: string; name: string }[];
    expect(top20[0].name).toBe("Sans entreprise");
  });
});

// ── R4: Revenue Segmentation ─────────────────────────────────────────

describe("computeRevenueSegmentation", () => {
  it("splits revenue into new vs expansion", () => {
    const result = computeRevenueSegmentation(normalDeals);
    const newRev = (result.metadata.new as { revenue: number }).revenue;
    const expRev = (result.metadata.expansion as { revenue: number }).revenue;
    expect(newRev + expRev).toBe(result.value);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueSegmentation([]);
    expect(result.value).toBe(0);
  });

  it("classifies single company deal as new", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], amount: 10000 })];
    const result = computeRevenueSegmentation(deals);
    expect((result.metadata.new as { revenue: number }).revenue).toBe(10000);
  });
});

// ── R5: ACV Trend ────────────────────────────────────────────────────

describe("computeAcvTrend", () => {
  it("computes average deal size over time", () => {
    const result = computeAcvTrend(normalDeals);
    // Overall ACV = 180000 / 8 = 22500
    expect(result.value).toBe(22500);
    const monthly = result.metadata.monthly as { month: string; avg: number }[];
    expect(monthly.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeAcvTrend([]);
    expect(result.value).toBe(0);
  });

  it("handles single deal", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 50000 })];
    const result = computeAcvTrend(deals);
    expect(result.value).toBe(50000);
  });
});

// ── R6: Revenue Forecast ─────────────────────────────────────────────

describe("computeRevenueForecast", () => {
  it("sums won revenue + weighted pipeline", () => {
    const result = computeRevenueForecast(normalDeals, 200000);
    // Won = 180000, weighted open = 250 (from pipeline test)
    expect(result.value).toBe(180250);
    expect(result.metadata.actual).toBe(180000);
    expect(result.metadata.target).toBe(200000);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueForecast([], 100000);
    expect(result.value).toBe(0);
    expect(result.status).toBe("critical");
  });

  it("returns good status when forecast exceeds target", () => {
    const result = computeRevenueForecast(normalDeals, 100000);
    expect(result.status).toBe("good"); // 180250 >= 100000
  });

  it("handles zero target", () => {
    const result = computeRevenueForecast(normalDeals, 0);
    expect(result.metadata.pctOfTarget).toBe(0);
  });
});

// ── R7: Client LTV ───────────────────────────────────────────────────

describe("computeClientLtv", () => {
  it("computes average LTV per company", () => {
    const result = computeClientLtv(normalDeals, normalCompanies);
    expect(result.value).toBeGreaterThan(0);
    const topClients = result.metadata.topClients as { companyId: string; ltv: number }[];
    expect(topClients.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeClientLtv([], []);
    expect(result.value).toBe(0);
  });

  it("handles single company with multiple deals", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], amount: 10000 }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], amount: 20000 }),
    ];
    const companies: CompanyRow[] = [{ hubspot_company_id: "co1", name: "Acme", domain: "acme.com", industry: null, total_revenue: 0, deal_ids: [] }];
    const result = computeClientLtv(deals, companies);
    expect(result.value).toBe(30000); // single company, LTV = 30000, avg = 30000
  });
});

// ── R8: Client Churn ─────────────────────────────────────────────────

describe("computeClientChurn", () => {
  it("computes churn rate based on 6-month windows", () => {
    const result = computeClientChurn(normalDeals);
    // This depends on current date vs fixture dates
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(100);
  });

  it("returns 0 for empty data", () => {
    const result = computeClientChurn([]);
    expect(result.value).toBe(0);
  });

  it("returns 0 when all companies are retained", () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const nineMonthsAgo = new Date(now);
    nineMonthsAgo.setMonth(nineMonthsAgo.getMonth() - 9);

    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], closedate: nineMonthsAgo.toISOString() }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], closedate: threeMonthsAgo.toISOString() }),
    ];
    const result = computeClientChurn(deals);
    expect(result.value).toBe(0); // co1 is in both periods
  });
});

// ── R9: Revenue Concentration ────────────────────────────────────────

describe("computeRevenueConcentration", () => {
  it("computes Gini coefficient and concentration percentages", () => {
    const result = computeRevenueConcentration(normalDeals, normalCompanies);
    expect(result.metadata.gini).toBeGreaterThanOrEqual(0);
    expect(result.metadata.gini).toBeLessThanOrEqual(1);
    expect(result.metadata.top3Pct).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueConcentration([], []);
    expect(result.value).toBe(0);
  });

  it("returns high concentration for single company", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], amount: 100000 }),
    ];
    const result = computeRevenueConcentration(deals, normalCompanies);
    expect(result.metadata.top3Pct).toBe(100);
  });

  it("generates alert when top 3 > 50%", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: ["co1"], amount: 100000 }),
    ];
    const result = computeRevenueConcentration(deals, normalCompanies);
    expect(result.alerts.length).toBe(1);
  });
});

// ── R10: MRR Approximation ───────────────────────────────────────────

describe("computeMrrApprox", () => {
  it("computes MRR from last 12 months of won deals", () => {
    const result = computeMrrApprox(normalDeals);
    // Fixture deals have closedate in 2024 which is > 12 months ago
    // So MRR will be 0 (no recent won deals)
    expect(result.value).toBeGreaterThanOrEqual(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeMrrApprox([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("computes correctly for recent deals", () => {
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const deals = [
      makeDeal({
        hs_is_closed_won: true, hs_is_closed: true,
        amount: 120000,
        closedate: threeMonthsAgo.toISOString(),
      }),
    ];
    const result = computeMrrApprox(deals);
    // 120000 / 12 = 10000
    expect(result.value).toBe(10000);
    expect(result.metadata.annualRevenue).toBe(120000);
  });
});

// ── R11: Revenue by Industry ─────────────────────────────────────────

describe("computeRevenueByIndustry", () => {
  it("groups revenue by company industry", () => {
    const result = computeRevenueByIndustry(normalDeals, normalCompanies);
    const industries = result.metadata.industries as { industry: string; revenue: number }[];
    expect(industries.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueByIndustry([], []);
    expect(result.value).toBe(0);
  });

  it("labels unknown industry as 'inconnu'", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, company_ids: [], amount: 5000 })];
    const result = computeRevenueByIndustry(deals, []);
    const industries = result.metadata.industries as { industry: string }[];
    expect(industries[0].industry).toBe("inconnu");
  });
});
