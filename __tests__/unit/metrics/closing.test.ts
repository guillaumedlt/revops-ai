import { describe, it, expect } from "vitest";
import {
  computeWinRate,
  computeWinRateByOwner,
  computeWinRateByAmount,
  computeWinRateBySource,
  computeWinLossTrend,
  computeLostReasons,
  computeCompetitiveWinRate,
  computeDealSizeWonVsLost,
  computeCloseTimeComparison,
  computeCloseRateByStage,
  computeFirstContactToClose,
  computeRevenueLost,
} from "@/lib/scoring/metrics/closing";
import { normalDeals, normalStages, normalContacts, makeDeal, makeContact } from "../../fixtures/metric-data";

// ── C1: Win Rate ─────────────────────────────────────────────────────

describe("computeWinRate", () => {
  it("computes correct win rate for normal data", () => {
    const result = computeWinRate(normalDeals);
    // Closed: 8 won + 7 lost = 15, win rate = 8/15 = 53.33%
    expect(result.value).toBeCloseTo(53.33, 1);
    expect(result.status).toBe("good"); // >= 30
    expect(result.metadata.won).toBe(8);
    expect(result.metadata.total).toBe(15);
  });

  it("returns 0 for empty data", () => {
    const result = computeWinRate([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when all won", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: true }),
    ];
    const result = computeWinRate(deals);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good");
  });

  it("returns 0% when all lost", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: false }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false }),
    ];
    const result = computeWinRate(deals);
    expect(result.value).toBe(0);
    expect(result.status).toBe("critical");
  });

  it("computes trend with previous period", () => {
    const prev = [makeDeal({ hs_is_closed: true, hs_is_closed_won: false, closedate: "2024-01-15T00:00:00Z" })];
    const result = computeWinRate(normalDeals, undefined, prev);
    // Current: 53.33%, Prev: 0% => trend = 100 (from 0 to positive)
    expect(result.trend).toBe(100);
  });
});

// ── C2: Win Rate by Owner ────────────────────────────────────────────

describe("computeWinRateByOwner", () => {
  it("breaks down win rate per owner", () => {
    const result = computeWinRateByOwner(normalDeals);
    const byOwner = result.metadata.byOwner as { ownerId: string; rate: number; won: number; total: number }[];
    expect(byOwner.length).toBe(2);
    // owner-1: 4 won + 3 lost = 7, rate = 4/7 = 57.14%
    const o1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(o1!.rate).toBeCloseTo(57.14, 1);
  });

  it("returns 0 for empty data", () => {
    const result = computeWinRateByOwner([]);
    expect(result.value).toBe(0);
  });

  it("handles single owner", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true, hubspot_owner_id: "o1" }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false, hubspot_owner_id: "o1" }),
    ];
    const result = computeWinRateByOwner(deals);
    const byOwner = result.metadata.byOwner as { ownerId: string; rate: number }[];
    expect(byOwner.length).toBe(1);
    expect(byOwner[0].rate).toBe(50);
  });
});

// ── C3: Win Rate by Amount ───────────────────────────────────────────

describe("computeWinRateByAmount", () => {
  it("computes win rate per amount bracket", () => {
    const result = computeWinRateByAmount(normalDeals);
    const byBracket = result.metadata.byBracket as { bracket: string; rate: number; total: number }[];
    expect(byBracket.length).toBe(6);
  });

  it("returns 0 for empty data", () => {
    const result = computeWinRateByAmount([]);
    expect(result.value).toBe(0);
  });

  it("handles all deals in single bracket", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true, amount: 8000 }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false, amount: 9000 }),
    ];
    const result = computeWinRateByAmount(deals);
    const bracket = (result.metadata.byBracket as { bracket: string; rate: number; total: number }[])
      .find((b) => b.bracket === "5-15K");
    expect(bracket!.rate).toBe(50);
    expect(bracket!.total).toBe(2);
  });
});

// ── C4: Win Rate by Source ───────────────────────────────────────────

describe("computeWinRateBySource", () => {
  it("groups win rate by analytics source", () => {
    const result = computeWinRateBySource(normalDeals);
    const bySource = result.metadata.bySource as { source: string; rate: number }[];
    expect(bySource.length).toBeGreaterThan(0);
  });

  it("returns 0 for empty data", () => {
    const result = computeWinRateBySource([]);
    expect(result.value).toBe(0);
  });

  it("labels null source as unknown", () => {
    const deals = [makeDeal({ hs_is_closed: true, hs_is_closed_won: true, hs_analytics_source: null })];
    const result = computeWinRateBySource(deals);
    const bySource = result.metadata.bySource as { source: string }[];
    expect(bySource[0].source).toBe("unknown");
  });
});

