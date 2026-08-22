# THE COMPONENT AUDIT — every wine-shaped surface, and the architecture they should share

**v1 · Jul 31, 2026 · THE RECKONING AUDIT, workstream 1 (cellar-plan §0 D22).**
Read-only findings from commit `4f02052` — no code changed. Companion:
**docs/data-model.md** (workstreams 2–4: the canonical model, THE MATRIX,
the layout-vs-data ranking, bottle imagery). Line numbers cite that commit;
they will drift, the class names won't. Output contract: the C-numbered
questions at the end (C10–C14; data-model continues C15+). Verdicts fold
back into cellar-plan as D-entries — this document proposes, it does not
decide.

The one-sentence finding: **the app has exactly one shared wine-rendering
habit (the decode-gated `<img>`) and seven ways to write a wine's name.**
The card family proves the house can do shared surfaces — one actor, slots
for measurement, one thumb asset chain. The wine family grew as five
sibling screens in three eras (curated Pour → S1 rack → S2 match road) and
is already diverging exactly where D22 suspected.

---

## 1 · INVENTORY — the wine-shaped surfaces

Every place a wine renders, what it shows, and where its pixels and
derivations live. "Source" = the shape it reads (see data-model §1 for the
shapes themselves).

| # | surface | JSX | CSS | source shape |
|---|---|---|---|---|
| W1 | Rack tile (phone) | flow6-cellar.jsx:853–866 | `.cl2-tile` flow6-cellar.css:256–277, finals :315–317 | record |
| W2 | Rack row (desktop) | flow6-cellar.jsx:921–933 | `.cld2-cols`:310, `.cld-row`:230–237, `.cl-eyebrow/-wine/-sub`:240–248 | record |
| W3 | Detail hero | flow6-cellar.jsx:980–987 | `.cd-heroB`:127–131, `.clf-gy/-loc`:325–331 | record |
| W4 | Detail stats | builder :964–970, render :990–996 | `.cd-stats/-stat`:166–174 | record |
| W5 | Detail scales | flow6-cellar.jsx:998–1011 | `.cd-scales/-scale`:175–187 | record.tastes (S3) |
| W6 | Detail window band | `CelWindow` :228–249 | `.cd-window…`:133–159 | record.window |
| W7 | Detail photo strip | `CelPhotoStrip` :202–217 | `.cd-photo`:612–620 | IndexedDB blob |
| W8 | Match hero | flow6-cellar.jsx:1149–1156 | same `.cd-heroB` + `.clf-believes`:323 | candidate + extract |
| W9 | Match stats | builder :1135–1139 | same `.cd-stats` | candidate |
| W10 | Match window band | :1133, 1157 (synthetic record) | same `.cd-window` | candidate + extract |
| W11 | Correction runner-up row | flow6-cellar.jsx:1219–1226 | `.ca-opt`:595–604 | candidate |
| W12 | Count-sheet identity | flow6-cellar.jsx:1253–1254 | `.cl-sheet-name/-sub`:77–81 | record |
| W13 | Pour pane wine block | `PourPane` flow5-reveal.jsx:18–67 | round13.css `.rv-hero`:25–33, `.rv-wine/-sub`:60–65, `.rv-stats`:77–85 | POURS row (curated) |
| W14 | Pour palate scales | `Scale` flow5-reveal.jsx:8–16 | `.rv-scales/-scale`:45–59 | POURS row.tastes |
| W15 | Memory ledger row | `MemRow` flow6-memory.jsx:49–152 | `.mf-pair…` flow6-memory.css:69–75 | memory entry (frozen strings) |
| W16 | Cellar-presence marks | pip `rx-lens-dot` flow2-app.jsx:193, 221 · line `.rv-cellar-line` flow5-reveal.jsx:46 | flow2.css:242 · round13.css:37–42 | mock flags today; S4's pairing index |
| W17 | Bottle art (everywhere) | `CelBot` :182–197 · `celBottleFor` :117–120 · inline :1150 · `p.bottle` flow5-reveal.jsx:24 · `e.bottle` flow6-memory.jsx:119 | — | three derivations, two fallbacks (see F2) |

Decorative, not record-driven (inventory-complete, no action): the identify
stage's breathing bottle (:1104, always `bottle-white.png`), the empty-rack
trio (:877–881), Memory's empty-state snake.

### The derivation helpers (where the logic actually lives)

