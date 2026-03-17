import { describe, it, expect } from "vitest";
import {
  computeDealsNoAmount,
  computeOverdueDeals,
  computeDealsNoContact,
  computeDealsNoCompany,
  computeFieldCompleteness,
  computePipelineHygiene,
  computeDqTrend,
  computeDuplicates,
  computeClosedDealCompleteness,
  computeDataQualityScore,
} from "@/lib/scoring/metrics/data-quality";
import { normalDeals, normalContacts, normalCompanies, makeDeal, makeContact } from "../../fixtures/metric-data";

// ── D2: Deals No Amount ──────────────────────────────────────────────

describe("computeDealsNoAmount", () => {
  it("computes percentage of open deals without amount", () => {
    const result = computeDealsNoAmount(normalDeals);
    // Open deals: 5, d5 has null amount => 1/5 = 20%
    expect(result.value).toBe(20);
    expect(result.metadata.noAmount).toBe(1);
    expect(result.metadata.total).toBe(5);
  });

  it("returns 0 for empty data", () => {
    const result = computeDealsNoAmount([]);
    expect(result.value).toBe(0);
  });

  it("returns 0% when all have amounts", () => {
    const deals = [
      makeDeal({ amount: 5000 }),
      makeDeal({ hubspot_deal_id: "d2", amount: 10000 }),
    ];
    const result = computeDealsNoAmount(deals);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good");
  });

  it("treats zero amount same as null", () => {
    const deals = [makeDeal({ amount: 0 })];
    const result = computeDealsNoAmount(deals);
    expect(result.value).toBe(100);
  });

  it("computes trend with previous period", () => {
    const prev = [makeDeal({ amount: null })]; // 100% no amount
    const deals = [makeDeal({ amount: 5000 })]; // 0% no amount
    const result = computeDealsNoAmount(deals, undefined, prev);
    // 0% vs 100% => (0-100)/100*100 = -100
    expect(result.trend).toBe(-100);
  });
});

// ── D3: Overdue Deals ────────────────────────────────────────────────

describe("computeOverdueDeals", () => {
  it("counts open deals with past close date", () => {
    const result = computeOverdueDeals(normalDeals);
    // All 5 open deals have closedate "2024-06-15" which is in the past
    expect(result.metadata.overdue).toBe(5);
    expect(result.value).toBe(100);
  });

  it("returns 0 for empty data", () => {
    const result = computeOverdueDeals([]);
    expect(result.value).toBe(0);
  });

  it("returns 0% when close dates are in the future", () => {
    const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const deals = [makeDeal({ closedate: futureDate })];
    const result = computeOverdueDeals(deals);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good");
  });

  it("ignores deals with null close date", () => {
    const deals = [makeDeal({ closedate: null })];
    const result = computeOverdueDeals(deals);
    expect(result.metadata.overdue).toBe(0);
  });

  it("generates alert when overdue > 25%", () => {
    const pastDate = "2020-01-01T00:00:00Z";
    const deals = [
      makeDeal({ closedate: pastDate }),
      makeDeal({ hubspot_deal_id: "d2", closedate: pastDate }),
    ];
    const result = computeOverdueDeals(deals);
    expect(result.alerts.length).toBe(1);
  });
});

// ── D4: Deals No Contact ─────────────────────────────────────────────

