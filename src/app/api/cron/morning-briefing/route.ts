import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkCredits, deductCredit } from "@/lib/ai/credits";
import { parseContentBlocks } from "@/lib/ai/parse-blocks";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== "Bearer " + process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Get all tenants with briefing enabled
  const { data: tenants } = await supabase.from("tenants").select("id, settings");
  const enabledTenants = (tenants || []).filter(function (t: any) {
    return (t.settings as any)?.automations?.morningBriefing?.enabled;
  });

  let generated = 0;
  let skipped = 0;

  for (const tenant of enabledTenants) {
    // Check credits
    const credits = await checkCredits(tenant.id, "briefing");
    if (!credits.allowed) {
      skipped++;
      continue;
    }

    // Get HubSpot token
    const { data: hs } = await supabase
      .from("hubspot_connections")
      .select("access_token")
      .eq("tenant_id", tenant.id)
      .single();
    if (!hs) {
      skipped++;
      continue;
    }

    // Get a user for this tenant (for conversation)
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("tenant_id", tenant.id)
      .limit(1)
      .single();
    if (!user) {
      skipped++;
      continue;
    }

    try {
      // Fetch key data from HubSpot
      const token = hs.access_token;
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };

      // Open deals
      const dealsRes = await fetch(
        "https://api.hubapi.com/crm/v3/objects/deals/search",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: "hs_is_closed",
                    operator: "EQ",
                    value: "false",
                  },
                ],
              },
            ],
            properties: [
              "dealname",
              "amount",
              "dealstage",
              "hs_last_sales_activity_date",
              "closedate",
              "hubspot_owner_id",
            ],
            limit: 100,
          }),
        }
      );
      const dealsData = dealsRes.ok
        ? await dealsRes.json()
        : { results: [], total: 0 };
      const deals = dealsData.results || [];

      // Won yesterday
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];
      const wonRes = await fetch(
        "https://api.hubapi.com/crm/v3/objects/deals/search",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: "hs_is_closed_won",
                    operator: "EQ",
                    value: "true",
                  },
                  {
                    propertyName: "closedate",
                    operator: "GTE",
                    value: yesterday,
                  },
                ],
              },
            ],
            properties: ["dealname", "amount"],
            limit: 10,
          }),
        }
      );
      const wonData = wonRes.ok ? await wonRes.json() : { results: [] };

      // Calculate stats
      const now = Date.now();
      const DAY = 86400000;
      const totalPipeline = deals.reduce(function (s: number, d: any) {
        return s + (Number(d.properties.amount) || 0);
      }, 0);
      const atRiskDeals = deals.filter(function (d: any) {
        const last = d.properties.hs_last_sales_activity_date;
        return !last || now - new Date(last).getTime() > 14 * DAY;
      });
      const pastDue = deals.filter(function (d: any) {
        return (
          d.properties.closedate &&
          new Date(d.properties.closedate).getTime() < now
        );
      });

      // Generate briefing with AI
      const briefingPrompt =
        "Generate a morning briefing in French for a sales manager. Be concise, direct, actionable. Use these real data:\n\n" +
        "Pipeline: " +
        deals.length +
        " open deals, " +
        totalPipeline +
        " EUR total\n" +
        "Won yesterday: " +
        (wonData.results || []).length +
        " deals for " +
        (wonData.results || []).reduce(function (s: number, d: any) {
          return s + (Number(d.properties.amount) || 0);
        }, 0) +
        " EUR\n" +
        "At-risk (no activity >14 days): " +
        atRiskDeals.length +
        " deals\n" +
        "Past due close date: " +
        pastDue.length +
        " deals\n" +
        "Top at-risk deals: " +
        atRiskDeals
          .slice(0, 3)
          .map(function (d: any) {
            return (
              d.properties.dealname +
              " (" +
              (Number(d.properties.amount) || 0) +
              " EUR)"
            );
          })
          .join(", ") +
        "\n\n" +
        "Format the response with :::kpi_grid for the key numbers, then bullet points for actions. Keep it under 200 words.";

      const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{ role: "user", content: briefingPrompt }],
        }),
      });

      if (!aiRes.ok) {
        skipped++;
        continue;
      }
      const aiData = await aiRes.json();
      const briefingText =
        aiData.content?.[0]?.text || "Morning briefing unavailable.";

      // Create conversation
      const { data: conv } = await supabase
        .from("conversations")
        .insert({
          tenant_id: tenant.id,
          user_id: user.id,
          title:
            "Morning Briefing — " +
            new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
        })
        .select("id")
        .single();

      if (conv) {
        // Parse content blocks
        const blocks = parseContentBlocks(briefingText);

        await supabase.from("messages").insert({
          conversation_id: conv.id,
          tenant_id: tenant.id,
          role: "assistant",
          content: briefingText,
          content_blocks: blocks,
          model: "briefing",
        });

        await deductCredit(tenant.id, user.id, "briefing");
        generated++;
      }
    } catch (e) {
      console.error("[briefing] Error for tenant", tenant.id, e);
      skipped++;
    }
  }

  return NextResponse.json({
    data: { generated, skipped, total: enabledTenants.length },
  });
}
