// ROUND 13 — THE REVEAL. Light Pour composition + the round-7 surgical fixes.
// Exports: RevealX, ReadingFlipX

// The Moon · III · The Beautiful Lie — three pours that fit the lens
const MOON_POURS = [
  {
    wine: "Tyrrell's Vat 1", sub: ["SÉMILLON", "HUNTER VALLEY, AUSTRALIA"], bottle: "assets/bottle-vat1.png",
    body: "The best deceptions never feel like one, and neither does this. Vat 1 tastes of toast, honey, and oak it never once touched. Bone-dry, eleven percent, lying beautifully for twenty years.",
    stats: { GRAPE: "Sémillon", STYLE: "Dry white, aged", VINTAGE: "2005", ABV: "11%", SERVE: "8–10°C, no decant", NOTES: "Citrus, honey, lanolin", "PAIRS WITH": "Oysters, roast chicken" },
    tastes: { acid: 0.85, sweet: 0.06, tannin: 0.08, body: 0.28 },
    cellarMatch: true,
  },
  {
    wine: "Dry Furmint", sub: ["FURMINT", "TOKAJ, HUNGARY"], bottle: null,
    body: "Tokaj built its legend on the sweetest wine on earth. This one walks in wearing that reputation and pours bone-dry: smoke, pear skin, a lie by association that the palate sorts out too late.",
    stats: { GRAPE: "Furmint", STYLE: "Dry white, mineral", VINTAGE: "2021", ABV: "12.5%", SERVE: "9–11°C", NOTES: "Smoke, pear, flint", "PAIRS WITH": "Schnitzel, aged gouda" },
    tastes: { acid: 0.8, sweet: 0.12, tannin: 0.12, body: 0.38 },
    cellarMatch: false,
  },
  {
    wine: "Morgon, Lapierre", sub: ["GAMAY", "BEAUJOLAIS, FRANCE"], bottle: null,
    body: "It pours like a whisper and lands like a speech. Lapierre's Morgon looks pale, chills like a white, then unfolds into something dark-fruited and serious. The color was the misdirection.",
    stats: { GRAPE: "Gamay", STYLE: "Red, cru Beaujolais", VINTAGE: "2022", ABV: "13%", SERVE: "14°C, slight chill", NOTES: "Cherry, iron, violets", "PAIRS WITH": "Charcuterie, roast duck" },
    tastes: { acid: 0.62, sweet: 0.1, tannin: 0.35, body: 0.45 },
    cellarMatch: false,
  },
];

function BottleSilhouette() {
  return (
    <svg viewBox="0 0 93 336" fill="none">
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z"
        fill="currentColor" opacity="0.16" />
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z"
        stroke="currentColor" opacity="0.35" strokeWidth="1" />
      <rect x="24" y="150" width="45" height="88" rx="3" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

function TasteScale({ l, r, v }) {
  return (
    <div className="rv-scale">
      <span className={"lab" + (v <= 0.5 ? " hot" : "")}>{l}</span>
      <div className="track"><div className="mark" style={{ left: (v * 100) + "%" }}></div></div>
      <span className={"lab r" + (v > 0.5 ? " hot" : "")}>{r}</span>
    </div>
  );
}

function RevealX({ mode = "dark", pour = 0, flip = false }) {
  const light = mode === "light";
  const p = MOON_POURS[pour];
  return (
    <div className={"rx " + (light ? "rx-light" : "rx-dark")} data-screen-label={"R13 — Reveal · pour " + (pour + 1) + " · " + mode}>
      <div className="rx-veil"><img src="assets/cards/moon.png" alt="" /></div>
      <div className="rx-grain"></div>
      <div className="rv-glow"></div>
      <div className="rv-screen">
        <StatusBarX light={light}></StatusBarX>
        <div className="rv-eyebrow"><span className="txt"><span className="card-part">XVIII · THE MOON</span><span className="lens-part"> — THE BEAUTIFUL LIE</span></span></div>
        <div className="rv-headline">You came for misdirection. <span className="i">Wise.</span></div>
        <div className="rv-hero">
          <img className="card" src="assets/cards/moon.png" alt="The Moon" />
          {p.bottle ? (
            <img className="bottle" src={p.bottle} alt={p.wine} />
          ) : (
            <div className="bottle-sil" style={{ color: light ? "#152231" : "#efece4" }}><BottleSilhouette></BottleSilhouette></div>
          )}
          <div className="rv-namewrap">
            <div className="rv-pour-label">THE POUR</div>
            <div className="rv-wine">{p.wine}</div>
            <div className="rv-sub">{p.sub[0]}<br />{p.sub[1]}</div>
            {p.cellarMatch && (
              <div className="rv-cellar-line"><span className="rv-cellar-dot"></span>IN YOUR CELLAR</div>
            )}
          </div>
        </div>
        <div className="rv-scroll">
          <div className="rv-body">{p.body}</div>
          <div className="rv-stats">
            {Object.entries(p.stats).map(([k, v]) => (
              <div key={k} className="rv-stat"><span className="k">{k}</span><span className="v">{v}</span></div>
            ))}
          </div>
          <div className="rv-scales">
            <div className="rv-scales-h">ON THE PALATE</div>
            <TasteScale l="SOFT" r="ACIDIC" v={p.tastes.acid}></TasteScale>
            <TasteScale l="DRY" r="SWEET" v={p.tastes.sweet}></TasteScale>
            <TasteScale l="SMOOTH" r="TANNIC" v={p.tastes.tannin}></TasteScale>
            <TasteScale l="LIGHT" r="BOLD" v={p.tastes.body}></TasteScale>
          </div>
        </div>
        <div className="rv-dotswrap">
          <div className="rv-dots">
            {MOON_POURS.map((_, i) => <div key={i} className={"dot" + (i === pour ? " on" : "")}></div>)}
          </div>
        </div>
        <div className="rv-actions">
          <div className="rv-btn ghost">LET IT FADE</div>
          <div className="rv-btn fill">KEEP THIS MEMORY</div>
        </div>
      </div>
    </div>
  );
}

// Reading italic-hierarchy rider: flip = voice roman, lenses italic
function ReadingFlipX({ id, mode = "dark" }) {
  return (
    <div className="rx-flip" style={{ width: "100%", height: "100%" }}>
      <ReadingX id={id} mode={mode}></ReadingX>
    </div>
  );
}

Object.assign(window, { RevealX, ReadingFlipX });
