# THE DATA MODEL — one reference for every wine datum the app holds, shows, or owes

**v1 · Jul 31, 2026 · THE RECKONING AUDIT, workstreams 2–4 (cellar-plan §0
D22).** Read-only findings from commit `4f02052`. Companion:
**docs/component-audit.md** (the surfaces; C10–C14 — this document
continues **C15+**). Every count below was measured during this audit
against the SHIPPED index artifact (`api/_lwin/lwin.db.gz`, 185,130 rows)
and the station's `LWINdatabase.xlsx` (212,038 rows) — none is assumed.
Verdicts fold back into cellar-plan as D-entries; S3/S4/S6 already own
much of what reads "missing" here, and each such row says so instead of
reinventing the plan.

---

## 1 · THE CANONICAL MODEL — four layers plus the curated ancestors

Data flows: **LWIN xlsx → index row → resolve candidate → client record
envelope → (S6) §3.4 tables**, with extract joining at the candidate step
and the curated POURS/Memory shapes standing beside the whole chain.

### 1.1 The LWIN row (source: quarterly xlsx; builder scraps/build-lwin-index.js)

Columns confirmed Jul 19 2026 (D21), fill rates measured by this audit
against the 185,130 kept rows (STATUS=Live, TYPE∈{Wine, Fortified Wine}):

| xlsx column | fill | where it goes | plan / "unused — why" |
|---|---|---|---|
| LWIN | 100% | `wines.lwin` (pk) — LWIN-7, the wine level | `identity.matchedId`; the §3.3 cache key ingredient; the §8.14 buy bridge |
| STATUS | 100% | filter only | drops Combined/Deleted |
| DISPLAY_NAME | 100% | `display` + FTS | **carries the full name for every defective WINE row** — the B-015 rescue lives here (C17) |
| PRODUCER_TITLE + PRODUCER_NAME | ~100% | joined → `producer` | display + scoring; 3,325 rows are merchant-parenthesized ("Berry Bros & Rudd (Chateau Suduiraut)") — B-019 kin, C20 |
| WINE | ~86% filled (rest NA → `wineLine()` builds a fallback) | `wine` | **8,347 rows (4.5%) are a bare colour/style word** — Rouge 2,745 · Blanc 2,446 · Rose 1,574 · Brut 573 · Tinto/Rosso/Red/Bianco/Branco/White/Blanco/Rot/Weiss the rest; 1,777 rows literally equal their COLOUR; 623 rows start with their producer. B-015's smoking gun, measured (C17) |
| COUNTRY | 99.98% | `country` | display + facets |
| REGION | 96.8% | `region` | display + facets; also the imagery keying signal (§4) |
| SUB_REGION | 68.1% | `sub_region` → candidate `subRegion` | **sent to the client, then dropped — no store, no render** (C16) |
| SITE | 8.3% | FTS `extra` only | search-only; fine |
| PARCEL | 48 rows | **dropped** | unused — empty in practice |
| COLOUR | 98.4% | `colour` (raw: Red 99,229 · White 73,409 · Rose 9,263 · null 2,927 · Mixed 302) | feeds `appType`; raw value also sent as candidate `colour`, unread (1.2) |
| TYPE | 100% | filter + `appType` | Wine / Fortified Wine |
| SUB_TYPE | 99.7% | consumed by `appType` (Sparkling), then **dropped** | Still 170,339 · Sparkling 11,858 · **Port 979 · Madeira 562 · Sherry 552 · Vin Doux Naturel 266 · Marsala 73 · Rutherglen 13 · Moscatel de Setúbal 17 · Montilla-Moriles 7** — the fortified sub-styles are real display material a "Fortified" chip flattens (C16) |
| DESIGNATION | 89.5% | `designation` | sent; stored only as the lossy `appellation` merge (1.3); never rendered (C16) |
| CLASSIFICATION | 8.2% | `classification` | match-stats row pre-confirm; vanishes post-confirm (1.3) |
| VINTAGE_CONFIG | 100% | **dropped** | sequential 169,553 · nonSequential 4,890 · singleVintageOnly 10,687 — the one free sanity check on extract's vintage read (a 4-digit read against a singleVintageOnly row is suspect); cheap to carry at the next quarterly rebuild if wanted |
| FIRST_VINTAGE / FINAL_VINTAGE | **1.2% / 0.15%** | **dropped** | rightly — near-empty. **Consequence for S3: the "window server-side w/ LWIN override" (§6 S3) has essentially no LWIN to override with. Windows are generation territory, full stop** (§2 window row, C19) |
| DATE_ADDED / DATE_UPDATED / REFERENCE | — | dropped | build provenance only |

