# Hive Worker Assignment

You are a worker agent executing a task in an isolated git worktree.

## Assignment Details

| Field | Value |
|-------|-------|
| Feature | sale-catalog-v2 |
| Task | 03-data-sync-layer |
| Task # | 3 |
| Branch | hive/sale-catalog-v2/03-data-sync-layer |
| Worktree | /home/mathew/BCP/60-69_Projects_&_Goals/67-Current/67.18-Sale-Catalog-Site/.hive/.worktrees/sale-catalog-v2/03-data-sync-layer |

**CRITICAL**: All file operations MUST be within this worktree path:
`/home/mathew/BCP/60-69_Projects_&_Goals/67-Current/67.18-Sale-Catalog-Site/.hive/.worktrees/sale-catalog-v2/03-data-sync-layer`

Do NOT modify files outside this directory.

---

## Your Mission

# Task: 03-data-sync-layer

## Feature: sale-catalog-v2

## Dependencies

- **2. airtable-schema--seed-export** (02-airtable-schema--seed-export)

## Plan Section

### 3. Data sync layer

**Depends on**: 2

**Files:**
- Create: `scripts/sync-catalog.mjs`
- Create: `scripts/ensure-catalog.mjs`
- Create: `src/data/products.sample.json` (small committed fallback)
- Modify: `src/data/products.js` → re-point to generated data (keep `CATEGORIES`, helpers, `journalPosts`, `NAV_LINKS`, `SUB_NAV`)
- Modify: `src/context/CartContext.jsx:2` (import source)
- Modify: `src/components/Catalog.jsx:2` (import source)
- Modify: `src/App.jsx:13` (import source)
- Modify: `package.json` (add `"sync"`, `"prebuild"`, `"predev"` scripts)

**What to do:**
- `scripts/sync-catalog.mjs` — the **only** producer of `src/data/products.generated.json`:
  - Read `AIRTABLE_TOKEN`/`AIRTABLE_BASE_ID`/`AIRTABLE_TABLE`; paginate via `offset`; `filterByFormula` excludes `status='sold'`.
  - Field map (Airtable → app): `image_url`→`image`, `image_alt`→`imageAlt`, `mp_link`→`mpLink`, `order_ref`→`orderRef`, `status`→`status`, `created` (Airtable automatic `Created time`)→`added`. All other fields pass through unchanged.
  - Deterministic output: sort by `id` before writing so git diffs are stable.
  - **Fail-loud policy (no masking):**
    - Creds **absent** → if `products.generated.json` is missing, copy `products.sample.json` → it; log a warning; exit `0`.
    - Creds **present** but (a) HTTP/API error, or (b) `NODE_ENV=production` and 0 items → log error; exit `1` (**the build must fail**; never fall back to the sample).
- `scripts/ensure-catalog.mjs`: copies `products.sample.json` → `products.generated.json` **only if the target is missing**. Used by `predev` only (local dev without creds). It never overwrites a real synced file and never masks a sync failure.
- `src/data/products.sample.json`: committed, small (~6-item) valid array for creds-less local dev.
- `src/data/products.js`: a single static import — `import generated from './products.generated.json'` — exported as `products`; keep all existing named exports (`CATEGORIES`, `byCategory`, `journalPosts`, `NAV_LINKS`, `SUB_NAV`). The file is guaranteed to exist because `prebuild`/`predev` always run the sync/ensure step first; there is **no** runtime fallback and **no** dynamic-import branch (this removes the ambiguity).
- `package.json`:
  - `"sync": "node scripts/sync-catalog.mjs"`
  - `"prebuild": "node scripts/sync-catalog.mjs"`  ← **no `||` chaining**; a sync failure fails the build, exactly as the fail-loud policy requires.
  - `"predev": "node scripts/ensure-catalog.mjs"`

**Must NOT do:**
- Do not delete `CATEGORIES`, `byCategory`, `journalPosts`, `NAV_LINKS`, `SUB_NAV` from `products.js`.
- Do not silently fall back to the sample when creds are present (must exit 1).
- Do not include `sold` items in the generated output.

**References:**
- `docs/PLAN-SUMMARY.md:101-103` — fail-loud policy.
- `docs/PLAN-SUMMARY.md:36` — sold items filtered at build time.
- `src/App.jsx:13`, `src/components/Catalog.jsx:2`, `src/context/CartContext.jsx:2` — import sites to re-point.
- `src/data/products.js:397,399,432,434` — exports to preserve.

**Verify:**
- [ ] No creds: `node scripts/sync-catalog.mjs; echo $?` → `0` with a warning; `products.sample.json` used.
- [ ] Bad creds (set `AIRTABLE_TOKEN=x`): `node scripts/sync-catalog.mjs; echo $?` → `1`.
- [ ] Good creds: `npm run sync` writes `products.generated.json` with only `available`/`reserved` items.
- [ ] `npm run build` succeeds with the generated file present.
- [ ] `git status` shows `products.generated.json` ignored.

---

## Task Type

modification

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).


---

## Pre-implementation Checklist

Before writing code, confirm:
1. Dependencies are satisfied and required context is present.
2. The exact files/sections to touch (from references) are identified.
3. The verification path is clear: a failing test for new behavior, or the existing coverage to keep green for refactor-only work.
4. The minimal change needed to reach green is planned.

---

## TDD Protocol (Required)

