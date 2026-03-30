import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { processHubSpotEvent } from "@/lib/automations/deal-watcher";

export async function POST(request: NextRequest) {
  // HubSpot sends an array of events
  var events: any[];
  try {
    events = await request.json();
    if (!Array.isArray(events)) events = [events];
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  var processed = 0;

  for (var event of events) {
    try {
      await processHubSpotEvent(event);
      processed++;
    } catch (e) {
      console.error("[hubspot-webhook] Error processing event:", e instanceof Error ? e.message : e);
    }
  }

  return NextResponse.json({ processed });
}

// HubSpot sends GET for webhook verification
export async function GET() {
  return NextResponse.json({ ok: true });
}
