// BUILD THE LWIN INDEX — cellar-plan §6 S2 (re-run quarterly on a fresh
// Liv-ex download; new LWINs only ever ADD).
//
//   node scraps/build-lwin-index.js [path/to/LWINdatabase.xlsx]
//
// In:  the LWIN database download (registration + file from
//      https://www.liv-ex.com/lwin/ — Ed downloads; the file itself stays
//      in the gitignored station, never in the repo).
// Out: api/_lwin/lwin.db.gz  — SQLite (FTS5) index, wines only, gzipped
//      api/_lwin/lwin-meta.json — build provenance the function can report
//
// Columns CONFIRMED against the real download Jul 19 2026 (assumption
// §8.2 resolved): LWIN · STATUS · DISPLAY_NAME · PRODUCER_TITLE ·
// PRODUCER_NAME · WINE · COUNTRY · REGION · SUB_REGION · SITE · PARCEL ·
// COLOUR · TYPE · SUB_TYPE · DESIGNATION · CLASSIFICATION ·
// VINTAGE_CONFIG · FIRST_VINTAGE · FINAL_VINTAGE · DATE_ADDED ·
// DATE_UPDATED · REFERENCE. 212,038 rows; LWIN codes are all LWIN-7
// (the WINE level — exactly what identity.matchedId wants).
//
// Filter (measured, not assumed): STATUS = Live (drops Combined/Deleted),
// TYPE ∈ {Wine, Fortified Wine} — keeps Port/Madeira/Sherry (app types),
// drops Spirit/Whiskies/Gin/Beer/Cider/Other/Sake. 185,130 rows kept.
//
// The FTS table tokenizes with unicode61 remove_diacritics 2, so accent-
// blind matching ("gruner" finds Grüner) is the INDEX's job — the resolve
// function never hand-folds strings. No LLM anywhere near this path.
//
// LICENSE DUTY (ships the same sprint as this index — cellar-plan §2.1):
// the app must carry the line
//   "Wine identifiers from Liv-ex's LWIN database (CC BY 4.0), modified"
// (rack foot, both modes). This script only builds the artifact; the
// attribution lives in the app.
//
// Zero npm deps by design (the house rule): the xlsx is unzipped with
// zlib.inflateRawSync and parsed with regex — crude, but the sheet is
// machine-written XML and this runs four times a year on a dev machine.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { DatabaseSync } = require("node:sqlite");

const SRC = process.argv[2] ||
  path.join(__dirname, "..", "claude-code-handoff", "LWINdatabase.xlsx");
const OUT_DIR = path.join(__dirname, "..", "api", "_lwin");

// ---------- minimal xlsx (zip) reader ----------
function unzip(buf) {
  // find End Of Central Directory from the tail
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65558); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error("not a zip: no EOCD");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16); // central directory offset
  const entries = {};
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("bad central entry");
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28);
    const elen = buf.readUInt16LE(p + 30);
    const clen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nlen);
    // the local header carries its own (possibly different) extra length
    const lnlen = buf.readUInt16LE(lho + 26);
    const lelen = buf.readUInt16LE(lho + 28);
    const data = buf.subarray(lho + 30 + lnlen + lelen, lho + 30 + lnlen + lelen + csize);
    entries[name] = { method, data };
    p += 46 + nlen + elen + clen;
  }
  return (name) => {
    const e = entries[name];
    if (!e) return null;
    return e.method === 8 ? zlib.inflateRawSync(e.data) : Buffer.from(e.data);
  };
}

const unent = (s) => s.replace(/&(amp|lt|gt|quot|apos|#x?[0-9a-fA-F]+);/g, (m, c) => {
  if (c === "amp") return "&"; if (c === "lt") return "<"; if (c === "gt") return ">";
  if (c === "quot") return '"'; if (c === "apos") return "'";
  return String.fromCodePoint(parseInt(c[1] === "x" ? c.slice(2) : c.slice(1), c[1] === "x" ? 16 : 10));
});

// <si> blocks may split into rich-text runs — concatenate every <t>
function sharedStrings(xml) {
  const out = [];
  const si = /<si>([\s\S]*?)<\/si>/g;
  let m;
  while ((m = si.exec(xml))) {
    let s = "", t;
    const tt = /<t[^>]*>([\s\S]*?)<\/t>/g;
    while ((t = tt.exec(m[1]))) s += t[1];
    out.push(unent(s));
  }
  return out;
}

const colIndex = (ref) => {
  let n = 0;
  for (let i = 0; i < ref.length; i++) {
    const c = ref.charCodeAt(i);
    if (c < 65 || c > 90) break;
    n = n * 26 + (c - 64);
  }
  return n - 1;
};

function* sheetRows(xml, shared) {
  const rowRe = /<row[^>]*>([\s\S]*?)<\/row>/g;
  let rm;
  while ((rm = rowRe.exec(xml))) {
    const cells = [];
    const cellRe = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g;
    let cm;
    while ((cm = cellRe.exec(rm[1]))) {
      const attrs = cm[1], body = cm[2] || "";
      const r = /r="([A-Z]+)\d+"/.exec(attrs);
      const t = /t="(\w+)"/.exec(attrs);
      if (!r) continue;
      let v = null;
      if (t && t[1] === "inlineStr") {
        const it = /<t[^>]*>([\s\S]*?)<\/t>/.exec(body);
        v = it ? unent(it[1]) : null;
      } else {
        const vv = /<v>([\s\S]*?)<\/v>/.exec(body);
        if (vv) v = (t && t[1] === "s") ? shared[parseInt(vv[1], 10)] : unent(vv[1]);
      }
      cells[colIndex(r[1])] = v;
    }
    yield cells;
  }
}

