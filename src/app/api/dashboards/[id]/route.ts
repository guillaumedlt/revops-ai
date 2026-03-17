import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: dashboard, error } = await supabase
    .from("dashboards")
    .select("*")
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .single();

  if (error || !dashboard) {
    return NextResponse.json(apiError("Dashboard not found"), { status: 404 });
  }

  const { data: widgets } = await supabase
    .from("dashboard_widgets")
    .select("*")
    .eq("dashboard_id", id)
    .eq("tenant_id", auth.tenantId)
    .order("y", { ascending: true })
    .order("x", { ascending: true });

  return NextResponse.json(apiSuccess({ dashboard, widgets: widgets ?? [] }));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.name !== undefined) updates.name = body.name.trim();
  if (body.description !== undefined) updates.description = body.description?.trim() || null;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dashboards")
    .update(updates)
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .select()
    .single();

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  return NextResponse.json(apiSuccess({ dashboard: data }));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  // Widgets cascade-delete via FK
  const { error } = await supabase
    .from("dashboards")
    .delete()
    .eq("id", id)
    .eq("tenant_id", auth.tenantId);

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  return NextResponse.json(apiSuccess({ deleted: true }));
}
