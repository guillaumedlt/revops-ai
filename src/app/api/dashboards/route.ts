import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dashboards")
    .select("*, dashboard_widgets(id)")
    .eq("tenant_id", auth.tenantId)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  const dashboards = (data ?? []).map((d: any) => ({
    ...d,
    widget_count: d.dashboard_widgets?.length ?? 0,
    dashboard_widgets: undefined,
  }));

  return NextResponse.json(apiSuccess({ dashboards }));
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const body = await request.json();
  const { name, description } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(apiError("Name is required"), { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dashboards")
    .insert({
      tenant_id: auth.tenantId,
      author_id: auth.userId,
      name: name.trim(),
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  return NextResponse.json(apiSuccess({ dashboard: data }), { status: 201 });
}
