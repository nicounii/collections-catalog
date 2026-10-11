# Business Plan — Collections Catalog

> **Status:** Draft v0.1 — living document. Update monthly for the first 6 months.
> **Owner:** Mathew (+ partner) · **Date:** 2026-10-11
> **Repo:** `collections-catalog` (private) · **Local site:** `67.18-Sale-Catalog-Site`
>
> **How to read this:** every unverified assumption is marked `[ASSUMPTION]` or `[VERIFY]`.
> When reality proves one right or wrong, update it and note what changed.

---

## 1. Executive Summary

*(Written last, placed first.)*

**What it is:** An online store that liquidates a single, curated, inherited collection of **400+ collectibles** — HQs, mangás, action figures, retro games, and collector books — run by two people (Mathew + girlfriend) and promoted through Instagram and Facebook pages.

**The problem:** Individual sellers with large one-off collections have no fast, trustworthy way to show and sell hundreds of unique items. Marketplace listings are slow, fee-heavy (Mercado Livre charges ~12–19% in commission), and give no unified brand. Buyers can't easily browse such a collection, can't confirm condition, and worry about trust when paying a stranger.

**The solution:** A fast, brand-owned catalog that (a) can be **filled from a phone in ≤60 seconds per item** through a spreadsheet-style back office, (b) presents every item with condition/edition transparency that builds buyer trust, and (c) closes the sale with **instant checkout (Pix/cartão via Mercado Pago)** — with a **"negotiate on WhatsApp"** fallback for high-value items. Distribution is social-first: Instagram/Facebook → catalog link → checkout.

**The opportunity (bottom-up, not a market number):** ~R$40,000–R$80,000 of gross inventory value to be converted to cash over 12–18 months. `[ASSUMPTION]` average ticket R$120; ranges below.

**The ask:** No funding needed. Fixed costs are under **R$150/year** (domain R$40/yr; hosting, CDN, and database on free tiers). The real investment is time and a disciplined listing pipeline.

---

## 2. Company Overview

| Field | Value |
|-------|-------|
| Business name | **Acervo do Marvete** |
| Legal structure | Individual (CPF) at start; consider **MEI** once revenue is steady |
| Stage | **Pre-revenue.** v1 static catalog prototype exists (~29 placeholder items) |
| Mission | Turn a lifetime collection into fair value for collectors, honestly and quickly |
| Location / model | Brazil, remote, **phone-first** operations |
| Planned launch | ~4–6 weeks from setup start |

**Brand note:** the name is **Acervo do Marvete** ("the Marvel fan's collection"). *Observation:* the name reads Marvel-centric while the inventory is broader (mangás, DC, retro games, books). This is fine if the owner's "Marvete" identity is the brand and the catalog is understood to include his whole collection — just keep category labels clear so non-Marvel buyers aren't surprised. The old "ASHBY & VANE" placeholder is retired.

---

## 3. Problem and Solution

### 3.1 The Problem

**For the seller (you):**
- Hundreds of **one-of-a-kind** items (quantity = 1 each). Listing them manually on marketplaces is slow and error-prone at this scale.
- Marketplace fees eat **12–19%** of every sale; you also lose the customer relationship and the brand.
- No unified place to show the whole collection; social posts get buried.

**For the buyer (collector):**
- Hard to browse a large personal collection — no categories, no search, no condition detail.
- The expensive questions go unanswered: *É lacrado? Tem caixa? Qual edição/tiragem? Tem certificado? A bateria de save funciona?*
- Paying a stranger feels risky; they default to trusted marketplaces.

### 3.2 The Solution

- **One catalog, all items**, filterable by category, with condition and completeness surfaced up front.
- **Phone-fast listing:** the back office is a spreadsheet-style table (Airtable). Photograph the item → attach → fill 4 fields → it appears on the site. No code, ever.
- **Secure checkout** via Mercado Pago (Pix, cartão, boleto). Pay by Pix in seconds, or card in up to 12×.
- **Negotiation fallback:** every item has a "Tenho interesse / Negociar" button → WhatsApp. Critical for high-value, haggled items.
- **Social-first funnel:** Instagram/Facebook pages → bio link → catalog → checkout.

