import { createAdminClient } from "@/lib/supabase/admin";

export const CREDIT_COSTS = {
  simple: 1,      // Haiku, no tools
  standard: 2,    // Sonnet with tools
  opus: 5,        // Opus (most capable)
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

export async function deductCredit(tenantId: string, userId: string, action: CreditAction = "standard"): Promise<void> {
  try {
    const supabase = createAdminClient();
    const cost = CREDIT_COSTS[action];

    // Try to increment on credit_allocations directly
    const { data } = await supabase
      .from("credit_allocations")
      .select("id, credits_used")
      .eq("tenant_id", tenantId)
      .gte("billing_period_end", new Date().toISOString().split("T")[0])
      .order("billing_period_start", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      await supabase
        .from("credit_allocations")
        .update({ credits_used: (data.credits_used || 0) + cost })
        .eq("id", data.id);
    }
    // If no allocation exists (free tier), just skip - no tracking needed
  } catch {
    // Silently fail - credit tracking should never break the chat
    console.error("[credits] deductCredit failed for tenant", tenantId);
  }
}
