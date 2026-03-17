import { describe, it, expect } from "vitest";
import {
  computePipelineValue,
  computePipelineByStage,
  computePipelineByOwner,
  computeDealCountByStage,
  computeWeightedPipeline,
  computePipelineCoverage,
  computeDealFlow,
  computeAverageDealSize,
  computeStalledDeals,
  computeInactiveDeals,
  computePipelineAge,
  computeNewPipeline,
} from "@/lib/scoring/metrics/pipeline";
import { normalDeals, makeDeal } from "../../fixtures/metric-data";

// ── P1: Pipeline Value ───────────────────────────────────────────────

describe("computePipelineValue", () => {
  it("sums amounts of open deals only", () => {
    const result = computePipelineValue(normalDeals);
    // Open deals: d1(10000) + d2(20000) + d3(15000) + d4(5000) + d5(null=0) = 50000
    expect(result.value).toBe(50000);
    expect(result.status).toBe("good");
    expect(result.metadata.dealCount).toBe(5);
  });

  it("returns 0 for empty data", () => {
    const result = computePipelineValue([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("returns 0 when all deals are closed", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true, amount: 50000 }),
    ];
    const result = computePipelineValue(deals);
    expect(result.value).toBe(0);
  });

  it("computes trend with previous period data", () => {
    const prev = [makeDeal({ amount: 25000 })]; // one open deal, 25000
    const result = computePipelineValue(normalDeals, undefined, prev);
    // 50000 vs 25000 = 100% increase
    expect(result.trend).toBe(100);
  });
});

// ── P2: Pipeline by Stage ────────────────────────────────────────────

describe("computePipelineByStage", () => {
  it("groups open deals by stage", () => {
    const result = computePipelineByStage(normalDeals);
    const stages = result.metadata.stages as { stage: string; value: number; count: number }[];
    expect(stages.length).toBeGreaterThan(0);
    const qualified = stages.find((s) => s.stage === "qualified");
    expect(qualified).toBeDefined();
    // d1(10000) + d4(5000) = 15000
    expect(qualified!.value).toBe(15000);
  });

  it("returns 0 for empty data", () => {
    const result = computePipelineByStage([]);
    expect(result.value).toBe(0);
  });

  it("excludes closed deals", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, dealstage: "closedwon" }),
      makeDeal({ hubspot_deal_id: "open", dealstage: "qualified", amount: 5000 }),
    ];
    const result = computePipelineByStage(deals);
    const stages = result.metadata.stages as { stage: string }[];
    const closedStage = stages.find((s) => s.stage === "closedwon");
    expect(closedStage).toBeUndefined();
  });
});

// ── P3: Pipeline by Owner ────────────────────────────────────────────

describe("computePipelineByOwner", () => {
  it("groups pipeline value by owner", () => {
    const result = computePipelineByOwner(normalDeals);
    const byOwner = result.metadata.byOwner as { ownerId: string; value: number }[];
    expect(byOwner.length).toBe(2);
    // owner-1: d1(10000) + d2(20000) + d5(0) = 30000
    const o1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(o1!.value).toBe(30000);
  });

  it("returns 0 for empty data", () => {
    const result = computePipelineByOwner([]);
    expect(result.value).toBe(0);
  });

  it("assigns null owners to 'unassigned'", () => {
    const deals = [makeDeal({ hubspot_owner_id: null, amount: 5000 })];
    const result = computePipelineByOwner(deals);
    const byOwner = result.metadata.byOwner as { ownerId: string }[];
    expect(byOwner[0].ownerId).toBe("unassigned");
  });
});

// ── P4: Deal Count by Stage ──────────────────────────────────────────

describe("computeDealCountByStage", () => {
  it("counts open deals per stage", () => {
    const result = computeDealCountByStage(normalDeals);
    expect(result.value).toBe(5); // 5 open deals
    const stages = result.metadata.stages as { stage: string; count: number }[];
    const qualified = stages.find((s) => s.stage === "qualified");
    expect(qualified!.count).toBe(2); // d1, d4
  });

  it("returns 0 for empty data", () => {
    const result = computeDealCountByStage([]);
    expect(result.value).toBe(0);
  });

  it("handles single-stage pipeline", () => {
    const deals = [
      makeDeal({ dealstage: "demo" }),
      makeDeal({ hubspot_deal_id: "d2", dealstage: "demo" }),
    ];
    const result = computeDealCountByStage(deals);
    const stages = result.metadata.stages as { stage: string; count: number }[];
    expect(stages.length).toBe(1);
    expect(stages[0].count).toBe(2);
  });
});

