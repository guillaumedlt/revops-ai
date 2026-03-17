import { describe, it, expect } from "vitest";

// Import the mapping functions from sync.ts
// Since they're not exported directly, we'll test via a thin wrapper
// For now, test the conversion logic inline

// Helper converters (same logic as sync.ts)
function toTimestamp(value: string | null | undefined): string | null {
  if (!value || value === "") return null;
  const ms = parseInt(value, 10);
  if (!isNaN(ms) && String(ms) === value) {
    return new Date(ms).toISOString();
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function toBoolean(value: string | null | undefined): boolean | null {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

function toNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = parseFloat(value);
  return isNaN(n) ? null : n;
}

describe("Data Mapping Utilities", () => {
  describe("toTimestamp", () => {
    it("converts millisecond timestamp to ISO string", () => {
      const result = toTimestamp("1710633600000");
      expect(result).toBe("2024-03-17T00:00:00.000Z");
    });

    it("converts ISO string directly", () => {
      const result = toTimestamp("2024-03-17T10:00:00Z");
      expect(result).toBe("2024-03-17T10:00:00.000Z");
    });

    it("returns null for empty string", () => {
      expect(toTimestamp("")).toBeNull();
    });

    it("returns null for null", () => {
      expect(toTimestamp(null)).toBeNull();
    });

    it("returns null for undefined", () => {
      expect(toTimestamp(undefined)).toBeNull();
    });

    it("returns null for invalid string", () => {
      expect(toTimestamp("not-a-date")).toBeNull();
    });
  });

  describe("toBoolean", () => {
    it("converts 'true' to true", () => {
      expect(toBoolean("true")).toBe(true);
    });

    it("converts 'false' to false", () => {
      expect(toBoolean("false")).toBe(false);
    });

    it("returns null for null", () => {
      expect(toBoolean(null)).toBeNull();
    });

    it("returns null for undefined", () => {
      expect(toBoolean(undefined)).toBeNull();
    });

    it("returns null for random string", () => {
      expect(toBoolean("yes")).toBeNull();
    });
  });

  describe("toNumber", () => {
    it("converts integer string", () => {
      expect(toNumber("42")).toBe(42);
    });

    it("converts decimal string", () => {
      expect(toNumber("12500.50")).toBe(12500.5);
    });

    it("returns null for empty string", () => {
      expect(toNumber("")).toBeNull();
    });

    it("returns null for null", () => {
      expect(toNumber(null)).toBeNull();
    });

    it("returns null for undefined", () => {
      expect(toNumber(undefined)).toBeNull();
    });

    it("returns null for NaN string", () => {
      expect(toNumber("not-a-number")).toBeNull();
    });

    it("handles zero correctly", () => {
      expect(toNumber("0")).toBe(0);
    });

    it("handles negative numbers", () => {
      expect(toNumber("-100")).toBe(-100);
    });
  });
});

describe("Deal Mapping", () => {
  it("maps a complete HubSpot deal record", () => {
    const hsRecord = {
      id: "12345",
      properties: {
        dealname: "Kolsquare Audit CRM",
        dealstage: "appointmentscheduled",
        pipeline: "default",
        amount: "12000",
        closedate: "2024-04-15T00:00:00Z",
        createdate: "2024-03-01T00:00:00Z",
        hubspot_owner_id: "owner-1",
        hs_lastmodifieddate: "2024-03-17T10:00:00Z",
        hs_is_closed_won: "false",
        hs_is_closed: "false",
        hs_is_stalled: "true",
        hs_time_in_current_stage: "2592000000",
        days_to_close: null,
        hs_deal_stage_probability: "0.2",
        hs_analytics_source: "ORGANIC_SEARCH",
        hs_date_entered_appointmentscheduled: "1709251200000",
        hs_date_exited_appointmentscheduled: null,
        hs_v2_cumulative_time_in_appointmentscheduled: "2592000000",
      },
    };

    // Verify key fields can be extracted
    const props = hsRecord.properties;
    expect(toNumber(props.amount)).toBe(12000);
    expect(toBoolean(props.hs_is_stalled)).toBe(true);
    expect(toBoolean(props.hs_is_closed_won)).toBe(false);
    expect(toNumber(props.hs_deal_stage_probability)).toBe(0.2);
    // 1709251200000 = 2024-03-01T00:00:00.000Z
    expect(toTimestamp(props.hs_date_entered_appointmentscheduled)).toBe(
      new Date(1709251200000).toISOString()
    );

    // Dynamic stage properties extraction
    const stageTimestamps: Record<string, string | null> = {};
    const cumulativeTimes: Record<string, number | null> = {};
    for (const [key, val] of Object.entries(props)) {
      if (key.startsWith("hs_date_entered_") || key.startsWith("hs_date_exited_")) {
        stageTimestamps[key] = toTimestamp(val as string);
      }
      if (key.startsWith("hs_v2_cumulative_time_in_")) {
        cumulativeTimes[key] = toNumber(val as string);
      }
    }

    expect(stageTimestamps).toHaveProperty("hs_date_entered_appointmentscheduled");
    expect(cumulativeTimes).toHaveProperty("hs_v2_cumulative_time_in_appointmentscheduled");
    expect(cumulativeTimes.hs_v2_cumulative_time_in_appointmentscheduled).toBe(2592000000);
  });

  it("handles deal with missing/null fields", () => {
    const hsRecord = {
      id: "99999",
      properties: {
        dealname: null,
        dealstage: "closedlost",
        amount: null,
        closedate: null,
        createdate: "2024-01-01T00:00:00Z",
        hs_is_closed_won: "false",
        hs_is_closed: "true",
        hs_is_stalled: null,
      },
    };

    const props = hsRecord.properties;
    expect(toNumber(props.amount)).toBeNull();
    expect(toTimestamp(props.closedate)).toBeNull();
    expect(toBoolean(props.hs_is_stalled)).toBeNull();
    expect(toBoolean(props.hs_is_closed)).toBe(true);
  });

  it("handles deal with zero amount", () => {
    expect(toNumber("0")).toBe(0);
  });
});

describe("Contact Mapping", () => {
  it("maps contact fields correctly", () => {
    const props = {
      email: "alice@example.com",
      firstname: "Alice",
      lastname: "Martin",
      lifecyclestage: "lead",
      hs_is_unworked: "true",
      hs_time_to_first_engagement: "3600000",
      num_notes: "5",
    };

    expect(toBoolean(props.hs_is_unworked)).toBe(true);
    expect(toNumber(props.hs_time_to_first_engagement)).toBe(3600000);
    expect(toNumber(props.num_notes)).toBe(5);
  });
});

describe("Company Mapping", () => {
  it("maps company fields correctly", () => {
    const props = {
      name: "Ceres Agency",
      domain: "ceres.fr",
      industry: "MARKETING_AND_ADVERTISING",
      numberofemployees: "15",
      annualrevenue: "500000",
      total_revenue: "1200000",
    };

    expect(toNumber(props.numberofemployees)).toBe(15);
    expect(toNumber(props.annualrevenue)).toBe(500000);
    expect(toNumber(props.total_revenue)).toBe(1200000);
  });
});