Derived at build: `appType(TYPE, SUB_TYPE, COLOUR)` → Red 98,945 · White
64,176 · Sparkling 11,858 · Rosé 6,967 · Fortified 2,933 · **null 251**.
Note what it CANNOT say: **Orange and Dessert do not exist in LWIN's
vocabulary** — Gravner files as White; Suduiraut (Sauternes) is White +
Still + AOP. The app's 7-type list exceeds the scan pipeline's expressible
5 (C18).

### 1.2 The resolve candidate (api/cellar-resolve.js:130–146)

`{ lwin, producer, wine, display, country, region, subRegion, colour,
type, designation, classification, score }` + top-level `threshold`.

| field | consumed by | unused — why |
|---|---|---|
| lwin, producer, wine | identity at confirm; W8/W11 display | — |
| display | **nothing** | the server already composed the canonical name; the client re-derives with `celCandName` instead — adopt in `wineView` (component-audit §5) or stop sending |
| country, region | facts + display | — |
| subRegion | **nothing** | dropped at confirm; C16 |
| colour | **nothing** | `type` is used instead; colour is the raw LWIN value (incl. "Mixed"/null) — redundant unless the imagery keying (§4) wants the raw channel |
| type | facts.color, bottle art, window, score's type-agreement (B-018) | — |
| designation, classification | match stats (pre-confirm); `classification || designation` → facts.appellation | the merge is lossy AND inverted in spirit — cru (8.2%) wins over AOP (89.5%), then neither renders post-confirm |
| score | routing vs threshold; identity.confidence | — |

### 1.3 The client record envelope (cellar-store.js:6–19; `va-cellar` v1)

Attribute × writer × reader × plan. This is the §3.4 tables' direct
ancestor — S6 migrates it wholesale.

| attribute | written by | read by | plan / unused — why |
|---|---|---|---|
| id, addedTs, updatedTs, count | store | everywhere | — |
| identity.producer/wine/vintage | form / confirmCandidate | every surface; `idKey` dup detection | **vintage defect:** an unreadable read lands as `"NV"` (flow6-cellar.jsx:709 `fields.vintage || "NV"`) — a MISS becomes a data claim, displayed and window-driving. Fix-round item, flagged here (§3 R5) |
| identity.source | both roads | settling check, retention law | "matched" \| "manual" |
| identity.matchedId | confirm (LWIN-7) | **nothing at runtime** | held for §3.3 cache join + §8.14; **note: `findByIdentity` dedupes by strings only — two adds of the same LWIN with different string forms ("Sémillon"/"Semillon") make two records; prefer lwin equality when both sides have one** (fix-round item) |
| identity.confidence | confirm (score) | **nothing** | provenance; S5 tuning may read; keep |
| facts.color | form / confirm | bottle art, facets, window, stats STYLE | — |
| facts.style | **never written** | never read | declared in the shape comment only — reserve for S3's style words ("Skin-contact white") or delete at S3 |
| facts.grapes / otherGrapes | form; **confirm writes `[]`** (jsx:727) | gy lines, facets, window, stats GRAPE | the B-010 gap is a write-side choice, not a component; extract DOES read label-printed grapes (C15) |
| facts.region / country | form / confirm | loc lines, facets | — |
| facts.abv | **never written** | never read | declared only; S3's stats carry ABV — decide fact vs stat row at S3, then delete one of the two homes |
| facts.appellation | confirm (lossy merge, 1.2) | **never read** | C16 decides its display; the merge should preserve both fields |
| window {from,to,status,word} | cellarComputeWindow | W1 chip, W6/W10 band + word | heuristic v0; S3 regenerates (C19) |
| tastes | null until S3 | detail scales render when present | S3 |
| story | null until S3 | detail renders when present | S3; match shows cached-only (D11) |
| stats | null until S3 | **NO renderer** — the detail's stat rows build from `facts`, not from `record.stats` (flow6-cellar.jsx:964–970) | wire at component-audit M3, before S3 lands data into a field nothing reads |
| labelPhoto | photo-road form commit | detail strip; remove() deletes | retention law enforced |
| pairings[] | S4 | index rebuild (cellar-store.js:95–107) | soft-secret law (§8.6) |
| enrichment {status, ts} | add() writes `{status:"pending", ts:null}` | settling shimmer (30s bound) | **no code ever transitions it and ts is never set — B-011's root in one line.** S3's settle loop owns the real transitions; the interim "settled" moment (B-011) should write `status:"none"`/`"done"` so the shimmer's end is data, not a timer |

