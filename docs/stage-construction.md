# STAGE CONSTRUCTION — the scroll decoy that keeps Safari's chrome honest

**v1 · Jul 12, 2026 · CANVAS-REVIEWED.** How the Approach and the Lenses are
built, why, and the rules that keep the construction alive. One provenance
correction (✓ canvas, end of §1): the decoy is older than this repo — its
core shipped with canvas v6, and the chrome war began there ("learned across
four device-test rounds", flow6-docflow.css) before continuing here. §1's
design intent is confirmed verbatim. This is canon and the suite enforces
it.

---

## 1 · The problem and the intent

iOS Safari draws an **opaque blocking background behind the bottom chrome**
when it decides a page isn't really a scroll view (fixed-position
constructions, bottom-anchored elements, viewport-sized pinned layers all
summon it). That background puts a hard synthetic edge under the design and
makes the app feel claustrophobic. Two goals, both absolute:

- **Scrolling content (the Deck's grid, the Pour, the Memory ledger)
  scrolls off the bottom edge of the device, behind translucent chrome,
  edge to edge.** Seeing the blocking background there is a primary FAIL.
- **Stages (Approach, Lenses) read as viewport-sized designs** — no
  scrolling, nothing moves — *without* triggering that same background.

How each scrolls (Ed's architecture, Jul 12 2026): only the MEMORY
ledger still scrolls the DOCUMENT (doc-flow, `va-flow-mem`). THE DECK
AND THE POUR DO NOT: their content scrolls in its own layer ABOVE the
shared field in z-space — the deck's grid (`.dk-scroll`, layer sized
100lvh + safe + 100px overshoot) and the pour's panes (`.rv-pours`
snap-x with per-pane `.rv-vscroll`, layer sized 100lvh + safe), both
with overscroll containment so no pan ever reaches the document. The
document stays stage-shaped while they are up, every screen composes
exactly like the Approach, and the pour's foot bar keeps its locked
top-referenced geometry as an ABSOLUTE child of the pan-eating layer —
dropping `position: fixed` there is what finally cleared the pour's
toolbar backdrop (band 2.03 → 3.57, the reading's own clean value).

Chrome state itself (collapsed vs expanded) is **inconsequential by
design**: stages have no hard bottom edge (the field fades into vignette),
so the user can't tell where the chrome ends. The only requirements are that
the blocking background never appears and that nothing visibly scrolls or
shifts during or after transitions.

**✓ canvas:** both goals and the chrome-state stance read true — they ARE
the original intent, not a device-era reading of it. Stages having no hard
bottom edge is deliberate design (the field fades into the vignette; the
apricot glow was cut in doc mode partly for this reason). Provenance: v6
already shipped the sticky-only rule ("position:fixed is POISON"), the
+100px stage overshoot, pan-eating stage layers (`touch-action: none` on
`.va-layer` and `.rx-status`), the sticky veil (100lvh, negative margin,
zero footprint), the zero-height status pin, and the `--foot-vh` foot pin —
all in flow6-docflow.css. Claude Code's era added: the actor pin (v6's actor
lived in document space, which is exactly why v6 glided the window home),
the measured scroll laws and the frame-walk, the parking/`pinDelta()` law,
and the membership rule (the `.dr-hit` incident).

## 2 · The decoy

Safari is always shown a scrollable document; the user is never allowed to
scroll it on a stage. Best of both worlds.

The z-stack, bottom to top:

1. **The scroll ballast (document flow).** The document itself — sized by
   in-flow content with `min-height: 100lvh + safe-area + 100px overshoot`
   on stages. The overshoot guarantees Safari always believes there is
   somewhere to scroll: no seam ever shows behind the chrome, and the
   backdrop heuristic never fires. (Side effect to respect: stages have
   ~100px of *real* scroll slack. The pan rules below keep it unreachable
   by the user — but the ENGINE parks into it freely; see law 4.) The
   paper grain rides the document (absolute — pinning it is poison, see
   the RAFT verdict; uniform noise shows no motion anyway).