// ── C5: Win/Loss Trend ───────────────────────────────────────────────

describe("computeWinLossTrend", () => {
  it("computes monthly win rates", () => {
    const result = computeWinLossTrend(normalDeals);
    const monthly = result.metadata.monthly as { month: string; rate: number }[];
    expect(monthly.length).toBeGreaterThan(0);
    // Sorted chronologically
    for (let i = 1; i < monthly.length; i++) {
      expect(monthly[i].month >= monthly[i - 1].month).toBe(true);
    }
  });

  it("returns 0 for empty data", () => {
    const result = computeWinLossTrend([]);
    expect(result.value).toBe(0);
  });

  it("handles all deals in same month", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true, closedate: "2024-06-15T00:00:00Z" }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false, closedate: "2024-06-20T00:00:00Z" }),
    ];
    const result = computeWinLossTrend(deals);
    const monthly = result.metadata.monthly as { month: string; rate: number }[];
    expect(monthly.length).toBe(1);
    expect(monthly[0].rate).toBe(50);
  });
});

// ── C6: Lost Reasons ─────────────────────────────────────────────────

describe("computeLostReasons", () => {
  it("groups lost deals by reason", () => {
    const result = computeLostReasons(normalDeals);
    // 7 lost: 3 budget, 2 competitor, 2 timing
    const reasons = result.metadata.reasons as { reason: string; count: number }[];
    const budget = reasons.find((r) => r.reason === "budget");
    expect(budget!.count).toBe(3);
    const competitor = reasons.find((r) => r.reason === "competitor");
    expect(competitor!.count).toBe(2);
  });

  it("returns 0 for empty data", () => {
    const result = computeLostReasons([]);
    expect(result.value).toBe(0);
  });

  it("labels null reason as 'non renseigne'", () => {
    const deals = [makeDeal({ hs_is_closed: true, hs_is_closed_won: false, closed_lost_reason: null })];
    const result = computeLostReasons(deals);
    const reasons = result.metadata.reasons as { reason: string }[];
    expect(reasons[0].reason).toBe("non renseigné");
  });
});

// ── C7: Competitive Win Rate ─────────────────────────────────────────

describe("computeCompetitiveWinRate", () => {
  it("computes won / (won + lost-to-competition)", () => {
    const result = computeCompetitiveWinRate(normalDeals);
    // Won: 8, lost to competitor: 2 (lost-3, lost-4 have "competitor")
    // Rate = 8 / (8 + 2) = 80%
    expect(result.value).toBe(80);
    expect(result.status).toBe("good"); // >= 50
  });

  it("returns 0 for empty data", () => {
    const result = computeCompetitiveWinRate([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when no competitive losses", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false, closed_lost_reason: "budget" }),
    ];
    const result = computeCompetitiveWinRate(deals);
    // won=1, lostToCompetition=0, total=1, rate=100%
    expect(result.value).toBe(100);
  });
});

// ── C8: Deal Size Won vs Lost ────────────────────────────────────────

describe("computeDealSizeWonVsLost", () => {
  it("compares average deal size", () => {
    const result = computeDealSizeWonVsLost(normalDeals);
    // Won avg: 22500, Lost avg: (3000+6000+9000+12000+15000+18000+21000)/7 = 12000
    expect(result.metadata.avgWon).toBe(22500);
    expect(result.metadata.avgLost).toBe(12000);
  });

  it("returns 0 for empty data", () => {
    const result = computeDealSizeWonVsLost([]);
    expect(result.value).toBe(0);
  });

  it("handles all zero amounts", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: true, amount: 0 }),
    ];
    const result = computeDealSizeWonVsLost(deals);
    expect(result.metadata.avgWon).toBe(0);
    expect(result.metadata.wonCount).toBe(0);
  });
});

// ── C9: Close Time Comparison ────────────────────────────────────────

