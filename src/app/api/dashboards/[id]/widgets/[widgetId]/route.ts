import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; widgetId: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id, widgetId } = await params;
  const body = await request.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (body.x !== undefined) updates.x = body.x;
  if (body.y !== undefined) updates.y = body.y;
  if (body.w !== undefined) updates.w = body.w;
  if (body.h !== undefined) updates.h = body.h;
  if (body.config !== undefined) updates.config = body.config;
  if (body.title !== undefined) updates.title = body.title;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("dashboard_widgets")
    .update(updates)
    .eq("id", widgetId)
    .eq("dashboard_id", id)
    .eq("tenant_id", auth.tenantId)
    .select()
    .single();

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  return NextResponse.json(apiSuccess({ widget: data }));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; widgetId: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id, widgetId } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("dashboard_widgets")
    .delete()
    .eq("id", widgetId)
    .eq("dashboard_id", id)
    .eq("tenant_id", auth.tenantId);

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  // Touch dashboard updated_at
  await supabase
    .from("dashboards")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json(apiSuccess({ deleted: true }));
}
