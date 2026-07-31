---
name: park
description: Park Ed's first-hand bug observation(s) on docs/bug-ledger.md with code-level context, without derailing the current work. Use when Ed invokes /park, reports something broken/off, or says "found a bug", "log this one", "park this".
---

# /park — park observations on the ledger

Ed is reporting something he saw first-hand. Your job is to capture it
so a FRESH session can fix it from the entry alone — then get back to
whatever you were doing. **Never start fixing.** Parking is the task.

## How Ed invokes it (the contract)

ONE `/park` at the top of the message covers EVERYTHING in it: Ed
writes as many bugs as he likes in one prompt — separated by line
breaks, numbers, dashes, or just prose — and YOU parse them into
individual entries. He never repeats the command per bug. If two
observations might be one bug or one observation might be two, make
the split that gives each entry a single fixable cause, and say what
you split/merged in your confirmation so he can correct you.

## Steps

1. Read `docs/bug-ledger.md` (index + laws). Mint sequential `B-NNN`
   ids. Check the index for duplicates first — if something's already
   filed, say so and enrich the EXISTING entry instead of forking.
2. For each bug, spend a FEW MINUTES (not more) enriching: the
   screen/flow, the likely files/selectors/functions, the canon
   sections or hard laws that bind (stage-construction §, cellar-plan
   D-numbers, choreography-grammar). Grep/read only what you need. If
   the cause is genuinely unclear, say so — a named mystery beats a
   confident guess.
3. Append each entry under OPEN using the house template:
   - `### B-NNN · OPEN · <SEV> · <screen/flow> (<short handle>)`
   - **Filed:** date + where seen (device round, sim, desktop…)
   - **Seen:** Ed's observation VERBATIM (his words are the record)
   - **Repro:** steps, if derivable; else "as seen"
   - **Kin:** related entry ids (`B-00X`) when bugs share a root or
     would sensibly ship in one fix round — this is the birds-eye
     thread: clusters get planned as rounds by walking kin chains
   - **Context for the fix:** your enrichment — files, constructions,
     laws, suspicions, anything from the current conversation a fresh
     session couldn't rediscover cheaply
   - **Verdict space:** what is mechanical vs what needs Ed's eye
4. Add one INDEX row per bug. Severity is your provisional call —
   mark `(?)` if Ed didn't indicate; he can re-lane it.
5. Confirm back in ONE short line per bug (id + handle + severity +
   kin), note any split/merge calls you made, and return to the
   interrupted work. Don't commit just for a parking — the ledger
   rides the next natural commit (or /handoff).

## Never

- Never fix, refactor, or "quickly verify" beyond cheap reads.
- Never paraphrase away Ed's wording in **Seen**.
- Never let an entry balloon past ~20 lines — link canon instead of
  restating it.
