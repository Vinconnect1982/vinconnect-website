import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { dirname, join } from "node:path";
import { assertAdmin } from "./admin-auth.server.ts";
import type { EstimateInput } from "./pricing";
import type { PersistedPlan } from "./plan-record";

export type QuoteStatus = "open" | "won" | "lost" | "deleted";
export type PipelineStage = "new" | "awaiting" | "ready" | "quoted" | "followup" | "won" | "lost" | "closed";

export type QuotePhoto = { key: string; name: string; type: string; at: string };
export type QuoteActivity = { at: string; kind: string; detail: string; emailed?: boolean };

export type Submission = {
  id: string;
  createdAt: string;
  kind: "quote" | "enquiry";
  name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  type: string;
  summary: string;
  total?: number;
  status?: QuoteStatus;
  stage?: PipelineStage;
  token?: string;
  photos?: QuotePhoto[];
  note?: string;
  followedUpAt?: string;
  followUpOn?: string;
  hasKit?: boolean;
  lostReason?: string;
  activity?: QuoteActivity[];
  deletedAt?: string;
  quoteInput?: EstimateInput & { id?: string; name?: string; email?: string; phone?: string; token?: string };
  /** Versioned property plan. Absent on older enquiries. */
  plan?: PersistedPlan;
};

const FILE = "/tmp/vinconnect-submissions.json";
const PHOTO_DIR = "/tmp/vinconnect-photos";

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

async function readFileStore(): Promise<Submission[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Submission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(items: Submission[]) {
  await mkdir(dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(items.slice(0, 400)));
}

async function blob() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("vinconnect-submissions");
}

export function newQuoteToken() {
  return randomBytes(18).toString("base64url");
}

export async function saveSubmission(item: Submission) {
  const existing = item.id ? await getSubmission(item.id) : null;
  const record: Submission = {
    ...existing,
    ...item,
    email: item.email.trim().toLowerCase(),
    status: item.status ?? existing?.status ?? "open",
    stage: item.stage ?? existing?.stage ?? stageForStatus(item.status ?? existing?.status),
    token: item.token ?? existing?.token,
    photos: item.photos ?? existing?.photos,
    activity: item.activity ?? existing?.activity,
    hasKit: item.hasKit ?? existing?.hasKit,
    followUpOn: item.followUpOn ?? existing?.followUpOn,
    lostReason: item.lostReason ?? existing?.lostReason,
  };
  try {
    const store = await blob();
    await store.setJSON(record.id, record);
    if (record.token) await store.setJSON(`token:${record.token}`, record.id);
    const index = ((await store.get("index", { type: "json" })) as string[] | null) ?? [];
    await store.setJSON("index", [record.id, ...index.filter((id) => id !== record.id)].slice(0, 400));
    return record;
  } catch (error) {
    console.error("submission blob failed", error instanceof Error ? error.message : error);
    const items = await readFileStore();
    await writeFileStore([record, ...items.filter((row) => row.id !== record.id)]);
    return record;
  }
}

export async function listSubmissions(password: string) {
  await assertAdmin(password);
  try {
    const store = await blob();
    const index = ((await store.get("index", { type: "json" })) as string[] | null) ?? [];
    const rows = await Promise.all(index.map(async (id) => (await store.get(id, { type: "json" })) as Submission | null));
    return rows.filter((row): row is Submission => Boolean(row));
  } catch {
    return readFileStore();
  }
}

export async function findSubmission(input: { code?: string; email?: string; address?: string }) {
  const code = input.code?.trim().toUpperCase() ?? "";
  const email = input.email?.trim().toLowerCase() ?? "";
  const address = normalise(input.address ?? "");
  const rows = (await listAll()).filter((row) => row.status !== "deleted");
  if (code) {
    return rows.find((row) => row.id.toUpperCase() === code) ?? null;
  }
  if (!email || address.length < 8) return null;
  return (
    rows.find((row) => row.email === email && (normalise(row.address).includes(address) || address.includes(normalise(row.address)))) ??
    null
  );
}

