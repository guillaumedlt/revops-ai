import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

// Helper to get HubSpot access token for a tenant
async function getHubSpotToken(tenantId: string): Promise<{ accessToken: string; portalId: string } | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("hubspot_connections")
    .select("access_token, portal_id, token_expires_at, refresh_token")
    .eq("tenant_id", tenantId)
    .single();
  
  if (!data) return null;
  
  // Check if token is expired (with 5min buffer)
  const expiresAt = new Date(data.token_expires_at).getTime();
  if (Date.now() > expiresAt - 5 * 60 * 1000) {
    // Refresh the token
    const refreshed = await refreshHubSpotToken(data.refresh_token, tenantId);
    if (refreshed) return refreshed;
    return null;
  }
  
  return { accessToken: data.access_token, portalId: data.portal_id };
}

async function refreshHubSpotToken(refreshToken: string, tenantId: string): Promise<{ accessToken: string; portalId: string } | null> {
  try {
    const res = await fetch("https://api.hubapi.com/oauth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.HUBSPOT_CLIENT_ID!,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
        refresh_token: refreshToken,
      }).toString(),
    });
    if (!res.ok) return null;
    const tokens = await res.json();
    
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("hubspot_connections")
      .update({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      })
      .eq("tenant_id", tenantId)
      .select("portal_id")
      .single();
    
    return data ? { accessToken: tokens.access_token, portalId: data.portal_id } : null;
  } catch {
    return null;
  }
}