2. **The approved viewport anchors.** Five sticky constructions — four
   hand-tuned during the chrome war, one added by Ed's directive
   (Jul 12, 2026): the **field** (`.va-field` — the gradient on the
   veil's recipe, z-index −1 so all in-flow content paints above it;
   only content moves when a view scrolls, and the field is
   pixel-identical from Deck to Lenses; band-probe-verified clean), the
   **veil** (100lvh, negative margin, zero footprint), the **status
   pin** (zero-height), the **actor pin** (zero-height — the flying
   card's AND the eyebrow actor's home), and the Pour's **foot pin**
   (top-referenced at `foot-vh − 68px`, VisualViewport-tracked; since
   the Jul 12 pour conversion an ABSOLUTE child of the pour's layer —
   dropping its `position: fixed` is what cleared the pour's backdrop).
   **This set is closed.** The dividing line, bisected
   Jul 12 2026: zero-height pins hosting SMALL content and
   zero-footprint background imagery are clean; a pinned FULL-VIEWPORT
   layer — especially an interactive, pan-eating one — summons the
   backdrop (the stage-pin dead end, below).
3. **The stage UI layer.** A `.va-layer`: absolutely positioned, capped at
   `100dvh`, and — the crux — `touch-action: none`. It **eats the pan**.
   Every drag that lands on the stage dies here; the ballast below never
   scrolls; the user experiences a fixed screen.

## 3 · The laws

1. **THE POISON RULE (absolute; new members only by Ed's decision, and
   only band-probe-verified).** Nothing in this app is ever
   `position: fixed`, viewport-sized-and-pinned, or bottom-anchored
   beyond the approved anchors in §2. Not "scoped to one view", not
   "only during a transition", not as a paint hint. A sticky
   viewport-sized grain summoned the backdrop on the deck and blanked
   the ride; PINNING THE STAGE LAYERS (the va-stage-pin experiment)
   summoned it on every page including the Approach — bisect-proven
   with scraps/backdrop-probe.py. Dead ends, never resurrect: fixed
   anything, scroll-proxy spacers, `--va-sy` scroll variables, the
   pinned GRAIN, pinned stage LAYERS, bottom-anchored bars, extra veil
   wrapper transitions, and standing scroll-writers that fight the
   engine's parking (the dead keeper — see law 4).
2. **THE MEMBERSHIP RULE.** Every element that renders on a stage must
   live inside a pan-eating layer or carry `touch-action: none` itself.
   *Cautionary tale:* the Deeper affordance's invisible hit surface
   (`.dr-hit`) was rendered as a sibling of the layers — outside the
   pan-eating regime — so dragging the Lenses card scrolled the decoy's
   slack. Any interactive element added to a stage must be audited against
   this rule, and the suite's stage pan-block test (to be added) makes the
   audit executable.
3. **THE SCROLL LAWS (doc-flow — the Memory ledger alone; the deck's
   grid and the pour's panes are NOT the document).** The document
   scroll belongs to the ledger alone. Stages park it and block pans;
   the deck and the pour scroll themselves and contain their
   overscroll. Mid-choreography
   DOCUMENT scroll motion is forbidden in every form — instant teleports
   blank the entire compositor tree (~110ms, measured on the real page
   at 60fps; even sticky layers vanish); wall-clock-eased glides
   catch-up-jump after frame stalls and blank identically; first-time
   transform promotions rasterize from scratch and blank. Document
   scroll may only change: (a) under a user's finger, (b) as a
   frame-based capped walk beneath fully faded content (the MEMORY ride
   — the deck and pour paths have no document debt to pay, by
   construction), or (c) never visibly. The deck ride's and the pour's
   law is stricter and simpler: **the document must not move a pixel**
   (suite T1, T2, T4).
4. **SAFARI PARKS STAGES — on its own clock; never fight it, never
   shear.** The engine can move a settled stage's scroll a few px into
   the overshoot slack on a chrome settle (no CSS opt-out;
   `overflow-anchor` unsupported in iOS 26 WebKit). Fighting parks is
   poison (the dead keeper summoned the toolbar backdrop); pinning the
   layers to dodge them is poison (the dead stage pin summoned it
   everywhere). With the deck out of the document, nothing in the app
   collapses the document or dances the chrome mid-flow anymore — the
   exposure is the Approach's own, which shipped clean for months. The
   remaining belt: the READING FOLLOWER (a read-only scroll poll —
   engine parks do not reliably fire scroll events) re-places the
   pin-hosted card and eyebrow through `pinDelta()` on any document
   movement, so a parked stage rides AS ONE and internal shear (the
   card slicing the voice) is impossible. Never write scroll at a
   resting stage, and never assume a stage sits at exactly 0.

## 4 · Verification duties

- **`scraps/choreo-tests.html`** runs before shipping any transition
  change: deck exit (same-frame takeover, THE DOCUMENT NEVER MOVES, the
  grid's own scroll holds still, tile sink, card arc), lens pick
  (scroll 0, width stability, actor continuity), the flip (decode gate,
  no hole, −180°), stage pan membership, handoff continuity, release
  (from a scrolled PANE — the document never moves).
- **Recorded video or it didn't happen.** Anything touching scroll,
  compositing, or the pinned set gets a safaridriver run on the REAL page
  (no iframe — the iframe hides document-scroll rasterization behavior),
  recorded via `simctl recordVideo`, frames extracted and eyeballed, with
  a luma trace for blank detection. Suite PASS is necessary, never
  sufficient.
- **`scraps/backdrop-probe.py`** runs before shipping anything that
  touches pinned/sticky/viewport-sized construction. The toolbar
  backdrop IS detectable in the simulator (Ed spotted it in sim footage
  — the old "bar region reads black" belief was wrong for the tell that
  matters): the app's texture visible through/around the floating
  chrome reads band stddev ≈ 3.5-45; the backdrop's flat fill reads
  ≈ 2.0 with a hard top edge. Valid ONLY where the band carries
  large-scale texture — the Reading (veil art) and the Deck at
  MID-scroll (tiles); the Approach and the deck's bottom are
  flat-on-flat there by design (A/B-verified pixel-identical across
  constructions) and stay device-only evidence. Calibrated on the
  stage-pin incident.
- **The device pass is the final gate.** The simulator does not reproduce
  real chrome gestures or real rasterization pressure — and its chrome
  translucency differs in degree (the band probe sees the backdrop, not
  the true device tint).

---

*Cross-references: choreography-grammar.md (the actor/handoff grammar these
rules protect), design-decisions.md (the verdict log, including the full
history of the scroll-law editions and the grain incident),
flow6-docflow.css (the construction itself, whose header comment is the
short form of this document).*

---

## DECISION · Jul 12, 2026 (Ed, after canvas review)

Scroll law 3(b)'s frame-walk is **permanent**, not interim: Ed chose the
canvas's persistent-actor construction for Deck → Lenses over the
origin-adoption proposal (choreography-grammar.md, Decision). 3(c) remains
on the books as a lawful pattern but has no current application.
