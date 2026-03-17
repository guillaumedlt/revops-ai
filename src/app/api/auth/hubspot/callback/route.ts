import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getTokenInfo } from "@/lib/hubspot/oauth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://revops-ai-six.vercel.app";

  if (!code || !state) {
    return NextResponse.redirect(
      `${appUrl}/dashboard/settings?hubspot=error&reason=missing_params`
    );
  }

  const storedState = request.cookies.get("oauth_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      `${appUrl}/dashboard/settings?hubspot=error&reason=invalid_state`
    );
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const tokenInfo = await getTokenInfo(tokens.access_token);
    const portalId = String(tokenInfo.hub_id);

    const supabase = createAdminClient();

    // Try to find existing tenant with this portal
    let { data: tenant } = await supabase
      .from("tenants")
      .select("id")
      .eq("hubspot_portal_id", portalId)
      .single();

    if (!tenant) {
      // Update the most recent tenant without a portal_id
      const { data: unlinkedTenants } = await supabase
        .from("tenants")
        .select("id")
        .is("hubspot_portal_id", null)
        .order("created_at", { ascending: false })
        .limit(1);

      if (unlinkedTenants?.length) {
        await supabase
          .from("tenants")
          .update({
            hubspot_portal_id: portalId,
            name: tokenInfo.hub_domain || `Portal ${portalId}`,
          })
          .eq("id", unlinkedTenants[0].id);
        tenant = { id: unlinkedTenants[0].id };
      }
    }

    if (!tenant) {
      return NextResponse.redirect(
        `${appUrl}/dashboard/settings?hubspot=error&reason=no_tenant`
      );
    }

    // Store HubSpot tokens
    await supabase.from("hubspot_connections").upsert(
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

    const response = NextResponse.redirect(
      `${appUrl}/dashboard/settings?hubspot=success`
    );
    response.cookies.set("oauth_state", "", { maxAge: 0, path: "/" });
    return response;
  } catch (error) {
    console.error("HubSpot callback error:", error);
    return NextResponse.redirect(
      `${appUrl}/dashboard/settings?hubspot=error&reason=oauth_failed`
    );
  }
}
