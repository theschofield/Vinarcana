// ROUND 8 — CONTENT (voice-locked, drawn from the user's pairing framework)
// ARCANA is the single source of truth for the 5 written flows.
// Voice rules: knowing smile · one sly beat · grounded in one true fact ·
// ends on the wine · never judges the drinker. Lens names kept short to scale.

const ARCANA = {
  moon: {
    num: "XVIII", name: "The Moon", challenging: true,
    knowing: "Things are not as they seem tonight. Good — they rarely are.",
    lenses: [
      { n: "I", name: "It won't sit still", whis: "a new face every time you look", nudge: false },
      { n: "II", name: "Drawn by the tides", whis: "farmed by the moon, not the calendar" },
      { n: "III", name: "The beautiful lie", whis: "the nose promises; the truth pours otherwise", nudge: true },
      { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
    ],
    reveal: {
      lens: "III · THE BEAUTIFUL LIE",
      headline: ["You chose misdirection. ", "Wise."],
      wine: "Tyrrell's Vat 1", sub: "SÉMILLON — HUNTER VALLEY",
      body: "Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. Bone-dry, eleven percent, all misdirection. The Moon would approve.",
      stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", COUNTRY: "Australia", NOTES: "Citrus, honey, wax" },
      cellar: "A match sleeps in your cellar — Vat 1, 2014",
    },
  },

  wheel: {
    num: "X", name: "Wheel of Fortune", challenging: false,
    knowing: "Round it goes. Tonight it stopped on you — don't waste the landing.",
    lenses: [
      { n: "I", name: "Many years, one glass", whis: "old vintages folded into now" },
      { n: "II", name: "The endless turn", whis: "the old teaches the young, forever" },
      { n: "III", name: "A fortunate accident", whis: "the forgotten barrel that became a legend" },
      { n: "IV", name: "The turning point", whis: "one arrival changed everything" },
      { n: "V", name: "Forgotten to fashionable", whis: "a region whose luck came back", nudge: true },
    ],
    reveal: {
      lens: "V · FORGOTTEN TO FASHIONABLE",
      headline: ["You chose the comeback. ", "Bold."],
      wine: "Les Terrasses", sub: "ÁLVARO PALACIOS — PRIORAT",
      body: "Priorat was a ghost — emptied villages, abandoned vines — until a few believers bet everything on its black slate. This is that gamble paid out: dark fruit, crushed stone, a region's luck reversed in a single glass.",
      stats: { GRAPE: "Garnacha, Cariñena", STYLE: "Red, old-vine", COUNTRY: "Spain", NOTES: "Black fruit, slate, licorice" },
      cellar: "Nothing in your cellar fits this turn — yet",
    },
  },

  death: {
    num: "XIII", name: "Death", challenging: true,
    knowing: "Something's ending. Don't mourn it — this is the good part.",
    lenses: [
      { n: "I", name: "Born from the burn", whis: "life from the slope that destroyed it" },
      { n: "II", name: "The old ways, reborn", whis: "a dead craft brought back to life" },
      { n: "III", name: "It becomes someone else", whis: "a stranger to itself with age" },
      { n: "IV", name: "A chainsaw to the barrels", whis: "a new hand lets the old estate go", nudge: true },
    ],
    reveal: {
      lens: "IV · A CHAINSAW TO THE BARRELS",
      headline: ["You chose the clean break. ", "About time."],
      wine: "Elio Altare Barolo", sub: "NEBBIOLO — PIEDMONT",
      body: "Altare took a chainsaw to his father's old casks — and was nearly disinherited for it. What grew back is modern Barolo: still Nebbiolo, still Piedmont, rebuilt from the ash. Roses and tar over something brand new.",
      stats: { GRAPE: "Nebbiolo", STYLE: "Red, traditional-modern", COUNTRY: "Italy", NOTES: "Rose, tar, red cherry" },
      cellar: "Nothing of his sleeps in your cellar",
    },
  },

  tower: {
    num: "XVI", name: "The Tower", challenging: true,
    knowing: "Everything you believed just cracked. Finally.",
    lenses: [
      { n: "I", name: "Burn the house down", whis: "the grower who refused the houses" },
      { n: "II", name: "It survived the quake", whis: "a wine that outlived catastrophe" },
      { n: "III", name: "The revelation in steel", whis: "the shift that shattered old taste" },
      { n: "IV", name: "Broke the law, made history", whis: "defied the appellation, exposed its lie", nudge: true },
    ],
    reveal: {
      lens: "IV · BROKE THE LAW, MADE HISTORY",
      headline: ["You chose the rebellion. ", "Naturally."],
      wine: "Tignanello", sub: "ANTINORI — TUSCANY",
      body: "They filed it as a humble table wine — then put Sangiovese in French barrels and Cabernet in the blend, breaking every Chianti rule on the books. It turned out better than the law allowed. The rulebook never recovered.",
      stats: { GRAPE: "Sangiovese blend", STYLE: "Red, Super Tuscan", COUNTRY: "Italy", NOTES: "Black cherry, tobacco, cedar" },
      cellar: "Not in your cellar — this one you hunt for",
    },
  },

  fool: {
    num: "0", name: "The Fool", challenging: false,
    knowing: "You don't know where this goes. That's the entire point.",
    lenses: [
      { n: "I", name: "Bottled mid-leap", whis: "sealed before it finished becoming", nudge: true },
      { n: "II", name: "The road not taken", whis: "a grape you can't pronounce, on purpose" },
      { n: "III", name: "Pure exuberance", whis: "juicy, loud, impossible to resist" },
      { n: "IV", name: "A collective leap of faith", whis: "a place betting on its own future" },
    ],
    reveal: {
      lens: "I · BOTTLED MID-LEAP",
      headline: ["You chose the leap. ", "Of course you did."],
      wine: "Las Jaras Pét-Nat", sub: "SPARKLING — CALIFORNIA",
      body: "Sealed before it finished fermenting, a pét-nat lands however it lands — cloudy, frothy, a little feral. Las Jaras bottles that gamble on purpose. You won't know quite what you've got until it fizzes. That's the thrill.",
      stats: { GRAPE: "Field blend", STYLE: "Pét-nat sparkling", COUNTRY: "USA", NOTES: "Green apple, bread, spritz" },
      cellar: "No leaps waiting in your cellar tonight",
    },
  },
};

const ARCANA_ORDER = ["moon", "wheel", "death", "tower", "fool"];

if (typeof window !== "undefined") window.ARCANA = ARCANA;
if (typeof window !== "undefined") window.ARCANA_ORDER = ARCANA_ORDER;
