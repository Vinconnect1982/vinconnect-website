import { EMAIL } from "@/lib/content";
import { buildEstimatePdf, estimateEmailHtml, type EstimateDoc } from "@/lib/estimate-pdf";
import { sendSiteMail } from "@/lib/mailbox.server";
import type { EstimateInput } from "@/lib/pricing";
import { priceEstimate } from "@/lib/pricing.server";
import { formatAud } from "@/lib/utils";

export type EstimateMailInput = EstimateInput & {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export async function sendBrandedEstimate(input: EstimateMailInput) {
  const id = enquiryId(input.id);
  const result = priceEstimate(input);
  const doc: EstimateDoc = {
    id,
    name: input.name.trim().slice(0, 120),
    email: input.email.trim(),
    phone: input.phone.trim().slice(0, 40),
    address: input.address.trim().slice(0, 200),
    result,
  };
  const logo = await logoBytes();
  const pdf = Buffer.from(await buildEstimatePdf(doc, logo));
  const filename = `VINCONNECT-${id}.pdf`;
  const stored = await storeOnSite(doc, pdf, filename);
  try {
    const { saveSubmission } = await import("./submissions.server");
    await saveSubmission({
      id,
      createdAt: new Date().toISOString(),
      kind: "quote",
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      address: doc.address,
      suburb: "",
      type: "quote",
      summary: estimateText(doc),
      total: result.total,
    });
  } catch (error) {
    console.error("quote record failed", error instanceof Error ? error.message : error);
  }
  const mailed = await sendSiteMail({
    to: doc.email,
    bcc: EMAIL,
    replyTo: EMAIL,
    subject: result.kind === "callback" ? `VINCONNECT quote request ${id}` : `VINCONNECT quote ${id}`,
    text: estimateText(doc),
    html: estimateEmailHtml(doc, "cid:vinconnect-logo"),
    attachments: [
      ...(logo ? [{ filename: "logo.jpg", content: Buffer.from(logo), contentType: "image/jpeg", cid: "vinconnect-logo" }] : []),
      { filename, content: pdf, contentType: "application/pdf" },
    ],
  });
  return { emailed: mailed.emailed, stored, reason: mailed.reason, id };
}

function estimateText(doc: EstimateDoc) {
  if (doc.result.kind === "callback") {
    return [
      `VINCONNECT commercial quote request ${doc.id}`,
      doc.name,
      doc.address,
      doc.email,
      doc.phone,
      doc.result.travelNote,
      doc.result.paymentNote,
      "Reply to this email or call 0408 559 555.",
    ].join("\n");
  }
  return [
    `VINCONNECT installation quote ${doc.id}`,
    doc.name,
    doc.address,
    doc.email,
    doc.phone,
    `Roof: ${doc.result.roofLabel}`,
    `Mount: ${doc.result.mountLabel}`,
    ...doc.result.lines.map((line) => `${line.label}: ${formatAud(line.amount)}${line.note ? ` (${line.note})` : ""}`),
    `Quote: ${formatAud(doc.result.total)}`,
    doc.result.travelNote,
    doc.result.paymentNote,
    "The PDF is attached. Reply to this email or call 0408 559 555 to book.",
    "This is an installation quote, not a tax invoice.",
  ].join("\n");
}

async function storeOnSite(doc: EstimateDoc, pdf: Buffer, filename: string) {
  try {
    const body = new FormData();
    body.set("form-name", "enquiry");
    body.set("name", doc.name);
    body.set("email", doc.email);
    body.set("phone", doc.phone);
    body.set("address", doc.address);
    body.set("suburb", "");
    body.set("type", "estimate");
    body.set("package", "Installation estimate");
    body.set("subject", doc.result.kind === "callback" ? `VINCONNECT quote request ${doc.id}` : `VINCONNECT quote ${doc.id}`);
    body.set("message", estimateText(doc));
    body.set("website", "");
    body.append("estimate", new File([new Uint8Array(pdf)], filename, { type: "application/pdf" }));
    const res = await fetch("https://vinconnect.com.au/netlify-form.html", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(12000),
    });
    return res.ok;
  } catch (error) {
    console.error("estimate store failed", error instanceof Error ? error.message : error);
    return false;
  }
}

async function logoBytes() {
  try {
    const res = await fetch("https://vinconnect.com.au/media/logo-email.jpg", { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return undefined;
    return new Uint8Array(await res.arrayBuffer());
  } catch {
    return undefined;
  }
}

function enquiryId(id: string) {
  const clean = id.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 24);
  return /^VC-[A-Z0-9]{4,16}$/.test(clean) ? clean : `VC-${Date.now().toString(36).toUpperCase()}`;
}