- `celBottleFor` (jsx:117–120) — `facts.color`, lowercase `"red"` → red
  bottle, EVERYTHING else (white, rosé, orange, sparkling, fortified,
  dessert, unknown) → white bottle.
- `celGrapesLine` (:121–124) — grapes + otherGrapes joined `", "`.
- `celGyLine` (:125–129) — grapes-line + vintage joined `" · "` — one
  string, which is WHY the year clips first (B-008).
- `celLocLine` (:130–133) — region + country joined `", "`.
- `celCandName` (:103–106) — producer-prefix dedupe for candidates
  ("never print Montrose Montrose"). **Used only by W11.**
- `memorySubLine` (memory-store.js:84–91 + country list :79–83) — a PARSER
  that un-joins the curated `sub[1]` (strips producer and country by
  heuristic). It exists because the curated data carries composed display
  strings instead of fields — the archetype of the whole problem.
- `wineLine` (scraps/build-lwin-index.js:154–162) — build-time name
  fallback for LWIN rows with `WINE = NA`.
- `cand.display` — the server already sends a full display name
  ("Tyrrell's, Vat 1 Semillon, Hunter Valley"); **no client surface reads
  it.** Three name-derivation sites exist (client, build script, server
  column) and no two agree.

---

## 2 · WHAT IS ACTUALLY SHARED TODAY

The honest list, in full:

1. **The decode-gate img pattern** — `CelBot` (cellar) and the deck/memory
   inline equivalents all obey the img law. Same discipline, three copies
   of the code (flow6-cellar.jsx:182–197, flow6-deck.jsx:71–82,
   memory rows use plain `<img>` — cached thumbs).
2. **`CelWindow` + `cellarComputeWindow` + `cellarWinClass`** — genuinely
   shared between detail (W6) and match (W10).
3. **`CelWin`** status chip — rack tile + desktop row.
4. **The `.cd-heroB` / `.cd-stats` CSS dress** — match reuses detail's
   classes (good instinct, S2) but with inline px overrides and a
   different stats builder (F3, F8).
5. **`.clf-gy` / `.clf-loc`** classes — reused across detail and match
   **with different content semantics** (F7). Shared paint, unshared
   meaning.

Everything else on the W-list is per-surface JSX.

---

## 3 · THE DIVERGENCE LEDGER — where siblings have already split

Each finding: the fact, the consequence, the ledger kin.

