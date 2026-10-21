# Launch Runbook — Publish Today

> **Goal:** ship **Acervo do Marvete** to production today.
> **Owner:** operator. Every step is either a Cloudflare dashboard click or a shell command.
> **Related:** `docs/deploy.md` (full reference), `docs/admin.md`, `docs/brand-and-social-setup.md`, `docs/content-calendar-30d.md`.

---

## Where we are

### Already shipped — nothing left to build

- Per-product SEO pages at `/produto/<slug>/` (prerendered static HTML, one `<title>`, one canonical, full `og:`/`twitter:` set, Product JSON-LD).
- `sitemap.xml` (all live products) + `robots.txt` with `Sitemap:`.
- Baseline homepage meta (title, description, canonical, OG, Twitter card).
- Slug assignment shared between client and prerender (collision-safe, `-2`/`-3` suffixes, unicode-safe decoding).
- Real brand name **"Acervo do Marvete"**, real WhatsApp number (`+55 51 8500-0282`), real contact email.
- `/admin` web UI + `/api/admin/*` Pages Functions (Cloudinary signed upload, Airtable write, deploy hook).
- 30-day social content calendar (`docs/content-calendar-30d.md`).
- **47/47 tests passing**, `npm run build` exits `0`, 6 product pages prerendered.
- Fail-loud build guard that works on Cloudflare Pages (`22f52f5`).

### Critical path

| # | Step | Time | Blocks launch? |
|---|------|------|----------------|
| 0 | Push 38 commits to GitHub | 2 min | **YES — nothing deploys without it** |
| 1 | Create Pages project + set env vars | 25 min | no |
| 2 | First deploy + verify | 15 min | no |
| 3 | Custom domain `acervodomarvete.com.br` | 15 min + **up to a few hours propagation** | **YES for the final URL** |
| 4 | Cloudflare Access for `/admin` + `/api/admin` | 15 min | no (but do it today) |
| 5 | Google Search Console + sitemap | 10 min | no |
| 6 | Social renames + first post | 25 min | no |

