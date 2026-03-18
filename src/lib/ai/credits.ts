import { createAdminClient } from "@/lib/supabase/admin";

export const CREDIT_COSTS = {
  simple: 1,      // Haiku, no tools
  standard: 2,    // Sonnet with tools
  report: 5,      // /report generation
  briefing: 3,    // Morning briefing
  icp: 2,         // ICP generation
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;

export async function checkCredits(tenantId: string, action: CreditAction = "standard"): Promise<{ allowed: boolean; remaining: number; cost: number }> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("credit_allocations")
    .select("credits_allocated, credits_used")
    .eq("tenant_id", tenantId)
    .gte("billing_period_end", new Date().toISOString().split("T")[0])
    .order("billing_period_start", { ascending: false })
    .limit(1)
    .single();

  const cost = CREDIT_COSTS[action];
  if (!data) return { allowed: true, remaining: 999, cost }; // No allocation = free tier, allow
  const remaining = (data.credits_allocated ?? 0) - (data.credits_used ?? 0);
  return { allowed: remaining >= cost, remaining, cost };
}

export async function deductCredit(tenantId: string, userId: string, action: CreditAction = "standard", messageId?: string): Promise<void> {
  const supabase = createAdminClient();
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
  const cost = CREDIT_COSTS[action];

  await supabase.from("credit_usage").insert({
    tenant_id: tenantId,
    user_id: userId,
    credits_used: cost,
    usage_type: action,
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
  });

  // Increment used count on allocation
  try {
    await supabase.rpc("increment_credits_used", { p_tenant_id: tenantId, p_amount: cost });
  } catch {
    // RPC may not support p_amount yet, fallback to incrementing by 1 multiple times
    try {
      for (let i = 0; i < cost; i++) {
        await supabase.rpc("increment_credits_used", { p_tenant_id: tenantId });
      }
    } catch {
      // RPC may not exist yet, silently fail
    }
  }
}
