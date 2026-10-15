# Task: 06-30-day-content-calendar

## Feature: catalog-growth

## Dependencies

_None_

## Plan Section

### 6. 30-day content calendar

**Depends on**: none

**Files:**
- Create: `docs/content-calendar-30d.md`

**What to do**:
- Step 1: Build a day-by-day table (D1–D30) from `docs/market-research-social-growth.md` §1.1 (6 formats), §2.1 (cadence), §2.2 (times), §6 (quick wins). Columns: `Dia · Formato · Peça/assunto · Canal (IG Reel/carrossel/Story · FB cross-post) · Horário · CTA · Comunidade`.
- Step 2: Encode the fixed rules at the top: 1 Reel/day feed + 2–5 Stories/day; post 18h–00h, seg–qui (quarta = pico); cross-post every Reel to FB; join/contribute in 5–8 communities in week 1.
- Step 3: Add a weekly target strip and the 30-day success metrics (150–400 followers, 5–15 sales, 1–2 Reels > 3K views) `[ESTIMATE]`.
- Step 4: Reference real asset needs (shelf-tour Reel, 9-post grid, WhatsApp broadcast list setup) with checkboxes.
- Step 5: Commit
  ```bash
  git add docs/content-calendar-30d.md
  git commit -m "docs: 30-day social content calendar"
  ```

**Must NOT do**:
- Do not invent specific product names — refer to "item do acervo real".

**References**:
- `docs/market-research-social-growth.md:18-29,49-67,156-172` — formats, cadence, quick wins.

**Verify**:
- [ ] `docs/content-calendar-30d.md` exists with exactly 30 data rows (`grep -c '^| D' docs/content-calendar-30d.md` → 30)
- [ ] Every row names a format from §1.1 and a channel

---

## Full-batch verification (after all tasks merged)
- [ ] `npm run build` exits 0
- [ ] `node --test` → all pass
- [ ] `dist/produto/*/index.html` count == product count; each contains `og:title` and `"@type":"Product"`
- [ ] `dist/sitemap.xml` + `dist/robots.txt` present
- [ ] `npm run preview &` then `curl -sI http://localhost:4173/produto/<slug>/` → `200` and body contains the product's OG title

## Task Type

greenfield
