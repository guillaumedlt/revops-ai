import type { DealRow, ContactRow, CompanyRow, PipelineStageRow } from "@/types/metrics";

// --- Deals ---
export function makeDeal(overrides: Partial<DealRow> = {}): DealRow {
  return {
    hubspot_deal_id: "deal-1",
    dealname: "Test Deal",
    dealstage: "qualified",
    pipeline: "default",
    amount: 10000,
    closedate: "2024-06-15T00:00:00Z",
    createdate: "2024-03-01T00:00:00Z",
    hubspot_owner_id: "owner-1",
    hs_is_closed_won: false,
    hs_is_closed: false,
    hs_is_stalled: false,
    hs_time_in_current_stage: 86400000, // 1 day in ms
    days_to_close: null,
    closed_lost_reason: null,
    hs_deal_stage_probability: 0.5,
    hs_analytics_source: "ORGANIC_SEARCH",
    hs_last_sales_activity_date: "2024-06-01T00:00:00Z",
    contact_ids: ["c1"],
    company_ids: ["co1"],
    stage_timestamps: {},
    cumulative_stage_times: {},
    ...overrides,
  };
}

// Build a realistic dataset of 20 deals for testing
export const normalDeals: DealRow[] = [
  // 5 open deals
  makeDeal({ hubspot_deal_id: "d1", amount: 10000, dealstage: "qualified", hubspot_owner_id: "owner-1" }),
  makeDeal({ hubspot_deal_id: "d2", amount: 20000, dealstage: "proposal", hubspot_owner_id: "owner-1" }),
  makeDeal({ hubspot_deal_id: "d3", amount: 15000, dealstage: "negotiation", hubspot_owner_id: "owner-2", hs_is_stalled: true }),
  makeDeal({ hubspot_deal_id: "d4", amount: 5000, dealstage: "qualified", hubspot_owner_id: "owner-2", hs_last_sales_activity_date: null }),
  makeDeal({ hubspot_deal_id: "d5", amount: null, dealstage: "proposal", hubspot_owner_id: "owner-1" }),
  // 8 won deals
  ...Array.from({ length: 8 }, (_, i) => makeDeal({
    hubspot_deal_id: `won-${i}`,
    amount: (i + 1) * 5000,
    hs_is_closed_won: true,
    hs_is_closed: true,
    days_to_close: 20 + i * 5,
    closedate: `2024-0${Math.min(i + 1, 6)}-15T00:00:00Z`,
    hubspot_owner_id: i < 4 ? "owner-1" : "owner-2",
    dealstage: "closedwon",
  })),
  // 7 lost deals
  ...Array.from({ length: 7 }, (_, i) => makeDeal({
    hubspot_deal_id: `lost-${i}`,
    amount: (i + 1) * 3000,
    hs_is_closed_won: false,
    hs_is_closed: true,
    days_to_close: 30 + i * 10,
    closedate: `2024-0${Math.min(i + 1, 6)}-20T00:00:00Z`,
    closed_lost_reason: i < 3 ? "budget" : i < 5 ? "competitor" : "timing",
    hubspot_owner_id: i < 3 ? "owner-1" : "owner-2",
    dealstage: "closedlost",
  })),
];

// --- Contacts ---
export function makeContact(overrides: Partial<ContactRow> = {}): ContactRow {
  return {
    hubspot_contact_id: "c-1",
    email: "test@example.com",
    firstname: "Test",
    lastname: "User",
    company: "TestCo",
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
    hubspot_owner_id: "owner-1",
    createdate: "2024-03-01T00:00:00Z",
    hs_time_to_first_engagement: 7200000, // 2 hours in ms
    hs_is_unworked: false,
    hs_analytics_source: "ORGANIC_SEARCH",
    hs_sales_email_last_replied: null,
    notes_last_updated: "2024-03-15T00:00:00Z",
    num_notes: 3,
    num_contacted_notes: 2,
    deal_ids: [],
    company_ids: ["co1"],
    ...overrides,
  };
}

export const normalContacts: ContactRow[] = [
  makeContact({ hubspot_contact_id: "c1", deal_ids: ["d1"], hs_analytics_source: "ORGANIC_SEARCH" }),
  makeContact({ hubspot_contact_id: "c2", deal_ids: ["d2"], hubspot_owner_id: "owner-2", hs_analytics_source: "PAID_SEARCH" }),
  makeContact({ hubspot_contact_id: "c3", deal_ids: [], hs_is_unworked: true, hs_analytics_source: "REFERRALS" }),
  makeContact({ hubspot_contact_id: "c4", deal_ids: [], hubspot_owner_id: "owner-2", hs_analytics_source: "ORGANIC_SEARCH" }),
  makeContact({ hubspot_contact_id: "c5", deal_ids: ["d3"], hs_sales_email_last_replied: "2024-03-10T00:00:00Z", company_ids: [] }),
  makeContact({ hubspot_contact_id: "c6", deal_ids: [], hs_is_unworked: true, hs_time_to_first_engagement: null }),
  makeContact({ hubspot_contact_id: "c7", deal_ids: [], lifecyclestage: "customer" }),
  makeContact({ hubspot_contact_id: "c8", deal_ids: ["d4"], hs_time_to_first_engagement: 100000000, hs_analytics_source: "DIRECT_TRAFFIC" }),
];

// --- Companies ---
export const normalCompanies: CompanyRow[] = [
  { hubspot_company_id: "co1", name: "Acme Corp", domain: "acme.com", industry: "TECHNOLOGY", total_revenue: 50000, deal_ids: ["won-1", "won-2"] },
  { hubspot_company_id: "co2", name: "Beta Inc", domain: "beta.io", industry: "MARKETING_AND_ADVERTISING", total_revenue: 30000, deal_ids: ["won-3"] },
  { hubspot_company_id: "co3", name: "Gamma SA", domain: "gamma.fr", industry: "TECHNOLOGY", total_revenue: 10000, deal_ids: ["won-4"] },
];

// --- Stages ---
export const normalStages: PipelineStageRow[] = [
  { pipeline_id: "default", stage_id: "qualified", stage_label: "Qualified", display_order: 0, probability: 0.1, is_closed_won: false, is_closed_lost: false },
  { pipeline_id: "default", stage_id: "proposal", stage_label: "Proposal", display_order: 1, probability: 0.3, is_closed_won: false, is_closed_lost: false },
  { pipeline_id: "default", stage_id: "negotiation", stage_label: "Negotiation", display_order: 2, probability: 0.6, is_closed_won: false, is_closed_lost: false },
  { pipeline_id: "default", stage_id: "closedwon", stage_label: "Closed Won", display_order: 3, probability: 1.0, is_closed_won: true, is_closed_lost: false },
  { pipeline_id: "default", stage_id: "closedlost", stage_label: "Closed Lost", display_order: 4, probability: 0, is_closed_won: false, is_closed_lost: true },
];
