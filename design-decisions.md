# Vintner's Arcana — Design Decisions & Taste Memory

> Living record of the user's taste verdicts so any session can pick up fluently.
> Newest rounds at the bottom. When in doubt, re-read this before designing.

## The product (one line)
Manufacture profundity via tarot, attach wine to that seared moment, and people
learn wine effortlessly. Dark, premium, intimate — "a message from the smoke."
Threading the needle: **ancient AND modern at once, sensual, never corny.**

## Hard rules (the user's voice)
- **No purple-gradient mysticism.** No costume-shop occult ("dark one… crimson chains").
- **No halloween.** Orange-on-black done wrong reads spooky/cheap. Avoid.
- **The knowing smile** is the voice: complicit, cheeky, one sly beat per passage,
  grounded in one true wine fact, ends on the bottle. Never judges the drinker
  (the Devil indulges WITH you). Voice rules locked on the Voice board (round 1) — user said "you nailed it."
- Serif lives at **display sizes only**; body copy is sans on mobile.

## Flow decisions (locked)
- Deck: **Major Arcana only (22)** for v1.
- Draw ritual: **R2 "One Breath"** — one tap, card rises, smoke parts. (Not the full shuffle ceremony.)
- Steering the lens: **optional whisper BEFORE the pull**; if no whisper, after the
  reveal you simply get the lenses (L1). Whisper → spirits pre-lean on one lens.
- Some cards have **5 lenses, not 4** — lens UI MUST scale past 4. Do not hard-cap at 4.
- Memory: simple chronological history + favorite toggle.
- Cellar: photo upload → AI identifies bottle → auto-maps to cards (user can correct mismatches, not hand-pick).
- App needs **dark mode AND light mode.**

## Color (decoded from user's reference screenshots, sampled literally)
- **NIGHT (dark):** charcoal `#181717` field + apricot/peach `#F5AA5D` (from "Ziporah").
  NOT red, not neon. Soft warm. Secondary accent amber `#C67F41`.
- **DAY (light):** greige `#DDDBD6` field + ink-navy `#152231`, with ONE amber `#C67F41`
  character as accent (from "Thorn & Tale"). Loved.
- Rejected: the orange from rounds 2–3 (`#e0571c`/`#f4500a`) — too halloween/too saturated.
- Cobalt `#395CA8` (from "Lovage"): user does NOT want the blue. He only showed Lovage
  for its wavy ligatures, the star detail above the word, and the shine inside the O —
  "fluid like smoke but considered, magical not try-hard." Borrow that DETAIL sensibility, not the color.

## Type verdicts
- HATE: **Cinzel Decorative** ("bad teen-girl mystery novel," "absolutely despise"). Dead.
- HATE: **EB Garamond italic** as body ("frustrating on mobile," reject) — BUT user wants
  to re-test the old pairing on new colors in case it was the halloween colors he hated, not the type.
- **Gilda Display** = "too much like a ghost story book, too quirky."
- **Prata** = "too fashion-house-y."
- **Cormorant Light** = "strange quirk, a wavering voice," meh.
- **Hanken Grotesk** (body) = "almost too open," not sold. Note: it read BETTER in "Light Pour II"
  (weight 400, ~15.5px) than in "Veil II-B" (weight 300, ~12.5px) — same family, the issue is
  weight/size, not the typeface. Use consistent reading weight, never tiny-300.
- LIKES: **Instrument Serif italic** — the "Modern Tongue" / V1 Ledger voice. Repeatedly called
  the strongest. Has teardrop terminals = the "thin flourishes with thicker terminals" he loves in Thorn & Tale.
- LIKES: a **script face used cleverly, one word at a time** (Pinyon/Ballet) — "the dance, not the
  whole ballet." Wants to SEE how it works into the experience, not just as a specimen.
- WANTS: the display serif to feel like "an expensive gin brand 300 years old on a remote sexy island."

