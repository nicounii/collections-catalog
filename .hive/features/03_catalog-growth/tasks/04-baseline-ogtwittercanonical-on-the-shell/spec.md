# Task: 04-baseline-ogtwittercanonical-on-the-shell

## Feature: catalog-growth

## Dependencies

_None_

## Plan Section

### 4. Baseline OG/Twitter/canonical on the shell

**Depends on**: none

**Files:**
- Modify: `index.html`

**What to do**:
- Step 1: Inside `<head>` (after the existing `description`), add:
  ```html
  <link rel="canonical" href="https://acervodomarvete.com.br/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Acervo do Marvete" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:title" content="Acervo do Marvete — Quadrinhos, Action Figures &amp; Colecionáveis" />
  <meta property="og:description" content="Acervo de um único dono: quadrinhos, mangás, action figures, retro gaming e livros de coleção." />
  <meta property="og:url" content="https://acervodomarvete.com.br/" />
  <meta property="og:image" content="https://acervodomarvete.com.br/photos/whatsapp-01.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  ```
- Step 2: Run `npm run build` and confirm the tags survive into `dist/index.html`.
- Step 3: Commit
  ```bash
  git add index.html
  git commit -m "feat(seo): add baseline OG/Twitter/canonical meta"
  ```

**Must NOT do**:
- Do not remove or alter the existing `lang`, `viewport`, `title`, or `description`.

**References**:
- `index.html:3-13` — current head.

**Verify**:
- [ ] `grep -c 'og:title' dist/index.html` → ≥ 1
- [ ] `grep -c 'rel="canonical"' dist/index.html` → 1
- [ ] `npm run build` exits 0

---

## Task Type

modification