### 1.4 The §3.4 database descendant (S6 — designed, not built)

Envelope → tables, so S6 is a migration, not a redesign: `wines` (global
cache: lwin7 nullable + normalized identity + facts/story/tastes/window/
stats jsonb + enrichment_status + lint_report) ← everything generated;
`cellars` (per-user: count, added_ts, source, manual identity fields,
label_photo_path) ← the per-user half of the envelope; `wine_pairings`
(lens_id-keyed, `level`, pour_index, blurb, mapped_against) ← pairings[].
Two seams this audit adds to the §3.4 record:

- **The cache-grain question.** `wines` is one row per "wine" with
  `vintage_mode` — but the WINDOW is vintage-dependent (a 2014 and a 2022
  Vat 1 do not share one) while story/pairings mostly are not. Either the
  cache key includes vintage (multiplying §4.2's unique-wine counts and
  cost), or `window` moves out of the `wines` row into a per-vintage
  derivation (generated once per wine as RULES — "drink at 8–20 years" —
  and resolved against the bottle's vintage client-side). The plan is
  silent; S3 generation needs the answer before it writes windows (C19).
- **Food pairings have no home** in §3.4. If D22's "someday-filterable
  FOOD pairings" is real, S3 must write them typed from birth (C21) —
  retrofitting free text into facets is the exact debt this audit exists
  to prevent.

### 1.5 The curated ancestors (POURS row · memory entry)

`POURS[card][lens_no][] = { wine, sub[2], bottle, body, stats{free keys},
tastes{acid,sweet,tannin,body}, cellarMatch }` — identity is ONE string;
`sub` semantics vary row to row (["FIELD BLEND","CALIFORNIA"] in one pour,
["SAUVIGNON BLANC","SCHOLIUM PROJECT, CALIFORNIA"] in the next); stats
keys are free-form per row (3 keys to 7, including `PAIRS WITH`);
`memorySubLine` exists to PARSE `sub[1]` back apart (memory-store.js:84).
The memory entry freezes these strings at keep time — by design (the
journal records what the Pour said). The audit's read: the curated shapes
are grandfathered, but S4's cellar-variant panes must NOT inherit the
untyped `sub` convention — they render from `wineView` (component-audit
§5, C13).

---

## 2 · THE MATRIX — every datum × have / planned / needs-a-plan

Legend: **L** = HAVE-from-LWIN · **E** = HAVE-from-extract · **S3/S4** =
planned generation (cellar-plan §5/§6) · **PLAN** = needs a plan (nothing
owns it). "Truth" = source of truth once everything ships.

| datum | today, matched scan | today, manual | status | truth | open question |
|---|---|---|---|---|---|
| Producer line | L (producer) | user | **L/E** | LWIN, user for unmatched | merchant-paren rows read as the producer (C20) |
| Wine/cuvée line | L (WINE, defective 4.5%) | user | **L/E** | LWIN via DISPLAY-aware derivation | the B-015 rescue: index vs client vs both (C17) |
| Vintage | E only (LWIN-7 is vintage-less) | user | **E** | the label/user | ""→"NV" coercion falsifies misses (1.3); VINTAGE_CONFIG could sanity-check (1.1) |
| Type (Red…Dessert) | L appType (5 of 7 values reachable) | user (all 7) | **L/E** | LWIN + S3 correction | Orange/Dessert unreachable by scan (C18) |
| Sub-style (Port, Madeira, pét-nat…) | dropped at build | — | **L (dropped) + S3** | SUB_TYPE + S3 style words | surface at C16; S3's `facts.style` is the richer end state |
| Grapes | **none** (confirm writes []) | user chips | **E now, S3 truth** | S3 enrichment | adopt extract's label-read grapes interim? (C15) |
| Region | L 96.8% | user (free text) | **L** | LWIN | — |
| Sub-region | L 68.1%, sent, dropped | — | **L (dropped)** | LWIN | show on detail/loc line? (C16) |
| Designation (AOP/DOCG) | L 89.5%, stored lossy, unrendered | — | **L (buried)** | LWIN | C16 |
| Classification (cru) | L 8.2%, pre-confirm only | — | **L (vanishes)** | LWIN | C16 |
| Country | L ~100% | user | **L** | LWIN | — |
| Drink window | heuristic v0 (grapes-blind on scans) | heuristic v0 | **PLAN → S3** | S3 generation — **LWIN contributes nothing** (FIRST/FINAL_VINTAGE ~empty) | vintage grain of the cache (C19); credibility until S3 (§3 R5) |
| Palate sliders | null | null | **S3** | S3 `tastes` | one caption vocabulary first (C10) |
| Stat rows (ABV·SERVE·NOTES) | null; `record.stats` has no renderer | null | **S3** | S3 `stats` | wire the renderer at M3 (1.3) |
| Story | null; match sparse line | null | **S3** | S3 `story` (+ lint) | detail needs the sparse dress meanwhile (component-audit F9) |
| Card/lens pairings + blurbs | [] | [] | **S4** | S4 mapping (id-keyed, §3.6) | display taxonomy C13 |
| FOOD pairings | free text in curated POURS stats only | — | **PLAN** | S3 generation, typed | shape + filterability (C21) |
| Bottle imagery | 2 stock PNGs (+1 real: `bottle-vat1.png`) | same | **PLAN** | §4's verdict | C22 |
| Label photo | discarded on match (law) | kept if photo-road manual | **HAVE** | retention law | user photos as art would amend the law (§4 option B) |
| Jot | — | — | **HAVE (Memory only)** | curated lines / user edit | — |
| LWIN id + attribution | stored; attribution ships (rack foot) | null | **HAVE** | Liv-ex CC BY 4.0 | — |
| Provenance (source/confidence) | stored, unrendered | stored | **HAVE** | pipeline | keep as audit trail |

---

## 3 · THE LAYOUT-VS-DATA RANKING — screens that assumed curated data, worst first

**R1 · The hero name lines vs LWIN reality.** W3/W8 were designed for a
curated "Vat 1 Sémillon" and receive "Blanc" (8,347 rows), "Chateau
Suduiraut Premier Cru Classe, Sauternes" (names carrying their own
producer + classification), and "Berry Bros & Rudd (Chateau Suduiraut)"
producers. The data to fix it is ALREADY IN THE INDEX (`display` carries
"Chanson Pere et Fils, Beaune Premier Cru, Clos des Mouches Rouge" for
the B-015 bottle). Highest rank because it corrupts the identity itself —
everything else is sparseness; this is wrongness. → C17, C20.