## Layout verdicts (mobile)
- **V1 "The Ledger"** (round 3): tappable list, Instrument Serif. "Still one of the strongest" for
  readability/ease. Insight he offered: absolute reading efficiency is NOT the top priority — some
  difficulty makes you notice one option first, which feels more profound.
- **V2 "The Veil"** (round 3): faint full-bleed card art behind a centered card. He LOVED the background +
  card-on-top. Also liked that its background seemed to have UNEVEN transparency (faded at edges) — wants that explored.
- **"Veil II-A" Plaques** (round 4): good attempt, but make the options a **tappable list like V1 Ledger** instead.
- **"Veil II-B" Compass/quadrants** (round 4): loved the floating-over-veil layout BUT quadrants don't
  scale to 5; **no orange outline** on the selected option (explore other tappable/selected affordances);
  disliked the round-4 typefaces here (wants old pairing tested).
- **"Light Pour II"** (round 4, light mode): "feeling really great," loves the faint background. Unsure
  about the large display font — wants it dialed in. Body font here (Hanken 400) is the good one.
- **"The Weave"** (round 4): loves the concept — card name behind+through the card as it's revealed.
  Wants it BEAUTIFUL: a swash typeface whose flourishes wrap around the card as it slides through.
  Open to testing longer card names.

## References (in /refs, sampled)
1. Ziporah — peach on charcoal, THE leather feeling. 2. Lovage — cobalt, only for the ligature/star/shine details.
3. Elixir — terracotta surface, apothecary structure. 4. Nafia — type weaving/hugging imagery, sensual (loved).
5. Life Cracked — hairline editorial. 6. Hairline caps — looping connectors. 7. Thorn & Tale — north star:
tendril swashes with thick terminals, greige field, one amber character.

## Working example card
The Moon (XVIII). Lenses: I "It won't sit still" / II "Drawn by tides" / III "Nothing is what it appears"
(the beautiful lie) / IV "Trust the dark". Wine for the beautiful lie: Tyrrell's Vat 1 Sémillon (tastes
oaked, never saw oak — misdirection). Devil example wine: Turley Zinfandel.

## Round 5 verdicts (what to fix in 6)
- **Instrument Serif: REJECTED** — "unnaturally squashed," skinny/condensed. (At least no Cormorant quirk.)
  Stop using it as the hero. The user wants the **EXOTIC GIN-LABEL aesthetic** explored hard — an
  expensive 300-year-old gin from a remote sexy island: fluid, ornamental-but-considered, NOT skinny.
  Think Hendrick's/Monkey 47/The Botanist territory — engraved/Victorian/Didone/art-nouveau display serifs
  with real width and ball/teardrop terminals. (Fraunces, DM Serif Display, Playfair, Cinzel, Italiana to try.)
- **Stop mixing the script into every option.** He hates script woven through all specimens. The script's
  real possible home: a GIANT faint apricot backdrop word behind the card (see Reading idea below), not sprinkled everywhere.
- **Veil opacity:** Round-5 center was TOO opaque (hard to read). Correct recipe: center opacity = the
  Round-4 baseline (~0.085), and edges fade in a **mottled, organic** way to BELOW that baseline (even more
  transparent at edges). Never boost the center. No screen-blend glow.
- **The Weave: DROPPED.** Bad execution (picked "Star" = same length as Moon, looked off). Don't revisit.
  Replacement reveal idea to explore: **the card name turns to SMOKE the instant the sliding card hits it.**
- **Reading (Ledger-over-Veil):**
  - Nudged/preferred option = a **shimmering faint apricot wash that extends full-bleed to screen edges.**
    REMOVE the left vertical tick and the right arrow — "terribly unnecessary noise."
  - Pressing/selecting = make that transparent fill **a bit less transparent** (denser), static.
  - **Card size matters — make it larger.** Buy vertical space by (a) dropping the card name below the card
    and (b) shortening the footer to just "turn toward the one that knows you" (must NEVER wrap to 2 lines).
  - New name idea to try: card name set LARGE in the script face, faint transparent apricot, touching both
    device edges, printed BEHIND the card in z-space (since the eyebrow already shows "XVIII · THE MOON").
    Try it; abandon if it looks bad.
  - 5-lens scale confirmed working as a list. Also wants to see the **ORBIT/floating approach with 5.**
