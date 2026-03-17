// Shared API route helpers — query parsing, tenant data loading, response format

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError, type AuthContext } from "@/types/api";
import type { DealRow, ContactRow, CompanyRow, PipelineStageRow } from "@/types/metrics";

// ── Zod Schemas ─────────────────────────────────────────────────────

export const MetricsQuerySchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  ownerIds: z.string().optional(), // comma-separated
  pipeline: z.string().optional(),
});

// ── Auth from headers (injected by middleware) ──────────────────────

export function getAuthFromHeaders(request: NextRequest): AuthContext | null {
  const tenantId = request.headers.get("x-tenant-id");
  const userId = request.headers.get("x-user-id");
  const email = request.headers.get("x-user-email");
  if (!tenantId || !userId || !email) return null;
  return { tenantId, userId, email };
}

// ── Parse query params ──────────────────────────────────────────────

export function parseMetricsQuery(request: NextRequest) {
  const url = new URL(request.url);
  const params = {
    start: url.searchParams.get("start") ?? undefined,
    end: url.searchParams.get("end") ?? undefined,
    ownerIds: url.searchParams.get("ownerIds") ?? undefined,
    pipeline: url.searchParams.get("pipeline") ?? undefined,
  };

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    dateRange: {
      start: params.start ? new Date(params.start) : thirtyDaysAgo,
      end: params.end ? new Date(params.end) : now,
    },
    ownerIds: params.ownerIds?.split(",").filter(Boolean),
    pipeline: params.pipeline,
  };
}

// ── Load tenant data from Supabase ──────────────────────────────────

export interface TenantData {
  deals: DealRow[];
  contacts: ContactRow[];
  companies: CompanyRow[];
  stages: PipelineStageRow[];
}

export async function loadTenantData(tenantId: string): Promise<TenantData> {
  const supabase = createAdminClient();

  const [dealsRes, contactsRes, companiesRes, stagesRes] = await Promise.all([
    supabase.from("hs_deals").select("*").eq("tenant_id", tenantId),
    supabase.from("hs_contacts").select("*").eq("tenant_id", tenantId),
    supabase.from("hs_companies").select("*").eq("tenant_id", tenantId),
    supabase.from("hs_pipeline_stages").select("*").eq("tenant_id", tenantId).order("display_order"),
  ]);

  return {
    deals: (dealsRes.data ?? []) as unknown as DealRow[],
    contacts: (contactsRes.data ?? []) as unknown as ContactRow[],
    companies: (companiesRes.data ?? []) as unknown as CompanyRow[],
    stages: (stagesRes.data ?? []) as unknown as PipelineStageRow[],
  };
}

// ── Standard metric route handler ───────────────────────────────────

export function metricRoute(
  handler: (
    data: TenantData,
    query: ReturnType<typeof parseMetricsQuery>,
    auth: AuthContext
  ) => Record<string, unknown>
) {
  return async (request: NextRequest) => {
    const auth = getAuthFromHeaders(request);
    if (!auth) {
      return NextResponse.json(apiError("Unauthorized"), { status: 401 });
    }

    try {
      const query = parseMetricsQuery(request);
      const data = await loadTenantData(auth.tenantId);
      const result = handler(data, query, auth);

      return NextResponse.json(
        apiSuccess(result),
        { status: 200 }
      );
    } catch (error) {
      console.error("Metric route error:", error);
      return NextResponse.json(
        apiError(error instanceof Error ? error.message : "Internal server error"),
        { status: 500 }
      );
    }
  };
}

// ── Standard pagination helper ──────────────────────────────────────

export function parsePagination(request: NextRequest) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const perPage = Math.min(100, Math.max(1, parseInt(url.searchParams.get("perPage") ?? "20", 10)));
  return { page, perPage, offset: (page - 1) * perPage };
}
