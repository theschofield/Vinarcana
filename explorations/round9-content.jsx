// ROUND 9 (rev 2) — CONTENT, rewritten to the real strategy.
//
// SPIRIT'S VOICE: the wise, strangely relatable stranger at the bar. Observational,
//   conversational, makes you FEEL the card. Never bossy, never narrating-at-you, never inevitable-condescending.
// LENS: an invitation from someone you'd be joining if you picked it — vaguely mysterious,
//   alluring, and it makes you feel understood. Felt human response, NO wine words. Derived
//   from the framework's intent (not by forcing any one literal phrase). "A" over "The" when it
//   helps you recognize it as your own; words you can lean into; short subtitles that imply more.
// REVEAL: echo why you felt that, reveal the wine on one true fact, land on the bottle.

const ARCANA = {
  moon: {
    num: "XVIII", name: "The Moon", file: "moon", challenging: true,
    knowing: "Things are not as they seem tonight. Good — they rarely are.",
    lenses: [
      { n: "I", name: "A shifting face", whis: "every time you look, it's someone new" },
      { n: "II", name: "Drawn by the tide", whis: "pulled by something you can't see" },
      { n: "III", name: "The beautiful lie", whis: "nothing here is quite what it claims", nudge: true },
      { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
    ],
    reveal: {
      lens: "III · THE BEAUTIFUL LIE",
      headline: ["You chose misdirection. ", "Wise."],
      wine: "Tyrrell's Vat 1", sub: "SÉMILLON — HUNTER VALLEY",
      body: "You didn't come for honesty tonight — you came for something playing a part. So is this: Tyrrell's Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying beautifully for twenty years.",
      stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", COUNTRY: "Australia", NOTES: "Citrus, honey, wax" },
      cellar: "A match sleeps in your cellar — Vat 1, 2014",
    },
  },

  wheel: {
    num: "X", name: "Wheel of Fortune", file: "wheel", challenging: false,
    knowing: "The thing about a wheel — whatever's at the bottom never stays there long. Feels like your turn.",
    lenses: [
      { n: "I", name: "It all led here", whis: "every turn so far was setting this up" },
      { n: "II", name: "Round again", whis: "you've stood in this exact spot before" },
      { n: "III", name: "A stroke of luck", whis: "the kind you don't plan for" },
      { n: "IV", name: "The tipping point", whis: "one turn, and the whole thing changes" },
      { n: "V", name: "A comeback", whis: "written off, and rising anyway", nudge: true },
    ],
    reveal: {
      lens: "V · A COMEBACK",
      headline: ["You backed the comeback. ", "Bold."],
      wine: "Les Terrasses", sub: "ÁLVARO PALACIOS — PRIORAT",
      body: "Everyone who counted you out should meet Priorat — emptied, forgotten, left for dead, until a few stubborn believers bet everything on its black slate. Palacios' Les Terrasses is that bet paid in full: dark fruit, crushed stone, and the last laugh.",
      stats: { GRAPE: "Garnacha, Cariñena", STYLE: "Red, old-vine", COUNTRY: "Spain", NOTES: "Black fruit, slate, licorice" },
      cellar: "Nothing in your cellar fits this turn — yet",
    },
  },

  death: {
    num: "XIII", name: "Death", file: "death", challenging: true,
    knowing: "Endings get a bad reputation. Mostly they're just making room. Worth a toast, that.",
    lenses: [
      { n: "I", name: "Up from the ash", whis: "what burned down feeds what grows back" },
      { n: "II", name: "An old self, returning", whis: "what you left behind isn't done with you" },
      { n: "III", name: "Becoming someone new", whis: "you're not who you were — and good" },
      { n: "IV", name: "A clean break", whis: "the old way already had its turn", nudge: true },
    ],
    reveal: {
      lens: "IV · A CLEAN BREAK",
      headline: ["You chose the clean break. ", "About time."],
      wine: "Elio Altare Barolo", sub: "NEBBIOLO — PIEDMONT",
      body: "You're ready to let the old version go. So was Elio Altare, who took an actual chainsaw to his father's ancient casks and was nearly disinherited for it. What grew back is modern Barolo — rose and tar over something brand new.",
      stats: { GRAPE: "Nebbiolo", STYLE: "Red, modern Barolo", COUNTRY: "Italy", NOTES: "Rose, tar, red cherry" },
      cellar: "No Altare sleeps in your cellar",
    },
  },

  tower: {
    num: "XVI", name: "The Tower", file: "tower", challenging: true,
    knowing: "Took the whole thing falling down to show you it was never holding you up. Finally.",
    lenses: [
      { n: "I", name: "Let it burn", whis: "matter of fact — hand me the match" },
      { n: "II", name: "Still standing", whis: "the thing that should've ended you didn't" },
      { n: "III", name: "The veil lifts", whis: "you can't unsee it now" },
      { n: "IV", name: "Rules are made to be broken", whis: "the line was never really there", nudge: true },
    ],
    reveal: {
      lens: "IV · RULES ARE MADE TO BE BROKEN",
      headline: ["You chose the rebellion. ", "Naturally."],
      wine: "Tignanello", sub: "ANTINORI — TUSCANY",
      body: "Some lines are only paint on the floor. Tignanello stepped right over them — Cabernet smuggled into Sangiovese, French oak into Chianti, breaking every rule on the books and outclassing all of them. Nobody rewrote the laws. They just stopped pretending they mattered.",
      stats: { GRAPE: "Sangiovese blend", STYLE: "Red, Super Tuscan", COUNTRY: "Italy", NOTES: "Black cherry, tobacco, cedar" },
      cellar: "Not in your cellar — this one you hunt",
    },
  },

  fool: {
    num: "0", name: "The Fool", file: "fool", challenging: false,
    knowing: "Half the fun is not knowing where you'll land. The other half is jumping anyway.",
    lenses: [
      { n: "I", name: "Leap first", whis: "you'll find the landing on the way down", nudge: true },
      { n: "II", name: "The unmarked road", whis: "the good stuff was never on the map" },
      { n: "III", name: "For the joy of it", whis: "no reason, no regrets" },
      { n: "IV", name: "A long shot", whis: "you'd rather bet on what's next" },
    ],
    reveal: {
      lens: "I · LEAP FIRST",
      headline: ["You chose the leap. ", "Of course you did."],
      wine: "Las Jaras Pét-Nat", sub: "SPARKLING — CALIFORNIA",
      body: "You'll find the landing on the way down — so does a pét-nat, sealed mid-ferment and left to finish on instinct. Las Jaras bottles that gamble on purpose: cloudy, frothy, a little feral, never the same twice. Jump.",
      stats: { GRAPE: "Field blend", STYLE: "Pét-nat sparkling", COUNTRY: "USA", NOTES: "Green apple, bread, spritz" },
      cellar: "No leaps waiting in your cellar tonight",
    },
  },

  hermit: {
    num: "IX", name: "The Hermit", file: "hermit", challenging: false,
    knowing: "Some answers only show up once you stop asking everyone else for them.",
    lenses: [
      { n: "I", name: "A while alone", whis: "some things only open in private" },
      { n: "II", name: "No rush", whis: "whatever this is, let it take its time" },
      { n: "III", name: "Off the map", whis: "the good stuff was never where the crowd gathers" },
      { n: "IV", name: "Nothing easy", whis: "the worthwhile things never come easy", nudge: true },
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