// ---------- field shaping ----------
const na = (v) => (v == null || v === "" || v === "NA" ? null : String(v).trim());

// LWIN's colour/type vocabulary → the app's type list (cellar-lists):
// sparkling wins over colour; Fortified Wine is its own app type.
function appType(type, subType, colour) {
  if (type === "Fortified Wine") return "Fortified";
  if (subType === "Sparkling") return "Sparkling";
  if (colour === "Red") return "Red";
  if (colour === "White") return "White";
  if (colour === "Rose") return "Rosé";
  return null;
}

// ~26k kept rows have WINE = NA (producer-only labels, e.g. the grand
// vin): the wine line falls back to DISPLAY_NAME minus its producer
// prefix, then classification, then the colour word — never empty.
function wineLine(wine, display, producer, classification, colour) {
  if (wine) return wine;
  if (display) {
    const pfx = producer ? producer + ", " : null;
    if (pfx && display.startsWith(pfx)) return display.slice(pfx.length);
    if (display !== producer) return display;
  }
  return classification || colour || "";
}

// ---------- main ----------
console.log("[lwin] reading " + SRC);
const read = unzip(fs.readFileSync(SRC));
const shared = sharedStrings(read("xl/sharedStrings.xml").toString("utf8"));
console.log("[lwin] shared strings: " + shared.length);
const sheet = read("xl/worksheets/sheet1.xml").toString("utf8");

fs.mkdirSync(OUT_DIR, { recursive: true });
const DB_TMP = path.join(OUT_DIR, "lwin.db.build");
if (fs.existsSync(DB_TMP)) fs.unlinkSync(DB_TMP);
const db = new DatabaseSync(DB_TMP);
db.exec(`
  PRAGMA journal_mode = OFF;
  PRAGMA synchronous = OFF;
  CREATE TABLE wines (
    lwin INTEGER PRIMARY KEY,
    producer TEXT, wine TEXT, display TEXT,
    country TEXT, region TEXT, sub_region TEXT,
    colour TEXT, type TEXT, designation TEXT, classification TEXT
  );
  CREATE VIRTUAL TABLE wines_fts USING fts5(
    producer, wine, extra,
    tokenize = 'unicode61 remove_diacritics 2'
  );
`);
const insW = db.prepare("INSERT OR REPLACE INTO wines VALUES (?,?,?,?,?,?,?,?,?,?,?)");
const insF = db.prepare("INSERT INTO wines_fts (rowid, producer, wine, extra) VALUES (?,?,?,?)");

let header = null, kept = 0, seen = 0;
db.exec("BEGIN");
for (const cells of sheetRows(sheet, shared)) {
  if (!header) {
    header = {};
    cells.forEach((c, i) => { if (c) header[c] = i; });
    continue;
  }
  seen++;
  const g = (k) => na(cells[header[k]]);
  if (g("STATUS") !== "Live") continue;
  const type = g("TYPE");
  if (type !== "Wine" && type !== "Fortified Wine") continue;
  const lwin = parseInt(cells[header["LWIN"]], 10);
  if (!Number.isFinite(lwin)) continue;
  const producer = [g("PRODUCER_TITLE"), g("PRODUCER_NAME")].filter(Boolean).join(" ");
  const display = g("DISPLAY_NAME");
  const classification = g("CLASSIFICATION");
  const colour = g("COLOUR");
  const wine = wineLine(g("WINE"), display, producer, classification, colour);
  const region = g("REGION"), subRegion = g("SUB_REGION"), country = g("COUNTRY");
  const designation = g("DESIGNATION");
  insW.run(lwin, producer, wine, display, country, region, subRegion,
    colour, appType(type, g("SUB_TYPE"), colour), designation, classification);
  insF.run(lwin,
    producer,
    // the display name often carries site/cuvée words the WINE field
    // lacks — index both readings of the wine line
    [wine, display].filter(Boolean).join(" · "),
    [region, subRegion, g("SITE"), designation, classification, country].filter(Boolean).join(" · "));
  kept++;
}
db.exec("COMMIT");
db.exec("INSERT INTO wines_fts(wines_fts) VALUES ('optimize'); VACUUM;");
db.close();

const raw = fs.readFileSync(DB_TMP);
const gz = zlib.gzipSync(raw, { level: 9 });
fs.writeFileSync(path.join(OUT_DIR, "lwin.db.gz"), gz);
fs.unlinkSync(DB_TMP);
const meta = {
  built: new Date().toISOString().slice(0, 10),
  source: path.basename(SRC),
  rows: kept,
  license: "LWIN by Liv-ex, CC BY 4.0 (creativecommons.org/licenses/by/4.0), modified: filtered to wines, normalized fields",
};
fs.writeFileSync(path.join(OUT_DIR, "lwin-meta.json"), JSON.stringify(meta, null, 2) + "\n");
console.log("[lwin] rows seen " + seen + " · kept " + kept);
console.log("[lwin] db " + (raw.length / 1048576).toFixed(1) + " MB · gz " + (gz.length / 1048576).toFixed(1) + " MB");
console.log("[lwin] REMEMBER: the CC BY 4.0 attribution line ships with this sprint.");
