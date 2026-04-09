import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tenantId = url.searchParams.get("state");

  if (!code || !tenantId) {
    return NextResponse.redirect(new URL("/settings?tab=connectors&error=missing_params", request.url));
  }

  const clientId = process.env.NOTION_CLIENT_ID!;
  const clientSecret = process.env.NOTION_CLIENT_SECRET!;
  const redirectUri = (process.env.NEXT_PUBLIC_APP_URL || "https://aikairo.app") + "/api/auth/notion/callback";

  try {
    // Exchange code for access token
    const tokenRes = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text().catch(() => "");
      console.error("[notion] Token exchange failed:", tokenRes.status, err);
      return NextResponse.redirect(new URL("/settings?tab=connectors&error=token_failed", request.url));
    }

    const tokenData = await tokenRes.json();

    // Save connection in Supabase
    const supabase = createAdminClient();
    await supabase
      .from("notion_connections")
      .upsert({
        tenant_id: tenantId,
        access_token: tokenData.access_token,
        workspace_id: tokenData.workspace_id,
        workspace_name: tokenData.workspace_name || "",
        bot_id: tokenData.bot_id || "",
        token_type: tokenData.token_type || "bearer",
        duplicated_template_id: tokenData.duplicated_template_id || null,
      }, { onConflict: "tenant_id" });

    return NextResponse.redirect(new URL("/settings?tab=connectors&success=notion", request.url));
  } catch (error) {
    console.error("[notion] Callback error:", error);
    return NextResponse.redirect(new URL("/settings?tab=connectors&error=notion_failed", request.url));
  }
}
