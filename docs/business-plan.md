# Vintner's Arcana — Business Plan (DRAFT v1, Jul 16 2026)

> Working draft for bank/registration readiness. Bracketed `[...]` items await the
> instrumented friends-cohort data (~Aug 2026) and named validation experiments.
> Companion docs: business-ideas-ledger.md (idea provenance + decisions),
> business-kickoff-prompt.md (engineering cost facts, owned by the engineering
> sessions). docs/ is vercelignored — this never deploys.

---

## 1. Executive summary

**Vintner's Arcana is a ritual app riding a growing mystical-wellness market,
monetized by selling audience access to a wine industry in a demand crisis.**

The product: a tarot-meets-wine ritual. The user draws a card, receives a reading
written in a locked, hand-approved voice, chooses a "lens" — a felt human response —
and the app reveals wines that embody that feeling, each grounded in one true wine
fact, always ending on the bottle. The thesis: manufacture profundity, attach wine to
that seared moment, and people learn wine effortlessly.

Two markets, moving in opposite directions, bridged by one product:

- **Consumer (growing):** the astrology/tarot app category is a multi-billion-dollar
  market growing ~20%/yr, with ~3 in 10 US adults engaging astrology or tarot at
  least annually. Comparable apps charge $90–415/yr-equivalent. None of them can end
  a reading on a bottle.
- **Wine industry (contracting, and therefore buying):** US volumes fell from 410M
  cases (2019) to 329M (2025); SVB's 2026 industry report identifies the core
  problem as a failure to engage young consumers, who "come looking for an
  experience." Vintner's Arcana sells wineries exactly that: an experience-shaped
  bridge to the audience they are losing.

Founder: Ed Schofield, San Francisco — UX designer (currently Google), WSET Level 2,
building with AI pair-engineering. Solo, 10–15 hrs/wk, salaried (no draw required).

The ask (§8): a modest working-capital facility — expected case **$[20–30]k** —
funding editorial capability (region travel, tasting research), the first physical
edition, professional fees, and a marketing buffer. The founder's salary means no
living-cost burn is financed; every borrowed dollar buys a revenue asset.

## 2. Product & status

**Live today (prototype, pre-launch):** full ritual (draw → reading → reveal), a
personal Memory journal, a per-card guidebook layer (all 78 cards' content written;
hand-approved), polished hard for iPhone as a web app.

**In build:** the Cellar — photograph a wine label, the app identifies the bottle
(LWIN backbone), builds it a story, and invisibly maps it to cards, so a draw can
surface a bottle the user already owns ("IN YOUR CELLAR").

**Planned product structure (feeds revenue):** per lens, three wine tiers —
*accessible / aspirational / deep cut* — giving reusability as the palate grows.
The "Whisper" grows from text influence ("I'm eating fish tonight") into photo
inputs: photograph a restaurant wine list or a retail shelf, and the draw is
constrained to what's actually in front of the user.

**Timeline:** instrumented friends cohort ~Aug 2026 → soft public launch
[Q4 2026] → first commercial year 2027.

**Product laws (governing all revenue design):**
1. *The spirits are never for sale.* No paid influence inside the reading. Paid
   placement exists only in explicitly scoped decks (a Sonoma deck recommending
   Sonoma wines is honest by construction). At scale (~50k+ users), a clearly
   labeled sponsored slot may appear below the three editorial tiers — never inside
   them.
2. *Gate utility, never sentiment.* The Memory journal is free and unlimited
   forever; the Cellar is generously free. Paid features are exactly those with real
   marginal cost (scans, spreads, depth).
3. *Two-tier deck law.* Every deck product, digital or print, is explicitly a
   **Majors Edition (22)** or **Full Arcana (78)**.

## 3. Market

### 3.1 Segments (beachhead order)

1. **Tarot-curious / ritual seekers (beachhead).** Earliest signal: prototype
   testers who draw regularly *for the readings alone*. They retain on the ritual;
   wine is the depth payload. [COHORT: retention by affinity tag]
