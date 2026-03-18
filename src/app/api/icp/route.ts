import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = createAdminClient();
  const { data } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  return NextResponse.json({ data: ((data?.settings as any)?.icp) || null });
}

export async function PUT(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const supabase = createAdminClient();
  const { data: t } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
  await supabase.from("tenants").update({ settings: { ...((t?.settings as any) || {}), icp: body } }).eq("id", auth.tenantId);
  return NextResponse.json({ data: { saved: true } });
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const domain = body.domain;
  if (!domain) return NextResponse.json({ error: "Domain is required" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI not configured" }, { status: 500 });

  const prompt = `Analyze the company behind the domain "${domain}".

Based on your knowledge of this company (or deduce from the domain name if you don't know them), provide a COMPLETE analysis in the following JSON format. Be specific and realistic with numbers.

{
  "company": {
    "name": "Company Name",
    "domain": "${domain}",
    "description": "2-3 sentence description of what they do",
    "industry": "Their industry",
    "services": ["Service 1", "Service 2", "Service 3"],
    "targetMarket": "Who they sell to",
    "estimatedSize": "1-10 / 10-50 / 50-200 / 200-1000 / 1000+",
    "founded": "Year or approximate",
    "location": "City, Country"
  },
  "icp": {
    "summary": "One paragraph describing the ideal customer for this company",
    "criteria": {
      "industries": [
        {"name": "Industry 1", "percent": 40, "reason": "Why this industry"},
        {"name": "Industry 2", "percent": 25, "reason": "Why"},
        {"name": "Industry 3", "percent": 20, "reason": "Why"},
        {"name": "Industry 4", "percent": 15, "reason": "Why"}
      ],
      "companySize": {
        "min": 10,
        "max": 500,
        "sweet_spot": "50-200",
        "reason": "Why this size range"
      },
      "revenue": {
        "min": 1000000,
        "max": 50000000,
        "sweet_spot": "5M-20M EUR",
        "reason": "Why this revenue range"
      },
      "geography": ["Country 1", "Country 2"],
      "buyerPersonas": [
        {"title": "VP Sales", "priority": "Primary", "reason": "Decision maker"},
        {"title": "Head of Revenue Operations", "priority": "Primary", "reason": "End user"},
        {"title": "CEO", "priority": "Secondary", "reason": "Final approval for small companies"}
      ],
      "painPoints": ["Pain point 1", "Pain point 2", "Pain point 3"],
      "buyingSignals": ["Signal 1", "Signal 2", "Signal 3"],
      "disqualifiers": ["Disqualifier 1", "Disqualifier 2"]
    },
    "dealSize": {
      "average": 15000,
      "range": "5K - 50K EUR",
      "salesCycle": "30-60 days"
    }
  }
}

IMPORTANT: Return ONLY the JSON, no markdown, no explanation. Be specific to this company, not generic.`;

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
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      console.error("[ICP] Anthropic error:", res.status, err.slice(0, 300));
      return NextResponse.json({ error: "AI analysis failed (" + res.status + ")" }, { status: 500 });
    }

    const aiRes = await res.json();
    const text = aiRes.content?.[0]?.text || "";

    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      console.error("[ICP] Failed to parse AI response:", text.slice(0, 500));
      return NextResponse.json({ error: "AI returned invalid format" }, { status: 500 });
    }

    const icpData = {
      ...parsed,
      company: {
        ...parsed.company,
        favicon: "https://www.google.com/s2/favicons?domain=" + domain + "&sz=64",
      },
      generatedAt: new Date().toISOString(),
      source: "ai",
    };

    // Save
    const supabase = createAdminClient();
    const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
    const current = (tenant?.settings as Record<string, any>) || {};
    await supabase.from("tenants").update({ settings: { ...current, icp: icpData } }).eq("id", auth.tenantId);

    return NextResponse.json({ data: icpData });
  } catch (e) {
    console.error("[ICP] Error:", e);
    return NextResponse.json({ error: "Failed to analyze company" }, { status: 500 });
  }
}
