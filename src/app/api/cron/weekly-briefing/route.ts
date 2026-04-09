import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/notifications/email";
import { sendSlackMessage } from "@/lib/notifications/slack";

export var runtime = "nodejs";
export var maxDuration = 300;

export async function GET(request: NextRequest) {
  var auth = request.headers.get("authorization");
  if (auth !== "Bearer " + process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  var supabase = createAdminClient();

  // Get all tenants with HubSpot connected
  var { data: connections } = await supabase
    .from("hubspot_connections")
    .select("tenant_id, portal_id")
    .eq("sync_status", "idle");

  if (!connections?.length) {
    return NextResponse.json({ message: "No tenants", sent: 0 });
  }

  var sent = 0;

  for (var conn of connections) {
    try {
      // Get tenant info
      var { data: tenant } = await supabase
        .from("tenants")
        .select("name, settings")
        .eq("id", conn.tenant_id)
        .single();

      // Get users for this tenant
      var { data: users } = await supabase
        .from("users")
        .select("email")
        .eq("tenant_id", conn.tenant_id);

      // Get latest score
      var { data: score } = await supabase
        .from("daily_scores")
        .select("adoption_score, data_discipline_score, pipeline_rigor_score, activity_logging_score")
        .eq("tenant_id", conn.tenant_id)
        .order("score_date", { ascending: false })
        .limit(1)
        .single();

      // Get active alerts count
      var { count: alertCount } = await supabase
        .from("alerts")
        .select("id", { count: "exact", head: true })
        .eq("tenant_id", conn.tenant_id)
        .eq("status", "active");

      // Get open actions count
      var { count: actionCount } = await supabase
        .from("actions")
        .select("id", { count: "exact", head: true })
        .eq("tenant_id", conn.tenant_id)
        .in("status", ["todo", "in_progress"]);

      // Get deals stats
      var { data: deals } = await supabase
        .from("hs_deals")
        .select("properties")
        .eq("tenant_id", conn.tenant_id);

      var openDeals = (deals || []).filter(function(d: any) { return d.properties?.hs_is_closed !== "true"; });
      var pipelineValue = openDeals.reduce(function(s: number, d: any) { return s + (Number(d.properties?.amount) || 0); }, 0);

      var adoptionScore = score?.adoption_score ?? 0;
      var tenantName = tenant?.name || "Your company";

      // Build email HTML
      var html = buildWeeklyEmailHtml({
        tenantName: tenantName,
        adoptionScore: adoptionScore,
        pipelineValue: pipelineValue,
        openDeals: openDeals.length,
        alertCount: alertCount || 0,
        actionCount: actionCount || 0,
        dataScore: score?.data_discipline_score ?? 0,
        pipelineScore: score?.pipeline_rigor_score ?? 0,
        activityScore: score?.activity_logging_score ?? 0,
      });

      // Send to each user
      for (var user of (users || [])) {
        if (user.email) {
          await sendEmail(user.email, "📊 Weekly RevOps Briefing — " + tenantName, html);
          sent++;
        }
      }

      // Also send to Slack
      var slackMsg = "📊 *Weekly Briefing — " + tenantName + "*\n" +
        "• Adoption Score: " + adoptionScore + "/100\n" +
        "• Pipeline: " + (pipelineValue >= 1000 ? Math.round(pipelineValue / 1000) + "K" : pipelineValue) + " EUR (" + openDeals.length + " deals)\n" +
        "• " + (alertCount || 0) + " active alerts\n" +
        "• " + (actionCount || 0) + " pending actions\n" +
        "→ Open Kairo for details";
      await sendSlackMessage(tenant?.settings ?? {}, slackMsg);

    } catch (e) {
      console.error("[weekly-briefing] Error for tenant", conn.tenant_id, e instanceof Error ? e.message : e);
    }
  }

  return NextResponse.json({ sent });
}

function buildWeeklyEmailHtml(data: {
  tenantName: string;
  adoptionScore: number;
  pipelineValue: number;
  openDeals: number;
  alertCount: number;
  actionCount: number;
  dataScore: number;
  pipelineScore: number;
  activityScore: number;
}): string {
  var scoreColor = data.adoptionScore >= 80 ? "#22C55E" : data.adoptionScore >= 60 ? "#F59E0B" : "#EF4444";
  var pipelineFormatted = data.pipelineValue >= 1000000
    ? (data.pipelineValue / 1000000).toFixed(1) + "M"
    : data.pipelineValue >= 1000
    ? Math.round(data.pipelineValue / 1000) + "K"
    : String(data.pipelineValue);

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px;color:#111;">' +
    '<div style="text-align:center;margin-bottom:24px;">' +
    '<div style="display:inline-block;width:36px;height:36px;background:#111;border-radius:8px;line-height:36px;color:white;font-weight:bold;font-size:14px;">K</div>' +
    '</div>' +
    '<h1 style="font-size:20px;font-weight:700;text-align:center;margin:0 0 4px;">Weekly RevOps Briefing</h1>' +
    '<p style="font-size:13px;color:#999;text-align:center;margin:0 0 24px;">' + data.tenantName + '</p>' +

    '<div style="background:#FAFAFA;border:1px solid #EAEAEA;border-radius:8px;padding:20px;margin-bottom:16px;text-align:center;">' +
    '<p style="font-size:36px;font-weight:800;color:' + scoreColor + ';margin:0;">' + data.adoptionScore + '</p>' +
    '<p style="font-size:11px;color:#999;margin:4px 0 0;">Adoption Score /100</p>' +
    '</div>' +

    '<div style="display:flex;gap:8px;margin-bottom:16px;">' +
    '<div style="flex:1;background:#FAFAFA;border:1px solid #EAEAEA;border-radius:8px;padding:12px;text-align:center;">' +
    '<p style="font-size:20px;font-weight:700;margin:0;">' + pipelineFormatted + ' EUR</p>' +
    '<p style="font-size:10px;color:#999;margin:4px 0 0;">Pipeline (' + data.openDeals + ' deals)</p>' +
    '</div>' +
    '<div style="flex:1;background:#FAFAFA;border:1px solid #EAEAEA;border-radius:8px;padding:12px;text-align:center;">' +
    '<p style="font-size:20px;font-weight:700;margin:0;">' + data.alertCount + '</p>' +
    '<p style="font-size:10px;color:#999;margin:4px 0 0;">Active alerts</p>' +
    '</div>' +
    '<div style="flex:1;background:#FAFAFA;border:1px solid #EAEAEA;border-radius:8px;padding:12px;text-align:center;">' +
    '<p style="font-size:20px;font-weight:700;margin:0;">' + data.actionCount + '</p>' +
    '<p style="font-size:10px;color:#999;margin:4px 0 0;">Pending actions</p>' +
    '</div>' +
    '</div>' +

    '<div style="margin-bottom:24px;">' +
    '<p style="font-size:12px;font-weight:600;color:#111;margin:0 0 8px;">Score Breakdown</p>' +
    buildScoreBar("Data Discipline", data.dataScore) +
    buildScoreBar("Pipeline Rigor", data.pipelineScore) +
    buildScoreBar("Activity Logging", data.activityScore) +
    '</div>' +

    '<div style="text-align:center;">' +
    '<a href="https://aikairo.app/alerts" style="display:inline-block;background:#111;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Open Kairo →</a>' +
    '</div>' +

    '<p style="font-size:10px;color:#CCC;text-align:center;margin-top:32px;">Sent by Kairo AI — Your RevOps Assistant</p>' +
    '</body></html>';
}

function buildScoreBar(label: string, score: number): string {
  var color = score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";
  return '<div style="margin-bottom:6px;">' +
    '<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">' +
    '<span style="color:#555;">' + label + '</span>' +
    '<span style="font-weight:600;color:' + color + ';">' + score + '</span>' +
    '</div>' +
    '<div style="height:4px;background:#F0F0F0;border-radius:4px;overflow:hidden;">' +
    '<div style="height:100%;width:' + Math.min(100, score) + '%;background:' + color + ';border-radius:4px;"></div>' +
    '</div>' +
    '</div>';
}