### 3.3 Why Now

Three things changed that make this the right moment:
1. **Pix** made instant, near-free (<1%) digital payment normal in Brazil — checkout is now cheap.
2. **Social commerce** (Instagram/Facebook/WhatsApp) is a primary buying channel for geek/collectibles audiences.
3. **Free-tier infrastructure** (static hosting + spreadsheet DB + image CDN) now covers this whole project at ~R$0 — a project that would have cost real money a few years ago.

### 3.4 The Core Insight

**The storefront is not the hard part — you already built a good one.** The hard parts are:
1. **The listing pipeline** (turning hundreds of physical items into rows, fast, from a phone).
2. **Trust for one-off, high-ticket items** (condition, authenticity, secure payment).
Everything in the v2 plan is aimed at these two.

---

## 4. Market Analysis

> `[VERIFY]` — the Brazilian collectibles/geek market size and growth rate need a sourced figure before this section can be considered final. The numbers below are **bottom-up inventory estimates**, not market research.

**Bottom-up (this collection):**
- Inventory: **400+ items**
- Assumed average ticket: **R$120** `[ASSUMPTION]`
- Gross potential: **~R$48,000** (range R$40k at R$100 avg → R$80k at R$200 avg)

**Trends affecting the opportunity:**
1. Growth of geek/collectibles consumption in Brazil (HQs, mangás, figures, retro gaming).
2. Social commerce as a primary channel for this audience.
3. Pix dominance lowering payment friction and cost.

**Primary personas:**
- **P1 — The nostalgic collector (25–45):** retro games, action figures, HQs. Wants completeness and condition. Will pay more for confirmed-original items.
- **P2 — The completionist (HQ/mangá, 18–40):** looking for specific volumes/editions to finish a set. Highly price-comparing; responsive to bundles.

**Reachability:** High — buyers aggregate in very findable places (Instagram, Facebook groups, marketplace categories). Organic reach is realistic before any paid spend.

---

## 5. Competitive Landscape

| Dimension | Mercado Livre | Shopee | Facebook Marketplace / OLX | Instagram/FB direct | **This store** |
|-----------|--------------|--------|---------------------------|---------------------|-----------------|
| Commission on sale | ~12–19% | ~12–20% | 0% (local) | 0% (DM) | **~1–5% (payments only)** |
| Browse a whole collection | No (item-by-item) | No | No | Poor (scattered posts) | **Yes — unified, filterable** |
| Condition transparency | Varies | Varies | Varies | Ad hoc | **Built-in fields** |
| Secure checkout | Yes | Yes | Limited | No (DM trust) | **Yes (Mercado Pago)** |
| Brand ownership | No | No | No | Partial | **Yes** |
| Trust for buyer | High | Medium | Low–Medium | Low | **Medium–High (via payment + detail)** |

**Our wedge:** a **single-owner, curated collection with honest condition detail**, sold through our own brand at near-zero fees, funneled from social — a position none of the pure marketplaces occupy.

**Table stakes we match:** secure payment, categories/search, quality photos.
**Gaps we fill:** unified browsing of a large one-off collection; condition/completeness disclosure; no commission; direct relationship.
**Honest competitor strength:** Mercado Livre has buyer protection and enormous traffic. We win on **fees, brand, and story**, not on reach — so cross-posting to ML/FB Marketplace for reach while keeping the catalog as home base is a valid hybrid.

---

## 6. Business and Revenue Model

**Channels:** Instagram page + Facebook page → link in bio → catalog → checkout or WhatsApp.

**Sales flow:** browse → item page → **"Comprar"** (Mercado Pago checkout) *or* **"Negociar"** (WhatsApp) → payment → pack → ship / local pickup → mark sold.

