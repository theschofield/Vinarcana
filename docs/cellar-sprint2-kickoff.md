# Sprint 2 kickoff — paste this to a fresh Claude Code session

> Ed: open a fresh session in this project and paste everything below the rule.
> (Why fresh: S1's conversation is spent; the plan is designed so a build
> session needs only the repo. This file is the whole handoff.)
>
> Before (or while) the session works, two things only you can do:
> 1. **LWIN download** — free registration at liv-ex.com/lwin, download the
>    LWIN database file, drop it in `claude-code-handoff/` (the gitignored
>    station — the raw file never ships; the built index does).
> 2. **Anthropic API key** — create one (console.anthropic.com) and set it in
>    Vercel → vinarcana → Settings → Environment Variables as
>    `ANTHROPIC_API_KEY`, plus `CELLAR_DAILY_BUDGET` (start: `200` calls/day).
>    The session will tell you exactly when it needs each and can proceed on
>    everything else meanwhile.

---

Build **Sprint 2 of the Cellar** — capture + identify. The plan is the
contract; this prompt adds nothing to it.

**Read first, in this order (before any code):**
1. CLAUDE.md's canon list — especially **docs/stage-construction.md §5 THE
   SCREEN RECIPE** (note its Jul 17 addendum: the Cellar's S1 screens are the
   recipe's first from-scratch application — mirror them), the hard laws
   (including the two newest: EXIT-then-ENTRANCE on every screen change, and
   the form FOCUS CONTRACT), and the verification duties (suite is 8/8 now;
   probe is five steps, reach-gated).
2. **docs/cellar-plan.md** — the locked implementation contract. §0's log now
   runs D1–D20: S1 is BUILT, DEPLOYED, device-passed, and CLOSED (D14–D20
   carry every device-round verdict — read them; several are LAWS for your
   screens: focus contract, push beats, scrim-cancels/DONE-commits,
   450px sheet cap, 16px value lines, required-fields gate). Your scope is
   **§6 S2 only** — its build list, verification list, and Ed's review
   script. §5.2 (the SPARSE match sheet — D11's UI consequence), §5.8
   (telemetry, one channel), R2 (decision bar = the Pour's foot-pin
   construction, reused exactly), R3 (NATIVE photo input — no custom camera,
   D3/A1) apply directly. **The FIRST S2 task is cheap and gating:**
   download-and-inspect the LWIN file's actual columns (assumption §8.2)
   BEFORE writing `scraps/build-lwin-index.js`.
3. **docs/analytics.md** — the one channel. S2 wires `cellar_identify
   {conf, match, route, outcome}` per plan §5.8 (PROPS HYGIENE LAW: no
   pipeline free-text in props — no rawReading, no guessed names) and
   `cellar_added {method: "photo"}` at confirm. Quotas are keyed
   PER-INSTALL (the client sends its analytics install id with pipeline
   calls; IP bucket as backstop) — this is deliberate business-plan shaping
   (plan §8.13).

**What S1 left you (working seams, mirror don't reinvent):**
- `explorations/flow6-cellar.jsx/css` + the docflow cellar rules — the three
  screens, the push machinery (`go()`), the combobox, the E-A count sheet
  (CONFIRMED by Ed's device verdict — design-decisions "THE COUNT SHEET IS
  E-A"). Your identify stage is a plain STAGE; the match sheet and
  correction screens are SCROLL OWNERS on the same recipe (add their layer
  classes to the docflow pan-block `:not()` list via `.cf-screen`, which
  they get for free if they ride the same class family).
- `explorations/cellar-store.js` — the facade (records land identity-only +
  shimmer via `enrichment.status`), the IndexedDB photo sidecar
  (`CellarPhotos`, built and dormant — S2 turns it on: manual+unmatched
  records ONLY), the pairing-index seam, `?cellar-seed` (demo wines; retire
  it from the docs when real capture works, keep the function for tests).
- `api/track.js` — the pattern for zero-dep Vercel functions; your three
  new functions (`cellar-extract`, `cellar-resolve`; `cellar-settle` is S3)
  sit beside it with the §3.2 guardrails: same-origin allowlist, per-install
  token bucket (~10 adds/hour) + per-IP backstop, daily budget env,
  `CELLAR_PIPELINE_DISABLED=1` kill-switch → the app degrades to the
  manual-only S1, which ships usable by design.
- `scraps/choreo-tests.html` (8/8, ?va-off preamble), `scraps/
  backdrop-probe.py` (5 steps), `scraps/count-sheet-probe.py`,
  `scraps/mirror-cellar-lists.js` — grow, don't fork.

**Build list (plan §6 S2, restated):** api scaffolding + guardrails +
per-install quotas · `build-lwin-index.js` (inspect columns FIRST; wines
only, normalized strings, SQLite FTS bundled in the function; the CC BY 4.0
ATTRIBUTION line ships THIS sprint) · `cellar-extract` (downscaled label in
→ {fields, confidence, rawReading}; model per plan §2.3 — default Opus,
env-switchable) · `cellar-resolve` (query terms → ranked LWIN candidates +
score; NO LLM in the common path) · native photo input (R3: `<input
type="file" accept="image/*">`, no capture attr; EXIF orientation, canvas
downscale ≤1280px, JPEG q0.8) — the add affordance becomes the one entry
(tap → native sheet; the form remains reachable as the correction path) ·
identify stage ("Making its acquaintance." over three mono stages, hanging
dot, cancel = abandon+discard) · match sheet SPARSE variant (§5.2 — KNOWN
facts only, D11; the story region needs the quiet sparse line, copy through
Ed) with decision bar per R2 (NOT QUITE ghost / THAT'S THE ONE filled;
factor the Pour's construction out rather than duplicating if practical) ·
correction screen (manual FIRST, runner-ups below at the same level, "THE
LABEL READ · …") · duplicate → count++ prompt · records land identity-only
+ settling shimmer (the cl2-tile .settling dress exists) · photo retention
law enforced (IndexedDB, manual+unmatched only, decode-gated strip on
detail) · analytics per above.

**Verification (plan §6 S2):** band probe gains the match screen + decision
bar step · suite membership audit on new layers (and grow it — a new scroll
owner gets its own THE-DOCUMENT-NEVER-MOVES test) · post-deploy static-404
check on api/ internals (the LWIN index must never be fetchable) · identify
events flowing dev-marked through va_events · golden set v0: Ed photographs
~10 of his actual bottles as the first fixtures (checkpoint 1, §5.8).

**Ed's review script (plan §6 S2):** add a bottle by camera; add one from
the library (A1!); force a miss (obscure bottle) → correction → manual; add
the same wine twice → duplicate prompt; airplane-mode an add → the honest
line; kill-switch drill (Ed flips the env var, adds — manual path must feel
whole); review the sparse match sheet against his taste (the D11 UI delta).

**Sprint discipline:** S2 ships usable on its own — no enrichment (S3), no
pairing pass (S4), no accounts (S6). If a task tempts you toward S3+ scope,
stop at the seam the plan already drew. Suite green, probe clean, sim
necessary-never-sufficient, Ed's device pass final. End of sprint: run his
review script, append verdicts to the plan's decision log (D10 duty),
commit in the house style.

**KNOWN ISSUE, parked by Ed (S1 round 6):** a residual second movement on
keyboard dismissal from the form's LOW fields (Country/Grape) survives the
D19 fix — small, non-disruptive; pick it up only if a polish window opens.
The document never scrolls; nothing is ever bottom-anchored at rest (E-A's
transient sheet is the one measured exception); when the canon and the
canvas disagree, the plan already ruled — and when something NEW disagrees,
Ed decides.
