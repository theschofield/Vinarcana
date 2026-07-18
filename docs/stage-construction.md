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

How each scrolls (Ed's architecture, Jul 12 2026; completed Jul 14
2026 when the MEMORY ledger left the document too): NOTHING SCROLLS
THE DOCUMENT. Every scrolling view's content scrolls in its own layer
ABOVE the shared field in z-space — the deck's grid (`.dk-scroll`,
layer sized 100lvh + safe + 100px overshoot), the pour's panes
(`.rv-pours` snap-x with per-pane `.rv-vscroll`, layer sized 100lvh +
safe — lawful only because the vscroll's mask fades content out above
the edge), and the memory ledger (`.mf-scroll` inside the `.mf-screen`
layer at 100lvh + safe + 100px overshoot — mask-free bottom, the
deck's sizing, carrying head + months + rows; its `.mf-flow`
child keeps `min-height: 100% + 1px` so even a one-row or empty
ledger is a REAL scroller whose overscroll containment binds) — all
with overscroll containment so no pan ever reaches the document. The
document stays stage-shaped on every screen (`va-flow` is dead),
every screen composes exactly like the Approach, and the pour's foot
bar keeps its locked top-referenced geometry as an ABSOLUTE child of
the pan-eating layer — dropping `position: fixed` there is what
finally cleared the pour's toolbar backdrop (band 2.03 → 3.57, the
reading's own clean value).

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

1. **The scroll ballast (document flow).** The document itself — sized
   `min-height: 100lvh + safe-area + 100px overshoot` on EVERY screen
   (unconditional since Jul 14 2026 — no view scrolls the document, so
   nothing ever reshapes it). The overshoot guarantees Safari always
   believes there is somewhere to scroll: no seam ever shows behind the
   chrome, and the backdrop heuristic never fires. (Side effect to
   respect: every screen has ~100px of *real* document scroll slack.
   The pan rules below keep it unreachable by the user — but the ENGINE
   parks into it freely; see law 4.) The
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
   this rule, and the suite's stage pan-block test (T5) makes the
   audit executable. The ONE lawful exemption is the SCROLL-OWNER
   layer (`.dk-screen`, `.rv-screen`, `.mf-screen`): it does not eat
   the pan — its inner scroller consumes it, with `overscroll-behavior:
   contain` (and, where content can be short, the ≥1px ballast) keeping
   every pan out of the document. A new scroll owner must be added to
   the `:not(...)` list on the pan-block selector in flow6-docflow.css,
   or the layer's own `touch-action: none` will kill its scroll.
