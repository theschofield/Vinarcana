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

## FLOW PROTOTYPE v6 — DECK VIEW · HINT SHIMMER · SAFARI (current state)
File: `Vintner's Arcana - Flow Prototype v6.html` + `explorations/flow6{-root,-deck}.jsx,
flow6.css, flow6-safearea.css`. `vercel-deploy/` is the deploy mirror — keep it byte-identical
(verified in sync July 2026; re-copy flow files + design-tokens.json after any edit).
- **THE DECK:** grid of all 78 faces (thumbs), phases todeck → deck → deckfly. Tap a tile →
  actor takes over face-up and runs the TAIL of tlDraw (lift-equivalent → settle → bleed →
  voice → lenses). Desktop tiles tilt toward cursor + specular shine via CSS vars (no re-render).
- **Idle hint shimmer ("beckon"):** after `beckonDelay`s of inaction on the two waiting stages
  (Approach hint / Lenses foot line), the mono text catches a slow pass of light. Any press
  re-arms the timer. Implementation rules that MUST hold:
  · Hint elements are PRE-ARMED at rest in the same render mode (background-clip:text, flat
    gradient at the resting color) so arming never flips text-fill-color — that mode flip was
    a visible flash. The rest rule must stay BEFORE `.va .beckon` in flow6.css source order
    (equal specificity; later wins — reversed order makes the shimmer invisibly static).
  · Resting alphas matched exactly: dark mono 0.45 / dark hint 0.5 / light both 0.5.
  · Band geometry in absolute px (fixed 460px overhang) so both stages render identically.
  · Band colors pre-blended toward resting text color (Intensity slider) — alpha fade alone
    punches holes in clip-text. Tweaks: "Hint shimmer" fold (delay, per-mode color, intensity,
    per-stage pass period + band width). prefers-reduced-motion disables arming entirely.
- **Mobile-Safari handling (no UA sniffing anywhere):**
  · `flow6-safearea.css`: shell tracks 100dvh; bottom-anchored interactives (draw hint, read
    foot, pour actions, deck scroll) pad by env(safe-area-inset-bottom); status bar by inset-top.
  · Bleed mask is baked to a 640px raster PNG once per config (canvas) — animating mask-size
    on a live feTurbulence-filtered SVG re-rasterizes every frame (jank on mobile Safari);
    the SVG data-URI is only the fallback while the bake is in flight.
  · `theme-color` meta synced to night/day so Safari's translucent chrome tints correctly.
  · `deckTopMobile` token replaces `deckTop` on real touch devices ((hover:none)+(pointer:coarse))
    — compensates for phone chrome vs desktop preview of the same mobile layout.
  · `card-back.webp` preloaded in <head>; deck warm-up preloads all thumbs fast then faces slow;
    draw pre-decodes face + bg before the flip. `will-change` on the reveal bottle stops the
    end-of-transition shadow re-raster pop.
- **Pour handoff shadow (v6 fix, two layers):** (1) the actor stacks 2–3 imgs (back + poster +
  face) and flow2.css shadowed EACH — overlapping identical shadows composite darker (light:
  two 0.4-alpha ≈ 0.64 effective vs the real card's single 0.4), so every actor→card swap
  dropped shadow opacity for a frame (user's screen recording: one-frame luminance step at the
  cut). Shadow now paints ONCE, on the two mutually-exclusive imgs (card BACK, first child +
  LAST face img) — backface-visibility guarantees exactly one is painted at any flip angle, so
  the single shadow also ROTATES WITH THE CARD (a root/::before shadow does not — it sat as a
  static rectangle behind the flipping card, the follow-up bug). (2) the real Pour card sits inside the
  transform-scaled .hero-scale (0.76 short-desktop) which scales its RENDERED shadow; --rvShSc
  (measured at the slide beat) pre-shrinks the actor's sh-rev shadow to match. Verified via
  cascade harness: 0 img shadows; ::before === real × 0.76 exactly.
- **Pour handoff (v6 fix):** the actor→pane card swap is keyed to the actor's real
  `transitionend` (left/top/width), NOT the nominal slide end — CSS transitions start a few
  frames after the state move and the slide ease has a long tail, so a clock-timed cut caught
  the last ~3px mid-glide (card visibly jumped / "crossfaded into itself"). Verified: delta at
  cut is 0.0px. The clock event only arms the listener; 700ms timeout fallback.
- **Bottle PNGs warm first** in the boot preload (scanned from POURS data) — a cold bottle
  used to decode mid-Pour-transition and pop in.
- **Whisper open/close (v6 refinement):** flow6-approach.jsx overrides flow2-app's Approach —
  circle → field is a CROSSFADE (both states stay mounted in one grid cell), field rises on the
  house 620ms curve; the old hard React swap popped the circle away and rushed the field in at
  320ms. Input stays mounted so it's focused synchronously in the tap gesture (mobile-Safari
  keyboard requirement).
- **Deck warm-up:** thumbs preload in 8 PARALLEL lanes (~1s warm), then full faces amble on one
  lane after all thumbs land. Never serial-waterfall this again — one-at-a-time let users open
  DECK and watch tiles trickle in.
