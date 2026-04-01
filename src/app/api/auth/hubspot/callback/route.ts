import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getTokenInfo } from "@/lib/hubspot/oauth";
import { createAdminClient } from "@/lib/supabase/admin";
import { encrypt } from "@/lib/crypto";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revops-ai-six.vercel.app";

  if (!code) {
    return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=missing_code`);
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);
    const tokenInfo = await getTokenInfo(tokens.access_token);
    const portalId = String(tokenInfo.hub_id);

    const supabase = createAdminClient();

    // Find tenant: first by portal_id, then most recent without portal
    let tenantId: string | null = null;

    const { data: existingTenant } = await supabase
      .from("tenants")
      .select("id")
      .eq("hubspot_portal_id", portalId)
      .single();

    if (existingTenant) {
      tenantId = existingTenant.id;
    } else {
      // Find the most recent tenant without a HubSpot connection
      const { data: unlinkedTenants } = await supabase
        .from("tenants")
        .select("id")
        .is("hubspot_portal_id", null)
        .order("created_at", { ascending: false })
        .limit(1);

      if (unlinkedTenants?.length) {
        tenantId = unlinkedTenants[0].id;
        await supabase
          .from("tenants")
          .update({
            hubspot_portal_id: portalId,
            name: tokenInfo.hub_domain || `Portal ${portalId}`,
          })
          .eq("id", tenantId);
      }
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

    return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=success`);
  } catch (error) {
    console.error("HubSpot callback error:", error);
    const msg = error instanceof Error ? error.message : "unknown";
    return NextResponse.redirect(`${appUrl}/settings?tab=connectors&hubspot=error&reason=oauth_failed&detail=${encodeURIComponent(msg)}`);
  }
}
