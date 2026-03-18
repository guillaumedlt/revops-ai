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
  const current = (tenant?.settings as Record<string, any>) || {};
  await supabase.from("tenants").update({ settings: { ...current, icp: body } }).eq("id", auth.tenantId);
  return NextResponse.json({ data: { saved: true } });
}

async function getToken(tenantId: string, supabase: any): Promise<string | null> {
  const { data: hs } = await supabase
    .from("hubspot_connections")
    .select("access_token, token_expires_at, refresh_token")
    .eq("tenant_id", tenantId)
    .single();

  if (!hs) return null;

  let token = hs.access_token;
  if (Date.now() > new Date(hs.token_expires_at).getTime() - 5 * 60 * 1000) {
    const res = await fetch("https://api.hubapi.com/oauth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.HUBSPOT_CLIENT_ID!,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
        refresh_token: hs.refresh_token,
      }).toString(),
    });
    if (!res.ok) return null;
    const tokens = await res.json();
    token = tokens.access_token;
    await supabase.from("hubspot_connections").update({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    }).eq("tenant_id", tenantId);
  }
  return token;
}

async function hsApi(path: string, token: string, opts?: RequestInit) {
  const r = await fetch("https://api.hubapi.com" + path, {
    ...opts,
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json", ...opts?.headers },
  });
  if (!r.ok) throw new Error("HS " + r.status + ": " + (await r.text().catch(() => "")).slice(0, 200));
  return r.json();
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const domain = body.domain || null;
  const supabase = createAdminClient();

  const token = await getToken(auth.tenantId, supabase);
  if (!token) return NextResponse.json({ error: "HubSpot not connected. Go to Settings > Connectors." }, { status: 400 });

  // 1. Lookup company by domain
  let company: any = null;
  if (domain) {
    try {
      const res = await hsApi("/crm/v3/objects/companies/search", token, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "domain", operator: "CONTAINS_TOKEN", value: domain }] }],
          properties: ["name", "domain", "industry", "numberofemployees", "annualrevenue", "city", "country", "description"],
          limit: 1,
        }),
      });
      if (res.results?.[0]) {
        const p = res.results[0].properties;
        company = {
          name: p.name || domain,
          domain: p.domain || domain,
          industry: p.industry,
          employees: Number(p.numberofemployees) || null,
          revenue: Number(p.annualrevenue) || null,
          city: p.city,
          country: p.country,
          description: p.description,
          favicon: "https://www.google.com/s2/favicons?domain=" + domain + "&sz=64",
        };
      }
    } catch (e) {
      console.error("[ICP] Company search error:", e);
    }

    if (!company) {
      company = {
        name: domain.replace(/\.\w+$/, "").charAt(0).toUpperCase() + domain.replace(/\.\w+$/, "").slice(1),
        domain: domain,
        favicon: "https://www.google.com/s2/favicons?domain=" + domain + "&sz=64",
      };
    }
  }

  // 2. Analyze won deals
  let wonDeals: any[] = [];
  try {
    const res = await hsApi("/crm/v3/objects/deals/search", token, {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
        properties: ["dealname", "amount", "closedate", "createdate"],
        limit: 100,
      }),
    });
    wonDeals = res.results || [];
  } catch (e) {
    console.error("[ICP] Deals error:", e);
    return NextResponse.json({ error: "Failed to fetch won deals from HubSpot" }, { status: 500 });
  }

  if (wonDeals.length < 1) {
    return NextResponse.json({ error: "No won deals found in HubSpot" }, { status: 400 });
  }

  // 3. Get companies from won deals
  const industries: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const cities: Record<string, number> = {};
  const sizes: number[] = [];
  const revs: number[] = [];
  const amounts: number[] = [];
  const clients: Array<{ name: string; domain: string; industry: string; amount: number; favicon: string }> = [];
  let matched = 0;

  for (const deal of wonDeals.slice(0, 50)) {
    amounts.push(Number(deal.properties.amount) || 0);
    try {
      const assoc = await hsApi("/crm/v4/objects/deals/" + deal.id + "/associations/companies", token);
      if (!assoc.results?.[0]) continue;
      const comp = await hsApi("/crm/v3/objects/companies/" + assoc.results[0].toObjectId + "?properties=name,industry,numberofemployees,annualrevenue,city,country,domain", token);
      const p = comp.properties;
      matched++;

      if (p.industry) industries[p.industry] = (industries[p.industry] || 0) + 1;
      if (p.country) countries[p.country] = (countries[p.country] || 0) + 1;
      if (p.city) cities[p.city] = (cities[p.city] || 0) + 1;
      if (p.numberofemployees) sizes.push(Number(p.numberofemployees));
      if (p.annualrevenue) revs.push(Number(p.annualrevenue));

      if (clients.length < 8 && p.name) {
        clients.push({
          name: p.name,
          domain: p.domain || "",
          industry: p.industry || "",
          amount: Number(deal.properties.amount) || 0,
          favicon: p.domain ? "https://www.google.com/s2/favicons?domain=" + p.domain + "&sz=32" : "",
        });
      }
    } catch { /* skip */ }
  }

  const top = (obj: Record<string, number>, n: number) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({
      name: k, count: v, percent: matched > 0 ? Math.round((v / matched) * 100) : 0,
    }));

  const med = (a: number[]) => {
    if (!a.length) return 0;
    const s = [...a].sort((x, y) => x - y);
    return s[Math.floor(s.length / 2)];
  };

  const icpData = {
    company,
    clients,
    icp: {
      generatedAt: new Date().toISOString(),
      basedOn: { wonDeals: wonDeals.length, companiesMatched: matched },
      criteria: {
        industries: top(industries, 5),
        countries: top(countries, 5),
        cities: top(cities, 5),
        employeeRange: { min: sizes.length ? Math.min(...sizes) : 0, max: sizes.length ? Math.max(...sizes) : 0, median: med(sizes) },
        revenueRange: { min: revs.length ? Math.min(...revs) : 0, max: revs.length ? Math.max(...revs) : 0, median: med(revs) },
        dealSize: {
          avg: amounts.length ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length) : 0,
          median: med(amounts),
          min: amounts.length ? Math.min(...amounts) : 0,
          max: amounts.length ? Math.max(...amounts) : 0,
        },
      },
      weights: { industry: 40, companySize: 30, revenue: 30 },
    },
  };

  // Save
  const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const current = (tenant?.settings as Record<string, any>) || {};
  await supabase.from("tenants").update({ settings: { ...current, icp: icpData } }).eq("id", auth.tenantId);

  return NextResponse.json({ data: icpData });
}
