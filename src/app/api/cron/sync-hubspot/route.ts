import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { syncTenant } from "@/lib/hubspot/sync";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 minutes max for Vercel

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends as Authorization: Bearer {secret})
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Get all active connections (only those not currently syncing or revoked)
  const { data: connections, error: connError } = await supabase
    .from("hubspot_connections")
    .select("tenant_id, portal_id")
    .eq("sync_status", "idle");

  if (connError) {
    console.error("[cron] Sync query error:", connError.message);
    return NextResponse.json({ error: connError.message, synced: 0 }, { status: 500 });
  }

  if (!connections?.length) {
    return NextResponse.json({ message: "No tenants to sync", synced: 0 });
  }

  // Determine if it's full sync time (2 AM UTC)
  const hour = new Date().getUTCHours();
  const isFullSync = hour === 2;

  const results: Array<{
    tenant_id: string;
    success: boolean;
    syncType?: string;
    recordsSynced?: number;
    error?: string;
  }> = [];

  for (const conn of connections) {
    try {
      const result = await syncTenant(conn.tenant_id, isFullSync);
      const totalRecords = result.results.reduce(
        (sum, r) => sum + r.recordsSynced,
        0
      );
      results.push({
        tenant_id: conn.tenant_id,
        success: true,
        syncType: result.syncType,
        recordsSynced: totalRecords,
      });
    } catch (error) {
      results.push({
        tenant_id: conn.tenant_id,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return NextResponse.json({
    synced: results.length,
    fullSync: isFullSync,
    results,
  });
}
