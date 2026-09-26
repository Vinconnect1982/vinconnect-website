import { createHmac, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { GOOGLE_ACCOUNT, GOOGLE_CLIENT_ID } from "./google-client.ts";

export { GOOGLE_ACCOUNT, GOOGLE_CLIENT_ID };

const ALLOWED = new Set([GOOGLE_ACCOUNT]);
const FILE = "/tmp/vinconnect-admin-gate.json";
const MIN = 10;

type Gate = { password?: string; updatedAt?: string };

function fallback() {
  return (process.env.ADMIN_PASSWORD || "VC-quotes-2026-k7").trim();
}

function same(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function blobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("vinconnect-admin");
}

async function readGate(): Promise<Gate | null> {
  try {
    const saved = (await (await blobStore()).get("gate", { type: "json" })) as Gate | null;
    return saved?.password ? saved : null;
  } catch {
    try {
      const parsed = JSON.parse(await readFile(FILE, "utf8")) as Gate;
      return parsed?.password ? parsed : null;
    } catch {
      return null;
    }
  }
}

async function writeGate(gate: Gate | null) {
  try {
    const store = await blobStore();
    if (!gate?.password) await store.delete("gate").catch(() => undefined);
    else await store.setJSON("gate", gate);
    return;
  } catch {
    /* Local preview has no blob site. The file below keeps the password for this machine. */
  }
  if (!gate?.password) {
    await unlink(FILE).catch(() => undefined);
    return;
  }
  await mkdir(dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(gate));
}

export async function adminSecret() {
  const gate = await readGate();
  const custom = Boolean(gate?.password && gate.password.trim().length >= MIN);
  return { secret: custom ? gate!.password!.trim() : fallback(), custom };
}

export function checkNewPassword(next: string) {
  const value = next.trim();
  if (value.length < MIN) throw new Error("Use at least 10 characters.");
  if (value.length > 80) throw new Error("That password is too long.");
  if (/\s/.test(value)) throw new Error("Leave spaces out of the password.");
  return value;
}

export function issueSession(email: string, secret: string) {
  const body = Buffer.from(JSON.stringify({ email, exp: Date.now() + 12 * 60 * 60 * 1000 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function sessionEmail(token: string, secret: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  if (!same(sig, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as { email?: string; exp?: number };
    if (!parsed.email || !parsed.exp || parsed.exp < Date.now()) return null;
    if (!ALLOWED.has(parsed.email)) return null;
    return parsed.email;
  } catch {
    return null;
  }
}

export async function assertAdmin(password: string) {
  const given = password.trim();
  if (!given) throw new Error("That password is not right.");
  const { secret } = await adminSecret();
  if (same(given, secret) || sessionEmail(given, secret)) return;
  throw new Error("That password is not right.");
}

export async function signInWithGoogle(idToken: string) {
  const token = idToken.trim();
  if (token.length < 20 || token.length > 4000) throw new Error("Google did not return a sign-in.");
  const response = await fetch("https://oauth2.googleapis.com/tokeninfo", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ id_token: token }),
  });
  if (!response.ok) throw new Error("Google could not confirm that sign-in.");
  const data = (await response.json()) as { aud?: string; email?: string; email_verified?: string | boolean; exp?: string };
  if (data.aud !== GOOGLE_CLIENT_ID) throw new Error("That Google sign-in is for a different app.");
  if (String(data.email_verified) !== "true") throw new Error("That Google account is not verified.");
  const email = (data.email ?? "").trim().toLowerCase();
  if (!ALLOWED.has(email)) throw new Error("Only vince@vinconnect.com.au can open the control room.");
  const exp = Number(data.exp ?? 0) * 1000;
  if (!exp || exp < Date.now()) throw new Error("That Google sign-in has expired. Try again.");
  const { secret } = await adminSecret();
  return { email, session: issueSession(email, secret) };
}

export async function changeAdminPassword(session: string, next: string) {
  await assertAdmin(session);
  const value = checkNewPassword(next);
  const current = await adminSecret();
  if (same(value, current.secret)) throw new Error("That is already the password.");
  await writeGate({ password: value, updatedAt: new Date().toISOString() });
  return { ok: true as const, session: value };
}

export async function clearAdminPassword(session: string) {
  await assertAdmin(session);
  await writeGate(null);
  return { ok: true as const };
}

export async function adminAccess(session: string) {
  await assertAdmin(session);
  const gate = await adminSecret();
  const email = sessionEmail(session.trim(), gate.secret);
  return {
    googleAccount: GOOGLE_ACCOUNT,
    passwordSavedHere: gate.custom,
    signedInWith: email ? ("google" as const) : ("password" as const),
  };
}
