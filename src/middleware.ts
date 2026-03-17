import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/pricing",
  "/api/auth/hubspot",
  "/api/auth/hubspot/callback",
  "/api/webhooks/stripe",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Cron routes use x-cron-secret header, not JWT
  if (pathname.startsWith("/api/cron/")) {
    return NextResponse.next();
  }

  // Check auth for /dashboard/* and /api/* routes
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    // API routes → 401 JSON
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          data: null,
          error: "Unauthorized",
          metadata: { timestamp: new Date().toISOString(), cached: false },
        },
        { status: 401 }
      );
    }
    // Pages → redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          data: null,
          error: "Invalid or expired token",
          metadata: { timestamp: new Date().toISOString(), cached: false },
        },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Inject tenant_id and user_id as headers for downstream routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-id", payload.tenant_id);
  requestHeaders.set("x-user-id", payload.user_id);
  requestHeaders.set("x-user-email", payload.email);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
