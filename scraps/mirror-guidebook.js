// Mirror content/guidebook.csv → explorations/arcana-guide.js (build-side task).
// Bodies ship even as drafts (user verdict in content/guidebook-prompt.md);
// closings ship only when written, and the fixed line/button are UI constants.
// Run: node scraps/mirror-guidebook.js
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

// ---- card name → ARCANA id ----
const dataSrc = fs.readFileSync(path.join(root, "explorations/arcana-data.js"), "utf8");
const m = dataSrc.match(/window\.ARCANA = (\{[\s\S]*?\n\});/);
if (!m) throw new Error("ARCANA not found");
const ARCANA = eval("(" + m[1] + ")");
const idByName = {};
Object.keys(ARCANA).forEach((id) => { idByName[ARCANA[id].name.toLowerCase()] = id; });

// ---- tiny CSV parser (quoted fields, embedded commas/newlines/quotes) ----
function parseCSV(text) {
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); field = ""; if (row.some((f) => f !== "")) rows.push(row); row = []; }
    else if (ch !== "\r") field += ch;
  }
  if (field !== "" || row.length) { row.push(field); if (row.some((f) => f !== "")) rows.push(row); }
  return rows;
}

const csv = parseCSV(fs.readFileSync(path.join(root, "content/guidebook.csv"), "utf8"));
const head = csv[0];
const col = (name) => head.indexOf(name);
["card", "keywords", "meaning_1", "meaning_2", "reading_1", "reading_2", "closing_para"].forEach((c) => {
  if (col(c) < 0) throw new Error("missing column " + c);
});

const esc = (s) => JSON.stringify(String(s || "").trim());
const entries = [];
let closings = 0, missing = [];
for (let i = 1; i < csv.length; i++) {
  const r = csv[i];
  const name = (r[col("card")] || "").trim();
  const id = idByName[name.toLowerCase()];
  if (!id) { missing.push(name); continue; }
  const kws = (r[col("keywords")] || "").split("|").map((k) => k.trim()).filter(Boolean);
  const closing = (r[col("closing_para")] || "").trim();
  if (closing) closings++;
  entries.push(
    "  " + id + ": {\n" +
    "    surface: \"The Guidebook\",\n" +
    "    keywords: [" + kws.map(esc).join(", ") + "],\n" +
    "    meaning: { label: \"What the card means\", paras: [" + esc(r[col("meaning_1")]) + ", " + esc(r[col("meaning_2")]) + "] },\n" +
    "    reading: { label: \"As a reading\", paras: [" + esc(r[col("reading_1")]) + ", " + esc(r[col("reading_2")]) + "] },\n" +
    (closing
      ? "    closing: { label: \"Before you return\", para: " + esc(closing) + ", line: \"Turn toward the one that knows you.\" },\n"
      : "") +
    "  },"
  );
}
if (missing.length) throw new Error("unmapped card names: " + missing.join("; "));

const out =
"// DEEPER READING — the guidebook content registry, keyed by ARCANA id.\n" +
"// GENERATED from content/guidebook.csv by scraps/mirror-guidebook.js —\n" +
"// do not hand-edit; refine rows through the content pipeline\n" +
"// (content/guidebook-prompt.md) and re-run the mirror.\n" +
"// Bodies ship even as drafts (user verdict); closings appear as the lens\n" +
"// refinement lands. The closing line and TURN THE CARD BACK are fixed.\n" +
"\n" +
"const GUIDES = {\n" + entries.join("\n") + "\n};\n" +
"\nif (typeof window !== \"undefined\") { window.GUIDES = GUIDES; }\n";

fs.writeFileSync(path.join(root, "explorations/arcana-guide.js"), out);
console.log("wrote " + entries.length + " guides (" + closings + " with closings) to explorations/arcana-guide.js");
