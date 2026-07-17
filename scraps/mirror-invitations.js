// Mirrors content/invitations.csv (APPROVED rows only) into the INVITES2 block of
// explorations/flow2-app.jsx. *span* markup becomes { i: true } segments; italics may sit
// anywhere in the line. Companion to mirror-voices.js / mirror-guidebook.js — the CSV is the
// source of truth; never hand-edit the mirrored block.
// Run: node scraps/mirror-invitations.js
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

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

// "The cards have been *talking* about you." -> [{t:"The cards have been "},{t:"talking",i:true},{t:" about you."}]
function toSegments(line) {
  const stars = (line.match(/\*/g) || []).length;
  if (stars % 2 !== 0) throw new Error("Unbalanced * markup in: " + line);
  const segs = [];
  line.split(/(\*[^*]+\*)/).forEach((piece) => {
    if (!piece) return;
    if (piece.startsWith("*") && piece.endsWith("*")) segs.push({ t: piece.slice(1, -1), i: true });
    else segs.push({ t: piece });
  });
  return segs;
}

const csv = parseCsv(fs.readFileSync(path.join(root, "content/invitations.csv"), "utf8"));
const header = csv.shift();
const iStatus = header.indexOf("status"), iText = header.indexOf("invitation");
const approved = csv.filter((r) => r[iStatus] === "approved");

const lines = approved.map((r) => {
  const segs = toSegments(r[iText]);
  const body = segs
    .map((s) => "{ t: " + JSON.stringify(s.t) + (s.i ? ", i: true" : "") + " }")
    .join(", ");
  return "  [" + body + "],";
});

const block =
  "// Invitations — GENERATED from content/invitations.csv by scraps/mirror-invitations.js\n" +
  "// (approved rows only; *span* markup becomes { i: true } segments). Do not hand-edit.\n" +
  "const INVITES2 = [\n" + lines.join("\n") + "\n];";

const appPath = path.join(root, "explorations/flow2-app.jsx");
let src = fs.readFileSync(appPath, "utf8");
const re = /\/\/ Invitations —[\s\S]*?const INVITES2 = \[[\s\S]*?\n\];/;
if (!re.test(src)) { console.error("INVITES2 block not found in flow2-app.jsx"); process.exit(1); }
src = src.replace(re, block);
fs.writeFileSync(appPath, src);

// verify round-trip: re-extract and compare against the CSV
const out = fs.readFileSync(appPath, "utf8").match(/const INVITES2 = \[([\s\S]*?)\n\];/)[1];
const emitted = eval("[" + out + "]");
let bad = 0;
approved.forEach((r, idx) => {
  const want = toSegments(r[iText]);
  const got = emitted[idx];
  if (JSON.stringify(want) !== JSON.stringify(got)) { console.error("MISMATCH:", r[iText]); bad++; }
});
console.log("mirrored", approved.length, "approved invitations;", csv.length - approved.length, "draft/pending held back");
console.log(bad === 0 ? "verify: all approved invitations round-trip" : "verify FAILED: " + bad);
process.exit(bad === 0 ? 0 : 1);
