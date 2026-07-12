# THE CHOREOGRAPHY GRAMMAR — how cards move between screens

**v1 · Jul 12, 2026 · CANVAS-REVIEWED.** Drafted in Claude Code from the
shipped code, the repo history, and Ed's account of how the canvas built
these transitions. Claude Design has resolved every ⚑ against the v6 source
(flow6-root.jsx, flow2-choreo.jsx, flow6.css, flow6-docflow.css,
design-tokens.json, the design-decisions log); resolutions and corrected
history are marked **✓ canvas**. This document is canon: future sessions
build and test against it, not against inference.

---

## 1 · The world model: a surface and a viewer

The app is a table. Every layout is drawn on its **resting surface**, and the
card is the one object allowed to leave it — lifting off the surface, toward
the viewer's face, and settling back down. Z-height is never faked with scale
alone; it is communicated by the **one shadow**, whose offset encodes altitude:

| shadow    | y-offset | altitude                                    |
|-----------|----------|---------------------------------------------|
| `sh-deck` | 10px     | flat in the deck stack                      |
| `sh-rev`  | 22px     | resting in The Pour's hero                  |
| `sh-rest` | 30px     | resting on a stage (the Lenses card)        |
| `sh-air`  | 70px     | in flight — high off the surface            |

**The apex** is the highest point a flight reaches: the card at its largest,
closest to the viewer's face, furthest from the surface. The apex is a
property of *some* flights, not a synonym for the handoff:

- **Deck → Lenses** reaches its apex at the end of the lift — and §6's
  proposed handoff would occur there. **✓ canvas:** no handoff has ever
  existed at this apex. The canvas's one swap in this transition sits at the
  *start* of the flight — the same-frame tile → actor takeover at the tile's
  resting pose (flow6.css: "the tapped tile hands off to the card actor the
  same frame"); from there one actor persists to rest, in every mode.
- **The Approach draw** reaches its apex mid-flight (during the flip-and-grow
  hold) and settles back toward the surface. It has no handoff at the apex —
  or anywhere else. **✓ canvas:** the actor legitimately persists through the
  whole draw, and past it — it IS the resting card for the entire Lenses
  stage. The Lenses renders its card only as a hidden measuring `<img>`
  (`data-va-slot="read-card"`, visibility: hidden) whose rect the actor rides
  (re-placed instantly on any relayout via ResizeObserver). The first card
  handoff after a draw is the Pour's. Two clock corrections: the "hold" is
  not a beat — it is the long tail of the flip's swift curve (flip beat
  515–1535ms; settle opens at 1495ms, a 40ms overlap); and "before the veil
  bleeds" is perceptual, not clock truth — canon tokens open the bleed beat
  at 1130ms, mid-flip, and its slow custom ease + 6555ms crawl make its
  visible emergence trail the settle. Write tests against the clock, not the
  percept.
- **Lenses → Pour has no apex.** The card travels at surface level — a slide,
  not a flight.

## 2 · Screens are sovereign layouts

