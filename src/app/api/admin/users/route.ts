import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

var ADMIN_EMAIL = "guillaume@ceres.agency";

export async function GET(request: NextRequest) {
  var auth = getAuthFromHeaders(request);
  if (!auth || auth.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  var supabase = createAdminClient();

  // Get all users with their tenant info
  var { data: users } = await supabase
    .from("users")
    .select("id, email, tenant_id, role, created_at")
    .order("created_at", { ascending: false });

  // Get all tenants
  var { data: tenants } = await supabase
    .from("tenants")
    .select("id, name, plan, settings, created_at");

  // Get message counts per tenant
  var { data: messages } = await supabase
    .from("messages")
    .select("tenant_id, role");

  // Get conversation counts per tenant
  var { data: conversations } = await supabase
    .from("conversations")
    .select("tenant_id");

  // Get credit allocations
  var today = new Date().toISOString().split("T")[0];
  var { data: credits } = await supabase
    .from("credit_allocations")
    .select("tenant_id, credits_allocated, credits_used, bonus_credits")
    .gte("billing_period_end", today);

  // Get connections
  var { data: hsConns } = await supabase.from("hubspot_connections").select("tenant_id");
  var { data: notionConns } = await supabase.from("notion_connections").select("tenant_id");

  // Build tenant lookup
  var tenantMap: Record<string, any> = {};
  (tenants || []).forEach(function(t: any) { tenantMap[t.id] = t; });

  // Message counts per tenant
  var msgCounts: Record<string, { user: number; assistant: number }> = {};
  (messages || []).forEach(function(m: any) {
    if (!msgCounts[m.tenant_id]) msgCounts[m.tenant_id] = { user: 0, assistant: 0 };
    msgCounts[m.tenant_id][m.role === "user" ? "user" : "assistant"]++;
  });

  // Conversation counts per tenant
  var convCounts: Record<string, number> = {};
  (conversations || []).forEach(function(c: any) { convCounts[c.tenant_id] = (convCounts[c.tenant_id] || 0) + 1; });

  // Credit lookup
  var creditMap: Record<string, any> = {};
  (credits || []).forEach(function(c: any) { creditMap[c.tenant_id] = c; });

  // Connection lookup
  var hsSet = new Set((hsConns || []).map(function(c: any) { return c.tenant_id; }));
  var notionSet = new Set((notionConns || []).map(function(c: any) { return c.tenant_id; }));

  // Build enriched user list
  var enrichedUsers = (users || []).map(function(u: any) {
    var t = tenantMap[u.tenant_id] || {};
    var msgs = msgCounts[u.tenant_id] || { user: 0, assistant: 0 };
    var cred = creditMap[u.tenant_id];
    var settings = (t.settings as any) || {};
    var userMeta = settings?.llm?.userName || "";
    var companySize = "";
    var userRole = u.role || "";

    return {
      id: u.id,
      email: u.email,
      name: userMeta,
      tenantId: u.tenant_id,
      tenantName: t.name || "",
      plan: t.plan || "free",
      role: userRole,
      companySize: companySize,
      messagesUser: msgs.user,
      messagesAssistant: msgs.assistant,
      totalMessages: msgs.user + msgs.assistant,
      conversations: convCounts[u.tenant_id] || 0,
      creditsUsed: cred?.credits_used || 0,
      creditsTotal: (cred?.credits_allocated || 0) + (cred?.bonus_credits || 0),
      hubspot: hsSet.has(u.tenant_id),
      notion: notionSet.has(u.tenant_id),
      createdAt: u.created_at,
      lastActive: null, // Would need messages query per user
    };
  });

  return NextResponse.json({ data: { users: enrichedUsers } });
}
