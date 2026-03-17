import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getTokenInfo } from "@/lib/hubspot/oauth";
import { createAdminClient } from "@/lib/supabase/admin";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // --- Validate params ---
  if (!code || !state) {
    return NextResponse.redirect(
      `${appUrl}/login?error=missing_params`
    );
  }

  // --- Verify state (CSRF) ---
  const storedState = request.cookies.get("oauth_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      `${appUrl}/login?error=invalid_state`
    );
  }

  try {
    // --- Exchange code for tokens ---
    const tokens = await exchangeCodeForTokens(code);

    // --- Get portal info from HubSpot ---
    const tokenInfo = await getTokenInfo(tokens.access_token);
    const portalId = String(tokenInfo.hub_id);
    const userEmail = tokenInfo.user;

    // --- Supabase: create or get tenant ---
    const supabase = createAdminClient();

    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .upsert(
        {
          hubspot_portal_id: portalId,
          name: tokenInfo.hub_domain || `Portal ${portalId}`,
        },
        { onConflict: "hubspot_portal_id" }
      )
      .select("id, onboarded_at")
      .single();

    if (tenantError || !tenant) {
      console.error("Tenant upsert error:", tenantError);
      return NextResponse.redirect(
        `${appUrl}/login?error=tenant_creation_failed`
      );
    }

    const isNewTenant = !tenant.onboarded_at;

    // --- Supabase: create user via auth.users ---
    // Use admin API to create/get auth user
    const { data: authUser } = await supabase.auth.admin.listUsers();
    let userId: string;

    const existingUser = authUser?.users?.find(
      (u) => u.email === userEmail
    );

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create auth user with random password (login is via OAuth only)
      const { data: newUser, error: createUserError } =
        await supabase.auth.admin.createUser({
          email: userEmail,
          email_confirm: true,
          user_metadata: {
            tenant_id: tenant.id,
            hubspot_portal_id: portalId,
          },
        });

      if (createUserError || !newUser.user) {
        console.error("User creation error:", createUserError);
        return NextResponse.redirect(
          `${appUrl}/login?error=user_creation_failed`
        );
      }
      userId = newUser.user.id;
    }

    // --- Supabase: upsert into public.users ---
    const { error: publicUserError } = await supabase
      .from("users")
      .upsert(
        {
          id: userId,
          tenant_id: tenant.id,
          email: userEmail,
          role: isNewTenant ? "owner" : "member",
          last_login_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (publicUserError) {
      console.error("Public user upsert error:", publicUserError);
    }

    // --- Store HubSpot tokens ---
    const { error: connError } = await supabase
      .from("hubspot_connections")
      .upsert(
        {
          tenant_id: tenant.id,
          portal_id: portalId,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(
            Date.now() + tokens.expires_in * 1000
          ).toISOString(),
          scopes: tokenInfo.scopes || [],
          sync_status: "idle",
        },
        { onConflict: "tenant_id" }
      );

    if (connError) {
      console.error("Connection upsert error:", connError);
    }

    // --- Sign JWT ---
    const jwt = await signToken({
      tenantId: tenant.id,
      userId,
      email: userEmail,
    });

    // --- Redirect with auth cookie ---
    const redirectUrl = isNewTenant
      ? `${appUrl}/dashboard`
      : `${appUrl}/dashboard`;

    const response = NextResponse.redirect(redirectUrl);
    setAuthCookie(response, jwt);

    // Clear the oauth_state cookie
    response.cookies.set("oauth_state", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      `${appUrl}/login?error=oauth_failed`
    );
  }
}