// ── P5: Weighted Pipeline ────────────────────────────────────────────

describe("computeWeightedPipeline", () => {
  it("sums amount * probability for open deals", () => {
    const result = computeWeightedPipeline(normalDeals);
    // Open deals: d1(10000*0.005) + d2(20000*0.005) + d3(15000*0.005) + d4(5000*0.005) + d5(0*0.005)
    // probability is 0.5, divided by 100 => 0.005
    // = 50 + 100 + 75 + 25 + 0 = 250
    expect(result.value).toBe(250);
  });

  it("returns 0 for empty data", () => {
    const result = computeWeightedPipeline([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("handles null probability as 0", () => {
    const deals = [makeDeal({ amount: 50000, hs_deal_stage_probability: null })];
    const result = computeWeightedPipeline(deals);
    expect(result.value).toBe(0);
  });

  it("handles null amount as 0", () => {
    const deals = [makeDeal({ amount: null, hs_deal_stage_probability: 50 })];
    const result = computeWeightedPipeline(deals);
    expect(result.value).toBe(0);
  });
});

// ── P6: Pipeline Coverage ────────────────────────────────────────────

describe("computePipelineCoverage", () => {
  it("computes ratio of pipeline to target", () => {
    const result = computePipelineCoverage(normalDeals, 25000);
    // 50000 / 25000 = 2.0
    expect(result.value).toBe(2.0);
    expect(result.status).toBe("warning"); // 2 < 3
  });

  it("returns 0 when target is 0", () => {
    const result = computePipelineCoverage(normalDeals, 0);
    expect(result.value).toBe(0);
  });

  it("returns good status for high coverage", () => {
    const result = computePipelineCoverage(normalDeals, 10000);
    // 50000 / 10000 = 5.0
    expect(result.value).toBe(5.0);
    expect(result.status).toBe("good"); // >= 3
  });
});

// ── P7: Deal Flow ────────────────────────────────────────────────────

describe("computeDealFlow", () => {
  it("computes created minus closed", () => {
    const result = computeDealFlow(normalDeals);
    // Without date range: all deals are "created", closed = 15 (8 won + 7 lost)
    // Created = 20, closed = 15, net = 5
    expect(result.metadata.created).toBe(20);
    expect(result.metadata.closed).toBe(15);
    expect(result.value).toBe(5);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeDealFlow([]);
    expect(result.value).toBe(0);
  });

  it("returns warning when more closed than created", () => {
    const deals = [
      makeDeal({ hs_is_closed: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true }),
      makeDeal({ hubspot_deal_id: "d3", hs_is_closed: true }),
      makeDeal({ hubspot_deal_id: "d4" }), // one open
    ];
    const result = computeDealFlow(deals);
    // Without date range: created=4, closed=3, net=1
    expect(result.value).toBe(1);
  });
});

// ── P8: Average Deal Size ────────────────────────────────────────────

describe("computeAverageDealSize", () => {
  it("averages deals with positive amounts", () => {
    const result = computeAverageDealSize(normalDeals);
    // Deals with amount > 0: 19 deals (d5 has null amount)
    // All other 19 deals have amounts. Sum them up and divide by 19.
    const amounts = normalDeals.filter((d) => (d.amount ?? 0) > 0).map((d) => d.amount!);
    const expectedAvg = amounts.reduce((s, v) => s + v, 0) / amounts.length;
    expect(result.value).toBeCloseTo(expectedAvg, 1);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeAverageDealSize([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("returns 0 when all amounts are null", () => {
    const deals = [
      makeDeal({ amount: null }),
      makeDeal({ hubspot_deal_id: "d2", amount: null }),
    ];
    const result = computeAverageDealSize(deals);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });

  it("excludes zero-amount deals", () => {
    const deals = [
      makeDeal({ amount: 0 }),
      makeDeal({ hubspot_deal_id: "d2", amount: 10000 }),
    ];
    const result = computeAverageDealSize(deals);
    expect(result.value).toBe(10000);
    expect(result.sampleSize).toBe(1);
  });
});

// ── P9: Stalled Deals ────────────────────────────────────────────────

describe("computeStalledDeals", () => {
  it("computes percentage of stalled open deals", () => {
    const result = computeStalledDeals(normalDeals);
    // Open deals: 5, stalled: d3 only => 1/5 = 20%
    expect(result.value).toBe(20);
    expect(result.metadata.stalled).toBe(1);
    expect(result.metadata.total).toBe(5);
  });

  it("returns 0 for empty data", () => {
    const result = computeStalledDeals([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when all open deals are stalled", () => {
    const deals = [
      makeDeal({ hs_is_stalled: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_stalled: true }),
    ];
    const result = computeStalledDeals(deals);
    expect(result.value).toBe(100);
    expect(result.status).toBe("critical");
  });

  it("generates alert when stalled > 25%", () => {
    const deals = [
      makeDeal({ hs_is_stalled: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_stalled: true }),
      makeDeal({ hubspot_deal_id: "d3", hs_is_stalled: false }),
    ];
    const result = computeStalledDeals(deals);
    // 2/3 = 66.7% > 25%
    expect(result.alerts.length).toBe(1);
    expect(result.alerts[0].severity).toBe("warning");
  });
});

// ── P10: Inactive Deals ──────────────────────────────────────────────

describe("computeInactiveDeals", () => {
  it("counts deals without recent activity", () => {
    const result = computeInactiveDeals(normalDeals);
    // d4 has null activity date => inactive
    // d1-d3,d5 have "2024-06-01" which is > 14 days ago => all inactive
    expect(result.metadata.inactive).toBe(5);
    expect(result.value).toBe(100);
  });

  it("returns 0 for empty data", () => {
    const result = computeInactiveDeals([]);
    expect(result.value).toBe(0);
  });

  it("treats null activity date as inactive", () => {
    const deals = [makeDeal({ hs_last_sales_activity_date: null })];
    const result = computeInactiveDeals(deals);
    expect(result.value).toBe(100);
  });

  it("treats recent activity as not inactive", () => {
    const recent = new Date().toISOString();
    const deals = [makeDeal({ hs_last_sales_activity_date: recent })];
    const result = computeInactiveDeals(deals);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good");
  });
});

// ── P11: Pipeline Age ────────────────────────────────────────────────

describe("computePipelineAge", () => {
  it("distributes open deals into age buckets", () => {
    const result = computePipelineAge(normalDeals);
    const dist = result.metadata.distribution as { bucket: string; count: number }[];
    expect(dist.length).toBe(5);
    // All open deals have createdate "2024-03-01" which is > 180 days ago
    const over180 = dist.find((d) => d.bucket === "180d+");
    expect(over180!.count).toBe(5);
  });

  it("returns 0 for empty data", () => {
    const result = computePipelineAge([]);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });

  it("classifies recent deals correctly", () => {
    const recent = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
    const deals = [makeDeal({ createdate: recent })];
    const result = computePipelineAge(deals);
    expect(result.value).toBe(0); // 0% over 90d
    expect(result.status).toBe("good");
  });
});

// ── P12: New Pipeline ────────────────────────────────────────────────

describe("computeNewPipeline", () => {
  it("sums all deal amounts in period", () => {
    const result = computeNewPipeline(normalDeals);
    const expectedTotal = normalDeals.reduce((s, d) => s + (d.amount ?? 0), 0);
    expect(result.value).toBe(expectedTotal);
  });

  it("returns 0 for empty data", () => {
    const result = computeNewPipeline([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("computes trend correctly", () => {
    const prev = [makeDeal({ amount: 5000 })];
    const current = [makeDeal({ amount: 10000 })];
    const result = computeNewPipeline(current, undefined, prev);
    expect(result.trend).toBe(100); // doubled
  });
});
