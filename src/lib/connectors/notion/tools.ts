import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

async function getNotionToken(tenantId: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("notion_connections")
    .select("access_token")
    .eq("tenant_id", tenantId)
    .single();
  return data?.access_token ?? null;
}

async function notionFetch(path: string, token: string, options?: RequestInit) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...options,
    headers: {
      "Authorization": "Bearer " + token,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error("Notion API " + res.status + ": " + body.slice(0, 200));
  }
  return res.json();
}

// Extract plain text from Notion rich text array
function richTextToPlain(rt: any[]): string {
  if (!rt || !Array.isArray(rt)) return "";
  return rt.map(function(t: any) { return t.plain_text || ""; }).join("");
}

// Extract a readable value from a Notion property
function extractPropValue(prop: any): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title": return richTextToPlain(prop.title);
    case "rich_text": return richTextToPlain(prop.rich_text);
    case "number": return prop.number != null ? String(prop.number) : "";
    case "select": return prop.select?.name || "";
    case "multi_select": return (prop.multi_select || []).map(function(s: any) { return s.name; }).join(", ");
    case "status": return prop.status?.name || "";
    case "date": return prop.date?.start || "";
    case "checkbox": return prop.checkbox ? "Yes" : "No";
    case "url": return prop.url || "";
    case "email": return prop.email || "";
    case "phone_number": return prop.phone_number || "";
    case "people": return (prop.people || []).map(function(p: any) { return p.name || p.id; }).join(", ");
    case "relation": return (prop.relation || []).map(function(r: any) { return r.id; }).join(", ");
    case "formula":
      if (prop.formula?.string) return prop.formula.string;
      if (prop.formula?.number != null) return String(prop.formula.number);
      if (prop.formula?.boolean != null) return prop.formula.boolean ? "Yes" : "No";
      return "";
    case "rollup":
      if (prop.rollup?.number != null) return String(prop.rollup.number);
      return prop.rollup?.type || "";
    case "created_time": return prop.created_time || "";
    case "last_edited_time": return prop.last_edited_time || "";
    default: return "";
  }
}

// Convert a Notion page to a flat object
function pageToRecord(page: any): Record<string, string> {
  const record: Record<string, string> = { id: page.id };
  if (page.properties) {
    for (const [key, prop] of Object.entries(page.properties)) {
      record[key] = extractPropValue(prop);
    }
  }
  return record;
}

