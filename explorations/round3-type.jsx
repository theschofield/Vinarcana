// ROUND 3 — Lettering: four type voices on identical content
// Exports: TypeT1, TypeT2, TypeT3, TypeT4

function TypeTile({ cls, label, fonts, display, knowing, lensname, note, stampColor }) {
  return (
    <div className={"tt " + cls} style={{ "--stamp": stampColor || "#f4500a" }}>
      <div className="lthr-grain"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="tt-label">{label}</div>
        <div className="tt-fonts">{fonts}</div>
      </div>
      <div className="tt-stage" style={{ position: "relative", zIndex: 2 }}>
        <div className="tt-display">{display}</div>
        <div className="tt-knowing">{knowing}</div>
        <div className="tt-lens">
          <div className="tt-lens-label stamp">III · THE LENS</div>
          <div className="tt-lensname">{lensname}</div>
        </div>
      </div>
      <div className="tt-note" style={{ position: "relative", zIndex: 2 }}>{note}</div>
    </div>
  );
}

function TypeT1() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type T1 — Modern Tongue">
      <TypeTile
        cls="t1"
        label="T1 · THE MODERN TONGUE"
        fonts="Instrument Serif italic + EB Garamond + Plex Mono"
        display="The Moon"
        knowing="Things are not as they seem tonight."
        lensname="The Beautiful Lie"
        note="Sensual hairline italics that flow without shouting. The most contemporary voice — sleek, a little fashion-house, ages well at small sizes."
      ></TypeTile>
    </div>
  );
}

function TypeT2() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type T2 — The Flourish">
      <TypeTile
        cls="t2"
        label="T2 · THE FLOURISH"
        fonts="Cormorant Light + Pinyon Script (single words) + Plex Mono"
        display={<span>The <span className="fl">Moon</span></span>}
        knowing="Things are not as they seem tonight."
        lensname="The Beautiful Lie"
        note="Cormorant's light cuts flow like silk; the script supplies the vein-of-ink swell — but only ever one word at a time. The dance, not the whole ballet."
      ></TypeTile>
    </div>
  );
}

function TypeT3() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type T3 — The Old Press">
      <TypeTile
        cls="t3"
        label="T3 · THE OLD PRESS"
        fonts="Sorts Mill Goudy italic + small roman + Plex Mono"
        display="The Moon"
        knowing="Things are not as they seem tonight."
        lensname="The Beautiful Lie"
        note="A revival of a 1915 Goudy — bookish, inky, slightly imperfect, like it was pulled off a hand press. The most 'rare book' of the voices."
      ></TypeTile>
    </div>
  );
}

function TypeT4() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type T4 — Engraver's Tendril">
      <TypeTile
        cls="t4"
        label="T4 · THE ENGRAVER'S TENDRIL"
        fonts="Cinzel Decorative + Cormorant italic + Plex Mono"
        display="The Moon"
        knowing="Things are not as they seem tonight."
        lensname="The Beautiful Lie"
        note="Ornament lives inside the letterforms — literal tendrils off the capitals. Fully tarot, dangerously close to costume; works stamped small and sparse, never as body."
      ></TypeTile>
    </div>
  );
}

Object.assign(window, { TypeT1, TypeT2, TypeT3, TypeT4 });
