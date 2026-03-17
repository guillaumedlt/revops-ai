import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; slideId: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, slideId } = await params;
  const body = await request.json();
  const supabase = createAdminClient();

  var updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.layout !== undefined) updates.layout = body.layout;
  if (body.title !== undefined) updates.title = body.title;
  if (body.content_blocks !== undefined) updates.content_blocks = body.content_blocks;
  if (body.slide_order !== undefined) updates.slide_order = body.slide_order;

  const { data, error } = await supabase
    .from("report_slides")
    .update(updates)
    .eq("id", slideId)
    .eq("report_id", id)
    .eq("tenant_id", auth.tenantId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update report updated_at
  await supabase
    .from("reports")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ data: data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; slideId: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, slideId } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("report_slides")
    .delete()
    .eq("id", slideId)
    .eq("report_id", id)
    .eq("tenant_id", auth.tenantId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update report updated_at
  await supabase
    .from("reports")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ data: { deleted: true } });
}
