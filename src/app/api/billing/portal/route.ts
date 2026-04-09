import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { getStripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const supabase = createAdminClient();
  const { data: tenant } = await supabase
    .from("tenants")
    .select("stripe_customer_id")
    .eq("id", auth.tenantId)
    .single();

  if (!tenant?.stripe_customer_id) {
    return NextResponse.json(apiError("No billing account found"), { status: 404 });
  }

  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aikairo.app";

  const session = await stripe.billingPortal.sessions.create({
    customer: tenant.stripe_customer_id,
    return_url: `${appUrl}/settings`,
  });

  return NextResponse.json(apiSuccess({ portalUrl: session.url }));
}