**R2 · The sparse detail.** The layout carries slots for story, four
scales, 4+ stat rows, a window with a word — a scanned record fills the
window, three stats (no GRAPE), and nothing else: no sparse-story
treatment (the match got `.ca-sparse`; the detail got silence), the
settling shimmer that never ends (B-011 = `enrichment.status` never
transitions, 1.3), and LWIN facts the screen already owns but drops
(designation 89.5%, subRegion 68.1%, SUB_TYPE styles). The screen reads
"empty" when the truthful reading is "young". → C16, component-audit M3.

**R3 · Bottle art.** Every wine surface was composed around per-wine
bottle art — the Pour's 250px hero, the rack's 100px tiles, Memory's
96px pairs — and the entire supply is `bottle-red.png`, `bottle-white.png`,
one hand-made `bottle-vat1.png` (286 of 287 curated pours ship a stock
bottle), plus a dead `.bottle-sil` silhouette seam (round13.css:31). LWIN
has no images and never will. The one genuinely NEW workstream → §4, C22.

**R4 · The facets lie by omission.** Grape pills are built from cellar
contents (flow6-cellar.jsx:380–396) — scanned wines contribute none, so
"Sémillon" filters OUT the scanned Vat 1 while showing the manual one;
the desktop Grape column runs empty for scans; type facets can never say
Orange/Dessert for a scanned bottle. Filtering is where sparse data stops
being quiet and starts being wrong. → C15, C18.