Every screen owns its own layout, its own coordinate system, and **its own
rendition of the card**. **✓ canvas:** a screen's rendition may legitimately
be a hidden measuring slot the actor rides (the Approach's `deck-top`, the
Lenses' `read-card`) — sovereignty is about geometry inputs, not about
forcing a swap at every seam. Handoffs exist only where a screen shows a
*real* rendition (the Pour hero, the deck tiles, the ledger's mini cards,
the flip container). A transition never requires two screens' internal
state to reconcile — most importantly, the scroll position of an outgoing
scrolling view is *that screen's private business* and must never become an
input to the incoming screen's geometry.

**✓ canvas — corrected history:** this was true at handoff only in the
wrapped modes (desktop, phone frame, standalone), where the deck still is an
inner scroll container (`.dk-scroll { overflow-y: auto }`). Doc-flow was not
a later event: v6 shipped it (flow6-docflow.css, unwrap driven by mounts),
and v6's `runDeckDraw` already opened with `glideScrollTop()` — the canvas's
own law then was "never teleport scrollY — that's the chrome jump"
(design-decisions). So scroll-as-shared-state entered with the canvas's
doc-flow, not with Claude Code; §6's frame-walk is a stabilization of that
inherited reconciliation, and the grammar's judgment stands — it should
never have existed. The grammar's translation to doc-flow is in §6.

## 3 · The actor and the handoff contract

**The actor** is the single flying card that carries the image between
screens. It lives in one permanent DOM home (the zero-height sticky
`.va-actor-pin`) and is never remounted or reparented (device law, §5).

A transition has three phases with three owners:

1. **The exit** — owned by the outgoing screen. Its UI leaves on its own
   curves, *in place* (deck tiles sink 28px as they fade; the ledger rows
   likewise; stage UI fades on the UI-exit curve). The exit never moves the
   world — only its own elements.
2. **The flight** — owned by the actor, on the beat timeline's clock, in
   viewport space.
3. **The entrance** — owned by the incoming screen (veil bleed, voice,
   lens cascade, pour cascade), starting from its **handoff point**.

**The handoff point is a named contract, not an accident of flight math.**
It is a full pose — position, size, rotation, corner radius, and shadow — at
which the incoming screen renders *its own card*, and the two cards switch
places in one commit, imperceptibly. To the user it is one card; technically
it is two cards trading places between worlds.

### The handoff points as currently specified

| transition        | handoff pose                                                                 | status |
|-------------------|------------------------------------------------------------------------------|--------|
| Deck → Lenses     | the tile → actor takeover at flight start, same-frame, at the tile's resting pose; one actor then persists through the apex to rest (the apex pose — card center at (50% w, `centerY`% of the visual viewport), width `min(62% of stage width, 300px)`, `sh-air` — remains a flight waypoint, not a handoff) | ✅ canvas canon, **kept by decision** (see Decision, end of doc): the §6 apex-handoff proposal was declined |
| Approach → Lenses | **none, by design** (✓ canvas, §1): no card handoff anywhere in the draw — the actor persists through the flight and is the Lenses' resting card; `read-card` is a hidden measuring slot it tracks | ✅ canvas canon — persistence is the design, not an interim state |
| Lenses → Pour     | the hero slot (`reveal-card`), rot −4°, radius 8, `sh-rev`; swap fires on the actor's actual `transitionend`, not the nominal beat end | ✅ implemented (`armPourHandoff`) — the living reference |
| Memory → Pour     | same hero slot contract, entered from the ledger row's mini card              | ✅ implemented |
| The Flip (Deeper) | same-surface swap: the resting card ↔ the flip container at the identical rect/shadow, decode-gated (`dr-swap`) | ✅ implemented |

### Handoff requirements (enforced by the suite)

- The incoming card is **pre-mounted and pre-decoded** before the swap frame.
- Across the swap frame, rect, rotation, radius, and shadow are continuous
  within ~1px (suite test: handoff continuity — to be added).
- The swap rides **one commit**. Nothing else visible changes in that frame.

## 4 · Beat ownership

The beat timeline (`tlDraw` / `tlChoice` / `tlReturn`) is the single clock.
Beats own state changes; CSS owns motion between them; the sequencer never
lets a later beat's state land while an earlier beat's transition would
visibly teleport (the `transitionend`-armed handoff exists because a nominal
clock cut caught the last ~3px of the slide mid-glide).

The Approach draw, in the user's language: **pull** down → **flip while it
grows** (to the draw's apex) → a **held pause** → **settle back to the
surface**, which visually triggers the **veil bleeding out from behind the
card** (the vignette mask) → a **gentle move to the resting pose** in the
Lenses layout → voice → lenses.

## 5 · Device laws the canvas never needed

These are additive — they do not change the grammar, they constrain its
implementation on iOS:

1. **The decode gate.** A freshly mounted `<img>` paints blank for multiple
   frames while iOS decodes it. Every handoff's incoming card must be
   mounted and `img.decode()`d before the swap frame (250ms cap, then
   double-rAF). This is why "two cards switch places" must be *prepared*.
2. **The single home.** The actor is never remounted or reparented — same
   decode law, discovered as the vanishing-card flash.
3. **One shadow, one element, one clock.** The shadow lives on the one
   `.shdw` inside the flipper and transitions on each beat's own
   duration/curve. Two shadows composite darker; a static shadow under a
   moving card reads as a mistake. **✓ canvas:** this one is not device-era —
   it is v6 canon restated (the doubled-shadow composite and the one-`.shdw`
   construction were found and fixed in the canvas; see design-decisions,
   "Pour handoff shadow (v6 fix)").
4. **No mid-choreography document scroll** — in any form. Teleports blank
   the entire compositor tree (~110ms, measured at 60fps — even sticky
   layers vanish); wall-clock-eased glides catch-up-jump after a stall and
   blank the same way; first-time transform promotions rasterize from
   scratch and blank. See stage-construction.md for the scroll laws.

## 6 · The swap grammar in doc-flow — the open design

**State of the implementation (honest):** Deck → Lenses currently deviates
from the grammar. One persistent actor rides tile → apex → settle → rest with
no handoff, and because doc-flow makes the deck's scroll *the document's*
scroll, the implementation walks the window home under the faded tiles
(frame-based, 22px/frame) and tracks Safari's stage parking. It is stable and
measured clean — but it is scroll reconciliation, which §2 says should never
exist. **✓ canvas:** the reconciliation is inherited, not introduced — v6
shipped it as `glideScrollTop()` (a wall-clock cubic, 240–520ms: the exact
pattern the scroll laws now ban); the frame-walk is its blanking-safe
replacement. The persistent-actor ride itself is canvas canon (§1, §3) —
only the scroll motion is the deviation. The origin-adoption below is
endorsed as the grammar-faithful end state; note that adopting it TRADES
persistence for an apex handoff on this transition — a new contract, to be
recorded as such, not as restored history.

**The grammar-faithful translation (proposed, not yet built):** instead of
moving the world back to 0, *move the 0 to the world*. At the handoff frame,
the incoming Lenses layout mounts with its origin at the current scroll
offset — its own card already rendered at the apex contract, decoded. The
scroll never moves during anything visible. The stage then eats the pan (its
nature), so the parked offset is inert; the document normalizes silently at
the next natural hard cut (entering the Pour, the release, the next
deck/memory mount). Chrome state at the Lenses is inconsequential *by
design* — the stage has no hard bottom edge, so collapsed vs expanded chrome
is invisible; the only requirements are: never trigger Safari's blocking
background, and no visible scrolling or placement shift during or after the
transition.

**✓ canvas — apex pose confirmed, with precision:** the numbers are the
canvas's tuned intent, and both draws share them (one contract: the lift
target, aka the Optical centre). Canonically: width = `min(0.62 × stage
width, 300px)` where stage width is the `.va`'s width (the viewport, on
phones — so "62vw" is shorthand, not the source of truth); vertical = the
card's CENTER at `centerY`% of the *visual* viewport (`vaSize()` clamps the
grown doc-flow `.va` to `window.innerHeight`). `centerY` is a live token
("Optical centre", canon 44 in the user-owned design-tokens.json, range
35–60) — tests must read the token, never hard-code 44. Radius `cardRadius`
(canon 5.3), `sh-air`, rot 0, face-up: all confirmed. One addition: the
Approach draw's apex adds the flip swell (× `flipScale`, canon 1.1, a
composited scale — layout width untouched); the deck draw has no swell, so
its apex is the naked pose.

---

*Cross-references: stage-construction.md (the scroll decoy and pan rules),
design-decisions.md (the verdict log this distills), scraps/choreo-tests.html
(the executable form of these laws).*

---

## DECISION · Jul 12, 2026 (Ed, after canvas review)

§6's origin-adoption proposal is **declined**. The canvas construction stands
as the permanent design for Deck → Lenses: the same-frame tile → actor
takeover at flight start, one persistent actor to rest, no apex handoff, the
Lenses' card remaining the hidden measuring slot the actor rides. The
frame-based walk (22px per painted frame, under the fully faded grid) is the
**permanent** scroll mechanism for this transition — not an interim — as the
blanking-safe replacement for v6's wall-clock glide. Do not re-propose the
apex handoff or origin adoption; this trade (persistence over sovereignty at
this one seam) was made deliberately, with the reconciliation stabilized and
suite-enforced.