describe("computeCloseTimeComparison", () => {
  it("compares median close time won vs lost", () => {
    const result = computeCloseTimeComparison(normalDeals);
    // Won median: 37.5, Lost dtc: [30,40,50,60,70,80,90] median=60
    expect(result.metadata.medianWon).toBe(37.5);
    expect(result.metadata.medianLost).toBe(60);
  });

  it("returns 0 for empty data", () => {
    const result = computeCloseTimeComparison([]);
    expect(result.value).toBe(0);
  });

  it("handles no won deals", () => {
    const deals = [makeDeal({ hs_is_closed: true, hs_is_closed_won: false, days_to_close: 30 })];
    const result = computeCloseTimeComparison(deals);
    expect(result.metadata.medianWon).toBe(0);
    expect(result.metadata.medianLost).toBe(30);
  });
});

// ── C10: Close Rate by Stage Reached ─────────────────────────────────

describe("computeCloseRateByStage", () => {
  it("computes win rate for deals reaching each stage", () => {
    const deals = [
      makeDeal({
        hs_is_closed: true, hs_is_closed_won: true,
        stage_timestamps: { qualified: 1000, proposal: 2000, negotiation: 3000 },
      }),
      makeDeal({
        hubspot_deal_id: "d2", hs_is_closed: true, hs_is_closed_won: false,
        stage_timestamps: { qualified: 1000, proposal: 2000 },
      }),
    ];
    const result = computeCloseRateByStage(deals, normalStages);
    const perStage = result.metadata.perStage as { stageId: string; rate: number; total: number }[];
    const qualified = perStage.find((s) => s.stageId === "qualified");
    expect(qualified!.rate).toBe(50); // 1/2
    const negotiation = perStage.find((s) => s.stageId === "negotiation");
    expect(negotiation!.rate).toBe(100); // 1/1
  });

  it("returns 0 for empty data", () => {
    const result = computeCloseRateByStage([], normalStages);
    expect(result.value).toBe(0);
  });

  it("handles no stage timestamps", () => {
    const deals = [makeDeal({ hs_is_closed: true, hs_is_closed_won: true, stage_timestamps: {} })];
    const result = computeCloseRateByStage(deals, normalStages);
    const perStage = result.metadata.perStage as { stageId: string; total: number }[];
    // All stages should have total=0
    for (const s of perStage) {
      expect(s.total).toBe(0);
    }
  });
});

// ── C11: First Contact to Close ──────────────────────────────────────

describe("computeFirstContactToClose", () => {
  it("computes median days from first contact to close", () => {
    const deals = [
      makeDeal({
        hs_is_closed_won: true, hs_is_closed: true,
        closedate: "2024-06-15T00:00:00Z",
        contact_ids: ["c1"],
      }),
    ];
    const contacts = [
      makeContact({ hubspot_contact_id: "c1", createdate: "2024-03-01T00:00:00Z" }),
    ];
    const result = computeFirstContactToClose(deals, contacts);
    // From Mar 1 to Jun 15 = 106 days
    expect(result.value).toBeCloseTo(106, 0);
  });

  it("returns 0 for empty data", () => {
    const result = computeFirstContactToClose([], []);
    expect(result.value).toBe(0);
  });

  it("handles deals with no contacts", () => {
    const deals = [makeDeal({ hs_is_closed_won: true, hs_is_closed: true, contact_ids: [] })];
    const result = computeFirstContactToClose(deals, normalContacts);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });
});

// ── C12: Revenue Lost ────────────────────────────────────────────────

describe("computeRevenueLost", () => {
  it("sums amounts from lost deals", () => {
    const result = computeRevenueLost(normalDeals);
    // Lost amounts: 3000+6000+9000+12000+15000+18000+21000 = 84000
    expect(result.value).toBe(84000);
    expect(result.metadata.dealCount).toBe(7);
  });

  it("returns 0 for empty data", () => {
    const result = computeRevenueLost([]);
    expect(result.value).toBe(0);
  });

  it("handles null amounts (treated as 0)", () => {
    const deals = [
      makeDeal({ hs_is_closed: true, hs_is_closed_won: false, amount: null }),
    ];
    const result = computeRevenueLost(deals);
    expect(result.value).toBe(0);
    expect(result.metadata.dealCount).toBe(1);
  });

  it("computes trend with previous period", () => {
    const prev = [makeDeal({ hs_is_closed: true, hs_is_closed_won: false, amount: 42000, closedate: "2024-01-15T00:00:00Z" })];
    const result = computeRevenueLost(normalDeals, undefined, prev);
    // 84000 vs 42000 = 100% increase
    expect(result.trend).toBe(100);
  });
});
