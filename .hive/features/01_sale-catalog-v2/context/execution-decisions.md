# Execution Decisions

- 2026-10-11: User chose **sequential** execution for runnable tasks: 03 → 04 (earlier), then 05 → 06 → 07 → 08. No parallel worktrees.
- 2026-10-11: "Build code first" — OPERATOR steps deferred (Airtable base creation, Cloudinary account, MP payment links, DNS).
- 2026-10-11: Evaluate `mercado-pago-integration` skill on first use (Task 06); evaluate `market-research`/`amazon-product-api` for future price research (standing user request).
- 2026-10-11: Forager-worker model broken in this environment → orchestrator executes tasks directly in worktrees.
- 2026-10-11: Tasks 06 (6A), 07, 08 completed, merged to main, pushed. 6B webhook deferred per plan.
- 2026-10-11: **Task 09 (social-sharing--seo) is DEFERRED by plan** ("Plan only; do not execute yet" / "Do not start before traffic proves the funnel"). Left pending; NOT executed.
- 2026-10-11: **Task 10 (launch-polish--trust) completed** — retired "ASHBY & VANE" → "Acervo do Marvete" across Nav/Footer/Heritage/Hero/Announcement/index.html/package.json/package-lock/products.js/index.css; monogram A&V→AM; footer email → contato@acervodomarvete.com.br. Created docs/condition-guide.md, docs/shipping-returns.md, docs/faq.md. Mobile QA: CartDrawer steppers h-9→h-11 (44px) + remove button 44px + MP link padding. Verified: grep no matches; docs exist; `npm run build` passes (284.83 kB); SSR full-App render confirms brand + no ASHBY. Commit `8a5af0b`, merged `f1f7738`, pushed.
- 2026-10-11: **All executable tasks done (9/10).** Only Task 09 remains (deferred). Main at `f1f7738`.
