import { randomBytes } from "crypto";

const HUBSPOT_SCOPES = [
  // Read
  "crm.objects.deals.read",
  "crm.objects.contacts.read",
  "crm.objects.companies.read",
  "crm.schemas.deals.read",
  "crm.objects.owners.read",
  "crm.objects.line_items.read",
  "sales-email-read",
  "tickets",
  "crm.objects.goals.read",
  "crm.objects.custom.read",
  "crm.objects.feedback_submissions.read",
  // Write
  "crm.objects.deals.write",
  "crm.objects.contacts.write",
  "crm.objects.companies.write",
  "crm.schemas.contacts.write",
];

export function generateState(): string {
  return randomBytes(32).toString("hex");
}

export function buildAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.HUBSPOT_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/hubspot/callback`,
    scope: HUBSPOT_SCOPES.join(" "),
    state,
  });

  return `https://app.hubspot.com/oauth/authorize?${params.toString()}`;
}

export interface HubSpotTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function exchangeCodeForTokens(
  code: string
): Promise<HubSpotTokenResponse> {
  const response = await fetch("https://api.hubapi.com/oauth/v1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/hubspot/callback`,
      code,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Token exchange failed: ${error.error_description || error.message}`
    );
  }

  return response.json();
}

export interface HubSpotTokenInfo {
  user: string;
  user_id: number;
  hub_id: number;
  hub_domain: string;
  scopes: string[];
  token_type: string;
}

export async function getTokenInfo(
  accessToken: string
): Promise<HubSpotTokenInfo> {
  const response = await fetch(
    `https://api.hubapi.com/oauth/v1/access-tokens/${accessToken}`
  );

  if (!response.ok) {
    throw new Error("Failed to get token info");
  }

  return response.json();
}
