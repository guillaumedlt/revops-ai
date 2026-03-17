import { describe, it, expect } from "vitest";
import {
  computeSalesCycle,
  computeSalesCycleByOwner,
  computeSalesCycleByAmount,
  computeTimePerStage,
  computeBottleneck,
  computeStageConversion,
  computeTimeInCurrentStage,
  computeVelocityTrend,
  computeLostEntryStage,
  computeSalesVelocityIndex,
} from "@/lib/scoring/metrics/velocity";
import { normalDeals, normalStages, makeDeal } from "../../fixtures/metric-data";

// ── V1: Sales Cycle ──────────────────────────────────────────────────

describe("computeSalesCycle", () => {
  it("computes median days-to-close for won deals", () => {
    const result = computeSalesCycle(normalDeals);
    // Won deals days_to_close: 20, 25, 30, 35, 40, 45, 50, 55
    // Median of 8 values = (35+40)/2 = 37.5
    expect(result.value).toBe(37.5);
    expect(result.sampleSize).toBe(8);
  });

  it("returns 0 for empty data", () => {
    const result = computeSalesCycle([]);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });

  it("returns correct value for single deal", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, days_to_close: 42 })];
    const result = computeSalesCycle(deals);
    expect(result.value).toBe(42);
    expect(result.sampleSize).toBe(1);
  });

  it("excludes deals with null days_to_close", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, days_to_close: 30 }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed_won: true, hs_is_closed: true, days_to_close: null }),
    ];
    const result = computeSalesCycle(deals);
    expect(result.value).toBe(30);
    expect(result.sampleSize).toBe(1);
  });

  it("computes trend with previous period data", () => {
    const prev = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, days_to_close: 75, closedate: "2024-01-15T00:00:00Z" })];
    const result = computeSalesCycle(normalDeals, undefined, prev);
    // 37.5 vs 75 => (37.5-75)/75 * 100 = -50
    expect(result.trend).toBe(-50);
  });
});

// ── V2: Sales Cycle by Owner ─────────────────────────────────────────

describe("computeSalesCycleByOwner", () => {
  it("groups cycle times by owner", () => {
    const result = computeSalesCycleByOwner(normalDeals);
    const byOwner = result.metadata.byOwner as { ownerId: string; median: number }[];
    expect(byOwner.length).toBe(2);
    // owner-1 won deals: dtc 20,25,30,35 => median (25+30)/2=27.5
    const o1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(o1!.median).toBe(27.5);
  });

  it("returns 0 for empty data", () => {
    const result = computeSalesCycleByOwner([]);
    expect(result.value).toBe(0);
  });

  it("handles all null days_to_close", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, days_to_close: null }),
    ];
    const result = computeSalesCycleByOwner(deals);
    expect(result.value).toBe(0);
  });
});

// ── V3: Sales Cycle by Amount ────────────────────────────────────────

describe("computeSalesCycleByAmount", () => {
  it("splits into amount brackets", () => {
    const result = computeSalesCycleByAmount(normalDeals);
    const byBracket = result.metadata.byBracket as { bracket: string; median: number; count: number }[];
    expect(byBracket.length).toBe(6);
    // Won deals with amount < 5K: won-0 (5000 is NOT < 5K, its >= 5K)
    // Actually won-0 has amount 5000, which falls into "5-15K"
    const small = byBracket.find((b) => b.bracket === "<5K");
    expect(small!.count).toBe(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeSalesCycleByAmount([]);
    expect(result.value).toBe(0);
  });

  it("handles single large deal", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 200000, days_to_close: 90 })];
    const result = computeSalesCycleByAmount(deals);
    const large = (result.metadata.byBracket as { bracket: string; count: number }[]).find((b) => b.bracket === ">100K");
    expect(large!.count).toBe(1);
  });
});

// ── V4: Time per Stage ───────────────────────────────────────────────

