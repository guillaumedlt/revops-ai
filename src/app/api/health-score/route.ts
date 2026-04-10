import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { getToolsForTenant } from "@/lib/connectors";

export async function GET(request: NextRequest) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var url = new URL(request.url);
  var pipelineId = url.searchParams.get("pipeline") || undefined;
  var writeToHubspot = url.searchParams.get("write") === "true";

  var tools = await getToolsForTenant(auth.tenantId);
  var dealHealthTool = tools["hubspot_deal_health"];
  if (!dealHealthTool) {
    return NextResponse.json({ error: "HubSpot not connected" }, { status: 400 });
  }

  try {
    var result = await dealHealthTool.execute(
      { write_to_hubspot: writeToHubspot },
      auth.tenantId
    );
    return NextResponse.json({ data: result });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Scoring failed" }, { status: 500 });
  }
}
