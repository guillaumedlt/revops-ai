import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthFromHeaders, parsePagination } from "@/lib/api-helpers";
import { apiSuccess, apiError } from "@/types/api";

const CreateObjectiveSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  objective_type: z.enum(["objective", "key_result"]),
  parent_id: z.string().uuid().optional(),
  target_metric_id: z.string().optional(),
  target_value: z.number().optional(),
  current_value: z.number().optional(),
  unit: z.string().optional(),
  period_start: z.string().min(1, "Period start is required"),
  period_end: z.string().min(1, "Period end is required"),
  status: z.enum(["on_track", "at_risk", "behind", "completed", "cancelled"]).default("on_track"),
  progress: z.number().min(0).max(100).default(0),
});

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const { page, perPage, offset } = parsePagination(request);

  const supabase = createAdminClient();

  // Fetch objectives (parents) with their key results
  const { data: objectives, count, error } = await supabase
    .from("objectives")
    .select("*", { count: "exact" })
    .eq("tenant_id", auth.tenantId)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });

  // Fetch key results for these objectives
  const objectiveIds = (objectives ?? []).map((o) => o.id);
  let keyResults: Record<string, unknown[]> = {};

  if (objectiveIds.length > 0) {
    const { data: krs, error: krError } = await supabase
      .from("objectives")
      .select("*")
      .eq("tenant_id", auth.tenantId)
      .eq("objective_type", "key_result")
      .in("parent_id", objectiveIds)
      .order("created_at", { ascending: true });

    if (krError) return NextResponse.json(apiError(krError.message), { status: 500 });

    for (const kr of krs ?? []) {
      const pid = kr.parent_id as string;
      if (!keyResults[pid]) keyResults[pid] = [];
      keyResults[pid].push(kr);
    }
  }

  const items = (objectives ?? []).map((obj) => ({
    ...obj,
    key_results: keyResults[obj.id] ?? [],
  }));

  return NextResponse.json(apiSuccess({
    items,
    pageInfo: { page, perPage, total: count ?? 0, hasMore: (count ?? 0) > offset + perPage },
  }));
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const parsed = CreateObjectiveSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError(parsed.error.message), { status: 400 });

  // If creating a key_result, validate parent exists and belongs to tenant
  if (parsed.data.objective_type === "key_result" && parsed.data.parent_id) {
    const supabase = createAdminClient();
    const { data: parent, error: parentError } = await supabase
      .from("objectives")
      .select("id")
      .eq("id", parsed.data.parent_id)
      .eq("tenant_id", auth.tenantId)
      .single();

    if (parentError || !parent) {
      return NextResponse.json(apiError("Parent objective not found"), { status: 404 });
    }
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("objectives")
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
