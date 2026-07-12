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

- **Scrolling views (Deck, Pour, Memory) scroll off the bottom edge of the
  device, behind translucent chrome, edge to edge.** Seeing the blocking
  background there is a primary FAIL.
- **Stages (Approach, Lenses) read as viewport-sized designs** — no
  scrolling, nothing moves — *without* triggering that same background.

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

1. **The scroll ballast (document flow).** The field itself — background
   gradient, etched veil art (sticky, zero flow footprint), paper grain
   (absolute, covers the document) — rendered as in-flow content with
   `min-height: 100lvh + safe-area + 100px overshoot` on stages. The
   overshoot guarantees Safari always believes there is somewhere to
   scroll: no seam ever shows behind the chrome, and the backdrop heuristic
   never fires. (Side effect to respect: stages have ~100px of *real*
   scroll slack. The pan rules below are what keep it unreachable.)
2. **The approved viewport anchors.** Exactly four sticky constructions,
   all hand-tuned during the chrome war: the **veil** (100lvh, negative
   margin, zero footprint), the **status pin** (zero-height), the **actor
   pin** (zero-height — the flying card's home), and the Pour's **foot
   pin** (the one `position: fixed`, top-referenced, VisualViewport-tracked
   construction). **This set is closed.**
3. **The stage UI layer.** A `.va-layer`: absolutely positioned, capped at
   `100dvh`, and — the crux — `touch-action: none`. It **eats the pan**.
   Every drag that lands on the stage dies here; the ballast below never
   scrolls; the user experiences a fixed screen.

## 3 · The laws

1. **THE POISON RULE (absolute, no exceptions, no new members).** Nothing
   in this app is ever `position: fixed`, viewport-sized-and-pinned, or
   bottom-anchored beyond the four approved anchors in §2. Not "scoped to
   one view", not "only during a transition", not as a paint hint. A
   sticky viewport-sized grain — even restricted to the flow views —
   summoned the backdrop on the deck and blanked the ride. Dead ends,
   never resurrect: fixed anything, scroll-proxy spacers, `--va-sy` scroll
   variables, viewport-locked textures, bottom-anchored bars, extra veil
   wrapper transitions.
2. **THE MEMBERSHIP RULE.** Every element that renders on a stage must
   live inside a pan-eating layer or carry `touch-action: none` itself.
   *Cautionary tale:* the Deeper affordance's invisible hit surface
   (`.dr-hit`) was rendered as a sibling of the layers — outside the
   pan-eating regime — so dragging the Lenses card scrolled the decoy's
   slack. Any interactive element added to a stage must be audited against
   this rule, and the suite's stage pan-block test (to be added) makes the
   audit executable.
3. **THE SCROLL LAWS (doc-flow).** The document scroll belongs to the
   scrolling views alone. Stages park it and block pans. Mid-choreography
   scroll motion is forbidden in every form — instant teleports blank the
   entire compositor tree (~110ms, measured on the real page at 60fps;
   even sticky layers vanish); wall-clock-eased glides catch-up-jump after
   frame stalls and blank identically; first-time transform promotions
   rasterize from scratch and blank. Scroll may only change: (a) under a
   user's finger, (b) as a frame-based capped walk beneath fully faded
   content — paced on the v6 glide budget (≤ ~680ms from any depth, the
   duration the shipped glide proved clean on device), frame-stepped so a
   stall can never catch-up-jump (the wall-clock form this law bans;
   never resurrect it from older log entries), or
   (c) never visibly — the swap-grammar origin adoption proposed in
   choreography-grammar.md §6.
4. **SAFARI PARKS STAGES.** After the chrome settles, Safari may leave a
   stage a few px into the overshoot slack; `scrollTo(0,0)` does not
   stick. Doc-anchored content rides coherently. Anything viewport-anchored
   (the actor on its pin) must convert through `pinDelta()` — never assume
   a stage sits at exactly 0.

## 4 · Verification duties

- **`scraps/choreo-tests.html`** runs before shipping any transition
  change: deck exit (fade-in-place, walk velocity cap, tile sink, card
  arc, home-by-end), lens pick (scroll 0, width stability, actor
  continuity), the flip (decode gate, no hole, −180°), release (glide
  smoothness, home at swap). **To add:** stage pan-block (synthetic drag
  on the Lenses card — `scrollY` must not move), handoff continuity
  (rect/rotation/shadow continuous within ~1px across the swap frame),
  and a backdrop probe if we find a way to detect Safari's blocking
  background programmatically.
- **Recorded video or it didn't happen.** Anything touching scroll,
  compositing, or the pinned set gets a safaridriver run on the REAL page
  (no iframe — the iframe hides document-scroll rasterization behavior),
  recorded via `simctl recordVideo`, frames extracted and eyeballed, with
  a luma trace for blank detection. Suite PASS is necessary, never
  sufficient.
- **The device pass is the final gate.** The simulator does not reproduce
  real chrome gestures or real rasterization pressure.

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
