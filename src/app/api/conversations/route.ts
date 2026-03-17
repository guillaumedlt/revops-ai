import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, last_message_at, created_at")
    .eq("tenant_id", auth.tenantId)
    .eq("is_archived", false)
    .order("last_message_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const title = body.title?.slice(0, 100) || "Nouvelle conversation";

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      tenant_id: auth.tenantId,
      user_id: auth.userId,
      title,
    })
    .select("id, title, created_at, last_message_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
