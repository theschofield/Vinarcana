// MEMORY — the journal's storage seam.
// One swappable object owns every read/write: localStorage today, the
// accounts/DB backend later. Views never touch localStorage directly —
// replacing this object is the whole migration.
//
// Entry shape (the first table of the coming database):
//   { id, ts, card, lens, wine, sub: [GRAPE, REGION], bottle, jot, hearted }
// · card is the ARCANA id; display fields (numeral, name, art) resolve from
//   ARCANA at render so content fixes flow through automatically.
// · lens is the lens numeral ("I".."V") — never SHOWN in Memory, but it is
//   the exact key needed to re-enter The Pour on the right pane.
// · jot is prefilled by the deck at keep-time (see memoryJotFor), then
//   user-owned via swipe → EDIT.

const MemoryStore = (() => {
  const KEY = "va-memory";
  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  };
  const write = (list) => { localStorage.setItem(KEY, JSON.stringify(list)); };
  return {
    all() { return read().sort((a, b) => b.ts - a.ts); },
    add(e) {
      const list = read();
      const entry = { id: "mem-" + e.ts + "-" + Math.random().toString(36).slice(2, 7), hearted: false, ...e };
      list.push(entry); write(list);
      return entry;
    },
    update(id, patch) {
      const list = read();
      const i = list.findIndex((e) => e.id === id);
      if (i < 0) return null;
      list[i] = { ...list[i], ...patch }; write(list);
      return list[i];
    },
    remove(id) { write(read().filter((e) => e.id !== id)); },
    count() { return read().length; },
  };
})();

// ---------- the deck's jot prefill ----------
// Resolution order:
// 1. pour.jot — the content pipeline's field, once a jot layer is written.
// 2. MEMORY_JOTS[wine] — the lines locked on the Memory Final canvas.
// 3. A punchline distilled from the pour's own approved blurb (reveal bodies
//    end on the bottle with a sly beat — the last well-sized sentence IS the
//    jot). Mechanical reuse of approved content, never new writing.
const MEMORY_JOTS = {
  "Tyrrell's Vat 1": "Tasted of oak it never touched. I checked twice.",
  "Morgon, Lapierre": "Poured like a whisper, landed like a speech.",
  "Turley Zinfandel": "The second glass was always coming.",
  "Elio Altare Barolo": "An ending worth raising a glass to.",
  "Vin Jaune": "Six years under a veil. Worth every one.",
  "Las Jaras Pét-Nat": "A little feral. Never the same twice.",
  "Tignanello": "Better than the law allowed.",
  "Didier Dagueneau Silex": "It tasted like the stone it grew from.",
  "Les Terrasses": "Written off, then the comeback.",
  "Château de Beaucastel": "Thirteen grapes. All of them and none.",
};

function memoryJotFor(pour) {
  if (!pour) return "";
  if (pour.jot) return pour.jot;
  if (MEMORY_JOTS[pour.wine]) return MEMORY_JOTS[pour.wine];
  const parts = (pour.body || "").match(/[^.!?]+[.!?]+/g) || [];
  let last = "";
  for (let i = parts.length - 1; i >= 0; i--) {
    const s = parts[i].trim();
    if (!last) last = s;                       // the final sentence, whatever its size
    if (s.length >= 18 && s.length <= 80) return s;  // first well-sized punchline from the end
  }
  if (last) return last;
  return pour.stats && pour.stats.NOTES ? pour.stats.NOTES + "." : "";
}

// ---------- display helpers ----------
// The ledger's GRAPE · REGION line, shortened the way the canvas mocks were:
// first grape only; region without producer or country.
const MEMORY_COUNTRIES = new Set([
  "FRANCE", "ITALY", "SPAIN", "PORTUGAL", "GERMANY", "AUSTRIA", "HUNGARY",
  "GREECE", "SLOVENIA", "CROATIA", "GEORGIA", "SWITZERLAND", "LEBANON",
  "USA", "AUSTRALIA", "NEW ZEALAND", "SOUTH AFRICA", "ARGENTINA", "CHILE",
]);
function memorySubLine(sub) {
  if (!sub || !sub.length) return "";
  const grape = String(sub[0]).split(/[·,]/)[0].trim();
  const parts = String(sub[1] || "").split(",").map((s) => s.trim()).filter(Boolean);
  let region = parts[parts.length - 1] || "";
  if (parts.length > 1 && MEMORY_COUNTRIES.has(region.toUpperCase())) region = parts[parts.length - 2];
  return region ? grape + " · " + region : grape;
}

// ---------- one-time migration ----------
// Pours kept before Memory shipped live only in the va-pulls raw log; fold
// them into the journal so nobody opens an empty page they already wrote in.
function migrateMemoryFromPulls() {
  if (localStorage.getItem(KEY_MIGRATED)) return;
  localStorage.setItem(KEY_MIGRATED, "1");
  if (MemoryStore.count() > 0) return;
  let pulls;
  try { pulls = JSON.parse(localStorage.getItem("va-pulls") || "[]"); } catch (e) { pulls = []; }
  pulls.filter((p) => p.kept && p.card && p.wine && window.ARCANA && ARCANA[p.card]).forEach((p) => {
    let pour = null;
    const byLens = (window.POURS || {})[p.card] || {};
    Object.values(byLens).forEach((arr) => (arr || []).forEach((x) => { if (!pour && x.wine === p.wine) pour = x; }));
    const lensObj = (ARCANA[p.card].lenses || []).find((l) => l.name === p.lens);
    MemoryStore.add({
      ts: p.ts || Date.now(),
      card: p.card,
      lens: lensObj ? lensObj.n : null,
      wine: p.wine,
      sub: pour ? pour.sub : ["", ""],
      bottle: (pour && pour.bottle) || "assets/bottle-red.png",
      jot: memoryJotFor(pour || { wine: p.wine }),
      hearted: false,
    });
  });
}
const KEY_MIGRATED = "va-memory-migrated";

if (typeof window !== "undefined") {
  Object.assign(window, { MemoryStore, memoryJotFor, memorySubLine, migrateMemoryFromPulls });
}