**F1 · Seven compositions of one identity.** The same
producer/wine/vintage/place renders as: W1 (`p` + `n` + `gy` + `lc`),
W2 (eyebrow `VINTAGE · PRODUCER` + wine + grape col + loc col — vintage
moves to the eyebrow ONLY here), W3 (producer eyebrow + name + grapes·vintage
+ loc), W8 (producer eyebrow + name + vintage-only + loc), W11
(`celCandName` one-liner + `vintage · region, country`), W12 (name +
`PRODUCER · VINTAGE · LOC` uppercased), W13 (a single curated string,
no fields at all). No two derive from the same code path. Consequence:
every naming fix (B-015's "Blanc") must be found and fixed up to seven
times, and Ed cannot tell a data gap from a component difference (his
exact B-010 report). Kin: B-015, B-010, B-008.

**F2 · Three bottle-art derivations, two fallback colours.** W1/W2/W3 use
`celBottleFor` (unknown → **white**); W8 uses an inline ternary on
`cand.type === "Red"` (:1150 — different field, case-sensitive, unknown →
white); the Pour and Memory use stored paths with a **red** fallback
(flow5-reveal.jsx:24, flow6-memory.jsx:119, migration default
memory-store.js:113). The same unknown wine is a white bottle in the
Cellar and a red one in the Pour. Kin: the imagery workstream
(data-model §4).

**F3 · Two stats builders, disjoint vocabularies.** Detail builds
GRAPE/STYLE/REGION/VINTAGE (:964–970); match builds
STYLE/REGION/CLASSIFICATION/VINTAGE (:1135–1139). CLASSIFICATION exists
only pre-confirm: `confirmCandidate` stores it as `facts.appellation`
(:729) **which no surface renders** — the datum literally vanishes from
view at the moment the user confirms. `subRegion` and `designation` are
dropped even earlier (never copied into facts). The curated Pour's stats
are free-keyed per row (GRAPE/STYLE/VINTAGE/ABV/SERVE/NOTES/PAIRS WITH —
arcana-data.js POURS). Kin: B-015 ("are we using the data fully?" — no),
B-007.

**F4 · Two palate-scale components with different ends for the same
axes.** Pour (W14): SOFT↔ACIDIC · DRY↔SWEET · SMOOTH↔TANNIC · LIGHT↔BOLD,
with the hot-side label emphasis. Detail (W5): SOFT↔BRIGHT · DRY↔SWEET ·
SILK↔GRIP · LIGHT↔FULL, no emphasis. Both render 0–1 marks on the same
four axes; S3 will generate ONE `tastes` object that both surfaces show.
Today the same value would be captioned differently on the two screens.
Kin: S3, C10.

**F5 · The window computes from different inputs on different screens.**
Match computes with `grapes: []` (:1133); detail computes from the record.
Today matched records also land `grapes: []` (:727) so they agree by
accident — the moment grapes are adopted at confirm (B-010's interim fix),
the match sheet and the detail will show DIFFERENT windows for the same
bottle unless the computation is unified. A trap laid for the exact fix
the ledger plans. Kin: B-010.

**F6 · Location joins, four ways.** `celLocLine` (record), match inline
`[cand.region, cand.country]` (:1134), runner-up inline (:1223), desktop's
uppercased column — plus `memorySubLine` parsing a composed string back
apart. None handles `subRegion`, which the candidate carries and LWIN
fills 68% of the time. Kin: B-015.

**F7 · Same class, different meaning.** `.clf-gy` holds grapes·vintage on
the detail (:984) and vintage alone on the match (:1154). The CSS family
says "same thing"; the content says otherwise. A future hand styling
`.clf-gy` will change two semantics with one rule.

**F8 · The hero is one dress with inline forks.** W3 and W8 share
`.cd-heroB` but fork by inline style: bottle 150px (:981) vs 136px
(:1150) vs the CSS's own 172px (:128); eyebrow margin 14px (:982) vs 10px
(:1152); the believes-line and qty chip toggle by copy-paste, not by
prop. This is D22's sentence verbatim: the wine-page family should be
states of one layout, not sibling pages.

**F9 · Sparse-state treatment exists on one sibling only.** The match got
the D11 sparse line (`.ca-sparse`, :1158); the detail — which shows the
same sparse record for weeks until S3 — has nothing where the story will
be, and the settling shimmer never resolves (B-011: `enrichment.status`
is born `"pending"` and no code ever transitions it — see data-model §1.3).
Kin: B-011, B-015.

**F10 · The Pour pane cannot receive a structured wine.** W13 renders
`p.wine` as one string and `p.sub` as two untyped lines whose meaning
varies row-to-row in the curated data (grape+region in one pour,
grape+producer,region in the next — see data-model §1.5). S4 must inject
CELLAR wines (structured identities) into this surface for the
cellar-variant blurb; there is no seam for it. B-007's pairing-type
definition is the missing contract. Kin: B-007, B-012 (the Card-meaning
button overlap is a symptom of the same untyped meta column).

---

## 4 · THE CARD-SHAPED SURFACES — the counter-example

Inventory: the ACTOR (`.va-card-actor`, flow6-root.jsx — one card, one
shadow, one clock; never remounted), the deck tile (flow6-deck.jsx:55–88),
the Approach deck back (flow2-app.jsx:115–120), the Reading's invisible
slot (:208, :183), the Pour pane card + pinned copy + ghost slot
(flow5-reveal.jsx:39–40, 146–147), the Memory mini card
(flow6-memory.jsx:118), and the Deeper flip container
(flow6-deeper.jsx:245+, guide slab :390–412).

Findings: **healthy.** One face-asset chain (`assets/cards/` +
`thumbs/`), one actor with slot-measurement handoffs, deliberate
per-surface variation (tilt vocabularies 9°/11° deck vs 13°/16° deeper are
DOCUMENTED intent, flow6-deeper.jsx:19–21). The divergences that existed
(shadow values) were caught and ruled by Ed (D17). No action. The lesson
it teaches: shared identity + per-surface variants BY DECLARED PARAMETER
is the house pattern that survives device rounds. The wine family should
be rebuilt to it.

---

## 5 · THE PROPOSED ARCHITECTURE — window-global wine surfaces

The app's existing component pattern, applied: plain script files that
hang components on `window` (every screen file already ends in
`Object.assign(window, …)`), loaded before their first consumer in
index.html, no build step. Nothing here touches layout law — every
component renders INSIDE existing stages/scroll owners; zero new layers,
zero membership-rule entries, zero anchor-set candidates. The recipe
(stage-construction §5) is untouched by construction.

**New files:**
- `explorations/wine-surfaces.jsx` — script-tagged between flow5-app.jsx
  and flow5-reveal.jsx (index.html:60–61) so the Pour can consume it.
- `explorations/wine-surfaces.css` — new `ws-` namespace (the collision
  lesson; the old classes retire per migration step, never coexist as
  duplicates).

**The keystone is not a component — it is the normalizer:**

```
wineView(src) → {
  producerLine, nameLine, vintage,        // identity, derived ONCE
  gyLine: {grapes, vintage},              // two spans, never one string (B-008)
  locLine,                                // region [· subRegion] · country policy
  bottle: {src | archetypeKey},           // ONE art resolution (F2)
  sparse: bool, settling: bool
}
```

accepting all four shapes (record · candidate · POURS row · memory entry)
and owning every derivation in §1's helper list. `celCandName`'s dedupe,
the B-015 display-rescue (data-model C17 decides the policy), the
fallback-colour rule (C11), and `subRegion` handling all land HERE, once.
Pure function, no state — trivially testable in the suite.

**The components** (presentational, props-in/DOM-out; state stays in the
stores and screens — CellarStore/MemoryStore remain the only seams):

| component | replaces | consumers |
|---|---|---|
| `WineBottle` | CelBot + celBottleFor + inline ternaries + stored-path fallbacks | W1 W2 W3 W8 W13 W15, empty states |
| `WineNameBlock` variant=`tile·row·hero·option·sheet` | the seven compositions (F1) | W1 W2 W3 W8 W11 W12 |
| `WineStats` + `wineStatsFor(shape, context)` | both inline builders (F3) | W4 W9, Pour stats later |
| `WineScales` | Scale + the cd-scale inline map (F4) | W5 W14 |
| `WineWindow` | CelWindow (promoted as-is; input unified per F5) | W6 W10 |
| `WineHero` variant flags: `believes`, `qty`, size token | the cd-heroB forks (F8) | W3 W8, S3's settled detail |
| `WinePresence` | rx-lens-dot + rv-cellar-line mock-flag renders | W16, S4 |

`CelPhotoStrip` stays cellar-local (one consumer, retention-law-specific).
The Memory row keeps its frozen strings BY DESIGN (the journal is a record
of what the Pour said that night, not a live view) — it adopts
`WineBottle` only.

**The B-007 contract rides `WinePresence` + the Pour pane.** Proposed
display taxonomy for Ed's verdict (C13), unifying B-007's words with
§3.4's `level`:

| pairing type | §3.4 level | pane shows |
|---|---|---|
| THE BOTTLE | exact | full identity (producer · wine · vintage), cellar line when owned |
| THE HOUSE | producer | producer + style line, no vintage claim |
| THE ARCHETYPE | archetype | style + region ("a cru Beaujolais"), never a fake specific |

Whatever Ed rules, each type gets a DEFINED field set and one layout
decision — "no more winging it" is the B-007 ask, and the typed
`wineView` output is what makes it enforceable.

---

## 6 · MIGRATION ORDER — divergence first, sequenced against the fix rounds

Rules: earliest steps kill the divergences that bite today's ledger;
every step deletes the code it replaces in the same commit (no parallel
paths); suite stays 9/9 per step (T3/T6–T9 collectively drive the pour,
memory, rack and photo-road screens these components live on); no step
touches pinned/viewport construction, so the probe is belt-only. Ledger fixes that live ON a migrated surface land WITH or
AFTER its step — never before (D22: nothing polished twice).

- **M1 — `wineView` + `WineNameBlock`** (W1 W2 W11 W12, then W3 W8 text
  stacks). Carries INSIDE it: B-008's two-span gy fix, the celCandName
  unification, the B-015 name-rescue (client half), subRegion handling.
- **M2 — `WineBottle`** everywhere. Carries: the one fallback policy
  (C11). This is also the socket the imagery verdict (data-model §4)
  plugs into — do it early so the verdict is a data change, not a hunt.
- **M3 — `WineStats` + `wineStatsFor`.** Carries: appellation/designation/
  SUB_TYPE surfacing per C16, the detail's sparse treatment (F9 parity),
  B-015's "use the data fully".
- **M4 — `WineWindow` input unification** (one computation site). Carries:
  B-010's grape adoption IF C15 rules yes — match and detail then agree
  by construction.
- **M5 — `WineHero`** (fold the inline forks into variants/tokens).
- **M6 — `WineScales`** (idle until S3 data; must land BEFORE S3 lights
  both surfaces; vocabulary per C10).
- **M7 — Pour pane adoption + `WinePresence`** (needs the C13 taxonomy;
  S4 prerequisite). Carries: B-012's fix (the meta column becomes a flex
  column with the button footed) — done here once, not patched twice.

**Against the ledger's rounds** (all cellar/pour bugs open as of
`4f02052`):

