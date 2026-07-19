# The golden set — fixed label photos, expected identities

The regression harness for judgment (cellar-plan §5.8): re-run whenever a
prompt, model, or threshold changes. Suite-green is necessary, never
sufficient — THIS is what proves the reader still reads.

## v0 protocol (checkpoint 1 — Ed's part, ~10 minutes)

1. Photograph ~10 of your actual bottles the way you really would —
   phone camera, cellar light, no staging. Include:
   - a few framework bottles that MUST match (Vat 1 is the canon fixture),
   - at least one obscure/natural bottle that MUST stay a miss,
   - one deliberately imperfect shot (angle/blur) if you like.
2. Drop them here as `NN-slug.jpg` (HEIC is fine — the runner converts).
3. Add one entry per photo to `manifest.json`:

   ```json
   {
     "file": "01-vat1.jpg",
     "expect": { "producer": "Tyrrell's", "wine": "Vat 1 Semillon", "vintage": "2014" },
     "lwin": 1315635,
     "mustMatch": true
   }
   ```

   `lwin` and `mustMatch` are optional: `mustMatch: true` = the resolve
   top hit must clear the threshold; `mustMatch: false` = it must NOT
   (the honest-miss fixtures). Omit = report-only.

4. `node scraps/golden-set.js https://vinarcana.vercel.app`

The folder is .vercelignore'd — label photos never deploy. Runs cost
~$0.02/photo (extract); the per-install quota (~10/hour) is sized to
exactly one full run — space repeat runs an hour apart or run against a
local `vercel dev`.
