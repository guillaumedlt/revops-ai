import { z } from "zod";
import { hubspotTools } from "./hubspot/tools";
import { lemlistTools } from "./lemlist/tools";
import { notionTools } from "./notion/tools";
import { createAdminClient } from "@/lib/supabase/admin";

export type ConnectorTool = {
  connector: string;
  description: string;
  parameters: z.ZodType;
  execute: (args: any, tenantId: string) => Promise<any>;
};

// Get all available tools for a tenant based on their connected services
export async function getToolsForTenant(tenantId: string): Promise<Record<string, ConnectorTool>> {
  const supabase = createAdminClient();
  const tools: Record<string, ConnectorTool> = {};
  
  // Check HubSpot connection
  const { data: hsConn } = await supabase
    .from("hubspot_connections")
    .select("portal_id")
    .eq("tenant_id", tenantId)
    .single();
  
  if (hsConn) {
    Object.assign(tools, hubspotTools);
  }
  
  // Check Lemlist connection (API key stored in tenant settings)
  const { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", tenantId)
    .single();

  const tenantSettings = (tenant?.settings as any) ?? {};
  const lemlistKey = tenantSettings?.connectors?.lemlist?.apiKey;
  if (lemlistKey) {
    Object.assign(tools, lemlistTools);
  }

  // Check Notion connection
  const { data: notionConn } = await supabase
    .from("notion_connections")
    .select("workspace_id")
    .eq("tenant_id", tenantId)
    .single();

  if (notionConn) {
    Object.assign(tools, notionTools);
  }
  
  // Internal tools (always available)
  tools.create_note = {
    connector: "internal",
    description: "Create a pilot note in the cockpit",
    parameters: z.object({
      content: z.string().describe("Note content"),
      type: z.enum(["general", "decision", "observation", "action", "review"]).optional(),
    }),
    execute: async (args: any, tid: string) => {
      const sb = createAdminClient();
      const { data, error } = await sb.from("pilot_notes").insert({
        tenant_id: tid,
        author_id: "00000000-0000-0000-0000-000000000000",
        content: args.content,
        note_type: args.type || "general",
      }).select().single();
      return error ? { success: false, error: error.message } : { success: true, note: data };
    },
  };

  tools.create_action = {
    connector: "internal",
    description: "Create an action item / task in the actions board. Use this when you recommend something concrete the user should do.",
    parameters: z.object({
      title: z.string().describe("Short action title (what to do)"),
      description: z.string().optional().describe("Details about the action"),
      priority: z.enum(["low", "medium", "high", "urgent"]).describe("Priority level"),
      source: z.enum(["ai_suggestion", "alert", "quick_win", "weekly_review"]).optional().describe("Where this action comes from"),
      domain: z.string().optional().describe("RevOps domain: pipeline, performance, data_quality, outreach, service"),
      deal_id: z.string().optional().describe("Related HubSpot deal ID if applicable"),
      due_date: z.string().optional().describe("Due date in YYYY-MM-DD format"),
    }),
    execute: async (args: any, tid: string) => {
      const sb = createAdminClient();
      const { data, error } = await sb.from("actions").insert({
        tenant_id: tid,
        title: args.title,
        description: args.description || null,
        priority: args.priority || "medium",
        status: "todo",
        source: args.source || "ai_suggestion",
        domain: args.domain || null,
        deal_id: args.deal_id || null,
        due_date: args.due_date || null,
      }).select().single();
      return error ? { success: false, error: error.message } : { success: true, action: data };
    },
  };

  tools.get_actions = {
    connector: "internal",
    description: "Get the current action items / tasks from the actions board. Use this to see what's already planned.",
    parameters: z.object({
      status: z.enum(["todo", "in_progress", "done", "all"]).optional().describe("Filter by status (default: all active)"),
    }),
    execute: async (args: any, tid: string) => {
      const sb = createAdminClient();
      let query = sb.from("actions").select("*").eq("tenant_id", tid).order("created_at", { ascending: false }).limit(20);
      if (args.status && args.status !== "all") {
        query = query.eq("status", args.status);
      } else {
        query = query.in("status", ["todo", "in_progress"]);
      }
      const { data, error } = await query;
      return error ? { success: false, error: error.message } : {
        actions: (data || []).map(function(a: any) {
          return { id: a.id, title: a.title, priority: a.priority, status: a.status, source: a.source, domain: a.domain, due_date: a.due_date };
        }),
        total: (data || []).length,
      };
    },
  };
  
  return tools;
}
