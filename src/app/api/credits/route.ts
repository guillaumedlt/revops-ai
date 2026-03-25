import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { getCreditStatus } from "@/lib/ai/credits";
import { apiSuccess, apiError } from "@/types/api";

export async function GET(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const status = await getCreditStatus(auth.tenantId);
  return NextResponse.json(apiSuccess(status));
}
