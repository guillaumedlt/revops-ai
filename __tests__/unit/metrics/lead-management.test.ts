import { describe, it, expect } from "vitest";
import {
  computeLeadVolume,
  computeLeadVolumeByOwner,
  computeLeadToDealRate,
  computeLeadToDealByOwner,
  computeLeadSourceDistribution,
  computeSpeedToLead,
  computeUnworkedLeads,
  computeLeadAging,
  computeLeadStatusDistribution,
  computeContactCompanyRate,
} from "@/lib/scoring/metrics/lead-management";
import { normalContacts, makeContact } from "../../fixtures/metric-data";

// ── L1: Lead Volume ──────────────────────────────────────────────────

describe("computeLeadVolume", () => {
  it("returns correct count for normal data", () => {
    const result = computeLeadVolume(normalContacts);
    expect(result.value).toBe(8);
    expect(result.status).toBe("good");
    expect(result.sampleSize).toBe(8);
  });

  it("returns 0 for empty data", () => {
    const result = computeLeadVolume([]);
    expect(result.value).toBe(0);
    expect(result.status).toBe("warning");
  });

  it("computes trend when previous period data is provided", () => {
    const result = computeLeadVolume(normalContacts, undefined, [makeContact()]);
    expect(result.trend).not.toBeNull();
    // 8 vs 1 = 700% increase
    expect(result.trend).toBe(700);
  });

  it("filters by owner", () => {
    const result = computeLeadVolume(normalContacts, { ownerIds: ["owner-2"] });
    expect(result.value).toBe(2); // c2 and c4 belong to owner-2
  });
});

// ── L2: Lead Volume by Owner ─────────────────────────────────────────

describe("computeLeadVolumeByOwner", () => {
  it("groups contacts by owner", () => {
    const result = computeLeadVolumeByOwner(normalContacts);
    expect(result.value).toBe(8);
    const byOwner = result.metadata.byOwner as { ownerId: string; count: number }[];
    expect(byOwner.length).toBeGreaterThan(0);
    const owner1 = byOwner.find((o) => o.ownerId === "owner-1");
    expect(owner1).toBeDefined();
  });

  it("returns empty for no contacts", () => {
    const result = computeLeadVolumeByOwner([]);
    expect(result.value).toBe(0);
  });

  it("puts unassigned contacts in 'unassigned' bucket", () => {
    const contacts = [makeContact({ hubspot_owner_id: null })];
    const result = computeLeadVolumeByOwner(contacts);
    const byOwner = result.metadata.byOwner as { ownerId: string; count: number }[];
    expect(byOwner[0].ownerId).toBe("unassigned");
  });
});

// ── L3: Lead-to-Deal Rate ────────────────────────────────────────────

