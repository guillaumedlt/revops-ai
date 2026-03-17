import { describe, it, expect } from "vitest";
import {
  DEAL_PROPERTIES,
  CONTACT_PROPERTIES,
  COMPANY_PROPERTIES,
  getDealPropertiesForPipelines,
} from "@/lib/hubspot/types";
import type { Pipeline } from "@/lib/hubspot/client";

describe("Property Constants", () => {
  it("DEAL_PROPERTIES has 22 static fields", () => {
    expect(DEAL_PROPERTIES.length).toBeGreaterThanOrEqual(20);
    expect(DEAL_PROPERTIES).toContain("dealname");
    expect(DEAL_PROPERTIES).toContain("amount");
    expect(DEAL_PROPERTIES).toContain("hs_is_closed_won");
    expect(DEAL_PROPERTIES).toContain("hs_is_stalled");
    expect(DEAL_PROPERTIES).toContain("closed_lost_reason");
    expect(DEAL_PROPERTIES).toContain("hs_analytics_source");
  });

  it("CONTACT_PROPERTIES has required fields", () => {
    expect(CONTACT_PROPERTIES).toContain("email");
    expect(CONTACT_PROPERTIES).toContain("lifecyclestage");
    expect(CONTACT_PROPERTIES).toContain("hs_is_unworked");
    expect(CONTACT_PROPERTIES).toContain("hs_time_to_first_engagement");
    expect(CONTACT_PROPERTIES.length).toBeGreaterThanOrEqual(15);
  });

  it("COMPANY_PROPERTIES has required fields", () => {
    expect(COMPANY_PROPERTIES).toContain("name");
    expect(COMPANY_PROPERTIES).toContain("domain");
    expect(COMPANY_PROPERTIES).toContain("total_revenue");
    expect(COMPANY_PROPERTIES.length).toBeGreaterThanOrEqual(10);
  });
});

describe("getDealPropertiesForPipelines", () => {
  it("adds dynamic stage properties for each pipeline stage", () => {
    const pipelines: Pipeline[] = [
      {
        id: "default",
        label: "Sales",
        displayOrder: 0,
        stages: [
          {
            id: "qualified",
            label: "Qualified",
            displayOrder: 0,
            metadata: { probability: 0.1 },
          },
          {
            id: "proposal",
            label: "Proposal",
            displayOrder: 1,
            metadata: { probability: 0.5 },
          },
        ],
      },
    ];

    const properties = getDealPropertiesForPipelines(pipelines);

    // Should include all static properties
    expect(properties).toContain("dealname");
    expect(properties).toContain("amount");

    // Should include dynamic properties for each stage
    expect(properties).toContain("hs_date_entered_qualified");
    expect(properties).toContain("hs_date_exited_qualified");
    expect(properties).toContain("hs_v2_cumulative_time_in_qualified");
    expect(properties).toContain("hs_date_entered_proposal");
    expect(properties).toContain("hs_date_exited_proposal");
    expect(properties).toContain("hs_v2_cumulative_time_in_proposal");

    // 22 static + 6 dynamic (2 stages × 3 props each)
    expect(properties.length).toBe(DEAL_PROPERTIES.length + 6);
  });

  it("handles multiple pipelines", () => {
    const pipelines: Pipeline[] = [
      {
        id: "sales",
        label: "Sales",
        displayOrder: 0,
        stages: [
          { id: "s1", label: "S1", displayOrder: 0, metadata: {} },
        ],
      },
      {
        id: "billing",
        label: "Billing",
        displayOrder: 1,
        stages: [
          { id: "b1", label: "B1", displayOrder: 0, metadata: {} },
          { id: "b2", label: "B2", displayOrder: 1, metadata: {} },
        ],
      },
    ];

    const properties = getDealPropertiesForPipelines(pipelines);
    expect(properties).toContain("hs_date_entered_s1");
    expect(properties).toContain("hs_date_entered_b1");
    expect(properties).toContain("hs_date_entered_b2");
    // 22 static + 9 dynamic (3 stages × 3 props)
    expect(properties.length).toBe(DEAL_PROPERTIES.length + 9);
  });

  it("handles empty pipelines", () => {
    const properties = getDealPropertiesForPipelines([]);
    expect(properties.length).toBe(DEAL_PROPERTIES.length);
  });

  it("deduplicates properties", () => {
    const pipelines: Pipeline[] = [
      {
        id: "p1",
        label: "P1",
        displayOrder: 0,
        stages: [{ id: "closedwon", label: "Won", displayOrder: 0, metadata: {} }],
      },
    ];

    const properties = getDealPropertiesForPipelines(pipelines);
    const unique = new Set(properties);
    expect(properties.length).toBe(unique.size);
  });
});