2. **Wine-curious under-40s.** The segment the wine industry cannot reach; ours
   arrives via the ritual and learns wine effortlessly. The B2B ideas (partnerships,
   club, buy button) monetize this bridge.
3. **Wine lovers.** The Cellar and deep-cut tiers serve them; not the launch focus.
4. **"Neither" enthusiasts** — respond to craft/novelty; word-of-mouth amplifiers.

### 3.2 Consumer comps (verified Jul 2026)

| App | Price | What they deliver | What they lack vs us |
|---|---|---|---|
| CHANI | $11.99/mo (~$144/yr) | Premium astrology, meditations, best-in-class writing | No tarot ritual, no physical-world payload |
| Nebula | $7.99/wk; $24.99/mo | Astrology+tarot+palmistry, live advisors | Aggressive/churny pricing; no curation ethic |
| Sanctuary | $2.99/min live readings | Human readers on demand | Pay-per-session; no product depth |
| Labyrinthos | Free + IAP; premium ~$9.99 (annual ~$90 reported) | Tarot learning academy, deck sales | No wine, no utility layer |
| Co-Star | Free + premium tiers | Blunt shareable horoscopes, social | No tarot, no wine, no utility |
| Vivino (wine side) | Free | Crowd-sourced ratings at scale | The anti-thesis: information without caring |

**Pricing implication:** our planned $4.99/mo–$40/yr sits at the *bottom* of the
category. Recommendation: fake-door test **$39.99/yr vs $59.99/yr** [FAKE-DOOR:
tap-rate by price]; even $59.99 undercuts every serious comp. Unique to us and
priced by no competitor: the shelf scan (point at a wall of wine, draw, be told
which bottle), list scan, cellar mapping.

### 3.3 The wine-industry buyer

SVB 2026: demand low point forecast 2027–28; recovery bet is experience-led
engagement of younger consumers. Napa/Sonoma tasting-room traffic is down;
boutique wineries' marketing budgets seek anything that (a) reaches under-40s,
(b) creates experiences, (c) travels home with the guest. The regional deck does
all three. Geography: the founder lives an hour from the two most deck-buyer-dense
wine regions on earth.

## 4. Revenue models

Six lines, sequenced. Each with buyer, price, cost, and kill-risk. All AI/infra
figures from the engineering cost model (kickoff doc): infra floor $45/mo;
enrichment ≈$0.10 per unique wine once ever (globally cached); draws $0.

### 4.1 Subscription — the scale engine

- **Buyer/price:** consumers; $4.99/mo, $[40–60]/yr annual-first.
- **Free tier:** full ritual, majors, memory (unlimited), cellar (generous), one
  taste of each scan type.
- **Paid tier:** photo-whisper (list + shelf scans), minor arcana, multi-card
  spreads, cellar depth, personalization engine (roadmap).
- **Cost:** scans are per-use vision calls — [ENG: per-scan cost, rate cap];
  everything else ≈$0 marginal.
- **Math (assumptions explicit):** freemium conversion 2–5%. At 10k users:
  350 subs × $50 ≈ $17.5k/yr. Bank-relevant north of ~20k users.
- **Kill-risk:** ritual users may not want utility. Mitigation: one free taste of
  the grand finale; conversion measured before launch pricing is set.

### 4.2 Regional physical decks + editorial partnerships ("the Michelin model")

- **Structure:** featured slots are editorially awarded, never sold. Featured
  wineries are offered a **launch-partner package**: wholesale precommitment
  (~50 decks @ ~$30) + launch activation. Money buys inventory and marketing,
  never placement.
- **First edition:** Sonoma, Majors (22), $60+ art object, commissioned artist.
- **Unit economics (assumptions):** art $5.5–10k; print (premium, ~1k units)
  $8–15/unit; retail $60, wholesale ~$30. 22 partners × $1.5k package ≈ **$33k
  precommitted ≈ the edition funds itself before retail**. Wineries double as the
  sales channel (tasting-room margin on their own stock).
