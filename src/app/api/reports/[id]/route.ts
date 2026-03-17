import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: report, error } = await supabase
    .from("reports")
    .select("*, report_slides(*)")
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .single();

  if (error || !report) return NextResponse.json({ error: "Not found" }, { status: 404 });

  var slides = (report.report_slides || []).sort(function(a: any, b: any) {
    return a.slide_order - b.slide_order;
  });

  return NextResponse.json({
    data: {
      id: report.id,
      name: report.name,
      description: report.description,
      theme: report.theme,
      status: report.status,
      created_at: report.created_at,
      updated_at: report.updated_at,
      slides: slides,
    },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const supabase = createAdminClient();

  var updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.theme !== undefined) updates.theme = body.theme;
  if (body.status !== undefined) updates.status = body.status;

  const { data, error } = await supabase
    .from("reports")
    .update(updates)
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", id)
    .eq("tenant_id", auth.tenantId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: { deleted: true } });
}
