import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: null, error: null, metadata: { timestamp: new Date().toISOString(), cached: false } });
}