describe("computeTimePerStage", () => {
  it("computes average days per stage", () => {
    const deals = [
      makeDeal({
        hs_is_closed_won: true,
        hs_is_closed: true,
        cumulative_stage_times: { qualified: 172800000, proposal: 259200000 }, // 2d, 3d in ms
      }),
    ];
    const result = computeTimePerStage(deals, normalStages);
    const perStage = result.metadata.perStage as { stageId: string; avgDays: number }[];
    const qualified = perStage.find((s) => s.stageId === "qualified");
    expect(qualified!.avgDays).toBeCloseTo(2, 1);
  });

  it("returns 0 for empty data", () => {
    const result = computeTimePerStage([], normalStages);
    expect(result.value).toBe(0);
  });

  it("handles deals with no stage times", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, cumulative_stage_times: {} })];
    const result = computeTimePerStage(deals, normalStages);
    expect(result.value).toBe(0);
  });
});

// ── V5: Bottleneck Stage ─────────────────────────────────────────────

describe("computeBottleneck", () => {
  it("identifies the slowest stage", () => {
    const deals = [
      makeDeal({
        hs_is_closed_won: true,
        hs_is_closed: true,
        cumulative_stage_times: { qualified: 86400000, proposal: 432000000, negotiation: 172800000 },
      }),
    ];
    const result = computeBottleneck(deals, normalStages);
    const bottleneck = result.metadata.bottleneck as { stageId: string; avgDays: number };
    expect(bottleneck.stageId).toBe("proposal"); // 5 days is longest
  });

  it("returns 0 for empty data", () => {
    const result = computeBottleneck([], normalStages);
    expect(result.value).toBe(0);
  });

  it("handles all stages with same time", () => {
    const deals = [
      makeDeal({
        hs_is_closed_won: true,
        hs_is_closed: true,
        cumulative_stage_times: { qualified: 86400000, proposal: 86400000, negotiation: 86400000 },
      }),
    ];
    const result = computeBottleneck(deals, normalStages);
    // pct of total = 1/3 = 33.3% -> warning (> 25%)
    expect(result.status).toBe("warning");
  });

  it("generates alert when bottleneck > 40%", () => {
    const deals = [
      makeDeal({
        hs_is_closed_won: true,
        hs_is_closed: true,
        cumulative_stage_times: { qualified: 86400000, proposal: 864000000, negotiation: 86400000 },
      }),
    ];
    const result = computeBottleneck(deals, normalStages);
    // proposal = 10d, total = 12d, pct = 83% > 40%
    expect(result.alerts.length).toBe(1);
    expect(result.alerts[0].severity).toBe("critical");
  });
});

// ── V6: Stage Conversion Rates ───────────────────────────────────────

describe("computeStageConversion", () => {
  it("computes transition rates between stages", () => {
    const deals = [
      makeDeal({ stage_timestamps: { qualified: 1000, proposal: 2000, negotiation: 3000 } }),
      makeDeal({ hubspot_deal_id: "d2", stage_timestamps: { qualified: 1000, proposal: 2000 } }),
      makeDeal({ hubspot_deal_id: "d3", stage_timestamps: { qualified: 1000 } }),
    ];
    const result = computeStageConversion(deals, normalStages);
    const transitions = result.metadata.transitions as { from: string; to: string; rate: number }[];
    // qualified->proposal: 2/3 = 66.7%, proposal->negotiation: 1/2 = 50%
    const qToP = transitions.find((t) => t.from === "qualified" && t.to === "proposal");
    expect(qToP!.rate).toBeCloseTo(66.67, 0);
  });

  it("returns 0 for empty data", () => {
    const result = computeStageConversion([], normalStages);
    expect(result.value).toBe(0);
  });

  it("returns 0 when no deals have stage timestamps", () => {
    const deals = [makeDeal({ stage_timestamps: {} })];
    const result = computeStageConversion(deals, normalStages);
    expect(result.value).toBe(0);
  });
});

// ── V7: Time in Current Stage ────────────────────────────────────────

