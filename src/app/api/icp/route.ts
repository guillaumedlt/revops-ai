import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const icp = ((data?.settings as any)?.icp) || null;

  return NextResponse.json({ data: icp });
}

export async function PUT(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supabase = createAdminClient();
  const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const currentSettings = (tenant?.settings as Record<string, any>) || {};

  await supabase.from("tenants").update({
    settings: { ...currentSettings, icp: body },
  }).eq("id", auth.tenantId);

  return NextResponse.json({ data: { saved: true } });
}

async function hsFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch("https://api.hubapi.com" + path, {
    ...options,
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[ICP] HubSpot error:", res.status, body.slice(0, 300));
    throw new Error("HubSpot " + res.status);
  }
  return res.json();
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const domain = body.domain || null;

  const supabase = createAdminClient();

  // Get HubSpot token
  const { data: hsConn } = await supabase
    .from("hubspot_connections")
    .select("access_token, portal_id, token_expires_at, refresh_token")
    .eq("tenant_id", auth.tenantId)
    .single();

  if (!hsConn) return NextResponse.json({ error: "HubSpot not connected. Go to Settings > Connectors." }, { status: 400 });

  // Refresh token if needed
  let token = hsConn.access_token;
  const expiresAt = new Date(hsConn.token_expires_at).getTime();
  if (Date.now() > expiresAt - 5 * 60 * 1000) {
    try {
      const refreshRes = await fetch("https://api.hubapi.com/oauth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: process.env.HUBSPOT_CLIENT_ID!,
          client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
          refresh_token: hsConn.refresh_token,
        }).toString(),
      });
      if (refreshRes.ok) {
        const tokens = await refreshRes.json();
        token = tokens.access_token;
        await supabase.from("hubspot_connections").update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        }).eq("tenant_id", auth.tenantId);
      } else {
        return NextResponse.json({ error: "HubSpot token expired. Reconnect in Settings." }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "Failed to refresh HubSpot token" }, { status: 500 });
    }
  }

  // Step 1: Lookup company by domain
  let companyInfo: any = null;
  if (domain) {
    try {
      const compSearch = await hsFetch("/crm/v3/objects/companies/search", token, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "domain", operator: "CONTAINS_TOKEN", value: domain }] }],
          properties: ["name", "domain", "industry", "numberofemployees", "annualrevenue", "city", "country"],
          limit: 1,
        }),
      });
      if (compSearch.results && compSearch.results.length > 0) {
        const p = compSearch.results[0].properties;
        companyInfo = {
          id: compSearch.results[0].id,
          name: p.name,
          domain: p.domain,
          industry: p.industry,
          employees: Number(p.numberofemployees) || 0,
          revenue: Number(p.annualrevenue) || 0,
          city: p.city,
          country: p.country,
        };
      }
    } catch { /* company not found */ }
  }

  // Step 2: Get won deals
  let wonData: any;
  try {
    wonData = await hsFetch("/crm/v3/objects/deals/search", token, {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
        properties: ["dealname", "amount", "closedate", "createdate"],
        limit: 100,
      }),
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch deals from HubSpot" }, { status: 500 });
  }

  const deals = wonData.results || [];
  if (deals.length < 3) {
    return NextResponse.json({ error: "Need at least 3 won deals to build ICP (found " + deals.length + ")" }, { status: 400 });
  }

  // Step 3: Analyze company patterns from won deals
  const industries: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const cities: Record<string, number> = {};
  const employeeCounts: number[] = [];
  const revenues: number[] = [];
  const dealAmounts: number[] = [];
  let companiesFound = 0;

  for (const deal of deals.slice(0, 50)) {
    dealAmounts.push(Number(deal.properties.amount) || 0);
    try {
      const assoc = await hsFetch("/crm/v4/objects/deals/" + deal.id + "/associations/companies", token);
      if (!assoc.results || !assoc.results[0]) continue;

      const comp = await hsFetch("/crm/v3/objects/companies/" + assoc.results[0].toObjectId + "?properties=name,industry,numberofemployees,annualrevenue,city,country,domain", token);
      const p = comp.properties;

      companiesFound++;
      if (p.industry) industries[p.industry] = (industries[p.industry] || 0) + 1;
      if (p.country) countries[p.country] = (countries[p.country] || 0) + 1;
      if (p.city) cities[p.city] = (cities[p.city] || 0) + 1;
      if (p.numberofemployees) employeeCounts.push(Number(p.numberofemployees));
      if (p.annualrevenue) revenues.push(Number(p.annualrevenue));
    } catch { /* skip */ }
  }

  const sortTop = (obj: Record<string, number>, n: number) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({
      name: k, count: v, percent: companiesFound > 0 ? Math.round((v / companiesFound) * 100) : 0,
    }));

  const median = (arr: number[]) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  };

  const icpData = {
    company: companyInfo,
    icp: {
      generatedAt: new Date().toISOString(),
      basedOn: { wonDeals: deals.length, companiesMatched: companiesFound },
      criteria: {
        industries: sortTop(industries, 5),
        countries: sortTop(countries, 5),
        cities: sortTop(cities, 5),
        employeeRange: {
          min: employeeCounts.length ? Math.min(...employeeCounts) : 0,
          max: employeeCounts.length ? Math.max(...employeeCounts) : 0,
          median: median(employeeCounts),
        },
        revenueRange: {
          min: revenues.length ? Math.min(...revenues) : 0,
          max: revenues.length ? Math.max(...revenues) : 0,
          median: median(revenues),
        },
        dealSize: {
          avg: dealAmounts.length ? Math.round(dealAmounts.reduce((a, b) => a + b, 0) / dealAmounts.length) : 0,
          median: median(dealAmounts),
          min: dealAmounts.length ? Math.min(...dealAmounts) : 0,
          max: dealAmounts.length ? Math.max(...dealAmounts) : 0,
        },
      },
      weights: { industry: 40, companySize: 30, revenue: 30 },
    },
  };

  // Save to tenant settings
  const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const currentSettings = (tenant?.settings as Record<string, any>) || {};
  await supabase.from("tenants").update({
    settings: { ...currentSettings, icp: icpData },
  }).eq("id", auth.tenantId);

  return NextResponse.json({ data: icpData });
}
