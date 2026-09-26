import { assertAdmin } from "./admin-auth.server";

export type MediaDraft = {
  id: string;
  createdAt: string;
  title: string;
  place: string;
  url: string;
  caption: string;
  status: "draft" | "posted";
};

async function store() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("vinconnect-media");
}

export async function listMedia(password: string) {
  await assertAdmin(password);
  const blob = await store();
  const index = ((await blob.get("index", { type: "json" })) as string[] | null) ?? [];
  const rows = await Promise.all(index.map(async (id) => (await blob.get(id, { type: "json" })) as MediaDraft | null));
  return rows.filter((row): row is MediaDraft => Boolean(row));
}

export async function saveMedia(password: string, item: MediaDraft) {
  await assertAdmin(password);
  const blob = await store();
  await blob.setJSON(item.id, item);
  const index = ((await blob.get("index", { type: "json" })) as string[] | null) ?? [];
  await blob.setJSON("index", [item.id, ...index.filter((id) => id !== item.id)].slice(0, 200));
  return item;
}
