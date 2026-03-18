import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tenants")
    .select("settings")
    .eq("id", auth.tenantId)
    .single();

  const settings = (data?.settings as any) ?? {};
  const apiKey = settings?.connectors?.lemlist?.apiKey;

  return NextResponse.json(
    apiSuccess({
      connected: !!apiKey,
    })
  );
}
