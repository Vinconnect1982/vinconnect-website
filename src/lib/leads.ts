import { createServerFn } from "@tanstack/react-start";
import { EMAIL } from "@/lib/content";
import { env } from "@/lib/env.server";

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
  if (lead.type === "estimate") return `VINCONNECT estimate request — ${lead.suburb || lead.address || lead.name}`;
  if (lead.type === "property-plan") return `VINCONNECT property plan — ${lead.suburb || lead.address || lead.name}`;
  if (lead.type === "download") return `VINCONNECT download — ${lead.package || lead.name}`;
  if (lead.type === "circl") return `VINCONNECT Circl support — ${lead.suburb || lead.name}`;
  if (lead.type === "event-link") return `VINCONNECT Event Link — ${lead.suburb || lead.name}`;
  if (lead.type === "vingear") return `VINCONNECT VIN Gear interest — ${lead.name}`;
  if (lead.type === "support") return `VINCONNECT customer help — ${lead.suburb || lead.name}`;
  return `VINCONNECT enquiry — ${lead.name}`;
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
  const res = await fetch("https://vinconnect-website.netlify.app/netlify-form.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody(lead),
  });
  if (!res.ok) throw new Error("Netlify form failed");
}

async function postResend(lead: LeadPayload, key: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "VINCONNECT Website <noreply@vinconnect.com.au>",
      to: [EMAIL],
      reply_to: lead.email,
      subject: subject(lead),
      text: asText(lead),
    }),
  });
  if (!res.ok) throw new Error("Resend failed");
}

async function postFormSubmit(lead: LeadPayload) {
  const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject(lead),
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
  const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  const ok = body.success === true || body.success === "true" || res.ok;
  if (!ok) throw new Error(body.message || "FormSubmit failed");
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

    const results = await Promise.allSettled([
      postNetlify(lead),
      env("RESEND_API_KEY") ? postResend(lead, env("RESEND_API_KEY") as string) : Promise.reject(new Error("no-resend")),
      postFormSubmit(lead),
    ]);

    if (results.some((r) => r.status === "fulfilled")) {
      return { ok: true as const };
    }
    throw new Error("Could not send the enquiry. Please call 0408 559 555.");
  });