3. **THE SCROLL LAWS (closed form, Jul 14 2026 — no view is the
   document).** NOTHING SCROLLS THE DOCUMENT: stages park it and block
   pans; the deck, the pour, and the memory ledger scroll themselves
   and contain their overscroll. Mid-choreography
   DOCUMENT scroll motion is forbidden in every form — instant teleports
   blank the entire compositor tree (~110ms, measured on the real page
   at 60fps; even sticky layers vanish); wall-clock-eased glides
   catch-up-jump after frame stalls and blank identically; first-time
   transform promotions rasterize from scratch and blank. The one law
   every ride, return, and release now obeys: **the document must not
   move a pixel** (suite T1, T2, T4, T7). The lawful-pattern ladder of
   the doc-scroll era — (a) under a user's finger, (b) the frame-based
   capped walk beneath fully faded content, (c) never visibly — stays
   on the books as history, but (b)'s last user (the MEMORY ride) is
   gone and `walkScrollHome` is retired; only belt-and-braces
   insurance against Safari's own parked px remains (glideScrollTop's
   y < 2 no-op, and the beat-time `scrollTo(0,0)` guards).
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
  (from a scrolled PANE — the document never moves), memory ride (from
  a scrolled LEDGER — the document never moves, the ledger's own
  scroll holds still, same-frame takeover on the row's mini card;
  seeds a throwaway ledger and restores the real va-memory), cellar
  rack (S1, Jul 17 2026 — from a scrolled RACK the document never
  moves through scroll, the E-A count sheet's open/close, or the
  release exit; the sheet must unmount after close; seeds and
  restores va-cellar). Eight tests, must be 8/8. The harness loads
  the app with `?va-off` — live-site runs must never mint cohort
  installs (docs/analytics.md).
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
  large-scale texture — the Reading (veil art), the Deck at MID-scroll
  (tiles), and the Memory ledger at MID-scroll (the probe seeds a
  ledger and parks a row's card/bottle art in the band; clean ≈ 4.3);
  the Approach and the deck's bottom are flat-on-flat there by design
  (A/B-verified pixel-identical across constructions) and stay
  device-only evidence. Calibrated on the stage-pin incident.
  KNOWN BLINDNESS (the ledger-cutoff lesson, Jul 14 2026): the band
  stats prove no-BACKDROP, never REACH — the grain textures even a
  bare field to a "clean" stddev, so a layer ending mid-chrome sails
  through. Reach/coverage claims are gated by RECT ARITHMETIC (the
  probe's memory step asserts layer-bottom overshoot ≥ 100px past the
  layout viewport; give every new mask-free scroller the same gate).
- **The device pass is the final gate.** The simulator does not reproduce
  real chrome gestures or real rasterization pressure — and its chrome
  translucency differs in degree (the band probe sees the backdrop, not
  the true device tint).

## 5 · BUILDING A NEW SCREEN — the recipe (Jul 14, 2026)

Distilled from the three conversions (deck → pour → memory) so the next
screen composes in harmony BY CONSTRUCTION instead of by another round
of convictions. Every screen in this app is exactly one of two kinds —
decide which first, then follow the recipe verbatim.

**A STAGE** (the Approach, the Lenses): nothing scrolls, nothing moves.
- One `.va-layer` over the shared field/veil/status — it composes like
  the Approach and inherits everything: docflow caps it at 100dvh and
  makes it eat the pan (law 2; suite T5 audits every touchable point).
- No hard bottom edge — content dissolves into the field's vignette;
  bottom-anchored TEXT pads out by safe-area (the rx-draw-hint pattern).
- The §2 anchor set is CLOSED: no new sticky/fixed/pinned construction
  without Ed's decision and a band-probe verdict.

**A SCROLL OWNER** (the Deck, the Pour, the Memory ledger): content
scrolls in its own layer; THE DOCUMENT NEVER MOVES.
- The layer: a `.va-layer` sized `100lvh + env(safe-area-inset-bottom)
  + 100px` so content runs edge-to-edge behind the translucent chrome
  AND past the physical bottom — a MASK-FREE bottom edge REQUIRES the
  100px overshoot (the deck's law, re-convicted on the ledger Jul 14
  2026: without it the layer's edge is a hard cutoff halfway behind the
  chrome on device). The bare `100lvh + safe` sizing is lawful ONLY
  when a bottom mask dissolves content above the edge (the pour's
  40px fade — the veil-colored document hides the seam). Pay the
  overshoot back in the end-of-scroll rest padding. Add the
  layer's class to the `:not(...)` exemption list on the docflow
  pan-block selector, or its inherited `touch-action: none` kills the
  scroll.
- The scroller inside: absolute inset 0 · `overflow-y: auto` ·
  `touch-action: pan-y` · `overscroll-behavior: contain` ·
  `-webkit-overflow-scrolling: touch` · scrollbars hidden. (The pour's
  snap-x panes are the exception that proves it: NO touch-action there,
  because the horizontal pan must chain up to the snap container —
  containment alone keeps pans out of the document.)
- THE BALLAST: if content can ever be shorter than the scrollport,
  guarantee ≥1px of scroll (`min-height: calc(100% + 1px)` on the
  scroller's one child) — overscroll containment only binds on a box
  that can actually scroll, and a pan that skips an unscrollable
  scroller lands in the document's slack.
- End-of-scroll rest: padding-bottom sits the last row clear of the
  expanded chrome (memory 100px + safe; deck 200 — repaying its
  overshoot; pour 101 — tuned to its bar. Ed tunes these on device).
- The top fade: scroll-armed `--vaTopFade` (registered in flow2.css;
  `.scrolled` past 4px, 280ms ease). Viewport-top scrollers span the
  menu band — `calc(max(24px, env(safe-area-inset-top)) + 72px)`;
  scrollers under a fixed header use the Pour's 38px. NO bottom fade on
  an edge-to-edge scroller.
- Row gestures follow the memory pattern: `touch-action: pan-y` on the
  row, pointer events own the horizontal axis, and anything revealed is
  a CLIP that tracks the drag — never a visibility flip.

**BOTH KINDS:**
- Mounting or unmounting NEVER reshapes the document — it is stage
  ballast, unconditionally, on every screen.
- Cards travel only as THE actor from its pin (never remounted, decode-
  gated); takeovers on a scrolled layer convert through `pinDelta()`;
  exits fade IN PLACE on the house curves (choreography-grammar §3).
- Wire the screen into `window.__vaDrive` so the suite and the probe
  can drive it headlessly.
- Duties before shipping: grow the suite (a new scroll owner gets its
  own THE-DOCUMENT-NEVER-MOVES test), add a band-probe step where the
  screen puts texture in the chrome band, drive the full loop in the
  sim, then Ed's device pass. Any test that seeds state must RESTORE
  it — the suite runs against the live site.

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

## ADDENDUM · Jul 17, 2026 (the Cellar composes by the recipe)

Sprint 1's three cellar screens — rack, detail, manual form — are the
§5 recipe's first from-scratch application: every one a SCROLL OWNER
(`.cf-screen` layers, `100lvh + safe + 100px`, `.cf-scroll` absolute
inset-0 / pan-y / contained / 1px-ballasted `.cf-flow`, end rest
`200px + safe`, menu-band top fade, mask-free bottom), all three
carried by ONE `.cf-screen` entry on the docflow pan-block `:not()`
list. Fixed furniture above a scroller (the detail/form circled nav,
the count-sheet scrim and sheet) carries `touch-action: none` itself —
the membership rule's self-carry clause. The suite's T8 and the
probe's cellar step (reach-gated) enforce it; the §5.6 count-sheet
EXPERIMENT (a strictly transient bottom-anchored sheet) is measured,
not assumed — sim shows full decay on unmount (band 3.05 → 2.22 sheet
up → 3.05 within 0.5s of close); Ed's device eye decides.

## ADDENDUM · Jul 14, 2026 (the ledger leaves the document)

The MEMORY ledger converted to the deck's/pour's layer construction
(design-decisions, "THE MEMORY LEDGER LEAVES THE DOCUMENT"), so 3(b)'s
frame-walk lost its last user and `walkScrollHome` is retired from the
code. Like 3(c), the walk stays on the books as a lawful pattern with no
current application. Nothing scrolls the document anymore — law 3 above
is rewritten to its closed form.