- **Validation:** five Sonoma tasting-room conversations — award acceptance +
  wholesale precommit intent. [SONOMA-5: outcome]
- **Kill-risks:** award refusal (prestige unproven — mitigated by app traction +
  Kickstarter proof); founder sales hours (~half of weekly budget for a quarter);
  tone fit (deck tone slides to embody the region).
- **Later family members:** tourism boards (year 2+, walk in holding a sold-out
  edition); Michelin-restaurant food×wine deck (digital-first; needs the Sonoma
  proof; SF Michelin density is the access).

### 4.3 The card-drawn wine club (quarterly)

- **Structure:** licensed retail partner is merchant of record (CA ABC third-party
  provider framework); Ed curates, writes, owns members and brand. Revenue split
  billing: wine box at partner's retail (theirs) + **membership fee 100% ours**
  (content, live pull, community, pickup parties) + in-box collectible card.
- **Price:** box $160–200/quarter (~6 bottles — at SF market: Arlequin $69/mo,
  Ferry Plaza $40–68/mo) + membership $[25]/quarter.
- **v1:** pickup-party club, SF partner bar, capped 30–50 members, starts with the
  friends cohort. Shipping partner = v2. Quarterly cadence (deliberate).
- **Ed's take (assumptions):** ~$40–55/member/quarter blended → 60 members ≈
  $10–13k/yr. v1's real yield: proof, content, community.
- **Kill-risks:** partner acquisition is cold → event-first path (§6); attorney
  must bless fee structure before any deal (named use of funds).

### 4.4 Buy button (affiliate v1)

- **Structure:** one endorsed licensed retailer behind The Pour; affiliate
  (wine.com ≈4–6% new / 1–2.5% repeat). FTC-disclosed. Crate-digging
  (wine-searcher-style) reserved as a deep-cut power feature, not the default.
- **Money:** ≈$1.50/new-customer order — a rounding line for years, at zero
  marginal cost. **Its real product: the purchase-intent conversion metric** — the
  number that makes wineries, club partners, and lenders believe the mechanism
  sells wine. [AFFILIATE: conversion %]
- **Blocker:** availability matching (LWIN → retailer SKU) — [ENG: feasibility].
- Licensure in-house: distant option, not planned or financed here.

### 4.5 Digital cosmetic decks (the passive layer)

- **Structure:** artist rev-share (artists bring art + audience; $0 fronted);
  digital editions are the test bed — a performing deck earns a physical print
  run. Majors editions standard; Full Arcana for proven sellers. Founder's
  AI-assisted deck: free default skin only — the first *sold* deck is a human
  artist's (this audience is decisively anti-AI-art).
- **Price/assumptions:** $4.99 (Majors) / $9.99 (Full Arcana), 50/50 split,
  attach rate 3–8% of actives (to validate).
- **Kill-risk:** low — no cash at risk; failure mode is merely quiet.

### 4.6 Events (ticketed ritual nights)

- **Structure:** wine-bar partner (their license, their pours, their slow
  Tuesday); we sell the experience: $40–75/ticket, guaranteed bar minimum,
  founder-led ritual. Feeds: bar relationship → club v1; content for short-form
  channel; direct revenue.
- **Math:** 25 tickets × $50 ≈ $1,250/night gross; ~monthly cadence at capacity.

**Explicitly rejected/deferred:** spirit tone packs (every tone = rewriting the
entire hand-approved corpus — the single voice is both moat and cost ceiling);
in-house alcohol license; monthly club cadence; Patreon as a platform.

## 5. Validation plan & evidence to date

Evidence today: consistently strong informal reception across wine-lovers,
tarot-curious, and neither (directional only); earliest behavioral signal — a
tester drawing regularly for readings alone.

