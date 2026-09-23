import { EMAIL } from "@/lib/content";
import type { LeadPayload } from "@/lib/leads";

export async function deliverLeadEmail(lead: LeadPayload): Promise<boolean> {
  try {
    const place = lead.suburb || lead.address || "Victoria";
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `VINCONNECT ${lead.type} — ${place}`,
        _template: "table",
        _captcha: "false",
        _replyto: lead.email,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        suburb: lead.suburb,
        address: lead.address || "",
        type: lead.type,
        package: lead.package || "",
        message: lead.message,
      }),
    });
    const body = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return body.success === true || body.success === "true";
  } catch {
    return false;
  }
}
