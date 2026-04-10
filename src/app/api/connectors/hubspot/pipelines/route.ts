import { NextRequest, NextResponse } from "next/server";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { decrypt } from "@/lib/crypto";

async function getToken(tenantId: string) {
  var supabase = createAdminClient();
  var { data } = await supabase.from("hubspot_connections").select("access_token").eq("tenant_id", tenantId).single();
  if (!data) return null;
  return decrypt(data.access_token);
}

export async function GET(request: NextRequest) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var token = await getToken(auth.tenantId);
  if (!token) return NextResponse.json({ error: "HubSpot not connected" }, { status: 400 });

  try {
    var res = await fetch("https://api.hubapi.com/crm/v3/pipelines/deals", {
      headers: { Authorization: "Bearer " + token },
    });
    if (!res.ok) return NextResponse.json({ error: "HubSpot API error" }, { status: res.status });

    var data = await res.json();
    var pipelines = (data.results || []).map(function(p: any) {
      return {
        id: p.id,
        label: p.label,
        stages: (p.stages || []).map(function(s: any) {
          return {
            id: s.id,
            label: s.label,
            displayOrder: s.displayOrder,
            metadata: s.metadata || {},
          };
        }).sort(function(a: any, b: any) { return a.displayOrder - b.displayOrder; }),
      };
    });

    return NextResponse.json({ data: { pipelines } });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch pipelines" }, { status: 500 });
  }
}
