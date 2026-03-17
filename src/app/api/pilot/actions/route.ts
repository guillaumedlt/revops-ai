import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthFromHeaders, parsePagination } from "@/lib/api-helpers";
import { apiSuccess, apiError } from "@/types/api";

const CreateActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  status: z.enum(["todo", "in_progress", "done", "cancelled"]).default("todo"),
  assignee_id: z.string().uuid().optional(),
  assignee_owner_id: z.string().optional(),
  source: z.enum(["manual", "ai_suggestion", "alert", "quick_win", "weekly_review"]).optional(),
  source_id: z.string().optional(),
  metric_id: z.string().optional(),
  domain: z.string().optional(),
  deal_id: z.string().optional(),
  due_date: z.string().optional(),
});

const UpdateActionSchema = z.object({
  id: z.string().uuid("Action ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done", "cancelled"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  assignee_id: z.string().uuid().nullable().optional(),
  assignee_owner_id: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
});

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const { page, perPage, offset } = parsePagination(request);
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const priority = url.searchParams.get("priority");

  const supabase = createAdminClient();

  let query = supabase
    .from("actions")
    .select("*", { count: "exact" })
    .eq("tenant_id", auth.tenantId)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }
  if (priority) {
    query = query.eq("priority", priority);
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
  const parsed = CreateActionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError(parsed.error.message), { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("actions")
    .insert({
      tenant_id: auth.tenantId,
      ...parsed.data,
    })
    .select()
    .single();

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });
  return NextResponse.json(apiSuccess(data), { status: 201 });
}

export async function PUT(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const parsed = UpdateActionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError(parsed.error.message), { status: 400 });

  const { id, ...updates } = parsed.data;

  // If status is being set to "done", record completed_at
  const extra: Record<string, unknown> = {};
  const newStatus = updates.status as string | undefined;
  if (newStatus === "done") {
    extra.completed_at = new Date().toISOString();
  } else if (newStatus) {
    extra.completed_at = null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("actions")
    .update({ ...updates, ...extra })
    .eq("id", id)
    .eq("tenant_id", auth.tenantId)
    .select()
    .single();

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });
  return NextResponse.json(apiSuccess(data));
}
