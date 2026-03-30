import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const settings = (tenant?.settings as Record<string, unknown>) ?? {};
  const llm = (settings.llm as Record<string, unknown>) ?? {};

  return NextResponse.json(
    apiSuccess({
      defaultModel: llm.defaultModel ?? "revops-ai",
      keys: {
        anthropic: { configured: !!llm.anthropicKey },
        openai: { configured: !!llm.openaiKey },
        google: { configured: !!llm.googleKey },
      },
    })
  );
}

export async function PUT(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const supabase = createAdminClient();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const currentSettings = (tenant?.settings as Record<string, unknown>) ?? {};
  const currentLlm = (currentSettings.llm as Record<string, unknown>) ?? {};

  const newLlm = { ...currentLlm };
  if (body.defaultModel) newLlm.defaultModel = body.defaultModel;
  if (body.anthropicKey !== undefined) newLlm.anthropicKey = body.anthropicKey || null;
  if (body.openaiKey !== undefined) newLlm.openaiKey = body.openaiKey || null;
  if (body.googleKey !== undefined) newLlm.googleKey = body.googleKey || null;

  await supabase
    .from("tenants")
    .update({ settings: { ...currentSettings, llm: newLlm } })
    .eq("id", auth.tenantId);

  return NextResponse.json(apiSuccess({ updated: true }));
}
