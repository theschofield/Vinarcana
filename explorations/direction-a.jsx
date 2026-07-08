// DIRECTION A — "Cellar Door" artboard contents
// Exports: DirATile, DirADraw, DirAReveal, DirAPairing

function DirATile() {
  return (
    <div className="da da-tile" data-screen-label="A — Style Tile">
      <div>
        <div className="da-tile-name">A · CELLAR DOOR</div>
        <div className="da-tile-desc">
          Engraved wine-label elegance in a vinous dark. Hairline double rules,
          wine-stain reds, a single candle's warmth. The most "rare book" of the three.
        </div>
      </div>

      <div className="da-tile-section">PALETTE</div>
      <div className="da-swatches" style={{ marginBottom: "22px" }}>
        <div className="da-swatch" style={{ background: "#140e10" }}><span>cellar black</span></div>
        <div className="da-swatch" style={{ background: "#6b2a32" }}><span>wine stain</span></div>
        <div className="da-swatch" style={{ background: "#8a3a42" }}><span>sediment</span></div>
        <div className="da-swatch" style={{ background: "#d8a96e" }}><span>candle</span></div>
        <div className="da-swatch" style={{ background: "#e9dfd2" }}><span>bone</span></div>
      </div>

      <div className="da-tile-section">TYPE</div>
      <div className="da-type-display">CINZEL — THE ENGRAVER</div>
      <div className="da-type-voice">Cormorant Garamond, italic — the voice in the dark.</div>
      <div className="da-type-note">Cinzel for card names, labels, buttons. Cormorant for everything the app "says."</div>

      <div className="da-tile-section">MOTIFS</div>
      <div className="da-tile-motifs">
        <div className="da-motif-circle" style={{ width: "64px", height: "64px" }}>
          <div className="da-motif-diamond" style={{ width: "30px", height: "30px" }}>
            <div className="da-motif-dot"></div>
          </div>
        </div>
        <div className="da-ornament" style={{ margin: "0" }}>
          <div className="line"></div><div className="dot"></div><div className="line"></div>
        </div>
      </div>
      <div className="da-type-note" style={{ marginTop: "10px" }}>
        Double-rule frames borrowed from classed-growth labels. Diamonds, not stars.
        Geometry stays hairline-thin — engraved, never drawn.
      </div>
    </div>
  );
}

function DirADraw() {
  return (
    <div className="da" data-screen-label="A — The Draw">
      <div className="da-smoke"></div>
      <div className="da-top">
        <div className="da-top-rule"></div>
        <div className="da-wordmark">VINTNER'S ARCANA</div>
        <div className="da-top-rule r"></div>
      </div>
      <div className="da-stage">
        <div className="da-cardback">
          <div className="da-card-corner tl"></div>
          <div className="da-card-corner tr"></div>
          <div className="da-card-corner bl"></div>
          <div className="da-card-corner br"></div>
          <div className="da-motif">
            <div className="da-motif-circle">
              <div className="da-motif-diamond"><div className="da-motif-dot"></div></div>
            </div>
          </div>
        </div>
        <div>
          <div className="da-invite">The deck is listening.</div>
          <div className="da-invite-sub">Cut, breathe, draw.</div>
        </div>
        <div className="da-cta">DRAW A CARD</div>
      </div>
      <div className="da-nav">
        <div className="da-nav-item on"><div className="da-nav-glyph diamond"></div><div className="da-nav-label">DRAW</div></div>
        <div className="da-nav-item"><div className="da-nav-glyph circle"></div><div className="da-nav-label">MEMORY</div></div>
        <div className="da-nav-item"><div className="da-nav-glyph"></div><div className="da-nav-label">CELLAR</div></div>
      </div>
    </div>
  );
}

