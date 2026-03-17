import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://revops-ai-six.vercel.app";

  if (!code) {
    return NextResponse.redirect(`${appUrl}/login?error=missing_code`);
  }

  const response = NextResponse.redirect(`${appUrl}${next}`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${appUrl}/login?error=auth_failed`);
  }

  // Create tenant + user record if first time
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (!existingUser) {
    // Create tenant
    const { data: tenant } = await supabase
      .from("tenants")
      .insert({
        name: data.user.email?.split("@")[1] ?? "My Team",
      })
      .select("id")
      .single();

    if (tenant) {
      // Create user linked to tenant
      await supabase.from("users").insert({
        id: data.user.id,
        tenant_id: tenant.id,
        email: data.user.email ?? "",
        full_name:
          data.user.user_metadata?.full_name ??
          data.user.email?.split("@")[0] ??
          "",
        role: "owner",
      });
    }
  }

  return response;
}
