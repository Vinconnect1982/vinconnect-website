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
        _template: "box",
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

export async function deliverEstimatePdf(input: {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  summary: string;
  pdf: Uint8Array;
}): Promise<boolean> {
  try {
    const fd = new FormData();
    fd.append("_subject", `VINCONNECT estimate ${input.id} — ${input.suburb || "Victoria"}`);
    fd.append("_template", "box");
    fd.append("_captcha", "false");
    fd.append("_replyto", input.email);
    fd.append("_cc", input.email);
    fd.append(
      "_autoresponse",
      `Thanks ${input.name}. Your VINCONNECT installation estimate ${input.id} is attached as a PDF, and a copy has gone to VINCONNECT. ${input.summary} Call 0408 559 555 if you would like to book.`,
    );
    fd.append("name", input.name);
    fd.append("email", input.email);
    fd.append("phone", input.phone);
    fd.append("address", input.address);
    fd.append("message", input.summary);
    fd.append(
      "attachment",
      new Blob([Uint8Array.from(input.pdf)], { type: "application/pdf" }),
      `VINCONNECT-${input.id}.pdf`,
    );
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: fd,
    });
    const body = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return body.success === true || body.success === "true";
  } catch {
    return false;
  }
}
