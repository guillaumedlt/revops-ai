import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

async function getLemlistKey(tenantId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", tenantId)
    .single();
  const settings = (data?.settings as any) ?? {};
  return settings?.connectors?.lemlist?.apiKey || null;
}

async function lemlistFetch(path: string, apiKey: string) {
  const res = await fetch(`https://api.lemlist.com/api${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Lemlist API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export const lemlistTools = {
  lemlist_get_campaigns: {
    connector: "lemlist",
    description: "Get all email campaigns/sequences from Lemlist with stats (sent, opened, clicked, replied).",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const key = await getLemlistKey(tenantId);
      if (!key) return { error: "Lemlist not connected" };
      const data = await lemlistFetch("/campaigns", key);
      return {
        campaigns: (data || []).map((c: any) => ({
          id: c._id,
          name: c.name,
          status: c.status,
          sentCount: c.sentCount || 0,
          openedCount: c.openedCount || 0,
          clickedCount: c.clickedCount || 0,
          repliedCount: c.repliedCount || 0,
          bouncedCount: c.bouncedCount || 0,
          openRate: c.sentCount ? Math.round((c.openedCount || 0) / c.sentCount * 1000) / 10 : 0,
          replyRate: c.sentCount ? Math.round((c.repliedCount || 0) / c.sentCount * 1000) / 10 : 0,
        })),
      };
    },
  },

  lemlist_get_campaign_stats: {
    connector: "lemlist",
    description: "Get detailed statistics for a specific Lemlist campaign.",
    parameters: z.object({
      campaign_id: z.string().describe("Lemlist campaign ID"),
    }),
    execute: async (args: any, tenantId: string) => {
      const key = await getLemlistKey(tenantId);
      if (!key) return { error: "Lemlist not connected" };
      const data = await lemlistFetch(`/campaigns/${args.campaign_id}`, key);
      return {
        id: data._id,
        name: data.name,
        status: data.status,
        stats: {
          sent: data.sentCount || 0,
          opened: data.openedCount || 0,
          clicked: data.clickedCount || 0,
          replied: data.repliedCount || 0,
          bounced: data.bouncedCount || 0,
          interested: data.interestedCount || 0,
          notInterested: data.notInterestedCount || 0,
        },
        steps: data.steps || [],
      };
    },
  },

  lemlist_get_leads: {
    connector: "lemlist",
    description: "Get leads from a specific Lemlist campaign. Returns email, first name, last name, status.",
    parameters: z.object({
      campaign_id: z.string().describe("Lemlist campaign ID"),
      limit: z.number().optional().describe("Max results (default 50)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const key = await getLemlistKey(tenantId);
      if (!key) return { error: "Lemlist not connected" };
      const limit = Math.min(args.limit || 50, 100);
      const data = await lemlistFetch(`/campaigns/${args.campaign_id}/leads?limit=${limit}`, key);
      return {
        leads: (data || []).map((l: any) => ({
          email: l.email,
          firstName: l.firstName,
          lastName: l.lastName,
          companyName: l.companyName,
          status: l.status,
          isInterested: l.isInterested,
        })),
        total: (data || []).length,
      };
    },
  },

  lemlist_search_lead: {
    connector: "lemlist",
    description: "Search for a specific lead across all Lemlist campaigns by email.",
    parameters: z.object({
      email: z.string().describe("Lead email to search"),
    }),
    execute: async (args: any, tenantId: string) => {
      const key = await getLemlistKey(tenantId);
      if (!key) return { error: "Lemlist not connected" };
      const data = await lemlistFetch(`/leads/${encodeURIComponent(args.email)}`, key);
      return data || { error: "Lead not found" };
    },
  },

  lemlist_get_team: {
    connector: "lemlist",
    description: "Get Lemlist team members and their sending stats.",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const key = await getLemlistKey(tenantId);
      if (!key) return { error: "Lemlist not connected" };
      const data = await lemlistFetch("/team", key);
      return { team: data || [] };
    },
  },
};