| # | Experiment | Proves | Cost | Status |
|---|---|---|---|---|
| 1 | Instrumented friends cohort (~Aug 2026) | D1/D7/D30 retention, by affinity segment | Eng hours | Instrumentation in progress |
| 2 | Fake-door paywall, $39.99 vs $59.99 | Willingness to pay + price point | ~a day | Pending |
| 3 | Five Sonoma tasting-room conversations | Award acceptance + wholesale precommit | Saturdays | Pending |
| 4 | One bar Tuesday (ticketed night) | Events channel + club precursor | ~a month of groundwork | Pending |
| 5 | Kickstarter artist deck (wine-centric, no winery dependency) | $60-object demand | Artist deal + campaign | Pending art partner |
| 6 | Affiliate conversion post-launch | The mechanism sells wine | Eng hours | Pending |

Loan conversation proceeds when: [1] shows D30 retention ≥ [15–20]% on the
beachhead segment, [2] shows tap-rate ≥ [3–5]%, and [3] yields ≥ [3/5] positive.

## 6. Go-to-market

Sequence: friends cohort → soft launch (fall 2026) → Sonoma conversations in
parallel (pipelining: art+print is 6–9 months) → bar-night series → club v1 →
Sonoma edition (spring–summer 2027) → tourism boards/Michelin decks year 2+.

