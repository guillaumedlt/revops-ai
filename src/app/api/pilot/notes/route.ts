import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthFromHeaders, parsePagination } from "@/lib/api-helpers";
import { apiSuccess, apiError } from "@/types/api";

const CreateNoteSchema = z.object({
  content: z.string().min(1, "Content is required"),
  note_type: z.enum(["general", "decision", "observation", "action", "review"]).default("general"),
  metric_id: z.string().optional(),
  domain: z.string().optional(),
  deal_id: z.string().optional(),
  tags: z.array(z.string()).default([]),
  is_pinned: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const { page, perPage, offset } = parsePagination(request);
  const url = new URL(request.url);
  const noteType = url.searchParams.get("note_type");

  const supabase = createAdminClient();

  let query = supabase
    .from("pilot_notes")
    .select("*", { count: "exact" })
    .eq("tenant_id", auth.tenantId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (noteType) {
    query = query.eq("note_type", noteType);
  }

  const { data, count, error } = await query.range(offset, offset + perPage - 1);

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });

  return NextResponse.json(apiSuccess({
    items: data,
    pageInfo: { page, perPage, total: count ?? 0, hasMore: (count ?? 0) > offset + perPage },
  }));
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const parsed = CreateNoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError(parsed.error.message), { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pilot_notes")
    .insert({
      tenant_id: auth.tenantId,
      author_id: auth.userId,
      ...parsed.data,
    })
    .select()
    .single();

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });
  return NextResponse.json(apiSuccess(data), { status: 201 });
}
