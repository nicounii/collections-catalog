# Admin Operational Guide (`/admin`)

The `/admin` interface allows operators to manage listings directly from any device (phone, tablet, or desktop) without needing to manually open Airtable. Behind the scenes, the admin UI talks to serverless API functions (`/api/admin/...`) that write directly to your Airtable `Catalog` table and automatically trigger a Cloudflare Pages rebuild.

---

## 1. Accessing `/admin`

1. Open your browser and navigate to `https://<your-domain>/admin`.
2. Cloudflare Access will prompt you for your authorized operator email address and send a One-Time PIN (OTP). Enter the code to log in.
3. Once authenticated, the mobile-first admin dashboard loads.

---

## 2. Adding a Listing

1. **Photo Upload:** Tap **Upload Photo** to select an image from your device or camera. The app securely fetches a signed signature from `/api/admin/sign-upload` and uploads the image directly to Cloudinary (`CLOUDINARY_FOLDER=sale-catalog`), returning the public delivery URL.
2. **Fill Required Fields:**
   - **ID:** Unique slug / identifier (e.g. `hq-042`).
   - **Title:** Item title as displayed in the catalog.
   - **Category:** Select from categories (Quadrinhos, Marvel Comics, DC Comics, Novidades, Action Figures, Retro Gaming, Livros de Coleção).
   - **Price:** Final price in BRL (e.g. `149.90`).
   - **Status:** `available`, `reserved`, or `sold`.
3. **Optional / Quick Fields:**
   - **Rank:** Numeric sorting order (`rank`). Defaults to `0`. Higher numbers sort higher in the catalog.
   - **Featured (Destaque):** Check to highlight the item in the storefront.
   - **Condition / Notes / Maker / Alt Text:** Additional details, flaws, and provenance.
4. **Publish:** Tap **Publicar**. The API writes the new row to Airtable and automatically fires your Cloudflare **Deploy Hook** (`DEPLOY_HOOK_URL`) to trigger a site rebuild.

---

## 3. Quick Actions & Management

- **Status & Featured toggles:** Directly change an item's status (`available` / `reserved` / `sold`) or toggle featured status right from the listing list view.
- **Rank Reordering:** Edit the `rank` field on any listing to control its custom priority ordering in the catalog (`sync-catalog.mjs` sorts descending by `rank`, then by numeric/string ID).
- **Publish Latency:** Because updates trigger a static site rebuild via Cloudflare Pages, changes typically go live on the public storefront within **1–2 minutes**.

---

## 4. Airtable Schema Requirement

Ensure your Airtable `Catalog` table includes the **`rank`** field:
- **Field Name:** `rank`
- **Type:** Number (integer or decimal, optional)
- **Default:** `0` (unsorted items default to 0; catalog sync handles sorting cleanly).
