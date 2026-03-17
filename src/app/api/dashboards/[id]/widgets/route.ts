import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) {
    return NextResponse.json(apiError("Unauthorized"), { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { widget_type, title, config, x, y, w, h, source_message_id, source_conversation_id } = body;

  if (!widget_type || !title) {
    return NextResponse.json(apiError("widget_type and title are required"), { status: 400 });
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

  const { data, error } = await supabase
    .from("dashboard_widgets")
    .insert({
      dashboard_id: id,
      tenant_id: auth.tenantId,
      widget_type,
      title,
      config: config ?? {},
      x: x ?? 0,
      y: y ?? 0,
      w: w ?? 4,
      h: h ?? 3,
      source_message_id: source_message_id || null,
      source_conversation_id: source_conversation_id || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(apiError(error.message), { status: 500 });
  }

  // Touch dashboard updated_at
  await supabase
    .from("dashboards")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json(apiSuccess({ widget: data }), { status: 201 });
}
