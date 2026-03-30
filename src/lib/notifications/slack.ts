// Slack notification helper — uses incoming webhook

export async function sendSlackMessage(tenantSettings: any, text: string) {
  // Try tenant-level webhook first, then global
  var webhookUrl = tenantSettings?.notifications?.slackWebhook || process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return; // Slack not configured, skip silently

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
  } catch (e) {
    console.error("[slack] Failed to send:", e instanceof Error ? e.message : e);
  }
}
