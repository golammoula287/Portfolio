import "server-only";
import { siteConfig } from "@/lib/site-config";

type ContactPayload = { name: string; email: string; message: string };

// Sends the contact submission to your inbox via Resend. Best-effort: returns
// false (without throwing) if it isn't configured or the send fails, so the
// contact form still succeeds on the strength of the DB record alone.
//
// Setup: create a free key at https://resend.com and set RESEND_API_KEY. With
// the default onboarding sender you can only deliver to the email you signed
// up with — which is exactly where these go (siteConfig.email). To send from
// your own domain later, verify it in Resend and set CONTACT_FROM_EMAIL.
export async function sendContactEmail(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.email],
        reply_to: payload.email,
        subject: `New portfolio message from ${payload.name}`,
        html: `
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
