import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*, report_slides(id)")
    .eq("tenant_id", auth.tenantId)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const reports = (data || []).map(function(r) {
    return {
      id: r.id,
      name: r.name,
      description: r.description,
      theme: r.theme,
      status: r.status,
      slideCount: r.report_slides ? r.report_slides.length : 0,
      created_at: r.created_at,
      updated_at: r.updated_at,
    };
  });

  return NextResponse.json({ data: reports });
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("reports")
    .insert({
      tenant_id: auth.tenantId,
      name: body.name || "Untitled Report",
      description: body.description || null,
      theme: body.theme || "light",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data }, { status: 201 });
}
