// HubSpot Sync Engine — orchestrates data sync from HubSpot to Supabase

import { type SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getPipelines,
  getOwners,
  searchObjectsIterator,
  getAssociations,
  type Pipeline,
} from "./client";
import {
  DEAL_PROPERTIES,
  CONTACT_PROPERTIES,
  COMPANY_PROPERTIES,
  getDealPropertiesForPipelines,
  type SyncResult,
} from "./types";

// ---------------------------------------------------------------------------
// Helper: data conversion utilities
// ---------------------------------------------------------------------------

function toTimestamp(value: string | null | undefined): string | null {
  if (!value || value === "") return null;
  const ms = parseInt(value, 10);
  if (!isNaN(ms)) {
    return new Date(ms).toISOString();
  }
  // Already an ISO string or date string
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

// ---------------------------------------------------------------------------
// Data mapping functions
// ---------------------------------------------------------------------------

function mapDealFromHubSpot(
  record: { id: string; properties: Record<string, string | null> },
  tenantId: string
): Record<string, unknown> {
  const p = record.properties;

  // Extract dynamic stage timestamps and cumulative times
  const stageTimestamps: Record<string, string | null> = {};
  const cumulativeStageTimes: Record<string, number | null> = {};

  for (const [key, val] of Object.entries(p)) {
    if (key.startsWith("hs_date_entered_") && !key.endsWith("closedwon") && !key.endsWith("closedlost")) {
      const stageId = key.replace("hs_date_entered_", "");
      stageTimestamps[`entered_${stageId}`] = toTimestamp(val);
    } else if (key.startsWith("hs_date_exited_")) {
      const stageId = key.replace("hs_date_exited_", "");
      stageTimestamps[`exited_${stageId}`] = toTimestamp(val);
    } else if (key.startsWith("hs_v2_cumulative_time_in_")) {
      const stageId = key.replace("hs_v2_cumulative_time_in_", "");
      cumulativeStageTimes[stageId] = toNumber(val);
    }
  }

  return {
    tenant_id: tenantId,
    hubspot_deal_id: record.id,
    dealname: p.dealname,
    dealstage: p.dealstage,
    pipeline: p.pipeline,
    amount: toNumber(p.amount),
    closedate: toTimestamp(p.closedate),
    createdate: toTimestamp(p.createdate),
    hubspot_owner_id: p.hubspot_owner_id,
    hs_lastmodifieddate: toTimestamp(p.hs_lastmodifieddate),
    notes_last_updated: toTimestamp(p.notes_last_updated),
    hs_last_sales_activity_date: toTimestamp(p.hs_last_sales_activity_date),
    hs_date_entered_closedwon: toTimestamp(p.hs_date_entered_closedwon),
    hs_date_entered_closedlost: toTimestamp(p.hs_date_entered_closedlost),
    hs_is_closed_won: toBoolean(p.hs_is_closed_won),
    hs_is_closed: toBoolean(p.hs_is_closed),
    hs_time_in_current_stage: toNumber(p.hs_time_in_current_stage),
    hs_is_stalled: toBoolean(p.hs_is_stalled),
    days_to_close: toNumber(p.days_to_close),
    closed_lost_reason: p.closed_lost_reason,
    hs_closed_lost_category: p.hs_closed_lost_category,
    hs_deal_stage_probability: toNumber(p.hs_deal_stage_probability),
    hs_analytics_source: p.hs_analytics_source,
    hs_analytics_source_data_1: p.hs_analytics_source_data_1,
    stage_timestamps: stageTimestamps,
    cumulative_stage_times: cumulativeStageTimes,
    raw_properties: p,
    synced_at: new Date().toISOString(),
  };
}

function mapContactFromHubSpot(
  record: { id: string; properties: Record<string, string | null> },
  tenantId: string
): Record<string, unknown> {
  const p = record.properties;

  return {
    tenant_id: tenantId,
    hubspot_contact_id: record.id,
    email: p.email,
    firstname: p.firstname,
    lastname: p.lastname,
    phone: p.phone,
    company: p.company,
    jobtitle: p.jobtitle,
    lifecyclestage: p.lifecyclestage,
    hs_lead_status: p.hs_lead_status,
    hubspot_owner_id: p.hubspot_owner_id,
    createdate: toTimestamp(p.createdate),
    hs_lastmodifieddate: toTimestamp(p.hs_lastmodifieddate),
    hs_time_to_first_engagement: toNumber(p.hs_time_to_first_engagement),
    notes_last_updated: toTimestamp(p.notes_last_updated),
    num_notes: toNumber(p.num_notes),
    num_contacted_notes: toNumber(p.num_contacted_notes),
    hs_sales_email_last_replied: toTimestamp(p.hs_sales_email_last_replied),
    hs_is_unworked: toBoolean(p.hs_is_unworked),
    hs_analytics_source: p.hs_analytics_source,
    raw_properties: p,
    synced_at: new Date().toISOString(),
  };
}

function mapCompanyFromHubSpot(
  record: { id: string; properties: Record<string, string | null> },
  tenantId: string
): Record<string, unknown> {
  const p = record.properties;

  return {
    tenant_id: tenantId,
    hubspot_company_id: record.id,
    name: p.name,
    domain: p.domain,
    industry: p.industry,
    city: p.city,
    country: p.country,
    numberofemployees: toNumber(p.numberofemployees),
    annualrevenue: toNumber(p.annualrevenue),
    hubspot_owner_id: p.hubspot_owner_id,
    total_revenue: toNumber(p.total_revenue),
    createdate: toTimestamp(p.createdate),
    hs_lastmodifieddate: toTimestamp(p.hs_lastmodifieddate),
    raw_properties: p,
    synced_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Token refresh
// ---------------------------------------------------------------------------

async function getValidAccessToken(
  tenantId: string,
  supabase: SupabaseClient
): Promise<{ accessToken: string; portalId: string }> {
  const { data: connection, error } = await supabase
    .from("hubspot_connections")
    .select("*")
    .eq("tenant_id", tenantId)
    .single();

  if (error || !connection) {
    throw new Error(`No HubSpot connection found for tenant ${tenantId}`);
  }

  const expiresAt = new Date(connection.token_expires_at).getTime();
  const thirtyMinutesFromNow = Date.now() + 30 * 60 * 1_000;

  // Token still valid
  if (expiresAt > thirtyMinutesFromNow) {
    return {
      accessToken: connection.access_token,
      portalId: String(connection.portal_id),
    };
  }

  // Refresh the token
  try {
    const response = await fetch("https://api.hubapi.com/oauth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.HUBSPOT_CLIENT_ID!,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
        refresh_token: connection.refresh_token,
      }).toString(),
    });

    if (!response.ok) {
      const errorBody = await response.json();

      // Handle revoked / invalid grant
      if (
        errorBody.error === "invalid_grant" ||
        errorBody.status === "BAD_REFRESH_TOKEN"
      ) {
        await supabase
          .from("hubspot_connections")
          .update({ sync_status: "revoked" })
          .eq("tenant_id", tenantId);

        throw new Error(
          `HubSpot refresh token revoked for tenant ${tenantId}`
        );
      }

      throw new Error(
        `Token refresh failed: ${errorBody.error_description || errorBody.message}`
      );
    }

    const tokens = await response.json();
    const newExpiresAt = new Date(
      Date.now() + tokens.expires_in * 1_000
    ).toISOString();

    await supabase
      .from("hubspot_connections")
      .update({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: newExpiresAt,
      })
      .eq("tenant_id", tenantId);

    return {
      accessToken: tokens.access_token,
      portalId: String(connection.portal_id),
    };
  } catch (err) {
    // Re-throw if already handled
    if (err instanceof Error && err.message.includes("revoked")) {
      throw err;
    }
    throw new Error(
      `Token refresh error for tenant ${tenantId}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

// ---------------------------------------------------------------------------
// Sync: Pipeline Stages
// ---------------------------------------------------------------------------

async function syncPipelineStages(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient
): Promise<{ pipelines: Pipeline[]; result: SyncResult }> {
  const pipelines = await getPipelines(accessToken, portalId);

  const rows = pipelines.flatMap((pipeline) =>
    pipeline.stages.map((stage) => ({
      tenant_id: tenantId,
      pipeline_id: pipeline.id,
      pipeline_label: pipeline.label,
      stage_id: stage.id,
      stage_label: stage.label,
      display_order: stage.displayOrder,
      probability: stage.metadata.probability ?? null,
      is_closed_won: stage.metadata.isClosed === "WON",
      is_closed_lost: stage.metadata.isClosed === "LOST",
      synced_at: new Date().toISOString(),
    }))
  );

  const errors: Array<{ id: string; error: string }> = [];

  if (rows.length > 0) {
    const { error } = await supabase
      .from("hs_pipeline_stages")
      .upsert(rows, { onConflict: "tenant_id,pipeline_id,stage_id" });

    if (error) {
      errors.push({ id: "pipeline_stages", error: error.message });
    }
  }

  return {
    pipelines,
    result: {
      success: errors.length === 0,
      objectType: "pipeline_stages",
      recordsSynced: rows.length,
      recordsCreated: rows.length, // upsert — we cannot distinguish
      recordsUpdated: 0,
      errors,
      syncType: "full",
    },
  };
}

// ---------------------------------------------------------------------------
// Sync: Owners
// ---------------------------------------------------------------------------

async function syncOwners(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient
): Promise<SyncResult> {
  const owners = await getOwners(accessToken, portalId);

  const rows = owners.map((owner) => ({
    tenant_id: tenantId,
    hubspot_owner_id: owner.id,
    email: owner.email,
    first_name: owner.firstName,
    last_name: owner.lastName,
    is_active: true,
    synced_at: new Date().toISOString(),
  }));

  const errors: Array<{ id: string; error: string }> = [];

  if (rows.length > 0) {
    const { error } = await supabase
      .from("hs_owners")
      .upsert(rows, { onConflict: "tenant_id,hubspot_owner_id" });

    if (error) {
      errors.push({ id: "owners", error: error.message });
    }
  }

  return {
    success: errors.length === 0,
    objectType: "owners",
    recordsSynced: rows.length,
    recordsCreated: rows.length,
    recordsUpdated: 0,
    errors,
    syncType: "full",
  };
}

// ---------------------------------------------------------------------------
// Sync: Deals
// ---------------------------------------------------------------------------

async function syncDeals(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient,
  dealProperties: string[],
  lastSyncAt?: string | null
): Promise<SyncResult> {
  const filters: Array<{
    propertyName: string;
    operator: string;
    value?: string;
  }> = [];

  if (lastSyncAt) {
    filters.push({
      propertyName: "hs_lastmodifieddate",
      operator: "GTE",
      value: new Date(lastSyncAt).getTime().toString(),
    });
  }

  const records: Record<string, unknown>[] = [];
  const errors: Array<{ id: string; error: string }> = [];

  for await (const record of searchObjectsIterator(
    "deals",
    filters,
    dealProperties,
    accessToken,
    portalId
  )) {
    records.push(mapDealFromHubSpot(record, tenantId));
  }

  // Upsert in batches of 500
  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("hs_deals")
      .upsert(batch, { onConflict: "tenant_id,hubspot_deal_id" });

    if (error) {
      errors.push({
        id: `deals_batch_${i}`,
        error: error.message,
      });
    }
  }

  return {
    success: errors.length === 0,
    objectType: "deals",
    recordsSynced: records.length,
    recordsCreated: records.length,
    recordsUpdated: 0,
    errors,
    syncType: lastSyncAt ? "incremental" : "full",
  };
}

// ---------------------------------------------------------------------------
// Sync: Contacts
// ---------------------------------------------------------------------------

async function syncContacts(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient,
  lastSyncAt?: string | null
): Promise<SyncResult> {
  const filters: Array<{
    propertyName: string;
    operator: string;
    value?: string;
  }> = [];

  if (lastSyncAt) {
    filters.push({
      propertyName: "hs_lastmodifieddate",
      operator: "GTE",
      value: new Date(lastSyncAt).getTime().toString(),
    });
  }

  const records: Record<string, unknown>[] = [];
  const errors: Array<{ id: string; error: string }> = [];

  for await (const record of searchObjectsIterator(
    "contacts",
    filters,
    CONTACT_PROPERTIES,
    accessToken,
    portalId
  )) {
    records.push(mapContactFromHubSpot(record, tenantId));
  }

  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("hs_contacts")
      .upsert(batch, { onConflict: "tenant_id,hubspot_contact_id" });

    if (error) {
      errors.push({
        id: `contacts_batch_${i}`,
        error: error.message,
      });
    }
  }

  return {
    success: errors.length === 0,
    objectType: "contacts",
    recordsSynced: records.length,
    recordsCreated: records.length,
    recordsUpdated: 0,
    errors,
    syncType: lastSyncAt ? "incremental" : "full",
  };
}

// ---------------------------------------------------------------------------
// Sync: Companies
// ---------------------------------------------------------------------------

async function syncCompanies(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient,
  lastSyncAt?: string | null
): Promise<SyncResult> {
  const filters: Array<{
    propertyName: string;
    operator: string;
    value?: string;
  }> = [];

  if (lastSyncAt) {
    filters.push({
      propertyName: "hs_lastmodifieddate",
      operator: "GTE",
      value: new Date(lastSyncAt).getTime().toString(),
    });
  }

  const records: Record<string, unknown>[] = [];
  const errors: Array<{ id: string; error: string }> = [];

  for await (const record of searchObjectsIterator(
    "companies",
    filters,
    COMPANY_PROPERTIES,
    accessToken,
    portalId
  )) {
    records.push(mapCompanyFromHubSpot(record, tenantId));
  }

  const BATCH_SIZE = 500;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("hs_companies")
      .upsert(batch, { onConflict: "tenant_id,hubspot_company_id" });

    if (error) {
      errors.push({
        id: `companies_batch_${i}`,
        error: error.message,
      });
    }
  }

  return {
    success: errors.length === 0,
    objectType: "companies",
    recordsSynced: records.length,
    recordsCreated: records.length,
    recordsUpdated: 0,
    errors,
    syncType: lastSyncAt ? "incremental" : "full",
  };
}

// ---------------------------------------------------------------------------
// Sync: Associations (deal → contacts, deal → companies)
// ---------------------------------------------------------------------------

async function syncAssociations(
  tenantId: string,
  accessToken: string,
  portalId: string,
  supabase: SupabaseClient
): Promise<SyncResult> {
  // Fetch all deals for this tenant
  const { data: deals, error: fetchError } = await supabase
    .from("hs_deals")
    .select("hubspot_deal_id")
    .eq("tenant_id", tenantId);

  if (fetchError) {
    return {
      success: false,
      objectType: "associations",
      recordsSynced: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      errors: [{ id: "fetch_deals", error: fetchError.message }],
      syncType: "full",
    };
  }

  const errors: Array<{ id: string; error: string }> = [];
  let updated = 0;

  for (const deal of deals ?? []) {
    try {
      const [contactIds, companyIds] = await Promise.all([
        getAssociations(
          "deals",
          deal.hubspot_deal_id,
          "contacts",
          accessToken,
          portalId
        ),
        getAssociations(
          "deals",
          deal.hubspot_deal_id,
          "companies",
          accessToken,
          portalId
        ),
      ]);

      const { error: updateError } = await supabase
        .from("hs_deals")
        .update({
          contact_ids: contactIds,
          company_ids: companyIds,
        })
        .eq("tenant_id", tenantId)
        .eq("hubspot_deal_id", deal.hubspot_deal_id);

      if (updateError) {
        errors.push({
          id: deal.hubspot_deal_id,
          error: updateError.message,
        });
      } else {
        updated++;
      }
    } catch (err) {
      errors.push({
        id: deal.hubspot_deal_id,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return {
    success: errors.length === 0,
    objectType: "associations",
    recordsSynced: updated,
    recordsCreated: 0,
    recordsUpdated: updated,
    errors,
    syncType: "full",
  };
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

export interface TenantSyncResult {
  tenantId: string;
  syncType: "incremental" | "full";
  results: SyncResult[];
  startedAt: string;
  completedAt: string;
}

export async function syncTenant(
  tenantId: string,
  forceFullSync = false
): Promise<TenantSyncResult> {
  const supabase = createAdminClient();
  const startedAt = new Date().toISOString();
  const results: SyncResult[] = [];

  // 1. Get connection and check status
  const { data: connection, error: connError } = await supabase
    .from("hubspot_connections")
    .select("*")
    .eq("tenant_id", tenantId)
    .single();

  if (connError || !connection) {
    throw new Error(
      `No HubSpot connection for tenant ${tenantId}: ${connError?.message ?? "not found"}`
    );
  }

  if (connection.sync_status === "revoked") {
    throw new Error(
      `HubSpot connection revoked for tenant ${tenantId}`
    );
  }

  // Mark sync as in progress
  await supabase
    .from("hubspot_connections")
    .update({ sync_status: "syncing" })
    .eq("tenant_id", tenantId);

  try {
    // 2. Get valid access token
    const { accessToken, portalId } = await getValidAccessToken(
      tenantId,
      supabase
    );

    // 3. Sync pipeline stages
    const { pipelines, result: stagesResult } = await syncPipelineStages(
      tenantId,
      accessToken,
      portalId,
      supabase
    );
    results.push(stagesResult);

    // 4. Sync owners
    const ownersResult = await syncOwners(
      tenantId,
      accessToken,
      portalId,
      supabase
    );
    results.push(ownersResult);

    // 5. Determine sync mode
    const lastSyncAt = connection.last_sync_at;
    const isIncremental = !forceFullSync && !!lastSyncAt;
    const syncSince = isIncremental ? lastSyncAt : null;

    // Get deal properties including dynamic stage properties
    const dealProperties = getDealPropertiesForPipelines(pipelines);

    // 6. Sync deals
    const dealsResult = await syncDeals(
      tenantId,
      accessToken,
      portalId,
      supabase,
      dealProperties,
      syncSince
    );
    results.push(dealsResult);

    // 7. Sync contacts
    const contactsResult = await syncContacts(
      tenantId,
      accessToken,
      portalId,
      supabase,
      syncSince
    );
    results.push(contactsResult);

    // 8. Sync companies
    const companiesResult = await syncCompanies(
      tenantId,
      accessToken,
      portalId,
      supabase,
      syncSince
    );
    results.push(companiesResult);

    // 9. Sync associations
    const associationsResult = await syncAssociations(
      tenantId,
      accessToken,
      portalId,
      supabase
    );
    results.push(associationsResult);

    const completedAt = new Date().toISOString();
    const syncType = isIncremental ? "incremental" : "full";

    // 10. Update timestamps
    const updatePayload: Record<string, unknown> = {
      last_sync_at: completedAt,
      sync_status: "idle",
    };
    if (!isIncremental) {
      updatePayload.last_full_sync_at = completedAt;
    }

    await supabase
      .from("hubspot_connections")
      .update(updatePayload)
      .eq("tenant_id", tenantId);

    // 11. Log to sync_logs
    const totalErrors = results.reduce(
      (sum, r) => sum + r.errors.length,
      0
    );
    const totalRecords = results.reduce(
      (sum, r) => sum + r.recordsSynced,
      0
    );

    await supabase.from("sync_logs").insert({
      tenant_id: tenantId,
      sync_type: syncType,
      started_at: startedAt,
      completed_at: completedAt,
      records_synced: totalRecords,
      errors_count: totalErrors,
      details: results,
      status: totalErrors === 0 ? "success" : "partial",
    });

    return {
      tenantId,
      syncType: syncType as "incremental" | "full",
      results,
      startedAt,
      completedAt,
    };
  } catch (err) {
    // Reset sync status on failure
    await supabase
      .from("hubspot_connections")
      .update({ sync_status: "idle" })
      .eq("tenant_id", tenantId);

    // Log the failure
    await supabase.from("sync_logs").insert({
      tenant_id: tenantId,
      sync_type: forceFullSync ? "full" : "incremental",
      started_at: startedAt,
      completed_at: new Date().toISOString(),
      records_synced: 0,
      errors_count: 1,
      details: {
        error: err instanceof Error ? err.message : String(err),
      },
      status: "failed",
    });

    throw err;
  }
}