| round | bugs | sequencing law |
|---|---|---|
| pipeline round | B-018 B-019 (+ golden re-run) | independent of components — server-side; may run first |
| papercut round | B-002 B-003 B-016 B-017 | independent — none is a wine surface (B-017's toast system is app infra; B-011's chip becomes its customer) |
| rack/detail polish round | B-008 B-010 B-015(display) B-011(moment) | **AFTER M1–M4** — these fixes ARE M1–M4 content; running them on the old inline JSX is the double-polish D22 forbids |
| pour round | B-012 B-013 B-014 | B-012 waits for M7 (or ships AS the M7 column rebuild); B-013/B-014 are card/tweaks work, unblocked |

S3 sequencing: M3+M6 before S3's settle loop renders anything; M7 before
S4's pips. F-track (lens ids) is orthogonal — no wine surface renders a
lens id.

---

## 7 · VERDICTS — answered by Ed, Aug 21 2026 (logged as cellar-plan D24)

- C10 → the Pour's labels everywhere: SOFT↔ACIDIC · DRY↔SWEET · SMOOTH↔TANNIC · LIGHT↔BOLD.
- C11 → red bottle for red wines, white bottle for everything else, until real images exist.
- C12 → yes: match, detail, and the settled detail are states of ONE wine page; correction stays a list.
- C13 → the three pairing types approved as tabled.
- C14 → migration order and round sequencing approved.

