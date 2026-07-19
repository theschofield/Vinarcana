// CELLAR — the rack's storage seam (cellar-plan §5.1).
// One swappable object owns every read/write: localStorage today (versioned
// `va-cellar` envelope), the accounts/DB backend in sprint 6. Views never
// touch localStorage directly — replacing this object is the whole migration.
//
// Record shape (the brief's, verbatim — §3.4 holds its DB descendant):
//   { id, addedTs, updatedTs, count,
//     identity: { producer, wine, vintage, source: "matched"|"manual",
//                 matchedId, confidence },
//     facts: { color, style, grapes: [], otherGrapes: [], region, country,
//              abv, appellation },
//     window: { from, to, status },       // computed v0 heuristic, see below
//     tastes, story, stats,               // null until enrichment (S3)
//     labelPhoto,                         // IndexedDB key; manual+unmatched only
//     pairings: [],                       // SYSTEM-SIDE — never rendered here
//     enrichment: { status, ts } }
// · grapes hold ONLY curated list values (sortable facets stay sanitized);
//   user-typed "other" grapes live in otherGrapes and never become filter
//   pills (the brief's open-Q9, resolved: display yes, facet no).

const CellarStore = (() => {
  const KEY = "va-cellar";
  const readEnv = () => {
    try {
      const env = JSON.parse(localStorage.getItem(KEY) || "null");
      if (env && env.v === 1 && Array.isArray(env.wines)) return env;
    } catch (e) {}
    return { v: 1, wines: [] };
  };
  const write = (wines) => { localStorage.setItem(KEY, JSON.stringify({ v: 1, wines })); };

  // duplicate detection: identity match = same producer + wine + vintage,
  // case/space-insensitive (§5.1: duplicate add → count++, zero pipeline)
  const idKey = (identity) => [identity.producer, identity.wine, identity.vintage]
    .map((s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ")).join("·");

  return {
    all() { return readEnv().wines.slice().sort((a, b) => b.addedTs - a.addedTs); },
    get(id) { return readEnv().wines.find((w) => w.id === id) || null; },
    findByIdentity(identity) {
      const k = idKey(identity);
      return readEnv().wines.find((w) => idKey(w.identity) === k) || null;
    },
    add(rec) {
      const wines = readEnv().wines;
      const ts = Date.now();
      const entry = {
        id: "cel-" + ts + "-" + Math.random().toString(36).slice(2, 7),
        addedTs: ts, updatedTs: ts, count: 1,
        tastes: null, story: null, stats: null, labelPhoto: null,
        pairings: [], enrichment: { status: "pending", ts: null },
        ...rec,
      };
      wines.push(entry); write(wines);
      cellarIndexRebuild();
      return entry;
    },
    update(id, patch) {
      const wines = readEnv().wines;
      const i = wines.findIndex((w) => w.id === id);
      if (i < 0) return null;
      wines[i] = { ...wines[i], ...patch, updatedTs: Date.now() };
      write(wines);
      cellarIndexRebuild();
      return wines[i];
    },
    remove(id) {
      write(readEnv().wines.filter((w) => w.id !== id));
      cellarIndexRebuild();
      // retention law (S2): retiring the record retires its label photo —
      // photos exist only for manual+unmatched records that still live
      try { CellarPhotos.del(id); } catch (e) {}
    },
    count() {
      // { wines, bottles } — the header line speaks both numbers
      const list = readEnv().wines;
      return { wines: list.length, bottles: list.reduce((n, w) => n + (w.count || 0), 0) };
    },
    // SYSTEM-SIDE (S4 wires the real index): pips ask per card, the Pour per
    // lens. Count-0 wines never appear — they are hard-deleted (count 0
    // retires the record from rack AND index, no archive).
    pairingsFor(card) {
      const idx = cellarIndexRead();
      return (idx && idx[card]) || {};
    },
  };
})();

// ---------- the pairing index (§5.7 — the phone book, stub until S4) ----------
// Rebuilt on every cellar change (add / retire / count to-from 0), never
// scanned at draw time. S1 records carry no pairings, so the index is an
// empty object — but the rebuild seam and its persistence are live from
// birth so S4 only fills in the mapping.
const CELLAR_INDEX_KEY = "va-cellar-index";
function cellarIndexRebuild() {
  try {
    const idx = {};
    JSON.parse(localStorage.getItem("va-cellar") || "{}").wines?.forEach((w) => {
      if (!w.count || w.count < 1) return;
      (w.pairings || []).forEach((p) => {
        if (!p || !p.card || !p.lens) return;
        (idx[p.card] = idx[p.card] || {})[p.lens] = (idx[p.card][p.lens] || []).concat(w.id);
      });
    });
    localStorage.setItem(CELLAR_INDEX_KEY, JSON.stringify(idx));
  } catch (e) {}
}
function cellarIndexRead() {
  try { return JSON.parse(localStorage.getItem(CELLAR_INDEX_KEY) || "{}"); } catch (e) { return {}; }
}

// ---------- IndexedDB photo sidecar (behind the facade; unused until S2) ----------
// Blobs are wrong for localStorage; label photos (manual + unmatched records
// only) live in `va-cellar-photos`, keyed by the record id. All three calls
// resolve gracefully when IndexedDB is unavailable — the cellar must never
// depend on a photo being there.
const CellarPhotos = (() => {
  const DB = "va-cellar-photos", STORE = "photos";
  const open = () => new Promise((resolve) => {
    try {
      const rq = indexedDB.open(DB, 1);
      rq.onupgradeneeded = () => { rq.result.createObjectStore(STORE); };
      rq.onsuccess = () => resolve(rq.result);
      rq.onerror = () => resolve(null);
    } catch (e) { resolve(null); }
  });
  const tx = (mode, run) => open().then((db) => new Promise((resolve) => {
    if (!db) return resolve(null);
    try {
      const t = db.transaction(STORE, mode);
      const out = run(t.objectStore(STORE));
      t.oncomplete = () => resolve(out && "result" in out ? out.result : null);
      t.onerror = () => resolve(null);
    } catch (e) { resolve(null); }
  }));
  return {
    put(id, blob) { return tx("readwrite", (s) => s.put(blob, id)); },
    get(id) { return tx("readonly", (s) => s.get(id)); },
    del(id) { return tx("readwrite", (s) => s.delete(id)); },
  };
})();

// ---------- drink-window heuristic v0 (client-side, cellar-plan §6 S1) ----------
// A nudge surface, not lab data: style × vintage table, round numbers, no
// false precision. The server-side edition (S3) overrides with LWIN data.
// Returns { from, to, status: "ready"|"resting"|"fading", word } — words per
// the canvas: READY renders NOTHING on rows, RESTING dim, DRINK SOON hollow
// amber; the detail's status chip uses word (REST UNTIL <year> when resting).
const CELLAR_LONG_WHITES = new Set(["riesling", "sémillon", "semillon", "chenin blanc",
  "savagnin", "furmint", "assyrtiko", "chardonnay", "grüner veltliner", "hárslevelű"]);
const CELLAR_LONG_REDS = new Set(["nebbiolo", "cabernet sauvignon", "syrah", "shiraz",
  "aglianico", "sangiovese", "tempranillo", "tannat", "sagrantino", "xinomavro",
  "touriga nacional", "petit verdot", "mourvèdre", "monastrell", "saperavi", "plavac mali"]);

function cellarComputeWindow(rec) {
  const nowY = new Date().getFullYear();
  const type = String((rec.facts && rec.facts.color) || "").toLowerCase();
  const grapes = ((rec.facts && rec.facts.grapes) || []).map((g) => String(g).toLowerCase());
  const vRaw = String((rec.identity && rec.identity.vintage) || "").trim();
  const nv = !/^\d{4}$/.test(vRaw);
  const v = nv ? nowY : parseInt(vRaw, 10);
  let from, to;
  if (nv) {
    // non-vintage: freshness counts from the add, not from a harvest
    from = nowY; to = nowY + (type === "sparkling" ? 3 : 2);
  } else if (type === "rosé") { from = v; to = v + 2; }
  else if (type === "sparkling") { from = v + 1; to = v + 10; }
  else if (type === "orange") { from = v; to = v + 6; }
  else if (type === "fortified" || type === "dessert") { from = v; to = v + 30; }
  else if (type === "white") {
    const long = grapes.some((g) => CELLAR_LONG_WHITES.has(g));
    from = long ? v + 2 : v; to = long ? v + 15 : v + 4;
  } else { // red and unknown
    const long = grapes.some((g) => CELLAR_LONG_REDS.has(g));
    from = long ? v + 4 : v + 1; to = long ? v + 20 : v + 8;
  }
  let status, word;
  if (nowY < from) { status = "resting"; word = "REST UNTIL " + from; }
  else if (nowY >= to - 1) { status = "fading"; word = "DRINK SOON"; }
  else { status = "ready"; word = "READY"; }
  return { from: String(from), to: String(to), status, word };
}

// the row/detail status class: the CSS speaks ready/resting/soon
function cellarWinClass(status) { return status === "fading" ? "soon" : status; }

// ---------- vintage pick list (derived, never curated) ----------
function cellarVintages() {
  const nowY = new Date().getFullYear();
  const out = ["NV"];
  for (let y = nowY; y >= 1940; y--) out.push(String(y));
  return out;
}

// ---------- demo seed (RETIRED from the docs, S2 Jul 19 2026) ----------
// Real capture works now — the seed is no longer a user-facing
// affordance; the function stays for harnesses and dev only.
// Visit once with ?cellar-seed to populate 15 wines from the locked canvas
// mock (types, blends, an off-list grape, ready/resting/drink-soon spread).
// ADDITIVE: wines already in the rack (by identity) are never touched, so
// real records survive a re-seed. Retire them one by one or clear va-cellar.
const CELLAR_DEMO = [
  ["Vilmart & Cie", "Grand Cellier", "NV", "Sparkling", ["Pinot Noir", "Chardonnay"], [], "Champagne", "France", 1],
  ["Turley", "Juvenile Zinfandel", "2022", "Red", ["Zinfandel"], [], "Napa Valley", "USA", 1],
  ["Tyrrell's", "Vat 1 Sémillon", "2014", "White", ["Sémillon"], [], "Hunter Valley", "Australia", 2],
  ["Borgogno", "Barolo Riserva", "2016", "Red", ["Nebbiolo"], [], "Piedmont", "Italy", 1],
  ["Dönnhoff", "Riesling Kabinett", "2022", "White", ["Riesling"], [], "Nahe", "Germany", 4],
  ["Domaine Tempier", "Bandol Rosé", "2024", "Rosé", ["Mourvèdre"], [], "Provence", "France", 2],
  ["López de Heredia", "Viña Tondonia Reserva", "2010", "Red", ["Tempranillo"], [], "Rioja", "Spain", 3],
  ["Gravner", "Ribolla", "2015", "Orange", ["Ribolla Gialla"], [], "Friuli", "Italy", 1],
  ["Ch. de Beaucastel", "Châteauneuf-du-Pape", "2019", "Red", ["Grenache", "Mourvèdre"], [], "Rhône", "France", 2],
  ["Las Jaras", "Pét-Nat", "2023", "Sparkling", [], ["Field blend"], "California", "USA", 2],
  ["Antinori", "Tignanello", "2020", "Red", ["Sangiovese", "Cabernet Sauvignon"], [], "Tuscany", "Italy", 1],
  ["Álvaro Palacios", "Les Terrasses", "2021", "Red", ["Garnacha", "Cariñena"], [], "Priorat", "Spain", 1],
  ["Domaine Macle", "Château-Chalon", "2016", "White", ["Savagnin"], [], "Jura", "France", 1],
  ["Scholium Project", "The Prince in His Caves", "2021", "White", ["Sauvignon Blanc"], [], "California", "USA", 1],
  ["Château Montrose", "Saint-Estèphe", "2023", "Red", ["Cabernet Sauvignon", "Merlot"], [], "Bordeaux", "France", 1],
];
function cellarSeedDemo() {
  let added = 0;
  CELLAR_DEMO.forEach(([producer, wine, vintage, color, grapes, otherGrapes, region, country, count], i) => {
    const identity = { producer, wine, vintage, source: "manual", matchedId: null, confidence: null };
    if (CellarStore.findByIdentity(identity)) return;
    const rec = CellarStore.add({
      identity,
      facts: { color, grapes, otherGrapes, region, country },
      window: null, count,
    });
    // staggered addedTs so the rack reads like a lived-in cellar
    CellarStore.update(rec.id, { window: cellarComputeWindow(rec), addedTs: Date.now() - i * 5 * 86400000 });
    added++;
  });
  return added;
}
try {
  if (/[?&]cellar-seed\b/.test(window.location.search)) {
    const n = cellarSeedDemo();
    console.log("[cellar-seed] added " + n + " demo wines");
  }
} catch (e) {}

if (typeof window !== "undefined") {
  Object.assign(window, { CellarStore, CellarPhotos, cellarComputeWindow, cellarWinClass, cellarVintages, cellarSeedDemo });
}
