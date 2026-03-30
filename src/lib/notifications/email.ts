// Email notification helper — uses Resend

export async function sendEmail(to: string, subject: string, html: string) {
  var apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // Email not configured, skip silently

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
      },
      body: JSON.stringify({
        from: "Kairo <notifications@kairo.ai>",
        to: to,
        subject: subject,
        html: html,
      }),
    });
  } catch (e) {
    console.error("[email] Failed to send:", e instanceof Error ? e.message : e);
  }
}
