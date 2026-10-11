# Image Pipeline — Cloudinary

## Why Cloudinary

- Free tier: 25 GB storage / 25 GB bandwidth per month — plenty for 400 items.
- Automatic WebP/AVIF delivery (`f_auto`) + responsive resizing (`w_`/`h_`/`c_fill`).
- Airtable free tier caps attachments at 1 GB/base; delivery URLs keep Airtable light.

## OPERATOR — Setup (one-time)

1. Create a Cloudinary account → note the **Cloud Name**.
2. Create a **restricted/signed upload preset** (Settings → Upload → Add upload preset):
   - Signing Mode: **Signed** (never unsigned/open)
   - Folder: `sale-catalog` (or per-batch folders like `sale-catalog/launch`)
   - Auto-tagging: optional
3. Upload existing `public/photos/*` via the preset (signed uploads use the API secret server-side).
4. Copy each delivery URL
   (`https://res.cloudinary.com/<cloud>/image/upload/<folder>/<publicId>`)
   into Airtable `image_url` for the launch-subset items.

## Naming

- Public id: keep the source filename slug, e.g. `whatsapp-01` → `sale-catalog/whatsapp-01`.
- Never include spaces or non-ASCII characters in public ids.

## Delivery URLs (client)

`src/lib/cloudinary.js` exports `cldUrl(url, { w, h, crop, quality, format })`:

- Injects transformation params **only** for real Cloudinary delivery URLs
  (`res.cloudinary.com` + `/image/upload/`).
- Local paths (`/photos/...`), empty strings, and `undefined` pass through
  untouched → the glyph fallback keeps working.
- `ProductMedia.jsx` builds `srcSet` (400/800/1200) + `sizes` when the image
  is Cloudinary-backed; non-Cloudinary items render exactly as before.

## Rules

- **Never an open unsigned upload preset.** A public unsigned preset lets
  anyone upload to your account (storage abuse + malicious content).
- **Never put the API secret in client code.** Only the public cloud name is
  safe in the bundle.
- **Keep the glyph fallback path** (`<Plate>`) — items without `image_url`
  still render.