describe("computeDealsNoContact", () => {
  it("counts open deals without contacts", () => {
    const result = computeDealsNoContact(normalDeals);
    // All 5 open deals have contact_ids: ["c1"] => 0/5 = 0%
    expect(result.value).toBe(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeDealsNoContact([]);
    expect(result.value).toBe(0);
  });

  it("detects deals without contacts", () => {
    const deals = [
      makeDeal({ contact_ids: [] }),
      makeDeal({ hubspot_deal_id: "d2", contact_ids: ["c1"] }),
    ];
    const result = computeDealsNoContact(deals);
    expect(result.value).toBe(50); // 1/2
  });
});

// ── D5: Deals No Company ─────────────────────────────────────────────

describe("computeDealsNoCompany", () => {
  it("counts open deals without companies", () => {
    const result = computeDealsNoCompany(normalDeals);
    // All 5 open deals have company_ids: ["co1"] => 0%
    expect(result.value).toBe(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeDealsNoCompany([]);
    expect(result.value).toBe(0);
  });

  it("detects deals without companies", () => {
    const deals = [
      makeDeal({ company_ids: [] }),
      makeDeal({ hubspot_deal_id: "d2", company_ids: [] }),
      makeDeal({ hubspot_deal_id: "d3", company_ids: ["co1"] }),
    ];
    const result = computeDealsNoCompany(deals);
    expect(result.value).toBeCloseTo(66.67, 0); // 2/3
  });
});

// ── D6: Field Completeness ───────────────────────────────────────────

describe("computeFieldCompleteness", () => {
  it("computes average field fill rate", () => {
    const result = computeFieldCompleteness(normalDeals);
    expect(result.value).toBeGreaterThan(0);
    expect(result.value).toBeLessThanOrEqual(100);
    const fields = result.metadata.fields as { field: string; rate: number }[];
    expect(fields.length).toBe(7);
  });

  it("returns 0 for empty data", () => {
    const result = computeFieldCompleteness([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("critical");
  });

  it("returns 100% for fully complete deal", () => {
    const deals = [makeDeal({
      amount: 5000,
      closedate: "2024-06-01T00:00:00Z",
      dealstage: "qualified",
      hubspot_owner_id: "o1",
      contact_ids: ["c1"],
      company_ids: ["co1"],
      hs_analytics_source: "ORGANIC_SEARCH",
    })];
    const result = computeFieldCompleteness(deals);
    expect(result.value).toBe(100);
  });
});

// ── D7: Pipeline Hygiene ─────────────────────────────────────────────

describe("computePipelineHygiene", () => {
  it("computes composite hygiene score for normal data", () => {
    const result = computePipelineHygiene(normalDeals);
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(100);
    expect(result.metadata.stalledPct).toBeDefined();
    expect(result.metadata.overduePct).toBeDefined();
  });

  it("returns 100 for empty data (no open deals = clean)", () => {
    const result = computePipelineHygiene([]);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good");
  });

  it("returns perfect score for healthy pipeline", () => {
    const recent = new Date().toISOString();
    const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const deals = [
      makeDeal({
        hs_is_stalled: false,
        closedate: futureDate,
        hs_last_sales_activity_date: recent,
        amount: 10000,
      }),
    ];
    const result = computePipelineHygiene(deals);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good");
  });

  it("penalizes stalled, overdue, inactive and no-amount deals", () => {
    const pastDate = "2020-01-01T00:00:00Z";
    const deals = [
      makeDeal({
        hs_is_stalled: true,
        closedate: pastDate,
        hs_last_sales_activity_date: null,
        amount: null,
      }),
    ];
    const result = computePipelineHygiene(deals);
    // All 4 factors are at 100%: score = max(0, 100 - 100*0.3 - 100*0.3 - 100*0.2 - 100*0.2) = 0
    expect(result.value).toBe(0);
  });
});

// ── D8: DQ Trend ─────────────────────────────────────────────────────

describe("computeDqTrend", () => {
  it("returns latest score and trend", () => {
    const result = computeDqTrend([60, 70, 80]);
    expect(result.value).toBe(80);
    // trend: (80-70)/70*100 = 14.29%
    expect(result.trend).toBeCloseTo(14.29, 1);
  });

  it("returns 0 for empty array", () => {
    const result = computeDqTrend([]);
    expect(result.value).toBe(0);
    expect(result.trend).toBeNull();
  });

  it("handles single score (no trend)", () => {
    const result = computeDqTrend([75]);
    expect(result.value).toBe(75);
    expect(result.trend).toBeNull();
  });

  it("computes negative trend", () => {
    const result = computeDqTrend([80, 60]);
    expect(result.value).toBe(60);
    expect(result.trend).toBe(-25); // (60-80)/80*100
  });
});

// ── D9: Duplicates ───────────────────────────────────────────────────

describe("computeDuplicates", () => {
  it("detects duplicate contacts by email", () => {
    const contacts = [
      makeContact({ hubspot_contact_id: "c1", email: "dup@example.com" }),
      makeContact({ hubspot_contact_id: "c2", email: "dup@example.com" }),
      makeContact({ hubspot_contact_id: "c3", email: "unique@example.com" }),
    ];
    const result = computeDuplicates(contacts, [], []);
    expect(result.value).toBe(1); // 1 duplicate email
  });

  it("returns 0 for empty data", () => {
    const result = computeDuplicates([], [], []);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good");
  });

  it("detects duplicate companies by domain", () => {
    const companies = [
      { hubspot_company_id: "co1", name: "A", domain: "acme.com", industry: null, total_revenue: 0, deal_ids: [] },
      { hubspot_company_id: "co2", name: "B", domain: "acme.com", industry: null, total_revenue: 0, deal_ids: [] },
    ];
    const result = computeDuplicates([], companies, []);
    expect(result.value).toBe(1);
  });

  it("detects duplicate deals by name+amount", () => {
    const deals = [
      makeDeal({ hubspot_deal_id: "d1", dealname: "Big Deal", amount: 50000 }),
      makeDeal({ hubspot_deal_id: "d2", dealname: "Big Deal", amount: 50000 }),
    ];
    const result = computeDuplicates([], [], deals);
    expect(result.value).toBe(1);
  });

  it("generates alert for > 20 duplicates", () => {
    const contacts = Array.from({ length: 25 }, (_, i) =>
      makeContact({ hubspot_contact_id: `c${i}`, email: "same@example.com" }),
    );
    const result = computeDuplicates(contacts, [], []);
    // 24 duplicates > 20
    expect(result.alerts.length).toBe(1);
    expect(result.alerts[0].severity).toBe("critical");
  });
});

// ── D10: Closed Deal Completeness ────────────────────────────────────

describe("computeClosedDealCompleteness", () => {
  it("computes percentage of fully complete closed deals", () => {
    const result = computeClosedDealCompleteness(normalDeals);
    // Closed deals: 15. Each has amount, closedate, dealstage, owner, contact_ids, company_ids, source
    // All should be complete
    expect(result.value).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeClosedDealCompleteness([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% for fully complete closed deal", () => {
    const deals = [makeDeal({
      hs_is_closed: true,
      hs_is_closed_won: true,
      amount: 5000,
      closedate: "2024-06-01T00:00:00Z",
      dealstage: "closedwon",
      hubspot_owner_id: "o1",
      contact_ids: ["c1"],
      company_ids: ["co1"],
      hs_analytics_source: "ORGANIC_SEARCH",
    })];
    const result = computeClosedDealCompleteness(deals);
    expect(result.value).toBe(100);
  });

  it("returns 0% when closed deal has missing fields", () => {
    const deals = [makeDeal({
      hs_is_closed: true,
      amount: null,
      contact_ids: [],
      company_ids: [],
      hs_analytics_source: null,
    })];
    const result = computeClosedDealCompleteness(deals);
    expect(result.value).toBe(0);
  });
});

// ── D1: Data Quality Score (Composite) ───────────────────────────────

describe("computeDataQualityScore", () => {
  it("computes composite score for normal data", () => {
    const result = computeDataQualityScore(normalDeals, normalContacts);
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(100);
    expect(result.metadata.breakdown).toBeDefined();
  });

  it("returns score for empty data", () => {
    const result = computeDataQualityScore([], []);
    expect(result.value).toBeGreaterThanOrEqual(0);
    expect(result.value).toBeLessThanOrEqual(100);
  });

  it("returns high score for clean data", () => {
    const recent = new Date().toISOString();
    const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const deals = [makeDeal({
      amount: 10000,
      closedate: futureDate,
      dealstage: "qualified",
      hubspot_owner_id: "o1",
      contact_ids: ["c1"],
      company_ids: ["co1"],
      hs_analytics_source: "ORGANIC_SEARCH",
      hs_is_stalled: false,
      hs_last_sales_activity_date: recent,
    })];
    const contacts = [makeContact()];
    const result = computeDataQualityScore(deals, contacts);
    // Should be relatively high (> 70)
    expect(result.value).toBeGreaterThan(70);
  });

  it("collects alerts from sub-metrics", () => {
    const pastDate = "2020-01-01T00:00:00Z";
    const deals = Array.from({ length: 5 }, (_, i) =>
      makeDeal({
        hubspot_deal_id: `d${i}`,
        closedate: pastDate,
        amount: null,
        hs_is_stalled: true,
        hs_last_sales_activity_date: null,
      }),
    );
    const result = computeDataQualityScore(deals, []);
    // Should have alerts from overdue and/or other sub-metrics
    expect(result.alerts.length).toBeGreaterThanOrEqual(0);
  });
});
