# Vintner's Arcana — The Content Prompt

The reusable prompt for writing ALL card content, one self-contained part per layer:
- **Part 0 — Invitations (the Approach hero lines)** → writes to `invitations.csv`
- **Part 1 — Spirit's voice** → writes to `spirit-voices.csv`
- **Part 2 — Lenses** → writes to `lenses.csv`
- **Parts 3A/3B/3C — Lens echo, pour blurb, pour data** → write to `reveals.csv`

Each part stands alone: paste it (plus the shared workflow at the bottom) into any session with
the pairing framework, `voice-history.md`, and that layer's CSV. Nothing else is required.

---

## PART 0 — THE INVITATION (the Approach hero line)

**What it is:** the big DM Serif line under the face-down deck on The Approach — the spirit's
opening move, spoken TO the visitor before any card is drawn. One appears per visit, cycling at
random with no repeats until the set is exhausted (the pool = the approved rows of
`invitations.csv`). A dare disguised as hospitality: the spirit already knows which card you'll
get and what it will mean; the line is the smile before the trick. It is NOT an instruction (no
"tap", "draw", "pick"), NOT a description of the app, and NOT fortune-cookie wisdom.
(Folded in from the retired standalone invitation-prompt.md, Jul 15 2026 — the invitation is the
same spirit one screen earlier, so Part 1's register, bans, and calibration apply in full.)

**Register:** sly, confident, warm, a little dangerous. The four moods that work (keep the set
spread across all of them): the playful dare ("Go on. We don't bite."), the sly prophecy ("Fate
favors the thirsty."), delicious surveillance ("The cards have been talking about you."), and
pure elegance ("Shall we?"). Flattery only by invitation ("Curiosity looks good on you.").

**The drink-hint channel (round-2 law):** "Fate favors the thirsty." is the user's favorite line
BECAUSE it alludes to the drink: until the bottle appears at the reveal, the Approach is the one
chance to hint at what's coming. Keep a line or two of the pool at thirst/pour level (allusion
only, never the banned words), and never force the reference everywhere.

**Form:** 2–7 words per sentence, max ~40 characters total (it renders large). One or two
sentences; if two, the second turns or answers the first ("Don't worry. It's mostly good news.").
Wine may be alluded to (thirst, a pour) but never named directly — no "wine," "bottle," "glass."

**The italics mechanic (unique to this layer):** part of the line may render italic for
emphasis — `*span*` markup in invitations.csv, any position including mid-line ("The cards have
been *talking* about you."). This is the one layer where the retired voice-layer italic
survives. Use it SPARINGLY: the italic marks the one sly beat that earns it, single words hit
hardest, and some lines must carry none — "Shall we?" carries none because pure elegance needs
no underline. Round-2 calibration: the user's canon edits only ever REMOVED or NARROWED italics
(two lines stripped bare; "Curiosity looks *good* on you." cut from a phrase to the single
word). Single words beat phrases; when in doubt, none. If every line leans on italics, none of
them land.

**Hard bans:** everything in Part 1's list, plus: anything an app would say ("get started",
"your reading awaits"); anything spooky-halloween ("if you dare", "enter the darkness"); the
spirit sounding eager instead of certain; and (round-2 law) imperative-adjacent lines aimed at
the visitor — "It already knows. Go ahead, ask." and "Ask nothing. Learn everything." were both
retired from canon because they read as directions. The spirit beckons; it never directs.

**The test:** read it aloud in a low voice with one eyebrow raised. If it doesn't survive that
delivery, cut it. If it could appear on a landing page for any app, cut it.

**Pipeline:** rows in `content/invitations.csv` (`id,status,invitation,notes`; pending → draft →
approved; graded drafts logged in voice-history.md tagged `- inv rN:`). After any approval, run
`node scraps/mirror-invitations.js` — it mirrors APPROVED rows into the INVITES2 block of
explorations/flow2-app.jsx and verifies the round-trip. Never hand-edit the mirrored block.

---

## PART 1 — THE SPIRIT'S VOICE (the line under the card)

**What it is:** the first thing read after the card is revealed. A fortune being told. Picture the
scene before writing a word: a devilishly charming spirit sits across the table, watches the card
turn over, smiles, and tells you what the spirit realm just said. Every line must survive being
SPOKEN in that scene. Written-English cadence is the enemy: "Every piece was put exactly where it
needed to be" is a sentence; "Every piece, placed exactly where it needed to be" is a fortune.
The character limit is not a constraint to compress against — it is the pressure that pushes
phrasing toward how a person would actually say it. The line must do three jobs at once, in one
breath:

1. **Reveal the card.** After reading it, the person intuitively knows what the card is about —
   without knowing tarot. The card's core meaning IS the line, stated as a truth about life.
2. **Feel like perception.** It vaguely implies the cards know something about the person's life
   right now — that something in their world is being seen. Never names it; the reader supplies it.
   The horoscope principle is the strongest form of this: leave a quality open for the reader to
   claim as their own ("waiting for someone quiet enough to hear it" lets the reader think "I *am*
   a good listener, it's like I was made for this moment"). Flatter by invitation, never directly.
3. **The knowing smile.** It ends (or turns) with a sly, wise, complicit beat — the devil on your
   shoulder, a partner in crime, warmth with a grin. Never a lecture.

**Form:**
- One or two SHORT sentences. One is fine. The measure is rendered length: it must not wrap past
  2 lines at 21px in a 330px column. Empirically (round 6): 84 chars rendered as 3 lines, so the
  old ~85 budget was wrong — treat ~75 characters as the ceiling and shorter as better. Never
  force two sentences to fill space. **Round-8 calibration: two sentences is a choice, never the
  default.** The overnight pass wrote nearly the whole deck in the same two-beat shape and the
  user read it as automation ("it's tripping over itself"). A single longer sentence can FEEL
  more succinct than two short beats ("Ships sent with conviction have a habit of returning
  heavier." — Three of Wands, 61 chars, approved as the exemplar). Vary the deck's texture.
  And when each beat earns its keep, two still win: "Let them climb. It's a long way up."
  was approved round 9 as exactly that case.
- The line is graded RENDERED IN THE APP, not on paper. Spoken flow must survive the screen:
  three full stops in 70 chars chopped The Hanged Man's r7 line into three pieces and reopened
  the deck's first approval.
- Written as observation about how life works — NOT about how the reader feels. The reader applies
  it to themselves; that self-application is the profundity. ("Things are not as they seem tonight"
  — no "you feel", yet it's about you.) EXCEPTION: the fortune-teller may occasionally address the
  table directly when the card invites it ("Ah, perspective. Why do we always meet like this?" — The Hanged Man), and direct HYPE is
  licensed when the card's glory earns it ("Applause has been rehearsing your name." — Six of
  Wands). It must be a
  wink, never a diagnosis; a raised eyebrow, never a prescription of what the reader feels or does.
- Let the CARD's personality color the register. Death is serene. The Tower is deadpan about
  catastrophe. The Fool is giddy. One voice, many moods.
- **The register fine line (calibrated over rounds 1–3):** the spirit is spoken, not composed —
  but it is OMNISCIENT. It leaves breadcrumbs of forbidden knowledge to draw you in. It is never
  chummy, sassy, bitter, or reactive ("The stars aligned? Please." — rejected: bitter, not
  all-knowing). Formal grammar can feel rigid, so a relaxed construction is welcome, but the
  wisdom must stay intact. The calibration example that walks the line correctly:
  "The old ways have outlasted every clever new idea. That is no accident." — relaxed enough to
  feel spoken, composed enough to feel like it has seen centuries. Round-9 addendum: when a card
  allows a range of registers, err devilish. "Tonight is for basking. The building resumes
  tomorrow." was rejected as "too reserved, like a teacher letting loose briefly"; the winning
  lines "feel like they come with a devilish grin."
- Prefer the shorter cut. If a trim survives with the sentiment intact, take the trim. Wordiness
  reads as writing; brevity reads as knowing. But never cut words that carry the card's intent
  ("put *exactly* where it *needed* to be" IS the Magician; trimming those killed it).
- No emphasis markup. The `*word*` italic/apricot mechanic is retired (the highlight wasn't
  working visually). Rhythm and word choice must carry the stress instead.

**THE DRAFTING MINDSET (round-4 diagnosis — read this before writing, it outranks the bans):**
Quality dipped when drafting became defensive: writing *around* the ban list instead of *from* the
spirit's knowledge. The bans below are a POST-DRAFT CHECKLIST, never the drafting mindset. Draft
like this instead:
1. Say ONE TRUE THING about how life works, in the card's mood. Not an aphorism about the card's
   concept ("Nothing outruns a made-up mind" — rejected: a slogan about willpower, quotable on a
   mug, perceiving no one). The approved lines describe the world; the reader finds themselves in
   it. The spirit doesn't try to sound philosophical. It just is. Trying is the tell.
2. **The second-beat rule:** if there is a second sentence, it must TURN the first — change what
   it means (Death: "…come to an end." → "The interesting part is what comes next." — the ending
   becomes a beginning). A second beat that merely comments on, decorates, or points at the first
   ("There it is." / "Enjoy it; that's rarer than it sounds.") is template-filling and reads as
   forcing a structure without knowing why. If no turn exists, ONE SENTENCE IS COMPLETE
   ("The simplest pleasures never needed defending." — approved as-is after the bolted-on second
   sentence was cut).
3. The smile lives in a word choice or the turn itself, never in an appended flourish.
4. **Feel the card (round-9 rule; outranks cleverness):** draft for the person the card is
   reading 100% right — they just clinched the milestone, just took the high ground, are already
   mid-rush. Their reaction must be a feeling, not a decoding: "fuck yeah, time to crack open
   the good shit," defiance with a grin, wind past the ears. A correct sentiment in a roundabout
   construction still fails ("The high ground was earned. Anyone who wants it can climb." —
   right idea, not felt). Bonus of getting it right: a felt line creates forward momentum into
   the flow ("Applause has been rehearsing your name." made the user need to see what glory
   waited past the lens, immediately). The strongest version ENACTS the card's tempo in its own
   rhythm: "Deep breath. It all happens fast from here." holds a beat, then releases — "the calm
   before the rush," felt in the spine before it's parsed. And draft from the imagery the READER
   would conjure for the situation, not a transposed concept: for dazzling choices the user
   pictures "a set table... riches... luxurious wines all in a row," never painted doors. The
   picture in the line should match the picture already in their head. The line is also read
   WITH the card's art on screen — harmony with the imagery is part of the grade ("Both options
   wait politely. Neither intends to wait forever." won the Two of Swords for being "great in
   conjunction with the card's imagery": two patient crossed blades). Chase the user's FEELING,
   never their phrase: inserting "lavish" verbatim into the Seven of Cups felt forced; the
   user's own trim removed it.
5. **One stance per line; courts serve two readers.** The Queen of Swords r1 cobbled several
   guidebook angles (honesty's cost + earned history) into a line that was "confusing as hell."
   Pick the single most important aspect of the card and commit — especially on court cards,
   where the line must let the person who IS the card feel understood, and tell the person who
   needs the card what to channel.
6. **Common sayings are assets; realization is the goal on rut cards.** The spirit may pick up a
   relatable idiom ("the feeling is mutual") and reveal how rare the familiar thing actually is —
   familiarity makes the line land as TRUE before the turn makes it profound. At the limit, the
   lightly-freshened idiom IS the line: the user authored "The calmest waters run deep." for the
   Queen of Cups. And on malaise
   cards (the Four of Cups family), diagnosis alone fails: the line must spark the realization
   AND hand over the agency ("they need to break out of it... take charge of the remedy") —
   without ever scolding.

**Hard bans (post-draft checklist — style tells that read as inauthentic AI writing):**
- **NO EM DASHES. Ever. Anywhere in the file** (voices, alts, lenses, subtitles). It has become
  emblematic of AI writing and readers discount the line on sight. Use a period, comma, colon,
  or rewrite the thought. (The Moon's approved line predates this rule; a period variant is
  proposed in its notes — user's call.)
- **No "it's not X, it's Y" pivots** (or "X isn't A. It's B."). The negation-contrast trope is a
  ChatGPT tell. Exception: joining the pivot with a comma into one flowing breath can rescue it
  ("The truth isn't hiding, it's waiting..." — approved). The tell is the punchy two-sentence
  version, not the underlying thought.
- **No punchy fragment pairs or triplets** ("Full speed, steady hands." / "Cause, meet effect." /
  "Patience, proportion, and a steady hand."). Staccato fragment openers feel engineered — the
  unplaceable "ChatGPT feeling." The spirit speaks in sentences that breathe.
- **No rhetorical question + retort** ("The stars aligned? Please."). Reads reactive, not omniscient.
- **Don't name the wonder.** Words like "magic," "miracle," "sublime" are the writer telling the
  reader what to feel — an abstraction shortcut with a bad downstream effect (Temperance leaned on
  "magic" twice and failed twice; the Magician's approved line never needed the word). Evoke the
  quality through what the line describes; never label it.
- **Don't reuse an approved card's construction.** "Funny how different everything looks" was
  rejected for echoing The Tower's "Strange how light one feels." Each card's line must have its
  own bones. Check new lines against the approved set before submitting. Round-8 calibration:
  this is flag-then-decide, not zero tolerance. Subtle kinship can be waved through (Two of
  Wands' "the delicious part" lives happily beside Death's "the interesting part"), but an
  obvious twin (The Hanged Man and The Moon both carrying a standalone "Good." beat) must be
  caught and flagged — that one shipped because the lines were never read side by side until
  the app existed. (More waved flags, round 11: the user kept "Ask any open hand" beside "Ask
  anyone still standing," and the lit-window line beside the gold-blind-spot bones. The
  tolerance is wider than the flagger assumes; keep flagging, keep deferring.)
- **Guidebook sharing is fine; guidebook copying is lazy.** The voice and the card's approved
  guidebook body draw on one knowledgebase, and shared imagery or knowledge is acceptable (many
  users never open the guidebook; for those who do, the body should make the voice suddenly make
  sense). Near-verbatim reuse of a body's payoff is not acceptable: the voice's "coming back
  with interest" against the body's "comes back with interest" convicted the Three of Wands r1.
  Check both directions — guidebook batches 3–4 absorbed overnight voice-draft imagery before
  the collision discipline existed.

**Card-specific note — The Devil (XV):** this is the spirit's own card. The spirit voice IS the
devil on your shoulder, so when The Devil is pulled, the mask and the face match. Don't observe
temptation from a distance; be the temptation. Full complicity, full hype: let's be bad together,
it's about damn time, you're about to drink something absurd. This card may address the reader
directly and break the "observation only" rule; that's the point. But omniscience still applies —
seduction, not cheerleading ("Temptation only wins when it knows exactly what to offer. And it
knows." walks it right). The Devil should end up the shining example of the whole deck: the
perfect voice, lenses, pairing, and reading.

**Gold standards (approved, do not change):**
- The Moon: "Things are not as they seem tonight. Good. They rarely are."
- Death: "All things must come to an end. The interesting part is what comes next."
- The Tower: "A spectacular downfall. Strange how light one feels in the rubble."
- The Fool: "No map, no plan, no safety net. The start of every good story."
- The Hermit: "Silence has a way of saying more than the room ever did."
- The Lovers: "The heart made its choice long before the head was consulted."
- Wheel of Fortune: "Luck has been circling for a while. Tonight, it lands."
- The Emperor: "Every empire began with someone who refused to leave things to chance."
- The Hierophant: "The old ways have outlasted every clever new idea. That is no accident."
- The Empress: "The world is feeling generous tonight. It would be rude not to accept."
- The World: "Every last piece, finally in place. This is what the whole road was for."
- The Magician: "Nothing here is chance. Every piece, placed exactly where it needed to be."
  (user-edited: the spoken-cadence calibration example — compare the rejected written-English
  version "Every piece was put exactly where it needed to be" and feel the difference)
- The Chariot: "They call the stubborn impossible. Until the victory lap, that is."
- The Hanged Man: "Ah, perspective. Why do we always meet like this?" (user-authored r9; its r7
  predecessor was reopened by the first in-app test — the standalone "Good." doubled The Moon's)
- Temperance: "Restraint, of all things, turns out to be where the finest pleasures hide."
- The Star: "Even the longest night runs out of dark eventually."
- The High Priestess: "The truth isn't hiding, it's waiting for someone quiet enough to hear it."
- Justice: "The scales take their time, but they never lose count."
- Strength: "Anything can be tamed with a soft enough touch. Even that."
- The Sun: "Every so often, the world simply says yes."
- The Devil: "Everyone has a price. It appears tonight found yours." (the spirit's own card;
  seduction with the direct-address license)
- Judgement: "Everyone dreads the reckoning, but a second chance doesn't knock twice."
- Two of Wands: "The whole map is on the table. Choosing is the delicious part." (the indulgent
  twinge, sprinkled right)
- Three of Wands: "Ships sent with conviction have a habit of returning heavier." (the
  single-sentence exemplar)
- Ace of Wands: "An idea just walked in with matches." ("funny, clear, punchy, wise, endearing,
  makes me wanna start a fire" — the feel-the-card test passed in full)
- Five of Wands: "Rivals make better whetstones than admirers ever do." ("feels sage")
- Six of Wands: "Applause has been rehearsing your name." (direct hype done right)
- Four of Wands: "Finish lines this big come with corks."
- Seven of Wands: "Let them climb. It's a long way up." (two beats, each earning its keep)
- Eight of Wands: "Deep breath. It all happens fast from here." (enacts the tempo)
- Nine of Wands: "Tired is not the same as finished. Ask anyone still standing."
- Ten of Wands: "The reward for carrying it all is, somehow, more to carry."
- Page of Wands: "Follow the fun. It knows a shortcut."
- Knight of Wands: "Some doors open politely. Others were made for kicking."
- Queen of Wands: "Some fires warm the room. This one runs it." (the user's declared gold
  standard for all sixteen court cards: the type observed, then turned onto THIS one)
- King of Wands: "Passion ages into authority when it keeps its nerve."
- Three of Cups: "Good news never drinks alone." (the deck's shortest line)
- Ace of Cups: "The heart gives no warning. When it decides to open, it pours."
- Two of Cups: "The feeling is mutual. Do you know how rare that is?" (the leaning-in question)
- Four of Cups: "Apathy has terrible eyesight. The gold is in the blind spot."
- Five of Cups: "What's lost gets the eulogy. What's left gets the morning." ("genuinely profound")
- Six of Cups: "The past keeps a spare key under the mat for nights like this."
- Eight of Cups: "The tide goes out quietly when it's done with the shore."
- Nine of Cups: "The wish was listening the whole time." (the perception goal fully realized:
  "which wish and how did it know about that wish??")

(Round 10 on: the full approved corpus lives in spirit-voices.csv — entries land here only when
they carry a calibration lesson.)
- Queen of Cups: "The calmest waters run deep." (user-authored; the idiom-at-the-limit case)
- Knight of Cups: "Some feelings deserve a white horse and a bad plan." ("the perfect
  reinterpretation" — recruit, never caution)
- Two of Swords: "Both options wait politely. Neither intends to wait forever." (won on harmony
  with the card's imagery)
- King of Swords: "Feelings get a vote, never the throne." (the trim to the load-bearing beat;
  its deliberate contrast with the King of Cups reads as design, not repetition)
- Queen of Swords: "Every blade this sharp is guarding something tender." (one stance, serving
  both the embodier and the needer)
- Two of Pentacles: "Juggling looks like chaos to everyone but the juggler." ("I'd be stoked to
  pull it" — pull-joy is the bar)

**Failure modes (all happened; all rejected):**
- ✗ Narrating the card at the reader: "Everything you believed just cracked." (robot narrator)
- ✗ Prescribing feelings/actions: "Don't mourn it", "You've gone looking for the quiet."
- ✗ Forced chattiness: "honestly?", "the way I see it", "Right now? It's turning your way."
  (rambling barfly — too familiar, uncomfortable)
- ✗ Meaning missing: "The wheel turns for everyone." (turns... of what? reader learns nothing)
- ✗ Words without feeling: "The end of a long road. It looks nothing like the beginning."
  (technically correct, emotionally dead — no bask, no celebration, no smile)
- ✗ Rigid two-sentence formula. Length follows the thought, not a template.
- ✗ Beats pulling apart: "The first spark never asks if the timing is right. It just catches."
  felt odd; the user's best diagnosis is a metaphor collision between the two beats (asking
  permission vs catching fire). NOTE: domain ambiguity by itself is NOT a rejection (round-9
  user ruling, retracting the earlier rule) — it's the beats fighting that reads wrong.
- ✗ Assuming shared context: "The hard part held. Somewhere, a table is already being set."
  confused real users at first sight (held? held what?). The line gets ONE cold read; it cannot
  lean on the card's backstory to parse.
- ✗ Mood misfire: "Some milestones simply refuse to pass quietly." is technically about
  celebration but FEELS like a threat ("like it's gonna be the red wedding"). The card's mood
  must land before the words are even parsed.
- ✗ Wordplay over feeling: "Everything is moving at once, and for once, in the same direction."
  rejected as trying too hard to be clever. If the construction is visible, the fortune isn't.
- ✗ Writerly vocabulary: "Wandering off is an underrated way to arrive somewhere wonderful."
  rejected as "long winded and writerly and stuffy" — "underrated" is listicle language in a
  fortune-teller's mouth. The approved fix speaks: "Follow the fun. It knows a shortcut."
  Specialist vocabulary convicts the same way: "ballast" was rejected cold ("Don't know what
  a ballast is"). Plain-spoken words only.
- ✗ Generalizing a non-universal experience: "The ropes are looser than they feel. They usually
  are." — The Moon's "They rarely are." works because everyone has had such nights; nobody has
  many tied-in-ropes nights. A widening beat must widen something everyone has lived.
- ✗ The card's furniture as metaphor: ropes and unlocked doors (Eight of Swords r1) read
  literal — the art's props described instead of the reader's life. Harmonize with the imagery,
  but the meaning must live in the reader's world (S02's "options waiting politely" is the
  READER's situation; the ropes were the figure's).
- ✗ Ominous without a gift: "Fear does its best work unsupervised." — spooky, but the puller
  doesn't know "what I'm supposed to do with that." Dark cards still owe mercy or agency. The
  inverse fails too: "Worry is imagination with the lights off." was too light-hearted for real
  anguish. The mercy must respect the weight.
- ✗ Convoluted reframe of a clear card: "Discontent has good taste. It only visits people ready
  for more." — clever, but the Four of Cups' message is plain (apathy is costing real
  opportunities; wake up, look again). When the card's message is clear, say the clear thing
  with the grin; a re-angle reads convoluted.
- ✗ Borrowed negative connotations: "Even cathedrals took a committee." — "design by committee"
  is colloquially damning, so the joke smuggles contempt into a card that celebrates
  collaboration. Check every phrase's street meaning, not its intended one.
- ✗ Coinage that doesn't speak: "Being understood back is rare" — "understood back" is an odd
  turn of phrase. A compressed coinage must sound like something a person would actually say.
  Same family: "The mood just isn't looking" (hard to understand, odd structure) —
  personification needs a clear actor doing a natural verb.
- ✗ Warning where the card tempts: "The imagination sets a lavish table. Not everything on it
  is dinner." read as "poisoned and dangerous" when the Seven of Cups needs dazzle plus careful
  choosing. Discernment is not danger; abundance cards tempt first.
- ✗ Cautioning where the card charges: "Grand gestures get laughed at until one lands." — naming
  the mockery "would scare someone off from letting their heart do the talking." On cards that
  champion an action, the line recruits; it never warns.
- ✗ Polysemy trap: "Most joys pass through. This kind unpacks." — the cold read went to
  "unpacking something dense and complicated," not moving in. If a key word has a more common
  competing sense, the wrong sense wins the first read and the feeling dies mid-trip.
- ✗ World-clash imagery (flagged, borderline): "The heart keeps no schedule" — calendar language
  inside an overflowing-heart card. The image's home world should belong to the card's world.

**The test before submitting each line:** cover the card name. Read only the line. Can a stranger
tell you (a) what the card means, (b) that something in their own life fits it, and (c) that the
speaker is smiling? If any of the three fails, rewrite. Round-11 additions: (d) it must ring TRUE
on contact — "good work gets overheard by the right people" failed as a thing that doesn't
actually ring true; and (e) answer in one breath what the reader is supposed to FEEL and what
their reading IS ("What am I supposed to feel here? What is my reading?") — if either answer is
fuzzy, rewrite.

---

## PART 2 — THE LENSES (the 3–4 tappable facets)

**What they are:** the facets of the card's meaning. The reader picks the one that resonates —
that pick is what makes the wine reveal feel fated. Each lens maps 1:1 (invisibly!) to a wine idea
in the pairing framework.

**Form — the name:** short (≤ ~26 chars), evocative, an *invitation* — written as if spoken by
someone you'd be joining if you picked it. Prefer "A" over "The" ("A shifting face" — I can see
myself in it; "The shifting face" points at something I can't identify).

**Form — the subtitle:** a STATEMENT the reader can agree with, never a prescription of what they
feel or do. It carries just enough specificity to steer the meaning toward the hidden wine mapping
without naming wine.
- ✓ "the good stuff was never on the map" (agreeable truth, steers to uncharted)
- ✓ "the old way already had its turn" (tells me the clean break is from tradition — so the wine
  that follows resonates instead of surprising)
- ✗ "everyone went left; you're eyeing right" (tells me what I'm doing)
- ✗ any wine word: grape, glass, vintage, farm, cellar, producer, region. The wine stays hidden
  until the reveal. Always.

**Gold standards:** the lens rows marked `approved` in `lenses.csv` (12 full sets as of
Jul 24 2026 — Moon, Death, Tower, Fool, Hermit, High Priestess, Magician, Hierophant, Lovers,
Chariot, Wheel of Fortune, Devil — more landing each batch) are canon — study them before
writing new ones.

**Lens laws (batch-1 rulings, 2026-07-23):**
- **Four lenses is the ceiling.** Cards carry 3–4 lenses (4 standard). The old 5-lens cards
  are culled to 4; never draft a fifth.
- **The nudge is retired.** No lens is ever permanently nudged; the CSV's nudge column stays
  empty. Nudging, if it ever exists, is a runtime concern — never content.
- **The Devil gets a pass on wine words.** "A second glass" keeps its glass: the ban protects
  the hidden wine, and the Devil is licensed to break rules. Everywhere else the ban holds in
  full, and even on the Devil nothing overt or forced.
- **A voice-word echo in a lens can be a SORTER, not a flaw** (High Priestess III kept "quiet"
  under the voice's "quiet enough"): a reader who resonated with the voice reaches for the
  echoing lens; one who didn't rules it out fast — both outcomes mean the card read them.
  Distinguish from CLAIM-DUPLICATION, where a subtitle merely restates the voice line and adds
  no facet (The World I convicted; near-verbatim clones stay convictions).
- **Collisions are flagged, never blocking (for now).** Cross-card stance or wine overlaps get
  logged in voice-history.md and the lens ships anyway; a dedicated collision-refinement pass
  will later cull hard-to-pair lenses and replace collisions with novel pairing ideas. Bottle
  diversity: aim never to recommend the same bottle on two cards — swap in a replacement when
  two share — but some bottles legitimately fit several cards; don't force uniqueness.
- **Gap-fill policy:** every framework idea missing a lens is filled for every card from the
  Eight of Wands onward (the audit's earlier skips are sanctioned); conceptual closeness to an
  existing lens is not a reason to skip.
- **Style vs bottle is not a collision** (Lovers II ruling, 2026-07-24): a card steering to a
  STYLE (Riesling Spätlese at Lovers II) does not collide with another card recommending a
  specific BOTTLE of that style (Dönnhoff Spätlese at Two of Cups IV). Collision checks bind
  tightest at the pour level: the mapping cell's example wines are pipeline anchors, and the
  actual bottle lives in reveals.csv (card + lens_no keyed — culls and renumbers must sync
  there). The app's current pours for draft cards are that file's draft rows mirrored
  design-side; they regenerate in the reveals pass.
- **Claim-duplication is also flag-then-decide** (Emperor II ruling, 2026-07-24): "every order
  traces back to one name" was KEPT under "Every empire began with someone..." — a subtitle
  restating the voice's claim in fresh words can stand when it's the card's core. The
  conviction bar stays at near-verbatim clones (The World I's "every piece finally in its
  place" under "Every last piece, finally in place").
- **THE CONFESSIONAL MODEL (Ed's articulation, 2026-07-24 — THE governing rubric):** the
  spirit voice is just vague enough to spur an internal CONFESSION of a thing the card never
  explicitly said; the lenses are slightly more specific than the voice; the user reaches for
  the lens that matches the thing they just confessed to in their head. It feels like
  mind-reading because they are telling on themselves. EVALUATE EVERY LENS by how well it
  nails an internal confession spurred by that card's voice. Corollaries: (a) the wine rule
  binds at the lens stage even on the Devil — "A second glass" was convicted for reading as a
  literal drink instead of catching a life-confession (the earlier wine-word pass is
  effectively revoked at lens level); (b) core-concept cells LEAD with the guidebook symbol
  in caps, then qualify with the felt experience after the dash; (c) echo-repeats of the lens
  are a delicate balance — sanctioned when the repeated phrase IS the resonant confession
  ("The guilty pleasure. Pour heavier."), never deck-templated.
- **THE CONCEPT-SOURCE LAW (2026-07-24):** a lens's core concept must come from the card's
  canonical symbolism — the framework's Symbolism list or the guidebook writeup — never
  invented to fit a bottle. Bottle-first drafting is a conviction ("The night shift" started
  from Eiswein and bent a concept around it). The lens test: reading it must produce "oh my
  god, the card knows about that thing in my life." CLOSINGS FOLLOW LENSES, never the reverse (Ed's
  ruling): closing paragraphs are written after a card's four lenses are approved, and the old
  closings rest on approvals now under review — when a lens set changes, flag the card's
  closing for rewrite (the five canon closings are so flagged in guidebook.csv). A closing may
  be read as evidence of intent, never as a constraint.
- **GUIDEBOOK-WOVEN HOOKS (2026-07-24, Part 3B):** the hook is written from the card's
  guidebook understanding of WHY the lens's symbol resonates — show the user's felt
  experience, then transition into why this wine embodies it. Never written from the echo
  alone. Depth beats deepen the card connection as well: the mechanism plus why this producer
  does it best, with a proper segue when the label name differs from the story's famous name.
- **NO SERVING RITUALS (the consumer-product law, 2026-07-24):** mapping ideas built on how a
  host serves the wine (blind pours, side-by-side flights, guess-the-color games) are relics
  of the framework's bartender-era origins and have no place in the consumer app — the user
  experiences bottles alone. Root them out and replace with consumer-viable mappings (the
  Moon's color-illusion idea was the first conviction, folded into Deceptive Wines as a match
  signal; watch S07's blind-tasting framing and W05's compare-the-neighbors framing).
- **THE FRAMEWORK IS THE HEADWATER** (Ed's doctrine, 2026-07-24): every lens interprets one
  mapping idea in `docs/Tarot & Wine_ The Complete Framework.md`; lenses never invent ideas.
  If an idea is too weird or unpairable even after deep search, propose MODIFYING the
  framework — divergence is discussed, approved, then written back into the framework in the
  same turn. Mapping ideas ↔ numbered lenses stay strictly 1:1, no orphans in either
  direction. Bottle repeats rooted in the framework's own example reuse are NOT collisions
  to fix at the mapping layer (C02 I Beaucastel ruling); diversity lives in the
  stocklist/ingestion layer. A machine-readable mapping registry with per-idea match
  criteria (for the automated ingestion system) is the planned end state — see the
  2026-07-24 history entry.

---

## PART 3A — THE LENS ECHO (the big line atop the Reveal)

**What it is:** the first thing read after picking a lens. The spirit acknowledging your choice —
the one moment in the whole flow where it speaks directly TO you, because you just showed your hand.
It mirrors the stance you took, then delivers a verdict with the knowing smile.

**Form:**
- Two beats: **the stance named back + the verdict.** "You came for misdirection. Wise."
  The verdict is 1–3 words, rendered italic and apricot — the spirit's raised glass.
- SHORT. It renders at 31px display serif; the whole line must sit in one or two rendered lines
  (~35 characters is the comfort zone, ~45 the hard ceiling).
- The stance echo may use "You came for…", "You chose…", "You backed…" — or drop the "you"
  entirely and name the thing ("The clean break. About time."). Vary across cards; never
  template one construction across the deck.
- The verdict is COMPLICIT APPROVAL in the card's mood — never neutral, never judging.
  Death approves gravely ("About time."), the Fool approves gleefully ("Of course."),
  the Devil approves hungrily ("Pour heavier.").

**Gold standards:**
- "You came for misdirection. Wise." (Moon · the beautiful lie)
- "The clean break. About time." (Death)
- "The comeback. Bold." (Wheel)
- "The rebellion. Naturally." (Tower)
- "The leap. Of course." (Fool)

**Bans:** everything in Part 1's hard-ban list (em dashes, negation pivots, fragments-for-effect
beyond the two-beat structure itself, rhetorical retorts). Plus: never restate the lens name
verbatim if a sharper synonym exists ("misdirection" beats "the beautiful lie" — the echo proves
the spirit UNDERSTOOD you, not that it can copy-paste).

**The test:** read the lens, then the echo. Does it feel like the spirit watched you choose and
nodded? If the echo would fit any other lens on the card, it's too generic; rewrite.

---

## PART 3B — THE POUR BLURB (the body text under the bottle)

**What it is:** where personal relevance becomes profundity. Three moves, always in this order:
1. **Echo why the lens resonated** — open by mirroring the stance in the lens's own emotional
   language, then pivot it onto the wine ("The best deceptions never feel like one, and neither
   does this.").
2. **Reveal the wine through ONE true fact** that embodies the stance. The fact must be specific,
   verifiable, and carry the whole story (Vat 1 tastes oaked but never touched oak; Altare took a
   chainsaw to the casks; Tignanello broke Chianti law). One fact, fully told, beats three facts
   gestured at.
3. **Land on the bottle** — the last beat belongs to the wine itself (what's in the glass, or the
   sly consequence of drinking it: "The second glass was always coming. So was the third.").

**Form:**
- 2–4 sentences, ~35–55 words. It lives in a scrollable region but must not NEED the scroll.
- The knowing smile appears exactly once, usually in the final beat.
- Sensory words earn their place only as evidence ("toast, honey, and oak it never once touched"),
  never as a tasting-note dump. The stats rows below carry the data; the blurb carries the story.
- Accessible to a wine novice, but never dumbed down — name the grape/place plainly and let the
  story do the teaching. No jargon walls, no "notes of" constructions.
- Each pour under the same lens gets its own angle on the stance (Vat 1 lies about oak; Furmint
  lies by reputation; Morgon lies with color) — the lens is the chord, the pours are voicings.

**Gold standards:**
- Vat 1 (Moon · beautiful lie): "The best deceptions never feel like one, and neither does this.
  Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying
  beautifully for twenty years."
- Morgon (same lens, red voicing): "It pours like a whisper and lands like a speech. Lapierre's
  Morgon looks pale, chills like a white, then unfolds into something dark-fruited and serious.
  The color was the misdirection."
- Altare (Death · a clean break): "The old way had its turn, and Elio Altare agreed. He took an
  actual chainsaw to his father's ancient casks and was nearly disinherited for it. What grew back
  is modern Barolo: rose and tar over something brand new."

**Adopted structure (golden-set ruling, 2026-07-24): THE HOOK + THE DEPTH BEAT.** The blurb
described above is THE HOOK: 2–4 sentences, 35–55 words, self-sufficient, ties the bow. This is
possibly the first substantive moment of the whole reading for the user — it must make them feel
the cards understand them and want the bottle like a soulmate. Fact-rich bottles then add an
optional DEPTH BEAT (the `depth` column in reveals.csv): 2–3 sentences rendered below the hook,
the somm leaning in with the part nobody tells you — people, dates, stakes. Never tech-sheet
data, never a tasting-note dump, and never required for the reveal to land (skimmers stop at the
hook and lose nothing; the smitten keep reading and fall further). Register shift, not length,
is what kills resonance.
**Provenance rule (the hallucination firewall):** a blurb may only assert what has been captured
with a source at ingestion; no captured story-fact, no story-claim. Story-poor bottles get the
honest tier — place, grape, structure, told charmingly — never invented drama.
**Attainability law:** attainable bottles are the hard default; unicorns (the Opus One tier) are
extreme rarities reserved for card-obvious fits, never something reached for. A couple of crazy
gems belong in the deck, but their places are completely obvious.

**Bans:** Part 1's hard-ban list applies in full. Plus: no invented facts (if the framework's
mapping idea can't be verified, choose a producer/wine where it can); no moralizing close ("proof
that risks pay off"); no second-person prescriptions ("you'll love how…").

**The test:** delete the first sentence. If the blurb still works, the echo move is missing —
rewrite. Then check the fact: would a sommelier nod? Then the last line: does the wine get it?

---

## PART 3C — THE POUR DATA (stats + palate)

Each pour also carries structured data (no voice required, accuracy only):
- Stats rows: GRAPE / STYLE / VINTAGE / ABV / SERVE / NOTES / PAIRS WITH. Values in plain body
  language, 2–4 words each. NOTES is the only place for a tasting-note triplet.
- Palate scales, 0.0–1.0 on four axes: acid (SOFT→ACIDIC), sweet (DRY→SWEET), tannin
  (SMOOTH→TANNIC), body (LIGHT→BOLD). Be honest, not dramatic — a dry Riesling is sweet 0.1,
  not 0.0; use the full range only when the wine earns it.

---

## WORKFLOW FOR BATCH WRITING (Claude Code or any chat)

**The file map — one file per content layer, one shared history:**
| Layer | Prompt section | Output file | Row unit |
|---|---|---|---|
| Spirit's voice | Part 1 | `content/spirit-voices.csv` | one per card |
| Lenses | Part 2 | `content/lenses.csv` | one per lens (3–4 per card) |
| Lens echo + pours | Parts 3A/3B/3C | `content/reveals.csv` | one per POUR (echo repeats on every row of its lens) |
| Guidebook (Deeper Reading) | `content/guidebook-prompt.md` | `content/guidebook.csv` | one per card (body governed by `status`; closing paragraph by `closing_status` — split approvals) |
| All draft history | — | `content/voice-history.md` | every graded attempt, every layer |

**The process:**
1. Read, in order: `content/voice-history.md` (the calibration — reject trails teach more than
   rules), then this file, then `uploads/Tarot & Wine_ The Complete Framework.md` (the pairing
   map), then the three CSVs (current state).
2. Write ONE LAYER at a time, in batches of 4–6 cards, STOPPING after each batch for grading.
   Layer order per card: voice → lenses → reveals (each layer builds on the approved previous one;
   never write reveals for unapproved lenses).
3. Rows carry `status`: pending → draft → approved. Never edit approved rows.
4. BEFORE overwriting any draft, append the outgoing version and its grade to
   `content/voice-history.md` under the card's heading, tagged by layer
   (e.g. `- lens r2: "..." → REJECTED: prescriptive`). One history file for ALL layers — the
   calibration lessons transfer across them, and a session should never have to hunt.
5. The design side mirrors these CSVs into its own mock data — that is a DESIGN-side task, not
   yours. The CSVs are the sole source of truth for content; never reference or require design
   files when writing.
6. If a pairing changes in the framework, regenerate only that card's affected lens/reveal rows —
   the voice usually survives a pairing change.
7. Reveal rows need real, verifiable wines. If the framework's idea can't be verified for a
   specific bottle, pick a producer where it can, and note the substitution in the history file.