**R5 · Window credibility on scans.** grapes-blind heuristic (long-ager
detection needs grapes), the ""→"NV" vintage coercion (a misread becomes
"non-vintage" with a freshness window counted from TODAY), and Dessert
wines typed White by LWIN get a white's window (Suduiraut: v+15 instead
of v+30). All three are input defects to a heuristic that S3 replaces —
but the band renders confidently NOW. Options short of S3: compute
honestly (hide the band when grapes are empty AND type is scan-derived),
or accept crude. → C19's interim clause.

**R6 · The Pour pane vs structured wines (S4's collision).** One string
`p.wine`, untyped `sub`, free-key stats — and S4 must render YOUR cellar
bottle there. Without the B-007/C13 typed contract, S4 will be forced to
compose display strings at injection time, recreating this whole audit
one layer up. → C13 (component-audit), C21.

**R7 · Memory.** No mismatch — frozen curated strings by design. Ranked
last deliberately so no future hand "fixes" it.

---

## 4 · BOTTLE IMAGERY AT SCALE — the costed options (for a verdict)

**The requirement, from the surfaces:** transparent-background bottle art
that reads at 30–69px widths (rack/memory) up to 250px height (Pour),
under CSS drop-shadows, in both modes. **The floor today:** two stock
PNGs; `celBottleFor` renders every rosé, orange, sparkling, fortified and
unknown wine as the white bottle (Pour/Memory fall back red — component-audit
F2). **The keying data we own:** appType 99.9% + REGION 96.8% + SUB_TYPE
99.7% — enough to derive shape (Bordeaux/Burgundy/flute/Champagne/
fortified) + glass colour + wine colour for nearly every matched row.
**The precedent:** the canvas already hand-made one true bottle
(`bottle-vat1.png`, the Vat 1 pour) — the house knows what "real" looks
like. Whichever option wins plugs into `WineBottle` (component-audit M2),
so the verdict is a data/asset change, not a code hunt.

| option | one-time | per unique wine | monthly | rights | label fidelity | house-art fit |
|---|---|---|---|---|---|---|
| **A · House-illustrated archetypes** — 12–24 pieces: shape (bordeaux · burgundy · flute · champagne · fortified · dessert-half) × glass/wine colour, keyed from type+subType+region | Ed's canvas time, or commissioned ≈ $50–150/piece → **$600–3,600** | $0 | $0 | clean by construction | style-true, never label-true | native — it IS the house style |
| **B · User photos as the art** | $0 | $0 | S6 storage (within Supabase Pro's 100GB at ~200KB/photo for a long time) | user-granted; **collides with the retention law** — photos are kept ONLY for manual+unmatched (hard product law); matched-wine display requires Ed to AMEND the law + an S6 rights line in the ToS | label-true for that user's bottle | poor — uncontrolled light/angle beside the tarot art |
| **C · Hybrid (A floor + photo accent)** | as A | $0 | as B | as A+B | archetype always, the user's own label where law allows (the detail's photo strip already exists) | good — archetype carries the design; photo is a keepsake, not the layout |
| **D · Paid feeds** | sales process | LWIN: **no images, ever** (§2.1). Wine-Searcher trade API: advertises label images among its 30+ fields (checked at audit time, Jul 2026); pricing enterprise-gated — §2.1's finding stands (historically hundreds/mo) — and **display/redistribution rights for their label images are unconfirmed** (their images are largely merchant/user-submitted; a legal read is mandatory, not optional). Scraper listings (~$0.025/wine) are §2.1-rejected on license+reliability — worse for images than for data | $100s/mo + legal | murky → blocking until proven | label-true where covered; fine-wine-biased coverage | foreign — real photos of mixed provenance inside the illustrated world |
| **E · Generated per-wine art** (not in D22's candidate list; included for completeness) — an image model illustrates each unique wine at first add, style-locked to house reference art; §3.3's cache makes it one-time per wine | prompt+reference work | ≈ $0.02–0.08 (batchable at 50%) → $200–800 per 10k unique wines | $0 | generated — but drawing REAL labels invites trade-dress/trademark exposure, and near-real labels read as counterfeits when wrong | approximate — the dangerous middle: too real to be an archetype, not real enough to be true | controllable, with drift risk per generation |

Interactions worth knowing before ruling: A is a strict prerequisite of
C and a safe fallback under D/E; B/C change a product LAW, not just
pixels; D re-opens the §2.1 vendor conversation the plan already closed
once (revisit-with-telemetry was the standing rule); E's real risk is not
cost but authenticity — an invented label on a real wine is a lie in
exactly the register this app never lies in.

---

## 5 · VERDICTS — answered by Ed, Jul 31 2026 (logged as cellar-plan D24)

- C15 → no: grapes wait for S3's enrichment (B-010 parked).
- C16 → show sub-region and classification whenever present; never show designation codes (AOP/DOCG…).
- C17 → names come from DISPLAY_NAME minus the producer, derived at runtime (no rebuilds); the WINE column is never displayed; long appellation names stay whole.
- C18 → no hand-kept list; waits for S3.
- C19 → windows only for cellar bottles with a known 4-digit vintage, computed from vintage + type + region; nothing bottle-specific is shown without its inputs. Wine-level facts cache once per wine; bottle-level facts compute per bottle.
- C20 → producer line normalizes to the parenthesized house; the outer name is kept as bottler.
- C21 → no tags, no free-text rows: food pairings will be DERIVED from wine attributes by a pairing methodology (new workstream); the curated PAIRS WITH rows leave the pours when it ships.
- C22 → illustrated/generated bottles rejected for specific wines; real photos required (retailer partnership for purchase deep-links preferred); illustrated shapes only for archetype pairings. Deep sourcing research ordered.

The questions as originally asked follow, kept for the record.

## 5a · QUESTIONS FOR ED — C15–C22 (continuing from component-audit C10–C14)

**C15 · Adopt extract's grapes at confirm? (B-010)** The label reader
already returns label-printed grapes (curated-list-filtered on the form
road, discarded on the match road at flow6-cellar.jsx:727). Adopting them
into matched records' facts fills the tile's grape line, the facets, the
desktop column, and the window's long-ager detection — at the cost of
occasionally printing a misread grape until S3's authoritative pass
corrects it. Yes (display + facets + window), partial (display only), or
no (wait for S3)?

**C16 · What the sparse detail surfaces from LWIN, now.** Rank/choose
from what the candidate already carries: sub-region (68% filled —
"Burgundy · Beaune"), designation (89.5% — "AOP"), classification (8.2% —
"Premier Cru"), fortified sub-style (Port/Madeira/… — needs one index
column carried at the next quarterly rebuild), and whether the stored
`facts.appellation` merge should preserve BOTH designation and
classification instead of cru-else-AOP. Everything chosen lands via one
builder (component-audit M3); everything declined stays candidate-only.

**C17 · The name policy for the 8,347 bare-colour rows (B-015).** The
truth exists in DISPLAY_NAME ("Chanson Pere et Fils, Beaune Premier Cru,
Clos des Mouches Rouge"). Options: (a) fix at INDEX BUILD — `wineLine()`
composes from display minus producer whenever WINE is a bare colour/style
word (one quarterly-rebuild change; every consumer inherits); (b) fix in
the client normalizer only (no rebuild, but server `display` and client
disagree); (c) both, index as truth + client as belt. And the display
question that is yours alone: should such a hero read the full
appellation line ("Beaune Premier Cru, Clos des Mouches Rouge") even when
it runs long, or a shortened form ("Clos des Mouches Rouge")?

**C18 · The Orange/Dessert asymmetry.** Scans can never produce Orange or
Dessert (LWIN has no such categories — Gravner is White; Sauternes is
White + AOP), so scanned bottles miss those facets and dessert wines get
white-wine windows. Accept until S3 (whose style pass can classify
properly), or add a small derivation now (appellation → Dessert for
Sauternes/Tokaji/etc.) knowing it is a hand-kept list?

**C19 · The enrichment grain — is a "wine" vintage-aware?** The §3.3
cache and §3.4 `wines` table key by identity with `vintage_mode`; the
drink window is the one planned-generation section that is genuinely
per-vintage, and LWIN offers no help (FIRST/FINAL_VINTAGE ~empty).
Options: (a) cache rows per wine+vintage (simplest; multiplies unique-wine
counts and §4.2 costs by the vintages users actually add); (b) one row
per wine, window stored as RULES ("hold 4–20 years from vintage; NV: 2
from purchase") resolved against each bottle's vintage client-side —
story/tastes/pairings stay shared; (c) windows stay client-heuristic
forever, S3 only refines the tables. Interim clause while S3 is unbuilt:
should the window band HIDE when its inputs are scan-degraded (no grapes,
coerced NV — §3 R5), or keep rendering crude?

**C20 · Merchant rows (3,325 "(…)" producers).** The scoring preference
for the château proper is B-019's fix-round work. The DATA question:
when a merchant row is the genuinely correct match (a Berry Bros bottling
IS the bottle in hand), should the producer line render verbatim
("Berry Bros & Rudd (Chateau Suduiraut)"), normalize to the parenthesized
château, or show merchant-as-eyebrow, château-as-producer? Also §2.1's
supplement channel: unmatched merchant bottlings are candidates for the
periodic Liv-ex submission batch — worth stating in the plan?

**C21 · Food pairings — typed from birth.** D22 wants them
someday-filterable. Proposed shape for S3 to generate into: per wine,
`pairings_food: [{ dish: "roast chicken", tags: ["poultry","roast"] }]` —
free display text + a small controlled tag vocabulary (the filterable
half), living in `wines.facts` jsonb pre-S6 and a `wine_food_pairings`
table if filtering ever goes server-side. The curated POURS' `PAIRS WITH`
rows stay display-only legacy. Approve the shape (the tag vocabulary
would be a content-chat task), or park food pairings entirely until a
sprint owns them?

**C22 · The bottle-imagery verdict (§4).** Pick the road: A archetypes ·
B user photos (law amendment) · C hybrid · D paid feed (legal-gated) ·
E generated (authenticity-gated) — or a sequence (e.g. A now, C at S6,
re-open D only with telemetry). §4's table is the whole case; the
retention-law and §2.1 interactions are called out there. This is the
D22 workstream with no existing plan to check against — nothing proceeds
until this verdict.

---

*Cross-references: docs/component-audit.md (C10–C14; the surfaces and the
`wineView` normalizer every policy above lands in) · cellar-plan §2.1
(LWIN license + rejected vendors), §3.3–3.4 (cache + schema), §5.2 (D11
sparse law), §5.8 (telemetry), §6 S3/S4 · docs/bug-ledger.md B-010 B-015
B-018 B-019 · scraps/build-lwin-index.js (the index builder C17a would
touch) · scraps/golden-set/manifest.json (the fixtures that regression-gate
every pipeline-adjacent verdict here).*
