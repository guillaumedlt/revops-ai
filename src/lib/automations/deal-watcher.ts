// Autonomous deal watcher — reacts to HubSpot webhook events in real-time

import { createAdminClient } from "@/lib/supabase/admin";
import { sendSlackMessage } from "@/lib/notifications/slack";
import { sendEmail } from "@/lib/notifications/email";

interface HubSpotEvent {
  eventType?: string;
  subscriptionType?: string;
  objectId?: number;
  propertyName?: string;
  propertyValue?: string;
  portalId?: number;
}

// Find tenant by portal ID
async function getTenantByPortal(portalId: number): Promise<{ tenantId: string; settings: any } | null> {
  var supabase = createAdminClient();
  var { data } = await supabase
    .from("hubspot_connections")
    .select("tenant_id")
    .eq("portal_id", String(portalId))
    .single();
  if (!data) return null;

  var { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", data.tenant_id)
    .single();

  return { tenantId: data.tenant_id, settings: tenant?.settings ?? {} };
}

// Create an action in the board
async function createAction(tenantId: string, title: string, priority: string, domain: string, dealId?: string) {
  var supabase = createAdminClient();
  await supabase.from("actions").insert({
    tenant_id: tenantId,
    title: title,
    priority: priority,
    status: "todo",
    source: "alert",
    domain: domain,
    deal_id: dealId ? String(dealId) : null,
  });
}

// Create an alert
async function createAlert(tenantId: string, type: string, severity: string, title: string, description: string, domain: string, dealId?: string) {
  var supabase = createAdminClient();
  await supabase.from("alerts").insert({
    tenant_id: tenantId,
    alert_type: type,
    severity: severity,
    title: title,
    description: description,
    domain: domain,
    deal_id: dealId ? String(dealId) : null,
    status: "active",
  });
}

export async function processHubSpotEvent(event: HubSpotEvent) {
  var portalId = event.portalId;
  if (!portalId) return;

  var tenant = await getTenantByPortal(portalId);
  if (!tenant) return;

  var eventType = event.subscriptionType || event.eventType || "";
  var objectId = event.objectId;
  var propName = event.propertyName || "";
  var propValue = event.propertyValue || "";

  console.log("[deal-watcher] Event:", eventType, "Object:", objectId, "Property:", propName, "=", propValue);

  // ═══════════════════════════════════════════
  // DEAL STAGE CHANGED
  // ═══════════════════════════════════════════
  if (eventType === "deal.propertyChange" && propName === "dealstage") {
    // Deal moved to a new stage — check if fields are complete
    var supabase = createAdminClient();
    var { data: deal } = await supabase
      .from("hs_deals")
      .select("properties")
      .eq("hs_object_id", String(objectId))
      .eq("tenant_id", tenant.tenantId)
      .single();

    if (deal) {
      var p = deal.properties as any;
      var dealName = p?.dealname || "Deal #" + objectId;
      var amount = Number(p?.amount) || 0;
      var missingFields: string[] = [];

      if (!p?.amount || amount === 0) missingFields.push("amount");
      if (!p?.closedate) missingFields.push("close date");
      if (!p?.hubspot_owner_id) missingFields.push("owner");

      if (missingFields.length > 0) {
        var title = dealName + " moved to " + propValue + " but missing: " + missingFields.join(", ");
        await createAction(tenant.tenantId, "Complete fields on " + dealName + " (" + missingFields.join(", ") + ")", "high", "data_quality", objectId);
        await sendSlackMessage(tenant.settings, "⚠️ " + title);
      }
    }
  }

  // ═══════════════════════════════════════════
  // DEAL CREATED
  // ═══════════════════════════════════════════
  if (eventType === "deal.creation") {
    await sendSlackMessage(tenant.settings, "🆕 New deal created (ID: " + objectId + ")");
  }

  // ═══════════════════════════════════════════
  // DEAL CLOSED WON
  // ═══════════════════════════════════════════
  if (eventType === "deal.propertyChange" && propName === "hs_is_closed_won" && propValue === "true") {
    var supabase2 = createAdminClient();
    var { data: wonDeal } = await supabase2
      .from("hs_deals")
      .select("properties")
      .eq("hs_object_id", String(objectId))
      .eq("tenant_id", tenant.tenantId)
      .single();

    var dealName2 = (wonDeal?.properties as any)?.dealname || "Deal";
    var amount2 = Number((wonDeal?.properties as any)?.amount) || 0;

    await sendSlackMessage(tenant.settings, "🎉 Deal won: " + dealName2 + " — " + amount2.toLocaleString() + " EUR");

    // Create action to schedule onboarding/handoff
    await createAction(tenant.tenantId, "Schedule onboarding for " + dealName2, "high", "pipeline", objectId);
  }

  // ═══════════════════════════════════════════
  // DEAL CLOSED LOST
  // ═══════════════════════════════════════════
  if (eventType === "deal.propertyChange" && propName === "hs_is_closed_won" && propValue === "false") {
    await createAction(tenant.tenantId, "Post-mortem: analyze why deal was lost (ID: " + objectId + ")", "medium", "performance", objectId);
  }
}
