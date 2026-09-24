import { EMAIL } from "@/lib/content";
import { env } from "@/lib/env.server";

type Attachment = {
  filename: string;
  content: Buffer;
  contentType: string;
  cid?: string;
};

export type SiteMail = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  bcc?: string;
  attachments?: Attachment[];
};

export async function sendSiteMail(input: SiteMail) {
  const pass = env("SMTP_PASS") || env("GMAIL_APP_PASSWORD");
  if (!pass) return { emailed: false as const, reason: "no-mailbox" as const };
  const to = oneEmail(input.to);
  if (!to) return { emailed: false as const, reason: "smtp-failed" as const };
  const user = env("SMTP_USER") || EMAIL;
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: env("SMTP_HOST") || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    await transporter.sendMail({
      from: `VINCONNECT <${user}>`,
      to,
      bcc: input.bcc ?? EMAIL,
      replyTo: input.replyTo ?? EMAIL,
      subject: input.subject.slice(0, 180),
      text: input.text,
      html: input.html,
      attachments: input.attachments,
    });
    return { emailed: true as const, reason: "sent" as const };
  } catch (error) {
    const message = error instanceof Error ? error.message : "smtp error";
    console.error("site mail failed", message.replaceAll(pass, "***"));
    return { emailed: false as const, reason: "smtp-failed" as const };
  }
}

function oneEmail(value: string) {
  const email = value.trim();
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email;
}