**Revenue streams:**
1. **Item sales** (primary) — each item qty = 1.
2. **Bundles/lots** (secondary) — group lower-value items (e.g., 10 comic volumes) to move volume faster.

**Revenue projections (bottom-up, conservative):**

| Scenario | Items/mo | Avg ticket | Monthly gross | 12-mo gross |
|----------|----------|-----------|---------------|-------------|
| Conservative | 30 | R$120 | R$3,600 | ~R$43,000 |
| Base | 45 | R$130 | R$5,850 | ~R$70,000 |
| Optimistic | 70 | R$140 | R$9,800 | ~R$118,000 |

`[ASSUMPTION]` — velocity is the single biggest unknown. Early months are usually faster (freshest items), tapering as the collection depletes. Model is a **finite liquidation**, so horizon is ~12–18 months, not perpetual.

**Unit economics:**
- **CAC:** ~R$0 initially (organic social). Optional small paid boosts later.
- **COGS:** payment fee only (~0.99% Pix → ~4.98% cartão à vista) + shipping (charged to buyer or absorbed). Inherited inventory has ~R$0 cash cost basis.
- **Gross margin:** very high (≈95%+ on Pix sales).
- **Payback:** immediate (no upfront acquisition cost).

---

## 7. Operations Plan

**Fulfillment:** payment confirmed → pick item → pack (bubble wrap for figures/rare HQs/boxed games) → ship (Correios / **Melhor Envio** for cheaper labels) or local pickup → mark sold in back office.

**Technology stack:**
| Layer | Tool | Cost |
|-------|------|------|
| Storefront | Vite + React 19 + Tailwind 4 (existing) | R$0 |
| Inventory / admin | **Airtable** (spreadsheet DB, phone app) | R$0 (free tier) |
| Images | **Cloudinary** (external, so Airtable's 1 GB limit isn't hit) | R$0 (free tier) |
| Hosting | **Cloudflare Pages** (unlimited static bandwidth) | R$0 |
| Checkout | **Mercado Pago** (Checkout Pro / payment links) | ~1–5% per sale |
| Domain | **Registro.br** `.com.br` | **R$40/yr** |
| Shipping labels | Melhor Envio | fee per label |

**Key recurring processes:**
1. **List an item** (phone): photograph → Cloudinary upload → new Airtable row → 4 fields → published.
2. **Receive an order:** confirm payment → pack → ship → mark sold.
3. **Social post:** item spotlight → IG/FB → link.
4. **Weekly inventory sweep:** re-price slow movers; mark sold; update photos.

**Automation plan:** sheet→site sync (build-time or scheduled); auto "sold" on payment webhook; image auto-optimization (WebP, responsive); OG-image generation per item for social sharing.

**Outsourcing plan:** trigger = whenever packing/shipping exceeds ~1 hr/day, or a batch of 20+ high-value items needs professional photos.

---

## 8. Marketing and Sales Plan

**Positioning:** *"A curated, single-owner collection of HQs, mangás, figures and retro games — sold honestly, at fair prices, with real condition detail."*

**Marketing channels (first 3):**
1. **Instagram** (primary) — item spotlights, category reels, "sold" stories.
2. **Facebook page + relevant groups** — cross-post, reach older collector demographic.
3. **WhatsApp** — broadcast list to interested buyers; negotiation channel.

**Content strategy:** 1–3 posts/day during active listing (each item = a post); weekly "collection" reel; educational snippets (how to spot fakes, value of editions) — reusing the existing site's Journal content.

**Sales approach:** self-serve checkout for standard items; DM/WhatsApp for high-value or haggled items.

**Acquisition targets:** ~1.5 sales/day at base scenario (~45/mo).
**CAC budget:** R$0 organic to start; ≤R$5/item in small paid boosts only after organic proves conversion.

---

## 9. Financial Projections

**Year 1 (monthly, base scenario):**

