# Vintner's Arcana — Content Index

**This file is a map, not a mirror. Do not write content from this file.**

An earlier version of this doc described the spirit's voice as "the wise, oddly-relatable stranger
at the bar." **That framing is retired and was actively harmful** — it produced rambling, over-familiar,
chummy lines. The correct frame (see `voice-prompt.md`): a devilishly charming, OMNISCIENT spirit
across the table, telling your fortune in spoken cadence — sly, composed, never chummy, never a lecture.

## The content pipeline (sources of truth)
- **`voice-prompt.md`** — THE writing prompt, one self-contained part per layer (Part 1 voice,
  Part 2 lenses, Parts 3A/3B/3C reveals) plus the shared batch workflow. Read the relevant part
  before writing anything.
- **`spirit-voices.csv`** — Part 1 output. One row per card: the spirit's voice + status.
- **`lenses.csv`** — Part 2 output. One row per lens: name, subtitle, nudge flag, hidden wine
  mapping, status.
- **`reveals.csv`** — Parts 3A/3B/3C output. One row per POUR: lens echo (repeats per lens),
  blurb, wine, stats, palate values, status.
- **`voice-history.md`** — the unified draft history for ALL layers, tagged by layer. The
  calibration file: every new writing session reads this FIRST.
- **`uploads/Tarot & Wine_ The Complete Framework.md`** — the user's pairing map (card → wine
  ideas). Every lens maps 1:1 to an idea in here.
- **`invitation-prompt.md`** — the Approach screen's hero lines (separate, small: the spirit's
  invitations before a draw) + the prompt to generate more.

Status flow everywhere: pending → draft → approved. Approved rows are canon; never edit them.

## Design side (not needed for content generation)
The app mocks under `explorations/` mirror approved CSV content into JSX data by hand — a
design-side task. Content sessions never need those files.
