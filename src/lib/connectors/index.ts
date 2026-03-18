import { z } from "zod";
import { hubspotTools } from "./hubspot/tools";
import { lemlistTools } from "./lemlist/tools";
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

  // TODO: Check Notion connection and add notion tools
  // TODO: Check Slack connection and add slack tools
  
  // Always include the create_note tool (internal, no connector needed)
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
  
  return tools;
}
