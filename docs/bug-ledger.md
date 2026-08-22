# THE BUG LEDGER — first-hand observations, parked without loss

Ed sees it on the device; the session enriches it with code pointers AT
FILING TIME (when the context to do so is cheap); a FRESH session fixes
it later reading only its entry + the named canon. That's the contract:
**every entry must be fixable by a session that has only this repo.**

## The laws of the ledger

- **File in the moment, fix in rounds.** Filing must never derail the
  work in flight — `/park` + your observations appends and returns (one call covers a whole list). Fixes are
  batched into focused rounds (the S1 device-round rhythm), grouped by
  the screen/construction they touch.
- **Ed's words stay verbatim.** The "Seen" field is the first-hand
  record — never paraphrased away. The session adds context BELOW it,
  never instead of it.
- **Entries are self-contained.** Name the files, the canon sections,
  and the laws that likely bind. A fixing session should not need the
  conversation the bug spawned from.
- **Append-only history.** Fixed bugs move to the CLOSED section with
  their verdict + commit — never deleted (they are the product's
  memory of its own weak spots, and regression fodder for the suite).
- **Kin threads are the birds-eye.** Entries name related ids (`Kin:`) so clusters surface; fix rounds are planned by walking kin chains.
- **The index is the board.** One line per bug; statuses are the lanes.

