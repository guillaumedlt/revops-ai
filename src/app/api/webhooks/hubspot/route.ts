import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { processHubSpotEvent } from "@/lib/automations/deal-watcher";

export async function POST(request: NextRequest) {
  var body = await request.text();

  // Verify HubSpot signature (v3)
  var signature = request.headers.get("x-hubspot-signature-v3") || request.headers.get("x-hubspot-signature");
  var clientSecret = process.env.HUBSPOT_CLIENT_SECRET;

  if (clientSecret && signature) {
    var method = "POST";
    var url = request.url;
    var timestamp = request.headers.get("x-hubspot-request-timestamp") || "";
    var sourceString = method + url + body + timestamp;
    var expectedSig = createHmac("sha256", clientSecret).update(sourceString).digest("base64");

    if (signature !== expectedSig) {
      // Try v1 signature as fallback
      var v1Source = clientSecret + body;
      var v1Expected = createHmac("sha256", "").update(v1Source).digest("hex");
      var v1Sig = request.headers.get("x-hubspot-signature");
      if (v1Sig !== v1Expected) {
        console.error("[hubspot-webhook] Invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }
  }

  var events: any[];
  try {
    events = JSON.parse(body);
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
      console.error("[hubspot-webhook] Error:", e instanceof Error ? e.message : e);
    }
  }

  return NextResponse.json({ processed });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
