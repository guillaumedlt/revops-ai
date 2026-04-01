import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";

// Check if the current user is an admin (via is_admin column in DB)
export async function requireAdmin(request: NextRequest): Promise<{ ok: true; auth: any } | { ok: false; response: NextResponse }> {
  var auth = getAuthFromHeaders(request);
  if (!auth || !auth.userId) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  var supabase = createAdminClient();
  var { data: user } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", auth.userId)
    .single();

  if (!user?.is_admin) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true, auth };
}
