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
  hubspot_get_tickets: {
    connector: "hubspot",
    description: "Get support tickets from HubSpot. Returns subject, status, priority, pipeline, owner.",
    parameters: z.object({
      status: z.string().optional().describe("Filter by status (e.g. open, closed)"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const filters: any[] = [];
      if (args.status) {
        filters.push({ propertyName: "hs_pipeline_stage", operator: "EQ", value: args.status });
      }
      
      const data = await hubspotFetch("/crm/v3/objects/tickets/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: filters.length > 0 ? [{ filters }] : [],
          properties: ["subject", "content", "hs_pipeline_stage", "hs_ticket_priority", "hubspot_owner_id", "createdate", "hs_lastmodifieddate"],
          limit: Math.min(args.limit || 20, 100),
          sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
        }),
      });
      
      return {
        total: data.total,
        tickets: (data.results || []).map((t: any) => ({
          id: t.id,
          subject: t.properties.subject,
          status: t.properties.hs_pipeline_stage,
          priority: t.properties.hs_ticket_priority,
          ownerId: t.properties.hubspot_owner_id,
          created: t.properties.createdate,
          lastModified: t.properties.hs_lastmodifieddate,
        })),
      };
    },
  },

  hubspot_get_engagements: {
    connector: "hubspot",
    description: "Get recent sales activities (emails, calls, meetings, notes) for a deal or contact.",
    parameters: z.object({
      object_type: z.enum(["deals", "contacts"]).describe("Object type to get engagements for"),
      object_id: z.string().describe("HubSpot object ID"),
      limit: z.number().optional().describe("Max results (default 10)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      try {
        const data = await hubspotFetch(
          "/crm/v3/objects/${args.object_type}/" + args.object_id + "/associations/engagements",
          auth.accessToken
        );
        
        const engagementIds = (data.results || []).slice(0, args.limit || 10).map((r: any) => r.toObjectId || r.id);
        
        if (engagementIds.length === 0) return { engagements: [], total: 0 };
        
        const engagements = [];
        for (const eid of engagementIds) {
          try {
            const eng = await hubspotFetch("/engagements/v1/engagements/" + eid, auth.accessToken);
            engagements.push({
              id: eid,
              type: eng.engagement?.type,
              timestamp: eng.engagement?.timestamp,
              subject: eng.metadata?.subject || eng.metadata?.title || "",
              body: (eng.metadata?.text || eng.metadata?.body || "").slice(0, 200),
            });
          } catch { /* skip individual failures */ }
        }
        
        return { engagements, total: engagements.length };
      } catch {
        return { engagements: [], total: 0, note: "Engagements API not available" };
      }
    },
  },

  hubspot_get_line_items: {
    connector: "hubspot",
    description: "Get line items (products) associated with a deal. Shows what products/services are in a deal.",
    parameters: z.object({
      deal_id: z.string().describe("HubSpot deal ID"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      try {
        const assoc = await hubspotFetch(
          "/crm/v3/objects/deals/" + args.deal_id + "/associations/line_items",
          auth.accessToken
        );
        
        const lineItemIds = (assoc.results || []).map((r: any) => r.toObjectId || r.id);
        if (lineItemIds.length === 0) return { lineItems: [], total: 0 };
        
        const items = [];
        for (const lid of lineItemIds) {
          try {
            const li = await hubspotFetch(
              "/crm/v3/objects/line_items/" + lid + "?properties=name,quantity,price,amount,hs_product_id",
              auth.accessToken
            );
            items.push({
              id: li.id,
              name: li.properties.name,
              quantity: Number(li.properties.quantity) || 1,
              price: Number(li.properties.price) || 0,
              amount: Number(li.properties.amount) || 0,
            });
          } catch { /* skip */ }
        }
        
        return { lineItems: items, total: items.length };
      } catch {
        return { lineItems: [], total: 0 };
      }
    },
  },

  hubspot_get_forms: {
    connector: "hubspot",
    description: "Get HubSpot forms with submission counts. Shows lead generation performance.",
    parameters: z.object({
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      try {
        const data = await hubspotFetch("/marketing/v3/forms?limit=" + (args.limit || 20), auth.accessToken);
        return {
          forms: (data.results || []).map((f: any) => ({
            id: f.id,
            name: f.name,
            type: f.formType,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
            submissions: f.submissions || 0,
          })),
          total: data.total || (data.results || []).length,
        };
      } catch {
        return { forms: [], total: 0, note: "Forms API not available" };
      }
    },
  },

  hubspot_search_all: {
    connector: "hubspot",
    description: "Search across all HubSpot objects (deals, contacts, companies, tickets) by keyword. Use this for general search.",
    parameters: z.object({
      query: z.string().describe("Search keyword"),
      object_type: z.enum(["deals", "contacts", "companies", "tickets"]).optional().describe("Limit search to specific type"),
      limit: z.number().optional().describe("Max results (default 10)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };
      
      const types = args.object_type ? [args.object_type] : ["deals", "contacts", "companies"];
      const results: any = {};
      const limit = Math.min(args.limit || 10, 20);
      
      for (const type of types) {
        try {
          const propMap: Record<string, string[]> = {
            deals: ["dealname", "dealstage", "amount", "hubspot_owner_id"],
            contacts: ["firstname", "lastname", "email", "company"],
            companies: ["name", "domain", "industry"],
            tickets: ["subject", "hs_pipeline_stage", "hs_ticket_priority"],
          };
          
          const data = await hubspotFetch("/crm/v3/objects/" + type + "/search", auth.accessToken, {
            method: "POST",
            body: JSON.stringify({
              query: args.query,
              properties: propMap[type] || [],
              limit: limit,
            }),
          });
          
          results[type] = {
            total: data.total,
            items: (data.results || []).map((r: any) => ({ id: r.id, ...r.properties })),
          };
        } catch { /* skip failed types */ }
      }
      
      return results;
    },
  },
  hubspot_build_icp: {
    connector: "hubspot",
    description: "Build an Ideal Customer Profile (ICP) by analyzing won deals. Returns the typical company profile that converts: industry, size, revenue range, location patterns, average deal size, and common traits.",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      // Check if there's a saved ICP in tenant settings
      const supabaseIcp = createAdminClient();
      const { data: tenantData } = await supabaseIcp.from("tenants").select("settings").eq("id", tenantId).single();
      const savedIcp = ((tenantData?.settings as any)?.icp) || null;

      if (savedIcp) {
        return { ...savedIcp, source: "saved", note: "Using saved ICP from dashboard. Visit /dashboards/icp to regenerate." };
      }

      // Get won deals with company associations
      const wonDeals = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
          properties: ["dealname", "amount", "dealstage", "closedate", "hubspot_owner_id"],
          limit: 100,
        }),
      });

      if (!wonDeals.results || wonDeals.results.length < 3) {
        return { error: "Not enough won deals to build ICP (need at least 3)", wonDealsCount: wonDeals.total || 0 };
      }

      // Get associated companies for won deals
      const companyData: any[] = [];
      const dealAmounts: number[] = [];
      const cycleDays: number[] = [];

      for (const deal of wonDeals.results.slice(0, 50)) {
        dealAmounts.push(Number(deal.properties.amount) || 0);
        
        try {
          const assoc = await hubspotFetch("/crm/v4/objects/deals/" + deal.id + "/associations/companies", auth.accessToken);
          if (assoc.results && assoc.results.length > 0) {
            const compId = assoc.results[0].toObjectId;
            const comp = await hubspotFetch("/crm/v3/objects/companies/" + compId + "?properties=name,industry,numberofemployees,annualrevenue,city,country,domain", auth.accessToken);
            companyData.push(comp.properties);
          }
        } catch { /* skip */ }
      }

      // Analyze patterns
      const industries: Record<string, number> = {};
      const countries: Record<string, number> = {};
      const cities: Record<string, number> = {};
      const employeeRanges: number[] = [];
      const revenueRanges: number[] = [];

      for (const comp of companyData) {
        if (comp.industry) industries[comp.industry] = (industries[comp.industry] || 0) + 1;
        if (comp.country) countries[comp.country] = (countries[comp.country] || 0) + 1;
        if (comp.city) cities[comp.city] = (cities[comp.city] || 0) + 1;
        if (comp.numberofemployees) employeeRanges.push(Number(comp.numberofemployees));
        if (comp.annualrevenue) revenueRanges.push(Number(comp.annualrevenue));
      }

      const sortByCount = (obj: Record<string, number>) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const median = (arr: number[]) => { const s = arr.sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
      const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

      return {
        wonDealsAnalyzed: wonDeals.results.length,
        companiesMatched: companyData.length,
        icp: {
          topIndustries: sortByCount(industries),
          topCountries: sortByCount(countries),
          topCities: sortByCount(cities),
          employeeRange: { median: median(employeeRanges), min: Math.min(...employeeRanges), max: Math.max(...employeeRanges) },
          revenueRange: { median: median(revenueRanges), avg: avg(revenueRanges) },
          dealSize: { avg: avg(dealAmounts), median: median(dealAmounts), min: Math.min(...dealAmounts), max: Math.max(...dealAmounts) },
        },
      };
    },
  },

  hubspot_score_company: {
    connector: "hubspot",
    description: "Score a company or contact against the Ideal Customer Profile (ICP). Returns a 0-100 ICP fit score with breakdown of matching/non-matching criteria.",
    parameters: z.object({
      company_id: z.string().optional().describe("HubSpot company ID to score"),
      contact_email: z.string().optional().describe("Contact email to find and score their company"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      // Check for saved ICP first
      const supabaseScore = createAdminClient();
      const { data: tenantDataScore } = await supabaseScore.from("tenants").select("settings").eq("id", tenantId).single();
      const savedIcpData = ((tenantDataScore?.settings as any)?.icp) || null;

      let icpIndustries: Record<string, number> = {};
      let icpEmployees: number[] = [];
      let icpRevenues: number[] = [];
      let icpCount = 0;

      if (savedIcpData && savedIcpData.criteria) {
        // Use saved ICP criteria
        for (const ind of (savedIcpData.criteria.industries || [])) {
          icpIndustries[ind.name] = ind.count;
        }
        icpCount = savedIcpData.basedOn?.companiesMatched || 1;
        // Create synthetic arrays from saved ranges for scoring
        const empMedian = savedIcpData.criteria.employeeRange?.median || 0;
        if (empMedian > 0) icpEmployees = [empMedian];
        const revMedian = savedIcpData.criteria.revenueRange?.median || 0;
        if (revMedian > 0) icpRevenues = [revMedian];
      } else {
        // Fall back to computing from HubSpot won deals
      const wonDeals = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
          properties: ["amount"],
          limit: 100,
        }),
      });

      // Populate ICP company data from HubSpot




      for (const deal of (wonDeals.results || []).slice(0, 30)) {
        try {
          const assoc = await hubspotFetch("/crm/v4/objects/deals/" + deal.id + "/associations/companies", auth.accessToken);
          if (assoc.results?.[0]) {
            const comp = await hubspotFetch("/crm/v3/objects/companies/" + assoc.results[0].toObjectId + "?properties=industry,numberofemployees,annualrevenue", auth.accessToken);
            if (comp.properties.industry) icpIndustries[comp.properties.industry] = (icpIndustries[comp.properties.industry] || 0) + 1;
            if (comp.properties.numberofemployees) icpEmployees.push(Number(comp.properties.numberofemployees));
            if (comp.properties.annualrevenue) icpRevenues.push(Number(comp.properties.annualrevenue));
            icpCount++;
          }
        } catch { /* skip */ }
      }

      if (icpCount < 3) return { error: "Not enough data to build ICP for scoring. Go to Dashboards > ICP to generate one." };
      } // end else (fallback inline ICP build)

      // Use saved weights if available
      const icpWeights = savedIcpData?.weights || { industry: 40, companySize: 30, revenue: 30 };

      // Get the target company
      let targetComp: any = null;
      if (args.company_id) {
        targetComp = await hubspotFetch("/crm/v3/objects/companies/" + args.company_id + "?properties=name,industry,numberofemployees,annualrevenue,domain,city,country", auth.accessToken);
      } else if (args.contact_email) {
        const contact = await hubspotFetch("/crm/v3/objects/contacts/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: args.contact_email }] }], properties: ["company", "associatedcompanyid"] }),
        });
        if (contact.results?.[0]) {
          try {
            const assoc = await hubspotFetch("/crm/v4/objects/contacts/" + contact.results[0].id + "/associations/companies", auth.accessToken);
            if (assoc.results?.[0]) {
              targetComp = await hubspotFetch("/crm/v3/objects/companies/" + assoc.results[0].toObjectId + "?properties=name,industry,numberofemployees,annualrevenue,domain,city,country", auth.accessToken);
            }
          } catch { /* no company */ }
        }
      }

      if (!targetComp) return { error: "Company not found" };

      // Score against ICP
      let score = 0;
      const breakdown: any[] = [];
      const topIndustry = Object.entries(icpIndustries).sort((a, b) => b[1] - a[1])[0]?.[0];
      const medianEmp = icpEmployees.sort((a, b) => a - b)[Math.floor(icpEmployees.length / 2)] || 0;
      const medianRev = icpRevenues.sort((a, b) => a - b)[Math.floor(icpRevenues.length / 2)] || 0;

      // Industry match (weighted by ICP)
      if (targetComp.properties.industry && icpIndustries[targetComp.properties.industry]) {
        const matchRate = icpIndustries[targetComp.properties.industry] / icpCount;
        const pts = Math.round(matchRate * icpWeights.industry);
        score += pts;
        breakdown.push({ criteria: "Industry", value: targetComp.properties.industry, score: pts, max: icpWeights.industry, match: true });
      } else {
        breakdown.push({ criteria: "Industry", value: targetComp.properties.industry || "Unknown", score: 0, max: icpWeights.industry, match: false });
      }

      // Company size match (weighted by ICP)
      const empCount = Number(targetComp.properties.numberofemployees) || 0;
      if (empCount > 0 && medianEmp > 0) {
        const ratio = empCount / medianEmp;
        const pts = ratio >= 0.3 && ratio <= 3 ? Math.round(icpWeights.companySize * (1 - Math.abs(1 - ratio) * 0.5)) : 5;
        score += Math.max(0, Math.min(icpWeights.companySize, pts));
        breakdown.push({ criteria: "Company size", value: empCount + " employees", score: Math.max(0, Math.min(icpWeights.companySize, pts)), max: icpWeights.companySize, match: ratio >= 0.5 && ratio <= 2 });
      } else {
        breakdown.push({ criteria: "Company size", value: "Unknown", score: 0, max: 30, match: false });
      }

      // Revenue match (weighted by ICP)
      const rev = Number(targetComp.properties.annualrevenue) || 0;
      if (rev > 0 && medianRev > 0) {
        const ratio = rev / medianRev;
        const pts = ratio >= 0.3 && ratio <= 3 ? Math.round(icpWeights.revenue * (1 - Math.abs(1 - ratio) * 0.5)) : 5;
        score += Math.max(0, Math.min(icpWeights.revenue, pts));
        breakdown.push({ criteria: "Revenue", value: rev + " EUR", score: Math.max(0, Math.min(icpWeights.revenue, pts)), max: icpWeights.revenue, match: ratio >= 0.5 && ratio <= 2 });
      } else {
        breakdown.push({ criteria: "Revenue", value: "Unknown", score: 0, max: 30, match: false });
      }

      return {
        company: targetComp.properties.name,
        icpScore: Math.min(100, score),
        grade: score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D",
        breakdown,
        icpBasedOn: icpCount + " won deals",
      };
    },
  },

  hubspot_deal_health: {
    connector: "hubspot",
    description: "Calculate a health score (0-100) for open deals. Identifies at-risk deals based on: days without activity, time stuck in stage, missing data, and deal amount vs average. Returns scored deals sorted by risk.",
    parameters: z.object({
      owner_id: z.string().optional().describe("Filter by owner ID"),
      min_amount: z.number().optional().describe("Minimum deal amount to include"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      const filters: any[] = [{ propertyName: "hs_is_closed", operator: "EQ", value: "false" }];
      if (args.owner_id) filters.push({ propertyName: "hubspot_owner_id", operator: "EQ", value: args.owner_id });
      if (args.min_amount) filters.push({ propertyName: "amount", operator: "GTE", value: String(args.min_amount) });

      const data = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters }],
          properties: ["dealname", "dealstage", "amount", "hubspot_owner_id", "closedate", "hs_last_sales_activity_date", "hs_date_entered_" + "currentstage", "createdate", "notes_last_updated"],
          limit: 100,
          sorts: [{ propertyName: "amount", direction: "DESCENDING" }],
        }),
      });

      const now = Date.now();
      const DAY = 86400000;

      const scoredDeals = (data.results || []).map((d: any) => {
        const p = d.properties;
        let health = 100;
        const risks: string[] = [];

        // Activity check (-30 pts max)
        const lastActivity = p.hs_last_sales_activity_date ? new Date(p.hs_last_sales_activity_date).getTime() : 0;
        const daysSinceActivity = lastActivity ? Math.floor((now - lastActivity) / DAY) : 999;
        if (daysSinceActivity > 30) { health -= 30; risks.push("No activity in " + daysSinceActivity + " days"); }
        else if (daysSinceActivity > 14) { health -= 15; risks.push("No activity in " + daysSinceActivity + " days"); }
        else if (daysSinceActivity > 7) { health -= 5; }

        // Close date check (-25 pts max)
        if (p.closedate) {
          const closeDate = new Date(p.closedate).getTime();
          if (closeDate < now) { health -= 25; risks.push("Close date passed"); }
          else if (closeDate - now < 7 * DAY) { health -= 10; risks.push("Closing in < 7 days"); }
        } else {
          health -= 10; risks.push("No close date set");
        }

        // Amount check (-15 pts)
        if (!p.amount || Number(p.amount) === 0) { health -= 15; risks.push("No amount set"); }

        // Age check (-20 pts max)
        const created = p.createdate ? new Date(p.createdate).getTime() : now;
        const ageInDays = Math.floor((now - created) / DAY);
        if (ageInDays > 90) { health -= 20; risks.push("Open for " + ageInDays + " days"); }
        else if (ageInDays > 60) { health -= 10; risks.push("Open for " + ageInDays + " days"); }

        // Notes check (-10 pts)
        if (!p.notes_last_updated) { health -= 10; risks.push("No notes"); }

        return {
          id: d.id,
          name: p.dealname,
          stage: p.dealstage,
          amount: Number(p.amount) || 0,
          ownerId: p.hubspot_owner_id,
          healthScore: Math.max(0, health),
          grade: health >= 80 ? "Healthy" : health >= 50 ? "At Risk" : "Critical",
          risks,
          daysSinceActivity,
          ageInDays,
        };
      });

      // Sort by health (worst first)
      scoredDeals.sort((a: any, b: any) => a.healthScore - b.healthScore);

      const criticalCount = scoredDeals.filter((d: any) => d.grade === "Critical").length;
      const atRiskCount = scoredDeals.filter((d: any) => d.grade === "At Risk").length;
      const healthyCount = scoredDeals.filter((d: any) => d.grade === "Healthy").length;
      const avgHealth = scoredDeals.length ? Math.round(scoredDeals.reduce((s: number, d: any) => s + d.healthScore, 0) / scoredDeals.length) : 0;

      return {
        summary: { total: scoredDeals.length, critical: criticalCount, atRisk: atRiskCount, healthy: healthyCount, avgHealth },
        deals: scoredDeals,
      };
    },
  },
  // === WRITE ACTIONS ===

  hubspot_update_deal: {
    connector: "hubspot",
    description: "Update a deal in HubSpot. Can change stage, amount, close date, owner, or any property. Use this when user asks to move a deal, update a value, etc.",
    parameters: z.object({
      deal_id: z.string().describe("HubSpot deal ID"),
      properties: z.object({
        dealstage: z.string().optional().describe("New stage ID"),
        amount: z.string().optional().describe("New amount"),
        closedate: z.string().optional().describe("New close date (YYYY-MM-DD)"),
        hubspot_owner_id: z.string().optional().describe("New owner ID"),
      }).describe("Properties to update"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      const res = await hubspotFetch("/crm/v3/objects/deals/" + args.deal_id, auth.accessToken, {
        method: "PATCH",
        body: JSON.stringify({ properties: args.properties }),
      });

      return { success: true, dealId: args.deal_id, updated: Object.keys(args.properties) };
    },
  },

  hubspot_create_task: {
    connector: "hubspot",
    description: "Create a task in HubSpot for a sales rep. Can be associated with a deal or contact. Use when user asks to create a reminder, follow-up, or action item.",
    parameters: z.object({
      title: z.string().describe("Task title"),
      body: z.string().optional().describe("Task description/notes"),
      due_date: z.string().optional().describe("Due date (YYYY-MM-DD). Defaults to tomorrow."),
      owner_id: z.string().optional().describe("Assign to this owner ID"),
      deal_id: z.string().optional().describe("Associate with this deal"),
      contact_id: z.string().optional().describe("Associate with this contact"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      const dueDate = args.due_date || tomorrow;

      const task = await hubspotFetch("/crm/v3/objects/tasks", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          properties: {
            hs_task_subject: args.title,
            hs_task_body: args.body || "",
            hs_task_status: "NOT_STARTED",
            hs_task_priority: "MEDIUM",
            hs_timestamp: new Date(dueDate).toISOString(),
            hubspot_owner_id: args.owner_id || "",
          },
        }),
      });

      // Associate with deal or contact
      if (args.deal_id && task.id) {
        try {
          await hubspotFetch("/crm/v4/objects/tasks/" + task.id + "/associations/deals/" + args.deal_id + "/task_to_deal", auth.accessToken, { method: "PUT" });
        } catch {}
      }
      if (args.contact_id && task.id) {
        try {
          await hubspotFetch("/crm/v4/objects/tasks/" + task.id + "/associations/contacts/" + args.contact_id + "/task_to_contact", auth.accessToken, { method: "PUT" });
        } catch {}
      }

      return { success: true, taskId: task.id, title: args.title, dueDate: dueDate };
    },
  },

  hubspot_create_note: {
    connector: "hubspot",
    description: "Create a note on a deal or contact in HubSpot. Use when user wants to log information about an interaction or observation.",
    parameters: z.object({
      body: z.string().describe("Note content"),
      deal_id: z.string().optional().describe("Associate with this deal"),
      contact_id: z.string().optional().describe("Associate with this contact"),
      owner_id: z.string().optional().describe("Note owner ID"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      const note = await hubspotFetch("/crm/v3/objects/notes", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          properties: {
            hs_note_body: args.body,
            hs_timestamp: new Date().toISOString(),
            hubspot_owner_id: args.owner_id || "",
          },
        }),
      });

      if (args.deal_id && note.id) {
        try { await hubspotFetch("/crm/v4/objects/notes/" + note.id + "/associations/deals/" + args.deal_id + "/note_to_deal", auth.accessToken, { method: "PUT" }); } catch {}
      }
      if (args.contact_id && note.id) {
        try { await hubspotFetch("/crm/v4/objects/notes/" + note.id + "/associations/contacts/" + args.contact_id + "/note_to_contact", auth.accessToken, { method: "PUT" }); } catch {}
      }

      return { success: true, noteId: note.id };
    },
  },

  // === INTELLIGENCE ===

  hubspot_meeting_prep: {
    connector: "hubspot",
    description: "Prepare a meeting brief for a deal or company. Returns deal history, recent activity, contacts involved, risks, and talking points. Use when user says 'prep my meeting' or 'brief me on X'.",
    parameters: z.object({
      deal_id: z.string().optional().describe("Deal ID to prep for"),
      company_name: z.string().optional().describe("Company name to search and prep for"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      let dealId = args.deal_id;
      let dealData: any = null;
      let companyData: any = null;
      let contacts: any[] = [];

      // Find deal by company name if no deal_id
      if (!dealId && args.company_name) {
        const search = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
          method: "POST",
          body: JSON.stringify({ query: args.company_name, properties: ["dealname", "amount", "dealstage", "closedate", "hubspot_owner_id", "hs_last_sales_activity_date", "createdate"], limit: 1 }),
        });
        if (search.results?.[0]) {
          dealId = search.results[0].id;
          dealData = search.results[0].properties;
        }
      }

      if (dealId && !dealData) {
        const d = await hubspotFetch("/crm/v3/objects/deals/" + dealId + "?properties=dealname,amount,dealstage,closedate,hubspot_owner_id,hs_last_sales_activity_date,createdate,description,notes_last_updated", auth.accessToken);
        dealData = d.properties;
      }

      if (!dealData) return { error: "Deal not found" };

      // Get associated company
      try {
        const assoc = await hubspotFetch("/crm/v4/objects/deals/" + dealId + "/associations/companies", auth.accessToken);
        if (assoc.results?.[0]) {
          const comp = await hubspotFetch("/crm/v3/objects/companies/" + assoc.results[0].toObjectId + "?properties=name,domain,industry,numberofemployees,annualrevenue,city,country", auth.accessToken);
          companyData = comp.properties;
        }
      } catch {}

      // Get associated contacts
      try {
        const assoc = await hubspotFetch("/crm/v4/objects/deals/" + dealId + "/associations/contacts", auth.accessToken);
        for (const a of (assoc.results || []).slice(0, 5)) {
          try {
            const c = await hubspotFetch("/crm/v3/objects/contacts/" + a.toObjectId + "?properties=firstname,lastname,email,jobtitle,phone", auth.accessToken);
            contacts.push(c.properties);
          } catch {}
        }
      } catch {}

      // Calculate deal age and days since activity
      const now = Date.now();
      const DAY = 86400000;
      const created = dealData.createdate ? new Date(dealData.createdate).getTime() : now;
      const lastActivity = dealData.hs_last_sales_activity_date ? new Date(dealData.hs_last_sales_activity_date).getTime() : 0;

      return {
        deal: {
          id: dealId,
          name: dealData.dealname,
          amount: Number(dealData.amount) || 0,
          stage: dealData.dealstage,
          closeDate: dealData.closedate,
          owner: dealData.hubspot_owner_id,
          ageInDays: Math.floor((now - created) / DAY),
          daysSinceActivity: lastActivity ? Math.floor((now - lastActivity) / DAY) : null,
          description: dealData.description,
        },
        company: companyData ? {
          name: companyData.name,
          domain: companyData.domain,
          industry: companyData.industry,
          employees: Number(companyData.numberofemployees) || 0,
          revenue: Number(companyData.annualrevenue) || 0,
          location: [companyData.city, companyData.country].filter(Boolean).join(", "),
        } : null,
        contacts: contacts.map(function(c: any) { return { name: (c.firstname || "") + " " + (c.lastname || ""), email: c.email, title: c.jobtitle, phone: c.phone }; }),
      };
    },
  },

  hubspot_win_loss_analysis: {
    connector: "hubspot",
    description: "Analyze patterns in won vs lost deals. Compares deal size, cycle time, industries, stages where deals are lost, and identifies what makes deals successful. Use for 'why do we lose deals' or 'win/loss analysis'.",
    parameters: z.object({
      period_days: z.number().optional().describe("Look back period in days (default 180)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const auth = await getHubSpotToken(tenantId);
      if (!auth) return { error: "HubSpot not connected" };

      // Get won deals
      const won = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: "hs_is_closed_won", operator: "EQ", value: "true" }] }],
          properties: ["dealname", "amount", "dealstage", "closedate", "createdate", "hubspot_owner_id"],
          limit: 100,
        }),
      });

      // Get lost deals
      const lost = await hubspotFetch("/crm/v3/objects/deals/search", auth.accessToken, {
        method: "POST",
        body: JSON.stringify({
          filterGroups: [{ filters: [
            { propertyName: "hs_is_closed", operator: "EQ", value: "true" },
            { propertyName: "hs_is_closed_won", operator: "EQ", value: "false" },
          ] }],
          properties: ["dealname", "amount", "dealstage", "closedate", "createdate", "hubspot_owner_id"],
          limit: 100,
        }),
      });

      const wonDeals = won.results || [];
      const lostDeals = lost.results || [];

      const calcStats = function(deals: any[]) {
        const amounts = deals.map(function(d: any) { return Number(d.properties.amount) || 0; }).filter(function(a: number) { return a > 0; });
        const cycles = deals.map(function(d: any) {
          const c = new Date(d.properties.closedate).getTime();
          const s = new Date(d.properties.createdate).getTime();
          return Math.floor((c - s) / 86400000);
        }).filter(function(d: number) { return d > 0 && d < 365; });

        return {
          count: deals.length,
          avgAmount: amounts.length ? Math.round(amounts.reduce(function(a: number, b: number) { return a + b; }, 0) / amounts.length) : 0,
          medianAmount: amounts.length ? amounts.sort(function(a: number, b: number) { return a - b; })[Math.floor(amounts.length / 2)] : 0,
          totalAmount: amounts.reduce(function(a: number, b: number) { return a + b; }, 0),
          avgCycleDays: cycles.length ? Math.round(cycles.reduce(function(a: number, b: number) { return a + b; }, 0) / cycles.length) : 0,
          medianCycleDays: cycles.length ? cycles.sort(function(a: number, b: number) { return a - b; })[Math.floor(cycles.length / 2)] : 0,
        };
      };

      const wonStats = calcStats(wonDeals);
      const lostStats = calcStats(lostDeals);

      // Analyze stages where deals are lost
      const lostByStage: Record<string, number> = {};
      for (const d of lostDeals) {
        const stage = d.properties.dealstage || "unknown";
        lostByStage[stage] = (lostByStage[stage] || 0) + 1;
      }
      const topLossStages = Object.entries(lostByStage).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5).map(function(e) { return { stage: e[0], count: e[1] }; });

      // Win rate by owner
      const ownerWins: Record<string, { won: number; lost: number }> = {};
      for (const d of wonDeals) {
        const o = d.properties.hubspot_owner_id || "unassigned";
        if (!ownerWins[o]) ownerWins[o] = { won: 0, lost: 0 };
        ownerWins[o].won++;
      }
      for (const d of lostDeals) {
        const o = d.properties.hubspot_owner_id || "unassigned";
        if (!ownerWins[o]) ownerWins[o] = { won: 0, lost: 0 };
        ownerWins[o].lost++;
      }
      const ownerPerf = Object.entries(ownerWins).map(function(e) {
        const total = e[1].won + e[1].lost;
        return { ownerId: e[0], won: e[1].won, lost: e[1].lost, winRate: total > 0 ? Math.round((e[1].won / total) * 100) : 0 };
      }).sort(function(a, b) { return b.winRate - a.winRate; });

      return {
        summary: {
          winRate: (wonDeals.length + lostDeals.length) > 0 ? Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 1000) / 10 : 0,
          totalWon: wonStats.count,
          totalLost: lostStats.count,
        },
        won: wonStats,
        lost: lostStats,
        insights: {
          avgDealSizeDiff: wonStats.avgAmount - lostStats.avgAmount,
          cycleDiff: wonStats.avgCycleDays - lostStats.avgCycleDays,
          topLossStages: topLossStages,
        },
        ownerPerformance: ownerPerf,
      };
    },
  },
};