describe("computeTimeInCurrentStage", () => {
  it("computes median time for open deals", () => {
    const result = computeTimeInCurrentStage(normalDeals);
    // All 5 open deals have hs_time_in_current_stage = 86400000ms = 1 day
    expect(result.value).toBe(1);
    expect(result.status).toBe("good"); // <= 7
  });

  it("returns 0 for empty data", () => {
    const result = computeTimeInCurrentStage([]);
    expect(result.value).toBe(0);
  });

  it("returns critical status for long stagnation", () => {
    const deals = [
      makeDeal({ hs_time_in_current_stage: 30 * 24 * 60 * 60 * 1000 }), // 30 days
    ];
    const result = computeTimeInCurrentStage(deals);
    expect(result.value).toBe(30);
    expect(result.status).toBe("critical"); // > 21
  });
});

// ── V8: Velocity Trend ───────────────────────────────────────────────

describe("computeVelocityTrend", () => {
  it("groups won deals by month", () => {
    const result = computeVelocityTrend(normalDeals);
    const monthly = result.metadata.monthly as { month: string; median: number }[];
    expect(monthly.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeVelocityTrend([]);
    expect(result.value).toBe(0);
  });

  it("computes trend from last two months", () => {
    const deals = [
      makeDeal({ hubspot_deal_id: "a", hs_is_closed_won: true, hs_is_closed: true, days_to_close: 20, closedate: "2024-05-15T00:00:00Z" }),
      makeDeal({ hubspot_deal_id: "b", hs_is_closed_won: true, hs_is_closed: true, days_to_close: 40, closedate: "2024-06-15T00:00:00Z" }),
    ];
    const result = computeVelocityTrend(deals);
    // May: 20, June: 40 => trend = (40-20)/20 * 100 = 100%
    expect(result.trend).toBe(100);
  });
});

// ── V9: Lost Entry Stage ─────────────────────────────────────────────

describe("computeLostEntryStage", () => {
  it("counts lost deals by last stage", () => {
    const result = computeLostEntryStage(normalDeals);
    // 7 lost deals, all have dealstage "closedlost"
    expect(result.value).toBe(7);
    const byStage = result.metadata.byStage as { stage: string; count: number }[];
    expect(byStage[0].stage).toBe("closedlost");
    expect(byStage[0].count).toBe(7);
  });

  it("returns 0 for empty data", () => {
    const result = computeLostEntryStage([]);
    expect(result.value).toBe(0);
  });

  it("excludes won deals", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false, dealstage: "proposal" }),
    ];
    const result = computeLostEntryStage(deals);
    expect(result.value).toBe(1);
  });
});

// ── V10: Sales Velocity Index ────────────────────────────────────────

describe("computeSalesVelocityIndex", () => {
  it("computes SVI = (count * winRate * avgSize) / cycleLength", () => {
    const result = computeSalesVelocityIndex(normalDeals);
    // closed = 15, won = 8, winRate = 8/15
    // avgSize won: (5000+10000+15000+20000+25000+30000+35000+40000)/8 = 22500
    // cycle = median([20,25,30,35,40,45,50,55]) = 37.5
    // SVI = 8 * (8/15) * 22500 / 37.5 = 8 * 0.5333 * 22500 / 37.5 = 2560
    expect(result.value).toBeCloseTo(2560, -1);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeSalesVelocityIndex([]);
    expect(result.value).toBe(0);
  });

  it("handles zero cycle length (defaults to 1)", () => {
    // Won deals with no valid days_to_close => cycleLength defaults to 1
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 10000, days_to_close: null }),
    ];
    const result = computeSalesVelocityIndex(deals);
    // count=1, winRate=1/1=1, avgSize=10000, cycleLength=1
    // SVI = 1 * 1 * 10000 / 1 = 10000
    expect(result.value).toBe(10000);
  });

  it("computes trend with previous period data", () => {
    const prev = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 5000, days_to_close: 30, closedate: "2024-01-15T00:00:00Z" }),
    ];
    const result = computeSalesVelocityIndex(normalDeals, undefined, prev);
    expect(result.trend).not.toBeNull();
  });
});
