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

  const [convRes, msgsRes] = await Promise.all([
    supabase
      .from("conversations")
      .select("id, title, created_at, last_message_at, is_archived")
      .eq("id", id)
      .eq("tenant_id", auth.tenantId)
      .single(),
    supabase
      .from("messages")
      .select("id, role, content, content_blocks, created_at, model")
      .eq("conversation_id", id)
      .eq("tenant_id", auth.tenantId)
      .order("created_at", { ascending: true }),
  ]);

  if (convRes.error) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

  return NextResponse.json({
    data: {
      conversation: convRes.data,
      messages: msgsRes.data ?? [],
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
  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title;
  if (body.is_archived !== undefined) updates.is_archived = body.is_archived;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("conversations")
    .update(updates)
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .select("id, title, is_archived")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  // Delete messages first, then conversation
  await supabase.from("messages").delete().eq("conversation_id", id).eq("tenant_id", auth.tenantId);
  const { error } = await supabase.from("conversations").delete().eq("id", id).eq("tenant_id", auth.tenantId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: { deleted: true } });
}
