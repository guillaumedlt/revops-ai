import { describe, it, expect } from "vitest";
import {
  computeActivityVolume,
  computeUnworkedDeals,
  computeContactEngagementRate,
  computeActivityByStage,
  computeEffortVsResult,
} from "@/lib/scoring/metrics/activity";
import { normalDeals, normalContacts, makeDeal, makeContact } from "../../fixtures/metric-data";

// ── A1: Activity Volume ──────────────────────────────────────────────

describe("computeActivityVolume", () => {
  it("counts contacts with notes activity", () => {
    const result = computeActivityVolume(normalContacts);
    // All 8 contacts have notes_last_updated set (not null)
    expect(result.metadata.activeContacts).toBe(8);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeActivityVolume([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("excludes contacts with null notes_last_updated", () => {
    const contacts = [
      makeContact({ notes_last_updated: null }),
      makeContact({ hubspot_contact_id: "c-2", notes_last_updated: "2024-05-01T00:00:00Z" }),
    ];
    const result = computeActivityVolume(contacts);
    expect(result.value).toBe(1); // only c-2 has activity
  });

  it("groups activity by owner", () => {
    const result = computeActivityVolume(normalContacts);
    const byOwner = result.metadata.byOwner as { ownerId: string; count: number }[];
    expect(byOwner.length).toBeGreaterThan(0);
    const o1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(o1).toBeDefined();
  });
});

// ── A2: Unworked Deals ───────────────────────────────────────────────

describe("computeUnworkedDeals", () => {
  it("counts open deals without recent activity", () => {
    const result = computeUnworkedDeals(normalDeals);
    // All 5 open deals have activity dates from 2024 (> 14 days ago) or null
    expect(result.metadata.unworked).toBe(5);
    expect(result.value).toBe(100);
  });

  it("returns 0 for empty data", () => {
    const result = computeUnworkedDeals([]);
    expect(result.value).toBe(0);
  });

  it("treats null activity date as unworked", () => {
    const deals = [makeDeal({ hs_last_sales_activity_date: null })];
    const result = computeUnworkedDeals(deals);
    expect(result.value).toBe(100);
  });

  it("treats recent activity as worked", () => {
    const deals = [makeDeal({ hs_last_sales_activity_date: new Date().toISOString() })];
    const result = computeUnworkedDeals(deals);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good");
  });

  it("generates alert when > 25% unworked", () => {
    const deals = [
      makeDeal({ hs_last_sales_activity_date: null }),
      makeDeal({ hubspot_deal_id: "d2", hs_last_sales_activity_date: null }),
      makeDeal({ hubspot_deal_id: "d3", hs_last_sales_activity_date: new Date().toISOString() }),
    ];
    const result = computeUnworkedDeals(deals);
    // 2/3 = 66.7% > 25%
    expect(result.alerts.length).toBe(1);
  });
});

// ── A4: Contact Engagement Rate ──────────────────────────────────────

describe("computeContactEngagementRate", () => {
  it("computes percentage with email reply", () => {
    const result = computeContactEngagementRate(normalContacts);
    // Only c5 has hs_sales_email_last_replied set => 1/8 = 12.5%
    expect(result.value).toBe(12.5);
    expect(result.metadata.engaged).toBe(1);
  });

  it("returns 0 for empty data", () => {
    const result = computeContactEngagementRate([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when all have replied", () => {
    const contacts = [
      makeContact({ hs_sales_email_last_replied: "2024-06-01T00:00:00Z" }),
      makeContact({ hubspot_contact_id: "c-2", hs_sales_email_last_replied: "2024-06-01T00:00:00Z" }),
    ];
    const result = computeContactEngagementRate(contacts);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good"); // >= 30
  });

  it("computes trend with previous period", () => {
    const prev = [makeContact({ hs_sales_email_last_replied: null })];
    const contacts = [makeContact({ hs_sales_email_last_replied: "2024-06-01T00:00:00Z" })];
    const result = computeContactEngagementRate(contacts, undefined, prev);
    // 100% vs 0% => trend = 100
    expect(result.trend).toBe(100);
  });
});

// ── A5: Activity by Stage ────────────────────────────────────────────

describe("computeActivityByStage", () => {
  it("computes average activities per deal per stage", () => {
    const deals = [
      makeDeal({ dealstage: "qualified", contact_ids: ["c1"] }),
    ];
    const contacts = [makeContact({ hubspot_contact_id: "c1", num_notes: 5 })];
    const result = computeActivityByStage(deals, contacts);
    const byStage = result.metadata.byStage as { stage: string; avgActivities: number }[];
    const qualified = byStage.find((s) => s.stage === "qualified");
    expect(qualified!.avgActivities).toBe(5);
  });

  it("returns 0 for empty data", () => {
    const result = computeActivityByStage([], []);
    expect(result.value).toBe(0);
  });

  it("handles deals with no contacts", () => {
    const deals = [makeDeal({ contact_ids: [] })];
    const result = computeActivityByStage(deals, normalContacts);
    const byStage = result.metadata.byStage as { stage: string; totalActivities: number }[];
    expect(byStage[0].totalActivities).toBe(0);
  });
});

// ── A6: Effort vs Result ─────────────────────────────────────────────

describe("computeEffortVsResult", () => {
  it("computes revenue per activity", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 20000, contact_ids: ["c1"] }),
    ];
    const contacts = [makeContact({ hubspot_contact_id: "c1", num_notes: 4 })];
    const result = computeEffortVsResult(deals, contacts);
    // 20000 / 4 = 5000 per activity
    expect(result.value).toBe(5000);
  });

  it("returns 0 for empty data", () => {
    const result = computeEffortVsResult([], []);
    expect(result.value).toBe(0);
  });

  it("returns 0 when no activities", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 20000, contact_ids: ["c1"] }),
    ];
    const contacts = [makeContact({ hubspot_contact_id: "c1", num_notes: 0 })];
    const result = computeEffortVsResult(deals, contacts);
    expect(result.value).toBe(0);
  });

  it("groups efficiency by owner", () => {
    const deals = [
      makeDeal({ hs_is_closed_won: true, hs_is_closed: true, amount: 10000, hubspot_owner_id: "o1", contact_ids: ["c1"] }),
      makeDeal({ hubspot_deal_id: "d2", hs_is_closed_won: true, hs_is_closed: true, amount: 30000, hubspot_owner_id: "o2", contact_ids: ["c2"] }),
    ];
    const contacts = [
      makeContact({ hubspot_contact_id: "c1", num_notes: 2 }),
      makeContact({ hubspot_contact_id: "c2", num_notes: 3 }),
    ];
    const result = computeEffortVsResult(deals, contacts);
    const byOwner = result.metadata.byOwner as { ownerId: string; revenuePerActivity: number }[];
    expect(byOwner.length).toBe(2);
    // o2: 30000/3 = 10000, o1: 10000/2 = 5000
    expect(byOwner[0].ownerId).toBe("o2"); // sorted by efficiency desc
    expect(byOwner[0].revenuePerActivity).toBe(10000);
  });
});
