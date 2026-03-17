import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

export const aiTools = {
  get_pipeline: {
    description: "Recupere la valeur du pipeline, nombre de deals, et breakdown par stage",
    parameters: z.object({
      owner_id: z.string().optional().describe("Filtrer par owner HubSpot ID"),
    }),
    execute: async (args: { owner_id?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("dealstage, amount").eq("tenant_id", tenantId).eq("hs_is_closed", false);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query;
      // Aggregate by stage
      const byStage: Record<string, { count: number; value: number }> = {};
      let total = 0;
      for (const d of data ?? []) {
        const stage = d.dealstage ?? "unknown";
        if (!byStage[stage]) byStage[stage] = { count: 0, value: 0 };
        byStage[stage].count++;
        byStage[stage].value += d.amount ?? 0;
        total += d.amount ?? 0;
      }
      return { totalValue: total, dealCount: data?.length ?? 0, byStage };
    },
  },

  get_deals: {
    description: "Recherche et filtre les deals avec tri",
    parameters: z.object({
      status: z.enum(["open", "won", "lost", "all"]).optional(),
      owner_id: z.string().optional(),
      limit: z.number().optional().default(10),
    }),
    execute: async (args: { status?: string; owner_id?: string; limit?: number }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("dealname, dealstage, amount, hubspot_owner_id, closedate, hs_is_stalled").eq("tenant_id", tenantId);
      if (args.status === "open") query = query.eq("hs_is_closed", false);
      if (args.status === "won") query = query.eq("hs_is_closed_won", true);
      if (args.status === "lost") query = query.eq("hs_is_closed", true).eq("hs_is_closed_won", false);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query.limit(args.limit ?? 10).order("amount", { ascending: false });
      return { deals: data ?? [], total: data?.length ?? 0 };
    },
  },

  get_win_rate: {
    description: "Calcule le win rate global ou filtre",
    parameters: z.object({ owner_id: z.string().optional() }),
    execute: async (args: { owner_id?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("hs_is_closed_won").eq("tenant_id", tenantId).eq("hs_is_closed", true);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query;
      const won = data?.filter((d) => d.hs_is_closed_won).length ?? 0;
      const total = data?.length ?? 0;
      return { winRate: total === 0 ? 0 : Math.round((won / total) * 1000) / 10, wonCount: won, lostCount: total - won, totalClosed: total };
    },
  },

  get_velocity: {
    description: "Metriques de velocite: cycle de vente moyen",
    parameters: z.object({ owner_id: z.string().optional() }),
    execute: async (args: { owner_id?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("days_to_close").eq("tenant_id", tenantId).eq("hs_is_closed_won", true).not("days_to_close", "is", null);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query;
      const values = (data ?? []).map((d) => d.days_to_close as number).sort((a, b) => a - b);
      const median = values.length === 0 ? 0 : values[Math.floor(values.length / 2)];
      const avg = values.length === 0 ? 0 : Math.round(values.reduce((s, v) => s + v, 0) / values.length * 10) / 10;
      return { medianDaysToClose: median, avgDaysToClose: avg, sampleSize: values.length };
    },
  },

  get_adoption: {
    description: "Score d'adoption avec breakdown",
    parameters: z.object({}),
    execute: async (_args: Record<string, never>, tenantId: string) => {
      const supabase = createAdminClient();
      const { data } = await supabase.from("daily_scores").select("*").eq("tenant_id", tenantId).order("score_date", { ascending: false }).limit(1).single();
      return data ?? { adoption_score: 0 };
    },
  },

  get_alerts: {
    description: "Liste des alertes actives",
    parameters: z.object({ severity: z.enum(["info", "warning", "critical"]).optional() }),
    execute: async (args: { severity?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("alerts").select("*").eq("tenant_id", tenantId).eq("status", "active");
      if (args.severity) query = query.eq("severity", args.severity);
      const { data } = await query.order("created_at", { ascending: false }).limit(10);
      return { alerts: data ?? [], count: data?.length ?? 0 };
    },
  },

  get_revenue: {
    description: "Metriques de revenue: closed won total",
    parameters: z.object({ owner_id: z.string().optional() }),
    execute: async (args: { owner_id?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("amount, closedate").eq("tenant_id", tenantId).eq("hs_is_closed_won", true);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query;
      const total = (data ?? []).reduce((s, d) => s + (d.amount ?? 0), 0);
      return { totalRevenue: total, dealCount: data?.length ?? 0 };
    },
  },

  get_activity: {
    description: "Metriques d'activite: deals non travailles",
    parameters: z.object({ owner_id: z.string().optional() }),
    execute: async (args: { owner_id?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      let query = supabase.from("hs_deals").select("dealname, hubspot_owner_id, hs_last_sales_activity_date").eq("tenant_id", tenantId).eq("hs_is_closed", false);
      if (args.owner_id) query = query.eq("hubspot_owner_id", args.owner_id);
      const { data } = await query;
      const now = Date.now();
      const fourteenDays = 14 * 24 * 60 * 60 * 1000;
      const unworked = (data ?? []).filter((d) => !d.hs_last_sales_activity_date || (now - new Date(d.hs_last_sales_activity_date).getTime()) > fourteenDays);
      return { totalOpen: data?.length ?? 0, unworkedCount: unworked.length, unworkedPercent: data?.length ? Math.round((unworked.length / data.length) * 100) : 0 };
    },
  },

  get_data_quality: {
    description: "Score qualite des donnees",
    parameters: z.object({}),
    execute: async (_args: Record<string, never>, tenantId: string) => {
      const supabase = createAdminClient();
      const { data } = await supabase.from("hs_deals").select("amount, closedate, hubspot_owner_id, contact_ids, company_ids").eq("tenant_id", tenantId).eq("hs_is_closed", false);
      const deals = data ?? [];
      const total = deals.length || 1;
      return {
        noAmount: deals.filter((d) => !d.amount).length,
        noAmountPct: Math.round((deals.filter((d) => !d.amount).length / total) * 100),
        noContact: deals.filter((d) => !d.contact_ids?.length).length,
        noCompany: deals.filter((d) => !d.company_ids?.length).length,
        totalOpenDeals: deals.length,
      };
    },
  },

  get_owner_performance: {
    description: "Performance detaillee d'un owner",
    parameters: z.object({ owner_id: z.string().describe("HubSpot owner ID") }),
    execute: async (args: { owner_id: string }, tenantId: string) => {
      const supabase = createAdminClient();
      const { data: ownerInfo } = await supabase.from("hs_owners").select("first_name, last_name").eq("tenant_id", tenantId).eq("hubspot_owner_id", args.owner_id).single();
      const { data: deals } = await supabase.from("hs_deals").select("amount, hs_is_closed_won, hs_is_closed, days_to_close").eq("tenant_id", tenantId).eq("hubspot_owner_id", args.owner_id);
      const all = deals ?? [];
      const won = all.filter((d) => d.hs_is_closed_won);
      const closed = all.filter((d) => d.hs_is_closed);
      const open = all.filter((d) => !d.hs_is_closed);
      return {
        owner: ownerInfo ? `${ownerInfo.first_name} ${ownerInfo.last_name}` : args.owner_id,
        openDeals: open.length,
        pipelineValue: open.reduce((s, d) => s + (d.amount ?? 0), 0),
        wonRevenue: won.reduce((s, d) => s + (d.amount ?? 0), 0),
        winRate: closed.length === 0 ? 0 : Math.round((won.length / closed.length) * 1000) / 10,
        avgCycle: won.length === 0 ? 0 : Math.round(won.reduce((s, d) => s + (d.days_to_close ?? 0), 0) / won.length),
      };
    },
  },

  create_note: {
    description: "Cree une note de pilotage dans le cockpit",
    parameters: z.object({
      content: z.string().describe("Contenu de la note"),
      type: z.enum(["general", "decision", "observation", "action", "review"]).optional(),
    }),
    execute: async (args: { content: string; type?: string }, tenantId: string) => {
      const supabase = createAdminClient();
      const { data, error } = await supabase.from("pilot_notes").insert({
        tenant_id: tenantId,
        author_id: "00000000-0000-0000-0000-000000000000", // placeholder, should use real user_id
        content: args.content,
        note_type: args.type ?? "general",
      }).select().single();
      return error ? { success: false, error: error.message } : { success: true, note: data };
    },
  },
};