async function listAll() {
  try {
    const store = await blob();
    const index = ((await store.get("index", { type: "json" })) as string[] | null) ?? [];
    const rows = await Promise.all(index.map(async (id) => (await store.get(id, { type: "json" })) as Submission | null));
    return rows.filter((row): row is Submission => Boolean(row));
  } catch {
    return readFileStore();
  }
}

export async function getSubmission(id: string) {
  try {
    const store = await blob();
    return ((await store.get(id, { type: "json" })) as Submission | null) ?? null;
  } catch {
    const rows = await readFileStore();
    return rows.find((row) => row.id === id) ?? null;
  }
}

export async function findByToken(token: string) {
  const clean = token.trim();
  if (clean.length < 12) return null;
  try {
    const store = await blob();
    const id = (await store.get(`token:${clean}`, { type: "json" })) as string | null;
    const row = id ? await getSubmission(id) : (await listAll()).find((item) => item.token === clean) ?? null;
    if (!row || row.status === "deleted") return null;
    return row;
  } catch {
    const row = (await readFileStore()).find((item) => item.token === clean) ?? null;
    if (!row || row.status === "deleted") return null;
    return row;
  }
}

export function publicQuote(row: Submission) {
  return {
    id: row.id,
    address: row.address,
    suburb: row.suburb,
    total: row.total,
    summary: row.summary,
    name: row.name,
    token: row.token ?? "",
    photoCount: row.photos?.length ?? 0,
    status: row.status ?? "open",
  };
}

