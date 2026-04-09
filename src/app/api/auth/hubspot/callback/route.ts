import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getTokenInfo } from "@/lib/hubspot/oauth";
import { createAdminClient } from "@/lib/supabase/admin";
import { encrypt } from "@/lib/crypto";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aikairo.app";

  if (!code) {
    return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=missing_code`);
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);
    const tokenInfo = await getTokenInfo(tokens.access_token);
    const portalId = String(tokenInfo.hub_id);

    const supabase = createAdminClient();

    // Step 1: Identify the current user from their session cookie
    const { createServerClient } = await import("@supabase/ssr");
    const response = NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=success`);
    const authClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options as any));
          },
        },
      }
    );
    const { data: { user } } = await authClient.auth.getUser();

    // Step 2: Find the tenant — prefer user's own tenant, fallback to portal match
    let tenantId: string | null = null;

    if (user) {
      // Get the user's tenant from DB
      const { data: dbUser } = await supabase
        .from("users")
        .select("tenant_id")
        .eq("id", user.id)
        .single();
      if (dbUser?.tenant_id) {
        tenantId = dbUser.tenant_id;
        // Update tenant with portal info
        await supabase
          .from("tenants")
          .update({ hubspot_portal_id: portalId, name: tokenInfo.hub_domain || `Portal ${portalId}` })
          .eq("id", tenantId);
      }
    }

    // Fallback: check if this portal is already linked to a tenant
    if (!tenantId) {
      const { data: existingTenant } = await supabase
        .from("tenants")
        .select("id")
        .eq("hubspot_portal_id", portalId)
        .single();
      if (existingTenant) tenantId = existingTenant.id;
    }

    if (!tenantId) {
      return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=no_tenant`);
    }

    // Store HubSpot tokens
    const { error: connError } = await supabase.from("hubspot_connections").upsert(
      {
        tenant_id: tenantId,
        portal_id: portalId,
        access_token: encrypt(tokens.access_token),
        refresh_token: encrypt(tokens.refresh_token),
        token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        scopes: tokenInfo.scopes || [],
        sync_status: "idle",
      },
      { onConflict: "tenant_id" }
    );

    if (connError) {
      console.error("HubSpot connection upsert error:", connError);
      return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=db_error`);
    }

    // Return the response object created earlier (it has the auth cookies set)
    return response;
  } catch (error) {
    console.error("HubSpot callback error:", error);
    const msg = error instanceof Error ? error.message : "unknown";
    return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=oauth_failed&detail=${encodeURIComponent(msg)}`);
  }
}
