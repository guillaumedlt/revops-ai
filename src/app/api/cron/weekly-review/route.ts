import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkCredits, deductCredit } from "@/lib/ai/credits";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== "Bearer " + process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: tenants } = await supabase.from("tenants").select("id, settings");

  let generated = 0;

  for (const tenant of tenants || []) {
    const { data: hs } = await supabase.from("hubspot_connections").select("access_token").eq("tenant_id", tenant.id).single();
    if (!hs) continue;

    const { data: user } = await supabase.from("users").select("id").eq("tenant_id", tenant.id).limit(1).single();
    if (!user) continue;

    const credits = await checkCredits(tenant.id, "briefing");
    if (!credits.allowed) continue;

    try {
      const token = hs.access_token;
      const headers = { Authorization: "Bearer " + token, "Content-Type": "application/json" };
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

      // Won this week
      const wonRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals/search", {
        method: "POST", headers,
        body: JSON.stringify({
          filterGroups: [{ filters: [
            { propertyName: "hs_is_closed_won", operator: "EQ", value: "true" },
            { propertyName: "closedate", operator: "GTE", value: weekAgo },
          ] }],
          properties: ["dealname", "amount", "hubspot_owner_id"],
          limit: 50,
        }),
      });
      const wonData = wonRes.ok ? await wonRes.json() : { results: [] };

      // Lost this week
      const lostRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals/search", {
        method: "POST", headers,
        body: JSON.stringify({
          filterGroups: [{ filters: [
            { propertyName: "hs_is_closed", operator: "EQ", value: "true" },
            { propertyName: "hs_is_closed_won", operator: "EQ", value: "false" },
            { propertyName: "closedate", operator: "GTE", value: weekAgo },
          ] }],
          properties: ["dealname", "amount"],
          limit: 50,
        }),
      });
      const lostData = lostRes.ok ? await lostRes.json() : { results: [] };

      // Open pipeline
      const openRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals/search", {
        method: "POST", headers,
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "hs_is_closed", operator: "EQ", value: "false" }] }],
          properties: ["dealname", "amount", "hs_last_sales_activity_date"],
          limit: 100,
        }),
      });
      const openData = openRes.ok ? await openRes.json() : { results: [], total: 0 };

      const wonRevenue = (wonData.results || []).reduce((s: number, d: any) => s + (Number(d.properties.amount) || 0), 0);
      const lostRevenue = (lostData.results || []).reduce((s: number, d: any) => s + (Number(d.properties.amount) || 0), 0);
      const pipeline = (openData.results || []).reduce((s: number, d: any) => s + (Number(d.properties.amount) || 0), 0);
      const stale = (openData.results || []).filter((d: any) => {
        const last = d.properties.hs_last_sales_activity_date;
        return !last || (Date.now() - new Date(last).getTime()) > 14 * 86400000;
      }).length;

      // Generate with AI
      const prompt = `Generate a weekly sales review in French. Concise, actionable. Use :::kpi_grid for key numbers, :::table for details. Data:\n\n` +
        `Won this week: ${wonData.results?.length || 0} deals, ${wonRevenue} EUR\n` +
        `Lost this week: ${lostData.results?.length || 0} deals, ${lostRevenue} EUR\n` +
        `Open pipeline: ${openData.total || 0} deals, ${pipeline} EUR\n` +
        `Stale deals (>14 days no activity): ${stale}\n` +
        `Top won: ${(wonData.results || []).slice(0, 3).map((d: any) => d.properties.dealname + " (" + (d.properties.amount || 0) + " EUR)").join(", ")}\n\n` +
        `Structure: KPIs → highlights → concerns → actions for next week. Max 300 words.`;

      const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      if (!aiRes.ok) continue;
      const aiData = await aiRes.json();
      const text = aiData.content?.[0]?.text || "";

      const { parseContentBlocks } = await import("@/lib/ai/parse-blocks");
      const blocks = parseContentBlocks(text);

      const weekLabel = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const { data: conv } = await supabase.from("conversations").insert({
        tenant_id: tenant.id, user_id: user.id,
        title: "Weekly Review — " + weekLabel,
      }).select("id").single();

      if (conv) {
        await supabase.from("messages").insert({
          conversation_id: conv.id, tenant_id: tenant.id, role: "assistant",
          content: text, content_blocks: blocks, model: "weekly-review",
        });
        await deductCredit(tenant.id, user.id, "briefing");
        generated++;
      }
    } catch (e) {
      console.error("[weekly-review] Error for tenant", tenant.id, e);
    }
  }

  return NextResponse.json({ data: { generated } });
}
