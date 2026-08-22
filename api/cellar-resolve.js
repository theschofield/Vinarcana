// /api/cellar-resolve — the rack lookup (cellar-plan §3.2, §2.1).
// Query terms in → ranked LWIN candidates + match score. NO LLM in this
// path, ever: the index is scraps/build-lwin-index.js's SQLite FTS5
// artifact (LWIN by Liv-ex, CC BY 4.0, modified — filtered to wines,
// normalized fields), bundled privately in api/_lwin/ and $0 per lookup
// forever. The FTS tokenizer (unicode61 remove_diacritics 2) does the
// accent-blind matching; a small JS re-score does the judgment calls
// (producer agreement, exact numeric tokens like "Vat 1", region hints).
//
// The gzipped db inflates to /tmp on cold start (~60MB; warm instances
// reuse it). node:sqlite ships with Vercel's Node 22+ runtime — if the
// runtime predates it, we answer 501 and the client treats the add as a
// miss (correction path, manual-first — usable by design).
//
// The confidence threshold is a CONFIG VALUE, not a commitment (§5.8):
// CELLAR_MATCH_THRESHOLD tunes the sheet-vs-correction routing without a
// deploy; every identify emits cellar_identify so tuning is a SQL query.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { cellarGuard } = require("./_lib/cellar-guards.js");
const { normalizeProducer, wineName } = require("./_lib/cellar-names.js");

const GZ = path.join(__dirname, "_lwin", "lwin.db.gz");
const TMP = "/tmp/va-lwin.db";

let db = null;
let dbError = null;
function openDb() {
  if (db || dbError) return;
  try {
    const { DatabaseSync } = require("node:sqlite");
    if (!fs.existsSync(TMP) || fs.statSync(TMP).size < 1000000) {
      fs.writeFileSync(TMP, zlib.gunzipSync(fs.readFileSync(GZ)));
    }
    db = new DatabaseSync(TMP, { readOnly: true });
  } catch (e) { dbError = e; }
}

// accent-blind lowercase fold for the JS re-score (the FTS side folds
// via its tokenizer; this mirrors it for candidate-string comparison).
// Apostrophes DELETE rather than split ("Tyrrell's" and a label-read
// "Tyrrells" must land on the same token) — sim-caught: the split cost a
// perfect Vat 1 read 0.47 of score and mis-routed it to correction.
const fold = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "");
const tokens = (s) => (fold(s).match(/[a-z0-9]+/g) || []);
// stopwords that only blur wine matching (the label reader loves them)
const STOP = new Set(["the", "of", "de", "la", "le", "les", "du", "des", "di", "e", "el",
  "wine", "wines", "estate", "vineyard", "vineyards", "winery"]);
const keep = (ts) => ts.filter((t) => !STOP.has(t));

function ftsQuery(ts, joiner) {
  return ts.map((t) => '"' + t + '"').join(joiner);
}

function candidatesFor(pTok, wTok) {
  const all = [...pTok, ...wTok];
  if (!all.length) return [];
  const seen = new Map();
  const run = (match, limit) => {
    try {
      const rows = db.prepare(
        "SELECT w.lwin, w.producer, w.wine, w.display, w.country, w.region, w.sub_region, " +
        "w.colour, w.type, w.designation, w.classification, bm25(wines_fts, 4.0, 2.0, 1.0) AS s " +
        "FROM wines_fts f JOIN wines w ON w.lwin = f.rowid " +
        "WHERE wines_fts MATCH ? ORDER BY s LIMIT ?"
      ).all(match, limit);
      rows.forEach((r) => { if (!seen.has(r.lwin)) seen.set(r.lwin, r); });
    } catch (e) {} // an unparseable MATCH never 500s a lookup
  };
  run(ftsQuery(all, " AND "), 24);              // precise first
  if (seen.size < 8 && pTok.length && wTok.length)
    run(ftsQuery(pTok, " AND ") + " AND (" + ftsQuery(wTok, " OR ") + ")", 24);
  if (seen.size < 8) run(ftsQuery(all, " OR "), 40); // wide net for the re-score
  return [...seen.values()];
}

// the judgment layer: fraction of query tokens found in the candidate,
// weighted toward the producer, with exact-numeral and geography bonuses
function score(cand, pTok, wTok, terms) {
  const candP = new Set(tokens(cand.producer));
  const candW = new Set(tokens((cand.wine || "") + " " + (cand.display || "")));
  const candAll = new Set([...candP, ...candW]);
  const hit = (set, ts) => (ts.length ? ts.filter((t) => set.has(t)).length / ts.length : 0);
  let s = 0;
  s += 0.45 * (pTok.length ? hit(candAll, pTok) : 0.2);
  s += 0.45 * (wTok.length ? hit(candAll, wTok) : 0.2);
  // every producer token landing IN the producer field is the strongest tell
  if (pTok.length && pTok.every((t) => candP.has(t))) s += 0.1;
  // numeric tokens must match exactly somewhere (Vat 1 ≠ Vat 47)
  const nums = [...pTok, ...wTok].filter((t) => /^\d+$/.test(t) && t.length < 4);
  if (nums.length && !nums.every((t) => candAll.has(t))) s -= 0.25;
  // the read TYPE disambiguates same-name siblings (Rouge vs Blanc)
  if (terms.type && cand.type) {
    if (fold(terms.type) === fold(cand.type)) s += 0.05; else s -= 0.15;
  }
  // soft geography agreement/disagreement
  const geo = fold([cand.region, cand.sub_region, cand.country].filter(Boolean).join(" "));
  const tGeo = keep(tokens([terms.region, terms.country].filter(Boolean).join(" ")));
  if (tGeo.length) {
    const g = tGeo.filter((t) => geo.includes(t)).length / tGeo.length;
    s += 0.08 * g - (g === 0 ? 0.05 : 0);
  }
  return Math.max(0, Math.min(1, s));
}

module.exports = async (req, res) => {
  const blocked = await cellarGuard(req, { costed: false });
  if (blocked) { res.status(blocked.status).json(blocked.body); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const terms = (body && body.terms && typeof body.terms === "object") ? body.terms : null;
  if (!terms) { res.status(400).json({ error: "no terms" }); return; }

  openDb();
  if (!db) {
    res.status(501).json({ error: "resolve unavailable", detail: String((dbError && dbError.message) || "no db") });
    return;
  }

  const pTok = keep(tokens(terms.producer)).slice(0, 8);
  const wTok = keep(tokens(terms.wine)).slice(0, 10);
  const ranked = candidatesFor(pTok, wTok)
    .map((c) => ({ c, s: score(c, pTok, wTok, terms) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 6);

  const threshold = Math.max(0, Math.min(1, parseFloat(process.env.CELLAR_MATCH_THRESHOLD || "0.72")));
  res.status(200).json({
    threshold,
    // display names per D24: the producer is the house behind a merchant
    // label, the wine line derives from DISPLAY_NAME (never the raw WINE
    // column) — scoring above still ran on the raw tokens
    candidates: ranked.map(({ c, s }) => ({
      lwin: c.lwin,
      producer: normalizeProducer(c.producer).producer,
      bottler: normalizeProducer(c.producer).bottler,
      wine: wineName(c),
      display: c.display,
      country: c.country,
      region: c.region,
      subRegion: c.sub_region,
      colour: c.colour,
      type: c.type,
      designation: c.designation,
      classification: c.classification,
      score: Math.round(s * 1000) / 1000,
    })),
  });
};
