import { getStripe } from "./client";
import { getPlanByStripePriceId, getPlanCredits } from "./plans";
import { createAdminClient } from "@/lib/supabase/admin";

export async function handleSubscriptionCreated(subscription: any) {
  const supabase = createAdminClient();
  const tenantId = subscription.metadata?.tenant_id;
  if (!tenantId) return;

  const priceId = subscription.items?.data?.[0]?.price?.id;
  const plan = getPlanByStripePriceId(priceId);
  const planId = plan?.id ?? "pro";

  // Update tenant plan
  await supabase.from("tenants").update({
    plan: planId,
    stripe_customer_id: subscription.customer,
    stripe_subscription_id: subscription.id,
  }).eq("id", tenantId);

  // Create credit allocation for current period
  const periodStart = new Date(subscription.current_period_start * 1000).toISOString().split("T")[0];
  const periodEnd = new Date(subscription.current_period_end * 1000).toISOString().split("T")[0];

  await supabase.from("credit_allocations").upsert({
    tenant_id: tenantId,
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
    credits_allocated: getPlanCredits(planId),
    credits_used: 0,
    bonus_credits: 0,
  }, { onConflict: "tenant_id,billing_period_start" });

  // Log billing event
  await supabase.from("billing_events").insert({
    tenant_id: tenantId,
    event_type: "subscription_created",
    stripe_event_id: subscription.id,
    plan_to: planId,
    amount_eur: plan?.price ?? 0,
  });
}

export async function handleSubscriptionUpdated(subscription: any) {
  const supabase = createAdminClient();
  const tenantId = subscription.metadata?.tenant_id;
  if (!tenantId) return;

  const priceId = subscription.items?.data?.[0]?.price?.id;
  const plan = getPlanByStripePriceId(priceId);
  const planId = plan?.id ?? "pro";

  // Get current plan for logging
  const { data: tenant } = await supabase.from("tenants").select("plan").eq("id", tenantId).single();

  await supabase.from("tenants").update({
    plan: planId,
    stripe_subscription_id: subscription.id,
  }).eq("id", tenantId);

  // Update credit allocation
  const periodStart = new Date(subscription.current_period_start * 1000).toISOString().split("T")[0];
  const periodEnd = new Date(subscription.current_period_end * 1000).toISOString().split("T")[0];

  await supabase.from("credit_allocations").upsert({
    tenant_id: tenantId,
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
    credits_allocated: getPlanCredits(planId),
    credits_used: 0,
  }, { onConflict: "tenant_id,billing_period_start" });

  const eventType = (plan?.price ?? 0) > (tenant?.plan === "business" ? 149 : tenant?.plan === "pro" ? 49 : 0)
    ? "plan_upgraded" : "plan_downgraded";

  await supabase.from("billing_events").insert({
    tenant_id: tenantId,
    event_type: eventType,
    stripe_event_id: subscription.id,
    plan_from: tenant?.plan,
    plan_to: planId,
    amount_eur: plan?.price ?? 0,
  });
}

export async function handleSubscriptionDeleted(subscription: any) {
  const supabase = createAdminClient();
  const tenantId = subscription.metadata?.tenant_id;
  if (!tenantId) return;

  await supabase.from("tenants").update({ plan: "free" }).eq("id", tenantId);

  await supabase.from("billing_events").insert({
    tenant_id: tenantId,
    event_type: "subscription_cancelled",
    stripe_event_id: subscription.id,
    plan_from: "pro",
    plan_to: "free",
  });
}

export async function handlePaymentSucceeded(invoice: any) {
  const supabase = createAdminClient();
  const customerId = invoice.customer;

  const { data: tenant } = await supabase.from("tenants")
    .select("id, plan")
    .eq("stripe_customer_id", customerId)
    .single();

  if (!tenant) return;

  // Reset credits for new period
  const periodStart = new Date(invoice.period_start * 1000).toISOString().split("T")[0];
  const periodEnd = new Date(invoice.period_end * 1000).toISOString().split("T")[0];

  await supabase.from("credit_allocations").upsert({
    tenant_id: tenant.id,
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
    credits_allocated: getPlanCredits(tenant.plan),
    credits_used: 0,
  }, { onConflict: "tenant_id,billing_period_start" });

  await supabase.from("billing_events").insert({
    tenant_id: tenant.id,
    event_type: "payment_succeeded",
    stripe_event_id: invoice.id,
    stripe_invoice_id: invoice.id,
    amount_eur: (invoice.amount_paid ?? 0) / 100,
  });
}

// Handle one-time credit pack purchase
export async function handleCheckoutCompleted(session: any) {
  const supabase = createAdminClient();
  const tenantId = session.metadata?.tenant_id;
  const creditPackId = session.metadata?.credit_pack_id;
  const creditAmount = parseInt(session.metadata?.credit_amount || "0", 10);

  if (!tenantId || !creditPackId || creditAmount <= 0) return;

  // Add bonus credits to current allocation
  const today = new Date().toISOString().split("T")[0];
  const { data: alloc } = await supabase
    .from("credit_allocations")
    .select("id, bonus_credits")
    .eq("tenant_id", tenantId)
    .gte("billing_period_end", today)
    .order("billing_period_start", { ascending: false })
    .limit(1)
    .single();

  if (alloc) {
    await supabase
      .from("credit_allocations")
      .update({ bonus_credits: (alloc.bonus_credits || 0) + creditAmount })
      .eq("id", alloc.id);
  } else {
    // No allocation exists — create one for the current month
    var now = new Date();
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    var monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    await supabase.from("credit_allocations").upsert({
      tenant_id: tenantId,
      billing_period_start: monthStart,
      billing_period_end: monthEnd,
      credits_allocated: 50, // free tier
      credits_used: 0,
      bonus_credits: creditAmount,
    }, { onConflict: "tenant_id,billing_period_start" });
  }

  // Log event
  await supabase.from("billing_events").insert({
    tenant_id: tenantId,
    event_type: "credits_purchased",
    stripe_event_id: session.id,
    amount_eur: (session.amount_total ?? 0) / 100,
    metadata: { pack_id: creditPackId, credits: creditAmount },
  });

  console.log("[credits] Added", creditAmount, "bonus credits to tenant", tenantId);
}

export async function handlePaymentFailed(invoice: any) {
  const supabase = createAdminClient();
  const customerId = invoice.customer;

  const { data: tenant } = await supabase.from("tenants")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (!tenant) return;

  await supabase.from("billing_events").insert({
    tenant_id: tenant.id,
    event_type: "payment_failed",
    stripe_event_id: invoice.id,
    stripe_invoice_id: invoice.id,
    amount_eur: (invoice.amount_due ?? 0) / 100,
  });
}
