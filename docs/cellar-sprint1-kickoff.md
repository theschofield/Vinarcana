# Sprint 1 kickoff — paste this to a fresh Claude Code session

> Ed: open a fresh session in this project and paste everything below the rule.
> (Why fresh: the planning conversation is spent; the plan is designed so a build
> session needs only the repo. This file is the whole handoff.)

---

Build **Sprint 1 of the Cellar** — the manual-only rack. The plan is the contract;
this prompt adds nothing to it.

**Read first, in this order (before any code):**
1. CLAUDE.md's canon list — especially **docs/stage-construction.md §5 THE SCREEN
   RECIPE** (the rack and detail are SCROLL OWNERS; follow it verbatim) and the
   verification duties.
2. **docs/cellar-plan.md** — the locked implementation contract. §1 conflicts and
   §2 vendors are DECIDED (decision log D1–D13): do not re-open them; new
   conflicts go to me, never silently resolved. Your scope is **§6 S1 only** —
   its build list, verification list, and my review script. §5.6 (count-sheet
   experiment E-A) and §5.8 (telemetry channel) apply to S1 directly.
3. **docs/analytics.md** — the live analytics substrate. S1 wires
   `VAAnalytics.track("cellar_added", { wine, method: "form" })` at the
   manual-add commit and `cellar_count` per the plan; one channel, no parallel
   loggers; use the vaTrack guard pattern from flow6-root.jsx.

**Design source (local-only, gitignored):** the locked canvas package sits in
`claude-code-handoff/` — `Cellar - Final.html` + `explorations/cellar-*.{css,jsx}`
(cascade: v1 → v1-detail → v2 → final; final wins). **Lift class structures and
values VERBATIM** — never re-derive a px value — then apply the plan's device-era
conversions (D1: scroll-owner recipe on phones; D5: head scrolls; D6: story wraps).
Do NOT edit or delete station files; they clear at S6 closeout.

**Working seams to mirror, not reinvent:** `explorations/memory-store.js` (the
store facade CellarStore mirrors), `toMemory()` in flow6-root.jsx (the road
`toCellar()` clones), `.mf-screen`/`.mf-scroll` in flow6-docflow.css (the layer
recipe, including the pan-block `:not()` list your new layer classes must join),
`scraps/mirror-guidebook.js` (the CSV mirror pattern for cellar-lists).

**Sprint discipline:** S1 ships usable on its own — no server, no vendor, no LLM,
no camera. If a task tempts you toward S2+ scope, stop at the seam the plan
already drew. Suite must reach 8/8 (new T8), the backdrop probe gains the cellar
step WITH the reach gate, and the harness gains the analytics-off preamble
(plan §6 S1 verification — live-site runs must never mint cohort installs).
Anything touching the count sheet (E-A) follows the §5.6 experiment protocol:
build, measure, and bring me the evidence — my device eye decides.

**End of sprint:** run my review script (plan §6 S1) and hand me the exact steps;
append the sprint's verdicts/assumption changes to docs/cellar-plan.md's decision
log (the D10 housekeeping duty); commit in the house style. The document never
scrolls; nothing is ever bottom-anchored at rest; when the canon and the canvas
disagree, the plan already ruled — and when something NEW disagrees, I decide.
