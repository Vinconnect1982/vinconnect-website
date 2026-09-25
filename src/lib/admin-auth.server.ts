import { createHmac, timingSafeEqual } from "node:crypto";
import { GOOGLE_CLIENT_ID } from "./google-client";

export { GOOGLE_CLIENT_ID };

const ALLOWED = new Set(["vince@vinconnect.com.au"]);

function secret() {
  return process.env.ADMIN_PASSWORD || "VC-quotes-2026-k7";
}

export function acceptsAdmin(password: string) {
  const expected = secret();
  const left = Buffer.from(password);
  const right = Buffer.from(expected);
  if (left.length === right.length && timingSafeEqual(left, right)) return true;
  return readSession(password) !== null;
}

export async function signInWithGoogle(idToken: string) {
  const token = idToken.trim();
  if (token.length < 20 || token.length > 4000) throw new Error("Google did not return a sign-in.");
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
  if (!response.ok) throw new Error("Google could not confirm that sign-in.");
  const data = (await response.json()) as { aud?: string; email?: string; email_verified?: string | boolean; exp?: string };
  if (data.aud !== GOOGLE_CLIENT_ID) throw new Error("That Google sign-in is for a different app.");
  if (String(data.email_verified) !== "true") throw new Error("That Google account is not verified.");
  const email = (data.email ?? "").trim().toLowerCase();
  if (!ALLOWED.has(email)) throw new Error("That Google account is not allowed into the Command Centre.");
  const exp = Number(data.exp ?? 0) * 1000;
  if (!exp || exp < Date.now()) throw new Error("That Google sign-in has expired. Try again.");
  return { email, session: issueSession(email) };
}

function issueSession(email: string) {
  const body = Buffer.from(JSON.stringify({ email, exp: Date.now() + 12 * 60 * 60 * 1000 })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function readSession(token: string) {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as { email?: string; exp?: number };
    if (!parsed.email || !parsed.exp || parsed.exp < Date.now()) return null;
    if (!ALLOWED.has(parsed.email)) return null;
    return parsed.email;
  } catch {
    return null;
  }
}
