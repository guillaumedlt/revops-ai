import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { widgets } = body;

  if (!Array.isArray(widgets)) {
    return NextResponse.json(apiError("widgets array is required"), { status: 400 });
  }

  const supabase = createAdminClient();

  // Verify dashboard belongs to tenant
  const { data: dashboard } = await supabase
    .from("dashboards")
    .select("id")
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .single();

  if (!dashboard) {
    return NextResponse.json(apiError("Dashboard not found"), { status: 404 });
  }

  // Batch update all widget positions
  const updates = widgets.map((w: { id: string; x: number; y: number; w: number; h: number }) =>
    supabase
      .from("dashboard_widgets")
      .update({ x: w.x, y: w.y, w: w.w, h: w.h, updated_at: new Date().toISOString() })
      .eq("id", w.id)
      .eq("dashboard_id", id)
      .eq("tenant_id", auth.tenantId)
  );

  await Promise.all(updates);

  // Touch dashboard updated_at
  await supabase
    .from("dashboards")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json(apiSuccess({ updated: widgets.length }));
}