The questions as originally asked follow, kept for the record.

## 7a · QUESTIONS FOR ED — C10–C14 (data-model.md continues C15+)

**C10 · The palate-scale vocabulary.** One `WineScales` will caption the
same four 0–1 axes everywhere. Today the Pour says SOFT↔ACIDIC ·
DRY↔SWEET · SMOOTH↔TANNIC · LIGHT↔BOLD (with the hot-end emphasis); the
Cellar detail says SOFT↔BRIGHT · DRY↔SWEET · SILK↔GRIP · LIGHT↔FULL (no
emphasis). Which set is canon — Pour's, detail's, a third — and does the
hot-end emphasis ride everywhere?

**C11 · The bottle fallback, until the imagery verdict lands.** Unknown
or non-red/white wines show a WHITE bottle in the Cellar and a RED one in
the Pour/Memory today, from two stock PNGs. Pick the one interim rule:
(a) white everywhere, (b) red everywhere, (c) red for red, white for
everything else, dark-glass reading be damned — knowing rosé, orange,
sparkling and fortified will all wear it until data-model C21 buys real
art.

**C12 · The wine-page family.** Confirm the target: match hero, detail
hero, and S3's settled detail become STATES of one `WineHero`
(believes-line, qty chip, size token as the only variants) — and the
correction screen stays a list whose runner-up rows are the `option`
variant of `WineNameBlock`, not a fourth page. This is D22's "states of
one layout" made concrete; a no here reshapes §5.

**C13 · The pairing display taxonomy (B-007).** Verdict on the §5 table:
THE BOTTLE / THE HOUSE / THE ARCHETYPE as the three pairing types, mapped
1:1 onto §3.4's exact/producer/archetype, each with the field set shown.
Add, cut, or rename types; the layouts get designed once against your
answer (canvas board likely warranted before M7 builds it).

**C14 · The migration order and its round sequencing.** Confirm M1–M7 and
specifically the law that the rack/detail polish round (B-008, B-010,
B-015-display, B-011-moment) runs AFTER M1–M4 land — meaning those four
ledger entries stay open a little longer so their fixes are born on the
shared components. Alternative if you want the papercuts sooner: fix
B-008 on the old tile now and accept re-doing it in M1 (cheap, but it is
the exact double-polish D22 told this audit to prevent).

---

*Cross-references: docs/data-model.md (the shapes these components render;
C15+) · cellar-plan §0 D22, §3.4, §5.2 · docs/bug-ledger.md B-007 B-008
B-010 B-011 B-012 B-015 · stage-construction §5 (the recipe these
components must not disturb) · choreography-grammar.md (the card family's
actor laws).*
