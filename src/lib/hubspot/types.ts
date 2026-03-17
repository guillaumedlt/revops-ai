// HubSpot property constants and sync types

import type { Pipeline } from "./client";

// ---------------------------------------------------------------------------
// Property lists for each object type
// ---------------------------------------------------------------------------

export const DEAL_PROPERTIES = [
  "dealname",
  "dealstage",
  "pipeline",
  "amount",
  "closedate",
  "createdate",
  "hubspot_owner_id",
  "hs_lastmodifieddate",
  "notes_last_updated",
  "hs_last_sales_activity_date",
  "hs_date_entered_closedwon",
  "hs_date_entered_closedlost",
  "hs_is_closed_won",
  "hs_is_closed",
  "hs_time_in_current_stage",
  "hs_is_stalled",
  "days_to_close",
  "closed_lost_reason",
  "hs_closed_lost_category",
  "hs_deal_stage_probability",
  "hs_analytics_source",
  "hs_analytics_source_data_1",
];

export const CONTACT_PROPERTIES = [
  "email",
  "firstname",
  "lastname",
  "phone",
  "company",
  "jobtitle",
  "lifecyclestage",
  "hs_lead_status",
  "hubspot_owner_id",
  "createdate",
  "hs_lastmodifieddate",
  "hs_time_to_first_engagement",
  "notes_last_updated",
  "num_notes",
  "num_contacted_notes",
  "hs_sales_email_last_replied",
  "hs_is_unworked",
  "hs_analytics_source",
];

export const COMPANY_PROPERTIES = [
  "name",
  "domain",
  "industry",
  "city",
  "country",
  "numberofemployees",
  "annualrevenue",
  "hubspot_owner_id",
  "total_revenue",
  "createdate",
  "hs_lastmodifieddate",
];

// ---------------------------------------------------------------------------
// Dynamic stage properties
// ---------------------------------------------------------------------------

export function getDealPropertiesForPipelines(
  pipelines: Pipeline[]
): string[] {
  const dynamicProps: string[] = [];

  for (const pipeline of pipelines) {
    for (const stage of pipeline.stages) {
      dynamicProps.push(
        `hs_date_entered_${stage.id}`,
        `hs_date_exited_${stage.id}`,
        `hs_v2_cumulative_time_in_${stage.id}`
      );
    }
  }

  // Merge with base properties, deduplicate
  const all = DEAL_PROPERTIES.concat(dynamicProps);
  return Array.from(new Set(all));
}

// ---------------------------------------------------------------------------
// Sync result interface
// ---------------------------------------------------------------------------

export interface SyncResult {
  success: boolean;
  objectType: string;
  recordsSynced: number;
  recordsCreated: number;
  recordsUpdated: number;
  errors: Array<{ id: string; error: string }>;
  syncType: "incremental" | "full";
}
