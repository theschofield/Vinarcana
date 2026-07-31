---
name: handoff
description: Close out a long conversation gracefully — bank verdicts into canon, update the bug ledger, write a self-sufficient kickoff doc for the next session, commit. Use when Ed says "/handoff", "wrap this up", or context is nearing its limit.
---

# /handoff — end this conversation, arm the next one

The house already proved this pattern: docs/cellar-sprint2-kickoff.md
let a fresh session build all of S2 from the repo alone. A handoff is
that, for wherever we are now. The canon is the memory — the handoff
doc only points and sequences; it never becomes a second source of
truth.

## Steps, in order

1. **Stop building.** No new work from here — only banking.
2. **Bank verdicts into canon.** Anything decided this conversation
   that lives nowhere but the chat: append Ed's verdicts to
   docs/design-decisions.md, D-entries to cellar-plan §0, laws to
   stage-construction/CLAUDE.md — each in its proper home, house
   style. If a verdict is Ed's but unconfirmed, mark it PENDING rather
   than inventing a ruling.
3. **Sweep the loose bugs.** Anything Ed mentioned but never filed →
   park per the /park skill. Update statuses on anything fixed this
   session (move to CLOSED with commit hashes).
4. **Write the kickoff** at `docs/handoffs/YYYY-MM-DD-<slug>.md`,
   modeled on cellar-sprint2-kickoff.md:
   - a STATE block: what is built/deployed/verified as of this commit,
     what is mid-flight (exact file + what remains), what is untested;
   - a READ-FIRST list (canon sections + ledger entries by id — point,
     don't restate);
   - the NEXT MOVES in priority order, each with its acceptance
     check (suite/probe/device);
   - ED'S PART: anything only he can do (device passes, env vars,
     verdicts owed);
   - any live gotchas a fresh session would trip on (running
     servers, seeded stores, half-migrated state).
5. **Leave the tree honest.** Commit house-style (uncommitted
   experiments either committed, stashed with a note in the kickoff,
   or reverted — never silently left). Push only if Ed says push.
6. **Print the paste-able prompt** for the fresh session, ending with:
   read CLAUDE.md's canon list, then the kickoff, then the ledger
   entries it names. Keep it short — the kickoff carries the weight.

## Never

- Never summarize canon INTO the handoff (point at it).
- Never leave a verdict only in the conversation.
- Never hand off a broken suite/probe without saying so in the STATE
  block, loudly.