describe("computeLeadToDealRate", () => {
  it("computes correct rate for normal data", () => {
    // c1, c2, c5, c8 have deal_ids => 4/8 = 50%
    const result = computeLeadToDealRate(normalContacts);
    expect(result.value).toBe(50);
    expect(result.status).toBe("good");
  });

  it("returns 0 for empty data", () => {
    const result = computeLeadToDealRate([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when all contacts have deals", () => {
    const contacts = [
      makeContact({ deal_ids: ["d1"] }),
      makeContact({ hubspot_contact_id: "c-2", deal_ids: ["d2"] }),
    ];
    const result = computeLeadToDealRate(contacts);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good");
  });

  it("returns 0% when no contacts have deals", () => {
    const contacts = [
      makeContact({ deal_ids: [] }),
      makeContact({ hubspot_contact_id: "c-2", deal_ids: [] }),
    ];
    const result = computeLeadToDealRate(contacts);
    expect(result.value).toBe(0);
    expect(result.status).toBe("critical");
  });
});

// ── L4: Lead-to-Deal by Owner ────────────────────────────────────────

describe("computeLeadToDealByOwner", () => {
  it("breaks down rates by owner", () => {
    const result = computeLeadToDealByOwner(normalContacts);
    const byOwner = result.metadata.byOwner as { ownerId: string; rate: number }[];
    expect(byOwner.length).toBeGreaterThan(0);
    // Verify sorted by rate descending
    for (let i = 1; i < byOwner.length; i++) {
      expect(byOwner[i].rate).toBeLessThanOrEqual(byOwner[i - 1].rate);
    }
  });

  it("returns 0 for empty data", () => {
    const result = computeLeadToDealByOwner([]);
    expect(result.value).toBe(0);
  });

  it("handles single owner with all conversions", () => {
    const contacts = [
      makeContact({ deal_ids: ["d1"], hubspot_owner_id: "owner-1" }),
      makeContact({ hubspot_contact_id: "c-2", deal_ids: ["d2"], hubspot_owner_id: "owner-1" }),
    ];
    const result = computeLeadToDealByOwner(contacts);
    const byOwner = result.metadata.byOwner as { ownerId: string; rate: number }[];
    expect(byOwner[0].rate).toBe(100);
  });
});

// ── L5: Lead Source Distribution ─────────────────────────────────────

describe("computeLeadSourceDistribution", () => {
  it("counts unique sources", () => {
    const result = computeLeadSourceDistribution(normalContacts);
    // ORGANIC_SEARCH, PAID_SEARCH, REFERRALS, DIRECT_TRAFFIC => 4 sources
    expect(result.value).toBe(4);
    const dist = result.metadata.distribution as { source: string; count: number }[];
    expect(dist.length).toBe(4);
  });

  it("returns 0 sources for empty data", () => {
    const result = computeLeadSourceDistribution([]);
    expect(result.value).toBe(0);
  });

  it("labels null sources as 'unknown'", () => {
    const contacts = [makeContact({ hs_analytics_source: null })];
    const result = computeLeadSourceDistribution(contacts);
    const dist = result.metadata.distribution as { source: string }[];
    expect(dist[0].source).toBe("unknown");
  });
});

// ── L6: Speed to Lead ────────────────────────────────────────────────

describe("computeSpeedToLead", () => {
  it("computes median engagement time in hours", () => {
    const result = computeSpeedToLead(normalContacts);
    // Contacts with valid engagement: c1-c5,c7 have 7200000ms (2h), c8 has 100000000ms (~27.8h)
    // c6 has null => filtered out
    // Values in hours: [2, 2, 2, 2, 2, 2, 27.78]  median = 2
    expect(result.value).toBe(2);
    expect(result.status).toBe("good"); // < 4h
  });

  it("returns 0 for empty data", () => {
    const result = computeSpeedToLead([]);
    expect(result.value).toBe(0);
  });

  it("handles all null engagement times", () => {
    const contacts = [
      makeContact({ hs_time_to_first_engagement: null }),
      makeContact({ hubspot_contact_id: "c-2", hs_time_to_first_engagement: null }),
    ];
    const result = computeSpeedToLead(contacts);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });

  it("returns critical status for slow engagement", () => {
    const contacts = [
      makeContact({ hs_time_to_first_engagement: 100 * 60 * 60 * 1000 }), // 100 hours
    ];
    const result = computeSpeedToLead(contacts);
    expect(result.value).toBe(100);
    expect(result.status).toBe("critical"); // > 24h
  });
});

// ── L7: Unworked Leads ───────────────────────────────────────────────

describe("computeUnworkedLeads", () => {
  it("computes correct percentage for normal data", () => {
    // c3 and c6 are unworked => 2/8 = 25%
    const result = computeUnworkedLeads(normalContacts);
    expect(result.value).toBe(25);
    expect(result.metadata.unworked).toBe(2);
    expect(result.metadata.total).toBe(8);
  });

  it("returns 0 for empty data", () => {
    const result = computeUnworkedLeads([]);
    expect(result.value).toBe(0);
  });

  it("returns 100% when all are unworked", () => {
    const contacts = [
      makeContact({ hs_is_unworked: true }),
      makeContact({ hubspot_contact_id: "c-2", hs_is_unworked: true }),
    ];
    const result = computeUnworkedLeads(contacts);
    expect(result.value).toBe(100);
    expect(result.status).toBe("critical"); // > 15%
  });

  it("returns good status when none are unworked", () => {
    const contacts = [
      makeContact({ hs_is_unworked: false }),
      makeContact({ hubspot_contact_id: "c-2", hs_is_unworked: false }),
    ];
    const result = computeUnworkedLeads(contacts);
    expect(result.value).toBe(0);
    expect(result.status).toBe("good"); // <= 5%
  });
});

// ── L8: Lead Aging ───────────────────────────────────────────────────

describe("computeLeadAging", () => {
  it("distributes contacts into age buckets", () => {
    const result = computeLeadAging(normalContacts);
    const dist = result.metadata.distribution as { bucket: string; count: number }[];
    expect(dist.length).toBe(5);
    // All fixture contacts have createdate "2024-03-01" which is > 60 days ago
    const over60 = dist.find((d) => d.bucket === "60d+");
    expect(over60!.count).toBe(8);
  });

  it("returns 0 for empty data", () => {
    const result = computeLeadAging([]);
    expect(result.value).toBe(0);
    expect(result.sampleSize).toBe(0);
  });

  it("classifies recent contacts correctly", () => {
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(); // 3 days ago
    const contacts = [makeContact({ createdate: recentDate })];
    const result = computeLeadAging(contacts);
    const dist = result.metadata.distribution as { bucket: string; count: number }[];
    const bucket0_7 = dist.find((d) => d.bucket === "0-7d");
    expect(bucket0_7!.count).toBe(1);
    expect(result.value).toBe(0); // 0% over 30d
    expect(result.status).toBe("good");
  });
});

// ── L9: Lead Status Distribution ─────────────────────────────────────

describe("computeLeadStatusDistribution", () => {
  it("groups contacts by lead status", () => {
    const result = computeLeadStatusDistribution(normalContacts);
    // All fixture contacts have hs_lead_status: "NEW"
    expect(result.value).toBe(1); // 1 unique status
    const dist = result.metadata.distribution as { status: string }[];
    expect(dist[0].status).toBe("NEW");
  });

  it("returns 0 for empty data", () => {
    const result = computeLeadStatusDistribution([]);
    expect(result.value).toBe(0);
  });

  it("labels null status as 'unknown'", () => {
    const contacts = [makeContact({ hs_lead_status: null })];
    const result = computeLeadStatusDistribution(contacts);
    const dist = result.metadata.distribution as { status: string }[];
    expect(dist[0].status).toBe("unknown");
  });
});

// ── L10: Contact-Company Rate ────────────────────────────────────────

describe("computeContactCompanyRate", () => {
  it("computes correct rate for normal data", () => {
    // c5 has empty company_ids => 7/8 = 87.5%
    const result = computeContactCompanyRate(normalContacts);
    expect(result.value).toBe(87.5);
    expect(result.status).toBe("good"); // >= 80
  });

  it("returns 0 for empty data", () => {
    const result = computeContactCompanyRate([]);
    expect(result.value).toBe(0);
  });

  it("returns 0% when no contacts have companies", () => {
    const contacts = [
      makeContact({ company_ids: [] }),
      makeContact({ hubspot_contact_id: "c-2", company_ids: [] }),
    ];
    const result = computeContactCompanyRate(contacts);
    expect(result.value).toBe(0);
    expect(result.status).toBe("critical"); // < 60
  });

  it("returns 100% when all have companies", () => {
    const contacts = [
      makeContact({ company_ids: ["co1"] }),
      makeContact({ hubspot_contact_id: "c-2", company_ids: ["co2"] }),
    ];
    const result = computeContactCompanyRate(contacts);
    expect(result.value).toBe(100);
    expect(result.status).toBe("good");
  });
});