- **Font-pairing test:** doesn't hate it, but the script was hard to read. Back-pocket, low priority.
- **Light Pour:** dislikes Instrument Serif there too; **display can be BIGGER** (he never minded the
  Round-4 size — the "display shout" he objected to was Fable's massive DESKTOP reveal text in Round 2).
  Bring back the **glow/drop-shadow on the filled "Keep this memory" button.**
- **Reveal = MULTIPLE wines.** The framework often gives a style/producer or several wines, not one.
  Add subtle **pagination dots → swipe between 3–4 wines** that fit the lens (e.g. swipe past a white to a red).
  Add a **representation of the bottle** in the Reveal, possibly overlapping the card.

## Round 6 verdicts → Round 7 direction
- **DISPLAY FACE LOCKED: DM Serif Display.** User loves it ("rad typeface, kinda love it"). It is now
  the hero display across the whole UI. Fraunces/Instrument Serif/script are out as the primary voice.
- **Script behind the card: NOT working.** In the Reading either (a) bring the title back BENEATH the card
  in DM Serif, or (b) drop it so the card grows. Build both to compare card size. (Idea floated: DM Serif
  set huge + faint behind like smoke ebbing — optional.)
- **Reading list spacing:** move the lenses lower — gap(last lens → footer) should equal gap(footer → screen bottom).
  With only 4 lenses the card should grow even bigger; maybe fill freed space with "The Moon" in DM Serif.
- **Orbit: user genuinely likes it.** Make the card bigger. Remove the orange/apricot lens title (the nudge color).
  Optional: a blurred-edge transparent-black shape behind each option, bleeding off-screen (an "anti-lens-flare")
  to lift text off the card. Might already be perfect with just a bigger card.
- **Reveal: user HATED the Round-6 rebuild — REVERT to the Round-4/5 "Light Pour" composition** and apply
  these surgical fixes (he supplied a mockup, `assets/ref-reveal-mock` = his target):
  - Top eyebrow string was great — make it a wee bit larger.
  - Card LEFT-aligned (was great). Overlay the BOTTLE on the card so it partly obscures it — the bottle is the
    hero at this point in the journey. Pour name/grape sit to the RIGHT of the card+bottle.
  - Body text was great — just move it down (with the stat list) to make room.
  - Card + wine ~30% taller; everything else shifts down.
  - Button glow was TOO intense — tone it down to a subtle shadow.
  - Use the REAL bottle image `assets/bottle-vat1.png` (the CSS bottle was "a bit silly").
  - Stat rows in his mock: GRAPE / STYLE / COUNTRY / NOTES / PAIRS WITH (label mono left, value DM Serif right).
  - Keep the multi-wine pagination dots (swipe across 3–4 pours) — it's welcome, just must use DM Serif.
- **Smoke reveal:** make the dissolving name DM Serif Display (or a swash face closer to the v4-decoded inspo),
  not Pinyon.
- **Pre-draw / Approach screen:** apply the new style at MOBILE size (last one was desktop + still halloweeny).
  Use the user's card-back art `assets/card-back.png` (black with an apricot snake, stars, ruled border).
  Include the whisper-entry field and the one-tap-to-draw affordance.

## Round 7 verdicts → Round 8
- **Approach:** love the card stack + glow. Whisper must NOT be an always-open field (too prominent) — it's
  an ALTERNATE path. Put it behind a subtle OUTLINE BUTTON that opens the field on tap; short, alluring label
  in our tone. Hero line should be SHORT + in-voice (e.g. "go on, we don't bite" / something about imbibing /
  letting the spirits pick). Footer: decide between "ONE TAP, ONE CARD" and "TAP THE DECK WHEN YOU'RE READY."
- **Reveal — PARKED.** User realized the sequence is wrong: deck → tap → card slides off → card returns = the
  CARD is the aha, so showing the card name before the card is backwards. Don't chase Reveal layout until the
  sequence is resolved. (Quick fixes noted anyway: bottle scaled to card height, pour text closer/right, attr
  list stays BODY font not serif, eyebrow string small single-line like v4 Light Pour II + marquee if long,
  buttons anchored to bottom. Glow level is now right.)
- **Reading — THE FOCUS. Hierarchy from v2 "in the pocket":**
  - Card name lives ABOVE the card (the eyebrow handles it).
  - The knowing line ("things are not as they seem") is LARGER than body and ITALIC — italic = the spirits'
    voice / knowing smile. Process it immediately after the pull.
  - Lenses are NOT italic and a bit SMALLER (current 21px won't scale — shrink to ~17px).
- **Background fade:** current reads as linear top→bottom. TRY an uneven vignette around ALL edges; if it
  doesn't work, fall back to constant 8%.
- **Orbit = DESKTOP breakpoint only.** The list is the mobile reading. DM Serif treatment will translate to desktop.

## CONTENT — written R8 (voice-locked, from framework mappings)
Five flows fully written: The Moon (XVIII), Wheel of Fortune (X), Death (XIII), The Tower (XVI), The Fool (0).
Lens names ≤ ~26 chars to scale. Stored in `explorations/round8-content.jsx` (ARCANA object = source of truth)
and `content/arcana-content.md` (human-readable). Wheel has 5 lenses (the scaling stress-test); others have 4.

## ★ CONTENT STRATEGY — THE LENS vs THE REVEAL (codified, the heart of the product)
This is THE rule for writing all 78 cards. Round 8 got it wrong by shrinking wine descriptions
into lenses; Fable's Moon got it right. The correction:

**THE SPIRIT'S VOICE (knowing line, under the card):** the wise, strangely relatable stranger at the
bar. Observational and conversational — says the thing you can't help but nod at. Makes you FEEL the card;
never narrates it AT you, never bossy/preachy ("don't mourn it" = bad), never condescending-inevitable, never
ChatGPT ("everything you believed just cracked" = bad). The Moon is gold: "Things are not as they seem tonight.
Good — they rarely are." ("Good" expresses a feeling we all relate to; it doesn't instruct.)

**THE LENS (what you tap):** the user's FELT HUMAN RESPONSE to the card's meaning. Written like an
INVITATION from someone you'd be joining if you picked it — vaguely mysterious, alluring; you feel UNDERSTOOD
(that recognition is the profundity). NOT "attitude"/swagger. Derive each from the framework's INTENT — never
force a user's literal example across other cards (that means you missed the point).
RULES:
  - NEVER mentions wine, grapes, glasses, farming, vintages, producers, regions, or any wine mechanic.
  - Use "A" over "The" when it helps you recognize it as your own ("A shifting face" > "The shifting face").
  - Words you can lean into and embrace ("Trust the dark" > "Eyes closed").
  - Short subtitles that imply more; never weirdly anatomical ("your senses know more than your eyes" >
    "your gut knows what your eyes won't admit").
  - Subtitle may be the kindred voice ("pulled by something you can't see") OR a first-person line you'd say
    ("matter of fact — hand me the match").
  - Each lens still maps 1:1 to a framework wine idea — invisibly.

**THE REVEAL (after you pick):** where personal relevance becomes profundity. Connect the dots:
  1. OPEN by echoing WHY you gravitated to that feeling (acknowledge the human stance).
  2. Reveal the wine that embodies it, grounded in ONE true wine fact.
  3. Land on the bottle. One sly beat. Never judges.
  (e.g. Moon/beautiful lie: "You didn't come for honesty tonight — you came for something playing a part.
  So is this: Tyrrell's Vat 1 tastes of oak it never touched…")

Six cards now written to this spec: Moon, Wheel, Death, Tower, Fool, Hermit. See round9-content.jsx + content/arcana-content.md.

## ★★ CONTENT STRATEGY v2 — CORRECTED (supersedes the v1 notes above)
The v1 understanding was close but wrong in key ways. The corrections (from the round-9 critique):

**THE SPIRIT'S VOICE (under the card):** the wise, oddly-relatable stranger on the next barstool who
*observes a feeling* — never narrates the card AT you. Rules:
  - OBSERVATIONAL & CONVERSATIONAL, not declarative. "The way I see it…", "honestly?", "between us…".
  - NEVER condescending, bossy, or preachy. Banned: "don't mourn it", "that's the entire point",
    "Everything you believed just cracked" (= sounds like ChatGPT narrating).
  - Expresses how it FEELS (like the Moon's "Good — they rarely are."), making you intuitively
    understand & feel the card. You feel SEEN, not lectured.
  - Each card's emotional truth, felt: Death = something ending is worth a toast (celebratory, not grief).
    Tower = the false thing fell and you look relieved (not doom). Wheel = luck turning YOUR way (exciting,
    not condescending inevitability). Hermit = solitude as a worthy quest (warm, not bitter). Fool =
    the thrill of the unknown / ignorance as a gift (exciting, not "you're an idiot").

**THE LENS (what you tap):** an INVITATION, not a label-with-attitude. Written vaguely mysterious & alluring,
as if spoken by someone you'd be JOINING if you picked it. You should feel UNDERSTOOD — that's the profundity.
  - "A shifting face" not "The shifting face" — "A" lets me picture & relate; "The" implies a specific
    thing I can't identify, so I can't connect.
  - Evocative & embraceable: "Trust the dark" (lean in) beats "Eyes closed". Shorter implies more.
  - "your senses know more than your eyes" beats "your gut knows what your eyes won't admit"
    (shorter, less anatomical, implies more).
  - NOT "has attitude" / not nerd-talk. "Rules are made to be broken" (felt) beats "Broke the law, made
    history" (how nerds describe an iconoclast). "Let it burn / matter of fact, hand me the match" — the
    subtitle is a FIRST-PERSON conversational thing I'd SAY, not a description of me.
  - **Use my examples to infer the PRINCIPLE and write from the framework — do not pattern-match my exact
    words onto every card.** (The big meta-lesson: I gave examples to teach the feel, not to be xeroxed.)

**Reading layout fixes (round 10):**
  - REMOVE the crescent "moon" glyph from the status bar (just the wordmark).
  - Restore v2 breathing room between status bar → eyebrow/title → card (round 9 was too tight).
**Approach fixes (round 10):** keep the round-8 layout EXACTLY (deck position, big invite position). ONLY
  swap the whisper to the small icon-circle (liked) — do NOT let it expand to fill half the screen.

## ★★★ CONTENT STRATEGY v3 — THE REAL ONE (supersedes v1 and v2)
(From round-10 critique + parsing the Moon gold standard.)

**THE SPIRIT'S VOICE — how it actually works (parsed from The Moon):**
Structure: **a universal observation about reality** + **a sly, knowing acceptance**.
  - Line 1 = a TRUTH ABOUT THE WORLD the reader maps to their own life. "Things are not as they seem
    tonight." — not "you are being deceived" or "you've been lied to." States a condition, not a diagnosis.
  - Line 2 = the knowing lean-in: brief, philosophical, feels like a proverb you wish you'd said. "Good —
    they rarely are." Not a question, not an aside, not a "you" statement. A wry acceptance.
  - **NEVER says "you."** Never narrates what the reader is doing/feeling/thinking. Never asks a question.
    Never forces a conversational aside ("honestly?" / "the way I see it" / "right now?"). The reader does
    the mapping — that's what makes it feel like the cards know.
  - **NOT a rambling drunk. NOT a non-sequitur.** Short, inevitable, almost proverbial. Two lines max.
  - The user's rewrite for Death nails it: "All things must come to an end." — I intuit endings, I map it
    to MY situation, without being told what my situation is.
  - Tower rewrite: "A spectacular downfall." — objective observation. "Strange how light one feels in the
    rubble." — universal truth, not "you look relieved."

**THE LENS SUBTITLE — how it steers without prescribing:**
  - A **statement I can agree or disagree with** — not a second-person narration.
  - Steers specificity so the reveal is more resonant: "the old way already had its turn" (I know this is
    about breaking from tradition → the wine rebellion lands). "No looking back this time" (generic, could
    be anything → the wine has no runway). "The good stuff was never on the map" (I know this is about
    off-the-beaten-path → an obscure region wine lands).
  - BANNED: "you're eyeing right," "you didn't earn this one," "you want something that makes you earn it"
    — anything prescriptive about what "you" are doing. Replace with impersonal observations.

## ★★★ VOICE PROMPT — SINGLE SOURCE OF TRUTH
`content/voice-prompt.md` is the locked, reusable writing prompt (spirit's voice + lenses + batch
workflow). It supersedes all content-strategy notes above. `content/spirit-voices.csv` is the
spreadsheet of voices (approved/draft/pending). Grade drafts there before batch-writing more.

## Round 13 verdicts (The Reveal — locked geometry & canon)
- Reveal hero (user hand-tuned): card 220px @ left 20/top 15, rotate −4°; bottle 250px @ left 90; name column left 180, center-y 90.
- Eyebrow: status-bar size (9px), LEFT-aligned, card+numeral apricot / chosen lens dim; marquee drifts left if long.
- "THE POUR" = the apricot splash above wine name. Cellar match = grey "ONE MATCH SLEEPS IN YOUR CELLAR" line with apricot DOT, below the region line in the name column (not beside THE POUR). Same dot marks the lens row in the Reading.
- Pagination dots only (no "1 of 3" text). Scroll fade must be an OPACITY MASK on the scrollable content itself — never a dark/white gradient overlay (white overlay in light mode = terrible).
- Italic canon FLIPPED project-wide: spirit's voice ROMAN, lens names ITALIC.
- Reveal scroll region gains taste-characteristic scales (acid/sweet/tannin/body) below the attributes — executed elegantly (hairline track, apricot marker, mono end-labels), NOT the rounded-pill reference.
- Flow-prototype note: include a side tweaks panel with sliders for texture attrs per breakpoint so the user can tune values directly.

## PHASE BRIEF — THE FLOW PROTOTYPE (next phase; safe entry point for a fresh chat)
Build ONE interactive HTML prototype: Approach → tap deck → draw ritual → Reading → pick lens →
Reveal (swipe pours) → keep/fade → back to Approach. Use the locked v13 designs and approved CSV content.
- Include a side TWEAKS panel (tweaks_panel starter) with sliders for texture attrs (noise scale,
  opacity per mode), whisper-region height, and any contested spacing — per breakpoint — so the
  user tunes values directly instead of iterating through rounds.
- Status bar MEMORY / CELLAR links present but stub (Phase 2 pages).
- Draw ritual: R2 "One Breath" (tap → card rises → smoke parts). The card itself is the aha:
  never show the card's name before the card front (the round-7 sequence verdict).
- Persist pulls/favorites to localStorage (memory feature groundwork).

### Desktop breakpoint knowledge (bake into the prototype's responsive design)
- Reading on DESKTOP = the ORBIT layout (lenses floating around a bigger card); mobile = the list.
  User "still really likes" the orbit; card could be bigger; optional blurred-edge dark shape
  behind options for legibility over the card ("anti-lens-flare") — untested, might suck.
- Reveal on DESKTOP may use the massive "display shout" reveal text (user loved it in early
  desktop explorations — objected only when that scale leaked into mobile).
- DM Serif treatment confirmed to translate well to desktop.
- Texture is procedural SVG noise → crisp at any size, no generative images needed. Card-art
  veil at desktop widths: scans are ~816px wide; at ~10% opacity behind masks blur barely reads,
  but VERIFY on a big canvas before shipping; upscale one scan if soft.
- User accesses on desktop AND phone (wine store use case) — real responsive, not two mocks.

## FLOW PROTOTYPE v2 — CHOREOGRAPHY REFACTOR (current state, July 2026)
File: `Vintner's Arcana - Flow Prototype v2.html` + `explorations/flow2{.css,-choreo,-app,-reveal,-root}.jsx`.
(v1 flow files preserved but superseded. round10.css + round13.css still load first.)
- ONE persistent CardActor + EyebrowActor fly between measured slots ([data-va-slot]); screens are
  always-positioned layers whose elements enter/exit via .fx classes per beat. No screen crossfades.
- Phases: approach → pull → lift → drop → settle → bleed → rest → voice → lenses → reading →
  choose → slide → echo → pour → reveal → release → reform → approach. Beat sequencer with
  per-beat duration tweaks, tap-to-fast-forward (× slider), replay button.
- Card falls to a tunable OPTICAL CENTRE (tweak centerY), then glides UP into the reading slot
  while the voice fades in. Flip morphs box aspect: back 816×1285 → face scans 2100×3600.
- Veil NEVER scales: it bleeds from the card's landing point — animated @property radial mask +
  SVG feTurbulence/feDisplacementMap (#va-bleed-warp, tweak bleedWarp). Long bleed (~3.5s) runs
  CONCURRENTLY — never blocks the sequence. Reverses on release.
- Reveal: card hands off to the in-pane card at 'echo' (before the bottle enters, so the bottle
  layers in front); everything below the eyebrow scrolls (rv-vscroll) with top fade-on-scroll.
- Approach layout: deck+invite POSITIONED via deckTop %; whisper centers in leftover space; no
  height caps. Deck placement uses slotRectStatic (offset-based, animation-immune); Approach layer
  stays mounted forever (visibility toggle) so images never re-decode. Reform = staggered vaDrop.
- Phone-frame emulation: true 393×852, transform-scaled to window; all slot math normalizes via
  vaScale(). Desktop styles are class-based (.vw-desk) — accurate under emulation.
- Tweak defaults live in FLOW2_DEFAULTS EDITMODE block (user-tuned; treat as canon).
- Invitations: per-segment italics (INVITES2 in flow2-app) — some lines carry none.
- Draw hint is NOT apricot. Smoke UI-exit = canvas particles behind a tweak; literal text-level
  smoke dissolution intentionally DEFERRED to end of project (cherry-on-top decision pending).
- NEXT PHASE: polish the DESKTOP breakpoint (orbit reading, reveal shout, same beats/slots).

## FLOW PROTOTYPE v5 — TEXTURE + LAYOUT FIXES (current state)
File: `Vintner's Arcana - Flow Prototype v5.html` + `explorations/flow5{-app,-reveal,-root}.jsx, flow5.css`.
- **Vignette masks are now JS-built SVG data-URIs** (`vigMaskMob/Desk` in flow5-root): edge %
  and edge DISTORTION (turbulence baked into the mask) tweakable per breakpoint. The veil IMAGE
  is warp-free by default; separate "Veil image · Distortion" sliders (per breakpoint) opt it
  back in via #va-img-warp (.imgwarp class). The bleed displacement runs ONLY during
  p-bleed→p-lenses now — no steady-state background swirl.
- **Reading card is layout-tracked:** a ResizeObserver on the read-card slot re-places the card
  + eyebrow actors instantly whenever text tweaks reflow the column or the breakpoint flips
  (fixes: card not resizing with sliders; card name stranded off-center on mobile↔desktop switch).
- **Handoffs are same-frame swaps** (actor oDur 0 as the real element becomes visible) — killed
  the doubled card-shadow flash at echo and the lens-name brightness flash at reveal.
- **Orbit lenses have numerals again** — mirrored, numeral rides the OUTER edge (.namewrap).
- **Desktop pour columns unified:** headline/body/stats/scales/actions share --rv-col (620px
  default, tweakable "Column width · desktop").
- **Header links get invisible 44px-tall hit targets** (padding + negative margin, zero layout shift).
- **Bottle silhouette is DEAD.** Every pour has a real bottle: user-supplied generics
  assets/bottle-red.png / bottle-white.png assigned by wine color in flow-content.jsx.
- v4 files untouched; v5 EDITMODE defaults in FLOW5_DEFAULTS.

## FLOW PROTOTYPE v4 — DESKTOP POLISH (superseded by v5)
File: `Vintner's Arcana - Flow Prototype v4.html` + `explorations/flow4{-app,-root}.jsx, flow4.css`.
(Loads flow2-app first, then flow4-app OVERRIDES Reading; flow2-choreo/reveal + flow3-motion unchanged.)
- **Orbit is alive:** each lens floats on its own slow multi-sine drift (position + scale breath,
  periods 9–14s, per-lens phase) and the cursor gently GROWS a lens and PULLS it toward the pointer
  inside a proximity radius (smoothstep falloff, spring-smoothed, prefers-reduced-motion aware).
  One rAF loop writes transforms to an inner .orb-float wrapper; the outer element keeps slot math,
  positions, and enter/exit fx. Freezes during the choose beat. Tweaks: Float on/off, Drift px,
  Drift speed, Scale breath, Cursor reach/pull/grow, plus Orbit spread (lens distance from center).
- **Desktop fix (was the big layout bug):** the generic .fx.up.in transform rules out-specified the
  orbit elements' translate(-50%,-50%) and stripped centering on enter — lenses and the voice line
  sat anchored by their top-left corner. flow4.css restates fx states with centering baked in.
  Also: orbit lenses get width:max-content (abs-pos shrink-to-fit was crushing right-side subtitles),
  knowing line capped at min(52ch, 46vw).
- **Desktop veil vignette:** mobile's mottled fade lives on the oversized veil image, so on wide
  frames it fell outside the viewport and read flat. .vw-desk adds a viewport-scale mottled
  radial mask on .rx-veil (composes with the image mask). Tweak: "Vignette edge · desktop".
- **Desktop reveal measure caps:** body 64ch, stats/scales/actions 600px (the 780px column stays).
- Default viewport tweak is now "auto" (desktop phase); flip to "phone" for the mobile frame.
- `window.__vaDrive` = scripted walkthrough hook ({draw(id), pick(i), release(), hurry, phase()}).
- v3 files untouched; v4 EDITMODE defaults live in FLOW4_DEFAULTS in flow4-root.jsx.

## Assets
- `assets/cards/major_15..21.png` — weathered Rider–Waite faces.
- `assets/bottle-vat1.png` — real Tyrrell's Vat 1 bottle, transparent bg (264×960).
- `assets/card-back.png` — user-made deck back, apricot snake on charcoal, transparent rounded corners (816×1285).

## File map
- `Vintner's Arcana — Index.html` → links every round.
- Rounds 1–4 = exploration canvases (design_canvas starter). Round N files: `explorations/round{N}*.{css,jsx}` + `app-round{N}.jsx`.
- Card art: `assets/cards/major_15..21.png` (weathered Rider–Waite). Only 15–21 present so far.
- Each artboard tagged `data-screen-label`; user comments anchor to elements via `data-comment-anchor`.
