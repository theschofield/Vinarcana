# Analytics — the cohort's pulse (Jul 17 2026)

Why: the friends cohort (starting ~Jul 23 2026) is the business plan's first
retention dataset (D1/D7/D30, read per wine/tarot segment). Instrumentation
had to be live BEFORE they start or the data is lost — and had to add zero
layout/scroll surface (no DOM, no consent wall, no PII).

## The pieces

- **`explorations/arcana-analytics.js`** — plain script (no Babel), loaded
  from index.html before the app. Owns the anonymous install id, session
  rolling, the affinity tag, and a durable localStorage **outbox**.
  Public seam: `window.VAAnalytics.track(name, props)`.
- **`api/track.js`** — Vercel serverless function (zero npm deps, no
  package.json — /api/*.js deploys automatically next to the static site).
  Validates + whitelists fields, forwards to Supabase via PostgREST.
- **Supabase table `va_events`** — the store. Supabase is already the
  planned Sprint-6 vendor (cellar-plan §3.4), so this is the first real
  table, not throwaway infra.

## Why this sink

Chosen over alternatives: Vercel logs don't persist (hobby ≈ 1h), Vercel
Blob would be a second throwaway store needing an aggregation script, and
third-party analytics can't do per-install retention without a heavier
privacy story. Supabase = one SQL table on the vendor we're adopting anyway.

**Not live yet is fine.** The client outbox (cap 600 events) holds
everything locally and flushes retroactively with original timestamps once
the sink answers; delivery is at-least-once (retry backoff + pagehide
beacons) and the function dedupes on event id (`on_conflict=id` +
`resolution=ignore-duplicates`), so nothing is lost or double-counted even
if Supabase goes live days after the cohort starts. Only true loss risk:
a friend clearing Safari data before first successful flush.

## Go-live checklist (Ed, ~10 min, before Jul 23)

Recommended road: **Vercel dashboard → vinarcana project → Storage tab →
Create Database → Supabase** (the marketplace integration). It provisions
the Supabase project AND auto-injects the keys into the app — no manual
env vars. api/track.js accepts both the hand-set names (`SUPABASE_URL` +
`SUPABASE_SERVICE_KEY`) and the integration's auto-injected ones
(`SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_SECRET_KEY`). Creating at
supabase.com directly also works — then set the two hand-set env vars in
Vercel yourself. Either way this is the SAME project Sprint 6 will use
for accounts (cellar-plan §3.4).

1. Create the Supabase project (free tier — cellar-plan already budgets it).
2. SQL editor → run:

   ```sql
   create table va_events (
     id          text primary key,
     install_id  text not null,
     session_id  text,
     event       text not null,
     ts          bigint not null,          -- client ms epoch (original time)
     tz_min      int,                      -- client UTC offset, minutes
     affinity    text,                     -- wine | tarot | neither (at send time)
     standalone  boolean,                  -- home-screen app vs Safari tab
     dev         boolean default false,    -- localhost/harness traffic: exclude
     props       jsonb,
     received_at timestamptz default now()
   );
   alter table va_events enable row level security;  -- no policies: anon key
   -- is blocked entirely; the service key (server-side only) bypasses RLS
   ```

3. Env vars: automatic on the marketplace road (confirm
   `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` appear under Settings →
   Environment Variables). Manual road: set `SUPABASE_URL` +
   `SUPABASE_SERVICE_KEY` there yourself. Then Redeploy.
4. Sanity: open vinarcana.vercel.app, pull a card, then in Supabase check
   `select event, count(*) from va_events group by 1`.
5. On Ed's own devices, visit once with `?va-off` (persists; `?va-on`
   re-arms) so the cohort data stays clean. Localhost traffic self-marks
   `dev = true` instead.

## Events

| event | fired | props |
|---|---|---|
| `session_start` | load / return-to-visible / any track after 30 min silence | `day` (since install), `returning` |
| `reading_viewed` | phase arrives at `reading` (any road) | `origin` (draw·deck), `card`, `whisper` |
| `pour_viewed` | phase arrives at `reveal` (any road) | `origin` (draw·deck·memory), `card`, `lens` |
| `ritual_complete` | draw road reaches the pour (once per draw; replays count as new draws) | `card`, `lens`, `whisper` (Idea 2's flagship modality — its adoption reads off this flag) |
| `memory_saved` | a keep writes the journal (migration/no-op re-keeps excluded) | `card`, `lens`, `wine` |
| `deck_viewed` / `memory_viewed` / `cellar_viewed` | entering those screens (`cellar_viewed` wired S1, Jul 17 2026 — the deck/memory precedent; NOT an affinity signal, adds are) | — |
| `deeper_opened` | Deeper Reading opens | `src` (read·pour), `card` |
| `affinity_set` | the tag changes | `tag` |
| `cellar_added` | **WIRED (S1, Jul 17 2026)** — fires at the manual-add commit (flow6-cellar.jsx, vaTrack-guarded); the photo road adds `method: "photo"` in S2 | `wine`, `method` (form·photo) |
| `cellar_count` | **wired S1** — count-sheet stepper confirm (net change only); `sheet` stamps which construction served it (cellar-plan §5.6 experiment) | `delta`, `zero`, `sheet` (E-A·E-B) |
| `buy_tapped` | **reserved, not wired** — the Idea-4 buy button MUST call `VAAnalytics.track("buy_tapped", { wine, card, lens })`; with `pour_viewed` it completes the wine-conversion funnel the business plan calls THE open question (business-ideas-ledger, Phase 2) | `wine`, `card`, `lens` |

Every event also carries: `install`, `session`, `ts`, `tzm`, `affinity`,
`standalone` (+ `dev` on localhost). Nothing else — no IP, no UA, no names.

**Hook architecture** (flow6-root.jsx): one `useEffect` on phase — `reading`
and `reveal` are only ever reached by a finished sequence, so a single
effect covers every road with zero timeline edits; `originRef` is stamped
at the three entry points (runDraw / runDeckDraw / openMemoryPour). All
calls route through a module-scope `vaTrack` guard: analytics missing or
throwing must cost the ritual nothing.

## The affinity tag (wine / tarot / neither)

Behavioral, never asked — there is no onboarding to hang a question on, and
the core ritual is neutral (everyone draws, everyone sees a pour). This is
the "at onboarding or behaviorally" cohort-design note from
business-ideas-ledger Phase 2, resolved behaviorally. Only the optional
behaviors discriminate:

- wine signals: `memory_saved`, `cellar_added`, `pour_viewed` with
  `origin: "memory"` (re-opening a kept pour) — `cellar_viewed` and
  `cellar_count` deliberately do NOT count (browsing isn't the signal;
  adding is)
- tarot signals: `deeper_opened`, `deck_viewed`

A side wins at ≥2 signals; ties keep the earlier tag (else wine — the
bridge the business plan most needs to see). The current tag rides every
event, so retention reads per-segment without joins; the raw signals are
in the events too, so the rule can be re-derived differently at analysis
time if this heuristic proves crude.

## Reading retention (example)

```sql
-- D1/D7/D30 per affinity segment (latest tag per install)
with installs as (
  select install_id,
         min(ts) as born,
         (array_agg(affinity order by ts desc))[1] as segment
  from va_events where not dev group by 1
), days as (
  select e.install_id, i.segment,
         floor((e.ts - i.born) / 86400000.0)::int as day
  from va_events e join installs i using (install_id)
  where e.event = 'session_start' and not e.dev
)
select segment,
  count(distinct install_id)                          as installs,
  count(distinct install_id) filter (where day = 1)   as d1,
  count(distinct install_id) filter (where day between 6 and 8)   as d7,
  count(distinct install_id) filter (where day between 28 and 32) as d30
from days group by 1;
```

(Day boundaries use install-relative ms; `tz_min` is there if calendar-day
bucketing is ever wanted instead.)

## Laws

- Analytics adds **no DOM, no styles, no scroll surface** — the poison rule
  and the screen recipe are untouched by construction. Keep it that way:
  any future analytics UI (consent, dashboards) is a new screen and goes
  through stage-construction §5 like everything else.
- `localStorage` keys owned here: `va-an-id`, `va-an-born`, `va-an-sess`,
  `va-an-last`, `va-an-q`, `va-an-aff`, `va-an-tag`, `va-an-off`.
- The station/canvas never touches this file's pipeline; schema changes are
  additive (new columns / props keys), never renames — the cohort's early
  rows must stay readable.
