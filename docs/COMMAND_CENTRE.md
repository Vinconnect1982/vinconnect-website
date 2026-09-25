# VINCONNECT Command Centre

Internal build plan. This file is not a public website page.

## Decision

Command Centre is the existing website admin at `/admin`, extended until it is the one working desk. Do not create a fifth app. Do not replace production `main` until a Netlify preview of branch `command-centre` has been checked.

The public site and this admin share `Vinconnect1982/vinconnect-website`. Netlify project for that site is the one serving `vinconnect.com.au`. As of 25 September 2026 the live `/admin` was still build `2026-09-23-mail` (old quotes table). Newer admin code is on `main` and had not been published.

## What already exists

| System | Code | Data | Live |
| --- | --- | --- | --- |
| Public website and quotes | `vinconnect-website` | Netlify Blobs store `vinconnect-submissions`, plus quote photos | `https://vinconnect.com.au` |
| Private website source | `vinconnect-website-source` | Same app, private | Not the production publisher |
| Media Hub | `vinconnect-media-hub` | SQLite in Netlify Blobs on site `vinconnect-media`. Articles, assets, templates, social publication rows | `https://vinconnect-media.netlify.app` |
| ChatGPT Media Hub | same repo, vinext path | Cloudflare D1, not copied | `https://vinconnect-media.fgymjki.chatgpt.site` |
| VinGear War Room | `vingear-war-room` | JSON in `data/`, images in Google Drive | `https://vingear-war-room.netlify.app` |
| Finance | no separate repo | Website admin only sums saved quote totals. War Room JSON has commercial research, not accounts | none |

## Assumptions

- Netlify Blobs stay the quote database until a Postgres project is approved. Blobs already hold the real quotes. A deploy is not the database. The blob store is.
- One shared dashboard password remains until Google sign-in is connected. Do not invent a password store.
- Media Hub and War Room stay their own deploys in the first stages. Command Centre links to the real apps. It does not copy a thinner version over them.
- No bank, Xero, or Dropbox connection exists yet. Finance figures that are not saved quote totals must not be shown.
- Anonymous PDF downloads are not leads.
- AI may draft. It may not send, publish, delete, reprice, or commit to a supplier.

## Sequence

1. Publish the current website `main` to a Netlify preview, not over the live domain, and confirm `/admin` refresh works.
2. Widen quote records on the existing blob store: source, product, pipeline status, activity, follow-up date. Keep old quotes readable.
3. Add the pipeline actions already required: follow-up template, kit/referral email only after the live Starlink link is confirmed, won becomes a job. Test one real quote.
4. Link Media Hub and War Room from the same login shell. Read their real records. Do not iframe them.
5. Add Google sign-in and roles. Remove the shared password only after Vince can sign in.
6. Asset sync to the existing Drive restore folder. Dropbox waits until that connector is available.
7. Switch production `/admin` only after the preview path works: form, photo, quote, email, won, job.

## Protected

- Do not force-push `main`.
- Do not change DNS.
- Do not print customer records, passwords, or supplier prices into a public page.
- Do not invent project photos or hardware.
- Rollback is the previous published Netlify deploy of `vinconnect.com.au`.
