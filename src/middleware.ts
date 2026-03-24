import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

var PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/pricing",
  "/auth/callback",
  "/api/webhooks/stripe",
  "/api/auth/hubspot/callback",
  "/api/auth/notion/callback",
  "/api/auth/setup",
];

export async function middleware(request: NextRequest) {
  var { pathname } = request.nextUrl;

  // Redirect /dashboard to /chat
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Allow public paths, static files, cron routes
  if (
    PUBLIC_PATHS.some(
      function(p) { return pathname === p || pathname.startsWith(p + "/"); }
    ) ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api/cron/")
  ) {
    var { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  var { user, supabaseResponse, supabase } = await updateSession(request);

  if (!user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          data: null,
          error: "Unauthorized",
          metadata: {
            timestamp: new Date().toISOString(),
            cached: false,
          },
        },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Get tenant_id from public.users table
  var { createClient } = await import("@supabase/supabase-js");
  var adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  var { data: dbUser } = await adminClient
    .from("users")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  // Inject auth context headers for API routes
  var requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", user.id);
  requestHeaders.set("x-user-email", user.email ?? "");
  requestHeaders.set("x-tenant-id", dbUser?.tenant_id ?? "");

  var response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Copy Supabase auth cookies
  supabaseResponse.cookies.getAll().forEach(function(cookie) {
    response.cookies.set(cookie.name, cookie.value);
  });

  return response;
}

export var config = {
  matcher: ["/chat/:path*", "/settings/:path*", "/dashboards/:path*", "/reports/:path*", "/api/:path*", "/auth/:path*", "/dashboard/:path*", "/onboarding/:path*"],
};
