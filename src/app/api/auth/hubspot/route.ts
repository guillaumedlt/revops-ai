import { NextResponse } from "next/server";
import { generateState, buildAuthorizationUrl } from "@/lib/hubspot/oauth";
import { apiSuccess, apiError } from "@/types/api";

export async function POST() {
  try {
    if (!process.env.HUBSPOT_CLIENT_ID) {
      return NextResponse.json(
        apiError("HubSpot OAuth not configured"),
        { status: 500 }
      );
    }

    const state = generateState();
    const authUrl = buildAuthorizationUrl(state);

    // Store state in a short-lived cookie for CSRF verification
    const response = NextResponse.json(apiSuccess({ authUrl, state }));

    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth initiation error:", error);
    return NextResponse.json(
      apiError("Failed to initiate OAuth"),
      { status: 500 }
    );
  }
}
