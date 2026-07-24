# THE BUG LEDGER — first-hand observations, parked without loss

Ed sees it on the device; the session enriches it with code pointers AT
FILING TIME (when the context to do so is cheap); a FRESH session fixes
it later reading only its entry + the named canon. That's the contract:
**every entry must be fixable by a session that has only this repo.**

## The laws of the ledger

- **File in the moment, fix in rounds.** Filing must never derail the
  work in flight — `/bug <what you saw>` appends and returns. Fixes are
  batched into focused rounds (the S1 device-round rhythm), grouped by
  the screen/construction they touch.
- **Ed's words stay verbatim.** The "Seen" field is the first-hand
  record — never paraphrased away. The session adds context BELOW it,
  never instead of it.
- **Entries are self-contained.** Name the files, the canon sections,
  and the laws that likely bind. A fixing session should not need the
  conversation the bug spawned from.
- **Append-only history.** Fixed bugs move to the CLOSED section with
  their verdict + commit — never deleted (they are the product's
  memory of its own weak spots, and regression fodder for the suite).
- **The index is the board.** One line per bug; statuses are the lanes.

**Severity lanes:** `BLOCKER` (breaks the ritual/data) · `LAW` (violates
canon or a hard law) · `POLISH` (Ed's eye — feel, timing, copy) ·
`PAPERCUT` (small, real, safe to batch).
**Statuses:** `OPEN` → `IN-ROUND` (scheduled into a fix round) →
`CLOSED` (fixed + verified) · `PARKED` (deliberate, with the parker
named) · `WONTFIX` (with the reasoning).

## INDEX — open

| id | sev | screen/flow | one line | status |
|---|---|---|---|---|
| B-001 | POLISH | Cellar form | residual second movement on keyboard dismissal from LOW fields | PARKED (Ed, S1 r6) |

## INDEX — closed

| id | sev | screen/flow | one line | verdict |
|---|---|---|---|---|

---

## OPEN

### B-001 · PARKED · POLISH · Cellar form (keyboard dismissal)
**Filed:** Jul 17 2026 (S1 device round 6, carried from D19/D20) · **Parked by Ed** — small, non-disruptive; pick up only if a polish window opens.
**Seen:** a residual second movement on keyboard dismissal from the form's LOW fields (Country/Grape) survives the D19 fix.
**Context for the fix:** the D19 construction is the form layer at `100lvh + safe + 250px` with the one-motion blur glide (`celGlideHome`, flow6-cellar.jsx) preempting Safari's scroller clamp; D18/D19 in cellar-plan §0 carry the full conviction history. The residue is likely the glide's 320ms lead racing Safari's own settle on the deepest fields. THE FOCUS CONTRACT binds: never fight the keyboard while focused; restore only on blur-out.
**Verdict space:** timing/geometry tuning is mechanical; whether the residue is "gone enough" is Ed's device eye.

---

## CLOSED

*(nothing yet — closed entries move here whole, with verdict + commit)*
