import { createAdminClient } from "@/lib/supabase/admin";

export async function checkCredits(tenantId: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("credit_allocations")
    .select("credits_remaining")
    .eq("tenant_id", tenantId)
    .gte("billing_period_end", new Date().toISOString().split("T")[0])
    .order("billing_period_start", { ascending: false })
    .limit(1)
    .single();

  if (!data) return { allowed: true, remaining: 999 }; // No allocation = free tier, allow
  return { allowed: data.credits_remaining > 0, remaining: data.credits_remaining };
}

export async function deductCredit(tenantId: string, userId: string, messageId?: string): Promise<void> {
  const supabase = createAdminClient();
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  await supabase.from("credit_usage").insert({
    tenant_id: tenantId,
    user_id: userId,
    credits_used: 1,
    usage_type: "chat",
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
  });

  // Increment used count on allocation
  await supabase.rpc("increment_credits_used", { p_tenant_id: tenantId }).catch(() => {
    // RPC may not exist yet, silently fail
  });
}