> ⚠️ **Step 3 is the only thing that can slip past end of day** — DNS propagation is outside your control.
> Read ["If the domain can't be live yet"](#if-the-domain-cant-be-live-yet) before you panic.

---

## Step 0 — Push to GitHub (2 min)

Everything is **local right now**: `main` is ahead of `origin/main` by **38 commits**. Cloudflare Pages builds from GitHub, so nothing ships until this lands.

```bash
cd /home/mathew/BCP/60-69_Projects_&_Goals/67-Current/67.18-Sale-Catalog-Site
git push origin main
```

**Verify:**

```bash
git status -sb | head -1     # expect: ## main...origin/main  (no "[ahead N]")
git log --oneline origin/main..main   # expect: empty
```

> Two auto-refreshed `codemap.md` files and `.slim/codemap.json` are still uncommitted.
> Commit or discard them — they are **not** required to launch.

---

## Step 1 — Create the Pages project (25 min)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select **`nicounii/collections-catalog`**.
3. **Build settings** (must match exactly):
   - Framework preset: **None**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Root directory: `/`
4. **Environment variables** → **Settings → Environment variables** → set for **both Production and Preview**:

| Variable | Type | Value |
|----------|------|-------|
| `NODE_VERSION` | Plain | `22` |
| `AIRTABLE_TOKEN` | **Secret** | Airtable personal access token (read scope) |
| `AIRTABLE_BASE_ID` | **Secret** | e.g. `appXXXXXXXXXXXXXX` |
| `AIRTABLE_TABLE` | Plain | `Catalog` |
| `VITE_SITE_URL` | Plain | `https://acervodomarvete.com.br` |
| `ENVIRONMENT` | Plain | `production` |
| `CLOUDINARY_CLOUD_NAME` | Plain | your cloud name |
| `CLOUDINARY_UPLOAD_PRESET` | Plain | restricted/signed preset |
| `CLOUDINARY_API_KEY` | Plain | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | **Secret** | Cloudinary API secret |
| `CLOUDINARY_FOLDER` | Plain | `sale-catalog` |
| `DEPLOY_HOOK_URL` | **Secret** | Pages Deploy Hook URL (create in Step 4) |
| `MP_ACCESS_TOKEN` | **Secret** | Mercado Pago (only if enabling checkout today) |
| `MP_WEBHOOK_SECRET` | **Secret** | Mercado Pago (only if enabling checkout today) |

> 🚨 **`ENVIRONMENT` must be `production` — never `development`.** See [Step 4](#step-4--cloudflare-access-15-min).
>
> The local `.env` is an unfilled template. Copy values from it into the **dashboard** — Pages does not read `.env`.

5. Save. **First build starts automatically.**

> **If the build fails:** the fail-loud guard (`22f52f5`) means either `AIRTABLE_TOKEN`/`AIRTABLE_BASE_ID`
> is missing, or the sync returned 0 items. Check **Build logs** → `prebuild` output for the exact reason.

---

## Step 2 — First deploy + verify (15 min)

Grab the `*.pages.dev` URL from **Deployments**, then run:

```bash
BASE=https://<your-project>.pages.dev

curl -sI "$BASE/"                        | head -1        # HTTP/2 200
curl -sI "$BASE/admin"                   | head -1        # HTTP/2 200  (SPA)
curl -sI "$BASE/produto/hq-001/"         | head -1        # HTTP/2 200
curl -s  "$BASE/produto/hq-001/" | grep -c 'rel="canonical"'   # 1
curl -s  "$BASE/sitemap.xml"  | grep -c '<loc>'                # = live products + 1
curl -s  "$BASE/robots.txt"                                   # has Sitemap: line
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/api/admin/listings"   # 401
```

Every line above is a **launch gate** — see the [checklist](#launch-gate) at the bottom.

---

## Step 3 — Domain (⚠️ critical path)

### Status right now: the domain does not resolve

```
$ getent hosts acervodomarvete.com.br
NO A RECORD / not resolving
$ curl -sI https://acervodomarvete.com.br
000   (unreachable)
```

**Do this regardless** (it's needed for Option A and B):

1. Cloudflare dashboard → **Workers & Pages** → your project → **Custom domains** → **Set up a custom domain** → enter `acervodomarvete.com.br` (repeat for `www` if wanted).
2. Cloudflare shows you two **nameservers** (e.g. `alice.ns.cloudflare.com`).

**Option A — domain already registered at Registro.br:**
1. Log in to Registro.br → **DNS Servers** → replace Registro.br's with the two Cloudflare nameservers.
2. Wait for propagation. With Cloudflare NS this is usually **minutes to ~1 hour**, but can take up to 24h.
3. Verify: `getent hosts acervodomarvete.com.br` starts returning Cloudflare IPs.
4. HTTPS is issued automatically — no cert work needed.

**Option B — domain not registered yet:**
Register it first (~R$40/year at Registro.br). This is the step most likely to not finish today. Ship on `*.pages.dev` in the meantime and flip the domain when it resolves.

### ⚠️ If the domain can't be live yet

Your canonical, OG URLs, `sitemap.xml`, and `robots.txt` **all hardcode `https://acervodomarvete.com.br`**. If you publish only on `*.pages.dev`, search engines will see pages whose canonical points to a **non-resolving domain** — they will effectively ignore the site until the domain is up.

Two safe choices:

- **Preferred:** hold the public announcement until the domain resolves. The pages.dev deployment is fine to test/share privately.
- **If you must publish today:** temporarily set `VITE_SITE_URL=https://<your-project>.pages.dev` in the Pages env vars and redeploy, then set it back to `https://acervodomarvete.com.br` once DNS resolves. Expect one extra rebuild each way.

---

## Step 4 — Cloudflare Access (15 min)

The `/admin` UI is a static SPA page, so it loads for anyone. Its API is **fail-closed** by default:

```js
// functions/api/admin/_lib.js:95-104
export function requireAccess(request, env) {
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  if (email && email.trim() !== '') return true;
  if (env && env.ENVIRONMENT === 'development') return true;  // ← 🚨
  return false;                                               // → 401
}
```

### 🚨 Do NOT set `ENVIRONMENT=development` in Pages

If you do, that line makes the admin API return `true` for **every** request — **anyone could write to your Airtable base**. Set `ENVIRONMENT=production`. It is currently unset locally (safe), but set it explicitly so nobody "fixes" it later.

### Configure Access

1. **Zero Trust** → **Access** → **Applications** → **Add an application** → **Self-hosted**.
2. **App 1 (UI):** domain `<your-domain>/admin`, add an Access policy requiring your operator email (One-Time PIN / OTP).
3. **App 2 (API):** domain `<your-domain>/api/admin`, **same** policy.

   > ⚠️ App 2 is **not optional**. The functions do no JWT verification of their own — they only read the
   > `Cf-Access-Authenticated-User-Email` header that Access injects. If `/api/admin` is not behind Access,
   > anyone hitting it with that header set could write to your base.

4. **Create the Deploy Hook** (Settings → **Builds & deployments** → **Deploy hooks** → branch `main`) and paste the URL into the `DEPLOY_HOOK_URL` secret.

**Verify** (before Access: `401`; after Access: `302` to the login page — both are correct):

```bash
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/api/admin/listings"
```

---

## Step 5 — SEO (10 min)

1. **Google Search Console** → add property for `https://acervodomarvete.com.br` → verify via DNS TXT record.
2. **Sitemaps** → submit `https://acervodomarvete.com.br/sitemap.xml`.
3. **URL Inspection** → request indexing for `https://acervodomarvete.com.br/` and one product page.
4. Optional but recommended: **Bing Webmaster Tools** (same sitemap).
5. Spot-check product schema: a product page's `<script type="application/ld+json">` should parse and show a `Product` object.

> Skip this until the domain resolves — GSC can't verify a domain that doesn't exist.

---

## Step 6 — Social (25 min)

1. Rename **Instagram** and **Facebook** to **Acervo do Marvete** — exact steps and bio copy in `docs/brand-and-social-setup.md`.
2. Publish **Day 1** post from `docs/content-calendar-30d.md`.
3. Pin a post linking to the live site.
4. Update your WhatsApp profile with the site link.

---

## Launch gate

All must be true before you announce publicly:

- [ ] `git push origin main` — no `[ahead N]` remaining
- [ ] Pages build **succeeded** (build log shows `prerendered N product pages`)
- [ ] `curl -sI "$BASE/"` → `200`
- [ ] `curl -sI "$BASE/produto/<any-slug>/"` → `200`
- [ ] Each product page has **exactly 1** `rel="canonical"`
- [ ] `"$BASE/sitemap.xml"` lists every live product
- [ ] `"$BASE/robots.txt"` contains a `Sitemap:` line
- [ ] `"$BASE/api/admin/listings"` → `401` (or `302` once Access is on)
- [ ] `ENVIRONMENT=production` is set in Pages (**not** `development`)
- [ ] `acervodomarvete.com.br` resolves **and** `curl -sI http://acervodomarvete.com.br` → `301/308` to `https://`

---

## Rollback

Cloudflare Pages keeps every deployment.

```bash
npx wrangler pages deployment list --project-name acervo-do-marvete
npx wrangler pages deployment rollback <DEPLOYMENT_ID> --project-name acervo-do-marvete
```

Or dashboard → **Deployments** → pick last good → **⋯ → Rollback**.
Rollback never touches Airtable or Mercado Pago — it only swaps the served build.

---

## After launch (this week)

- Rename IG/FB → **Acervo do Marvete** (if not done).
- Work the 30-day calendar: `docs/content-calendar-30d.md`.
- Submit listings via `/admin` → `docs/listing-sop.md` (≤60s per item).
- Turn on **Cloudflare Access** first if you skipped it — do not leave `/admin` unprotected with `ENVIRONMENT=development`.
- Mercado Pago checkout is **not** wired up (no webhook function exists yet). The `MP_*` env vars are optional until you build it.
