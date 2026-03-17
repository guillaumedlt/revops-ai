import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { apiSuccess, apiError } from "@/types/api";

const SetupSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = SetupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(apiError(parsed.error.message), { status: 400 });
  }

  const { userId, email, firstName, lastName, company } = parsed.data;
  const supabase = createAdminClient();

  // Check if user already has a record
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (existingUser) {
    return NextResponse.json(apiSuccess({ message: "Already set up" }));
  }

  // Create tenant (company name from email domain)
  const tenantName = company || email.split("@")[1]?.split(".")[0] || "Mon equipe";

  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .insert({ name: tenantName })
    .select("id")
    .single();

  if (tenantError || !tenant) {
    return NextResponse.json(apiError("Failed to create tenant"), { status: 500 });
  }

  // Create user linked to tenant
  const { error: userError } = await supabase
    .from("users")
    .insert({
      id: userId,
      tenant_id: tenant.id,
      email,
      full_name: `${firstName} ${lastName}`,
      role: "owner",
    });

  if (userError) {
    return NextResponse.json(apiError(userError.message), { status: 500 });
  }

  // Create free credit allocation
  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  await supabase.from("credit_allocations").insert({
    tenant_id: tenant.id,
    billing_period_start: periodStart,
    billing_period_end: periodEnd,
    credits_allocated: 10,
    credits_used: 0,
  });

  return NextResponse.json(apiSuccess({
    tenantId: tenant.id,
    message: "Account set up successfully",
  }), { status: 201 });
}
