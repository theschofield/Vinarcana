// Display-name rules for LWIN rows (cellar-plan §0 D24 — Ed's verdicts on
// the reckoning audit's C17/C20). Pure functions, zero deps; the resolve
// function applies them to every candidate it returns, so the client
// never sees LWIN's raw WINE column (which is a bare colour word for
// ~8,300 rows: "Rouge", "Blanc", "Brut"…). Runtime derivation by design:
// no index rebuild and no maintenance as new LWINs arrive — DISPLAY_NAME
// always carries the full name, and these rules only ever subtract.

const COLOUR_WORDS = new Set(["rouge", "blanc", "rose", "red", "white", "bianco", "rosso",
  "tinto", "blanco", "branco", "brut", "rot", "weiss"]);
// Bordeaux/Burgundy classification phrases — a closed vocabulary, not a list
// that grows with the catalog
const CLASS_RE = /^(?:(?:grand|premier|deuxieme|troisieme|quatrieme|cinquieme|\d+(?:er|eme|e))\s+)?(?:grand\s+)?cru(?:\s+classe)?(?:\s+[ab])?$/;

// accent-blind and apostrophe-blind ("Tyrrell's" must match "Tyrrells")
const fold = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "").trim();

// LWIN writes "Label or merchant (the house behind it)". Ed's rule (D24):
// the producer line is the house in the parentheses; the outer name is
// kept as the bottler/label.
function normalizeProducer(raw) {
  const s = String(raw || "").trim();
  const m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(s);
  if (m && m[2].trim()) return { producer: m[2].trim(), bottler: m[1].trim() || null };
  return { producer: s, bottler: null };
}

// The wine's display name: DISPLAY_NAME minus the producer, minus trailing
// geography/designation the UI already shows elsewhere, never a bare
// colour word on its own, never just a classification.
function wineName(row) {
  const rawProducer = String(row.producer || "").trim();
  const { producer } = normalizeProducer(rawProducer);
  let rest = String(row.display || "").trim();
  for (const p of [rawProducer, producer]) {
    if (p && fold(rest).startsWith(fold(p))) { rest = rest.slice(p.length).replace(/^[\s,]+/, ""); break; }
  }
  let segs = rest.split(",").map((s) => s.trim()).filter(Boolean);
  const dup = new Set([row.region, row.sub_region, row.country, row.designation].filter(Boolean).map(fold));
  while (segs.length > 1 && dup.has(fold(segs[segs.length - 1]))) segs.pop();
  let name = segs.join(", ");
  const f = fold(name);
  const isClass = (x) => (row.classification && x === fold(row.classification)) || CLASS_RE.test(x);
  if (!name || isClass(f)) return producer;
  if (COLOUR_WORDS.has(f)) return producer + " " + name;
  // "Rouge Cru Classe" — a colour word followed by a classification phrase
  const first = f.split(/\s+/)[0];
  if (COLOUR_WORDS.has(first) && isClass(f.slice(first.length).trim())) return producer + " " + name.split(/\s+/)[0];
  return name;
}

module.exports = { normalizeProducer, wineName, COLOUR_WORDS };
