import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const message = body.message;
  if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

  const supabase = createAdminClient();
  const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  const currentIcp = ((tenant?.settings as any)?.icp) || null;

  if (!currentIcp) return NextResponse.json({ error: "Generate an ICP first" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 500 });

  const prompt = `You are managing an Ideal Customer Profile (ICP). Here is the current ICP data:

${JSON.stringify(currentIcp, null, 2)}

The user wants to modify the ICP with this instruction:
"${message}"

Apply the user's changes to the ICP. Return the COMPLETE updated ICP as JSON (same structure as above). Only modify what the user asked to change, keep everything else intact.

Also return a short confirmation message (1-2 sentences in French) explaining what you changed.

Return in this format:
{"message": "Confirmation message in French", "icp": { ...updated ICP... }}

Return ONLY JSON, no markdown.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) return NextResponse.json({ error: "AI failed (" + res.status + ")" }, { status: 500 });

    const aiRes = await res.json();
    const text = aiRes.content?.[0]?.text || "";

    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      return NextResponse.json({ error: "AI returned invalid format" }, { status: 500 });
    }

    if (parsed.icp) {
      parsed.icp.generatedAt = currentIcp.generatedAt;
      parsed.icp.lastRefinedAt = new Date().toISOString();

      const current = (tenant?.settings as Record<string, any>) || {};
      await supabase.from("tenants").update({
        settings: { ...current, icp: { ...currentIcp, ...parsed.icp, company: currentIcp.company } },
      }).eq("id", auth.tenantId);
    }

    return NextResponse.json({ data: { message: parsed.message, icp: { ...currentIcp, ...parsed.icp, company: currentIcp.company } } });
  } catch (e) {
    console.error("[ICP refine]", e);
    return NextResponse.json({ error: "Failed to refine ICP" }, { status: 500 });
  }
}
