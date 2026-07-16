// Mirrors content/spirit-voices.csv into explorations/arcana-data.js (the "knowing" field only).
// Companion to scraps/mirror-guidebook.js — the CSV is the source of truth; never hand-edit
// the mirrored values in arcana-data.js.
// Run: node scraps/mirror-voices.js
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

// --- minimal CSV parser (quoted fields, "" escapes, LF/CRLF) ---
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const csv = parseCsv(fs.readFileSync(path.join(root, "content/spirit-voices.csv"), "utf8"));
const header = csv.shift();
const col = (name) => header.indexOf(name);
const iCard = col("card"), iStatus = col("status"), iVoice = col("spirit_voice");

const dataPath = path.join(root, "explorations/arcana-data.js");
let src = fs.readFileSync(dataPath, "utf8");

let patched = 0, skipped = [], missing = [];
for (const r of csv) {
  const card = r[iCard], status = r[iStatus], voice = r[iVoice];
  if (status !== "approved") { skipped.push(card + " (" + status + ")"); continue; }
  // Anchor on the card object's own "name" line, then the nearest following "knowing".
  const re = new RegExp(
    '("name": ' + JSON.stringify(card).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
    ',[\\s\\S]*?"knowing": )"(?:[^"\\\\]|\\\\.)*"'
  );
  if (!re.test(src)) { missing.push(card); continue; }
  src = src.replace(re, "$1" + JSON.stringify(voice));
  patched++;
}

fs.writeFileSync(dataPath, src);
console.log("patched:", patched, "of", csv.length);
if (skipped.length) console.log("skipped (not approved):", skipped.join("; "));
if (missing.length) { console.error("NOT FOUND in arcana-data.js:", missing.join("; ")); process.exit(1); }

// --- verify: eval the result and compare every approved voice ---
global.window = {};
eval(fs.readFileSync(dataPath, "utf8"));
const byName = {};
for (const k of Object.keys(window.ARCANA)) byName[window.ARCANA[k].name] = window.ARCANA[k].knowing;
let bad = 0;
for (const r of csv) {
  if (r[iStatus] !== "approved") continue;
  if (byName[r[iCard]] !== r[iVoice]) { console.error("MISMATCH:", r[iCard]); bad++; }
}
console.log(bad === 0 ? "verify: all approved voices match the CSV" : "verify FAILED: " + bad + " mismatches");
process.exit(bad === 0 ? 0 : 1);