export const notionTools = {
  notion_search: {
    connector: "notion",
    description: "Search for pages and databases in the connected Notion workspace. Returns titles, types, and URLs.",
    parameters: z.object({
      query: z.string().describe("Search query text"),
      type: z.enum(["page", "database", "all"]).optional().describe("Filter by object type (default: all)"),
      limit: z.number().optional().describe("Max results (default 10)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const token = await getNotionToken(tenantId);
      if (!token) return { error: "Notion not connected" };

      const body: any = { query: args.query, page_size: Math.min(args.limit || 10, 20) };
      if (args.type && args.type !== "all") {
        body.filter = { property: "object", value: args.type };
      }

      const data = await notionFetch("/search", token, {
        method: "POST",
        body: JSON.stringify(body),
      });

      return {
        total: data.results?.length || 0,
        results: (data.results || []).map(function(r: any) {
          const title = r.object === "database"
            ? richTextToPlain(r.title)
            : richTextToPlain(r.properties?.title?.title || r.properties?.Name?.title || []);
          return {
            id: r.id,
            type: r.object,
            title: title || "Untitled",
            url: r.url,
            lastEdited: r.last_edited_time,
          };
        }),
      };
    },
  },

  notion_get_database: {
    connector: "notion",
    description: "Query a Notion database to get all its entries with properties. Use this to read structured data (tasks, projects, CRM, etc.).",
    parameters: z.object({
      database_id: z.string().describe("The Notion database ID"),
      filter_property: z.string().optional().describe("Property name to filter on"),
      filter_value: z.string().optional().describe("Value to filter for"),
      limit: z.number().optional().describe("Max results (default 20)"),
    }),
    execute: async (args: any, tenantId: string) => {
      const token = await getNotionToken(tenantId);
      if (!token) return { error: "Notion not connected" };

      const body: any = { page_size: Math.min(args.limit || 20, 100) };

      // Simple filter if provided
      if (args.filter_property && args.filter_value) {
        body.filter = {
          property: args.filter_property,
          rich_text: { contains: args.filter_value },
        };
      }

      const data = await notionFetch("/databases/" + args.database_id + "/query", token, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const rows = (data.results || []).map(pageToRecord);

      // Build headers from first row
      const headers = rows.length > 0 ? Object.keys(rows[0]).filter(function(k) { return k !== "id"; }) : [];

      return {
        total: data.results?.length || 0,
        hasMore: data.has_more || false,
        headers,
        rows,
      };
    },
  },

  notion_get_page: {
    connector: "notion",
    description: "Read the content of a specific Notion page. Returns the page properties and text content.",
    parameters: z.object({
      page_id: z.string().describe("The Notion page ID"),
    }),
    execute: async (args: any, tenantId: string) => {
      const token = await getNotionToken(tenantId);
      if (!token) return { error: "Notion not connected" };

      // Get page properties
      const page = await notionFetch("/pages/" + args.page_id, token);

      // Get page content (blocks)
      const blocks = await notionFetch("/blocks/" + args.page_id + "/children?page_size=100", token);

      const content = (blocks.results || []).map(function(block: any) {
        const type = block.type;
        if (!block[type]) return "";
        const rt = block[type].rich_text || block[type].text;
        if (rt) return richTextToPlain(rt);
        if (type === "child_database") return "[Database: " + (block[type].title || "Untitled") + "]";
        if (type === "image") return "[Image]";
        if (type === "divider") return "---";
        if (type === "to_do") {
          const checked = block[type].checked ? "☑" : "☐";
          return checked + " " + richTextToPlain(block[type].rich_text || []);
        }
        return "";
      }).filter(Boolean);

      return {
        id: page.id,
        url: page.url,
        properties: pageToRecord(page),
        content: content.join("\n"),
      };
    },
  },

  notion_list_databases: {
    connector: "notion",
    description: "List all databases the bot has access to in the Notion workspace. Useful to discover what data is available.",
    parameters: z.object({}),
    execute: async (_args: any, tenantId: string) => {
      const token = await getNotionToken(tenantId);
      if (!token) return { error: "Notion not connected" };

      const data = await notionFetch("/search", token, {
        method: "POST",
        body: JSON.stringify({
          filter: { property: "object", value: "database" },
          page_size: 50,
        }),
      });

      return {
        databases: (data.results || []).map(function(db: any) {
          const propNames = db.properties ? Object.keys(db.properties) : [];
          return {
            id: db.id,
            title: richTextToPlain(db.title) || "Untitled",
            url: db.url,
            properties: propNames,
            lastEdited: db.last_edited_time,
          };
        }),
      };
    },
  },

  notion_create_page: {
    connector: "notion",
    description: "Create a new page in a Notion database. Useful for logging notes, creating tasks, or adding records.",
    parameters: z.object({
      database_id: z.string().describe("The database to create the page in"),
      title: z.string().describe("Title of the new page"),
      properties: z.record(z.string()).optional().describe("Additional properties as key-value pairs"),
    }),
    execute: async (args: any, tenantId: string) => {
      const token = await getNotionToken(tenantId);
      if (!token) return { error: "Notion not connected" };

      // Build properties — we need to find the title property name first
      const dbInfo = await notionFetch("/databases/" + args.database_id, token);
      let titleProp = "Name";
      for (const [key, val] of Object.entries(dbInfo.properties || {})) {
        if ((val as any).type === "title") {
          titleProp = key;
          break;
        }
      }

      const properties: any = {
        [titleProp]: { title: [{ text: { content: args.title } }] },
      };

      // Add extra properties as rich_text
      if (args.properties) {
        for (const [key, value] of Object.entries(args.properties)) {
          if (key === titleProp) continue;
          properties[key] = { rich_text: [{ text: { content: value } }] };
        }
      }

      const page = await notionFetch("/pages", token, {
        method: "POST",
        body: JSON.stringify({
          parent: { database_id: args.database_id },
          properties,
        }),
      });

      return { success: true, pageId: page.id, url: page.url };
    },
  },
};
