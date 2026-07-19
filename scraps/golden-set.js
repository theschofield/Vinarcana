// GOLDEN SET RUNNER — cellar-plan §5.8 (checkpoint 1: sanity on the
// first real scans; re-run on every prompt/model/threshold change).
//
//   node scraps/golden-set.js [base-url]     (default https://vinarcana.vercel.app)
//
// Reads scraps/golden-set/manifest.json (see the README there for the
// protocol), downscales each photo with sips (macOS; mirrors the app's
// ≤1280px JPEG intake), drives cellar-extract → cellar-resolve exactly
// as the app does, and grades against the expected identities.
// No analytics are involved — the pipeline functions never write events
// (api/track is the only ingest path), so golden runs can't pollute the
// cohort. The install id below marks the traffic for quota accounting.

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const BASE = (process.argv[2] || "https://vinarcana.vercel.app").replace(/\/+$/, "");
const DIR = path.join(__dirname, "golden-set");
const INSTALL = "golden-set-dev";

const fold = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "");

async function post(p, body) {
  const r = await fetch(BASE + p, {
    method: "POST",
    headers: { "content-type": "application/json", origin: BASE },
    body: JSON.stringify({ install: INSTALL, ...body }),
  });
  return { status: r.status, body: await r.json().catch(() => null) };
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "manifest.json"), "utf8"));
  let pass = 0, fail = 0;
  for (const entry of manifest) {
    const src = path.join(DIR, entry.file);
    if (!fs.existsSync(src)) { console.log(`SKIP ${entry.file} — missing`); continue; }
    // sips: HEIC→JPEG + ≤1280px longest edge, the app's own intake shape
    const tmp = path.join(os.tmpdir(), "golden-" + entry.file.replace(/[^a-z0-9.]/gi, "") + ".jpg");
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "80", "-Z", "1280", src, "--out", tmp], { stdio: "ignore" });
    const image = fs.readFileSync(tmp).toString("base64");

    const ex = await post("/api/cellar-extract", { image });
    if (!ex.body || ex.status !== 200) { console.log(`FAIL ${entry.file} — extract ${ex.status}`, ex.body); fail++; continue; }
    const f = ex.body.fields || {};
    const rs = await post("/api/cellar-resolve", { terms: f });
    const cands = (rs.body && rs.body.candidates) || [];
    const threshold = (rs.body && rs.body.threshold) || 1;
    const top = cands[0];
    const matched = !!(top && top.score >= threshold);

    const problems = [];
    const want = entry.expect || {};
    for (const k of ["producer", "wine", "vintage"]) {
      if (want[k] && !fold(matched && k !== "vintage" ? top[k] : f[k]).includes(fold(want[k])) &&
          !fold(f[k]).includes(fold(want[k])))
        problems.push(`${k}: read "${f[k]}"${matched && top[k] ? ` / matched "${top[k]}"` : ""} want "${want[k]}"`);
    }
    if (entry.lwin && (!top || top.lwin !== entry.lwin)) problems.push(`lwin: top ${top && top.lwin} want ${entry.lwin}`);
    if (entry.mustMatch === true && !matched) problems.push(`must MATCH but score ${top ? top.score : "—"} < ${threshold}`);
    if (entry.mustMatch === false && matched) problems.push(`must MISS but matched ${top.producer} ${top.wine} @ ${top.score}`);

    const line = `${entry.file}: conf ${ex.body.confidence} · top ${top ? `${top.producer} ${top.wine} @ ${top.score}` : "none"} · route ${matched ? "sheet" : "correction"}`;
    if (problems.length) { console.log("FAIL " + line + "\n  " + problems.join("\n  ")); fail++; }
    else { console.log("pass " + line); pass++; }
  }
  console.log(`GOLDEN SET: ${pass} pass · ${fail} fail`);
  process.exitCode = fail ? 1 : 0;
}

main();
