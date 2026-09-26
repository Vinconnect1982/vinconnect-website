import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { EstimateResult } from "@/lib/pricing";
import { quoteFigure } from "@/lib/install-estimate";
import { formatAud } from "@/lib/utils";

export type EstimateDoc = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  result: EstimateResult;
  /** Property-plan notes included in this same PDF. Absent on a plain estimate. */
  planNotes?: string;
};

const INK = rgb(0.07, 0.08, 0.09);
const PAPER = rgb(0.96, 0.95, 0.93);
const MUTED = rgb(0.33, 0.35, 0.37);
const CYAN = rgb(0.18, 0.62, 0.66);

export async function buildEstimatePdf(doc: EstimateDoc, logoBytes?: Uint8Array) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: PAPER });
  page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: INK });

  try {
    const bytes = logoBytes ?? new Uint8Array(await (await fetch("/media/logo-email.jpg")).arrayBuffer());
    const logo = await pdf.embedJpg(bytes);
    const width = 210;
    const height = (logo.height / logo.width) * width;
    page.drawImage(logo, { x: 40, y: 792 - height / 2, width, height });
  } catch {
    page.drawText("VINCONNECT", { x: 40, y: 786, size: 18, font: bold, color: PAPER });
  }

  page.drawText(doc.result.kind === "callback" ? "QUOTE REQUEST" : "INSTALLATION QUOTE", {
    x: 360,
    y: 786,
    size: 11,
    font: bold,
    color: PAPER,
  });
  page.drawText(doc.id, { x: 360, y: 768, size: 10, font, color: rgb(0.75, 0.78, 0.8) });

  let y = 700;
  page.drawText(doc.name, { x: 40, y, size: 16, font: bold, color: INK });
  y -= 18;
  for (const line of [doc.address, doc.email, doc.phone]) {
    page.drawText(line, { x: 40, y, size: 10, font, color: MUTED });
    y -= 14;
  }

  y -= 10;
  if (doc.result.kind === "callback") {
    const note = wrap(doc.result.travelNote, 90);
    for (const line of note) {
      page.drawText(line, { x: 40, y, size: 12, font, color: INK });
      y -= 16;
    }
    y -= 8;
    page.drawText(doc.result.paymentNote, { x: 40, y, size: 11, font, color: MUTED });
  } else {
    page.drawText("Roof", { x: 40, y, size: 9, font, color: MUTED });
    page.drawText(doc.result.roofLabel, { x: 160, y, size: 11, font: bold, color: INK });
    y -= 16;
    page.drawText("Mount", { x: 40, y, size: 9, font, color: MUTED });
    page.drawText(doc.result.mountLabel, { x: 160, y, size: 11, font: bold, color: INK });
    y -= 28;

    page.drawRectangle({ x: 40, y: y - 8, width: 515, height: 22, color: rgb(0.9, 0.89, 0.86) });
    page.drawText("Item", { x: 48, y, size: 9, font: bold, color: MUTED });
    page.drawText("Amount", { x: 470, y, size: 9, font: bold, color: MUTED });
    y -= 24;
    for (const line of doc.result.lines) {
      page.drawText(pdfSafe(line.label), { x: 48, y, size: 11, font, color: INK });
      page.drawText(formatAud(line.amount), { x: 470, y, size: 11, font, color: INK });
      y -= 16;
      if (line.note) {
        page.drawText(pdfSafe(line.note), { x: 48, y, size: 8, font, color: MUTED });
        y -= 14;
      } else {
        y -= 6;
      }
    }

    y -= 8;
    const shown = quoteFigure(doc.result);
    page.drawText(pdfSafe(shown.label), { x: 40, y, size: 11, font, color: MUTED });
    y -= 26;
    page.drawText(pdfSafe(shown.figure), { x: 40, y, size: shown.mode === "complete" ? 22 : 14, font: bold, color: CYAN });
    y -= 22;
    if (doc.result.headline) {
      for (const line of wrap(pdfSafe(doc.result.headline), 90)) {
        if (y < 80) break;
        page.drawText(line, { x: 40, y, size: 9, font, color: INK });
        y -= 12;
      }
      y -= 6;
    }
    if (doc.result.gstLabel) {
      page.drawText(doc.result.gstLabel, { x: 40, y, size: 9, font, color: MUTED });
      y -= 16;
    }
    y -= 6;
    const note = wrap(`${doc.result.travelNote} ${doc.result.paymentNote}`, 90);
    for (const line of note) {
      page.drawText(line, { x: 40, y, size: 9, font, color: MUTED });
      y -= 13;
    }
    for (const line of (doc.result.assumptions ?? []).slice(0, 3).map(pdfSafe)) {
      for (const wrapped of wrap(line, 90)) {
        if (y < 70) break;
        page.drawText(wrapped, { x: 40, y, size: 8, font, color: MUTED });
        y -= 12;
      }
    }
  }

  page.drawText("VINCONNECT  ·  vinconnect.com.au  ·  0408 559 555", {
    x: 40,
    y: 36,
    size: 9,
    font,
    color: MUTED,
  });
  page.drawText("This is an installation quote, not a tax invoice. Payment is due on the day of installation.", {
    x: 40,
    y: 22,
    size: 8,
    font,
    color: MUTED,
  });

  if (doc.planNotes?.trim()) {
    const plan = pdf.addPage([595, 842]);
    plan.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: PAPER });
    plan.drawRectangle({ x: 0, y: 790, width: 595, height: 52, color: INK });
    plan.drawText("PROPERTY PLAN", { x: 40, y: 810, size: 14, font: bold, color: PAPER });
    plan.drawText(doc.id, { x: 360, y: 810, size: 10, font, color: rgb(0.75, 0.78, 0.8) });
    let py = 760;
    plan.drawText("Included in this same proposal. This is not a second attachment.", { x: 40, y: py, size: 10, font, color: MUTED });
    py -= 22;
    for (const line of wrap(pdfSafe(doc.planNotes.trim()), 95)) {
      if (py < 60) break;
      plan.drawText(line, { x: 40, y: py, size: 10, font, color: INK });
      py -= 14;
    }
    const exclusions = (doc.result.exclusions ?? []).slice(0, 4);
    if (exclusions.length && py > 80) {
      py -= 8;
      plan.drawText("Not included", { x: 40, y: py, size: 11, font: bold, color: INK });
      py -= 16;
      for (const item of exclusions) {
        for (const line of wrap(pdfSafe(item), 95)) {
          if (py < 50) break;
          plan.drawText(line, { x: 40, y: py, size: 9, font, color: MUTED });
          py -= 12;
        }
      }
    }
  }

  return pdf.save();
}

