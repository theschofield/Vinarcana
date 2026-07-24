---
name: bug
description: File Ed's first-hand bug observation(s) into docs/bug-ledger.md with code-level context, without derailing the current work. Use when Ed reports something broken/off ("/bug ...", "found a bug", "log this one").
---

# /bug — park an observation on the ledger

Ed is reporting something he saw first-hand. Your job is to capture it
so a FRESH session can fix it from the entry alone — then get back to
whatever you were doing. **Never start fixing.** Filing is the task.

## Steps

1. Read `docs/bug-ledger.md` (index + the laws at the top). Mint the
   next `B-NNN` id. If Ed's message contains several distinct bugs,
   file several entries — never merge observations.
2. For each bug, spend a FEW MINUTES (not more) enriching: identify the
   screen/flow, the likely files/selectors/functions, and the canon
   sections or hard laws that bind (stage-construction §, cellar-plan
   D-numbers, choreography-grammar). Grep/read only what you need. If
   the cause is genuinely unclear, say so in the entry — a named
   mystery beats a confident guess.
3. Append the entry under OPEN using the house template:
   - `### B-NNN · OPEN · <SEV> · <screen/flow> (<short handle>)`
   - **Filed:** date + where it was seen (device round, sim, desktop…)
   - **Seen:** Ed's observation VERBATIM (his words are the record)
   - **Repro:** steps, if derivable; else "as seen"
   - **Context for the fix:** your enrichment — files, constructions,
     laws, suspicions, and anything from the current conversation a
     fresh session couldn't rediscover cheaply
   - **Verdict space:** what is mechanical vs what needs Ed's eye
4. Add the one-line INDEX row. Severity is your provisional call —
   mark it `(?)` if Ed didn't indicate; he can re-lane it.
5. Confirm back in ONE short line per bug (id + handle + severity) and
   return to the interrupted work. Don't commit just for a filing —
   the ledger rides the next natural commit (or /handoff).

## Never

- Never fix, refactor, or "quickly verify" beyond cheap reads.
- Never paraphrase away Ed's wording in **Seen**.
- Never let a filing balloon past ~20 lines — link canon instead of
  restating it.
