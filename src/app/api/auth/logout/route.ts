import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiSuccess } from "@/types/api";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.json(apiSuccess({ message: "Logged out" }));
}
