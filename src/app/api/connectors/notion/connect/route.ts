import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const apiKey = body.apiKey?.trim();

  if (!apiKey || !apiKey.startsWith("ntn_") && !apiKey.startsWith("secret_")) {
    return NextResponse.json(apiError("Invalid Notion API key. It should start with ntn_ or secret_"), { status: 400 });
  }

  // Verify the key works by calling Notion API
  try {
    const res = await fetch("https://api.notion.com/v1/users/me", {
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!res.ok) {
      return NextResponse.json(apiError("Invalid API key — Notion rejected it"), { status: 400 });
    }

    const me = await res.json();

    // Store in notion_connections table
    const supabase = createAdminClient();
    await supabase
      .from("notion_connections")
      .upsert({
        tenant_id: auth.tenantId,
        access_token: apiKey,
        workspace_id: me.bot?.workspace_name || "workspace",
        workspace_name: me.bot?.workspace_name || me.name || "",
        bot_id: me.bot?.id || me.id || "",
        token_type: "bearer",
      }, { onConflict: "tenant_id" });

    return NextResponse.json(apiSuccess({ connected: true, workspaceName: me.bot?.workspace_name || "" }));
  } catch (error) {
    return NextResponse.json(apiError("Failed to verify Notion key"), { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  await supabase
    .from("notion_connections")
    .delete()
    .eq("tenant_id", auth.tenantId);

  return NextResponse.json(apiSuccess({ disconnected: true }));
}