// HubSpot API helper
async function hubspotFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HubSpot API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export const hubspotTools = {
  hubspot_search_deals: {
    connector: "hubspot",
    description: "Search and filter deals in HubSpot CRM. Returns deal name, stage, amount, owner, close date.",
    parameters: z.object({
      status: z.enum(["open", "won", "lost", "all"]).optional().describe("Filter by deal status"),
      owner_name: z.string().optional().describe("Filter by owner name (partial match)"),
      min_amount: z.number().optional().describe("Minimum deal amount"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const filters: any[] = [];
      if (args.status === "open") {
        filters.push({ propertyName: "hs_is_closed", operator: "EQ", value: "false" });
      } else if (args.status === "won") {
        filters.push({ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" });
      } else if (args.status === "lost") {
        filters.push({ propertyName: "hs_is_closed", operator: "EQ", value: "true" });
        filters.push({ propertyName: "hs_is_closed_won", operator: "EQ", value: "false" });
      }
      if (args.min_amount) {
        filters.push({ propertyName: "amount", operator: "GTE", value: String(args.min_amount) });
      }
      
      const body = {
        filterGroups: filters.length > 0 ? [{ filters }] : [],
        properties: ["dealname", "dealstage", "amount", "hubspot_owner_id", "closedate", "hs_is_closed", "hs_is_closed_won", "pipeline"],
        limit: Math.min(args.limit || 20, 100),
        sorts: [{ propertyName: "amount", direction: "DESCENDING" }],
      };
      
      const data = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify(body),
      });
      
      return {
        total: data.total,
        deals: (data.results || []).map((d: any) => ({
          id: d.id,
          name: d.properties.dealname,
          stage: d.properties.dealstage,
          amount: Number(d.properties.amount) || 0,
          ownerId: d.properties.hubspot_owner_id,
          closeDate: d.properties.closedate,
          isClosed: d.properties.hs_is_closed === "true",
          isWon: d.properties.hs_is_closed_won === "true",
        })),
      };
    },
  },

  hubspot_get_pipeline: {
    connector: "hubspot",
    description: "Get pipeline stages with deal counts and values. Shows the full sales pipeline breakdown.",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      // Get pipeline stages
      const pipelines = await hubspotFetch("/crm/v3/pipelines/deals", auth.accessToken);
      
      // Get open deals aggregated
      const dealsData = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "hs_is_closed", operator: "EQ", value: "false" }] }],
          properties: ["dealstage", "amount"],
          limit: 100,
        }),
      });
      
      // Aggregate by stage
      const byStage: Record<string, { count: number; value: number }> = {};
      let totalValue = 0;
      for (const deal of dealsData.results || []) {
        const stage = deal.properties.dealstage || "unknown";
        if (!byStage[stage]) byStage[stage] = { count: 0, value: 0 };
        byStage[stage].count++;
        const amt = Number(deal.properties.amount) || 0;
        byStage[stage].value += amt;
        totalValue += amt;
      }
      
      // Map stage IDs to labels
      const stageLabels: Record<string, string> = {};
      for (const p of pipelines.results || []) {
        for (const s of p.stages || []) {
          stageLabels[s.id] = s.label;
        }
      }
      
      const stages = Object.entries(byStage).map(([id, data]) => ({
        stageId: id,
        stageName: stageLabels[id] || id,
        dealCount: data.count,
        value: data.value,
      }));
      
      return { totalValue, totalDeals: dealsData.total, stages };
    },
  },

  hubspot_get_contacts: {
    connector: "hubspot",
    description: "Search contacts in HubSpot. Returns name, email, company, lifecycle stage.",
    parameters: z.object({
      query: z.string().optional().describe("Search by name or email"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const body: any = {
        properties: ["firstname", "lastname", "email", "company", "lifecyclestage", "hs_lead_status"],
        limit: Math.min(args.limit || 20, 100),
      };
      
      if (args.query) {
        body.query = args.query;
      }
      
      const data = await hubspotFetch("/crm/v3/objects/contacts/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify(body),
      });
      
      return {
        total: data.total,
        contacts: (data.results || []).map((c: any) => ({
          id: c.id,
          name: `${c.properties.firstname || ""} ${c.properties.lastname || ""}`.trim(),
          email: c.properties.email,
          company: c.properties.company,
          lifecycleStage: c.properties.lifecyclestage,
          leadStatus: c.properties.hs_lead_status,
        })),
      };
    },
  },

  hubspot_get_companies: {
    connector: "hubspot",
    description: "Search companies in HubSpot. Returns company name, domain, industry, revenue.",
    parameters: z.object({
      query: z.string().optional().describe("Search by company name or domain"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const body: any = {
        properties: ["name", "domain", "industry", "annualrevenue", "numberofemployees", "city", "country"],
        limit: Math.min(args.limit || 20, 100),
      };
      if (args.query) body.query = args.query;
      
      const data = await hubspotFetch("/crm/v3/objects/companies/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify(body),
      });
      
      return {
        total: data.total,
        companies: (data.results || []).map((c: any) => ({
          id: c.id,
          name: c.properties.name,
          domain: c.properties.domain,
          industry: c.properties.industry,
          revenue: Number(c.properties.annualrevenue) || 0,
          employees: Number(c.properties.numberofemployees) || 0,
          city: c.properties.city,
          country: c.properties.country,
        })),
      };
    },
  },

  hubspot_get_owners: {
    connector: "hubspot",
    description: "Get sales reps/owners from HubSpot. Returns name, email, and ID.",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const data = await hubspotFetch("/crm/v3/owners", auth.accessToken);
      
      return {
        owners: (data.results || []).map((o: any) => ({
          id: o.id,
          name: `${o.firstName || ""} ${o.lastName || ""}`.trim(),
          email: o.email,
        })),
      };
    },
  },

  hubspot_get_deal_details: {
    connector: "hubspot",
    description: "Get detailed information about a specific deal including associations.",
    parameters: z.object({
      deal_id: z.string().describe("HubSpot deal ID"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const data = await hubspotFetch(
        `/crm/v3/objects/deals/${args.deal_id}?properties=dealname,dealstage,amount,hubspot_owner_id,closedate,hs_is_closed,hs_is_closed_won,pipeline,description,notes_last_updated,hs_last_sales_activity_date`,
        auth.accessToken
      );
      
      return {
        id: data.id,
        name: data.properties.dealname,
        stage: data.properties.dealstage,
        amount: Number(data.properties.amount) || 0,
        ownerId: data.properties.hubspot_owner_id,
        closeDate: data.properties.closedate,
        isClosed: data.properties.hs_is_closed === "true",
        isWon: data.properties.hs_is_closed_won === "true",
        description: data.properties.description,
        lastActivity: data.properties.hs_last_sales_activity_date,
      };
    },
  },

  hubspot_analytics: {
    connector: "hubspot",
    description: "Compute sales analytics: win rate, average deal size, sales velocity, pipeline health. Use this for KPIs and metrics.",
    parameters: z.object({
      metric: z.enum(["win_rate", "velocity", "revenue", "activity", "all"]).describe("Which metric to compute"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const results: any = {};
      
      if (args.metric === "win_rate" || args.metric === "all") {
        // Get closed deals
        const closed = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: "hs_is_closed", operator: "EQ", value: "true" }] }],
            properties: ["hs_is_closed_won", "amount"],
            limit: 100,
          }),
        });
        const won = (closed.results || []).filter((d: any) => d.properties.hs_is_closed_won === "true");
        const total = closed.total || 0;
        results.winRate = {
          rate: total === 0 ? 0 : Math.round((won.length / Math.min(total, 100)) * 1000) / 10,
          wonCount: won.length,
          totalClosed: total,
          avgWonAmount: won.length === 0 ? 0 : Math.round(won.reduce((s: number, d: any) => s + (Number(d.properties.amount) || 0), 0) / won.length),
        };
      }
      
      if (args.metric === "velocity" || args.metric === "all") {
        const won = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
            properties: ["createdate", "closedate", "amount"],
            limit: 100,
          }),
        });
        const cycles = (won.results || [])
          .map((d: any) => {
            const created = new Date(d.properties.createdate).getTime();
            const closed = new Date(d.properties.closedate).getTime();
            return Math.round((closed - created) / (1000 * 60 * 60 * 24));
          })
          .filter((d: number) => d > 0 && d < 365)
          .sort((a: number, b: number) => a - b);
        
        results.velocity = {
          medianDays: cycles.length === 0 ? 0 : cycles[Math.floor(cycles.length / 2)],
          avgDays: cycles.length === 0 ? 0 : Math.round(cycles.reduce((s: number, v: number) => s + v, 0) / cycles.length),
          sampleSize: cycles.length,
        };
      }
      
      if (args.metric === "revenue" || args.metric === "all") {
        const won = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
            properties: ["amount", "closedate"],
            limit: 100,
          }),
        });
        const total = (won.results || []).reduce((s: number, d: any) => s + (Number(d.properties.amount) || 0), 0);
        results.revenue = { totalWonRevenue: total, dealCount: won.total };
      }
      
      if (args.metric === "activity" || args.metric === "all") {
        const open = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: "hs_is_closed", operator: "EQ", value: "false" }] }],
            properties: ["dealname", "hs_last_sales_activity_date", "amount"],
            limit: 100,
          }),
        });
        const now = Date.now();
        const fourteenDays = 14 * 24 * 60 * 60 * 1000;
        const unworked = (open.results || []).filter((d: any) => {
          const last = d.properties.hs_last_sales_activity_date;
          return !last || (now - new Date(last).getTime()) > fourteenDays;
        });
        results.activity = {
          totalOpen: open.total,
          unworkedCount: unworked.length,
          unworkedPercent: open.total ? Math.round((unworked.length / Math.min(open.total, 100)) * 100) : 0,
        };
      }
      
      return results;
    },
  },
};
