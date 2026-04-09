import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

// Generate a printable HTML report from conversation messages
// The client opens this in a new tab and uses window.print() → Save as PDF
export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const url = new URL(request.url);
  const conversationId = url.searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json(apiError("conversationId required"), { status: 400 });
  }

  const supabase = createAdminClient();

  const [convRes, msgsRes] = await Promise.all([
    supabase.from("conversations").select("title").eq("id", conversationId).eq("tenant_id", auth.tenantId).single(),
    supabase.from("messages").select("role, content, created_at").eq("conversation_id", conversationId).eq("tenant_id", auth.tenantId).order("created_at", { ascending: true }),
  ]);

  if (convRes.error || !convRes.data) {
    return NextResponse.json(apiError("Conversation not found"), { status: 404 });
  }

  const title = convRes.data.title || "Kairo Report";
  const messages = msgsRes.data || [];
  const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  // Build clean HTML
  const messagesHtml = messages.map(function(msg) {
    const isUser = msg.role === "user";
    const content = msg.content
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/:::(kpi_grid|kpi|chart|table|alert|progress|funnel|comparison|scorecard)(\{[^}]*\})?\n[\s\S]*?:::/g, "[Bloc visuel]")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    return '<div style="margin-bottom:16px;padding:12px 16px;border-radius:8px;' +
      (isUser ? 'background:#f5f5f5;' : 'background:#fff;border:1px solid #e5e5e5;') +
      '">' +
      '<div style="font-size:10px;color:#999;margin-bottom:4px;">' + (isUser ? "Vous" : "Kairo") + '</div>' +
      '<div style="font-size:13px;line-height:1.6;color:#333;">' + content + '</div>' +
      '</div>';
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${title} — Kairo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #0a0a0a; }
    @media print { body { padding: 20px; } .no-print { display: none; } }
    h1 { font-size: 22px; margin-bottom: 4px; }
    .meta { font-size: 12px; color: #999; margin-bottom: 24px; }
    .print-btn { position: fixed; top: 16px; right: 16px; background: #0a0a0a; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; }
    .print-btn:hover { background: #333; }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">Telecharger PDF</button>
  <h1>${title}</h1>
  <p class="meta">Genere par Kairo — ${date}</p>
  ${messagesHtml}
  <p style="margin-top:32px;font-size:10px;color:#ccc;text-align:center;">Genere par Kairo AI — aikairo.app</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
