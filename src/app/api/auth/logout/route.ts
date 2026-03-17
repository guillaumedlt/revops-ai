import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";
import { apiSuccess } from "@/types/api";

export async function POST() {
  const response = NextResponse.json(
    apiSuccess({ message: "Logged out successfully" })
  );
  clearAuthCookie(response);
  return response;
}
