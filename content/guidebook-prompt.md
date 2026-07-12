# Vintner's Arcana — The Guidebook (Deeper Reading) Content Strategy

The rationale and rules for the deeper-reading layer, written to slot into the same pipeline as
`content/voice-prompt.md`. Read that file first for the house style; this file only defines what
is DIFFERENT about the Guidebook layer. Gold standard: The Moon, in
`explorations/arcana-guide.js` (`GUIDES.moon` — the app's registry; canon).

> **Verdicts folded in (Jul 11, 2026, user):** the "challenging card" flag is CUT from the
> experience entirely; the closing line is FIXED verbatim across all cards; the guidebook BODY
> and the CLOSING PARAGRAPH are separate pipelines with separate approvals; keywords default to
> the framework's Symbols but better sets may be proposed (flagged for grading). Guidebook
> bodies SHIP to the app even as drafts; closing paragraphs are pushed later as a supplement to
> the live guidebooks whenever they're ready (lens refinement runs long). Approval gates canon,
> never release.

---

## WHAT THIS SURFACE IS FOR

Every other content layer in this product is deliberately oblique. The spirit speaks in
observations and lets the reader supply the meaning; the lenses are agreeable statements that
steer without explaining. That obliqueness is the product's charm AND its risk: a reader who
wants to understand the card before choosing a lens has nowhere to stand.

The Guidebook is that place. It is the ONE demystifying surface in the app: the little white
booklet packed with a tarot deck, rewritten by someone with taste. Its whole job is measured by
a single test:

> **The comprehension test:** by the end of the scroll, the reader understands the card so
> clearly that when they return to the Lenses, the lenses read as obvious facets of the card's
> meaning, and "turn toward the one that knows you" feels like a real instruction they know how
> to follow — not more mystery.

If a draft makes the card MORE mysterious, it has failed regardless of how good the writing is.
(This was v1's failure: it described the card's painted symbols in the spirit's register and
deepened the fog.)

It opens from two places, and the content must serve both:
1. **The Lenses** — pre-choice. The reader wants to understand before committing.
2. **The Pour** — post-reading, over a glass. The reader is revisiting a saved wine and rereading
   the card that led to it.

---

## THE VOICE

**Informative, warm, plainspoken.** A knowledgeable friend explaining the card across a table,
not the fortune-teller and not a scholar. Think: the best-written deck companion booklet you've
ever read.

- **"You" is allowed here.** This is the only layer where direct address is normal. The spirit
  never says "you feel"; the Guidebook may say "the card asks you to take your intuition
  seriously." That contrast is intentional: the register shift IS the signal that you've stepped
  out of the reading and into the explanation.
- Still subject to the house hard bans from `voice-prompt.md` Part 1: **no em dashes**, **no
  negation-contrast pivots** ("it's not X, it's Y"), no naming the wonder ("magic," "profound"),
  no reused constructions across cards.
- Plain does not mean flavorless. One well-placed image per section is welcome ("most of its
  monsters turn out to be rocks") as long as it CLARIFIES. The test for any flourish: does a
  first-time tarot reader understand the sentence faster because of it, or slower?
- Confident, never hedgy. "The Moon is the night card of the deck," not "The Moon is often
  associated with…" The Guidebook speaks as if the meanings are settled, because within this
  product they are.

---

## SECTION-BY-SECTION RATIONALE

### 1 · Header: number and name (the "challenging card" flag is DEAD)
User verdict: no card is ever labeled challenging (or gentle) anywhere in the experience — the
flag concept is cut from content and UI alike. Honest expectation-setting lives inside "What the
card means" paragraph two instead, carried by the card's own logic.

### 2 · Keywords (5–7 single words / short noun phrases)
**Why:** the fastest possible orientation. A reader who reads nothing else should leave knowing
the card's territory. **Default source: the Symbols comma-lists in
`uploads/Tarot & Wine_ The Complete Framework.md`** — distill from them, don't invent fresh.
**Latitude (user verdict):** where the framework's set serves the rules below poorly, propose a
better set, mark the deviation in the row's notes for grading, and roll the outcome back into
this file. Consistency of approach across all 78 cards outranks fidelity to any one list.
**Rules:**
- 5–7 entries is the default, but the recipe outranks the count: when the Symbols carry more
  genuinely distinct concepts, keep them all (batch-2 verdict: The Emperor runs ten). Drop
  qualifier words ("potential rigidity" → "Rigidity"; every symbol is already a potential),
  UNLESS the qualifier is constitutive: "completion (but heavy)" shipped as "A heavy
  completion" (batch 4, approved), because heaviness is what that completion IS.
  Single words preferred; "The subconscious" / "The hidden" style noun phrases allowed (each
  renders nowrap in a dot-separated procession; 2–3 words is the comfort zone, but the cap is
  SOFT: batch 1 chose "Breakdown of old structures" over "Collapse". Meaning outranks brevity).
- **The recipe principle (batch-2 verdict).** A card's keyword set is a recipe; a single symbol
  repeating across cards is fine because it is part of a larger recipe — only a wholly duplicated
  set would be a problem. Never drop a distinct concept to avoid cross-card overlap (reversed
  twice in batch 2: 'The subconscious' restored to The High Priestess, 'Willpower' to The
  Chariot). Near-synonyms within one list are usually distinct concepts on inspection ('Order',
  'Rules', 'The Establishment', 'Structure' all coexist in The Emperor's set). Condense only when
  nothing is lost ('Inherited wisdom' was praised; 'Opposing forces' failed because the card
  means CONTROL over them). A concept too complex to compress may be carried by the prose
  instead (user-confirmed twice: Strength's 'taming primal urges with grace', the Two of Wands'
  '(often between security and exploration)').
- **The Symbols lists can be incomplete (batch-7 verdict).** When a system parallel exposes a
  gap, propose the missing symbol and flag it: every Page is a messenger of something, the Page
  of Swords' list lacked one, and 'A messenger of truth' was added at the user's invitation.
  The framework is the default source, not a ceiling.
- Order matters: lead with the card's PRIMARY territory (Moon leads "Illusion," not "Fear").
  Reordering to lead with THIS product's take on the card is encouraged (batch 2: Wheel of
  Fortune leads 'Luck' over the Symbols' first-listed 'Cycles' because the approved voice line
  is about luck landing — praised as exactly the right kind of judgment call). But the SYSTEM
  outranks the voice line (batch 6): rank-parallel symbols align across suits, so every ace
  leads with its spark ('A mental breakthrough' leads the Ace of Swords even though the voice
  is about clarity). Two more order rules: 'A messenger of...' symbols LEAD their Pages' sets
  (batch-8 verdict, REVERSING batch 6's last-position rule: the messenger role is the rank's
  identity, so it opens the recipe), and related concepts cluster so they read as one thought (Five of Swords: Conflict > Loss >
  A Pyrrhic victory).
- Mix at least one interior word (intuition, dreams) with at least one situational word
  (illusion, the hidden) so the set spans inner and outer life.
- No conjugated verbs, no sentences, no judgments ("bad luck" is out; "fear" is fine — it names
  territory, not a verdict). Gerund phrases lifted whole from the Symbols ("Letting go,"
  "Leaping into the unknown") count as noun phrases and are often the RIGHT pick: they keep the
  actor inside the card's motion.
- **Batch-1 calibration: distill less.** Three of four keyword gradings reversed a distillation
  back to the Symbols' own phrasing: "Release" flattened "letting go" (which means more than
  release), "Collapse" flattened "breakdown of old structures," and "The unknown" pointed at the
  destination when the card is about the one wading in. Batch 5 added a fourth reversal:
  "Discernment" flattened "needing discernment," which names the AWARENESS of trying to do too
  much at once, not the act of discerning. When a Symbols phrase carries the card's action,
  agency, or state of awareness, keep the phrase whole; shorten only when nothing is lost.

### 3 · "What the card means" (2 paragraphs)
**Why two paragraphs and why this order:** paragraph one places the card in the world;
paragraph two places it in the reader's draw. That split keeps timeless meaning separate from
tonight's implication, which is what makes the section feel authoritative instead of horoscopey.
- **Para 1 — the card itself.** Open with a single flat definitional sentence that could survive
  alone ("The Moon is the night card of the deck."). Then name its domains in plain nouns. A
  contrast against a familiar card (Sun vs Moon) is the cheapest orientation device in tarot;
  use it when one exists.
- **Minor Arcana orientation (batch-3 verdict: APPROVED as the template for all 56).** Para 1
  opens by placing the suit ("the suit of fire, the family of the deck that governs passion,
  creativity, and drive") and the rank's role in it ("every ace is a seed"; fives are friction;
  pages are students and messengers, knights the suit at its extreme, queens the suit mastered
  as presence, kings the suit in command) before defining the card itself. The first cards
  written in a suit carry the full orientation; later cards lean on it lightly ("the planner's
  card of the fire suit") and may orient against an adjacent rank (the Three against the Two),
  the same way the majors cross-reference each other.
- **Para 2 — what drawing it means.** Translate the card into the reader's present tense
  ("some part of life is currently moonlit"). For heavier cards, this paragraph carries the
  reassurance arc: honest about the difficulty, then the built-in exit ("the road continues
  through the dark and comes out the other side"). Reassurance must come from the card's own
  imagery or tradition, never bolted on as generic comfort.

### 4 · "As a reading" (2 paragraphs)
**Why:** meaning alone doesn't tell the reader what to DO with the card. This section converts
meaning into interpretation — the "what this could mean for you" the user asked for.
- **Para 1 — where it lands.** Offer 2–3 recognizable life-shapes as short fragments ("A decision
  that refuses to settle. A story that does not quite add up."). These are the horoscope
  principle used honestly: open shapes the reader claims, never guesses about their actual life.
  Then one line of counsel derived from the card (Moon: patience over force).
- **Para 2 — the card's advice.** The card's stance toward the reader's inner state, in direct
  address. End the section on the strongest clarifying image, because it's the last thing read
  before the handoff.

### 5 · "Before you return" (1 paragraph + the line + the action)
**Why this exists at all:** this is the capture moment the whole surface was built for. The
reader now understands the card; this section converts that understanding into HOW TO CHOOSE.
- **The paragraph** does exactly one move: it says that one card holds several truths and the
  lenses are how the deck splits them apart — then PARAPHRASES each lens in plain terms, in lens
  order, WITHOUT using the lens names ("something that will not hold still" ≈ A shifting face).
  Never name the lenses: the payoff is the recognition when the reader closes the panel and sees
  the names again. Paraphrase-recognition is the mechanism; copy-paste kills it.
- It ends by returning agency: "Only you know which of those is tonight's truth."
- **The line** is the Lenses stage's own foot line, verbatim ("Turn toward the one that knows
  you."). FIXED across all cards (user verdict) — this is the ONLY sanctioned verbatim
  repetition in the app: the reader meets the same words seconds later on the stage, and they
  now mean something.
- **Pour-context note for the pipeline:** when opened from The Pour, the lens is already chosen
  and "return to the lenses" is wrong. The closing section is therefore a SWAPPABLE block —
  generate the Lenses variant now; a Pour variant ("the lens you chose that night…") is a later
  layer, not something to improvise per-card.

---

## LENGTH & FORM

- Total body: ~260–320 words (Moon standard: ~290). It must feel like a booklet page, not an
  article. If a card needs more, it needs better sentences instead.
- Paragraphs: 2 + 2 + 1, each 45–75 words. Section labels are fixed across all cards
  ("What the card means" / "As a reading" / "Before you return") — the rhythm of sameness is
  what makes it feel like a book.
- Sentence texture: mostly short declaratives; fragments allowed only in the "where it lands"
  list. No rhetorical questions anywhere (the spirit may wink; the Guidebook never performs).

---

## WHAT WE ARE NOT DOING (anti-goals — reject on sight)

1. **Not more mystery.** No oracular register, no withheld meanings, no "the card knows."
   Mystery is the spirit's job; this surface exists because the spirit won't explain.
2. **Not describing the artwork.** No walking through the towers, the dog, the crayfish. Tested
   in v1; it read as MORE esoteric, not less. Imagery may be borrowed as metaphor ("the road in
   the picture continues") only when it clarifies a meaning already stated in plain words.
3. **Not explaining the lenses as a labeled section.** "Four ways to hold it" was cut. The
   lenses get exactly one paraphrase-sentence each inside the closing, nothing more. The lenses
   must stay the stage's moment, not the panel's.
4. **Not fortune-telling.** No predictions of events, no timelines, no "someone in your life
   is…", no outcomes promised. The Guidebook interprets territory; it never forecasts. Also no
   real-world advice domains: health, money, legal, relationships-as-diagnosis.
5. **Not doom, not toxic positivity.** Heavier cards are treated honestly and the difficulty is
   survivable via the card's own logic. Never "don't worry," never dread-mongering — and never
   a "challenging" label anywhere.
6. **Not scholarship.** No Rider–Waite history, no Golden Dawn, no astrology/kabbalah
   correspondences, no "traditionally, this card…" hedging, no reversed meanings. This product
   has one canon: its own.
7. **Not wine.** Zero wine references in this layer. The pairing lives downstream; a reader on
   The Pour is already holding the wine, and the Guidebook rereads the CARD, not the bottle.
8. **Not the spirit's constructions.** Do not quote or echo the card's voice line, lens
   subtitles, or reveal copy. The layers must feel like different people who read the same card.
9. **Not padding.** No "in conclusion" energy, no restating the keywords in prose, no generic
   tarot-wisdom sentences that could sit under any card. Every sentence must be THIS card's.

---

## PIPELINE NOTES

- File: `content/guidebook.csv` with columns
  `card, number, status, keywords, meaning_1, meaning_2, reading_1, reading_2, closing_para, closing_status, notes`
  (the line and action are fixed strings, not per-card content; keywords pipe-separated inside
  one quoted field).
- **Split approvals (user verdict):** the BODY (keywords + meaning + reading, governed by
  `status`) and the CLOSING PARAGRAPH (governed by `closing_status`) are separate pipelines.
  The body may be written for any card; `closing_para` may only be written once that card's
  lenses are APPROVED in `lenses.csv`, because it paraphrases them. Bodies ship on their own:
  they are mirrored into `explorations/arcana-guide.js` even as drafts, and closing paragraphs
  are mirrored later as a supplement to the live guidebooks whenever they're ready (lens
  refinement runs long, so closings will trail bodies). Approval gates canon (never edit
  approved rows), not release. When writing a
  body for a card with existing approved voice/lens copy, check the no-echo ban against it.
- Same status lifecycle as the other layers: pending → draft → approved; never edit approved
  rows; log rejected drafts to `content/voice-history.md` tagged `guidebook rN` (body) or
  `guidebook-closing rN`.
- Batch size 4–6 cards, stop for grading, same as every other layer.
- Grade against the comprehension test first, prose quality second: hand a draft to someone who
  has never read tarot, then show them the four lens names. If they can't match paraphrase to
  lens, the closing failed even if the writing is lovely.
