import { mkdir, readFile, writeFile } from "node:fs/promises";
import { timingSafeEqual } from "node:crypto";
import { dirname } from "node:path";

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
};

const FILE = "/tmp/vinconnect-submissions.json";

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

export async function saveSubmission(item: Submission) {
  const record = { ...item, email: item.email.trim().toLowerCase() };
  try {
    const store = await blob();
    await store.setJSON(record.id, record);
    const index = ((await store.get("index", { type: "json" })) as string[] | null) ?? [];
    await store.setJSON("index", [record.id, ...index.filter((id) => id !== record.id)].slice(0, 400));
    return true;
  } catch (error) {
    console.error("submission blob failed", error instanceof Error ? error.message : error);
    const items = await readFileStore();
    await writeFileStore([record, ...items.filter((row) => row.id !== record.id)]);
    return true;
  }
}

export async function listSubmissions(password: string) {
  assertAdmin(password);
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
  const rows = await listAll();
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

function assertAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("The dashboard is not switched on.");
  const left = Buffer.from(password);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    throw new Error("That password is not right.");
  }
}