1. **Red**: Write failing test first
2. **Green**: Minimal code to pass
3. **Refactor**: Clean up, keep tests green

When adding new behavior, write the test before the implementation.
When refactoring existing tested code, keep tests green throughout; no new failing test is required.

## Debugging Protocol (When stuck)

1. **Reproduce**: Get consistent failure
2. **Isolate**: Binary search to find cause
3. **Hypothesize**: Form theory, test it
4. **Fix**: Minimal change that resolves

After 3 failed attempts at same fix: STOP and report blocker.

---

## Blocker Protocol

If you hit a blocker requiring human decision, **DO NOT** use the question tool directly.
Instead, escalate via the blocker protocol:

1. **Save your progress** to the worktree (commit if appropriate)
2. **Call hive_worktree_commit** with blocker info:

```
hive_worktree_commit({
  task: "03-data-sync-layer",
  feature: "sale-catalog-v2",
  status: "blocked",
  summary: "What you accomplished so far",
  blocker: {
    reason: "Why you're blocked - be specific",
    options: ["Option A", "Option B", "Option C"],
    recommendation: "Your suggested choice with reasoning",
    context: "Relevant background the user needs to decide"
  }
})
```

**After calling hive_worktree_commit with blocked status, STOP IMMEDIATELY.**

The Hive Master will:
1. Receive your blocker info
2. Ask the user via question()
3. Spawn a NEW worker to continue with the decision

This keeps the user focused on ONE conversation (Hive Master) instead of multiple worker panes.

---

## Verification Evidence

Before claiming completion, verify your work with command-first evidence proportional to the change type:

| Change type | Required verification |
|---|---|
| New behavior | Run tests covering the new code; record pass/fail counts |
| Bug fix | Reproduce the original failure, then confirm the fix |
| Refactor | Run existing tests; confirm no regressions |
| Prompt / text-only | Run relevant local tests if available; otherwise do file-specific sanity checks such as generation, syntax/parse, or conflict-marker scans |

**Rules:**
- Run the command, then record observed output. Do not substitute explanation for execution.
- If a check cannot be run (missing deps, no test runner in worktree), explicitly state "Not run: <reason>" instead of omitting it silently.
- command-first means: execute first, interpret second. Never claim a result you have not observed.

---

## Completion Protocol

When your task is **fully complete**:

```
hive_worktree_commit({
  task: "03-data-sync-layer",
  feature: "sale-catalog-v2",
  status: "completed",
  summary: "Concise summary of what you accomplished",
  message: "Optional git commit subject

Optional body"
})
```

- Use summary for task/report context.
- Use optional message only to control git commit/merge text.
- Multi-line message is supported where a new commit is created.
- Omit message (or pass empty string) to use existing defaults.
- Do not provide message with hive_merge(..., strategy: 'rebase').

Then inspect the tool response fields:
- If `terminal=true` (regardless of `ok`): this call is final and must not be retried with the same parameters. Send one final concise handoff response to the orchestrator, then stop.
- If `terminal=false`: **DO NOT STOP**. Follow `nextAction`, remediate, and retry `hive_worktree_commit`

**CRITICAL: Any terminal commit result is final for this call.**
If commit returns non-terminal (for example verification_required), DO NOT STOP.
Follow result.nextAction, fix the issue, and call hive_worktree_commit again.

Only when commit result is terminal should you stop.
After a terminal result, send one final concise handoff response to the orchestrator, then stop.
The final response should include what changed, why (if relevant), and verification evidence (or "Not run" with reason).
Do NOT continue working after that final response. Your session is DONE.
The Hive Master will take over from here.

**Summary Guidance** (used verbatim for downstream task context):
1. Start with **what changed** (files/areas touched).
2. Mention **why** if it affects future tasks.
3. Note **verification evidence** (tests/build/lint) or explicitly say "Not run".
4. Keep it **2-4 sentences** max.

If you encounter an **unrecoverable error**:

```
hive_worktree_commit({
  task: "03-data-sync-layer",
  feature: "sale-catalog-v2",
  status: "failed",
  summary: "What went wrong and what was attempted"
})
```

If you made **partial progress** but can't continue:

```
hive_worktree_commit({
  task: "03-data-sync-layer",
  feature: "sale-catalog-v2",
  status: "partial",
  summary: "What was completed and what remains"
})
```

---

## Tool Access

**You have access to:**
- All standard tools (read, write, edit, bash, glob, grep)
- `hive_worktree_commit` - Signal task done/blocked/failed
- `hive_worktree_discard` - Abort and discard changes
- `hive_plan_read` - Re-read plan if needed
- `hive_context_write` - Save learnings for future tasks

**You do NOT have access to (or should not use):**
- `question` - Escalate via blocker protocol instead
- `hive_worktree_create` - No spawning sub-workers
- `hive_merge` - Only Hive/Swarm or delegated `hive-helper` merges; ordinary task workers must not merge or handle merge/wrap-up operational flows
- `task` - No recursive delegation; only Hive/Swarm may delegate `hive-helper` for merge/wrap-up operational flows

---

## Guidelines

1. **Work methodically** - Break down the mission into steps
2. **Stay in scope** - Only do what the spec asks
3. **Escalate blockers** - Don't guess on important decisions
4. **Save context** - Use hive_context_write for discoveries
5. **Complete cleanly** - Always call hive_worktree_commit when done

---

Begin your task now.