- **Mobile Safari edge-to-edge (v6, THREE-LAYER CONSTRUCTION — user's architecture, iOS 26):**
  scroll-proxy AND per-phase engage/disengage are both dead ends (jitter; wild jumps when
  layouts re-wrapped mid-transition). Constant construction on real phones (html.va-doc):
  1. THE FIELD scrolls: .va/.rx in document flow, min-height 100lvh, grain rides along.
     Deck grid & Pour panes unwrap into the document WHENEVER MOUNTED (html.va-flow-deck /
     -pour driven by mounts, NOT phase) so nothing re-wraps mid-choreography.
  2. THE VEIL + glow: position fixed, viewport-sized; vignette fades into the field so the
     imagery never stretches/re-crops as the page grows (the old "wild background jump").
  3. FLOATING UI: status bar / pour actions / dots are small fixed bars w/ safe-area.
     Scrims only where content scrolls under (status). NO bottom scrim on actions — the
     liquid-glass pill handles its own backdrop.
  Leaving a scrolled view: glideScrollTop() eases the window home as part of the
  choreography (never teleport scrollY — that's the chrome jump). Actor/eyebrow live in
  document space; vaSize()/vaH clamp to the visual viewport when grown. Geometry verified
  by harness (scraps/docflow-probe*.html): pour doc height == tallest pane, no horizontal
  document overflow, stage doc == viewport.
- **iOS 26 overlay law (FINAL FORM, five device rounds, July 2026): position:fixed is POISON.**
  Every round some fixed element — full frames, scrims, even small transparent bottom bars —
  summoned the opaque toolbar backdrop. flow6-docflow.css now contains ZERO fixed. Pinning is
  position:STICKY (in-flow to Safari → no backdrop; compositor → no jitter):
  · Veil: sticky top-0, 100lvh + bottom safe-area tall (edge lives below collapsed chrome),
    negative margin-bottom for zero flow footprint.
  · Glow: same recipe at 100svh (bottom ≈ the buttons when chrome is tall).
  · Status: hangs (absolute) from .va-status-pin — a zero-height sticky pin rendered
    DOM-EARLY in .rx (StatusBar6 moved before the layers in flow6-root; z-index 6+40 keeps it
    on top — do not move it back after the layers or sticky can't pin it).
  · Pour actions + dots: SUPERSEDED — see "FLOW v6 — iOS 26 SAFARI BOTTOM-CHROME: THE POUR
    ACTION BAR (locked)" below. (Simulator rounds proved the backdrop trigger is any
    BOTTOM-ANCHORED element, not fixed-vs-sticky and not the glow alone; the locked bar is
    fixed but TOP-referenced via --foot-vh.) The glow stays display:none in document mode
    (also user's call — every pinning scheme warped it; desktop keeps it).
  Eyebrow drift pass: ≤4px drift = swap without gliding (the 220ms correction read as a
  visible hop at the transition's end); >4px still glides.
- **Pour eyebrow ink: 80%** (flow2 mode-rev / round13 values). User-set; don't raise.
- **design-tokens.json is USER-OWNED as of July 2026** — they tune via ?studio and export.
  When adopting an exported file, ALWAYS sanitize `viewport` back to "auto" ("phone" is
  their studio session's frame toggle; shipping it forces the phone frame on desktop and
  disables doc-mode on real phones). Keep EDITMODE defaults in flow6-root synced to it.
- **Tweaks → defaults workflow:** panel edits persist in that browser's localStorage only.
  design-tokens.json is FETCHED at boot as the base layer — "Export design-tokens.json"
  (top of panel) downloads the snapshot; dropping it at the deploy root makes those values
  the defaults on every device.
- **Clip-text hint layers get a standing translateZ(0)** (flow6.css): fading an ancestor's
  opacity promotes the subtree mid-transition and iOS drops background-clip:text for the
  ride — the Lenses foot line VANISHED instead of fading on device.
- **Pour eyebrow reads at full ink** — flow6.css overrides flow2's mode-rev dim (0.8) and
  round13's 0.8 card-part to full --apri/--amber (round13 canon file untouched).
- **Approach→Deck grid mounts at dUiExit − 150ms** (user-tuned overlap).
  Field: stages (:not(.va-flow)) overshoot by +100px so no seam shows behind the chrome;
  scroll views size to content (no overshoot — it allowed pulling past the end).
- **Vignette floor:** vigMaskMob/Desk clamped edge at Math.max(0.55, …) — slider went to 25
  but nothing changed below ~55%. Clamp lowered to 0.25. (The real Safari fix is the veil's
  lvh sizing above; the low floor is for taste.)
- **Approach→Deck exit:** the deck grid mounts AFTER the approach fade completes (t: dur),
  same contract as the release path — mounting at t:0 crossfaded the two screens.
- **Deck lift is TWO values after all:** deckLift (all mobile breakpoints incl. phone frame,
  default 40 = old 10% top) + deckLiftDesk (default 32 = old 18% top). Both are % above the
  viewport's vertical midpoint.
- **Standalone/PWA (display-mode: standalone or navigator.standalone):** no browser chrome →
  docMode OFF (fixed works fine there).
- **Settle size (July 2026):** settle overshoot = settleScale × the LARGER of the Approach
  deck width and the final rest-slot width (was rest-slot only — on crowded lens screens the
  rest card is smaller than the deck, so the drop shrank below the deck it was pulled from,
  anticlimactic). Desktop unchanged via the max().
- **Serif "weight change" investigated (July 2026): NOT a regression.** v5 and v6 load the
  identical Google Fonts URL; DM Serif Display 400 (its only weight) verified loading and
  rendering via canvas probe. The perceived lightening = v6's new system-mode default showing
  LIGHT field for the first time (navy-on-paper serif reads thinner than bone-on-black bloom).
  Do not "fix" the font; offer night-pinning if it bothers the user.
- **Card actor shadow (FINAL FORM — one .shdw div inside .flip3d):** never put the actor's
  shadow on imgs (identity changes when the face mounts; first paint doesn't transition →
  double-shadow flash that decays on flow2's old fixed 600ms ease — the "jumps then drifts
  lighter" bug) and never on the actor root (doesn't rotate with the flip). The .shdw div is
  persistent, rotates/foreshortens with the card, and CardActor drives its box-shadow
  transition with the same duration/ease as the actor's move — the shadow always travels on
  the beat's own curve. sh-rev still scales by --rvShSc.
- **Pour-entry eyebrow jump (v6 fix):** slide-beat slot targets can go stale on device
  (viewport shifts mid-flight). The handoff now re-measures reveal-card + eyeb-rev after the
  slide's transitionend, glides the actors to the fresh rects (220ms) if drifted >1px, THEN
  cuts. Applies to card and eyebrow both.
- **Flip stutter (v6 fix):** the full-res face used to paint the moment it finished
  loading — often mid-flip (the pre-apex stutter on device). The actor now carries only the
  poster thumb through every moving beat (pull/lift/drop/settle/deckfly); the full face img
  mounts at rest (bleed onward). All actor imgs decoding="async".
- **Deploy conveniences:** `t.mode` is now `"system" | "night" | "day"`, default "system" —
  the app follows the device's prefers-color-scheme unless the studio switch pins a mode.
  Tweaks panel on deploy is gated behind `/?studio` or Ctrl+Shift+E (self-sends
  `__activate_edit_mode`; the design-tool toolbar path is unchanged). Favicons live in
  `vercel-deploy/favicon/` + site.webmanifest; deploy index title/og/apple-touch metas say
  "Vintner's Arcana". Deploy index uses PRODUCTION React 18.3.1 with SRI hashes (verified
  loading); the root prototype keeps the dev build for debugging.
- Reviewed July 2026 (post "shimmer timing / safari optimization" session): full flow drives
  clean (draw → reading → pick → reveal → release → approach → deck), zero console errors,
  no missing assets (78 faces + 78 bgs + 78 thumbs in root AND deploy), design-tokens.json
  has zero drift vs FLOW5_DEFAULTS.

## FLOW v6 — iOS 26 SAFARI BOTTOM-CHROME: THE POUR ACTION BAR (locked)
Files: `explorations/flow6-docflow.css` (`.va-foot-pin` + ghost-button blur) + `flow6-root.jsx` (`--foot-vh` effect).
- **The bug:** iOS 26 Safari paints an opaque BACKDROP fill behind its floating bottom chrome on
  The Pour — a hard-edged solid band that covers the app's textured background. It cost many rounds
  because it's subtle and easy to misread from stills.
- **★ Root cause (proven on the iOS 26 simulator):** the backdrop is summoned by ANY
  BOTTOM-EDGE-ANCHORED element — `position: fixed; bottom`, `position: sticky; bottom`, a
  viewport-tall fixed frame, and even a slim bottom bar ALL trigger it; the button glow / box-shadow
  does NOT. TOP-referenced positioning never triggers it (the sticky-TOP veil is clean). It is
  semi-intentional Apple behaviour: Safari opaques its own bar when it thinks the page has a bottom
  bar. **HARD RULE: the Pour action bar must NEVER be bottom-anchored** (fixed-bottom or
  sticky-bottom) — always top-reference it. This is the whole ballgame.
- **The fix (locked):** `.va-foot-pin` is a FIXED, TOP-referenced bar at
  `top: calc(var(--foot-vh, 100svh) - 88px)`. 88px is the clean floor just above the EXPANDED
  chrome; lower re-triggers the fill (the ~2–3px of extra room below is imperceptible and risky).
- **Chrome tracking (the win):** a flow6-root effect sets `--foot-vh` from
  `window.visualViewport.height` on its resize/scroll events (rAF-throttled). As the chrome collapses
  on scroll, `vv.height` grows, so the top-referenced bar rides DOWN to hug the shrinking pill — low
  when collapsed, clean when expanded, never bottom-anchored. (Fallback if the JS driver ever
  jitters: `100dvh` is the compositor-native equivalent of `var(--foot-vh)`.)
- **LET IT FADE (ghost) button:** the bar now floats over live scrolling content, so the ghost
  button gets `backdrop-filter: blur(10px)` + a faint tint to keep its label readable. Verified the
  blur does NOT re-trigger the toolbar backdrop.
- **Validation:** the Xcode iOS 26 simulator (`xcrun simctl … screenshot` of real Safari incl. the
  floating chrome). Reliable tell for the fill: are the palate labels visible THROUGH the translucent
  chrome (clean) or covered by a flat band (backdrop) — do NOT trust subtle texture reads. simctl
  can't inject swipe gestures, so the scroll/collapse test is on-device.

## Assets
- `assets/cards/major_15..21.png` — weathered Rider–Waite faces.
- `assets/bottle-vat1.png` — real Tyrrell's Vat 1 bottle, transparent bg (264×960).
- `assets/card-back.png` — user-made deck back, apricot snake on charcoal, transparent rounded corners (816×1285).

## File map
- `Vintner's Arcana — Index.html` → links every round.
- Rounds 1–4 = exploration canvases (design_canvas starter). Round N files: `explorations/round{N}*.{css,jsx}` + `app-round{N}.jsx`.
- Card art: `assets/cards/major_15..21.png` (weathered Rider–Waite). Only 15–21 present so far.
- Each artboard tagged `data-screen-label`; user comments anchor to elements via `data-comment-anchor`.


## Process note — exploration file namespaces (Jul 10, 2026)
A "round NN" collision broke a canvas: the Memory session and the Deeper Reading session both claimed `round15-*` in explorations/, and the later session overwrote the earlier one's css/content (Memory Explorations v1 went blank). Namespace exploration files by JOURNEY, not round number — e.g. `memory-v2-*.jsx`, `deeper-reading-*.css`. Memory v1's deps were restored as `memory-v1-*`.


## Memory journey — verdicts so far (Jul 10, 2026)
- Direction locked: the Annotated Ledger (list rows with the Pour's card+bottle pairing miniaturized at left; card eyebrow, wine serif, jot, grape·region mono; heart + small date at right).
- Jot font journey: Caveat (v2) → rejected; DM Serif italic too bold; Rock Salt rejected; Cormorant "didn't love"; final pick: **Nothing You Could Do**, 11.5px, hugging the wine name (1px gap).
- Hearted emphasis: **fine wave ink underline** under the wine name, apricot ~0.5, with ~6px clearance below the name. User also likes a highlighter/wash idea — v7 retries pending verdict.
- Filter: heart-circle read as "hearting the whole list" — replaced with a labeled **"♥ Hearted" toggle pill** (loved). Segmented alternative parked.
- Swipe actions: EDIT (apricot pen) then DELETE (no alarm color, icon only). Wells must mirror the heart/date column construction (30px icon box, 3px gap, 7.5px mono cap).
- The jot is prefilled by the deck, user-editable via swipe→edit (their idea, embraced).
- Dates: small mono margin notes, never a leading element. Lens never shown in Memory (meaningless out of context).
- Last row in a month drops its bottom divider. Bottle sits at left:30px in the pair; pair column 68px.


## Memory journey — FINAL (Jul 11, 2026)
Locked and consolidated for build. Point Claude Code at **"Memory - Final.html"** (canvas: list, hearted filter, swipe, empty — night + day each) with consolidated styles in `explorations/memory-final.css` + `explorations/memory-final-boards.jsx` (data: `explorations/memory-v2-content.jsx`).
- List: Annotated Ledger. Newest-first, month mono group rules; last row per month has no divider. Row = pairing (card −4°, h72; bottle left:30, h96; pair 68px) + eyebrow (numeral · card) + wine (DM Serif 18) + jot (Nothing You Could Do 11.5/1.45, 1px under wine) + grape·region mono. Right: heart toggle (30px box) + mono date 7.5, 3px gap.
- Hearted: fine wave SVG underline under wine (apricot .5 night / amber .55 day, 6px clearance). Highlighter idea rejected (v6–v7).
- Filter: "♥ Hearted" toggle pill in header; on = apricot border/fill; count line restates view. Hidden on empty state.
- Swipe: row −118px reveals EDIT (apricot pen, opens jot editing) then DELETE (icon, no alarm color); wells mirror the aside construction.
- Empty: chosen option C "the first note" — ouroboros bottle illustration (assets/bottle-snake-light.png user art; bottle-snake-dark.png generated recolor), "No memories yet.", NYCD line + wave, DRAW A CARD pill; 100px bottom padding; bottle 2px above title block.
- Tap row → The Pour for that wine.


## Memory — BUILT INTO THE FLOW (Jul 11, 2026)
Implemented from the FINAL canvas into the production app (index.html at repo root; there is no
separate vercel-deploy/ anymore — the root IS the deploy). New files: `explorations/memory-store.js`
(storage seam), `explorations/flow6-memory.jsx` + `flow6-memory.css` (the view; mf- classes verbatim
from the canvas sheet + an app-integration section). Wired in flow6-root/flow6-deck/flow5-reveal;
"Nothing You Could Do" added to the app font URL; `assets/bottle-snake-{dark,light}.png` adopted.
- **Storage seam:** `window.MemoryStore` (all/add/update/remove) over localStorage key `va-memory` —
  the accounts/DB backend replaces this one object later. Entry: { id, ts, card, lens, wine,
  sub:[GRAPE, REGION], bottle, jot, hearted }. `lens` (the numeral) IS stored — never shown in
  Memory, but it's the exact key for faithful Pour re-entry (multi-pour lenses land on the kept
  wine's pane via Reveal's new `initialWine`). One-time migration folds pre-Memory kept va-pulls
  into the journal.
- **Jot prefill resolution (needs a content-pipeline verdict eventually):** pour.jot (future
  content field) → the ten wine-keyed lines locked on the Memory Final canvas (MEMORY_JOTS in
  memory-store.js) → mechanical fallback: the last well-sized sentence of the pour's own approved
  blurb (reveal bodies end on the bottle — the punchline reads as a jot). No new copy is written.
- **Sub line display rule:** first grape only; region without producer/country (canvas-mock
  shortening, mechanized with a country list in `memorySubLine`). Stored sub stays raw/structured.
- **Entering Memory** = the Deck's two roads, verbatim: from Approach the UI-exit fade (tomem
  phase, deck stack + actor sink); from anywhere deeper the Release sink. Leaving = house release/
  reform. MEMORY status link uses the dk-link lit treatment; lit on tomem/memory/memfly.
- **Row → Pour re-entry choreography ("memfly"):** actor takes over the row's mini card same-frame
  (−4°, face up), rises to optical center on the Draw's lift beat while the ledger sinks on the
  UI-exit curve; layouts swap (memory unmounts, reveal mounts, veil bleeds); then the Choice tail
  plays verbatim (slide → echo → bottle → pour → glow) with the transitionend-armed handoff +
  drift re-measure (now factored as one `armPourHandoff` shared by pick() and memory re-entry).
  Eyebrow materializes at its Pour slot on the bleed beat's fade recipe (no Reading to fly from).
- **Re-keeping from a Memory re-entry is a no-op** (same wine ≠ a new night); keeping a DIFFERENT
  pane's wine from there is a real new keep. Normal-flow keeps always write the journal.
- **Swipe mechanics:** wells are visibility-hidden until a drag/open reveals them (rows are
  transparent — resting wells showed straight through; 320ms exit delay so they persist under the
  closing glide). Tap-vs-swipe judged by TOTAL pointer travel at release, not streamed moves (a
  fast drag can reach pointerup with no move events and must never read as a row-tap).
  rows are user-select:none. Inline jot editor = the jot line itself becomes an input (NYCD
  metrics, hairline apricot underline), flushSync-mounted so focus lands inside the tap gesture.
- **Delete** folds the row closed (max-height 170→0 + fade, 260ms), no confirm, no alarm color.
- **★ Actor race fix (general):** the settle re-place effect + deck-top ResizeObserver now bail
  while the motion clock is running — their rAF callbacks can read a one-frame-stale phaseRef and
  land a placeOnDeck(o:1) AFTER a timeline beat's setActor(o:0) (the "deck card haunting the
  Memory ledger" bug; any timeline leaving approach was exposed).
- **Desktop:** the ledger column rides the Pour's rhythm — head + list share width
  min(var(--rv-col, 620px), 100%), centered. (No desktop board existed; this is the build call.)
- **Doc-flow (phones):** html.va-flow-mem unwraps mf-screen/mf-list whenever mounted (mask off,
  document scrolls, safe-area padding; head clears the status pin at max(24px, safe-top)+52px —
  the deck's own clearance). Precedence deck > memory > pour; classes ride MOUNTS as always.
  NOT yet device-verified — needs the usual iOS 26 simulator/device round (list scroll, swipe vs
  page-pan, foot behavior). Everything follows the deck/pour's locked constructions.
- Verified in-browser (desktop night+day, 375px layout values, full loop draw → keep → journal →
  re-entry → release ×N): zero console errors; geometry matches the canvas numbers exactly
  (pair 68, card h72@−4°, bottle h96@left:30, jot 11.5/1.45 at 1px, aside 30px box + 3px gap +
  7.5px date, wave clearances, pill states, month rules, empty state).

## Deeper Reading — BUILT INTO THE FLOW (Jul 11, 2026)
Implemented from the FINAL canvas with ONE user-decided change: the canvas's two flip-hint
candidates (shimmer-band sweep / edge curl) are REJECTED. The hint, the hover, and the press all
speak the DECK VIEW's material language instead (user's call, this session):
- **Arrival hint (one-shot, never loops):** the resting Reading card does the deck-tile
  lift-tilt-shine as if a hand hovered over its BOTTOM-RIGHT corner (~950ms in, beat, ~800ms
  settle), then never again for that draw. prefers-reduced-motion skips it. Any real pointer
  contact interrupts it.
- **Desktop:** hovering the card = the deck-tile hover verbatim (tilt toward cursor, specular
  pool at the cursor, 1.05 lift, shadow deepens). Click flips.
- **Mobile (hover:none — capability query, no UA sniffing):** no cursor shine; touch PRESSES the
  card down (scale 0.97, shadow tucks under), release flips. Moving >12px cancels.
- **Mechanism:** the affordance layer (`DeeperAffordance`, flow6-deeper.jsx) writes CSS vars +
  classes straight onto the CardActor's DOM (the deck-tile no-re-render recipe). CardActor's
  flip3d transform now composes `rotateX(--drx) rotateY(--dry) scale(--ds)` after its flip
  (inert when unset) and carries a `.dr-shine` div oriented with the face.
- **The flip:** a dedicated container (`DeeperReading`) takes over the card same-frame (carrying
  the EXACT computed box-shadow of the card it replaces), then morphs rect+rotation+radius+shadow
  to the panel while rotating Y 180° on the house flip curve (easeFlip, tlDraw.flip.d × 0.75).
  Front face = card art; back face = the slab panel (deeper-v3 material, deeper-v5 geometry:
  card aspect, radius 18, W = min(87.2vw, 0.83·vh·0.5833) — exactly 340×583 on a 390×844 frame).
  Closing re-measures the origin slot and flies back; "TURN THE CARD BACK" / floating ✕ / scrim
  tap all close.
- Panel content per canon: THE GUIDEBOOK eyebrow + ghost ✕, 25px title, nowrap keyword
  procession, MEANING / AS A READING / BEFORE YOU RETURN rule-labels, closing line + pill.
  Scroll masks are dynamic opacity masks (bottom 64px at rest, top 76px once scrolled, bottom
  releases at end — the canvas's two states, interpolated). Floating ✕ gains the grain halo
  once scrolled. Scrim dims EVERYTHING including the status bar (canon z-order).
- **The Pour pill:** "CARD MEANING" skinny 36px outline pill 56px below the region line, rides
  the namewrap's echo fade. Opens the same panel from the Pour card (−4° origin honored).
- **Raised veil while open:** 1.45× the veil opacity token (relative raise, both modes).
- **Content gating:** `window.GUIDES` (arcana-guide.js) keyed by card id — ONLY moon is written.
  Cards without a guide get no hint, no affordance, no pill. New card copy must flow through the
  content pipeline; the placeholder structure is documented in arcana-guide.js.
- NOT yet device-verified: the mobile press path and panel scroll under doc-flow need the iOS
  round (the desktop pane can't emulate hover:none). Constructions follow the locked doc-flow
  laws (no fixed-bottom anything; layer eats the pan, panel scroll keeps pan-y).

## Deeper Reading — POLISH PASS (Jul 11, 2026, user verdicts)
First build's transitions were rejected ("treated like an afterthought"); corrected as follows.
- **★ HARD CSS LAW (the broken-veil postmortem):** `.va .va-veilwrap`'s `transition` list in
  flow5.css IS the v6 bleed (opacity + mask-size). Any later-loading sheet that redeclares a
  transition on that selector at equal specificity silently replaces the whole list and kills
  the veil reveal (it snaps to end mask-size — reads as wrong timing AND wrong vignette size).
  flow6-deeper.css did exactly this and must never again; the dr-open veil raise lives on the
  IMG's opacity only. When adding transitions near shared elements, check what transition list
  the house sheets already own on that element first.
- **Hint (final):** 700ms rest → 1600ms lean into the bottom-right corner pose on the SUPPLE
  curve (the light catches at 1400ms) → ~600ms hold → 1300ms settle back on GENTLE. One-shot
  per draw. Tilt vocabulary for the Reading card is DEEPER than the deck's by design:
  DR_TILT 13°/16° (deck: 9°/11°), corner pose ×1.2 — the card should feel about to give.
- **Flip (final):** full tlDraw.flip.d (1020ms) on easeFlip — the Approach flip's clock and
  curve verbatim. Rotation is 0 → **−180°**: the hinted bottom-right corner keeps coming toward
  the viewer and the card turns over to the LEFT (first build rotated the wrong way). The
  shadow lives on a .shdw INSIDE the flipper (rotates/foreshortens with the card, box-shadow
  transitioning on the flip's own duration+curve — the card-actor shadow law; the first build's
  static root shadow read as a rectangle hanging behind a rotating card).
- **Back-face text (final):** laid out at the panel's FINAL size from the first frame in a
  fixed, centered layer (--drPW/--drPH); the growing card shape is purely a MASK over it, so
  the text can never reflow mid-flip (verified: content width constant while the mask is still
  growing). The text layer fades in and rises 18px into place (480ms/700ms on the house
  entrance curve), delayed to 42% of the flip so it lands as the back face turns into view;
  on close it fades down first, then the card flies home.

- **The Pour's bottle steps aside (user verdict):** flipping from the Pour clashed with the
  bottle in z-space — worst at close, where the settled card popped BEHIND the bottle at the
  layer's same-frame swap. Fix: under dr-open the bottle slides right 26px and fades; it stays
  hidden through the whole open AND close, and animates back only after the layer unmounts and
  the real card is settled (verified: bottle at opacity 0 during the swap frame, mid-return
  0.42/15px after). The flip keeps its ONE direction (−180°) on both surfaces — the bottle
  yields, the grammar doesn't. Exit is QUICK (user verdict: 300ms fade / 480ms slide — gone in
  the flip's first third; destination-state transitions make the exit fast while the return
  keeps the bottle-beat fx glide).
- **Veil raise release timing (user-caught mismatch):** the ×1.45 raise was keyed to dr-open,
  which persists until the layer unmounts — so on close the scrim (620ms) cleared while the
  veil was still raised: the background flashed BRIGHTER than rest, then dimmed after the card
  settled. The raise is now keyed to a component-managed `dr-veil-up` class released on the
  close's FIRST beat with the scrim (verified: veil back at its rest token by +720ms, before
  the scrim finishes; no post-settle step). Law: everything the panel does to the field must
  release on the close's first beat, not at unmount.

## ★ THE RIDE — CORRECTED (Jul 11, 2026, supersedes the entry below)
The "one clock and one curve" fix below was WRONG on the real engine: it looked perfect in
Chromium (which coalesces programmatic scroll + CSS transitions into one paint) and jittered
violently on iOS Safari ("pulled back and forth… yanked down the whole time" — user, on device).
Root cause is the already-canonized --va-sy lesson in its general form:
- **★ LAW (final): on iOS, a JS-driven scroll and a CSS-animated element must NEVER be paired —
  the compositor applies scroll on its own clock while transitions sample on the main thread,
  and no duration/curve matching can make them composite atomically.** The house answer is the
  same one the veil and status bar already use: STICKY.
- **The fix:** during deck/memory flights the card actor hangs from `.va-actor-pin`, a
  zero-height sticky pin (the .va-status-pin recipe, DOM-early in .rx). The COMPOSITOR keeps it
  viewport-locked while the window glides home beneath it on the original tap-time 320ms cubic —
  the flight is a plain CSS transition in viewport space and the two motions cannot interact.
  At the settle beat (scroll long home) the actor hands back to document space at rest with
  zero visual delta (`pinDelta()` measures the live pin↔va offset, so any scroll state
  converts exactly). Same construction in runDeckDraw and openMemoryPour.
- **Validation workflow (new, reusable): the iOS simulator + `scraps/deck-ride-probe.html`.**
  The probe iframes the app (patching matchMedia to coarse-pointer on desktop hosts; unneeded
  on real devices), auto-drives deck → deep scroll → tap The Moon, traces the actor's on-screen
  Y per frame for 1.4s, and renders PASS/FAIL + metrics for a `simctl io booted screenshot`.
  Verified on the iPhone 17 Pro simulator, real Safari, scroll 978→0: card on-screen the whole
  ride (band [118, 341] of vh 754), 1 direction flip (the settle overshoot), maxJump 25px/frame,
  79 frames. Chromium-only verification of scroll choreography is now known-insufficient.

## Deck/Memory flight vs scroll-glide sync (Jul 11, 2026 — device bug, user-caught)
Tapping a tile DEEP in the scrolled deck (doc mode) made the card "zip up into the screen from
nowhere." NOT Deeper-Reading-specific despite the correlation (The Moon is simply seven rows
deep; The Fool at the top never glides): screen position = doc position − scrollY, and the
tap-time glide (320ms cubic, starting immediately) collapsed the page FASTER than the card's
flight (520ms silk, starting a few frames later) — the page dragged the card off the BOTTOM edge
for ~150ms before the flight overtook it.
- **★ LAW: a flying card and a gliding window must share ONE clock and ONE curve.** The glide is
  now launched INSIDE the flight beat's own rAF commit, with the flight's duration (dv(lift.d))
  and an easer sampled from the flight's own spring (springEaser(easeLift) — the same
  sampleSpring that generates the CSS linear() easing, so the two moves cancel per-frame). Fixed
  in runDeckDraw AND openMemoryPour (the Memory row-tap ride had the identical construction).
- glideScrollTop now accepts (dur, easer); all other callers (release/toDeck/toMemory exits,
  no flying card) keep the default cubic glide.
- Verified in a forced doc-mode probe (app iframed with a coarse-pointer matchMedia patch —
  reusable trick, since desktop panes can't set hover:none): takeover exact at doc coords at
  scrollY 1000+, landing settled at scroll 0. Continuous-time sync is by construction; the
  frozen-frame pane can't watch it, so the feel check rides the user's next device round.

## Deeper Reading journey — FINAL "The Flip" (Jul 11, 2026)
(Consolidated from the locked canvas — the session's verdicts weren't logged here as they landed.)
Point Claude Code at **"Deeper Reading - Final.html"** (night + day each). Styles:
`explorations/deeper-v5.css` over `deeper-v3.css` (slab material) over `round15.css` (gp-*
guidebook type) + `round10.css`/`round13.css`. Boards: `deeper-v{3,5}-boards.jsx` +
`app-deeper-v5.jsx`; content: GUIDE_MOON via `round15-{content,guide,panel}.jsx` + `round12-content.jsx`.
- **Concept: the surface IS the card.** On the Reading (Lenses) screen, tapping the card FLIPS it;
  the deeper reading is its back. Panel = slab material at the card's EXACT aspect (2100:3600 ≈
  0.583; 340×583 on a 390 frame), centered, card corner radius scaled up (18px), scrim + raised
  veil behind. Closing action reads "TURN THE CARD BACK".
- Head: surface-line eyebrow + ✕; title 25px "XVIII · The Moon"; keyword line 16px, apricot dot
  separators, each keyword nowrap (never broken mid-symbol). "A CHALLENGING CARD" tag hidden in v5.
- Body scrolls inside the panel: MEANING / IN A READING sections under mono rule-labels; bottom
  opacity mask marks the scroll (top mask at the end state).
- **Floating ✕:** the head's ✕ is a layout ghost; the real one floats top-right (28px, z 6) and
  gains a grain-carrying radial HALO once scrolled — stays tappable/readable over content.
- **Flip hint (one-shot on arrival, NEVER loops):** two candidates designed as static frames —
  (a) shimmer + tilt: sheen band sweeps the face while the card rocks ~1.6°; (b) edge curl:
  bottom-right corner lifts showing a sliver of the back. Real motion belongs in the flow
  prototype. WHICH HINT SHIPS: not decided on the canvas — confirm with the user at build time.
- **The Pour gains its one button:** with the flip carrying the Lenses entrypoint, The Pour gets a
  skinny 36px light-grey outline pill "CARD MEANING" (mono 8px / 0.22em), 56px below the region line.
- Content status: only GUIDE_MOON is written. Guidebook copy for other cards flows through the
  content pipeline (voice-prompt.md) before batch-writing.


## THE RIDE — single-home actor law (Jul 11, 2026)
Three generations of fixing "tap a deep card in the Deck → card zips in from nowhere" on iOS:
1. **Spring-matched scroll glide — REJECTED on device.** JS scrollTo and CSS transitions run on
   different threads in iOS Safari; they can NEVER be paired frame-to-frame (the --va-sy law,
   relearned). Felt like the card was "yanked back down the whole time."
2. **Sticky pin + conditional reparent — REJECTED on device.** Viewport-locking the actor on a
   zero-height sticky pin was RIGHT, but reparenting CardActor into the pin only during flight
   remounted the <img> — and iOS async-decodes freshly-mounted images, painting BLANK for
   ~150ms. That's the "big black flashes / card vanishes."
3. **Single home — SHIPPED.** `.va-actor-pin` (zero-height sticky, DOM-early next to the status
   pin, z-20) permanently hosts CardActor in EVERY phase. Pin space == doc space whenever
   scroll is 0; `pinDelta()` converts rects for scrolled takeovers. Actor is never unmounted
   between rides — retired actors fade to o:0 instantly instead of `setActor(null)`.
LAWS:
- **Never remount or reparent the card actor.** Any new/moved <img> on iOS = multi-frame blank
  while it re-decodes. One permanent DOM home; move it with transforms and rect takeovers only.
- **Decode-gate every face swap.** The Flip holds the swap (opacity 0, dr-swap class withheld)
  until `img.decode()` resolves (250ms cap), then swaps on a double-rAF. Scrim/veil start
  immediately so the beat still feels instant; only the card-hide + rotation wait for pixels.
- **`dr-swap` (hides card/hero) is a separate class from `dr-open` (scrim/veil/bottle)** —
  hiding the real card before the flip face has pixels is the hole.

## VERIFICATION — recorded video or it didn't happen (Jul 11, 2026)
Geometry probes (getBoundingClientRect traces) returned PASS while the screen showed black —
rects exist while pixels are blank. The Browser pane is Chromium; iOS bugs are WebKit-only.
The trusted loop for any transition work:
1. `xcrun simctl` iPhone simulator against `http://127.0.0.1:8123` (device 46FFD9B2…).
2. `simctl io recordVideo` the whole choreography; extract frames with
   scratchpad extract-frames.swift (AVFoundation; no ffmpeg needed) and EYEBALL them.
3. scraps/deck-ride-probe.html drives the ride + flip synthetically and overlays PASS/FAIL +
   FLIP DIAG (per-beat rotation angle / width / opacity / swap class) on screen, so the
   recording carries its own instrumentation.
Ship nothing transition-related on Chromium evidence alone.


## THE EXIT LAW — corrected (Jul 11, 2026)
The sticky-pin ride (above) was right; the SCROLL GLIDE that rode under it was not — two
device bugs traced straight to it:
1. **Deck zoom:** tapping a deep tile glided the window ~1000px to top at full speed WHILE the
   tiles were fading down in place — two animations fighting; the grid visibly rocketed up.
2. **Lens-pick contort:** on device the glide is INTERRUPTIBLE (touch/rubber-band), so a stage
   could arrive on a still-scrolled document; picking a lens then unwrapped The Pour into the
   document (va-flow-pour), the doc height collapsed, the scroll clamped mid-beat — the whole
   page contorted/squeezed.
THE LAW: **exits fade in place; the window never visibly moves.** Every exit (deck tap,
ledger tap, toDeck/toMemory, release, replay) teleports `scrollTo(0,0)` at its mounts-swap
beat — the moment the old layout has fully faded and everything still visible (card actor,
status, veil) hangs from a sticky pin, so the teleport has ZERO visual delta. Stages
therefore ALWAYS begin at scroll 0 (pick() keeps a belt-and-braces reset). The one glide
left is openDeeper — an in-place overlay open, not an exit; it was approved on device.

## THE CHOREOGRAPHY SUITE — scraps/choreo-tests.html (Jul 11, 2026)
The laws above are now EXECUTABLE. Run before shipping any transition change: open
`/scraps/choreo-tests.html` on the dev server (simulator Safari, Browser pane, or device) —
it drives deck-exit / lens-pick / flip / release and prints PASS/FAIL per law on screen
(machine copy: `window.__choreoReport`). It supersedes deck-ride-probe.html (deleted).
Asserts: window frozen during fades · tiles sink, never rise · actor continuity (no
teleports, no direction flips, opacity ≥ 0.99) · scroll home after each swap · .va width
constant through the pick · the flip never hides the card while its face is transparent ·
flip reaches −180°. Suite PASS is necessary, not sufficient — finish with recorded-video
frames (the VERIFICATION entry) and the user's hands on device.


## POLISH ROUND — apex flash · hint rebuild · deck cache · panel seat (Jul 11, 2026)
1. **Apex grey flash (deck ride):** the teleport was firing on a still-TALL document (deck
   mounted) — a bare 978px scroll jump makes iOS paint unrasterized tiles for a beat, in the
   html background colour (#201e1c — LIGHTER than the field's #1e1c1a→#121110, hence "grey").
   Fixes: the deck now UNMOUNTS in the same commit as the teleport (bleed beat — one
   reflow+paint, no stale-tile window), and html/body/theme-color moved to #151413, inside
   the field's range, so any residual transient is invisible. LAW: teleports ride a
   mounts-swap commit, never a bare scrollTo on unchanged layout.
2. **Flip hint rebuilt (user spec):** corner raise ONLY — no scale swell, no dr-hov shadow
   swap, no shine (the blend-mode shine repainted every tilt frame on device = the jitter).
   250ms lead after the lenses settle → raise 950ms (supple) → hold 300ms → back 340ms
   (gentle). One-shot, interruptible, house springs only.
3. **Deck thumbs never "load" twice:** the complete-at-ref check missed cached images (cache
   resolves a microtask after mount), so EVERY deck open re-ran the 240ms fade. Now: decode()
   gates the reveal; anything ready <160ms appears WITH its tile (ld-i, no fade); only true
   network loads fade. The background warm loop now decode()s thumbs too (fetch alone still
   popped on first open). Verified: reopen at +300ms = 78/78 instant, 0 blank.
4. **Deeper panel seat:** drPanelRect centered on vaSize().h = the 100lvh+overshoot BOX, so
   the panel sat low and slid under the bottom chrome. It now centers in
   visualViewport.height (a measurement — cannot summon the toolbar backdrop). Verified in
   simulator: top gap == bottom gap. LAW: anything centered on a stage centers on the
   VISUAL viewport, never the layout box.
Suite: 4/4 PASS after all changes (T1 witness now stops sampling once the deck unmounts).


## THE SCROLL LAW, THIRD EDITION — the quiet glide (Jul 12, 2026)
Real-page forensics (safaridriver driving simulator Safari on /index.html — NO iframe —
recorded at 60fps): the exit TELEPORT blanked the ENTIRE compositor tree for ~110ms at the
ride's apex — luma 0.30 → 0.12 — even sticky layers (card, status, veil) vanished, leaving
bare html background. A scroll jump + unmount invalidates everything; rasterization is
async on device; "one commit" does not mean "one paint".
THE LAW: **the window GLIDES, never jumps — but only under content that cannot show it.**
· Deck/Memory rides: tiles fade in place first (620ms, untouched choreography), THEN the
  window glides home on the bleed beat (~340ms) — card/status/veil/GRAIN are all
  viewport-locked, so the glide moves only the soft field gradient. Verified: luma never
  left the designed dim curve (min 0.221 vs the flash's 0.117).
· The GRAIN is now sticky/viewport-locked in doc mode (film grain rides the lens, not the
  scene) — flow6-docflow.css; this is what makes the glide invisible.
· Return paths (release/toDeck/toMemory): the shipped tap-time glide is RESTORED — the
  whole screen sinks at once there, so the glide hides inside the sink.
· Beats that measure doc-space slots carry `if (scrollY > 1) scrollTo(0,0)` INSURANCE for
  an interrupted glide; pick() keeps its defensive reset.
· The eyebrow (doc-anchored) places + fades via glideScrollTop's onDone callback — in
  place, never riding the moving document.

## HINT, SECOND CORRECTION — the corner pivot (Jul 12, 2026)
A center-pivot tilt see-saws: raising the bottom-right corner sank the top-left ("some
sort of rhombus transform" — user). The raise now lives on the actor's OUTER element
(--hrx/--hry with transform-origin 14% 10% — the inner flip3d carries rotateY(180) and
cannot move its origin without displacing the flip), with perspective on the pin. The
shimmer is BACK (user call): the .dr-shine pool fades in on the lifting corner over the
raise's own duration (--dshDur) and out with the return. Rhythm: +250ms after the lenses
settle → 950ms supple raise → 300ms hold → 340ms gentle return. Interruptions settle out
in 200ms, never snap.

## THE POUR — column laws (Jul 12, 2026)
· The name column is TOP-ANCHORED on phones: THE POUR label is the top; everything flows
  DOWN (round13 centered it — top 90 + translateY(-50%) — so a three-line wine name grew
  UPWARD into the headline). Desktop keeps its own tuned geometry (.vw-desk override).
· The blurb fills its measure (text-wrap: normal on phones): pretty-wrap's deep rag read
  as "the column is narrower than the attributes". Headline keeps pretty (widow control).
· Width audit (real page, measured): headline/body/stats/panes are ALL full-bleed 402px —
  there never was a width constraint, only the rag.

## BOTTOM-BAR BACKDROP — cleared (Jul 12, 2026)
The band behind Safari's bottom bar seen during simulator testing is NOT a regression:
A/B on the pre-session build (b04f75f, same journey, same scroll) shows the IDENTICAL
band; theme-color (#151413 vs #201e1c) A/B also identical. The crafted construction is
untouched. If it bothers on device, it predates this work — investigate separately.

## VERIFICATION — real page, real Safari, hard timeouts (Jul 12, 2026)
safaridriver (ships with macOS) + `safari:useSimulator` drives the REAL /index.html in
simulator Safari — executeScript replaces the iframe probes' fidelity gap (real document
scroll, real rasterization). scratchpad drive.py wraps it; EVERY request hard-capped at
15s (a hung W3C /actions call once ate 40 minutes — W3C touch actions hang against the
simulator; use executeScript dispatch instead). Recording leaks: if simctl recordVideo
dies unkilled, CoreSimulator holds "Host recording in progress" — reboot the device.


## STAGE CONSTRUCTION IS SACRED — grain lock scoped to flow (Jul 12, 2026)
The viewport-locked grain (sticky, 100lvh) applied to ALL pages summoned the iOS toolbar
backdrop on THE STAGES (Approach / Lenses) — the hand-tuned pages where any in-flow
viewport-sized element brings it back. User caught it on device. CORRECTED: the sticky
grain is scoped to `html.va-doc.va-flow` (deck/memory/pour) — every quiet glide runs while
a flow view is mounted, so nothing is lost; the stages keep round10's absolute grain,
their construction byte-identical to the tuned build. The pin also lost its perspective
property — the hint's depth now comes from perspective() INSIDE the actor's own transform.
LAW: **never add position/size/viewport-unit properties to anything that renders on the
stages.** If a flow view needs a pinned layer, scope it to .va-flow. Verified: grain
computes absolute on stages / sticky on deck; ride luma clean (min 0.202 = the veil dim);
Lenses bottom edge clean; suite 4/4.


## THE POISON RULE IS ABSOLUTE — and the walk home (Jul 12, 2026)
I violated the docflow hard rule twice (a sticky viewport-sized grain, then "scoped" to
flow views) and it summoned the toolbar backdrop on the deck — a PRIMARY FAIL: every
scrolling view must scroll off the bottom edge behind the chrome, edge to edge. THE RULE
HAS NO EXCEPTIONS AND NO NEW MEMBERS: the only pinned/viewport-sized elements in this app
are the ones in the hand-tuned build (veil, status pin, actor pin [zero-height], foot
pin). Nothing else. Ever. Not "scoped", not "only during", not paint-hinted.
The deck-exit scroll, final resolved form (every alternative measured at 60fps on the
real page): tiles fade down in place (untouched) → the window WALKS home under the faded
page — FRAME-BASED, 22px per painted frame (~1400px/s), because wall-clock eased glides
catch-up-jump after stalls and any jump blanks the whole compositor tree, as do teleports
and layer promotions (transform-compensated commits blank too — promotion rasterizes from
scratch). The faded deck STAYS MOUNTED until the rest beat (unmounting mid-walk collapses
the doc and clamp-jumps the scroll — same blank); the ledger likewise leaves at the slide
beat, with `leaving` held through choose/slide. Safari may park a stage a few px into its
overshoot slack after the chrome dance — scrollTo(0,0) does not stick — so the pin-hosted
actor tracks document scroll on the reading and re-places through pinDelta (verified: the
card sits at dxdy [0,0] with the stage parked at 10-22px). glideScrollTop starts its
clock on the FIRST FRAME, not at call time (the suite caught a 4.3px/ms catch-up jump).
Hint: corner pivot via the translate-rotate-translate sandwich INSIDE the flipper's
transform (pure vars, identity when unset) — no transform-origin change, no perspective()
on the actor, no new rendering contexts anywhere. Suite: 4/4; ride luma clean end to end.


## CANVAS REVIEW ADOPTED + THE MEMBERSHIP FIX (Jul 12, 2026)
The grammar and stage docs came back CANVAS-REVIEWED (claude-code-handoff/choreography-
grammar.md, stage-construction.md — now canon; every ⚑ resolved). Ed's DECISION: the
canvas construction stands for Deck → Lenses — same-frame tile → actor takeover at flight
start, ONE persistent actor to rest, no apex handoff (declined), the Lenses' card is a
hidden measuring slot. The frame-walk is the permanent scroll mechanism.
Landed with the adoption:
· `.dr-hit` joins the pan-eating regime (touch-action: none) — dragging the Lenses card no
  longer scrolls the decoy's overshoot slack (the membership rule, now suite-enforced).
· The walk is VELOCITY-held (2.1px/ms per painted frame, hard-capped per frame) — the old
  per-frame constant doubled its speed on 120Hz displays.
· The rest beat has two regimes: mid-walk → plain doc coords (== the slot's final viewport
  position; pin-converting aimed the card off-screen, caught by the suite at −613px);
  landed-and-parked → pinDelta glue. The faded deck releases only once the walk is home.
· Suite: T1 now rides the ABSOLUTE BOTTOM tile (scroll 4730 — real max debt, Ed's case);
  new T5 stage-pan-membership (elementFromPoint grid — every touchable point must resolve
  through touch-action:none); new T6 handoff continuity (actor → pane card cut ≤ 2.5px).
  6/6 PASS. Real-page bottom-tile ride: 480 frames, zero blanks, lands scroll 0, actor
  dxdy [0,0] on its slot.


## THE RAFT — five verdicts landed together (Jul 12, 2026)
1. **The walk paces the v6 glide budget** (≤ ~680ms from any depth, ≈7px/ms max — the
   duration the shipped v6 glide proved clean on device for months). The 2.1px/ms sim-
   conservative walk made the scroll indicator linger and finished late from the bottom
   row. Frame-stepped, dt capped at 24ms (bounded stall catch-up — never spikes).
2. **The full-res face is decode-gated and monotonic.** The old phase list FLAPPED it:
   mounted at bleed (130ms after the apex — the "corner radius snap" on the Chariot, which
   was never radius at all but the thumb→full-scan swap), unmounted at settle, remounted at
   rest. Now: mounts once decoded and not face-down, never unmounts; cold decodes fade in
   over the poster (vaFaceIn 240ms); the poster always stays beneath. Radius verified
   token-true (5.3% of width) throughout.
3. **The veil is decode-gated and PERSISTS behind the deck** (user law): toDeck keeps
   veilOn + the card, so the last card's etched art stays behind the grid (0.11) — the next
   ride recedes it and bleeds the new card's art in, never introducing texture from
   nothing. drawingId is phase-scoped so the persistent card doesn't put the grid in its
   leaving state. The bleed's crawl starts only once the -bg art has decoded (bgReady) —
   an undecoded art "popped in" wherever the decode landed.
4. **The hint settles out gracefully when interrupted** — picking a lens mid-raise
   unmounts the affordance, which used to wipe the tilt vars in one frame (the "card jumps
   a bit" at the pour flight's start). clearAll now routes a live hint through the 200ms
   settle-out.
5. **The slide RETARGETS at the echo beat**: the pour targets are re-measured against the
   settled pane 245ms before the cut and the running transitions re-aimed (CSS retargeting
   is smooth) — the eyebrow's downward hop at the cut was doCut's drift-glide correcting a
   stale target; now the cut lands exact and the drift path is a rare fallback.
Suite 6/6 (T1 velocity now windowed ≥30ms — adjacent-sample deltas read 2× true speed when
the sampler and walk interleave frames; threshold 12px/ms = teleport scale). Verified on
the real page: face imgs ["back","face","face full"] stable at 400ms AND 1.2s; veil
mounted+in at 0.11 behind the grid on return.
NOTE (sim law): the simulator cannot render Safari's chrome translucency — recordVideo
and screenshots show the bar region as flat black regardless of the page. Chrome
translucency is device-only evidence.


## THE WRAP ROUND — field geometry, veil un-persist, soft arrival (Jul 12, 2026)
1. **The lighter deck was GRADIENT GEOMETRY, not a missing texture.** The field's radial
   gradient sizes to its element: the deck's document grows to ~5500px, stretching the
   ellipse's bright core across the whole first viewport (deck reads LIGHTER), then the
   deck unmounts at ride's end, the element collapses, and the field snaps darker ("the
   background suddenly gets darker after the bleed"). Doc-flow now paints the gradient at
   STAGE size (100lvh + safe + overshoot, no-repeat) over the gradient's own end color —
   measured: approach 30.2/26.8 vs deck 30.1/26.6 (was ~6 points lighter). The grain was
   present all along. LAW: the field paints per-viewport, never per-document.
2. **Veil persistence REVERTED** — misread verdict: the etched veil does NOT persist onto
   the deck (toDeck clears card + veilOn again). The bgReady decode gate stays.
3. **The hint pre-snap** was the arrival re-place: placeOnReadSlot snapped the actor
   instantly on entering the reading (pin-vs-doc drift of a few px). It is now tolerant
   (≤1.5px: leave it) and soft (≤32px: 200ms glide); only real relayouts cut instantly.
   Principle: arrival corrections must never be visible as motion the user didn't cause.
4. **The ride's completion guarantee walks, never teleports**: the clock-end guard's bare
   scrollTo(0,0) violated our own scroll law with the layout fully visible; an interrupted
   walk's residue now drains through walkScrollHome (the tracker keeps the card glued).
5. **iOS's overlay scroll indicator cannot be CSS-hidden for document scrolling** — with
   the v6-budget walk it flashes ~0.7s, as the shipped glide always did. The 10ms-jump
   alternative is disproven twice on film (bare teleport: 110ms full-tree blank; compensated
   transform+jump: blank at layer promotion). The walk is the lawful mover; suite 6/6.


## THE APEX BREATH + THE VANISH, FOUND AT PIXEL GRANULARITY (Jul 12, 2026)
1. **The apex breath (user verdict):** the deck ride holds its apex +300ms before the
   sequence resumes (settle/bleed/rest/voice/lenses all shift). The walk starts at
   fade-end (dUiExit), unaffected by the hold.
2. **The layout-high guarantee, completed:** the walk re-arms itself if a live touch
   swallowed its final zero, and the doc-anchored fades (eyebrow, VOICE, LENSES) gate on
   `whenScrollHome` (bounded 2.5s) — an interrupted walk can no longer compose the
   Lenses visibly high; it composes when home.
3. **The finger-lift vanish was the CARD BACK.** The actor mounts pre-flipped; the back
   img had no backface-visibility:hidden, so its mirrored backface rendered behind the
   poster — and while a freshly-src'd poster decoded (1–3 frames, iOS), the opaque dark
   back was all that painted over the tile. Fixes: backfaces never paint on actor imgs
   (the correct flip construction), and the tile-hide + flight-launch are gated TOGETHER
   on the poster's decode (250ms cap), in one commit — until then the tile carries the
   image and the actor sits transparent on top. decode() resolving is NOT "painted" on
   iOS: hiding the tile one frame after decode still showed a dark frame.
4. **TESTING LAW — patch luma, not just whole-screen:** the takeover vanish was invisible
   to rect asserts (geometry ≠ pixels) and to whole-screen luma (a tile-sized 2-frame dip
   is under its floor). Takeover-class verification = crop the ELEMENT's rect from the
   recorded frames and trace ITS luma (measured here: 127→50→121 before, worst drop 8.9
   after — the designed fade gradient). Suite 6/6.


## THE 350MS WALK + THE SETTLED GATE (Jul 12, 2026)
The "Lenses paints high almost every time" regression was the gate's own timeout: it fired
mid-walk and composed the layout at whatever scroll remained — and the walk itself crawled
3-5× longer than nominal under device jank because its anti-jump throttle capped progress
at 24ms-worth per frame (real frames run 30-120ms mid-ride). Superseding verdicts:
· **The walk runs on a 350ms budget from any depth** (~13.5px/ms from the bottom row —
  brisk-flick speed, which native momentum sustains without blanking). Wall-clock dt, stall
  catch-up bounded at 40ms-worth/frame. Verified: bottom-tile ride, 301 frames, ZERO luma
  steps — steady speed was never the blank trigger; spikes were.
· **No fixed apex pause** (supersedes the 300ms breath): the doc-anchored fades (eyebrow,
  voice, lenses) gate on scroll HOME-AND-STABLE — at ≤2px, or parked-stable within
  Safari's slack (≤40px for 8 frames); the 3.5s ceiling is a last resort, no longer the
  common path. The walk accepts Safari's park (≤40px) instead of fighting it forever.
Landed: eyebrow 14px clear of the menu from scroll 4770; suite 6/6 (velocity threshold
tracks the budget).


## THE APEX HOLD, STRUCTURAL (Jul 12, 2026 — supersedes the 350ms walk entry)
User law, final form: the deck ride is TWO clocks around a hard gate. Clock A flies the
card to the apex and starts the 520ms walk (the v6 ceiling — 350ms/13.5px/ms flickered
the UI on device; 520ms ≈ 9px/ms is the proven speed). Then the ride HOLDS at the apex:
minimum 300ms, and as long as it takes for the scroll to be home AND stable (rubber-band
bounce at 0 must fully settle — 10 stable frames; parked ≤40px accepted; 6s ceiling).
Only then does clock B run the rest of the sequence (bleed → settle → rest → voice →
lenses, original relative rhythm). The Lenses layout structurally CANNOT compose while
scrolled — no gates on individual fades, no timeouts that fire mid-walk.
Verified: bottom tile (scroll 4770) — sequence resumed only at sy 0; landed sy 0, eyebrow
17px clear of the menu; suite 6/6.


## ★ THE PARK, FOUND — engine parks, the still gate, the keeper, the tile-hide (Jul 12, 2026)
"Lenses composes high after every scrolled deck pick" (100% on device, sim-clean for two
days of fixes) was FOUR stacked movers; only the first was ever being addressed:
1. **The gate passed at the walk's FIRST zero.** `y <= 2` composed instantly, with no
   stillness — on device, reaching 0 is what TRIGGERS Safari's chrome dance, which
   re-parks the document 10-40px a beat later, right as clock B composed; and the
   "accept a stable ≤40px park" clause composed the stage that many px under the menu
   by design. NOW: home = scrollY AND visualViewport.height both still for 200ms
   wall-clock (the dance shows in one or the other); a stable park is never accepted —
   its residue drains through another walk pass (≤4 attempts, then the 6s ceiling).
   Proven with a 24px park injected at the walk's landing: stillness broke, the drain
   landed 0, compose waited for 200ms of quiet (preComposeScroll max 0).
2. **★ THE ENGINE PARKS A SETTLED STAGE ON ITS OWN CLOCK — twice.** Real-page ledger:
   (a) the rest beat's document collapse (deck unmount, 5484 → 854) parks the window
   1-2 frames later ([3769ms, sy 0, rest] → [3823ms, sy 4-34, rest]); (b) the chrome
   dance parks it SECONDS after the ride, whenever the bar decides to settle (caught
   on film at reading+2s: sy ~33). No scroll of ours anywhere near either; no CSS
   opt-out exists (`overflow-anchor` unsupported, iOS 26.5 WebKit). **A parked stage
   SHEARS the composition**: the doc-anchored layout (eyebrow, voice, lenses) rides
   up while the menu and the PIN-hosted card hold the viewport — the screenshot that
   cracked it showed the card slicing through the voice line. This fired after every
   compose-time fix — why two days of gating never held.
   **The keeper experiment is DEAD** (a standing scrollTo(0,0) that fought each
   park): on device it left second-and-later rides high (parks larger than its 60px
   cap — the real chrome delta) and once displaced the Approach. Never resurrect
   scroll-fighting in any form.
   **The stage-pin experiment is DEAD TOO** (hanging the Approach/Reading layers
   from a zero-height sticky pin for park immunity): pinned full-viewport layers
   summoned the toolbar backdrop on EVERY page, the Approach included — Ed caught
   it on device AND in the sim footage, which broke the "sim can't show the
   backdrop" belief and gave us the chrome-band probe. Bisect (band stddev, sim):
   field+pin 2.03 BACKDROP · pin-only 2.03 BACKDROP · field-only 3.62 clean ·
   neither 3.45 clean — THE PIN IS THE TRIGGER, THE FIELD IS INNOCENT.
   **The living answer — coherence + stillness-gated reseats, never a fight:**
   layers stay doc-anchored; the eyebrow actor moved into the actor pin beside the
   card (small content on an approved anchor — bisect-clean) and placeEyebrowOnRead
   pin-converts like the card always has; the READING FOLLOWER (read-only scroll
   poll — engine parks don't reliably fire scroll events) re-places card + eyebrow
   on any movement so a parked stage rides AS ONE; the rest beat adds a ONE-SHOT
   collapse drain (~90ms post-unmount, ≤60px, while voice/lenses are still
   transparent); and THE RESEAT — a resting reading parked 3-60px drains once via
   the walk after 250ms of stillness (the dance is over; contiguous with Safari's
   own motion), two per reading max, then yield to the next gesture's own reset.
   Measured: a 32px bar-dance park at reading+1s reseated to 0, paths identical.
3. **THE 40PX STACKING LAW (Ed).** Even at a true scroll 0, the reading sat 10px high
   of the design: `.rx-read`'s fixed `padding-top: 44px` (flow2 phone-frame era)
   started the column 9px INSIDE the menu row. The law: the eyebrow container tops
   out at the MENU ITEM's bottom edge — status pad-top + the 13px mono line + the
   links' 16px hit padding — so its own 24px pad renders the card name letters 40px
   below the menu letters (16 + 24). flow6-safearea.css now derives it:
   `calc(max(24px, env(safe-area-inset-top)) + 13px + 16px)`. Mobile + phone frame
   only; the desktop orbit keeps its tuned geometry. Side effect to taste-check: the
   flex column gives the 9px back from the card slot (card renders ~9px shorter).
4. **The stale tile-hide (the empty deck slot).** The takeover's `pickedId` — which
   hides the tapped tile (`visibility: hidden`) for the same-frame swap — was never
   cleared, so every later deck mount rendered that card's slot empty. Cleared at
   every deck entry (toDeck) and at the rest beat's unmount.
5. **★ THE FIELD IS VIEWPORT-ANCHORED (Ed's construction directive).** The field
   gradient painted on the scrolling .rx, so scrolling the deck visibly slid the
   field and the walk slid it back ("the background scrolls" — Ed, on device). It
   now lives on `.va-field`: sticky, zero flow footprint, one viewport tall — the
   VEIL'S OWN RECIPE (top-referenced, the proven-clean shape; never bottom-anchored,
   no blend mode — the sticky-grain poison was its blend + its era's fixed frames).
   z-index -1: below all in-flow content (deck grid, pour panes are static).
   Only the grid moves when the deck scrolls; the field is pixel-identical from
   Deck to Lenses. The grain stays document-anchored (RAFT law — pinning it is
   poison), which reads as static anyway: uniform noise has no visible motion.
   Measured: field top 0 through an 800px user scroll and rock-still across all
   442 frames of a full ride, walk included.
Also: `whenScrollHome` (the superseded per-fade gate, no callers) removed.
6. **★ THE CHROME-BAND PROBE (scraps/backdrop-probe.py)** — the backdrop is
   SIM-DETECTABLE after all (Ed's catch). Texture through the chrome ≈ stddev
   3.5-45; the backdrop's flat fill ≈ 2.0 with a hard top edge. Valid only where
   the band carries large-scale texture: the READING (veil art) and the DECK at
   MID-scroll (tiles). The Approach and the deck's bottom are flat-on-flat by
   design (A/B-verified pixel-identical across constructions) — device-only
   there. MANDATORY before shipping anything that touches pinned/sticky/
   viewport-sized construction — it caught the stage pin red-handed and
   exonerated the field.
Verified, sim Safari on the REAL page (final build): band probe PASS (deck-mid
42.5, reading 3.62); suite 6/6; draw and deck paths measure PIXEL-IDENTICAL at
y 0 with the container stack exact (eyebrow container top == menu item bottom ==
53; letters 40px by container math); a 32px late park reseated; the field
pixel-identical to the old construction at the approach and deck-bottom, static
through scroll and ride; deck re-entry 78/78 tiles whole; desktop/wrapped loop
clean, zero console errors. Ed's device pass remains the final gate — the
Approach's chrome especially, where the sim cannot discriminate.


## ★★ THE DECK LEAVES THE DOCUMENT — Ed's architecture (Jul 12, 2026, supersedes the walk)
Ed's construction directive, verbatim intent: the Lenses must be built like the
Approach — indifferent to the deck — because the only shared elements are the
background layers, and the grid is "a grid of cards that sits ON TOP of those shared
layers in z-space (NOT WITHIN THEM) and scrolls independently... as soon as the grid
layer finishes fading out we should just be able to kill it."
THE BUILD: the deck grid is an independent scroller over the stage in every mode —
`html.va-flow-deck` is gone; the wrapped `.dk-scroll` (absolute, overflow-y: auto,
its own mask) now runs on phones too, with doc-mode adjustments: top clearance
max(24px, safe-top)+52px, `touch-action: pan-y`, `overscroll-behavior: contain` (the
grid owns its pans; overscroll never chains into the stage's overshoot slack), and
the layer at `100lvh + safe-bottom` so tiles run EDGE TO EDGE behind the translucent
chrome (100dvh stopped at the bar's top edge and bared the field — band-probe-caught).
THE DOCUMENT NEVER MOVES: stage-shaped at all times around the deck; grid scrolled
4770 internally while the document read 854 tall, window 0, through the entire ride
to the reading. The Lenses composes exactly like the Approach.
RETIRED WITH IT (deck path only): the frame-walk (the Jul 12 "permanent" decision is
superseded by this construction — there is no scroll to reconcile), the apex gate's
scroll/stillness conditions (pure 300ms hold remains), the collapse drain, the
reseat (its stillness window coincided with the hint's arm delay — Ed's "jumps up
when the hint starts"), and the whole park genre on the deck path. The MEMORY ride
keeps the walk (the ledger still scrolls the document by design). The follower stays
as a read-only belt. One race fixed in the hold: a stalled frame can collapse clock A
into one tick, and its end callback then reads the PRE-COMMIT phase — the abandon
check must tolerate "deck" for that frame or the ride freezes at the apex.
Suite T1 REWRITTEN to the new law: the document must not move a pixel during a deck
ride; the grid's own scroll must hold still while its tiles fade; premise = deep GRID
scroll. Verified: suite 6/6; band probe PASS (deck-mid 36.3 — tiles through the
chrome, edge to edge; reading 3.62); draw and deck paths PIXEL-IDENTICAL (gap 39/40
container-exact); hint window frozen across +0.3/+1.5/+3.5s; pour entry seated at 0;
deck re-entry 78/78; desktop loop clean, zero console errors. Ed's device pass is the
final gate: Approach + Lenses chrome, consecutive deep picks, grid-only scrolling.


## POLISH ROUND — grid edges, chrome grey, the deeper's exit (Jul 12, 2026)
· THE GRID HAS NO EDGE FADES (Ed): the .dk-scroll mask (top 52px + bottom 26px
  dissolves) is gone in every mode; in doc mode the grid layer overshoots the
  physical bottom by 100px (the stage ballast's own trick) so tiles run clean off
  the screen and behind the translucent chrome with no seam and no dissolve.
  CONSEQUENCE FLAGGED for Ed's eye: scrolled tiles now pass under the raw menu
  text (the old top fade was the deck's version of the pour's top fade-on-scroll;
  no status scrim exists anywhere in the app — adding one is a known backdrop
  risk, "opaque scrims on floating bars" is on the dead-ends list).
· THE CHROME FILL MATCHES THE STATUS GREY (Ed): theme-color + html/body background
  are now the field colors the menu sits on — day #dddbd6 / night #181717 —
  replacing the darker screenshot-sampled composite (#d2cfc9 / #201e1c), which
  read as a visibly darker band wherever Safari paints an opaque fill (most
  obvious against The Pour's pre-existing bottom-chrome backdrop, still unfixed
  and next on Ed's list).
· THE DEEPER'S TEXT, both directions (Ed): entrance fade lengthened 480 → 760ms
  (the 18px rise stays 700ms); on close the text REVERSES the entrance — drops and
  fades (440ms fade / 520ms drop, accelerating curve) LEADING the flip-back by
  140ms. Started together, the swift flip curve passes 90° almost instantly and
  backface-visibility guillotines a concurrent exit — it read as a vanish, which
  is why the reverse "didn't exist" despite the CSS returning to base.
Verified: suite 6/6; band probe PASS (deck-mid 42.8, reading 3.57); the close on
film — text visibly dropping and fading before the card turns, Lenses seated
beneath; the grid's bottom edge crisp behind the chrome pills.

· ADDENDUM, same round: the grid's END-OF-SCROLL REST — doc-mode padding-bottom
  calc(200px + safe): pays back the 100px layer overshoot and leaves ~100px of
  clearance, so the last row settles fully above the expanded chrome (measured:
  last row bottom 654 of 714). And PARAGRAPHS FILL THEIR MEASURE app-wide —
  text-wrap: pretty removed from all body text (gp-para, gp-kwline,
  gp-close-line at source; .rv-body via the flow6 override, desktop included;
  round13 untouched). Ed: lines were breaking early "even when there is clearly
  enough room for the next word" — the rag/widow control isn't worth short
  lines. Display text keeps its deliberate wrap control (rv-headline pretty,
  rv-wine balance, the voice line). Suite 6/6.


## THE SCREEN IS WHAT YOU CAN SEE — vaH clamps in all of doc mode (Jul 12, 2026)
Ed's diagnosis, exact: the deck lift's "center" was the center of the BALLAST.
`clampVaH`/`vaSize()` clamped .va's height to the window only under `va-flow`
(pour/memory) — but the STAGES carry the ballast too (100lvh + safe + 100px), so on
Safari the Approach hero's margin resolved against 854px instead of the visible 714:
the deck sat ~21px low (his "always felt weirdly low on Safari"), and the flight's
Optical centre rode ~8% low of the tuned token. The gate is now `va-doc`: the screen
is the same box the deeper reading centers within — the visible viewport (Ed's
definition). Measured after: --vaH 714 against offsetHeight 854; hero margin
128 → 107; the settle's card center at exactly 44% of the viewport (314px). The
reading's rest layout is slot-based and unmoved (fingerprints identical); vh-tall
consumers are desktop-only; the studio phone frame never had ballast, so tuned
values there are unchanged — the device now matches them. Suite 6/6.

· CORRECTION, same day — `text-wrap: normal` DOES NOT EXIST. The valid neutral
  value is `wrap` — `normal` parses invalid and is silently dropped, so BOTH the
  original phone override (the Jul 12 column-laws "fix", a placebo all along) and
  today's first attempt left round13's `pretty` alive on the Pour body. Safari's
  pretty reshapes every line (79-88% fills measured); with `.va .rv-body
  { text-wrap: wrap; }` the body fills 97-98%. The headline's "67/27/27" scare was
  a probe artifact (its roman+italic spans read as separate fragments — it renders
  ONE line); rv-headline keeps its canon pretty, rv-wine keeps balance. LAW: never
  write `text-wrap: normal`; the probe for wrap work measures LINE fills on
  single-span text only.


## ★★ THE POUR LEAVES THE DOCUMENT TOO — and its backdrop dies (Jul 12, 2026)
Ed's review request, then his call: build The Pour like the Deck. Findings that
drove it (all measured on the real page in the sim): the doc-scroll pour read the
chrome band at 2.03 = FLAT FILL (the backdrop, present in the sim after all)
against the reading's 3.57 with identical veil/field/grain; the "weird color
break" at scroll end was the page's visual floor — the document sized exactly to
content, so the field/veil reach (100lvh + safe) ended on a hard line with the
raw page background below it; and the last palate row sat 33px UNDER the buttons
at max scroll (clearance 24px + safe against a bar band ~110px tall).
THE BUILD: `va-flow-pour` is dead — the wrapped construction (rv-pours snap-x,
per-pane rv-vscroll with the r13 opacity mask) runs on phones too, the rv-screen
layer at 100lvh + safe so panes scroll edge-to-edge behind the chrome,
`overscroll-behavior: contain` on both axes (no pan ever reaches the document,
no rubber-band past the field), vscroll end padding calc(200px + safe). THE FOOT
BAR keeps the locked top-referenced geometry (top: foot-vh − 88px) but drops
`position: fixed` — it is an ABSOLUTE child of the pan-eating layer now. The
fixed bottom-hugging bar was the prime remaining suspect, and the band probe
convicts it: pour band 2.03 → 3.57 (the reading's own clean value) after the
conversion. The ghost button's blur rides along (rescoped va-flow-pour → va-doc).
Only the MEMORY ledger still scrolls the document.
Verified: band probe PASS all three (deck-mid 42.34 · reading 3.57 · pour 3.57);
suite 6/6 with T4 rewritten to the new law (pane scrolled 600, THE DOCUMENT NEVER
MOVES through the release); last palate row rests 103px ABOVE the buttons at max
pane scroll (was −33); the veil texture runs unbroken through the button zone and
behind the chrome pills (the color break is gone); memory → pour re-entry lands
reveal at y 0 with the layer edge-to-edge; desktop/wrapped loop untouched, zero
console errors. Ed's device pass is the final gate — the pour's chrome is the
thing to look at.


## ★★ THE MEMORY LEDGER LEAVES THE DOCUMENT — nothing scrolls it now (Jul 14, 2026)
The last doc-scrolled view converts on the deck's/pour's playbook, and the whole
document-scroll era closes: `va-flow` / `va-flow-mem` are dead, the document is
stage-shaped (100lvh + safe + 100px) on EVERY screen, and the frame-walk
(`walkScrollHome`) is RETIRED — the memory ride was its only remaining user, and
the ride now has no scroll debt by construction.
THE BUILD: `.mf-screen` stays a va-layer at 100lvh + safe (the pour's proven
recipe — rows run edge-to-edge behind the translucent chrome); inside it a new
`.mf-scroll` (absolute, inset 0, `touch-action: pan-y`, `overscroll-behavior:
contain`) carries the WHOLE page — head + months + rows — so the title scrolls
away under the menu exactly as the doc-scrolled ledger did. Outside doc mode
both wrappers are `display: contents`: the wrapped construction (fixed head,
masked .mf-list) is untouched on desktop/frame/standalone.
THE BALLAST TRICK, LAYER EDITION: `.mf-flow` (the scroller's one child) keeps
`min-height: calc(100% + 1px)` — overscroll containment only binds on a box that
can actually scroll, and a short ledger must never chain a pan into the stage's
overshoot slack. Measured: a ONE-row ledger owns its pan with exactly 1px of
scroll extent; the empty state stays contained too.
THE SWIPE WELLS keep their care: pan-y on the scroller AND the rows means no
native horizontal pan exists — the EDIT/DELETE swipe stays JS-owned (pointer
events), vertical pans belong to the scroller alone. Swipe-open verified in the
layer: row at −118, wells visible, no scroll moved anywhere.
Verified (sim, real page): suite 7/7 with NEW T7 (memory ride from ledger
scrolled 1079 internally — THE DOCUMENT NEVER MOVES: maxY 0 over 300 polled
frames; same-frame takeover on the row's mini card); band probe PASS all FOUR —
the probe gained a memory step (deck-mid 42.34 · reading 3.57 · pour 3.73 ·
memory-mid 4.27, a seeded row's art parked in the band; the real ledger is
restored after); ride filmed at 30fps — no flat frames, no luma jumps, ledger
sink → Hermit apex → pour cascade all clean; re-entry lands the reveal seated
at 0 with the layer edge-to-edge and the right wine's pane; a fresh memory
mount seats at top; desktop column untouched (620px, mask alive, wrappers
display:contents), zero console errors. Ed's device pass is the final gate —
the ledger's chrome and the swipe feel are the things to look at.
