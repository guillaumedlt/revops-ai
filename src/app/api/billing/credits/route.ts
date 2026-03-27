import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { getStripe } from "@/lib/stripe/client";
import { CREDIT_PACKS } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

const BuySchema = z.object({
  packId: z.string(),
});

export async function GET(request: NextRequest) {
  // Return available credit packs
  return NextResponse.json(apiSuccess({
    packs: CREDIT_PACKS.map(function(p) {
      return { id: p.id, name: p.name, credits: p.credits, price: p.price, popular: p.popular || false };
    }),
  }));
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

  const body = await request.json();
  const parsed = BuySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(apiError("packId required"), { status: 400 });

  const pack = CREDIT_PACKS.find(function(p) { return p.id === parsed.data.packId; });
  if (!pack || !pack.stripePriceId) {
    return NextResponse.json(apiError("Invalid pack"), { status: 400 });
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
    await supabase.from("tenants").update({ stripe_customer_id: customerId }).eq("id", auth.tenantId);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://revops-ai-six.vercel.app";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment", // one-time, not subscription
    line_items: [{ price: pack.stripePriceId, quantity: 1 }],
    success_url: appUrl + "/settings?tab=billing&credits=success",
    cancel_url: appUrl + "/settings?tab=billing&credits=cancelled",
    metadata: {
      tenant_id: auth.tenantId,
      credit_pack_id: pack.id,
      credit_amount: String(pack.credits),
    },
    payment_intent_data: {
      metadata: {
        tenant_id: auth.tenantId,
        credit_pack_id: pack.id,
        credit_amount: String(pack.credits),
      },
    },
    currency: "eur",
  });

  return NextResponse.json(apiSuccess({ checkoutUrl: session.url }));
}
