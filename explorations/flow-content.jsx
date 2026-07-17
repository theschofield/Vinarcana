// FLOW PROTOTYPE — pours per card, mirrored from content/reveals.csv (approved + draft rows).
// Reads alongside round12-content.jsx (window.ARCANA). Keyed by ARCANA id.
// Each pour: wine, sub[grape, region], bottle (image or null), body, stats, tastes, cellarMatch.

const POURS = {
  moon: [
    {
      wine: "Tyrrell's Vat 1", sub: ["SÉMILLON", "HUNTER VALLEY, AUSTRALIA"], bottle: "assets/bottle-vat1.png",
      body: "The best deceptions never feel like one, and neither does this. Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying beautifully for twenty years.",
      stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", VINTAGE: "2005", ABV: "11%", SERVE: "8–10°C, no decant", NOTES: "Citrus, honey, lanolin", "PAIRS WITH": "Oysters, roast chicken" },
      tastes: { acid: 0.85, sweet: 0.06, tannin: 0.08, body: 0.28 },
      cellarMatch: true,
    },
    {
      wine: "Dry Furmint", sub: ["FURMINT", "TOKAJ, HUNGARY"], bottle: "assets/bottle-white.png",
      body: "Tokaj built its legend on the sweetest wine on earth. This one walks in wearing that reputation and pours bone-dry: smoke, pear skin, a lie by association that the palate sorts out too late.",
      stats: { GRAPE: "Furmint", STYLE: "Dry white, mineral", VINTAGE: "2021", ABV: "12.5%", SERVE: "9–11°C", NOTES: "Smoke, pear, flint", "PAIRS WITH": "Schnitzel, aged gouda" },
      tastes: { acid: 0.8, sweet: 0.12, tannin: 0.12, body: 0.38 },
      cellarMatch: false,
    },
    {
      wine: "Morgon, Lapierre", sub: ["GAMAY", "BEAUJOLAIS, FRANCE"], bottle: "assets/bottle-red.png",
      body: "It pours like a whisper and lands like a speech. Lapierre's Morgon looks pale, chills like a white, then unfolds into something dark-fruited and serious. The color was the misdirection.",
      stats: { GRAPE: "Gamay", STYLE: "Red, cru Beaujolais", VINTAGE: "2022", ABV: "13%", SERVE: "14°C, slight chill", NOTES: "Cherry, iron, violets", "PAIRS WITH": "Charcuterie, roast duck" },
      tastes: { acid: 0.62, sweet: 0.1, tannin: 0.35, body: 0.45 },
      cellarMatch: false,
    },
  ],
  wheel: [
    {
      wine: "Les Terrasses", sub: ["GARNACHA · CARIÑENA", "PRIORAT, SPAIN"], bottle: "assets/bottle-red.png",
      body: "The best comebacks start with being written off. Priorat was emptied, forgotten, left for dead, until a few stubborn believers bet everything on its black slate. Les Terrasses is that bet paid in full: dark fruit, crushed stone, and the last laugh.",
      stats: { GRAPE: "Garnacha, Cariñena", STYLE: "Red, old-vine", NOTES: "Black fruit, slate, licorice" },
      tastes: { acid: 0.6, sweet: 0.08, tannin: 0.55, body: 0.7 },
      cellarMatch: false,
    },
  ],
  death: [
    {
      wine: "Elio Altare Barolo", sub: ["NEBBIOLO", "PIEDMONT, ITALY"], bottle: "assets/bottle-red.png",
      body: "The old way had its turn, and Elio Altare agreed. He took an actual chainsaw to his father's ancient casks and was nearly disinherited for it. What grew back is modern Barolo: rose and tar over something brand new.",
      stats: { GRAPE: "Nebbiolo", STYLE: "Red, modern Barolo", NOTES: "Rose, tar, red cherry" },
      tastes: { acid: 0.75, sweet: 0.05, tannin: 0.8, body: 0.65 },
      cellarMatch: false,
    },
  ],
  tower: [
    {
      wine: "Tignanello", sub: ["SANGIOVESE BLEND", "ANTINORI, TUSCANY"], bottle: "assets/bottle-red.png",
      body: "The interesting rules always get broken, and Tignanello broke every one Chianti had. Cabernet smuggled into Sangiovese, French oak where it wasn't welcome, filed as a humble table wine. It turned out better than the law allowed. The rulebook never recovered.",
      stats: { GRAPE: "Sangiovese blend", STYLE: "Red, Super Tuscan", NOTES: "Black cherry, tobacco, cedar" },
      tastes: { acid: 0.65, sweet: 0.06, tannin: 0.65, body: 0.7 },
      cellarMatch: false,
    },
  ],
  fool: [
    {
      wine: "Las Jaras Pét-Nat", sub: ["FIELD BLEND", "CALIFORNIA, USA"], bottle: "assets/bottle-white.png",
      body: "The landing figures itself out, and so does a pét-nat, sealed mid-ferment and left to finish on instinct. Las Jaras bottles that gamble on purpose: cloudy, frothy, a little feral, never the same twice. Jump.",
      stats: { GRAPE: "Field blend", STYLE: "Pét-nat sparkling", NOTES: "Green apple, bread, spritz" },
      tastes: { acid: 0.7, sweet: 0.15, tannin: 0.1, body: 0.3 },
      cellarMatch: false,
    },
  ],
  hermit: [
    {
      wine: "Vin Jaune", sub: ["SAVAGNIN", "JURA, FRANCE"], bottle: "assets/bottle-white.png",
      body: "What's earned is always worth more, and Vin Jaune earns every sip. Six years under a veil of yeast, going nowhere, becoming something most palates can't follow: walnut, curry, bruised apple. It gives up its secrets slowly. Or not at all.",
      stats: { GRAPE: "Savagnin", STYLE: "Oxidative, under veil", NOTES: "Walnut, curry, apple" },
      tastes: { acid: 0.8, sweet: 0.03, tannin: 0.15, body: 0.55 },
      cellarMatch: true,
    },
  ],
  world: [
    {
      wine: "Château de Beaucastel", sub: ["13-VARIETY BLEND", "CHÂTEAUNEUF-DU-PAPE"], bottle: "assets/bottle-red.png",
      body: "Built from so many parts it became its own thing: Beaucastel blends up to thirteen grape varieties into a single wine that tastes like none of them and all of them. Spice, leather, dark fruit, and a place that has been getting this right for centuries.",
      stats: { GRAPE: "13-variety blend", STYLE: "Red, Southern Rhône", NOTES: "Spice, leather, dark fruit" },
      tastes: { acid: 0.6, sweet: 0.08, tannin: 0.6, body: 0.75 },
      cellarMatch: false,
    },
  ],
  devil: [
    {
      wine: "Turley Zinfandel", sub: ["ZINFANDEL", "CALIFORNIA, USA"], bottle: "assets/bottle-red.png",
      body: "No guilt at all, that's the spirit. Turley's old-vine Zinfandel is dangerously easy to love: ripe, generous, unapologetically full-throated, and not the least bit sorry about it. The second glass was always coming. So was the third.",
      stats: { GRAPE: "Zinfandel", STYLE: "Red, old-vine", NOTES: "Blackberry, spice, warmth" },
      tastes: { acid: 0.5, sweet: 0.2, tannin: 0.5, body: 0.9 },
      cellarMatch: false,
    },
  ],
  magician: [
    {
      wine: "Didier Dagueneau Silex", sub: ["SAUVIGNON BLANC", "LOIRE, FRANCE"], bottle: "assets/bottle-white.png",
      body: "The impossible made effortless: Dagueneau bent Sauvignon Blanc until it stopped tasting like a grape and started tasting like the flint it grew from. Silex is the Loire channeled through sheer will: smoky, electric, utterly singular. Nobody else could have made it.",
      stats: { GRAPE: "Sauvignon Blanc", STYLE: "Dry white, single vineyard", NOTES: "Smoke, flint, citrus" },
      tastes: { acid: 0.8, sweet: 0.05, tannin: 0.1, body: 0.45 },
      cellarMatch: false,
    },
  ],
};

// Approach invitations live in flow2-app.jsx (INVITES2), generated from content/invitations.csv
// by scraps/mirror-invitations.js. The old tail-only INVITATIONS copy here was unused and had
// drifted from the live italic spans; removed 2026-07-15.

if (typeof window !== "undefined") { window.POURS = POURS; }
