import { createServerFn } from "@tanstack/react-start";
import { EMAIL } from "@/lib/content";

export type LeadPayload = {
  type: string;
  name: string;
  email: string;
  phone: string;
  suburb: string;
  address?: string;
  package?: string;
  message: string;
};

function subject(lead: LeadPayload) {
  const place = lead.suburb || lead.address || "Victoria";
  const pack = `${lead.package || ""} ${lead.type}`.toLowerCase();
  if (lead.type === "vinready") return `VINCONNECT VINREADY — ${lead.suburb || lead.name}`;
  if (lead.type === "estimate") return `VINCONNECT Estimate — ${place}`;
  if (lead.type === "property-plan") return `VINCONNECT Property Plan — ${place}`;
  if (pack.includes("caravan")) return `VINCONNECT Caravan Enquiry — ${place}`;
  if (pack.includes("cctv") || pack.includes("camera")) return `VINCONNECT CCTV Enquiry — ${place}`;
  if (pack.includes("starlink")) return `VINCONNECT Starlink Quote — ${place}`;
  if (lead.type === "support" || lead.type === "circl") return `VINCONNECT Customer Help — ${place}`;
  return `VINCONNECT Website Enquiry — ${place}`;
}

function asText(lead: LeadPayload) {
  return [
    `Type: ${lead.type}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Suburb: ${lead.suburb}`,
    lead.address ? `Address: ${lead.address}` : "",
    lead.package ? `Package: ${lead.package}` : "",
    "",
    lead.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function formBody(lead: LeadPayload) {
  return new URLSearchParams({
    "form-name": "enquiry",
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    suburb: lead.suburb,
    address: lead.address || "",
    type: lead.type,
    package: lead.package || "",
    message: lead.message,
  });
}

async function postNetlify(lead: LeadPayload) {
  const res = await fetch("https://vinconnect.com.au/netlify-form.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody(lead),
  });
  if (!res.ok) throw new Error("Netlify form failed");
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: LeadPayload) => input)
  .handler(async ({ data }) => {
    const name = data.name.trim();
    const email = data.email.trim();
    const phone = data.phone.trim();
    const message = data.message.trim();
    if (!name || !email || !phone || !message) {
      throw new Error("Add your name, email, mobile and a short message.");
    }
    const lead = { ...data, name, email, phone, message };

    let stored = false;
    try {
      await postNetlify(lead);
      stored = true;
    } catch (error) {
      console.error("Netlify form store failed", error);
    }
    try {
      const { saveSubmission } = await import("./submissions.server");
      await saveSubmission({
        id: `EN-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        kind: "enquiry",
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        address: lead.address || "",
        suburb: lead.suburb,
        type: lead.type,
        summary: [lead.package, lead.message].filter(Boolean).join("\n"),
      });
      stored = true;
    } catch (error) {
      console.error("Enquiry record failed", error);
    }
    if (!stored) {
      throw new Error("Could not save the enquiry. Please call 0408 559 555.");
    }

    let emailed = false;
    try {
      const { sendSiteMail } = await import("./mailbox.server");
      const mailed = await sendSiteMail({
        to: lead.email,
        replyTo: EMAIL,
        subject: subject(lead),
        text: [
          `Thanks ${lead.name}. VINCONNECT has your enquiry and will be in touch on ${lead.phone}.`,
          "",
          asText(lead),
          "",
          "VINCONNECT · 0408 559 555 · vinconnect.com.au",
        ].join("\n"),
      });
      emailed = mailed.emailed;
    } catch (error) {
      console.error("Enquiry email failed", error instanceof Error ? error.message : error);
    }

    return { ok: true as const, emailed };
  });
