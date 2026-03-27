import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "active";

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("tenant_id", auth.tenantId)
    .eq("status", status)
    .order("severity", { ascending: true }) // critical first
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });

  // Count by severity
  const critical = (data || []).filter(function(a) { return a.severity === "critical"; }).length;
  const warning = (data || []).filter(function(a) { return a.severity === "warning"; }).length;
  const info = (data || []).filter(function(a) { return a.severity === "info"; }).length;

  return NextResponse.json(apiSuccess({
    alerts: data || [],
    counts: { critical, warning, info, total: (data || []).length },
  }));
}

// Dismiss or acknowledge an alert
export async function PATCH(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const { alertId, action } = body;

  if (!alertId || !["acknowledged", "dismissed"].includes(action)) {
    return NextResponse.json(apiError("alertId and action (acknowledged/dismissed) required"), { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("alerts")
    .update({
      status: action,
      acknowledged_by: auth.userId,
      acknowledged_at: new Date().toISOString(),
    })
    .eq("id", alertId)
    .eq("tenant_id", auth.tenantId);

  if (error) return NextResponse.json(apiError(error.message), { status: 500 });
  return NextResponse.json(apiSuccess({ updated: true }));
}
