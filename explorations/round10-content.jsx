// ROUND 10 — CONTENT v2. Spirit's voice = observational bar-stranger (never narrating AT you).
// Lens = an invitation written as if by someone you'd be joining (no wine words, ever).
// Examples from the user taught the PRINCIPLE; these are written fresh from the framework.

const ARCANA = {
  moon: {
    num: "XVIII", name: "The Moon", file: "moon", challenging: true,
    knowing: "Things are not as they seem tonight. Good — they rarely are.",
    lenses: [
      { n: "I", name: "A shifting face", whis: "you'd swear it's someone new each time you look" },
      { n: "II", name: "Drawn by the tide", whis: "pulled by something you can't see" },
      { n: "III", name: "The beautiful lie", whis: "nothing tonight is quite what it claims", nudge: true },
      { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
    ],
    reveal: {
      lens: "III · THE BEAUTIFUL LIE",
      headline: ["You came for misdirection. ", "Wise."],
      wine: "Tyrrell's Vat 1", sub: "SÉMILLON — HUNTER VALLEY",
      body: "You weren't after honesty tonight — you wanted something playing a part. So is this: Tyrrell's Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying beautifully for twenty years.",
      stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", COUNTRY: "Australia", NOTES: "Citrus, honey, wax" },
      cellar: "A match sleeps in your cellar — Vat 1, 2014",
    },
  },

  wheel: {
    num: "X", name: "Wheel of Fortune", file: "wheel", challenging: false,
    knowing: "The wheel turns for everyone. Tonight it turned for you.",
    lenses: [
      { n: "I", name: "The sum of it all", whis: "everything you've been through led right here" },
      { n: "II", name: "Round it comes again", whis: "you've stood in this spot before" },
      { n: "III", name: "A lucky break", whis: "you didn't earn this one — no need to" },
      { n: "IV", name: "The turn", whis: "one moment, and the whole story changes" },
      { n: "V", name: "Your comeback", whis: "they counted you out too soon", nudge: true },
    ],
    reveal: {
      lens: "V · YOUR COMEBACK",
      headline: ["You backed the comeback. ", "Bold."],
      wine: "Les Terrasses", sub: "ÁLVARO PALACIOS — PRIORAT",
      body: "Anyone who counted you out should meet Priorat — emptied, forgotten, left for dead, until a few stubborn believers bet everything on its black slate. Palacios' Les Terrasses is that bet paid in full: dark fruit, crushed stone, and the last laugh.",
      stats: { GRAPE: "Garnacha, Cariñena", STYLE: "Red, old-vine", COUNTRY: "Spain", NOTES: "Black fruit, slate, licorice" },
      cellar: "Nothing in your cellar fits this turn — yet",
    },
  },

  death: {
    num: "XIII", name: "Death", file: "death", challenging: true,
    knowing: "Something is ending tonight. The good things always make room that way.",
    lenses: [
      { n: "I", name: "From the ashes", whis: "what burned cleared the way" },
      { n: "II", name: "Reborn, but older", whis: "what you buried comes back changed" },
      { n: "III", name: "A stranger to yourself", whis: "the old you wouldn't know this one" },
      { n: "IV", name: "A clean break", whis: "no looking back this time", nudge: true },
    ],
    reveal: {
      lens: "IV · A CLEAN BREAK",
      headline: ["You chose the clean break. ", "About time."],
      wine: "Elio Altare Barolo", sub: "NEBBIOLO — PIEDMONT",
      body: "You're ready to leave the old version behind for good. So was Elio Altare, who took an actual chainsaw to his father's ancient casks and was nearly disinherited for it. What grew back is modern Barolo — rose and tar over something brand new.",
      stats: { GRAPE: "Nebbiolo", STYLE: "Red, modern Barolo", COUNTRY: "Italy", NOTES: "Rose, tar, red cherry" },
      cellar: "No Altare sleeps in your cellar",
    },
  },

  tower: {
    num: "XVI", name: "The Tower", file: "tower", challenging: true,
    knowing: "It all came down at last. Strange how light a person feels in the rubble.",
    lenses: [
      { n: "I", name: "Let it burn", whis: "matter of fact — hand me the match" },
      { n: "II", name: "Still standing", whis: "what should've wrecked you didn't" },
      { n: "III", name: "The veil dropped", whis: "you can't unsee it now" },
      { n: "IV", name: "Rules are made to be broken", whis: "who was following them anyway?", nudge: true },
    ],
    reveal: {
      lens: "IV · RULES ARE MADE TO BE BROKEN",
      headline: ["You chose the rebellion. ", "Naturally."],
      wine: "Tignanello", sub: "ANTINORI — TUSCANY",
      body: "You'd rather make your mark and let the rulebook catch fire. Tignanello did exactly that — smuggling Cabernet into Sangiovese, French oak into Chianti, breaking every law on the books and outclassing all of them. Nobody rewrote the rules. They just stopped pretending they mattered.",
      stats: { GRAPE: "Sangiovese blend", STYLE: "Red, Super Tuscan", COUNTRY: "Italy", NOTES: "Black cherry, tobacco, cedar" },
      cellar: "Not in your cellar — this one you hunt",
    },
  },

  fool: {
    num: "0", name: "The Fool", file: "fool", challenging: false,
    knowing: "You don't know where this leads. That's where every good story starts.",
    lenses: [
      { n: "I", name: "Leap first", whis: "you'll find the ground on the way down", nudge: true },
      { n: "II", name: "The road less mapped", whis: "everyone went left; you're eyeing right" },
      { n: "III", name: "For the hell of it", whis: "no reason, no regrets" },
      { n: "IV", name: "Bet on what's next", whis: "the long shot's more your speed" },
    ],
    reveal: {
      lens: "I · LEAP FIRST",
      headline: ["You took the leap. ", "Of course you did."],
      wine: "Las Jaras Pét-Nat", sub: "SPARKLING — CALIFORNIA",
      body: "You'll find the ground on the way down — so does a pét-nat, sealed mid-ferment and left to finish on instinct. Las Jaras bottles that gamble on purpose: cloudy, frothy, a little feral, never the same twice. Jump.",
      stats: { GRAPE: "Field blend", STYLE: "Pét-nat sparkling", COUNTRY: "USA", NOTES: "Green apple, bread, spritz" },
      cellar: "No leaps waiting in your cellar tonight",
    },
  },

  hermit: {
    num: "IX", name: "The Hermit", file: "hermit", challenging: false,
    knowing: "You've gone looking for the quiet. It always knew more than the crowd.",
    lenses: [
      { n: "I", name: "Alone with it", whis: "some things only surface in the quiet" },
      { n: "II", name: "No rush tonight", whis: "let it take all the time it needs" },
      { n: "III", name: "Off the map", whis: "done following the crowd" },
      { n: "IV", name: "Nothing easy", whis: "you want something that makes you earn it", nudge: true },
    ],
    reveal: {
      lens: "IV · NOTHING EASY",
      headline: ["You chose the hard road. ", "Good."],
      wine: "Vin Jaune", sub: "SAVAGNIN — JURA",
      body: "You don't want to be charmed tonight — you want something that earns it. Vin Jaune ages six years under a veil of yeast, going nowhere, becoming something most palates can't follow: walnut, curry, bruised apple. It gives up its secrets slowly. Or not at all.",
      stats: { GRAPE: "Savagnin", STYLE: "Oxidative, under veil", COUNTRY: "France", NOTES: "Walnut, curry, apple" },
      cellar: "A lone bottle waits in your cellar — Vin Jaune, 2016",
    },
  },
};

const ARCANA_ORDER = ["moon", "wheel", "death", "tower", "fool", "hermit"];

if (typeof window !== "undefined") { window.ARCANA = ARCANA; window.ARCANA_ORDER = ARCANA_ORDER; }
