import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("notion_connections")
    .select("workspace_id, workspace_name, created_at")
    .eq("tenant_id", auth.tenantId)
    .single();

  return NextResponse.json(
    apiSuccess({
      connected: !!data,
      workspaceId: data?.workspace_id ?? null,
      workspaceName: data?.workspace_name ?? null,
    })
  );
}

export async function DELETE(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  await supabase
    .from("notion_connections")
    .delete()
    .eq("tenant_id", auth.tenantId);

  return NextResponse.json(apiSuccess({ disconnected: true }));
}
