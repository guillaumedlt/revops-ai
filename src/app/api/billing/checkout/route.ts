import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { getStripe } from "@/lib/stripe/client";
import { PLANS } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

const CheckoutSchema = z.object({
  planId: z.enum(["pro", "business"]),
});

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError(parsed.error.message), { status: 400 });

  const plan = PLANS[parsed.data.planId];
  if (!plan?.stripePriceId) {
    return NextResponse.json(apiError("Invalid plan"), { status: 400 });
  }

  const stripe = getStripe();
  const supabase = createAdminClient();

  // Get or create Stripe customer
  const { data: tenant } = await supabase
    .from("tenants")
    .select("stripe_customer_id, name")
    .eq("id", auth.tenantId)
    .single();

  let customerId = tenant?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: auth.email,
      name: tenant?.name ?? undefined,
      metadata: { tenant_id: auth.tenantId },
    });
    customerId = customer.id;

    await supabase
      .from("tenants")
      .update({ stripe_customer_id: customerId })
      .eq("id", auth.tenantId);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revops-ai-six.vercel.app";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard/settings?billing=success`,
    cancel_url: `${appUrl}/dashboard/settings?billing=cancelled`,
    subscription_data: {
      metadata: { tenant_id: auth.tenantId },
    },
    currency: "eur",
  });

  return NextResponse.json(apiSuccess({ checkoutUrl: session.url }));
}
