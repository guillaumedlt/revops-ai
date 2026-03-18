import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const apiKey = body.apiKey?.trim();

  if (!apiKey) {
    return NextResponse.json(apiError("API key is required"), { status: 400 });
  }

  // Validate the key by calling Lemlist API
  try {
    const res = await fetch("https://api.lemlist.com/api/team", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) {
      return NextResponse.json(apiError("Invalid API key"), { status: 400 });
    }
  } catch {
    return NextResponse.json(apiError("Failed to validate API key"), { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const currentSettings = (tenant?.settings as Record<string, any>) ?? {};
  const connectors = currentSettings.connectors ?? {};

  await supabase
    .from("tenants")
    .update({
      settings: {
        ...currentSettings,
        connectors: {
          ...connectors,
          lemlist: { apiKey, connectedAt: new Date().toISOString() },
        },
      },
    })
    .eq("id", auth.tenantId);

  return NextResponse.json(apiSuccess({ connected: true }));
}

export async function DELETE(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const currentSettings = (tenant?.settings as Record<string, any>) ?? {};
  const connectors = { ...(currentSettings.connectors ?? {}) };

  delete connectors.lemlist;

  await supabase
    .from("tenants")
    .update({
      settings: { ...currentSettings, connectors },
    })
    .eq("id", auth.tenantId);

  return NextResponse.json(apiSuccess({ connected: false }));
}