function DirAReveal() {
  return (
    <div className="da" data-screen-label="A — Reveal & Resonance">
      <div className="da-smoke"></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "30px" }}>
        <div className="da-eyebrow">YOU HAVE DRAWN</div>
        <div className="da-minicard">
          <div className="da-minicard-num">XVIII</div>
          <div className="da-moon"></div>
        </div>
        <div className="da-cardtitle">THE MOON</div>
        <div className="da-symbolline">illusion · dreams · intuition · what is hidden</div>
        <div className="da-knowing">Things are not as they seem tonight. Good&nbsp;— they rarely are.</div>
        <div className="da-ornament">
          <div className="line"></div><div className="dot"></div><div className="line"></div>
        </div>
        <div className="da-eyebrow" style={{ marginTop: "20px" }}>WHERE DOES IT FIND YOU?</div>
        <div className="da-facets">
          <div className="da-facet">
            <div className="da-facet-num">I</div>
            <div className="da-facet-body">
              <div className="da-facet-name">THE SHIFTING FACE</div>
              <div className="da-facet-whisper">it changes every time you look at it</div>
            </div>
            <div className="da-facet-arrow">→</div>
          </div>
          <div className="da-facet">
            <div className="da-facet-num">II</div>
            <div className="da-facet-body">
              <div className="da-facet-name">THE LUNAR PULL</div>
              <div className="da-facet-whisper">drawn by tides you can't see</div>
            </div>
            <div className="da-facet-arrow">→</div>
          </div>
          <div className="da-facet sel">
            <div className="da-facet-num">III</div>
            <div className="da-facet-body">
              <div className="da-facet-name">THE BEAUTIFUL LIE</div>
              <div className="da-facet-whisper">nothing tonight is what it appears</div>
            </div>
            <div className="da-facet-arrow">→</div>
          </div>
          <div className="da-facet">
            <div className="da-facet-num">IV</div>
            <div className="da-facet-body">
              <div className="da-facet-name">EYES CLOSED</div>
              <div className="da-facet-whisper">your senses know more than your eyes</div>
            </div>
            <div className="da-facet-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirAPairing() {
  return (
    <div className="da" data-screen-label="A — The Pairing">
      <div className="da-smoke"></div>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "30px", textAlign: "center" }}>
        <div className="da-chip">
          <span>XVIII · THE MOON</span><div className="dot"></div><span>THE BEAUTIFUL LIE</span>
        </div>
        <div className="da-pour" style={{ textAlign: "center" }}>
          You chose misdirection. Wise. Here is a white that has been
          lying beautifully for twenty years.
        </div>
        <div className="da-label" style={{ textAlign: "center" }}>
          <div className="da-label-est">THE SPIRITS INCLINE TOWARD</div>
          <div className="da-label-name">Tyrrell's <em>Vat 1</em></div>
          <div className="da-label-sub">SÉMILLON · HUNTER VALLEY</div>
          <div className="da-label-rule"></div>
          <div className="da-label-why">
            Toast, lanolin, honeyed nuts — you'd swear it slept in oak.
            It never saw a stave. Bone-dry, eleven percent, all misdirection.
            The Moon would approve.
          </div>
        </div>
        <div className="da-cellarmatch">
          <div className="dot"></div>
          <div className="da-cellarmatch-text" style={{ textAlign: "left" }}>
            A match sleeps in your cellar — <b>Vat 1, 2014</b>. The spirits suggest you wake it.
          </div>
        </div>
        <div className="da-details">
          <div className="da-detail-row"><div className="da-detail-k">GRAPE</div><div className="da-detail-v">Sémillon</div></div>
          <div className="da-detail-row"><div className="da-detail-k">PLACE</div><div className="da-detail-v">Hunter Valley, Australia</div></div>
          <div className="da-detail-row"><div className="da-detail-k">STYLE</div><div className="da-detail-v">Dry white, bottle-aged</div></div>
        </div>
        <div className="da-actions">
          <div className="da-btn primary">KEEP THIS MEMORY</div>
          <div className="da-btn ghost">TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirATile, DirADraw, DirAReveal, DirAPairing });
