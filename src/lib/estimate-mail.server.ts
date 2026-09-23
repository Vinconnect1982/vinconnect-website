import { EMAIL } from "@/lib/content";
import { env } from "@/lib/env.server";

export async function sendBrandedEstimate(input: {
  to: string;
  subject: string;
  html: string;
  pdfBase64: string;
  filename: string;
}) {
  const key = env("RESEND_API_KEY");
  if (!key) return { emailed: false as const };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "VINCONNECT <noreply@vinconnect.com.au>",
      to: [input.to],
      bcc: [EMAIL],
      reply_to: EMAIL,
      subject: input.subject,
      html: input.html,
      attachments: [{ filename: input.filename, content: input.pdfBase64 }],
    }),
  });
  if (!res.ok) {
    console.error("Estimate email failed", res.status);
    return { emailed: false as const };
  }
  return { emailed: true as const };
}
