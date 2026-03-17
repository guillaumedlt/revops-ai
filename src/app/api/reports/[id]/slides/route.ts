import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const supabase = createAdminClient();

  // Verify report belongs to tenant
  const { data: report } = await supabase
    .from("reports")
    .select("id")
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .single();

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Get next slide order
  var slideOrder = body.slide_order;
  if (slideOrder === undefined) {
    const { data: existing } = await supabase
      .from("report_slides")
      .select("slide_order")
      .eq("report_id", id)
      .order("slide_order", { ascending: false })
      .limit(1);
    slideOrder = existing && existing.length > 0 ? existing[0].slide_order + 1 : 0;
  }

  const { data, error } = await supabase
    .from("report_slides")
    .insert({
      report_id: id,
      tenant_id: auth.tenantId,
      layout: body.layout || "full",
      title: body.title || null,
      content_blocks: body.content_blocks || [],
      slide_order: slideOrder,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update report updated_at
  await supabase
    .from("reports")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ data: data }, { status: 201 });
}
