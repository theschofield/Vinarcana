# Vintner's Arcana — session canon

Tarot-meets-wine ritual app. React 18 UMD + Babel-standalone, no build step.
**The repo root IS the public deploy** (push to main → vinarcana.vercel.app).
`.vercelignore` keeps docs/content off the site — check it before adding files.
Case-sensitive paths: a wrong-case asset name 404s on Vercel but works locally.

## The canon — read before touching the relevant area

- **docs/choreography-grammar.md** — how cards move between screens (actors,
  handoff contracts, the apex, device laws). Canvas-reviewed. Read before ANY
  transition work.
- **docs/stage-construction.md** — the scroll decoy that keeps Safari's
  chrome translucent (poison rule, membership rule, scroll laws), and §5
  THE SCREEN RECIPE — every screen is a STAGE or a SCROLL OWNER; follow
  it verbatim when building ANY new screen (Cellar included). Read before
  touching layout, positioning, or anything viewport-related.
- **docs/design-decisions.md** — the append-only verdict log (user taste +
  hard-won laws). Append new verdicts there; never rewrite history.

Hard laws in one breath: THE DOCUMENT NEVER SCROLLS, full stop — the
Deck's grid, the Pour's panes, AND the Memory ledger all scroll in their
own layers over the stage-shaped document (Ed's architecture, completed
Jul 14 2026: every screen composes like the Approach; overscroll
contained; the frame-stepped walk is retired — `walkScrollHome` is gone;
short/empty ledgers keep ≥1px of real scroll so containment always
binds); nothing is ever `position: fixed`,
pinned, or viewport-sized beyond the approved anchors in
stage-construction §2 (poison rule — absolute; additions are Ed's call and
band-probe-gated); every interactive element on a stage eats the pan
(`touch-action: none`) EXCEPT the scroll-owner layers (deck grid, pour
panes); never write scroll to fight Safari's parking (the dead keeper) and
never pin a full-viewport layer (the dead stage pin) — both summoned the
chrome backdrop; every image swap is decode-gated (iOS blanks fresh
`<img>`s); the card actor (and the eyebrow actor, same pin) is never
remounted or reparented; one shadow, one element, one clock; never write
`text-wrap: normal` (not a real value — it parses invalid; `wrap` is the
neutral keyword).

## Verification duties (non-negotiable for transition/layout changes)

1. `scraps/choreo-tests.html` on the dev server — seven tests, must be 7/7.
2. `scraps/backdrop-probe.py` — the chrome-band probe (deck · reading ·
   pour · memory). The iOS toolbar backdrop IS sim-detectable (texture
   through the chrome ≈ band stddev 3.5+; the backdrop's flat fill ≈ 2.0).
   MANDATORY for anything touching pinned/sticky/viewport-sized
   construction; it convicted the stage pin and the pour's fixed bar.
3. Anything touching scroll/compositing: safaridriver against the REAL page
   in the iOS simulator (no iframe). Capabilities MUST include
   `"platformName": "iOS"` with `safari:useSimulator` (500s without it);
   first session/navigate can 500 on cold Safari — create the session via
   curl, then drive. Suite PASS is necessary, never sufficient.
4. The simulator's chrome translucency differs in degree from device (the
   band probe sees the backdrop, not the true tint) and it has no real
   gestures — the user's device pass is the final gate.
5. Hard-timeout every driver/network call (a hung W3C touch action once ate
   40 minutes). W3C touch actions hang against the simulator — use
   executeScript event dispatch instead. The Browser pane freezes rAF —
   never judge choreography there; pump screenshots only for smoke tests.

## Repo map

- `index.html` + `explorations/` — the live app (nearly every file in
  explorations/ is loaded; check index.html before assuming anything is dead).
- `assets/` — art. `content/` — the content pipeline (CSV + prompts; the
  content chats work here; `scraps/mirror-guidebook.js` mirrors guidebook.csv
  into `explorations/arcana-guide.js` — never hand-edit the mirror output).
- `scraps/` — test harnesses (deployed on purpose, so the suite runs on
  device against the live site).
- `docs/` — the canon above. `claude-code-handoff/` — see below.

## The exchange station — claude-code-handoff/ (INTAKE PROTOCOL)

The folder is a **gitignored transfer station** for Claude Design (canvas)
exchanges. Nothing in it is ever canon, and it must never be committed.

- Ed drops canvas exports/briefs there; sessions read them as INPUT only.
- **Intake**: diff incoming material against the canon in `docs/`; merge
  forward — the canvas wins on design intent, the Claude Code canon wins on
  device-era laws; conflicts go to Ed, never silently resolved. Update
  `docs/` (committed), then DELETE the integrated files from the station.
- Never edit a doc inside the station that has a canonical counterpart in
  `docs/` — update the canon and regenerate the outbound copy if the canvas
  needs one.
- If the station is non-empty at session start and its contents look
  integrated (their learnings already in docs/), ask Ed whether to clear it.
