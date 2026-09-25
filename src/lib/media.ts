import { createServerFn } from "@tanstack/react-start";
import type { MediaDraft } from "./media.server";

export type { MediaDraft };

export const listMediaDrafts = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { listMedia } = await import("./media.server");
    return listMedia(data.password);
  });

export const saveMediaDraft = createServerFn({ method: "POST" })
  .validator((input: { password: string; draft: MediaDraft }) => input)
  .handler(async ({ data }) => {
    const { saveMedia } = await import("./media.server");
    return saveMedia(data.password, data.draft);
  });