export async function addQuotePhoto(token: string, file: { name: string; type: string; base64: string }) {
  const row = await findByToken(token);
  if (!row) throw new Error("That quote link has expired.");
  const photos = row.photos ?? [];
  if (photos.length >= 6) throw new Error("Six photos is enough. Call 0408 559 555 if you have more.");
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("Use a JPG, PNG or WEBP photo.");
  const bytes = Buffer.from(file.base64, "base64");
  if (bytes.length < 1000 || bytes.length > 5_000_000) throw new Error("Each photo needs to be under 5 MB.");
  const key = `${row.id}-photo-${photos.length + 1}`;
  try {
    const store = await blob();
    await store.set(key, bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  } catch {
    await mkdir(PHOTO_DIR, { recursive: true });
    await writeFile(join(PHOTO_DIR, key), bytes);
  }
  const next: Submission = {
    ...row,
    photos: [...photos, { key, name: file.name.slice(0, 80), type: file.type, at: new Date().toISOString() }],
  };
  await saveSubmission(next);
  return next.photos?.length ?? 0;
}

export async function updateQuote(
  password: string,
  id: string,
  patch: Partial<Pick<Submission, "status" | "stage" | "note" | "name" | "email" | "phone" | "followUpOn" | "hasKit" | "lostReason">>,
) {
  await assertAdmin(password);
  const row = await getSubmission(id);
  if (!row) throw new Error("Quote not found.");
  const stage = patch.stage ?? row.stage;
  const status = patch.status ?? statusForStage(stage) ?? row.status ?? "open";
  const next: Submission = {
    ...row,
    ...patch,
    status,
    stage: stage ?? stageForStatus(status),
    deletedAt: status === "deleted" ? row.deletedAt ?? new Date().toISOString() : undefined,
  };
  if (patch.stage && patch.stage !== row.stage) {
    next.activity = logActivity(row, "stage", `Moved to ${patch.stage}.`);
  }
  return saveSubmission(next);
}

export async function purgeQuote(password: string, id: string) {
  await assertAdmin(password);
  const row = await getSubmission(id);
  if (!row) return;
  if (row.status !== "deleted") throw new Error("Delete the quote before purging it.");
  try {
    const store = await blob();
    await store.delete(id);
    if (row.token) await store.delete(`token:${row.token}`);
    for (const photo of row.photos ?? []) await store.delete(photo.key);
    const index = ((await store.get("index", { type: "json" })) as string[] | null) ?? [];
    await store.setJSON("index", index.filter((item) => item !== id));
  } catch {
    const items = (await readFileStore()).filter((item) => item.id !== id);
    await writeFileStore(items);
    for (const photo of row.photos ?? []) {
      await unlink(join(PHOTO_DIR, photo.key)).catch(() => undefined);
    }
  }
}

export async function resendQuote(password: string, id: string) {
  await assertAdmin(password);
  const row = await getSubmission(id);
  if (!row?.quoteInput) throw new Error("This older quote has no saved copy to resend.");
  const { sendBrandedEstimate } = await import("./estimate-mail.server");
  return sendBrandedEstimate({ ...row.quoteInput, id: row.id, email: row.email, name: row.name, phone: row.phone });
}

export async function followUpQuote(password: string, id: string) {
  await assertAdmin(password);
  const row = await getSubmission(id);
  if (!row) throw new Error("Quote not found.");
  if (!row.token) throw new Error("This quote has no customer link yet.");
  const { SITE_URL, EMAIL } = await import("./content");
  const { sendSiteMail } = await import("./mailbox.server");
  const link = `${SITE_URL}/quote/${row.token}`;
  const mailed = await sendSiteMail({
    to: row.email,
    bcc: EMAIL,
    replyTo: EMAIL,
    subject: `Still need Starlink at ${row.address || "your property"}?`,
    text: `Hi ${row.name},\n\nYour VINCONNECT quote ${row.id} is still open.\n\nAdd photos of the house here, no need to enter the quote again:\n${link}\n\nOr call 0408 559 555.\n`,
    html: `<p>Hi ${row.name},</p><p>Your VINCONNECT quote ${row.id} is still open.</p><p><a href="${link}">Open your quote and add photos</a></p><p>Or call 0408 559 555.</p>`,
  });
  await saveSubmission({ ...row, followedUpAt: new Date().toISOString(), stage: row.stage === "won" || row.stage === "lost" ? row.stage : "followup", activity: logActivity(row, "followup", mailed.emailed ? "Follow-up email sent." : "Follow-up saved. Email did not send.", mailed.emailed) });
  return mailed.emailed;
}

export async function sendReferralOffer(password: string, id: string) {
  await assertAdmin(password);
  const row = await getSubmission(id);
  if (!row) throw new Error("Quote not found.");
  if (row.hasKit) throw new Error("This customer already has a kit.");
  const { STARLINK_REFERRAL_URL, REFERRAL_NOTE } = await import("./referral");
  const { EMAIL } = await import("./content");
  const { sendSiteMail } = await import("./mailbox.server");
  const mailed = await sendSiteMail({
    to: row.email,
    bcc: EMAIL,
    replyTo: EMAIL,
    subject: "One month of Starlink service, if you are eligible",
    text: `Hi ${row.name},\n\nIf you still need to order the Starlink kit, this is the VINCONNECT referral link:\n${STARLINK_REFERRAL_URL}\n\n${REFERRAL_NOTE}\n\nThe kit is not free. The offer, when Starlink accepts it, is one month of service credit for an eligible new customer. Order on starlink.com through that link if the credit matters.\n\nVINCONNECT can still install it. Call 0408 559 555.\n`,
    html: `<p>Hi ${row.name},</p><p>If you still need to order the Starlink kit, use the VINCONNECT referral link:</p><p><a href="${STARLINK_REFERRAL_URL}">Check the one-month Starlink offer</a></p><p>${REFERRAL_NOTE}</p><p>The kit is not free. When Starlink accepts the offer, it is one month of service credit for an eligible new customer.</p><p>VINCONNECT can still install it. Call 0408 559 555.</p>`,
  });
  await saveSubmission({
    ...row,
    activity: logActivity(row, "referral", mailed.emailed ? "Referral offer emailed." : "Referral offer was not emailed.", mailed.emailed),
  });
  if (!mailed.emailed) throw new Error("The referral email did not send. Call 0408 559 555.");
  return { emailed: true as const };
}

function stageForStatus(status?: QuoteStatus): PipelineStage {
  if (status === "won") return "won";
  if (status === "lost") return "lost";
  return "new";
}

function statusForStage(stage?: PipelineStage): QuoteStatus | undefined {
  if (stage === "won") return "won";
  if (stage === "lost") return "lost";
  if (stage) return "open";
  return undefined;
}

function logActivity(row: Submission, kind: string, detail: string, emailed?: boolean): QuoteActivity[] {
  return [...(row.activity ?? []), { at: new Date().toISOString(), kind, detail, emailed }].slice(-40);
}
