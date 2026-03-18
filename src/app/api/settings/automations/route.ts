import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  return NextResponse.json({
    data: ((data?.settings as any)?.automations) || {},
  });
}

export async function PUT(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supabase = createAdminClient();

  const { data: t } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const current = (t?.settings as Record<string, any>) || {};
  const automations = { ...(current.automations || {}), ...body };

  await supabase
    .from("tenants")
    .update({ settings: { ...current, automations } })
    .eq("id", auth.tenantId);

  return NextResponse.json({ data: { saved: true } });
}
