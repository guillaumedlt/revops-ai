import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Legacy route -- redirect to the API callback
  const url = new URL(request.url);
  return NextResponse.redirect(
    new URL(`/api/auth/hubspot/callback${url.search}`, request.url)
  );
}