Channels: short-form video (the 30-second draw is a complete vertical video;
long-form YouTube deferred until there's a club/live pull to stream); word of
mouth (readings are inherently shareable); every physical deck sold is an app
install; events as paid marketing. The Google internal network is off-limits as a
channel (conflict hygiene); its wine community is a learning resource only.

## 7. Operations & cost structure

- **Fixed:** infra floor $45/mo (Vercel Pro $20 + Supabase Pro $25) + usage;
  domain ~$12/yr; Apple Developer $99/yr if/when native wrapper.
- **Scale costs (engineering model):** 100 users ≈ $90 cumulative AI + $45/mo;
  1k users ≈ $1k + $45–100/mo; 10k ≈ $3–5k + $150–400/mo. Largest lever: image
  bandwidth.
- **Catalog:** identity data free (LWIN, CC BY 4.0 — attribution shipped in-app);
  lazy enrichment $0 upfront; optional curated pre-warm ~5k wines $250–500; full
  200k batch $4–10k (marketing polish only — never required).
- **People:** founder 10–15 hrs/wk (½ sales/partnerships in edition quarters);
  AI pair-engineering in lieu of eng payroll; commissioned artists per edition;
  no hires in plan horizon.
- **Professional/compliance:** alcohol-beverage attorney consult $[500–1,500]
  (before first winery/club deal — fee structures under CA ABC third-party rules);
  CPA $[~1k/yr]; CA LLC: formation + $800/yr franchise tax; general liability +
  event insurance $[500–1,500/yr]; FTC disclosure practices in-app.
- **IP/employment:** Google side-project clearance submitted Jul 2026; informal
  guidance favorable (no copyright claims over card games); formal letter expected
  ≤3 weeks. [CLEARANCE: attach letter]

## 8. Capital ask & use of funds

Three tiers (the plan works at every tier; the loan buys speed, not survival —
founder remains salaried, no living-cost burn):

| Tier | Amount | Funds | Outcome |
|---|---|---|---|
| Self-funded floor | $0 borrowed | Infra, formation, attorney, fake-doors | Slow path; edition waits on precommits |
| **Expected ask** | **$[20–30]k** | Region travel + tasting research ($[6–10]k), Sonoma edition bridge (art deposit + print before precommit cash clears, $[8–12]k), professional fees ($[3]k), launch marketing ($[3–5]k) | Edition lands 2 quarters sooner; editorial credibility (the Michelin model's engine) built properly |
| Stretch | $[40–50]k | + second edition, curated catalog pre-warm, native wrapper | Only with validation gates §5 cleared |

Collateral/covenant story: personal guarantee backed by founder salary; inventory
(decks) is a tangible, pre-sold asset; borrowing against precommitted wholesale.

## 9. Projections (first commercial year, 2027)

All assumptions visible; revenue is founder-side net where partners take share.
[Rebase after cohort + fake-door data.]

| Line | Conservative | Expected | Optimistic |
|---|---|---|---|
| Users (EOY) | 2,500 | 10,000 | 30,000 |
| Subscription (conv. 2% / 3.5% / 5% × $50) | $2.5k | $17.5k | $75k |
| Sonoma edition (12 / 22 / 22 partners + sell-through) | $6k | $25k | $60k (+2nd edition) |
| Club (30 / 60 / 100 members, split model) | $5k | $12k | $20k |
| Digital decks + skins | $1k | $4k | $12k |
| Events (4 / 8 / 12 nights) | $3k | $8k | $15k |
| Affiliate | $0.2k | $1k | $4k |
| **Revenue (founder-side)** | **~$18k** | **~$68k** | **~$186k** |
| Opex (infra+AI+prof+ins.) | ~$6k | ~$10k | ~$18k |
| Edition capex | precommit-funded | precommit-funded | +$25k (2nd, loan/stretch) |

Conservative case still services a $25k note comfortably on business cash flow
alone — before counting the salary covenant. [Bank format: monthly cash-flow
schedule to be generated from this table.]

## 10. Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Ritual users don't convert to wine buyers | High — B2B lines depend on it | Measure early (affiliate metric, cohort pour-views); subscription monetizes ritual alone |
| Winery award refusal / slow sales | High for edition timing | Pipeline early; Kickstarter proof; 5-conversation gate before art spend |
| CA ABC / tied-house missteps | High if ignored, low if managed | Attorney before first deal; flat-fee structures; licensee controls funds |
| Wine volume decline (secular) | Medium | Conservative club/affiliate assumptions; decline is the B2B tailwind |
| Solo-founder capacity (10–15 hrs) | Medium | Sequencing (one edition/yr); AI pair-engineering; no simultaneous big pushes |
| Google clearance surprise | Low (informal guidance favorable) | Formal letter gates registration filing |
| App-store/platform shifts (if native) | Low now | Web-first; wrapper deferred |
| Content voice = single point of taste | Accepted | It's the moat; no tone packs |

## 11. Company & registration

Founder-owned LLC (California) planned — liability shield for events + physical
product + alcohol-adjacent activity; pass-through taxation; $800/yr franchise tax
(+ gross-receipts fee above $250k) + formation costs; S-corp election deferred
until income justifies it (founder's W-2 already maxes the Social Security base,
shrinking the election's value early).

**Why not a C-Corp (anticipating the question):** C-Corps serve institutional
equity raises, which this plan does not contemplate. On the loan-funded path a
C-Corp costs double taxation on distributed profits, traps early-year losses
inside the corporation (in a single-member LLC, with material participation
documented, those losses offset the founder's W-2 income at a high marginal
rate), and adds governance overhead against a 10–15 hr/wk founder budget.
California statutory conversion LLC→C-Corp keeps the venture path open cheaply;
the reverse is a taxable liquidation. The alcohol/events risk profile does not
change the analysis: the shield is equal across entities — real protection is
the licensed-partner structure, additional-insured event coverage, and strict
entity separation (dedicated accounts, LLC-signed contracts).

**Flagged to local CPA/attorney, not decided here:** loss deductibility posture
(material participation + hobby-loss), QBI applicability, S-corp trigger point,
travel/sampling substantiation, SF business registration, sales-tax nexus for
deck sales, insurance scope. Registration files after the Google clearance
letter arrives.

## Appendix A — assumption log

Every bracketed figure above traces to: engineering cost model (kickoff doc, owned
by engineering sessions); SF wine-club benchmark (Jul 2026: Arlequin $69/mo, Ferry
Plaza $40–68/mo, Oxbow ~$40/mo, SFWTC $60–150/mo); tarot-app comps (Jul 2026:
CHANI $11.99/mo, Nebula $7.99/wk, Sanctuary $2.99/min, Labyrinthos ~$9.99 premium);
SVB State of the US Wine Industry 2026; wine.com affiliate terms via Rakuten
(4–6%/1–2.5%); print/art costs = industry-typical ranges, to be quoted before any
spend; conversion/attach rates = category norms pending our own cohort data.
