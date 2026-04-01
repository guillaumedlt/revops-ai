import { createAdminClient } from "@/lib/supabase/admin";

// Credit costs per action type
// Calibrated for ~80-85% margin on Pro/Business plans
export const CREDIT_COSTS = {
  simple: 1,      // Haiku, no tools (~€0.001 real cost)
  standard: 2,    // Sonnet with tools (~€0.02 real cost)
  opus: 5,        // Opus, most capable (~€0.10 real cost)
  report: 5,      // /report long generation (~€0.08 real cost)
  icp: 2,         // ICP generation
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;

// Free tier: 50 credits/month (no Stripe needed)
var FREE_TIER_CREDITS = 50;

export async function checkCredits(tenantId: string, action: CreditAction = "standard"): Promise<{ allowed: boolean; remaining: number; cost: number }> {
  var supabase = createAdminClient();
  var cost = CREDIT_COSTS[action];

  // Look for active allocation
  var { data } = await supabase
    .from("credit_allocations")
    .select("id, credits_allocated, credits_used, bonus_credits")
    .eq("tenant_id", tenantId)
    .gte("billing_period_end", new Date().toISOString().split("T")[0])
    .order("billing_period_start", { ascending: false })
    .limit(1)
    .single();

  if (!data) {
    // No allocation — auto-create free tier for current month
    var now = new Date();
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    var monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    var { data: newAlloc } = await supabase
      .from("credit_allocations")
      .upsert({
        tenant_id: tenantId,
        billing_period_start: monthStart,
        billing_period_end: monthEnd,
        credits_allocated: FREE_TIER_CREDITS,
        credits_used: 0,
        bonus_credits: 0,
      }, { onConflict: "tenant_id,billing_period_start" })
      .select("id, credits_allocated, credits_used, bonus_credits")
      .single();

    if (newAlloc) {
      data = newAlloc;
    } else {
      // Fallback: allow if DB fails
      return { allowed: true, remaining: FREE_TIER_CREDITS, cost };
    }
  }

  var totalCredits = (data.credits_allocated ?? 0) + (data.bonus_credits ?? 0);
  var remaining = totalCredits - (data.credits_used ?? 0);
  return { allowed: remaining >= cost, remaining, cost };
}

export async function deductCredit(tenantId: string, userId: string, action: CreditAction = "standard"): Promise<{ remaining: number }> {
  try {
    var supabase = createAdminClient();
    var cost = CREDIT_COSTS[action];

    var { data } = await supabase
      .from("credit_allocations")
      .select("id, credits_used, credits_allocated, bonus_credits")
      .eq("tenant_id", tenantId)
      .gte("billing_period_end", new Date().toISOString().split("T")[0])
      .order("billing_period_start", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      var oldUsed = data.credits_used || 0;
      var newUsed = oldUsed + cost;
      // Optimistic locking: only update if credits_used hasn't changed since we read
      var { data: updated, error: updateErr } = await supabase
        .from("credit_allocations")
        .update({ credits_used: newUsed })
        .eq("id", data.id)
        .eq("credits_used", oldUsed) // Prevents race condition
        .select("credits_used")
        .single();

      if (updateErr || !updated) {
        // Race condition — retry once WITH optimistic locking
        var { data: retry } = await supabase
          .from("credit_allocations")
          .select("id, credits_used, credits_allocated, bonus_credits")
          .eq("id", data.id)
          .single();
        if (retry) {
          var retryOld = retry.credits_used || 0;
          var retryTotal = (retry.credits_allocated ?? 0) + (retry.bonus_credits ?? 0);
          if (retryOld + cost > retryTotal) {
            return { error: "insufficient_credits", remaining: retryTotal - retryOld };
          }
          var { data: retryUpdated } = await supabase
            .from("credit_allocations")
            .update({ credits_used: retryOld + cost })
            .eq("id", retry.id)
            .eq("credits_used", retryOld)
            .select("credits_used")
            .single();
          if (!retryUpdated) {
            return { error: "race_condition", remaining: 0 };
          }
          return { remaining: retryTotal - retryOld - cost };
        }
      }

      var totalCredits = (data.credits_allocated ?? 0) + (data.bonus_credits ?? 0);
      return { remaining: totalCredits - newUsed };
    }

    return { remaining: 0 };
  } catch {
    console.error("[credits] deductCredit failed for tenant", tenantId);
    return { remaining: 0 };
  }
}

// API helper to get current credit status for display
export async function getCreditStatus(tenantId: string): Promise<{ used: number; total: number; remaining: number; plan: string }> {
  var supabase = createAdminClient();

  var { data: tenant } = await supabase
    .from("tenants")
    .select("plan")
    .eq("id", tenantId)
    .single();

  var { data: alloc } = await supabase
    .from("credit_allocations")
    .select("credits_allocated, credits_used, bonus_credits")
    .eq("tenant_id", tenantId)
    .gte("billing_period_end", new Date().toISOString().split("T")[0])
    .order("billing_period_start", { ascending: false })
    .limit(1)
    .single();

  var total = (alloc?.credits_allocated ?? FREE_TIER_CREDITS) + (alloc?.bonus_credits ?? 0);
  var used = alloc?.credits_used ?? 0;

  return {
    used,
    total,
    remaining: total - used,
    plan: tenant?.plan ?? "free",
  };
}
