import { createServerFn } from "@tanstack/react-start";
import type { QuoteStatus, Submission } from "./submissions.server";

export type { Submission };

export const findQuote = createServerFn({ method: "POST" })
  .validator((input: { code?: string; email?: string; address?: string }) => input)
  .handler(async ({ data }) => {
    const { findSubmission, publicQuote } = await import("./submissions.server");
    const row = await findSubmission(data);
    if (!row || row.kind !== "quote") return { found: false as const };
    return { found: true as const, quote: publicQuote(row) };
  });

export const openQuoteLink = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data }) => {
    const { findByToken, publicQuote } = await import("./submissions.server");
    const row = await findByToken(data);
    if (!row) return { found: false as const };
    return { found: true as const, quote: publicQuote(row) };
  });

export const uploadQuotePhoto = createServerFn({ method: "POST" })
  .validator((input: { token: string; name: string; type: string; base64: string }) => input)
  .handler(async ({ data }) => {
    const { addQuotePhoto } = await import("./submissions.server");
    const photoCount = await addQuotePhoto(data.token, data);
    return { photoCount };
  });

export const listQuotes = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { listSubmissions } = await import("./submissions.server");
    return listSubmissions(data.password);
  });

export const setQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string; status?: QuoteStatus; note?: string; name?: string; email?: string; phone?: string }) => input)
  .handler(async ({ data }) => {
    const { updateQuote } = await import("./submissions.server");
    const { password, id, ...patch } = data;
    return updateQuote(password, id, patch);
  });

export const removeQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { purgeQuote } = await import("./submissions.server");
    await purgeQuote(data.password, data.id);
    return { ok: true as const };
  });

export const resendSavedQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { resendQuote } = await import("./submissions.server");
    return resendQuote(data.password, data.id);
  });

export const followSavedQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { followUpQuote } = await import("./submissions.server");
    const emailed = await followUpQuote(data.password, data.id);
    return { emailed };
  });
