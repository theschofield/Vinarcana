// DIRECTION B — "Charred Oak" artboard contents
// Exports: DirBTile, DirBDraw, DirBReveal, DirBPairing

function DirBTile() {
  return (
    <div className="db db-tile" data-screen-label="B — Style Tile">
      <div className="db-grain"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="db-tile-name">B · Charred Oak</div>
        <div className="db-tile-desc">
          Wood-burned crate stamps, wax seals, a fire that won't quite die.
          Weathered Rider–Waite scans, charred and duotoned, like cards left
          a century in a barrel room. The coziest of the three.
        </div>

        <div className="db-tile-section">PALETTE</div>
        <div className="db-swatches">
          <div className="db-swatch" style={{ background: "#171008" }}><span>barrel black</span></div>
          <div className="db-swatch" style={{ background: "#5e2c12" }}><span>scorch</span></div>
          <div className="db-swatch" style={{ background: "#b85c28" }}><span>ember</span></div>
          <div className="db-swatch" style={{ background: "#d98e4f" }}><span>firelight</span></div>
          <div className="db-swatch" style={{ background: "#ede2cc" }}><span>parchment</span></div>
        </div>

        <div className="db-tile-section">TYPE</div>
        <div className="db-type-display">IM Fell English — the Antiquarian</div>
        <div className="db-type-voice">EB Garamond italic carries the whisper.</div>
        <div className="db-type-note">
          IM Fell's irregular, inky letterforms (cut c.1670) do the weathering for us —
          nothing needs to be artificially distressed.
        </div>

        <div className="db-tile-section">MOTIFS</div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div className="db-brand" style={{ width: "76px", height: "76px" }}>
            <div className="db-brand-va" style={{ fontSize: "22px" }}>VA</div>
          </div>
          <div className="db-seal" style={{ margin: "0" }}>XVIII</div>
          <div className="db-type-note" style={{ marginTop: "0", flex: 1 }}>
            Branded stamps, dashed "burn lines," a wax seal for kept memories.
          </div>
        </div>
      </div>
    </div>
  );
}

function DirBDraw() {
  return (
    <div className="db" data-screen-label="B — The Draw">
      <div className="db-grain"></div>
      <div className="db-glow"></div>
      <div className="db-top">VINTNER'S <em>&amp;</em> ARCANA</div>
      <div className="db-stage">
        <div className="db-cardback">
          <div className="db-brand">
            <div className="db-ray"></div><div className="db-ray r2"></div>
            <div className="db-ray r3"></div><div className="db-ray r4"></div>
            <div className="db-brand-va">V·A</div>
            <div className="db-brand-arc">EST. MMXXVI</div>
          </div>
        </div>
        <div>
          <div className="db-invite">Ask nothing. Draw.</div>
          <div className="db-invite-sub">The barrel already knows what you came for.</div>
        </div>
        <div className="db-cta">DRAW A CARD</div>
      </div>
      <div className="db-nav">
        <div className="db-nav-item on">Draw</div>
        <div className="db-nav-item">Memory</div>
        <div className="db-nav-item">Cellar</div>
      </div>
    </div>
  );
}

function DirBReveal() {
  return (
    <div className="db" data-screen-label="B — Reveal & Resonance">
      <div className="db-grain"></div>
      <div className="db-glow" style={{ top: "24%" }}></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "28px" }}>
        <div className="db-eyebrow">THE BARREL YIELDS</div>
        <div className="db-rws">
          <div className="db-rws-note">
            [ weathered rider–waite scan ]<br />
            THE MOON · charred duotone<br />
            edges burnt · paper grain<br />
            parchment + ember inks
          </div>
        </div>
        <div className="db-cardtitle"><span className="num">XVIII ·</span> The Moon</div>
        <div className="db-symbolline">illusion · dreams · intuition · what is hidden</div>
        <div className="db-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <div className="db-facets">
          <div className="db-facet">
            <div className="db-facet-ember"></div>
            <div>
              <div className="db-facet-name">The Shifting Face</div>
              <div className="db-facet-whisper">it changes every time you look at it</div>
            </div>
          </div>
          <div className="db-facet sel">
            <div className="db-facet-ember"></div>
            <div>
              <div className="db-facet-name">The Lunar Pull</div>
              <div className="db-facet-whisper">drawn by tides you can't see</div>
            </div>
          </div>
          <div className="db-facet">
            <div className="db-facet-ember"></div>
            <div>
              <div className="db-facet-name">The Beautiful Lie</div>
              <div className="db-facet-whisper">nothing tonight is what it appears</div>
            </div>
          </div>
          <div className="db-facet">
            <div className="db-facet-ember"></div>
            <div>
              <div className="db-facet-name">Eyes Closed</div>
              <div className="db-facet-whisper">your senses know more than your eyes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirBPairing() {
  return (
    <div className="db" data-screen-label="B — The Pairing">
      <div className="db-grain"></div>
      <div className="db-glow" style={{ top: "30%" }}></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "28px", textAlign: "center" }}>
        <div className="db-chip">XVIII · THE MOON — THE LUNAR PULL</div>
        <div className="db-pour">
          You feel the tide, even on dry land.
          So does this vineyard.
        </div>
        <div className="db-crate">
          <div className="db-crate-est">THE BARREL OFFERS</div>
          <div className="db-crate-name">Coulée de Serrant</div>
          <div className="db-crate-sub">Nicolas Joly · Chenin Blanc · Loire</div>
          <div className="db-crate-why">
            Joly farms by the moon's calendar like scripture — planting,
            pruning, picking on its word. Chenin that tastes of quince,
            beeswax, and conviction.
          </div>
          <div className="db-seal">XVIII</div>
        </div>
        <div className="db-details">
          <div className="db-detail-row"><div className="db-detail-k">GRAPE</div><div className="db-detail-v">Chenin Blanc</div></div>
          <div className="db-detail-row"><div className="db-detail-k">PLACE</div><div className="db-detail-v">Savennières, Loire</div></div>
          <div className="db-detail-row"><div className="db-detail-k">STYLE</div><div className="db-detail-v">Dry white, biodynamic</div></div>
        </div>
        <div className="db-actions">
          <div className="db-btn primary">Keep this memory</div>
          <div className="db-btn ghost">Tell me more</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirBTile, DirBDraw, DirBReveal, DirBPairing });
