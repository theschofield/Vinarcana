# THE CELLAR — Implementation Plan

**v2 · Jul 15, 2026 · VERDICTS LOCKED (Ed, Jul 15) — active plan.** v1's conflict list is
resolved below in §0; the plan now includes the database + accounts architecture (Ed's C8
directive: think the whole thing from the start) and the phase/scale cost model. The canvas
package stays in claude-code-handoff/ until the sprint-6 canon closeout clears it.

This document expects to change hands. Every decision carries its reasoning; every sprint
ends with a scripted review Ed can run without a session; §8 logs the assumptions anyone
should re-question before building on them.

Hard product laws (non-negotiable, from the brief; restated so no hand loses them):
- The Cellar UI NEVER shows which cards/lenses a wine pairs with. Pairings surface only as
  the pip dot (Reading) and the cellar line + cellar-variant blurb (Pour) at draw time.
- Memory stays draws-only. Cellar-drank bottles never write Memory entries.
- Corrections are identity-level only; the user never hand-picks pairings.
- Count 0 retires the wine from rack AND pairing index (no archive).
- The label photo is kept only for manual + unmatched records.

---

## 0 · DECISION LOG

| # | date | decision (Ed) |
|---|---|---|
| D1 | Jul 15 | C1 approved: phone rack + detail are scroll owners on the Memory recipe; bottom fade only on desktop/wrapped. The canvas's fade is out-of-date thinking. |
| D2 | Jul 15 | C2 split: count sheet runs the A/B EXPERIMENT (Ed's transient bottom-anchored construction is the primary hypothesis — see §5.6); the match decision bar reuses the Pour action bar's exact locked construction (`--foot-vh` foot pin — the KEEP/FADE buttons' treatment). |
| D3 | Jul 15 | C3 superseded: NO custom camera. Native photo input (iOS chooser). The custom capture stage, framing corners, and on-lens serif line are retired for v1 (native UI can't be overlaid; revisit if the app ever wraps native). |
| D4 | Jul 15 | **Brief amendment A1:** photo library import is now ALLOWED (brief's "live in-app camera capture only" relaxed — the native chooser offers Take Photo / Photo Library). |
| D5 | Jul 15 | C4 approved: head + pills scroll away inside the rack's scroller (Memory pattern); desktop keeps the fixed head. |
| D6 | Jul 15 | C5 approved: story ships `text-wrap: wrap`. |
| D7 | Jul 15 | **Brief amendment A2 / canon update:** the cellar line is "IN YOUR CELLAR" — short, no count, singular/plural-free. Supersedes round-13's "ONE MATCH SLEEPS IN YOUR CELLAR". (The shipped mock already renders this string; design-decisions gets an appended verdict at sprint-6 closeout.) |
| D8 | Jul 15 | C7 approved: Vercel serverless functions in api/. Commercial use requires Vercel Pro ($20/mo) — budgeted in §4. |
| D9 | Jul 15 | C8 expanded: a real database + Google sign-in is IN SCOPE and designed from the start (§3.4). Sprint 6 builds it. |
| D10 | Jul 15 | C9 + meta: every sprint ships an ED REVIEW SCRIPT (exact steps to trigger what needs his eye); the plan stays meticulous, hands-off-able, and re-questions its own assumptions (§8). |
| D11 | Jul 15 | OQ4 correction adopted: NOTHING is generated before the user confirms identity. The match sheet shows database-known facts only (or cached enrichment once the shared DB exists). Generation runs post-confirm. |
| D12 | Jul 15 | Framework evolution is a design requirement: Ed will add/remove/re-sentiment lenses while real users hold live cellars and journals. §3.6 designs for it (stable lens ids, framework versioning, diff-scoped re-maps, fail-safe index, preview-branch testing, lens telemetry); the F-track carries the work. |
| D20 | Jul 17 | **E-A CONFIRMED (Ed's device verdict: "it feels good") — the experiment closes; S1 CLOSES; S2 opens.** The verdict + protocol numbers appended to design-decisions ("THE COUNT SHEET IS E-A"); E-B stays specified, never built; §8.4's assumption is resolved. Round-6 polish shipped with it: sheet foot pad 30→14px (Ed: ~16px too much under DONE); PULL-TO-DISMISS on the handled sheet (follows the finger past 10px vertical dominance, releases past 90px → slides out and CANCELS — scrim semantics; short pulls snap back); the rack head clears the status bar in EVERY mode via the doc formula (`max(24px, safe) + 52px` — the standalone/web-app home screen ran the canvas 26px and collided with the menu). **KNOWN ISSUE, PARKED by Ed:** a residual second movement on keyboard dismissal from the form's low fields survives D19 (small, non-disruptive; revisit in an S2+ polish pass). Sprint 2 kickoff written to docs/cellar-sprint2-kickoff.md — fresh sessions start there. |
| D19 | Jul 17 | **S1 round 5 — the double movement, convicted properly.** Round 4 deepened the form's CONTENT but not its LAYER: Safari's stranded keyboard scroll could still lift the layer's bottom edge above the fold (the darker band after the first settle — the tell that changed shade but survived). The form's layer alone now runs `100lvh + safe + 250px` (Ed's +150 prescription; end-rest already repays 250 + 100 = 350), and the blur glide settles the document AND the scroller's beyond-max over-scroll in ONE motion, preempting Safari's separate clamp animation entirely. Sim-verified: form layer overshoot 290px vs the rack's 140. Suite 8/8. |
| D18 | Jul 17 | **S1 device-pass round 4 (final polish; Ed: "everything else is fixed").** Form validation: every field REQUIRED except region — the CTA lights only when producer, wine, vintage, type, ≥1 grape, and country are filled. The double movement on blur-out of low fields convicted as Safari's keyboard-dismiss scroller clamp (content bottom above the fold after the viewport regrew): the FORM's doc-mode end-rest grows to 350px + safe (Ed's 150px option; rack/detail keep the recipe's 200). Type parity: the whole `.ca-field .v` value line joins the inputs at 16px (D15 had only bumped the inputs — committed values still rendered 14.5 and text shrank on commit); hint, typed, and committed text now differ only in color/opacity. Suite 8/8 re-verified. |
| D17 | Jul 17 | **S1 device-pass round 3 (Ed: "just about finished").** The Approach exit desync CONVICTED as a missing phase: flow6.css's deck-sink rule (`p-todeck/p-tomem .rx-deck`) never gained `p-tocellar` when the cellar road landed — the actor sank while the deck stood still; the phase joined the sink rule AND the actor-pin z-drop. The rack's return (cf-back) is a real entrance now — rise 26px + fade, 380ms (fade-only read as broken). The blur restore became a first-frame-clocked GLIDE 320ms after Safari's own settle (the instant scrollTo read as a harsh jump), and background taps in the form force-blur the focused input (iOS never blurs on non-interactive taps — the "stuck until the next field" bug). Sheet: the scrim reached DESKTOP (taps outside no longer fall through to rows) and a scrim tap now CANCELS — only DONE commits (supersedes D14's close-commits; at zero, Done retires). Picker hint unified: "TAP TO SELECT ONE". Memory ledger shadows softened by Ed's values (card 0 10px 18px -8px 0.25; bottle drop-shadow 0 7px 8px 0.25 — amends the memory-final canvas; light mode keeps the navy hue at the same geometry). Suite 8/8 re-verified. |
| D16 | Jul 17 | **S1 device-pass round 2.** THE FOCUS CONTRACT (supersedes D15's focus-time guards, which fought Safari and buried the vintage dropdown behind the chrome): while a field is focused, Safari's keyboard reveal OWNS the scroll — no assists, no guards; the document restores home only when focus leaves the form (blur-out, dropdown close, push away). THE PUSH went two-beat (the D15 version crossfaded): the outgoing screen completes its 300ms sink BEFORE the incoming one mounts and enters; returns fade the rack back in — the ✕-to-rack flash is gone. The exit-then-entrance doctrine is now a CLAUDE.md hard law (with the focus contract). Desktop: cld-wrap clearance 28→62px (Memory's own bump); bottles 100px with drop-shadow alpha 0.25 / blur 16px; count sheet width-capped 450px in every mode (supersedes D15's 1010px). Suite 8/8 re-verified. |
| D15 | Jul 17 | **S1 device-pass fixes (Ed's first device round; same day).** The zoom bug: iOS auto-zooms any focused input under 16px and strands the layout — viewport meta gains `maximum-scale=1` (accessibility pinch unaffected; iOS ignores the cap for user gestures) and form inputs go 16px (1.5px over canvas, only while editing). The focus-jump: selection moved from pointerdown to CLICK and the dropdown became an elevated OVERLAY (absolute, scrolls at ~3.5 rows, uncapped list — browsable; never pushes fields/CTA), so no layout can shift under a mid-air tap. Stray focus-reveal scroll: one-shot visualViewport-settled scroll-home guards (never a standing keeper). A11y: circled nav icons carry 46×46 extended targets (51px clear of the menu); chips are whole-chip remove targets. SET IT RIGHT nav is a circled back (a correction is a step deeper); the lists note line removed. Rack ⇄ detail ⇄ form gained push beats (outgoing sinks 300ms, incoming rises, returns fade back). Desktop/standalone: nav clears the menu in every mode (the canvas 18px assumed no live status bar); desktop rack gained its entrance; the count sheet is width-capped to the rack's 1010px. Dev affordance until S2's database: `?cellar-seed` populates 15 canvas-mock wines additively (`cellarSeedDemo`). Suite 8/8 + probe 5-step re-verified after the round. |
| D14 | Jul 17 | **S1 BUILT (this sprint's as-built log; Ed's device pass pending).** Shipped: cellar-lists.csv + mirror (`scraps/mirror-cellar-lists.js` → `cellar-data.js`, validated) · `cellar-store.js` (v1 envelope, MemoryStore-mirroring facade, IndexedDB sidecar, index-rebuild seam live from birth) · `flow6-cellar.jsx/css` (canvas cascade lifted verbatim; R1/R4 applied; screens per stage-construction §5 — see its Jul 17 addendum) · `toCellar()` roads + live CELLAR link + `__vaDrive.cellar` / `__vaCellar` drive hooks · analytics wired (`cellar_added`, `cellar_count{delta,zero,sheet}`, plus `cellar_viewed` on the deck/memory precedent — analytics.md updated; NOT an affinity signal). Verified: suite **8/8** in the sim (new T8; harness now loads `?va-off` — probe too) · band probe **5-step PASS** (cellar reach 140px ≥ 100, band 3.05 clean) · §5.6 E-A protocol in sim: **no lingering backdrop** (rest 3.05 → sheet 2.22 → 3.05 at close+0.5s, drift 0.0, sheet unmounted) — device eye decides · combobox flushSync focus confirmed in sim · dev-marked `cellar_added`/`cellar_count` rows accepted by the live sink. **App-level calls needing Ed's eye at review** (canvas had no board for them): the form gained a circled ✕ (cancel — canvas form had no exit); correction = the form in edit mode (title "Set it right.", CTA "Set it right"); the zero-undo is the SHEET itself (record dies on close; + before closing restores — no extra UI); empty-filter line "Nothing sleeping under those filters"; dup-add toast "ALREADY SLEEPING · NOW ×N"; single-select combobox note "Tap one to choose it · typing alone picks nothing"; unlisted grapes commit via an explicit Use-"…" row and never become facet pills (open-Q9 resolved); combobox narrowing is accent-blind; drink-window v0 renders the window inside a track spanning [from−4, to+2]. |
| D13 | Jul 17 | **Analytics substrate adopted** (shipped separately — canon: docs/analytics.md; read it before any telemetry work). ONE-CHANNEL LAW: every measurement in this plan rides `VAAnalytics.track()` → `api/track` → `va_events` — no parallel loggers, ever; events carry install/session/affinity so every metric joins to segments. Sequencing absorbed: the Supabase project exists NOW — S6 REUSES that project (`va_events` is its first table) and its old "create Supabase" task shrinks to schema + auth. §5.8 rewired; per-sprint event wiring in §6; laws in §8.12. **DONE Jul 17:** project `vin-arcana-base` live end-to-end, created via the Vercel MARKETPLACE integration — env vars auto-injected under Vercel's names (api/track already speaks them; no hand-set keys anywhere), the Jul 23 gate is cleared, and Ed's devices are `?va-off`. |

---

## 1 · RECONCILIATION — LOCKED RESOLUTIONS

**R1 · Rack + detail construction (was C1).** Phone rack and detail are SCROLL OWNERS on
the Memory ledger's recipe verbatim: layer `100lvh + safe + 100px`, scroller absolute
inset-0 / `pan-y` / `overscroll-behavior: contain` / 1px ballast, end rest `200px + safe`,
scroll-armed top fade spanning the menu band, mask-free bottom, tiles running behind the
chrome. New layer classes join the docflow pan-block `:not()` list. The canvas's 44px
bottom dissolve survives only in wrapped/desktop modes. Correction + form screens: same
recipe (they scroll); identify: a plain stage.

**R2 · Match decision bar (was C2b).** The Pour action bar's construction, reused exactly:
absolute child of the pan-eating layer, `top: calc(var(--foot-vh, 100svh) - 88px)`,
VisualViewport-tracked, never bottom-anchored; NOT QUITE gets the ghost treatment (backdrop
blur over scrolling content, the LET IT FADE recipe), THAT'S THE ONE the filled pill.
Factor the construction out of the Pour rather than duplicating it if practical. Band-probe
the match screen anyway (cheap insurance on a new host layer).

**R3 · Capture = native input (was C3; kills the feature's riskiest construction).**
The add affordance opens `<input type="file" accept="image/*">` — no `capture` attribute,
so iOS presents its native chooser (Take Photo / Photo Library / Choose File), honoring A1.
Zero custom camera surface: no getUserMedia, no poison-rule exposure, no camera stage to
band-probe, no permission-prompt UX to design. Client still: reads EXIF orientation,
downscales to ≤1280px longest edge on a canvas, JPEG q0.8 (~150–250KB) before upload.
The in-voice moment moves to the identify screen ("Making its acquaintance." — unchanged).
Design deltas for Ed's eye at sprint-2 start: the Cellar header's add affordance is now the
whole entry (one tap → native sheet); the retired "Show us the label." line and framing
corners are archived with the canvas, revisited only for a future native app.

**R4 · Story wrap (was C5).** `text-wrap: wrap` (never `pretty` on body, never `normal`
anywhere — parses invalid).

**R5 · Cellar line copy (was C6).** "IN YOUR CELLAR" — already what flow5-reveal renders;
no code change, one appended canon verdict at closeout.

**R6 · Backend seam (was C7).** api/ functions ship with the pipeline sprints. Answers to
Ed's follow-ups: **cost** — $0 on Hobby, but Vercel's terms require Pro ($20/mo/seat) the
moment the project is commercial; Pro includes 1TB fast data transfer, ~1,000 GB-hrs of
function compute, 300s max duration — orders of magnitude above cellar-pipeline needs at
launch scale (per-user adds are seconds of compute). **Phase-out horizon** — this stack
(static site + functions + managed Postgres) comfortably serves tens of thousands of MAU;
re-platforming triggers would be: long-running jobs beyond 300s, websocket/realtime needs
beyond Supabase's built-ins, egress bills at large scale, or organizational maturity. It's
a choice you'd make from strength, not a cliff — and nothing in this design (plain
Postgres, stateless functions, seam-wrapped stores) is a hostage.

**R7 · Photos + records (was C8).** Interim (sprints 1–5): records in localStorage
(versioned `va-cellar` envelope), photo blobs in IndexedDB behind the same store facade.
Endgame (sprint 6): Supabase Postgres + Storage per §3.4; kept photos live in Storage until
retired or until the wine later resolves to a match (Ed's OQ5 note: or a better image
exists in our database).

**Verified aligned (no action):** Instrument Sans already in the app font URL;
`rx-lens-dot` / `rv-cellar-line` / `rv-cellar-dot` shipped in round10/round13 CSS, rendered
today from mock flags the build replaces with live lookups; CELLAR status link stubbed
(flow2-app.jsx:64, flow6-deck.jsx:103); `toMemory()` (flow6-root.jsx:1091) is the road
template; cellar rows keep location-with-country (deliberately unlike Memory's sub-line).

---

## 2 · VENDORS + LICENSING

### 2.1 LWIN — the id scheme and match database (Ed's OQ1 deep-dive)

**Who and why it exists.** LWIN (Liv-ex Wine Identification Number) is published by
[Liv-ex](https://www.liv-ex.com/lwin/), the London fine-wine exchange. Their business is
the trading platform; LWIN is their interoperability play — a universal wine id so
merchants' systems speak one language. That's the "catch": there isn't one hiding in the
license; their incentive is adoption. The soft catch is COVERAGE BIAS — it's built from
fine-wine trade flows, so investment-grade and estate wines are deep, supermarket and
hyper-local bottles thinner.

**License — confirmed [CC BY 4.0](https://www.liv-ex.com/lwin/lwin-creative-commons/)
(Attribution 4.0).** Share and adapt "for any purpose, even commercially." Conditions:
credit Liv-ex, link the license, indicate changes; no endorsement implication; no
additional restrictions from Liv-ex; no warranties. **Selling the app changes nothing** —
commercial use is explicitly permitted. Our duty is one attribution line (About/footer:
"Wine identifiers from Liv-ex's LWIN database (CC BY 4.0), modified"). Build task: the
attribution ships the same sprint the index does.

**Ingest vs API.** It's a DOWNLOAD (registration + file, spreadsheet/CSV form), not a
metered API — we ingest it, transform it, and own our copy; $0 per lookup forever. Liv-ex
also sells paid services on top (Wine Matcher list-cleaning, integration APIs, an SLA'd
service tier) — we need none of them at this scale. Updates: re-download on a cadence
(quarterly is plenty; a build script re-generates our index; new LWINs only ever ADD).

**Data model.** Each record: the LWIN code + display name (producer, wine/cuvée) +
metadata (country, region, sub-region, colour, type, classification/designation). Codes
come in levels: **LWIN-7** identifies the WINE (producer + label — our
`identity.matchedId`); **LWIN-11** = LWIN-7 + vintage; LWIN-16/18 add bottle/pack size
(trade logistics; we ignore). It does NOT carry tasting notes, ABV, drink windows, stories,
or images — which is exactly why our enrichment layer exists, and why the enriched `wines`
table (§3.4) becomes OUR proprietary asset on top of the open identifier.

**Is it the standard?** Yes — that's its value. Wine-Searcher itself
[integrated LWIN codes](https://www.wine-searcher.com/m/2022/08/wine-searcher-integrates-lwin-wine-codes)
across its 15M-wine catalog; merchants and exchanges key on it. If we ever buy a commercial
data feed later, LWIN is the join key that makes our records line up with theirs — adopting
it now is what keeps every future door open.

**Filling the coverage gaps (Ed: "steadily supplement over time").** Three channels, no
wine photography required: (1) every manual+unmatched add IS a supplement — it becomes a
first-class row in our own `wines` table with our enrichment (users grow the catalog for
us); (2) Liv-ex accepts new-wine submissions — a periodic batch of our unmatched identities
can be submitted upstream so they mint real LWINs; (3) if telemetry someday shows a
category hole worth money (e.g. US grocery wines), THAT's when a commercial feed
conversation happens — with match-rate data in hand and LWIN as the join key.

**The rejection rubric (Ed asked).** Candidates were scored on: cost per lookup · license
cleanliness for commercial use · reliability as a dependency · data richness · integration
effort. **Wine-Searcher official API** — richest data (prices, scores, even label
recognition) but enterprise-gated pricing (historically hundreds/month), sales process, and
we'd be renting what LWIN + our enrichment gives us to own. Rejected on cost + ownership;
revisit only with telemetry proving need. **Apify-style scrapers** of
Wine-Searcher/Vivino (~$0.025/wine or ~$1.2–1.8 per 1k) — violate or skirt the sites'
terms, break silently when markup changes, and are indefensible dependencies for a
registered business. Rejected on license + reliability, hard. **Vivino directly** — no
public API at all; only scrapers. Same rejection.

### 2.2 Vision extraction (Ed's OQ2, plainly)

**Why "no OCR vendor" and what it costs.** OCR (e.g. Google Cloud Vision, ~$0.0015/image)
is 10× cheaper *per call* than Claude reading the photo (~$0.016) — but OCR only returns
raw text ("TYRRELL'S VAT 1 HUNTER SEMILLON 2014 750ML..."), which still needs a second,
LLM call to structure into producer/wine/vintage fields. Two hops, similar total cost,
and worse results: wine labels are stylized, multilingual, and contextual (is "Reserve"
part of the name?) — a vision LLM reads them the way a person does. At two cents a scan
there is nothing worth optimizing. **Local model?** Not practical in Safari — capable
vision models are gigabytes; browsers can't reasonably ship or run them for this. **RAG?**
Different tool — RAG is retrieving reference text to help an LLM answer; our lookup step IS
a retrieval (the LWIN index) and it's already free and instant. The LLM is only doing the
one thing it's uniquely good at: reading the picture.

**Image lifecycle (no temporary partition needed).** The photo goes: your camera → the
browser's memory → downscaled on a canvas → sent inside the API request → answered →
gone. Our functions are *stateless* — they have no disk of their own; nothing is written
server-side, so there's nothing to clean up. The only copies that persist: (a) on YOUR
device (IndexedDB) when the record is manual+unmatched, deleted on retire or later match;
(b) with accounts, that same photo moves to Supabase Storage under your user id, same
lifecycle. One honest footnote: Anthropic retains API inputs ~30 days under its standard
policy (not visible to anyone else, not used for training under API terms) — a line for
the eventual privacy note.

**Terminology bridge (for whoever reads this next):** "stateless function" = a small
program that wakes up per request, does its work, and forgets everything; "IndexedDB" =
the browser's bigger, quieter cousin of localStorage, right for binary blobs like photos.

### 2.3 Models
Default **Opus 4.8** ($5/$25 per MTok) on every generation stage — the blurbs face the
voice lint and the mapping must be tasteful; totals are cents (§4). **Sonnet 5** ($3/$15;
intro $2/$10 through Aug 2026) is the sanctioned cost lever, per-stage, via env config.
Haiku only ever considered for extraction, only with golden-set proof. Bulk re-runs ride
the **Batch API at 50%**.

---

## 3 · ARCHITECTURE

### 3.1 The client (laws unchanged)
Everything in §1: cellar screens are scroll owners/stages per the recipe; membership rule
audited; images decode-gated; `__vaDrive.cellar` hooks for the suite/probe; suite grows T8;
the probe grows a cellar step with the rect-arithmetic reach gate. Files:
`explorations/flow6-cellar.jsx`, `flow6-cellar.css`, `cellar-store.js`,
`cellar-data.js` (mirrored), namespaced by journey per the collision lesson.

### 3.2 The functions (api/)
- `api/cellar-extract.js` — downscaled label photo in → `{fields, confidence, rawReading}`.
- `api/cellar-resolve.js` — query terms in → ranked LWIN candidates + match score. SQLite
  FTS index bundled in the function (built by `scraps/build-lwin-index.js` from the LWIN
  download; wines only, normalized strings). No LLM in the common path.
- `api/cellar-settle.js` — confirmed identity in → `{facts, story, window, tastes, stats,
  pairings[+blurbs], lintReport}`, sections independently statused so partial success
  lands. Runs ONLY post-confirm (D11).
- Bundled privately (never static-served — post-deploy check that api/ paths 404 as plain
  fetches): the LWIN index, the distilled mapping table (from content/lenses.csv), voice
  lint lists, blurb prompt scaffolding, drink-window heuristic table.
- Guardrails (the endpoint is public): same-origin allowlist, per-IP token bucket
  (~10 adds/hour), global daily budget counter (env), `CELLAR_PIPELINE_DISABLED=1` hard
  kill-switch → the app degrades to manual-only, which ships usable by design.

### 3.3 The shared enrichment cache — the economic keystone
One global `wines` table (§3.4): the FIRST time any user adds a given wine, the pipeline
runs once and the result is stored globally; every subsequent add of that wine — by anyone,
forever — is a free database read. **Cost scales with unique wines, not with users.** This
single decision is what makes the feature affordable at every scale in §4, what makes rich
match sheets free once a wine is known (D11), and what turns user activity into a
proprietary data asset compounding on top of the open LWIN layer. Pre-accounts (sprints
2–5) each device pays for its own adds (~$0.10; acceptable at personal scale); sprint 6
turns the cache on retroactively (local records upload their enrichment on first sync).

### 3.4 Database + accounts (D9 — designed now, built in sprint 6)

**Requirements:** Google sign-in; per-user cellars (and later journals) across devices;
the global wines cache; photo storage; works with THIS app (no build step, React UMD,
static deploy); solo-maintainable; hostage-free.

**Options considered — Ed's pros/cons walk:**

| option | what it is | pros | cons |
|---|---|---|---|
| **Supabase** (recommended) | Managed Postgres + Auth + file Storage + auto APIs, one vendor | Google OAuth built-in; vanilla `supabase-js` works from a plain `<script>` (fits our no-build app); row-level security = per-user data rules enforced in the DB, not in code we write; photos live in the same vendor; it's REAL Postgres underneath (standard SQL, exportable any day — no hostage); free tier covers dev + early users (500MB DB, 50k monthly auth users, 1GB storage); [Pro $25/mo](https://supabase.com/pricing) (8GB DB, 100GB storage) when real | free-tier projects pause after ~7 idle days (fine — we'd be on Pro before real users); row-level-security rules are a small learning curve; one more dashboard to own |
| Firebase (Google) | NoSQL document DB + Auth | most battle-tested vanilla SDK; generous free tier; Google-native sign-in | NoSQL fits our relational shape poorly (users↔cellars↔wines↔pairings + future analytics really want SQL joins); pricing at scale is famously hard to predict; deepest vendor lock of the set |
| Neon/Vercel Postgres + Clerk (auth) | composable pieces inside Vercel | stays in one deploy platform; Clerk's auth UX is excellent | auth, DB, and file storage become three vendors/bills; more glue code is ours to write and maintain; no bundled storage |
| Self-hosted (VPS + Postgres + own OAuth) | maximum control | cheapest at huge scale | an ops job (backups, patches, auth security) — wrong trade for a solo founder-designer; revisit at re-platforming scale (R6) |

**Recommendation: Supabase.** One vendor covers all four needs, speaks to our no-build
constraint, and the exit path (it's plain Postgres) satisfies the hostage test.

**Schema (v1 — written now so every sprint builds toward it):**
- `wines` — global cache. `id` uuid, `lwin7` nullable, normalized identity (producer,
  wine, vintage_mode), `facts` jsonb, `story` text, `tastes` jsonb, `window` jsonb,
  `stats` jsonb, `enrichment_status`, `lint_report` jsonb, timestamps. Client: read-only;
  writes only via functions (service role).
- `wine_pairings` — global, the hidden engine's output. `wine_id`, `card`, `lens_id`
  (STABLE id, never the display numeral — §3.6), `level` (exact/producer/archetype),
  `pour_index`, `blurb`, `blurb_status`, `mapped_against` (framework version, §3.6).
  Served to a client ONLY for wines that client owns (pips must work offline+instantly, so
  owned-wine pairings sync down; the SYSTEM-wide mapping table never leaves the server —
  per-wine results are soft-secret, same exposure as today's localStorage, accepted and
  logged in §8).
- `cellars` — per-user rows. `user_id`, `wine_id`, `count`, `added_ts`, `source`
  (matched/manual), manual identity fields when unmatched, `label_photo_path` (Storage).
  Row-level security: owner-only.
- `profiles` — auth mirror (display name, created).
- `va_events` — ALREADY LIVE (D13, analytics substrate): the one telemetry channel.
  Cellar events land here from S1 on; there is no separate `telemetry` table. Additive-only
  schema (analytics.md law). RLS enabled with NO policies — service-key writes via
  api/track only. That no-policy stance is `va_events`-SPECIFIC: the user tables above
  (`cellars`, `profiles`) keep owner-only RLS policies; never generalize one to the other.
- `va_installs` — S6 addition: `install_id` (pk) ↔ `user_id`, `linked_at`, written once at
  first sign-in, so retention series survive device changes (analysis LEFT JOINs it;
  additive, never touches va_events rows).
- Future, same pattern: `memories` (the journal crosses devices — NOT in cellar scope,
  noted so the schema doesn't paint over it).

**Sync model — local-first.** The app works signed-OUT forever (localStorage/IndexedDB,
exactly as sprints 1–5 build it). Signing in: one-time merge of the local cellar up
(dedupe by identity), then the local store becomes a cache of the server truth — writes go
local-first (instant UI), a sync layer pushes/pulls in the background (last-write-wins per
record at v1; counts included — honest simplification, logged in §8). Offline keeps
working by construction. The `CellarStore`/`MemoryStore` facades are untouched from the
views' side — sprint 6 swaps their internals; that is the entire reason the seams exist.

**Auth flow in a no-build app:** `supabase-js` UMD from CDN (SRI-pinned like React);
"Continue with Google" → OAuth redirect → session persisted by the library; the status
area gains the smallest possible signed-in affordance (design moment for Ed —
deliberately NOT in cellar sprint scope until sprint 6's design pass).

### 3.5 Draw-time surfacing (unchanged from v1, copy per D7)
Pips from the local pairing index (owned wines only, count≥1 enforced at build); the Pour's
matched pane gets "IN YOUR CELLAR" + dot + cellar-variant blurb (or canon-line fallback);
exact > producer > archetype when several owned wines hit one lens, newest add breaks ties.

### 3.6 FRAMEWORK EVOLUTION (D12) — the content keeps moving under live users

Ed will refine the pairing methodology continuously: new lenses, retired lenses, lenses
whose sentiment/metaphor changes. Meanwhile real users hold journals (Memory) and cellars
(pairings + blurbs) computed against the OLD framework. Five moves make this safe by
construction rather than by cleanup:

**(1) Stable lens identity — the keystone.** Today a lens is identified by its display
numeral ("I".."V") within a card — POSITIONAL identity, which silently re-points everything
the moment a lens is inserted, removed, or reordered. Fix at the source:
`content/lenses.csv` gains a `lens_id` column — a durable slug (e.g. `moon-beautiful-lie`),
append-only, never reused even after retirement; the numeral becomes a DERIVED display
attribute (row order). The mirror pipeline carries ids into `arcana-data.js`; POURS keys by
lens_id; every pairing row is born id-keyed. Renaming a lens's words keeps its id; only a
genuinely *different sentiment* mints a new id and retires the old (Ed's editorial call,
and the changelog makes it explicit).
- **Latent fragility found in the shipped app:** MEMORY entries store the lens *numeral*
  (for faithful Pour re-entry). Before any reorder ever happens, a one-time backfill maps
  each existing entry's numeral → lens_id under the CURRENT ordering (safe today,
  impossible after a reorder). New entries store lens_id. Re-entry resolution order:
  lens_id → (missing? the entry's wine matched against current POURS) → pane 0. Old
  journals never break; at worst they land gracefully.

**(2) Framework versioning.** `scraps/build-mapping-table.js` (the lenses.csv → function
artifact step) stamps a monotonic `framework_version` and emits a CHANGELOG diff vs the
previous artifact: `{added: [lens_ids], removed: [...], changed: [...]}` (changed = the
`wine_mapping_idea` text moved). The client manifest (in arcana-data) carries
`{version, changedSince: {...}}`; every pairing carries `mapped_against`.

**(3) Fail-safe index — wrong pips are impossible by construction.** The pairing index is
built against CURRENT content: pairings whose lens_id no longer exists are dropped at
build (a retired lens can never pip), and pairings whose lens_id is in the manifest's
changed-set with `mapped_against < version` are SUPPRESSED until re-mapped (a
changed-sentiment lens shows a quiet gap, never a stale nudge). Add > remove > change all
degrade to silence, the product's safe state.

**(4) Diff-scoped re-mapping — evolution priced in cents.** On framework change, a re-map
job (function endpoint, service-triggered) re-scores affected wines against ONLY the
diff's lens ideas: changed/added lenses need scoring across wines; removed lenses just
delete rows; blurbs regenerate only for changed/added pairings. Post-S6 this runs ONCE
globally over unique wines (Batch API, 50%); pre-S6 each client detects
`mapped_against < version` on its own wines and silently re-settles them (small N).
Indicative costs: tweak 3 lenses with 1,000 unique wines cached ≈ **$10–25 batch**;
add one new lens ≈ similar; a full framework overhaul ≈ the original mapping cost
(~$35/1k wines, batch). Ed can iterate weekly without thinking about the bill.

**(5) Test-before-rollout + learn-after: the branch workflow and lens telemetry.**
- **Branch → preview → merge:** content edits happen on a git branch; Vercel builds a
  private PREVIEW deployment automatically (same functions, new mapping artifact, budget
  guardrails apply there too). Ed feels the new lenses in the real app at a preview URL
  before anyone else sees them; merge to main IS the rollout, and the re-map job runs on
  deploy. No parallel user-facing A/B in v1 (two live frameworks would double the content
  surface) — logged as a future option in §8.
- **Lens telemetry — the real-user signal Ed is testing FOR:** per-lens draw→pick rates,
  keep rates per pour, pip-follow-throughs, cellar-line views — as VAAnalytics events
  through the one channel (D13), so the methodology dashboard is a SQL query over
  `va_events` joined to install + affinity segment. Every lens event carries `lens_id`
  (metrics survive renames) AND `fv` (framework_version — so pre/post-edit cohorts split
  cleanly without timestamp archaeology; the D12 contract made queryable). The existing
  `pour_viewed {card, lens}` / `memory_saved` events already cover part of this; S4 adds
  only what's missing (§6). Reviewed at the §5.8 checkpoints. This closes the loop: users
  react → the dashboard shows which metaphors land → Ed edits the CSV → branch → preview →
  merge → diff re-map. The whole cycle is an afternoon, most of it Ed writing.

**Pipeline hardening that rides along:** the mirror/build scripts VALIDATE before any
deploy — duplicate or reused lens_ids, a lens with no pours, name over the ~26-char scale
limit, a card outside its 4–5 lens bounds — failing loudly at build time, never on a
user's screen.

---

## 4 · COST MODEL (Ed's directive: per phase, then per scale)

Unit economics (Opus 4.8; Sonnet 5 ≈ ×0.6, intro ≈ ×0.4): extract ~$0.016 · resolve $0 ·
enrich ~$0.019 · map ~$0.033 · blurbs ~$0.035 → **≈ $0.10 per unique wine**, ~$0.09 per
correction re-run, **$0 per draw** (draws never touch the pipeline — pips are local).

### 4.1 Per phase (what Ed sets up, what it costs)

| phase | new accounts/services | fixed cost | variable cost |
|---|---|---|---|
| S1 rack (manual) | none | $0 | $0 |
| S2 capture+identify | Anthropic API key (pay-as-you-go); Vercel functions on the existing project; LWIN download (free registration) | $0 on Hobby — **$20/mo Vercel Pro required once commercial** | ~$0.02/scan (extract; resolve is free) |
| S3 enrichment | — | — | +~$0.02/confirmed wine |
| S4 pairing pass | — | — | +~$0.07/confirmed wine (map+blurbs) |
| S5 hardening | — | — | telemetry-driven retune, cents |
| S6 accounts+DB | Google Cloud OAuth app (free); Supabase project ALREADY EXISTS (created for analytics, D13) | $0 dev → **$25/mo Supabase Pro** with real users | negligible (reads); pipeline costs now amortize globally via the cache |
| later, optional | domain ~$12/yr; Apple Developer $99/yr (only if iOS wrapper) | | |

**Steady-state commercial floor: ~$45/mo** (Vercel Pro + Supabase Pro) + LLM usage.

### 4.2 Per scale (projections — assumptions in §8; "cumulative" = one-time enrichment
spend that the shared cache never re-pays)

| scale | unique wines enriched (est.) | cumulative LLM | monthly infra |
|---|---|---|---|
| Ed alone | ~30–50 | **$3–5** | $0 (Hobby, pre-commercial) |
| 100 users | ~900 (15 bottles avg, ~40% overlap) | **~$90** | ~$45 |
| 1,000 users | ~8–10k | **~$800–1,000** | $45–100 (watch bandwidth: the card art is the heavy asset, ~1TB Pro allowance ≈ 15–30k fresh full-asset sessions/mo; an image-optimization pass is the cheap fix before overages at $0.15/GB) |
| 10,000 users | ~30–50k | **~$3–5k** (amortized over the growth that caused it) | $150–400 (bandwidth + Supabase compute) |

### 4.3 The "$20k to ingest 200k wines" question — corrected and reframed
**You never need to pre-pay for the catalog.** Ingesting LWIN itself (identities) is FREE —
download, build index, done; that's sprint 2. The $20k intuition maps to something
different: pre-ENRICHING all 200k wines (stories, tastes, pairings, blurbs) at ~$0.10 each
= ~$20k synchronous Opus — or **~$10k via Batch API (50%), ~$4–6k on Sonnet 5 batch**.
Three strategies, in order of sense:
1. **Lazy (default, $0 upfront):** wines enrich on first add; the shared cache makes each a
   one-time global cost. The catalog funds itself in proportion to actual use.
2. **Curated pre-warm (~$250–500):** batch-enrich ~5k most-likely bottles (framework wines,
   top producers per region, Ed's own cellar). Buys rich instant match sheets for the
   majority of real-world adds. The right move around sprint 6/launch.
3. **Full catalog (~$4–10k, batch):** a marketing-grade moat ("every wine already has its
   story"), not a technical need. A business-plan line item, not an engineering one.

---

## 5 · DATA + GENERATION DESIGN

### 5.1 CellarStore (interim, sprints 1–5)
`va-cellar` = `{v: 1, wines: []}` envelope (versioned from birth — the version stamp lets
future format changes migrate old data instead of corrupting it; with sprint 6 this
formalizes into DB migrations). API mirrors MemoryStore (all/add/update/remove/count) +
`pairingsFor`. IndexedDB sidecar `va-cellar-photos` behind the facade. Record shape: the
brief's, verbatim (see §3.4 for its DB descendant). Duplicate add = identity match →
count++, zero pipeline. Retire = hard delete; the one-breath undo holds the record in
memory until the sheet closes.

### 5.2 The match sheet shows only what is KNOWN (D11)
Pre-confirm, the sheet renders: identity (producer / wine / vintage), LWIN facts (region,
country, colour/classification), and the heuristic window word — all $0. Story, scales,
and stat rows appear pre-confirm ONLY when the shared cache already holds them (post-S6,
increasingly common). First-ever adds get the sparse sheet; enrichment runs after THAT'S
THE ONE, in the settling row. **UI consequence for Ed's sprint-2 review:** the CfMatch
board's story/stats region needs a sparse variant — likely the 4-line stack + window +
"its story arrives once it settles in"-class quiet line (copy TBD in voice).

### 5.3 Mapping (the hidden pass)
Distilled lens table (card, lens_no, lens_name, wine_mapping_idea — from
content/lenses.csv) lives in the function bundle. Levels exact > producer > archetype;
threshold + cap-6 enforced in CODE (tunable without prompt surgery); picks `pour_index`.
Golden-set calibrated before it ever lights a pip (§6 S4).

### 5.4 Voice gates
Lint is code, not LLM: em-dash ban; banned-word list (voice-prompt.md verbatim); no "you"
in spirit-register blurbs; negation-contrast pivots; length caps (blurb ≤ ~220 chars,
story 2–4 sentences); no emphasis markup. One retry with the lint report; then fallback =
approved generic pour blurb + "IN YOUR CELLAR" line (always safe). Story failure →
stats-only detail. Every fallback logged.

### 5.5 Settling, failure, regeneration
Confirm → row lands instantly (identity + facts, shimmer + SETTLING IN) → settle runs
async, sections land as they arrive. Failure: row stays fully usable; silent retry ×3 with
backoff, then daily on app open (attempts on the record). Correction (identity-level only)
→ invalidate + re-run on the flow's CONFIRM only; identical identity = no-op; soft cap 5
regenerations/bottle/day. Count changes never touch the pipeline.

### 5.6 THE COUNT-SHEET EXPERIMENT (D2 — Ed's construction is hypothesis A)
- **E-A (primary, Ed's):** transient sheet, genuinely bottom-anchored, mounted on count
  tap, unmounted after the close animation completes — nothing carries `bottom:` at rest.
  Hypothesis: Safari's chrome behavior is *desirable* here (the sheet feels like it extends
  under the chrome, no dead slug needed), and any backdrop the anchor summons is invisible
  behind the sheet+scrim and evaporates with the unmount.
- **E-B (fallback, canon-safe):** top-referenced slab (`--foot-vh`) whose body fills down
  through the layer's overshoot; identical visuals above the fold.
- **Protocol:** build E-A first. Band-probe: sheet open 5s (measure), close (measure decay
  over the next 2s), plus the resting rack before/after. Sim first, then THE DECIDING
  EVIDENCE IS ED'S DEVICE EYE (chrome-settle behavior and the slide-under feel are
  device-only). If E-A leaves any lingering backdrop after unmount, E-B ships and E-A goes
  on the dead-ends list with its measurements. Either way the verdict is appended to
  design-decisions.
- Why this respects the canon: the poison rule's convictions were all PERSISTENT
  bottom-anchored elements; a strictly-transient one is genuinely untested territory, and
  Ed's constructions have out-predicted the sim before (§8).

### 5.7 Pairing index (Ed's OQ7, plainly)
No scanning, ever. Whenever cellar contents change (add, retire, count to/from 0), we
rebuild a small lookup table — think phone book: "moon:III → [vat1]". It persists with the
store and loads with the app. At draw time the Reading asks the phone book once per card;
the Pour once per lens. "O(1)" just means: same instant answer whether you own 3 wines or
300. Opening the Cellar doesn't touch pips at all; only *changing* it does.

### 5.8 Telemetry + tuning cycles (Ed's OQ3: never stuck) — one channel (D13)
The confidence threshold is a config value, not a commitment. Every identify emits ONE
VAAnalytics event — `cellar_identify {conf, match, route, outcome}` (floats + enums only)
— through the same outbox/sink as everything else, so threshold tuning is a SQL query over
`va_events` and results join to install/segment for free. PROPS HYGIENE LAW: no free text
from the extraction pipeline ever enters analytics props — `rawReading`, guessed names on
misses, and photo-derived fields stay on the local record only (`wine` appears in events
solely once identity is user-confirmed, via `cellar_added`, matching the shipped
`memory_saved` precedent). api/track's guards (pattern-validated names, 12-key/120-char
prop caps) back this up mechanically, but the law is ours.
Scheduled checkpoints: end of S2 (first ~20 real scans — sanity), S5 (formal tune against
logged pairs + the COHORT READOUT: the D1/D7/D30-per-affinity query from analytics.md,
plus an outbox-health check — event volume vs expected, dedupe ratio, `not dev` filter
discipline), then monthly glances. The golden set (fixed label photos + expected
identities; framework bottles that MUST map; non-matches that MUST stay silent) re-runs
whenever a prompt or model changes — a regression harness for judgment; its runs self-mark
`dev` so they never pollute cohort data.

---

## 6 · SPRINTS

Universal duties every sprint (CLAUDE.md): choreo-tests green (7/7 → 8/8 from S1),
backdrop-probe for anything touching viewport-adjacent construction, sim suite
necessary-never-sufficient, Ed's device pass final. Suite/probe steps that seed `va-cellar`
restore it (runs against the live site). Every sprint ends by updating THIS DOC's decision
log + assumptions (§8) — the housekeeping D10 demands.

### S1 — The rack, manual-only (no server, no vendor; starts immediately)
Build: cellar-lists.csv + mirror script → cellar-data.js · cellar-store.js (envelope,
facade, IndexedDB sidecar, index stub) · flow6-cellar.jsx/css with canvas values lifted
verbatim then R1/R4 applied · `toCellar()` roads + live status link + `__vaDrive.cellar` ·
rack (cl2 tiles: bottle 100px, 4-line stack, count chip; READY silent / RESTING dim /
DRINK SOON hollow amber) · count sheet E-A + experiment protocol (§5.6) · filters
(AND-combine, restated count line, quiet empty-result) · empty state · detail rendering
sparse records · manual form + combobox (flushSync focus-in-tap; field scrollIntoView) ·
desktop rack · drink-window heuristic v0 client-side · ANALYTICS (D13): wire the reserved
`cellar_added {wine, method: "form"}` at the manual-add commit (via the vaTrack guard
pattern — analytics missing must cost the cellar nothing) + `cellar_count {delta, zero,
sheet}` on stepper confirms, `sheet` stamping which construction served it (E-A/E-B) so if
the experiment ever runs across the cohort, usage data self-describes its arm.
Verification: suite T8 (scrolled rack ride — THE DOCUMENT NEVER MOVES; store seeded +
restored) · probe cellar step (tiles in the band + reach gate ≥100px) · count-sheet
experiment measurements (band-probe numbers — dev-side evidence, NOT analytics events; the
two must never be conflated) · sim keyboard pass · a `cellar_added` row visible in
va_events (dev-marked) · the suite harness gains an analytics-off preamble (sets
`va-an-off` before driving — harness runs against the LIVE site must never mint cohort
installs; same discipline as seed-and-restore).
**Ed review script:** phone, live deploy → CELLAR from Approach (watch the road) → add 3
wines via form, one a blend (chips) and one with an "other" grape → filter RED + READY NOW
→ tap a count, sit 10s watching the bottom chrome, +1, confirm, watch the slide-under →
count another to 0, catch the one-breath undo, let it die → open detail, SET IT RIGHT,
change vintage, confirm → day mode sweep → desktop glance. Also: deliberately scroll the
rack hard and flick — the document must never move.

### S2 — Capture + identify
Build: api/ scaffolding + guardrails + budget env + kill-switch — quotas keyed
PER-INSTALL (the client sends its analytics install id with pipeline calls; IP bucket
stays as the backstop for id-less abuse). This is deliberate business-plan shaping (§4.1
free tier: "one taste of each scan type"): today's quota seam IS tomorrow's entitlement
meter, and per-install cost telemetry joins to segments · build-lwin-index.js
(download, filter to wines, normalize, SQLite FTS; ATTRIBUTION line ships now) ·
cellar-extract + cellar-resolve · native photo input (R3: EXIF orientation, canvas
downscale, JPEG) · identify stage (serif line, three mono stages, hanging dot, cancel =
abandon+discard) · match sheet SPARSE variant (§5.2) with decision bar per R2 · correction
screen (manual first, runner-ups, "THE LABEL READ · …") · duplicate prompt → count++ ·
records land identity-only + shimmer · photo retention law enforced (IndexedDB,
manual+unmatched only, decode-gated strip) · ANALYTICS (D13): `cellar_identify` per §5.8
(one channel — no parallel logger) + `cellar_added {method: "photo"}` at confirm.
Verification: band probe (match screen + decision bar) · suite membership audit on new
layers · post-deploy static-404 check on api/ internals · identify events flowing through
va_events (dev-marked; §5.8 checkpoint 1 reads them) · golden set v0 (Ed photographs ~10
of his actual bottles as the first fixtures).
**Ed review script:** add a bottle by camera; add one from library (A1!); force a miss
(obscure bottle) → correction screen → manual; add the same wine twice → duplicate prompt;
airplane-mode an add attempt → the honest line; kill-switch drill (I flip the env var, you
add — manual path must feel whole). Review the sparse match sheet against your taste —
this is the D11 UI delta.

### F-track — framework evolution hardening (D12; parallel to S2, MUST land before S4)
Content-pipeline work, independent of the cellar screens — runs alongside S2:
`lens_id` column in content/lenses.csv (append-only slugs; numerals become derived) ·
mirror scripts carry ids + VALIDATE (dupe/reused ids, poursless lens, name length, lens
count bounds — fail at build) · POURS re-keyed by lens_id (numeral kept as display) ·
Memory backfill migration (numeral → lens_id under current ordering; re-entry resolution
lens_id → wine-match → pane 0) · `build-mapping-table.js` stamps framework_version + emits
the changelog diff · client manifest carries {version, changedSince}.
Verification: mirror validation battery (each failure mode fires) · Memory re-entry drill
(an entry with a deliberately-retired id lands gracefully) · suite unchanged-green (the
backfill must be invisible to T7).
**Ed review script:** none needed on device — but ONE editorial dry run with me: rename a
lens (id survives), re-sentiment a lens (new id minted, old retired), reorder two lenses,
and watch the validator + changelog narrate exactly what changed. This is the workflow
you'll live in; it should feel like yours before S4 builds on it.

### S3 — Enrichment
Build: cellar-settle part 1 (facts, story+lint, window server-side w/ LWIN override,
tastes, stats) · client settle loop (sections land async; failure keeps row usable; retry
×3 + daily) · correction → regeneration (debounce, no-op on identical, daily cap 5) ·
detail complete (story, stats, scales, window+NOW tick).
Verification: lint unit battery (fixtures: em-dash, "you", banned words, length, pivot
patterns) · pipeline-failure drill (revoke key → settle degrades, retries recover) ·
regeneration idempotence test.
**Ed review script:** add Vat 1 → read its story out loud (the informative register vs the
spirit's voice — your ear is the gate) · window words across a young rosé, an NV
champagne, an aged Barolo · correct an identity and confirm exactly one regeneration ·
try to trigger a second regeneration inside a minute (should no-op).

### S4 — The hidden pairing pass
Build: distilled mapping table artifact (id-keyed, versioned — F-track's output) ·
cellar-settle part 2 (map + blurbs + lint + fallback; pairings born with lens_id +
mapped_against) · pairing index live WITH the §3.6 fail-safe rules (unknown ids dropped,
changed-and-stale suppressed) · draw-time wiring (pips, "IN YOUR CELLAR" + dot on
pour_index pane, blurb swap; mock flags retired) · count-0 un-pips · client-side diff
re-settle (pre-S6 lazy re-map of own wines on version drift) · ANALYTICS (D13): lens
telemetry as VAAnalytics events, not counters — add `lens_id` + `fv` props to the existing
`pour_viewed`/`ritual_complete` calls (additive; the analytics hook already fires at those
phases) plus new `pip_shown {card, lens_id, fv}` and `pip_followed {card, lens_id, fv}`
(pip visible on the picked lens) — the §3.6 methodology dashboard becomes SQL over
va_events · lint fallbacks emit `cellar_lint_fallback {stage: story·blurb}` client-side
when the settle response reports one (api/track stays the only ingest path — functions
never write analytics directly).
Verification: golden-set calibration BEFORE any pip ships (framework bottles hit exact;
plausible archetypes land; non-matches stay silent; sparsity cap holds) · suite pip
assertion w/ seeded+restored store · fallback-rate counter live.
**Ed review script:** with Vat 1 at count ≥1: draw the Moon → III pips (and ONLY sensible
lenses pip) → pick III → the Pour speaks to YOUR bottle → set count 0 → redraw → silent.
Then the taste test: 5 draws across your real cellar — every pip should feel earned; any
pip that makes you squint gets logged against the threshold.

### S5 — Hardening
Build: budget drills end-to-end · photo-retention audit · offline pass · telemetry review +
threshold tune (checkpoint 2, now per §5.8: includes the cohort D1/D7/D30-per-affinity
readout and the outbox-health check) · day-mode QA sweep · desktop polish · perf glance
(settling shimmer while scrolling — the C9 note).
**Ed review script:** one week of real use, plus: airplane-mode cellar session; the
kill-switch flip; a deliberately blurry label photo; your ugliest handwriting-label natural
wine.

### S6 — Accounts + database (D9)
Build: cellar schema + RLS in the EXISTING Supabase project (D13 — the project is already
live carrying va_events; S6 adds tables, never recreates) · Google OAuth app + supabase-js
(SRI CDN) ·
sign-in affordance (DESIGN PASS WITH ED FIRST — the status area changes) · local→server
one-time merge (dedupe by identity) · local-first sync layer inside the store facades ·
shared wines cache live (settle writes global; adds check cache before pipeline;
retroactive upload of local enrichments) · photos → Storage w/ lifecycle · the
install↔user join: `va_installs` written at first sign-in (D13 — "telemetry → table" is
already satisfied by va_events; THIS is S6's remaining analytics job, so retention series
survive device changes; linking anonymous history to an identity is also the moment the
public-launch privacy-policy task becomes non-optional — flagged, not solved here) · rich
match sheets from cache · curated pre-warm batch (strategy 2, ~$250–500,
Ed's go) · the GLOBAL diff re-map job (framework change → one batch pass over unique
wines; retires the pre-S6 per-client re-settle) · the methodology dashboard formalized: a
saved SQL query set over va_events (lens picks/keeps/pip-follows by lens_id + fv +
segment — the data has been flowing since S4; S6 just gives Ed the queries) · canon
closeout: design-decisions verdicts appended (E-A/E-B outcome, A1, A2, D-series),
stage-construction addendum if any new law emerged, station cleared, this plan stamped
as-built.
Verification: RLS probe (user A cannot read user B — scripted) · sync conflict drill (two
devices, same wine, offline edits) · merge idempotence · full battery (suite, probe, sim,
device).
**Ed review script:** sign in on phone + desktop → cellars converge → add on one, watch it
appear on the other → sign out → local still works → fresh anonymous device adds an
already-cached wine → rich match sheet appears INSTANTLY (the cache, visible).

Dependencies: S2 needs D-series verdicts (done) + LWIN download; S4 needs S3 records; S6
needs only the Google Cloud OAuth consent app (Ed's Google account, free; I script the
clicks when we get there) — the Supabase side is DONE (D13: `vin-arcana-base` live via the
Vercel marketplace integration, env vars auto-injected).

---

## 7 · RISKS + KILL-SWITCHES

| risk | mitigation | switch / degrade |
|---|---|---|
| E-A count sheet summons a lingering backdrop | experiment protocol §5.6, probe + device gate | E-B ships; E-A → dead-ends list with data |
| Native photo input quirks (HEIC, EXIF rotation, iOS chooser variance) | canvas re-encode normalizes format+orientation; test matrix in S2 | worst case: accept-attr tuning; input is a web primitive, low risk |
| LWIN misses everyday bottles | telemetry from S2; manual path first-class; §2.1 supplement channels | commercial feed conversation WITH data, LWIN as join key |
| LLM invents wine "facts" | grounding rules in enrich prompt; conservative register; golden set + Ed's ear (S3 script) | stats-only detail is the shipped failure mode |
| Lint fallback rate high | one retry w/ report; fallback is safe by design; log + batch review | tune prompt, never loosen lint |
| Open endpoint abuse | origin allowlist + per-IP bucket + daily budget cap | `CELLAR_PIPELINE_DISABLED=1` → manual-only app |
| Vercel Hobby ToS (commercial) | budget Pro from the moment money is real (§4.1) | $20/mo, not a risk — a line item |
| ~~Supabase free-tier pause (7d idle)~~ RETIRED by D13 | cohort event traffic keeps `vin-arcana-base` warm; Pro before real scale | $25/mo |
| ~~Analytics gate slips past ~Jul 23~~ CLEARED Jul 17 | sink live end-to-end (marketplace integration, auto-injected env vars) | — |
| Harness traffic pollutes cohort data (suite/probe run against the LIVE site with fresh install ids) | the suite harness arms the analytics off-flag (`va-an-off`) in its setup before driving — same discipline as seed-and-restore; golden-set runs self-mark `dev` | analysis always filters `not dev` (§8.12) as the backstop |
| Sync conflicts corrupt counts | LWW v1 + conflict drill in S6; counts are user-correctable in one tap | worst case a count is off by one and the user fixes it — never data loss of a record |
| Pairing soft-secrecy (owned wines' pairings readable client-side) | system-wide mapping never leaves the server; per-wine results are the same exposure as today | accepted; revisit only if it ever matters commercially |
| Model/pricing drift | per-stage model env config; golden set re-run on change | pin previous model; batch re-runs at 50% |
| Framework change mid-flight (deploy lands before re-map finishes) | §3.6 fail-safe index: retired lenses drop instantly, changed-and-stale pairings suppress — the gap is silence, never a wrong nudge | re-map job re-runnable/idempotent; worst case pips stay quiet until it completes |
| lens_id discipline erodes across hands (reused/edited ids) | build-time validator fails the deploy; §8.9 makes the rule explicit | changelog makes any drift visible before it ships |

---

## 8 · ASSUMPTIONS LOG (question these before building on them)

1. **A 15-bottle average cellar and 40%+ overlap at scale** — the §4.2 projections hinge on
   these; telemetry replaces them with truth from S2 on.
2. **LWIN's published fields match §2.1's description** — stated from Liv-ex's public
   materials; the S2 download-and-inspect task CONFIRMS columns before the index script is
   written (first S2 task, cheap).
3. **Claude reads wine labels at high accuracy** — strongly expected, unproven on OUR
   labels; the S2 golden set (Ed's real bottles) is the proof gate before S3 builds on it.
4. **The transient bottom-anchor (E-A) is safe** — explicitly an experiment, never assumed;
   E-B exists first-class.
5. **LWW sync is enough at v1** — accepted simplification; the S6 conflict drill decides if
   counts need merge logic.
6. **Soft secrecy of per-wine pairings is acceptable** — Ed accepted implicitly by the
   localStorage design; logged so a future commercial hand re-decides consciously.
7. **The sim's chrome rendering keeps differing from device** — standing canon; every
   construction verdict here defers to Ed's device eye.
8. **Prices (Anthropic, Vercel, Supabase) as of Jul 2026** — re-verify at each phase start;
   the business chat re-verifies independently.
9. **lens_id is append-only and never reused** — the entire evolution design (§3.6) rests
   on this editorial discipline; the validator enforces the mechanical half, but "same id
   = same sentiment" is Ed's judgment call at every edit. A re-sentimented lens gets a NEW
   id; a reworded one keeps its id.
10. **Single live framework version (no user-facing A/B)** — accepted for v1 to keep one
    content surface; lens telemetry across versions is the substitute signal. Revisit if
    the business ever needs true split-testing.
11. **The numeral→lens_id Memory backfill runs BEFORE any lens reorder ever ships** — the
    mapping is only unambiguous under the current ordering; F-track is sequenced before S4
    partly for this reason. If a reorder ever jumps the queue, old journals' re-entry
    falls to the wine-match fallback (graceful, but don't let it happen).
12. **Analytics maintenance laws (D13, inherited from analytics.md — restated so no
    future hand misses them):** `va_events` schema changes are ADDITIVE-ONLY (early cohort
    rows stay readable forever); events stay PII-free (plus this plan's §5.8 props-hygiene
    law: no pipeline free-text in props); every analysis filters `not dev`; any
    consent/privacy surface is a PUBLIC-LAUNCH task, not a cohort task — and it becomes
    non-optional at S6's install↔user join; new event names need no api/track change
    (pattern-validated), but respect its caps (12 props, 120-char strings).
13. **Scan metering is entitlement-shaped from birth (business-plan §4.1):** the paid tier
    meters photo scans ("one free taste of each scan type"), so S2's quotas are keyed
    per-install, not per-IP — the quota seam upgrades into the subscription entitlement
    check without rework. The extract function (image → structured JSON) is deliberately
    the reusable seam for Idea-2's list/shelf scans later.
14. **LWIN is also the buy-button join key (business-plan §4.4):** availability matching
    (LWIN → retailer SKU) is the flagged [ENG] feasibility question for the Idea-4 sprint —
    out of cellar scope, but every matched cellar record carrying `matchedId` is quietly
    building that bridge. `buy_tapped` stays reserved in analytics.md until that sprint.
15. **Pour tiers may formalize pour_index (business-plan §2):** the planned
    accessible/aspirational/deep-cut structure per lens would give pour_index stable
    semantics. Additive when it comes; pairings already store the index.

*Cross-references: claude-code-handoff/cellar-brief.md · stage-construction.md §5 ·
design-decisions.md (round-13 canon amended by A2 at closeout) · content/voice-prompt.md ·
memory-store.js (the seam pattern) · docs/business-kickoff-prompt.md (the business-plan
handoff, kept out of this plan's scope).*
