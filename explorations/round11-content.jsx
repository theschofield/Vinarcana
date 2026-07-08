// ROUND 11 — CONTENT v3. Spirit's voice = universal observation + sly acceptance (never says "you").
// Lens subtitle = a statement to agree with that steers specificity (never prescriptive).
// The World (XXI) added as the unseen-card test.

const ARCANA = {
  moon: {
    num: "XVIII", name: "The Moon", file: "moon", challenging: true,
    knowing: "Things are not as they seem tonight. Good — they rarely are.",
    lenses: [
      { n: "I", name: "A shifting face", whis: "never quite the same twice" },
      { n: "II", name: "Drawn by the tide", whis: "pulled by something that can't be seen" },
      { n: "III", name: "The beautiful lie", whis: "the best deceptions never feel like one", nudge: true },
      { n: "IV", name: "Trust the dark", whis: "some things only make sense without the light" },
    ],
    reveal: {
      lens: "III · THE BEAUTIFUL LIE",
      headline: ["You came for misdirection. ", "Wise."],
      wine: "Tyrrell's Vat 1", sub: "SÉMILLON — HUNTER VALLEY",
      body: "The best deceptions never feel like one — and neither does this. Tyrrell's Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying beautifully for twenty years.",
      stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", COUNTRY: "Australia", NOTES: "Citrus, honey, wax" },
      cellar: "A match sleeps in your cellar — Vat 1, 2014",
    },
  },

  wheel: {
    num: "X", name: "Wheel of Fortune", file: "wheel", challenging: false,
    knowing: "The wheel turns for everyone. Tonight, it stopped here.",
    lenses: [
      { n: "I", name: "The sum of it all", whis: "every chapter led to this one" },
      { n: "II", name: "Round it comes again", whis: "the same crossroads, a different season" },
      { n: "III", name: "A lucky break", whis: "some things just land in the right lap" },
      { n: "IV", name: "The turn", whis: "one moment changes the whole story" },
      { n: "V", name: "A comeback", whis: "the best ones are written off first", nudge: true },
    ],
    reveal: {
      lens: "V · A COMEBACK",
      headline: ["The comeback. ", "Bold."],
      wine: "Les Terrasses", sub: "ÁLVARO PALACIOS — PRIORAT",
      body: "The best comebacks start with being written off. Priorat was emptied, forgotten, left for dead — until a few stubborn believers bet everything on its black slate. Palacios' Les Terrasses is that bet paid in full: dark fruit, crushed stone, and the last laugh.",
      stats: { GRAPE: "Garnacha, Cariñena", STYLE: "Red, old-vine", COUNTRY: "Spain", NOTES: "Black fruit, slate, licorice" },
      cellar: "Nothing in your cellar fits this turn — yet",
    },
  },

  death: {
    num: "XIII", name: "Death", file: "death", challenging: true,
    knowing: "All things must come to an end. The interesting part is what comes next.",
    lenses: [
      { n: "I", name: "From the ashes", whis: "the richest soil is always where something burned" },
      { n: "II", name: "Reborn, but different", whis: "what comes back is never quite the same" },
      { n: "III", name: "A stranger in the mirror", whis: "unrecognizable — in the best way" },
      { n: "IV", name: "A clean break", whis: "the old way already had its turn", nudge: true },
    ],
    reveal: {
      lens: "IV · A CLEAN BREAK",
      headline: ["The clean break. ", "About time."],
      wine: "Elio Altare Barolo", sub: "NEBBIOLO — PIEDMONT",
      body: "The old way had its turn — and Elio Altare agreed. He took an actual chainsaw to his father's ancient casks and was nearly disinherited for it. What grew back is modern Barolo: still Nebbiolo, still Piedmont, rebuilt from the ground up. Rose and tar over something brand new.",
      stats: { GRAPE: "Nebbiolo", STYLE: "Red, modern Barolo", COUNTRY: "Italy", NOTES: "Rose, tar, red cherry" },
      cellar: "No Altare sleeps in your cellar",
    },
  },

  tower: {
    num: "XVI", name: "The Tower", file: "tower", challenging: true,
    knowing: "A spectacular downfall. Strange how light one feels in the rubble.",
    lenses: [
      { n: "I", name: "Let it burn", whis: "matter of fact — hand me the match" },
      { n: "II", name: "Still standing", whis: "what should have been the end wasn't" },
      { n: "III", name: "The veil dropped", whis: "once seen, impossible to unsee" },
      { n: "IV", name: "Rules are made to be broken", whis: "the interesting ones always were", nudge: true },
    ],
    reveal: {
      lens: "IV · RULES ARE MADE TO BE BROKEN",
      headline: ["The rebellion. ", "Naturally."],
      wine: "Tignanello", sub: "ANTINORI — TUSCANY",
      body: "The interesting rules always get broken — and Tignanello broke every one Chianti had. Cabernet smuggled into Sangiovese, French oak where it wasn't welcome, filed as a humble table wine. It turned out better than the law allowed. The rulebook never recovered.",
      stats: { GRAPE: "Sangiovese blend", STYLE: "Red, Super Tuscan", COUNTRY: "Italy", NOTES: "Black cherry, tobacco, cedar" },
      cellar: "Not in your cellar — this one gets hunted",
    },
  },

  fool: {
    num: "0", name: "The Fool", file: "fool", challenging: false,
    knowing: "No map, no plan, no safety net. The start of every good story.",
    lenses: [
      { n: "I", name: "Leap first", whis: "the landing figures itself out", nudge: true },
      { n: "II", name: "Off the beaten path", whis: "the good stuff was never on the map" },
      { n: "III", name: "For the hell of it", whis: "no reason needed, no regrets offered" },
      { n: "IV", name: "The long shot", whis: "the safest bet is the one nobody else is making" },
    ],
    reveal: {
      lens: "I · LEAP FIRST",
      headline: ["The leap. ", "Of course."],
      wine: "Las Jaras Pét-Nat", sub: "SPARKLING — CALIFORNIA",
      body: "The landing figures itself out — so does a pét-nat, sealed mid-ferment and left to finish on instinct. Las Jaras bottles that gamble on purpose: cloudy, frothy, a little feral, never the same twice. Jump.",
      stats: { GRAPE: "Field blend", STYLE: "Pét-nat sparkling", COUNTRY: "USA", NOTES: "Green apple, bread, spritz" },
      cellar: "No leaps waiting in your cellar tonight",
    },
  },

  hermit: {
    num: "IX", name: "The Hermit", file: "hermit", challenging: false,
    knowing: "Silence has a way of saying more than the room ever did.",
    lenses: [
      { n: "I", name: "Alone with it", whis: "some things only surface in the quiet" },
      { n: "II", name: "No rush tonight", whis: "the best things never hurry" },
      { n: "III", name: "Off the map", whis: "the good stuff was never where the crowd went" },
      { n: "IV", name: "Nothing easy", whis: "what's earned is always worth more", nudge: true },
    ],
    reveal: {
      lens: "IV · NOTHING EASY",
      headline: ["The hard road. ", "Good."],
      wine: "Vin Jaune", sub: "SAVAGNIN — JURA",
      body: "What's earned is always worth more — and Vin Jaune earns every sip. Six years under a veil of yeast, going nowhere, becoming something most palates can't follow: walnut, curry, bruised apple. It gives up its secrets slowly. Or not at all.",
      stats: { GRAPE: "Savagnin", STYLE: "Oxidative, under veil", COUNTRY: "France", NOTES: "Walnut, curry, apple" },
      cellar: "A lone bottle waits in your cellar — Vin Jaune, 2016",
    },
  },

  world: {
    num: "XXI", name: "The World", file: "world", challenging: false,
    knowing: "A full circle. Not the end — just the view from the top of one.",
    lenses: [
      { n: "I", name: "The whole picture", whis: "every piece finally in its place" },
      { n: "II", name: "Earned, not given", whis: "the kind of triumph that took the long way" },
      { n: "III", name: "A world unto itself", whis: "built from so many parts it became its own thing", nudge: true },
      { n: "IV", name: "The arrival", whis: "the journey ends where it was always heading" },
    ],
    reveal: {
      lens: "III · A WORLD UNTO ITSELF",
      headline: ["The whole, greater than its parts. ", "Rare."],
      wine: "Château de Beaucastel", sub: "CHÂTEAUNEUF-DU-PAPE",
      body: "Built from so many parts it became its own thing — Beaucastel blends up to thirteen grape varieties into a single wine that tastes like none of them and all of them. Spice, leather, dark fruit, and the unmistakable sense of a place that has been getting this right for centuries.",
      stats: { GRAPE: "13-variety blend", STYLE: "Red, Southern Rhône", COUNTRY: "France", NOTES: "Spice, leather, dark fruit" },
      cellar: "Nothing this complete in your cellar — yet",
    },
  },
};

const ARCANA_ORDER = ["moon", "wheel", "death", "tower", "fool", "hermit", "world"];

if (typeof window !== "undefined") { window.ARCANA = ARCANA; window.ARCANA_ORDER = ARCANA_ORDER; }
