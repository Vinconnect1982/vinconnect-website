import assert from "node:assert/strict";
import test from "node:test";
import { assertAdmin, changeAdminPassword, checkNewPassword, clearAdminPassword, issueSession, sessionEmail } from "./admin-auth.server.ts";

test("a short password is refused", () => {
  assert.throws(() => checkNewPassword("short"), /10 characters/);
});

test("spaces are refused", () => {
  assert.throws(() => checkNewPassword("long enough phrase"), /spaces/);
});

test("a google session is only valid for the allowed account", () => {
  const secret = "test-secret-value";
  const token = issueSession("vince@vinconnect.com.au", secret);
  assert.equal(sessionEmail(token, secret), "vince@vinconnect.com.au");
  assert.equal(sessionEmail(token, "other-secret"), null);
  assert.equal(sessionEmail("not-a-session", secret), null);
});

test("a saved password replaces the Netlify password until it is cleared", async () => {
  const current = (process.env.ADMIN_PASSWORD || "VC-quotes-2026-k7").trim();
  const next = "harbour-gate-19";
  try {
    const result = await changeAdminPassword(current, next);
    assert.equal(result.session, next);
    await assertAdmin(next);
    await assert.rejects(() => assertAdmin(current), /not right/);
  } finally {
    await clearAdminPassword(next).catch(() => undefined);
  }
  await assertAdmin(current);
});