| Line | Monthly (base) | Notes |
|------|----------------|-------|
| Revenue | R$5,850 | 45 items × R$130 |
| Payment fees | ~R$175 | blended ~3% |
| Shipping (net) | ~R$0 | charged to buyer |
| Domain/hosting/DB/CDN | ~R$3 | R$40/yr amortized |
| Paid marketing | R$0–150 | optional |
| **Net** | **~R$5,500+** | margin ≈94% |

**Key thresholds:**
- **Break-even:** ~**1–2 items/month** (fixed costs are ~R$40/yr).
- **Runway:** N/A — no meaningful burn; self-funded.
- **Cash-flow timing:** shipping labels are a short-term outlay before payout; Pix is near-instant, card settles per Mercado Pago payout schedule.

**Honesty rule:** these are guesses on a finite inventory. Conservative scenario (~R$3,600/mo) still yields a clearly profitable, low-risk operation.

**Tax note:** `[VERIFY]` **MEI** has an annual revenue ceiling (was ~R$81k/yr; a raise has been proposed for 2026 — confirm current limit). If revenue approaches it, plan for ME (Simples Nacional). Selling inherited personal goods may have different IRPF treatment than business income — **check with an accountant before scaling.**

---

## 10. Risk Assessment

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | **Single-person dependency** (you get sick/burn out) | Medium | High | Document the listing flow; train your partner; batch work; keep listing sessions short |
| 2 | **Platform dependency** (Airtable/Mercado Pago/Cloudflare change terms) | Low–Med | Med | Data is portable (export Airtable to CSV/JSON); payment provider swappable; static site is host-agnostic |
| 3 | **Airtable 1 GB image limit** | **High** | Low | Store images on **Cloudinary**, keep only URLs in Airtable (planned) |
| 4 | **Estate legal right to sell** (inherited goods; other heirs?) | ~~?~~ **Resolved** | ~~High~~ | **✅ Confirmed settled — clear to sell.** (2026-10-11) |
| 5 | **Pricing uncertainty** (no market comps) | High | Med | Research comps (Mercado Livre/PriceCharting for games) before pricing; start at market, adjust weekly |
| 6 | **Trust / chargebacks** | Medium | Med | Use Mercado Pago (buyer protection + antifraud); document condition in photos; clear no-return policy for used items |
| 7 | **Condition disputes / shipping damage** | Medium | Med | Over-photograph flaws; pack figures/rare HQs carefully; offer tracked shipping |
| 8 | **Tax / MEI ceiling** | Low (early) | Med | Monitor revenue; consult accountant near the ceiling |
| 9 | ~~**Brand mismatch** (placeholder name)~~ | ~~High~~ **Resolved** | ~~Low~~ | **✅ Brand decided: "Acervo do Marvete."** |
| 10 | **Listing bottleneck** (400 items feels endless) | **High** | **High** | The entire v2 admin design targets this — **phone-first, ~60s per item**, batch sessions |

**The risk that actually matters now:** #10 (listing throughput — this is the whole project). #4 (legal right to sell) is **resolved**.

---

## Decisions (resolved 2026-10-11)

1. **Brand name** — ✅ **Acervo do Marvete**.
2. **Estate legal status** — ✅ **Settled; clear to sell.**
3. **Checkout depth** — ✅ **Phase 6A first** (per-item Mercado Pago payment links on a 20–30 item launch subset); build 6B webhook after demand is proven.
4. **Shipping** — ✅ **Both** (nationwide via Correios/Melhor Envio **and** local pickup; buyer chooses).
5. **Pricing source** — ⏳ open: do you want a comp-lookup workflow (PriceCharting for games, sold-listing research for HQs)?
6. **Language of this document** — ⏳ open: English now; translate to Portuguese if useful.

---

## Plan Maintenance Rules

- **Update monthly** for the first 6 months.
- **Mark assumptions** (`[ASSUMPTION]` / `[VERIFY]`) and resolve them as reality arrives.
- **Version it** — keep old versions to compare forecasts.
- **Share it** with 2–3 trusted people for blind-spot checks.