function pdfSafe(value: string) {
  return value.replaceAll("—", " - ").replaceAll("–", "-").replace(/[^\n\r\t\x20-\x7E]/g, "");
}

function wrap(text: string, width: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      if (current) lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
}

export function estimateEmailHtml(doc: EstimateDoc, logoSrc = "https://vinconnect.com.au/media/logo-email.jpg") {
  const priced = doc.result.kind === "quote";
  const rows = doc.result.lines
    .map(
      (line) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #e4e0d8;">${escapeHtml(line.label)}${line.note ? `<br><span style="color:#667;font-size:12px;">${escapeHtml(line.note)}</span>` : ""}</td><td style="padding:10px 0;border-bottom:1px solid #e4e0d8;text-align:right;vertical-align:top;">${formatAud(line.amount)}</td></tr>`,
    )
    .join("");
  const shown = quoteFigure(doc.result);
  const amount = shown.figure;
  const total = priced
    ? `<p style="margin:22px 0 0;font-family:Arial,sans-serif;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#667;">${escapeHtml(shown.label)}</p>
          <p style="margin:4px 0 8px;font-size:${shown.mode === "complete" ? 32 : 22}px;color:#1c8f93;">${escapeHtml(amount)}</p>
          <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:13px;color:#667;">${escapeHtml(doc.result.gstLabel ?? "")}</p>
          <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">${escapeHtml(doc.result.headline ?? "")}</p>`
    : "";
  const mount = priced
    ? `<p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">
            <strong>Roof:</strong> ${escapeHtml(doc.result.roofLabel)}<br>
            <strong>Mount:</strong> ${escapeHtml(doc.result.mountLabel)}
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;">${rows}</table>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#eceae4;font-family:Georgia,serif;color:#14181c;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eceae4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
        <tr><td style="background:#12161a;padding:28px 32px;">
          <img src="${logoSrc}" alt="VINCONNECT" width="220" style="display:block;border:0;max-width:220px;height:auto;" />
          <p style="margin:18px 0 0;letter-spacing:.16em;text-transform:uppercase;font-family:Arial,sans-serif;font-size:12px;color:#8fd8d4;">${priced ? "Installation quote" : "Quote request"}</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;color:#667;">${escapeHtml(doc.id)}</p>
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:normal;">${escapeHtml(doc.name)}</h1>
          <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#3c4144;">
            ${escapeHtml(doc.address)}<br>${escapeHtml(doc.email)} · ${escapeHtml(doc.phone)}
          </p>
          ${mount}
          ${total}
          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#3c4144;">${escapeHtml(doc.result.travelNote)}</p>
          <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#3c4144;">${escapeHtml(doc.result.paymentNote)}</p>
          <p style="margin:18px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;">The PDF attached matches this ${priced ? "quote" : "request"}. Reply to this email or call 0408 559 555 to book.</p>
        </td></tr>
        <tr><td style="padding:16px 32px 28px;font-family:Arial,sans-serif;font-size:12px;color:#667;">VINCONNECT · vinconnect.com.au · This is a quote, not a tax invoice. Payment is due on the day of installation.</td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "\u0026amp;")
    .replaceAll("<", "\u0026lt;")
    .replaceAll(">", "\u0026gt;")
    .replaceAll('"', "\u0026quot;");
}
