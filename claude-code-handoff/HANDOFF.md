# Vintner's Arcana — New-Session Handoff

Two kinds of session start from this project. Point each at the right memory; don't mix them.

## A) Content-writing session (Claude Code or any chat)
Everything lives in `content/`. Read in this order:
1. `content/voice-history.md` — the calibration (reject/approve trails). READ FIRST.
2. `content/voice-prompt.md` — the writing prompt (Part 1 voices, Part 2 lenses, Parts 3A/3B/3C
   reveals) + the batch workflow and file map.
3. `uploads/Tarot & Wine_ The Complete Framework.md` — the pairing map.
4. The three output CSVs (`spirit-voices.csv`, `lenses.csv`, `reveals.csv`) — current state.

Then write ONE layer at a time, batches of 4–6 cards, stopping for the user's grade after each
batch. Statuses: pending → draft → approved; never edit approved rows; log every superseded draft
to `voice-history.md` tagged by layer.

No design files are needed for content work.

## B) Design session (this app's screens)
1. `design-decisions.md` — every taste verdict, the locked visual system, layout rules, and
   per-round history. READ FIRST.
2. `Vintner's Arcana - Flow Prototype v5.html` (+ `explorations/flow5*` and the flow2/flow3
   files it loads) — the CURRENT working prototype (desktop-polish phase). The v13 exploration
   canvas (`Vintner's Arcana — Explorations v13.html` + `explorations/round13*.{css,jsx}`,
   `round10.css`) remains the approved visual canon it was built from.
3. `content/arcana-content.md` — the content-pipeline map (design mirrors approved CSV content
   into JSX mock data by hand).
4. Skim `Vintner's Arcana — Index.html` for how we got here.

Locked system in brief: DM Serif Display (display; lens names italic, spirit's voice roman) /
Instrument Sans (body) / IBM Plex Mono (micro-labels). Night: charcoal `#181717` + apricot
`#F5AA5D`. Day: greige `#DDDBD6` + ink-navy `#152231` + amber `#C67F41`. SVG-noise grain texture;
card-art veil with mottled all-edge vignette. No purple, no halloween, no em dashes in content.
