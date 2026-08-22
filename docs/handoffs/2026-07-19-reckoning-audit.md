# THE RECKONING AUDIT — kickoff (D22)

---

Run **THE RECKONING AUDIT** — cellar-plan §0 **D22** is the directive
and the contract; this prompt adds nothing to it. You are auditing, not
building: **READ-ONLY for all app code.** No fixes, no refactors, no
suite/probe changes. You commit ONLY the audit documents.

**STATE as of commit `c0fb9db` (all pushed, live):** S2 capture+identify
is BUILT, DEPLOYED, and live-verified end-to-end (D21: extract reads at
0.98 conf, resolve matches Vat 1 at 1.0, suite 9/9, probe 6-step, LWIN
never fetchable). Ed's device pass is PENDING — several D21 app-level
calls await his eye. The bug ledger is live with B-001–B-017 filed from
his first device round. Nothing is mid-flight; the tree is clean except
intentionally-uncommitted work that is NOT yours (below).

**READ FIRST, in order:**
1. CLAUDE.md (the canon list, the ledger note, the station protocol).
2. docs/cellar-plan.md — WHOLE. Especially §0 D11/D21/D22, §2.1 (what
   LWIN is and isn't), §3.3–3.6 (cache, schema, framework evolution),
   §5 (data + generation design — S3/S4 already own much of what looks
   "missing"; your audit checks those plans against the REAL model, it
   does not reinvent them).
3. docs/bug-ledger.md — the index, then B-007, B-010, B-015 in full
   (they flow into you), skimming the rest for kin.
4. docs/stage-construction.md §5 + the Jul 19 addendum (what "screen"
   means here; any component architecture must compose by the recipe).
5. The surfaces and their data: explorations/flow6-cellar.jsx/.css
   (rack tile, desktop row, match hero, correction rows, detail, form),
   flow5-reveal.jsx + round13.css (the Pour's wine surfaces),
   flow6-memory.jsx (ledger rows), cellar-store.js (the record
   envelope), api/cellar-resolve.js (the candidate shape),
   scraps/build-lwin-index.js (the LWIN row schema — its header
   comment carries the confirmed columns).

**THE FOUR WORKSTREAMS → TWO DOCUMENTS:**

`docs/component-audit.md` —
- Inventory every wine-shaped surface (rack tile, desktop row, match
  hero, correction runner-up, detail hero, pour pane wine block,
  memory row) and every card-shaped one: file:lines, what is shared,
  what is duplicated, where they have ALREADY diverged.
- Propose the shared-component/state architecture (window-global
  components — the app's existing no-build pattern) and a migration
  order that roots out divergence earliest-first, sequenced against
  the ledger's fix rounds so nothing gets polished twice.

`docs/data-model.md` —
- The canonical model: LWIN row schema, the resolve candidate shape,
  the client record envelope, §3.4's DB schema — one reference, each
  attribute with its usage plan (or "unused — why").
- THE MATRIX: every datum displayed or planned (name lines, grapes,
  region/appellation, window, sliders/tastes, stats, story, facts,
  pairings including future FOOD pairings, bottle imagery) ×
  {HAVE-from-LWIN / HAVE-from-extract / S3-S4-planned / NEEDS A PLAN}
  × source of truth × open question if any.
- The layout-vs-data ranking: which screens assumed curated data;
  worst mismatches first (known members: the "Blanc" name derivation
  (B-015), the sparse detail, the placeholder bottle art).
- A costed BOTTLE IMAGERY options section (D22 names the candidates)
  — written for a verdict, not a recommendation smuggled as fact.

**OUTPUT CONTRACT:** end both docs with C-numbered questions for Ed,
continuing from v2's C1–C9 (so C10+). DO NOT amend cellar-plan or
touch any code — verdicts first; a follow-up session folds them in as
D-entries (the v1→v2 conciliation ritual). Acceptance: Ed can answer
every C-question from your two documents alone. Commit the two docs
house-style when done; push.

**GOTCHAS a fresh session trips on:**
- `content/*.csv|md` have UNCOMMITTED edits from Ed's separate content
  chat — read if useful, NEVER modify or commit them. Same for the
  untracked docs/business-*.md.
- ANTHROPIC_API_KEY is LIVE in Vercel: cellar-extract calls cost real
  money and quotas are per-install ~10/hr. The audit needs NO pipeline
  calls (cellar-resolve is free if you want to poke the candidate
  shape).
- Dev server: `.claude/launch.json` → "static" on :8123. The Browser
  pane freezes rAF (CLAUDE.md duty 5) — fine for reading surfaces.
- `?cellar-seed` still seeds demo wines for inspection (dev-only now).
- The station (claude-code-handoff/) holds the S1 canvas package +
  LWINdatabase.xlsx — reference only, never committed, don't clear it
  (that's the Sprint-6 closeout's job).
