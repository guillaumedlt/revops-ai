import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("hubspot_connections")
    .select("portal_id, sync_status, created_at")
    .eq("tenant_id", auth.tenantId)
    .single();

  return NextResponse.json(
    apiSuccess({
      connected: !!data,
      portalId: data?.portal_id ?? null,
      syncStatus: data?.sync_status ?? null,
    })
  );
}
