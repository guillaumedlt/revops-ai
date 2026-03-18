import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  metric: "revenue" | "deals_won" | "pipeline_value";
  period: "month" | "quarter" | "year";
  ownerId?: string;
  createdAt: string;
}

async function getHubSpotToken(tenantId: string): Promise<{ accessToken: string } | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("hubspot_connections")
    .select("access_token, token_expires_at, refresh_token")
    .eq("tenant_id", tenantId)
    .single();
  if (!data) return null;

  const expiresAt = new Date(data.token_expires_at).getTime();
  if (Date.now() > expiresAt - 5 * 60 * 1000) {
    try {
      const res = await fetch("https://api.hubapi.com/oauth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: process.env.HUBSPOT_CLIENT_ID!,
          client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
          refresh_token: data.refresh_token,
        }).toString(),
      });
      if (!res.ok) return null;
      const tokens = await res.json();
      await supabase
        .from("hubspot_connections")
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        })
        .eq("tenant_id", tenantId);
      return { accessToken: tokens.access_token };
    } catch {
      return null;
    }
  }

  return { accessToken: data.access_token };
}

function getPeriodRange(period: "month" | "quarter" | "year"): { start: string; end: string } {
  const now = new Date();
  let start: Date;
  if (period === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (period === "quarter") {
    const q = Math.floor(now.getMonth() / 3) * 3;
    start = new Date(now.getFullYear(), q, 1);
  } else {
    start = new Date(now.getFullYear(), 0, 1);
  }
  return {
    start: start.toISOString().split("T")[0],
    end: now.toISOString().split("T")[0],
  };
}

async function fetchDeals(accessToken: string, filters: any[], properties: string[]): Promise<any[]> {
  const results: any[] = [];
  let after: string | undefined;
  for (let i = 0; i < 5; i++) {
    const body: any = {
      filterGroups: [{ filters }],
      properties,
      limit: 100,
    };
    if (after) body.after = after;
    const res = await fetch("https://api.hubapi.com/crm/v3/objects/deals/search", {
      method: "POST",
      headers: { Authorization: "Bearer " + accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) break;
    const data = await res.json();
    results.push(...(data.results || []));
    if (!data.paging?.next?.after) break;
    after = data.paging.next.after;
  }
  return results;
}

async function calculateGoalProgress(goal: Goal, accessToken: string): Promise<number> {
  const range = getPeriodRange(goal.period);

  if (goal.metric === "revenue") {
    const filters: any[] = [
      { propertyName: "dealstage", operator: "EQ", value: "closedwon" },
      { propertyName: "closedate", operator: "GTE", value: range.start },
      { propertyName: "closedate", operator: "LTE", value: range.end + "T23:59:59Z" },
    ];
    if (goal.ownerId) filters.push({ propertyName: "hubspot_owner_id", operator: "EQ", value: goal.ownerId });
    const deals = await fetchDeals(accessToken, filters, ["amount"]);
    return deals.reduce(function (sum, d) { return sum + (parseFloat(d.properties.amount) || 0); }, 0);
  }

  if (goal.metric === "deals_won") {
    const filters: any[] = [
      { propertyName: "dealstage", operator: "EQ", value: "closedwon" },
      { propertyName: "closedate", operator: "GTE", value: range.start },
      { propertyName: "closedate", operator: "LTE", value: range.end + "T23:59:59Z" },
    ];
    if (goal.ownerId) filters.push({ propertyName: "hubspot_owner_id", operator: "EQ", value: goal.ownerId });
    const deals = await fetchDeals(accessToken, filters, ["dealname"]);
    return deals.length;
  }

  if (goal.metric === "pipeline_value") {
    const filters: any[] = [
      { propertyName: "dealstage", operator: "NEQ", value: "closedwon" },
      { propertyName: "dealstage", operator: "NEQ", value: "closedlost" },
    ];
    if (goal.ownerId) filters.push({ propertyName: "hubspot_owner_id", operator: "EQ", value: goal.ownerId });
    const deals = await fetchDeals(accessToken, filters, ["amount"]);
    return deals.reduce(function (sum, d) { return sum + (parseFloat(d.properties.amount) || 0); }, 0);
  }

  return 0;
}

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const goals: Goal[] = ((tenant?.settings as any)?.goals) || [];

  if (goals.length === 0) return NextResponse.json({ data: [] });

  const token = await getHubSpotToken(auth.tenantId);
  if (!token) return NextResponse.json({ data: goals.map(function (g) { return { ...g, current: 0 }; }) });

  const results = await Promise.all(
    goals.map(async function (goal) {
      try {
        const current = await calculateGoalProgress(goal, token.accessToken);
        return { ...goal, current };
      } catch {
        return { ...goal, current: 0 };
      }
    })
  );

  return NextResponse.json({ data: results });
}
