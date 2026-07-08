// DIRECTION C — "Ink & Ash" artboard contents
// Exports: DirCTile, DirCDraw, DirCReveal, DirCPairing

function DirCTile() {
  return (
    <div className="dx dx-tile" data-screen-label="C — Style Tile">
      <div className="dx-smoke"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="dx-tile-name">C · INK &amp; ASH</div>
        <div className="dx-tile-desc">
          Ancient and modern at once. No card frames, no ornament — monolithic
          lapidary type, monospace marginalia, and smoke as the only imagery.
          One ember of color in a monochrome night. The most fashion-house of the three.
        </div>

        <div className="dx-mono dx-tile-section">PALETTE</div>
        <div className="dx-swatches">
          <div className="dx-swatch" style={{ background: "#0c0c0e" }}><span>ink</span></div>
          <div className="dx-swatch" style={{ background: "#1a191c" }}><span>ash</span></div>
          <div className="dx-swatch" style={{ background: "#6e6a63" }}><span>smoke</span></div>
          <div className="dx-swatch" style={{ background: "#c0764a" }}><span>ember</span></div>
          <div className="dx-swatch" style={{ background: "#dcd7cd" }}><span>bone</span></div>
        </div>

        <div className="dx-mono dx-tile-section">TYPE</div>
        <div className="dx-type-display">MARCELLUS — CUT IN STONE</div>
        <div className="dx-type-voice">Spectral light italic, the voice — quiet, unhurried.</div>
        <div className="dx-type-note" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", letterSpacing: "0.08em" }}>
          IBM PLEX MONO — the modern edge. indexes, coordinates, marginalia.
        </div>

        <div className="dx-mono dx-tile-section">MOTIFS</div>
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <div className="dx-ghostnum" style={{ fontSize: "64px", marginTop: "0" }}>XVIII</div>
          <div className="dx-type-note" style={{ flex: 1 }}>
            Ghost-stroked numerals as card "art." Hairline rules. The ember dot
            <span className="dx-emberdot" style={{ margin: "0 6px" }}></span>
            marks whatever is alive: the chosen facet, a cellar match, tonight's card.
          </div>
        </div>
      </div>
    </div>
  );
}

function DirCDraw() {
  return (
    <div className="dx" data-screen-label="C — The Draw">
      <div className="dx-smoke"></div>
      <div className="dx-top">
        <div className="dx-mono">VINTNER'S ARCANA</div>
        <div className="dx-mono"><span className="ember">●</span> MAJOR XXII</div>
      </div>
      <div className="dx-stage">
        <div className="dx-ghostnum">?</div>
        <div className="dx-invite">ONE CARD</div>
        <div className="dx-invite-sub">
          The smoke holds twenty-two answers.<br />Tonight you need one.
        </div>
        <div className="dx-drawring">DRAW</div>
      </div>
      <div className="dx-nav">
        <div className="dx-nav-item on">Draw</div>
        <div className="dx-nav-item">Memory</div>
        <div className="dx-nav-item">Cellar</div>
      </div>
    </div>
  );
}

function DirCReveal() {
  return (
    <div className="dx" data-screen-label="C — Reveal & Resonance">
      <div className="dx-smoke"></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "26px" }}>
        <div className="dx-mono" style={{ textAlign: "center" }}>ARCANUM 18 / 22 — MAJOR</div>
        <div className="dx-revealnum">XVIII</div>
        <div className="dx-cardtitle">THE MOON</div>
        <div className="dx-mono dx-symbolline">illusion — dreams — intuition — what is hidden</div>
        <div className="dx-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <div className="dx-hr"></div>
        <div className="dx-mono" style={{ textAlign: "center", marginTop: "18px" }}>WHERE DOES IT FIND YOU?</div>
        <div className="dx-facets">
          <div className="dx-facet">
            <div className="dx-facet-idx">01</div>
            <div>
              <div className="dx-facet-name">The Shifting Face</div>
              <div className="dx-facet-whisper">it changes every time you look at it</div>
            </div>
          </div>
          <div className="dx-facet sel">
            <div className="dx-facet-idx">02</div>
            <div>
              <div className="dx-facet-name">The Lunar Pull</div>
              <div className="dx-facet-whisper">drawn by tides you can't see</div>
            </div>
          </div>
          <div className="dx-facet">
            <div className="dx-facet-idx">03</div>
            <div>
              <div className="dx-facet-name">The Beautiful Lie</div>
              <div className="dx-facet-whisper">nothing tonight is what it appears</div>
            </div>
          </div>
          <div className="dx-facet">
            <div className="dx-facet-idx">04</div>
            <div>
              <div className="dx-facet-name">Eyes Closed</div>
              <div className="dx-facet-whisper">your senses know more than your eyes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirCPairing() {
  return (
    <div className="dx" data-screen-label="C — The Pairing">
      <div className="dx-smoke"></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "26px" }}>
        <div className="dx-mono dx-pair-eyebrow">XVIII · THE MOON — 01 THE SHIFTING FACE</div>
        <div className="dx-why" style={{ marginTop: "16px" }}>
          You wanted something that won't sit still. Neither will this.
        </div>
        <div className="dx-winename">Bartolo<br />Mascarello<br />Barolo</div>
        <div className="dx-mono dx-winesub">NEBBIOLO — PIEDMONT, ITALY</div>
        <div className="dx-why">
          Pour it and disagree with yourself for three hours. Rose petal, then
          tar, then something it won't name. Traditional Barolo doesn't perform
          on schedule — it confides when it's ready.
        </div>
        <div className="dx-cellarmatch">
          <span className="dx-emberdot"></span>
          <div className="dx-mono" style={{ color: "rgba(220,215,205,0.75)" }}>IN YOUR CELLAR — ARTADI 2016, A NEAR MATCH</div>
        </div>
        <div className="dx-table">
          <div className="dx-table-row"><div className="dx-mono">GRAPE</div><div className="dx-table-v">Nebbiolo</div></div>
          <div className="dx-table-row"><div className="dx-mono">PLACE</div><div className="dx-table-v">Barolo, Piedmont</div></div>
          <div className="dx-table-row"><div className="dx-mono">STYLE</div><div className="dx-table-v">Traditional, long-macerated red</div></div>
        </div>
        <div className="dx-actions">
          <div className="dx-btn primary">KEEP THIS MEMORY</div>
          <div className="dx-btn ghost">TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirCTile, DirCDraw, DirCReveal, DirCPairing });
