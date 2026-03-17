import { NextRequest, NextResponse } from "next/server";
import { apiError, type AuthContext } from "@/types/api";

// Auth context is now injected by middleware via headers (from Supabase session)
export function getAuthFromRequest(request: NextRequest): AuthContext | null {
  const tenantId = request.headers.get("x-tenant-id");
  const userId = request.headers.get("x-user-id");
  const email = request.headers.get("x-user-email");
  if (!tenantId || !userId || !email) return null;
  return { tenantId, userId, email };
}

export function requireAuth(
  handler: (
    request: NextRequest,
    auth: AuthContext
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const auth = getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json(apiError("Unauthorized"), { status: 401 });
    }
    return handler(request, auth);
  };
}

export function requireCronSecret(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const secret = request.headers.get("authorization");
    if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(apiError("Invalid cron secret"), {
        status: 403,
      });
    }
    return handler(request);
  };
}
