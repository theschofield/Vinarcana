# Vintner's Arcana — business-plan chat kickoff

> Ed: paste everything below the line into a fresh chat. It carries the full context that
> chat needs; the technical build stays with the Claude Code sessions and is out of its
> scope. (This file is vercelignored via docs/ — it never deploys.)

---

I'm the designer and founder of **Vintner's Arcana** (live at vinarcana.vercel.app), and I
want your help turning it into a real business: a structured conversation to develop my
monetization ideas one at a time, then a full business plan with each idea costed and
projected — solid enough to support registering the business and eventually taking it to a
bank for a loan.

## What the app is

A tarot-meets-wine ritual. You draw a card (Major Arcana, weathered Rider–Waite), the
card's "spirit voice" lands a knowing line, you choose a lens — a felt human response to
the card — and the app reveals wines that embody that feeling, each grounded in one true
wine fact, always ending on the bottle. The product thesis: manufacture profundity via
tarot, attach wine to that seared moment, and people learn wine effortlessly. The tone is
dark, premium, intimate — ancient and modern at once, sensual, never corny, never
costume-shop occult. Every word of content is written to a locked voice system and most of
it is hand-approved.

Current state: the full ritual (draw → reading → reveal), a personal Memory journal, a
deep "guidebook" layer per card, and a Cellar feature in build — photograph a wine label,
the app identifies the bottle, builds it a story, and invisibly maps it to the cards it
pairs with, so a draw can nudge you toward a bottle you already own ("IN YOUR CELLAR").
It's a web app today, polished hard for iPhone; a native iOS wrapper is a plausible later
step. Solo founder (me, a designer), building with AI pair-engineering.

## Reception so far

Consistently strong informal reception across many people — including people who don't
like wine, don't like tarot, or both. That breadth is why I think this is bigger than a
portfolio piece. (Treat this as directional, not market research — help me design real
validation into the plan.)

## My ideas inventory (develop these WITH me, one at a time, before writing anything)

I have a large number of monetization ideas and I want to walk you through each one in
conversation so they're captured faithfully before you cost or rank them. The ones I'll
start with (extract the rest from me):

- Partnerships with **wine tourism regions, wineries, and bars** — exposure plays, and
  experiences built on the app.
- **Custom decks scoped to a region** — a deck whose draws only reveal wines from, say,
  one appellation or one winery's portfolio (tourism boards / wineries as buyers).
- Many more I haven't listed — interview me. One idea per exchange, push on each
  (who pays, why, how much, what it costs us, what could kill it) before moving on.

## Engineering facts to build the numbers on (already researched — don't re-derive,
and flag rather than contradict; the engineering chat owns these)

- **Stack + fixed costs:** static web app on Vercel (commercial use requires Pro,
  $20/mo) + serverless functions; Supabase planned for accounts/database ($25/mo Pro).
  Steady-state infra floor ≈ **$45/mo** + usage. Optional: domain ~$12/yr, Apple
  Developer $99/yr if/when a native wrapper ships.
- **Unit economics:** identifying + enriching a wine (label photo → identity → story →
  hidden card pairings) costs **≈ $0.10 in AI calls per unique wine, once ever** — results
  are cached globally, so cost scales with unique wines, not users. Card draws cost $0.
- **Wine data:** the identifier backbone is **LWIN** (Liv-ex's database, 200k+ wines) —
  free, **CC BY 4.0, commercial use explicitly permitted**, attribution-only. There is no
  data-licensing bill.
- **The catalog question:** we do NOT need ~$20k to "ingest all the wines." Identity data
  is free; the $ figure only applies to pre-generating stories/pairings for the whole
  200k catalog (~$4–10k done efficiently in batch), which is optional marketing polish.
  The lazy path costs $0 upfront (wines enrich on first use); a curated pre-warm of ~5k
  popular wines costs ~$250–500. Use these three tiers in any capital plan.
- **Scale projections (engineering estimates, assumptions logged):** 100 users ≈ $90
  cumulative AI spend + $45/mo; 1,000 users ≈ $1k cumulative + $45–100/mo; 10,000 users
  ≈ $3–5k cumulative + $150–400/mo. Largest scaling lever is image bandwidth (card art).

## What I want from this chat, in order

1. **The interview.** Extract and sharpen every monetization and partnership idea I have.
   Challenge each: customer, willingness to pay, unit economics, effort, risks,
   cannibalization, sequencing.
2. **Market + validation design.** Who this is for (the reception spans wine lovers,
   tarot-curious, and neither), comparable products/pricing, and cheap experiments to
   validate willingness to pay before the loan conversation.
3. **The business plan.** Standard bank-ready structure: concept, market, product status,
   revenue models (each idea costed + projected against the scale table above),
   partnership strategy, cost structure, capital ask + use of funds, risks. Conservative /
   expected / optimistic scenarios.
4. **Registration + loan readiness.** What forming the business properly looks like for a
   solo founder (entity options at a high level — flag where I need a local
   accountant/lawyer rather than guessing jurisdiction specifics), and what a bank will
   want to see from a pre-revenue product with traction.

Ground rules: don't redesign the product or the tech — cost and package what exists.
Where you need numbers I haven't given (my location, hours available, savings runway,
target launch dates), ask me instead of assuming. Keep every projection's assumptions
explicit so I can defend them across a desk.
