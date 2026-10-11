# Deploy — Cloudflare Pages + Registro.br

Hosting for **Acervo do Marvete**: Vite + React 19 + Tailwind 4 static build on
Cloudflare Pages, custom `.com.br` domain from Registro.br, HTTPS automatic.

---

## 1. Cloudflare Pages — connect the repo (OPERATOR, one-time)

1. Log in to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**
   → **Connect to Git**.
2. Authorize GitHub and select the repo `nicounii/collections-catalog`.
3. Build settings:
   - **Framework preset:** None (Vite is detected; keep it explicit)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (repo root)
   - **Node version:** set the env var `NODE_VERSION = 22` (Pages defaults to an older
     Node; the sync script and Vite 6 need Node 22+).
4. **Environment variables** (Settings → Environment variables) — see §2.
5. Save and deploy. The first build produces a `*.pages.dev` preview URL.

> `wrangler.toml` in the repo declares `pages_build_output_dir = "dist"` and the
> project name. It contains **no secrets** — secrets live only in the dashboard.

---

## 2. Environment variables

Set these in **Pages → Settings → Environment variables** for **both** Production and
Preview. Copy the names from `.env.example`.

### Build-time (required — the `prebuild` sync reads them)

| Variable | Scope | Notes |
|----------|-------|-------|
| `AIRTABLE_TOKEN` | secret | Personal access token, **read** scope on the base |
| `AIRTABLE_BASE_ID` | secret | e.g. `appXXXXXXXXXXXXXX` |
| `AIRTABLE_TABLE` | plain | Table name (default `Catalog`) |
| `NODE_VERSION` | plain | `22` |

If `AIRTABLE_TOKEN`/`AIRTABLE_BASE_ID` are **absent**, the build falls back to
`src/data/products.sample.json` and exits `0`. If they are **present but the API fails**,
or a production sync returns **0 items**, the build **fails** (exit `1`) — see the
fail-loud policy in `README.md`.

### Server-time (Task 6B — webhook, once built)

| Variable | Scope | Notes |
|----------|-------|-------|
| `MP_ACCESS_TOKEN` | secret | Mercado Pago access token (server only) |
| `MP_WEBHOOK_SECRET` | secret | HMAC secret for `x-signature` verification |

Set these with the dashboard, or:

```bash
npx wrangler pages secret put MP_ACCESS_TOKEN --project-name acervo-do-marvete
npx wrangler pages secret put MP_WEBHOOK_SECRET --project-name acervo-do-marvete
```

### Not needed at runtime

`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_UPLOAD_PRESET` are **operator reference only** —
image delivery URLs come from Airtable (`image_url`), so the app never reads them.
No `VITE_`-prefixed variables exist: nothing secret is exposed to the browser bundle.

---

## 3. Domain — Registro.br `.com.br` (OPERATOR, one-time)

1. Register the domain at **Registro.br** (e.g. `acervodomarvete.com.br`, ~R$40/year).
2. In Registro.br, set the **DNS servers** to the two Cloudflare nameservers shown in
   the Cloudflare dashboard (Cloudflare → your domain → **Nameservers**).
   - Alternative: keep Registro.br DNS and add a `CNAME` to the `*.pages.dev` host,
     but full Cloudflare DNS is simpler and gives free HTTPS + proxy.
3. In **Pages → Custom domains**, add `acervodomarvete.com.br` (and `www` if wanted).
   Cloudflare issues the TLS certificate automatically — **HTTPS is on by default**.
4. Wait for DNS propagation (minutes to a few hours). Verify with §5.

---

## 4. Rollback

Cloudflare Pages keeps every deployment. To roll back:

1. **Dashboard:** Pages → your project → **Deployments** → pick the last known-good
   deployment → **⋯ → Rollback to this deployment**.
2. **CLI:**
   ```bash
   npx wrangler pages deployment list --project-name acervo-do-marvete
   npx wrangler pages deployment rollback <DEPLOYMENT_ID> --project-name acervo-do-marvete
   ```
3. **Code-level:** revert the offending commit on `main` and push — Pages rebuilds and
   redeploys automatically.

Rollback never touches Airtable or Mercado Pago state; it only swaps the served build.

---

## 5. Verify

- [ ] Pages build succeeds; the `*.pages.dev` preview URL serves the site.
- [ ] `curl -sI https://<preview>.pages.dev/` → `HTTP/2 200`.
- [ ] The catalog renders (items from Airtable, or the sample fallback if no creds).
- [ ] Production domain `https://acervodomarvete.com.br/` → `200` over HTTPS.
- [ ] `curl -sI http://acervodomarvete.com.br/` redirects to `https://` (301/308).