**Severity lanes:** `BLOCKER` (breaks the ritual/data) · `LAW` (violates
canon or a hard law) · `POLISH` (Ed's eye — feel, timing, copy) ·
`PAPERCUT` (small, real, safe to batch) · `FEATURE` (desired behavior
that doesn't exist yet — parked here so it rides the same board).
**Statuses:** `OPEN` → `IN-ROUND` (scheduled into a fix round) →
`CLOSED` (fixed + verified) · `PARKED` (deliberate, with the parker
named) · `WONTFIX` (with the reasoning).

## INDEX — open

| id | sev | screen/flow | one line | status |
|---|---|---|---|---|
| B-001 | POLISH | Cellar form | residual second movement on keyboard dismissal from LOW fields | PARKED (Ed, S1 r6) |
| B-002 | PAPERCUT (?) | App-wide | desktop dark-mode background much darker than iPhone Safari | OPEN |
| B-003 | PAPERCUT | PWA shell | standalone status-bar area is black, want Safari's grey | OPEN |
| B-004 | FEATURE | Approach | drag/flick the card with momentum physics, not just tap | OPEN |
| B-005 | POLISH | Lenses | footer instructions lost their shimmer (Approach still has it) | OPEN |
| B-006 | FEATURE | Lenses | tweaks-panel sliders for the flip hint + alternative hint treatments | OPEN |
| B-007 | FEATURE | Pour/data | define the pairing TYPES (bottle · wine type · region+style …) as components | OPEN (types approved D24; built at S4) |
| B-008 | PAPERCUT | Cellar rack | grapes·year line truncates the YEAR, not the grapes; width underused | IN-ROUND (Jul 31 — shared name block) |
| B-009 | FEATURE | Cellar rack | filter chips → grouped dropdowns (multi-select AND; single-select groups) | OPEN |
| B-010 | POLISH (?) | Cellar rack | scanned bottles never show grapes — reads as a different component | PARKED (Ed, D24: S3 fills grapes) |
| B-011 | POLISH | Cellar rack | "settling in" has no end state — needs a finished moment | OPEN |
| B-012 | PAPERCUT | Pour | long wine metadata pushes Card-meaning button into the paragraph | OPEN |
| B-013 | FEATURE | Pour | tap the card to flip, like the Lenses | OPEN |
| B-014 | FEATURE | Pour/tweaks | sliders for flip + content slide/fade timing, JSON export | OPEN |
| B-015 | POLISH (?) | Cellar detail | scanned wines extremely light on facts — are we using the data fully? | IN-ROUND (Jul 31 — name rule + sub-region/classification) |
| B-016 | PAPERCUT | Cellar identify | Cancel doesn't read as a button — wants the outline treatment | OPEN |
| B-017 | LAW (?) | App-wide | save toast sits behind iOS bottom chrome; needs a real toast system | OPEN |
| B-018 | POLISH | Pipeline | resolve's type-agreement penalty backfires when extract misreads colour | OPEN |
| B-019 | POLISH | Pipeline | golden run 1: conf-floor missing; merchant rows outrank the château | OPEN |

## INDEX — closed

| id | sev | screen/flow | one line | verdict |
|---|---|---|---|---|

---

## OPEN

### B-001 · PARKED · POLISH · Cellar form (keyboard dismissal)
**Filed:** Jul 17 2026 (S1 device round 6, carried from D19/D20) · **Parked by Ed** — small, non-disruptive; pick up only if a polish window opens.
**Seen:** a residual second movement on keyboard dismissal from the form's LOW fields (Country/Grape) survives the D19 fix.
**Context for the fix:** the D19 construction is the form layer at `100lvh + safe + 250px` with the one-motion blur glide (`celGlideHome`, flow6-cellar.jsx) preempting Safari's scroller clamp; D18/D19 in cellar-plan §0 carry the full conviction history. The residue is likely the glide's 320ms lead racing Safari's own settle on the deepest fields. THE FOCUS CONTRACT binds: never fight the keyboard while focused; restore only on blur-out.
**Verdict space:** timing/geometry tuning is mechanical; whether the residue is "gone enough" is Ed's device eye.

### B-002 · OPEN · PAPERCUT (?) · App-wide (desktop grey parity)
**Filed:** Jul 19 2026 (S2 device round 1, desktop comparison).
**Seen:** "On desktop in dark mode the background is so dark compared to how it looks on Safari on my iphone (I have my laptop set to dark mode) – Are they using the same grey for the background?"
**Repro:** open vinarcana on a dark-mode desktop next to iPhone Safari.
**Kin:** B-003 (the background-grey/theme-color family).
**Context for the fix:** likely NOT the same grey. Doc mode (phone) paints `.va-field` gradients `#1e1c1a → #181717 → #121110` with the html/under-chrome band at `#181717` (flow6-docflow.css); desktop never mounts the field (`.va .va-field { display:none }` outside doc mode) and keeps the older `.rx` background (flow2.css/round10.css). `index.html` theme-color is `#151413` — a THIRD grey. Audit which surface paints desktop and align the family.
**Verdict space:** which grey is canonical is Ed's call; the alignment is mechanical.

### B-003 · OPEN · PAPERCUT · PWA shell (status-bar backing)
**Filed:** Jul 19 2026 (S2 device round 1, home-screen app).
**Seen:** "When I open the app as a PWA, the area behind the status bar is black, but I want that color to be the color that displays behind the status bar in mobile Safari."
**Repro:** launch from the home screen, look behind the status bar.
**Kin:** B-002.
**Context for the fix:** index.html has `apple-mobile-web-app-title` but NO `apple-mobile-web-app-status-bar-style` meta → iOS defaults the standalone status bar to black. Wanted: the app's own grey showing through — `black-translucent` + the app painting to the top edge (viewport-fit=cover is already set; the rack head already clears the status bar in standalone via the D20 formula). Check the D20/round-6 standalone work in cellar-plan §0 before touching top insets.
**Verdict space:** mechanical once the target grey (B-002) is ruled.

### B-004 · OPEN · FEATURE · Approach (draggable card)
**Filed:** Jul 19 2026 (watching real users).
**Seen:** "I've noticed a lot of people try to drag and swipe the card on The Approach instead of tapping it… Being able to pull, drag, or flick the card too would be great… make the drag fun too, so it uses the momentum of your gesture and feels really satisfying during the drag and after the release."
**Kin:** — (its own effort; touches the most sacred choreography).
**Context for the fix:** the Approach is a STAGE (pan-eaten) — a drag must be pointer-event–driven on the card itself, never a scroll gesture; the card is THE actor (never remounted, one shadow/one clock — choreography-grammar). The draw choreography starts in flow6-root's `runDraw`; a drag would need a pre-phase that hands off into the existing timeline (or drives it scrubbed). Suite T1/T5 gate any change; this is a choreography feature, not a patch — read choreography-grammar.md WHOLE first.
**Verdict space:** the physics feel (thresholds, momentum, snap-back) is Ed-on-device territory; consider tweaks-panel sliders from birth (kin pattern B-006/B-014).

### B-005 · OPEN · POLISH · Lenses (footer shimmer regression)
**Filed:** Jul 19 2026 (S2 device round 1). "I'm not sure when they broke."
**Seen:** "The Footer instructions on The Lenses screen don't shimmer anymore no matter how long I wait for them… it should have the same behavior that the instructions in the footer on The Approach has."
**Repro:** sit on the Lenses; the foot line never shimmers.
**Context for the fix:** the Approach's hint (`.rx-draw-hint`, flow2-app.jsx:134) shimmers via `rxshimmer` (round10.css:83–86). The Lenses foot is `.rx-read-foot .rx-mono` (round10.css:93) — check whether the shimmer class/animation was ever wired there or got dropped in a round10→13 pass; also check any `fx` gating (`data-va-fx`) that might hold it at 0. Git-archaeology on round13.css is the cheap first move.
**Verdict space:** mechanical restore to Approach parity; cadence matching is Ed's ear.

### B-006 · OPEN · FEATURE · Lenses (flip-hint tuning + alternatives)
**Filed:** Jul 19 2026.
**Seen:** "The hint for the card (the lift & shimmer) on The Lenses is desperately in need of fine tuning… sliders in our tweaks panel [for] when the hint triggers, the duration of the lift and its animation curve, the shimmer position's duration and curve, the hold… then all the duration and curve settings for the transition back… I'm also not sure I even like this treatment… experimenting with some other options to maybe bend a corner, or indicate to users some way that they can tap the card to read the back."
**Kin:** B-014 (same tweaks-panel/export-JSON pattern), B-013 (flip-affordance family).
**Context for the fix:** `explorations/tweaks-panel.jsx` exports the shell (useTweaks, TweakSlider…) — build on it; the hint lives in the Lenses screen's fx system (flow2-app.jsx/flow3-motion.jsx, `data-va-fx`). Slider set per Ed's list, plus a JSON export he uploads back (B-014's contract). Alternative-hint experiments (corner bend etc.) are variants behind a tweaks toggle so they A/B on device.
**Verdict space:** all of it — this exists to put the dials in Ed's hands.

### B-007 · OPEN · FEATURE · Pour/data (pairing TYPES defined)
**Filed:** Jul 19 2026.
**Seen:** "the pairing could be either a specific bottle of wine, or it could be a type of wine, or it could be a specific region and style, or possibly some other types… clearly define the different types of pairings and define exactly what information we're showing for each type, where that information goes in the layout, whether the layout changes at all, and then stick to those structures and definitions as components moving forward so there's less winging it."
**Kin:** THE RECKONING AUDIT (component + data-model workstreams); cellar-plan §3.5's exact > producer > archetype levels are the same idea from the matching side — unify the vocabularies.
**Context for the fix:** today's pour panes render hand-curated POURS rows with no type discrimination. The definition work is design-first (Ed + canvas?), then a typed pairing shape in the data model (pairings already carry `level` in §3.4's schema) and one component per §6's component doctrine.
**Verdict space:** the taxonomy and layouts are Ed's; the typing/enforcement is mechanical after.

### B-008 · IN-ROUND · PAPERCUT · Cellar rack (grapes·year truncation)
**Round:** Jul 31 2026 — the grapes and the year become two spans inside the shared wine name block (component-audit M1).
**Filed:** Jul 19 2026 (S2 device round 1).
**Seen:** "When there are a lot of grapes… the string truncates, but it truncates the year instead of truncating the list of grapes… there's also much more width we could be using to display the grapes and year, but I think we're limiting the width unnecessarily right now."
**Kin:** B-010 (same `.gy` line).
**Context for the fix:** `celGyLine()` (flow6-cellar.jsx) joins grapes+vintage into ONE string; `.cl2-tile .gy` is nowrap+ellipsis so the END (the year, last in the join) is what clips. Fix: two spans — grapes `flex:1 min-width:0` ellipsis, year `flex:none`. Width: `.cl2-tile .tx { padding-right: 56px }` reserves the qty-chip column even below it — reclaimable for the lower lines (canvas values are LOCKED: check the boards before widening).
**Verdict space:** mechanical; the reclaimed width is Ed's eye on device.

### B-009 · OPEN · FEATURE · Cellar rack (grouped filter dropdowns)
**Filed:** Jul 19 2026.
**Seen:** "The number of sort chips in the cellar is already unwieldy… group filter types into dropdowns… multiple items from the dropdowns can be selected… E.g. cabernet sauvignon and merlot to only find wines that meet both… but some of the groups need to only allow one choice, like red wine or white wine or orange wine…"
**Kin:** the far-future SEARCH idea (Ed: unformed, keep the seam in mind).
**Context for the fix:** facets build in `facetPills`/`passes` (flow6-cellar.jsx) — already AND-combined, so the logic mostly holds; the redesign is the SURFACE (grouped dropdowns: type single-select, grape/country multi). The S1 combobox overlay (`ca2-dd`, focus-contract-hardened) is the house dropdown to build from — don't invent a second one. Membership/scroll laws apply (the pills row owns pan-x today).
**Verdict space:** grouping/UX is a design pass for Ed; a canvas board may be warranted before build.

### B-010 · PARKED · POLISH (?) · Cellar rack (scanned bottles show no grapes)
**Parked by Ed (D24, Jul 31 2026):** label-read grapes are not trustworthy enough to display; S3's enrichment fills grapes properly. Re-open at S3.
**Filed:** Jul 19 2026 (S2 device round 1).
**Seen:** "When I scan bottles they're never getting what the grapes are so it looks like the card is using a different structure or component than all the other wines in my cellar in the list. maybe it is using a different component, but I can't be sure."
**Kin:** B-015, B-008; THE RECKONING AUDIT.
**Context for the fix:** it IS the same component (`cl2-tile` renders every row). The gap is DATA, by S2 design: LWIN carries no grapes, and `confirmCandidate()` (flow6-cellar.jsx) lands matched records with `grapes: []` — so the `.gy` line renders vintage only. CHEAP INTERIM: the extract DOES read label-printed grapes (`fields.grapes`, curated-list-filtered in `openFormFromPhoto`) — adopt them into matched records' facts at confirm. S3's enrichment is the real fill. Note grapes drive the drink-window heuristic too (empty grapes = crude windows — Ed's "window didn't make sense" scan).
**Verdict space:** whether label-read grapes are trustworthy enough to display pre-S3 is Ed's call.

### B-011 · OPEN · POLISH · Cellar rack (settling has no end)
**Filed:** Jul 19 2026 (S2 device round 1).
**Seen:** "While the wine is being ingested and 'settling in', there's no end state to the settling in. I have to leave the cellar and come back… some way for the system to communicate that it has finished ingesting the wine and the spirits know just how to use it. Maybe… a confirmation chip like the one you see when you save a bottle to your memory from the Pour."
**Kin:** B-017 (the chip would ride the toast system); S3 (the real settle loop owns the true end state).
**Context for the fix:** D21 bounded the shimmer to a 30s landing moment but nothing re-renders at expiry (rack refreshes on next visit) and nothing marks completion. Interim: a timed refresh + a settled moment (tile un-shimmers in place, chip via B-017's system). The honest end state arrives with S3's `enrichment.status` transitions (§5.5) — design the moment so S3 slots into it, not around it.
**Verdict space:** the moment's feel + copy are Ed's; wiring is mechanical.

### B-012 · OPEN · PAPERCUT · Pour (Card-meaning button overlap)
**Filed:** Jul 19 2026.
**Seen:** "when there is a long wine name or a lot of data… in the Wine's top level metadata column to the right of the card and bottle image, it pushes the 'Card Meaning' button too far down so that it overlaps with the paragraph below it. That button should just be bottom aligned in that column."
**Repro:** a pour pane whose wine name/meta wraps long.
**Context for the fix:** the button is `.dr5-pourbtn` (flow5-reveal.jsx:47) inside the pane's meta column (dr5-/rv- family, round13.css) — make the column a flex column with the button pinned to its foot (margin-top:auto), meta text truncating/wrapping above it. Long-name overflow behavior of the name itself may need a rule too.
**Verdict space:** mechanical; exact rest position is Ed's eye.

### B-013 · OPEN · FEATURE · Pour (tap card to flip)
**Filed:** Jul 19 2026.
**Seen:** "On The Pour, I want to be able to tap the card to flip it too just like I can on The Lenses."
**Kin:** B-014 (flip timing), B-006 (flip-affordance family).
**Context for the fix:** the flip machinery already reaches the Pour — `__vaDrive.deeper("pour")` drives it (the T3 suite path); today's user entry is the Card-meaning button. This wires the pane's hero card tap to the same road. Decode-gate + actor laws apply (the flip is the `.dr-flip/.dr-flipper` construction); suite T3 gates.
**Verdict space:** mostly mechanical; whether tap-anywhere fights pane scrolling/swipes is a device-feel question.

### B-014 · OPEN · FEATURE · Pour/tweaks (flip + content-entrance sliders)
**Filed:** Jul 19 2026.
**Seen:** "The transition of the card flip and the slide up/ fade in of the content on the card is something I need to be able to tune too… more sliders in our tweaks pane so I can refine that by eye and export a json that I can upload to you so we can be done with all the fiddling."
**Kin:** B-006 (the same tweaks-panel + JSON-export contract), B-013.
**Context for the fix:** flip lives in the deeper/flip construction (flow6-deeper.jsx/.css, `dr-` family); content entrance is the flip face's staggered fx. Build on tweaks-panel.jsx; the export/import round-trip (Ed uploads JSON → session bakes values in) should be designed ONCE here and reused for every future tuning ask.
**Verdict space:** all dials Ed's, by design.

### B-015 · IN-ROUND · POLISH (?) · Cellar detail (scanned wines light on facts)
**Round:** Jul 31 2026 — thread (1) fixed at the source: wine names derive from DISPLAY_NAME at runtime (api/_lib/cellar-names.js); sub-region + classification now stored and shown (D24). Thread (2) stays S3's.
**Filed:** Jul 19 2026 (S2 device round 1 — the "Blanc" scan).
**Seen:** "The Wines I've scanned seem to be extremely light on facts and information on their wine list, so I want to make sure we're using the data we get from the database correctly."
**Kin:** B-010; THE RECKONING AUDIT (the data-matrix workstream owns the full answer).
**Context for the fix:** two threads. (1) Real S2 bugs: the wine LINE can derive badly for producer-prefixed LWIN rows (Ed scanned a wine whose name landed as just "Blanc" — see `wineLine()` in scraps/build-lwin-index.js and the display fallbacks; candidates also carry `designation`/`subRegion` the detail never shows). (2) By-design sparseness: stories/tastes/stats are S3's (D11). The audit's matrix decides what LWIN data the detail should surface NOW vs what waits for S3.
**Verdict space:** what belongs on the sparse detail is Ed's; the derivation fix is mechanical.

### B-016 · OPEN · PAPERCUT · Cellar identify (Cancel wants button dress)
**Filed:** Jul 19 2026 (S2 device round 1).
**Seen:** "at the very bottom there is a cancel button, but it doesn't look like a button at all because it doesn't have the outline style that all of our other buttons use. Let's make sure that has the right outline treatment so it looks tappable."
**Context for the fix:** `.ca-id-cancel` (flow6-cellar.css) is the canvas board's TEXT-LINK treatment (cellar-v1-detail.css lifted verbatim) — Ed's ruling here supersedes the board: give it the house outline pill (`.ca-cta.ghost` / `.cl-done` family), keep the safe-area bottom padding (bottom-anchored TEXT law becomes a small pinned CONTROL — stays inside the pan-eating stage layer, no anchor-law issue, but keep it modest).
**Verdict space:** mechanical; note the canvas delta in design-decisions when it ships.

### B-017 · OPEN · LAW (?) · App-wide (the toast system)
**Filed:** Jul 19 2026 (S2 device round 1).
**Seen:** "When I save a wine, the chip or toast that says the wine has been saved appears behind the bottom chrome in Safari on iOS. Let's take a fresh look at those confirmation toasts/chips and turn it into an actual toast component system… (like a confirmation that the bottle has been saved, or certain messages we'll need to convey once we start fixing the Whisper flow…). It also lacks any polish or elegance around how it appears/ disappears… general polish pass… positioned properly according to context."
**Kin:** B-011 (settled-moment chip is its first new customer).
**Context for the fix:** `.va-toast` (flow2.css:206) is `position:absolute; bottom:90px` in DOCUMENT space — bottom-anchored (why it sits behind/under the chrome band on device; also anchor-law-adjacent — the approved-anchor set in stage-construction §2 doesn't include it). Rebuild as a component: top-referenced or `--foot-vh`-tracked placement per context (the Pour's foot-pin precedent), entrance/exit on the house curves, one mount point in flow6-root (`showToast` at :310 is the seam; the cellar's `onToast` already routes through it). Band-probe after (a mispositioned toast is exactly the probe's prey).
**Verdict space:** placement-per-context + motion are Ed's; the system shape is mechanical.

### B-018 · OPEN · POLISH · Pipeline (type penalty backfires on misread)
**Filed:** Jul 19 2026 (Ed round 1 + golden run 1).
**Seen:** "10-fieuzal which it thinks is a red when it's actually a white."
**Repro:** golden fixture 10-fieuzal — extract read Red at conf 0.95 for the white Bordeaux; resolve then matched L'Abeille de Fieuzal ROUGE at score 1.0 — the wrong wine, confidently (the correct Blanc rows 1016936/1016369 sit demoted).
**Kin:** B-019, B-015.
**Context for the fix:** `score()` in api/cellar-resolve.js applies +0.05/−0.15 type agreement — an extract colour misread AMPLIFIES into the wrong candidate. White Graves labels are exactly where extract misreads. Options: soften/skip the penalty when colour words are absent from rawReading; or penalize symmetrically both siblings and let name tokens decide. Golden 10-fieuzal is the regression fixture; CELLAR_MATCH_THRESHOLD tuning is §5.8's checkpoint 1 duty.
**Verdict space:** mechanics mine; acceptable false-match rate is Ed's.

### B-019 · OPEN · POLISH · Pipeline (golden run 1 scoring insights)
**Filed:** Jul 19 2026 (golden run 1).
**Seen (run data):** 02-saxum's garbage read (conf 0.3, hallucinated "Maxville") resolved at 0.69 — three hundredths under the sheet bar; 07-suduiraut matched a MERCHANT row ("Lay & Wheeler (Chateau Suduiraut)") over the château proper at 0.93.
**Kin:** B-018, B-015.
**Context for the fix:** routing gates on resolve score alone (`runPipeline`, flow6-cellar.jsx). Add an extract-confidence floor (conf below ~0.5 → correction route regardless of score) and prefer producer-proper rows over négociant "( … )" producers in `score()` (api/cellar-resolve.js). Golden fixtures 02/07 are the regressions.
**Verdict space:** the floor value + merchant-row policy are §5.8 tuning calls for Ed after more real scans.

---

## CLOSED

*(nothing yet — closed entries move here whole, with verdict + commit)*
