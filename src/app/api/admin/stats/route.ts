import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  var check = await requireAdmin(request);
  if (!check.ok) return check.response;

  var supabase = createAdminClient();
  var now = new Date();
  var today = now.toISOString().split("T")[0];
  var sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
  var thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000).toISOString();

  // All queries in parallel
  var [
    usersRes,
    tenantsRes,
    conversationsRes,
    messagesRes,
    messages7dRes,
    messages30dRes,
    actionsRes,
    alertsRes,
    creditsRes,
    hubspotRes,
    notionRes,
    recentUsersRes,
    recentConvsRes,
    topTenantsRes,
  ] = await Promise.all([
    // Total users
    supabase.from("users").select("id", { count: "exact", head: true }),
    // Total tenants
    supabase.from("tenants").select("id, name, plan, created_at", { count: "exact" }),
    // Total conversations
    supabase.from("conversations").select("id", { count: "exact", head: true }),
    // Total messages
    supabase.from("messages").select("id", { count: "exact", head: true }),
    // Messages last 7 days
    supabase.from("messages").select("id", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
    // Messages last 30 days
    supabase.from("messages").select("id", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo),
    // Total actions
    supabase.from("actions").select("id", { count: "exact", head: true }),
    // Active alerts
    supabase.from("alerts").select("id", { count: "exact", head: true }).eq("status", "active"),
    // Credit allocations
    supabase.from("credit_allocations").select("tenant_id, credits_allocated, credits_used, bonus_credits").gte("billing_period_end", today),
    // HubSpot connections
    supabase.from("hubspot_connections").select("id", { count: "exact", head: true }),
    // Notion connections
    supabase.from("notion_connections").select("id", { count: "exact", head: true }),
    // Recent signups (last 30 days)
    supabase.from("users").select("id, email, created_at").gte("created_at", thirtyDaysAgo).order("created_at", { ascending: false }).limit(20),
    // Recent conversations (last 7 days)
    supabase.from("conversations").select("id, title, tenant_id, created_at").gte("created_at", sevenDaysAgo).order("created_at", { ascending: false }).limit(20),
    // Top tenants by message count
    supabase.from("messages").select("tenant_id").gte("created_at", thirtyDaysAgo),
  ]);

  // Compute tenant message counts
  var tenantMsgCounts: Record<string, number> = {};
  (topTenantsRes.data || []).forEach(function(m: any) {
    tenantMsgCounts[m.tenant_id] = (tenantMsgCounts[m.tenant_id] || 0) + 1;
  });

  var tenants = tenantsRes.data || [];
  var topTenants = tenants
    .map(function(t: any) {
      return { id: t.id, name: t.name || "Unnamed", plan: t.plan, messages30d: tenantMsgCounts[t.id] || 0, created: t.created_at };
    })
    .sort(function(a: any, b: any) { return b.messages30d - a.messages30d; })
    .slice(0, 10);

  // Plan distribution
  var planCounts: Record<string, number> = { free: 0, pro: 0, business: 0 };
  tenants.forEach(function(t: any) { planCounts[t.plan || "free"] = (planCounts[t.plan || "free"] || 0) + 1; });

  // Credit usage
  var totalCreditsAllocated = 0;
  var totalCreditsUsed = 0;
  (creditsRes.data || []).forEach(function(c: any) {
    totalCreditsAllocated += (c.credits_allocated || 0) + (c.bonus_credits || 0);
    totalCreditsUsed += c.credits_used || 0;
  });

  // Signups per day (last 30 days)
  var signupsByDay: Record<string, number> = {};
  (recentUsersRes.data || []).forEach(function(u: any) {
    var day = u.created_at?.split("T")[0];
    if (day) signupsByDay[day] = (signupsByDay[day] || 0) + 1;
  });

  return NextResponse.json({
    data: {
      overview: {
        totalUsers: usersRes.count || 0,
        totalTenants: tenantsRes.count || 0,
        totalConversations: conversationsRes.count || 0,
        totalMessages: messagesRes.count || 0,
        messages7d: messages7dRes.count || 0,
        messages30d: messages30dRes.count || 0,
        totalActions: actionsRes.count || 0,
        activeAlerts: alertsRes.count || 0,
        hubspotConnections: hubspotRes.count || 0,
        notionConnections: notionRes.count || 0,
      },
      credits: {
        totalAllocated: totalCreditsAllocated,
        totalUsed: totalCreditsUsed,
        usagePercent: totalCreditsAllocated > 0 ? Math.round((totalCreditsUsed / totalCreditsAllocated) * 100) : 0,
      },
      plans: planCounts,
      topTenants: topTenants,
      recentSignups: (recentUsersRes.data || []).map(function(u: any) {
        return { email: u.email, created: u.created_at };
      }),
      recentConversations: (recentConvsRes.data || []).map(function(c: any) {
        return { title: c.title, tenantId: c.tenant_id, created: c.created_at };
      }),
      signupsByDay: signupsByDay,
    },
  });
}
