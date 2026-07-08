// ROUND 5 — The Weave (swash type through card) + Light Pour refined
// Exports: WeaveMoon, WeaveLong, LightPourRefined

const R5W_MOON = "assets/cards/major_18.png";
const R5W_STAR = "assets/cards/major_17.png";

// The weave: a swash word sits centered; the card overlaps its middle band.
// 'behind' copy shows the full word; 'front' copy is clipped to the lower
// portion so the descender flourishes appear to pass OVER the card.
function WeaveMoon() {
  return (
    <div className="r5 r5-dark r5-weave" data-screen-label="R5 — The Weave (Moon)">
      <div className="r5-mottle"></div>
      <div className="r5-eyebrow" style={{ color: "var(--apri)", position: "absolute", top: "30px", left: 0, right: 0, zIndex: 6 }}>
        <div className="rule"></div><div className="txt">XVIII — THE REVEAL</div><div className="rule"></div>
      </div>

      <div className="r5-weave-stage">
        {/* behind: full word */}
        <div className="r5-weave-word behind" style={{ fontSize: "172px" }}>Moon</div>
        {/* the card overlaps the word's waistline */}
        <img className="r5-weave-card" src={R5W_MOON} alt="The Moon" width="208" style={{ transform: "rotate(-1.5deg)" }} />
        {/* front: same word, clipped so only the swash tails ride over the card */}
        <div className="r5-weave-word front" style={{ fontSize: "172px", clipPath: "inset(46% 0 0 0)", WebkitClipPath: "inset(46% 0 0 0)" }}>Moon</div>
      </div>

      <div className="r5-weave-cap">
        <div className="r5-serif-i" style={{ fontSize: "19px", color: "rgba(239,236,228,0.66)" }}>
          The name is written behind you, then drawn through — its tails crossing the card as it turns.
        </div>
      </div>
      <div className="r5-weave-foot">
        <div className="r5-mono" style={{ fontSize: "8px" }}>ITALIANNO SWASH · THE FLOURISHES PASS OVER THE CARD</div>
      </div>
    </div>
  );
}

function WeaveLong() {
  return (
    <div className="r5 r5-dark r5-weave" data-screen-label="R5 — The Weave (long name test)">
      <div className="r5-mottle"></div>
      <div className="r5-eyebrow" style={{ color: "var(--apri)", position: "absolute", top: "30px", left: 0, right: 0, zIndex: 6 }}>
        <div className="rule"></div><div className="txt">XVII — THE REVEAL</div><div className="rule"></div>
      </div>

      <div className="r5-weave-stage">
        <div className="r5-weave-word behind" style={{ fontSize: "96px", lineHeight: 0.9 }}>The<br />Star</div>
        <img className="r5-weave-card" src={R5W_STAR} alt="The Star" width="208" style={{ transform: "rotate(1.5deg)" }} />
        <div className="r5-weave-word front" style={{ fontSize: "96px", lineHeight: 0.9, clipPath: "inset(50% 0 0 0)", WebkitClipPath: "inset(50% 0 0 0)" }}>The<br />Star</div>
      </div>

      <div className="r5-weave-cap">
        <div className="r5-serif-i" style={{ fontSize: "18px", color: "rgba(239,236,228,0.62)" }}>
          Longer names stack and scale down — two short lines weave as cleanly as one. "The High Priestess" would wrap to three.
        </div>
      </div>
      <div className="r5-weave-foot">
        <div className="r5-mono" style={{ fontSize: "8px" }}>SCALE TEST · STACKED LINES, SAME WEAVE</div>
      </div>
    </div>
  );
}

function LightPourRefined() {
  return (
    <div className="r5 r5-light" data-screen-label="R5 — Light Pour, refined">
      <div className="r5-veil"><img src={R5W_MOON} alt="" /></div>
      <div className="r5-mottle"></div>
      <div className="r5-lp">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r5-mono" style={{ fontSize: "8.5px" }}>VINTNER'S ARCANA</div>
          <div className="r5-mono" style={{ fontSize: "8.5px" }}>CELLAR</div>
        </div>

        <div className="r5-mono" style={{ marginTop: "30px", fontSize: "9px" }}>
          <span style={{ color: "var(--amber)" }}>XVIII · THE MOON</span> — III · THE BEAUTIFUL LIE
        </div>
        {/* refined: display dialed back from 37px shout to a calmer 29px, more letter-spacing */}
        <div className="r5-serif" style={{ fontSize: "30px", color: "var(--navy)", marginTop: "11px", lineHeight: 1.08 }}>
          You chose misdirection. <span className="r5-serif-i">Wise.</span>
        </div>

        <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", marginTop: "22px" }}>
          <img src={R5W_MOON} alt="The Moon" width="96" style={{ borderRadius: "7px", boxShadow: "0 16px 34px -14px rgba(21,34,49,0.5)", transform: "rotate(-2.5deg)" }} />
          <div style={{ flex: 1 }}>
            <div className="r5-mono" style={{ color: "var(--amber)", fontSize: "8.5px" }}>THE POUR</div>
            <div className="r5-serif" style={{ fontSize: "27px", color: "var(--navy)", marginTop: "6px", lineHeight: 1.05 }}>Tyrrell's Vat 1</div>
            <div className="r5-mono" style={{ marginTop: "8px", fontSize: "8px" }}>SÉMILLON — HUNTER VALLEY</div>
          </div>
        </div>

        <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "15px", fontWeight: 400, lineHeight: 1.55, color: "rgba(21,34,49,0.85)", marginTop: "20px", textWrap: "pretty" }}>
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw
          a stave. Bone-dry, eleven percent, all misdirection. The Moon would approve.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "18px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--amber)", display: "inline-block" }}></span>
          <span className="r5-mono" style={{ fontSize: "8px", color: "rgba(21,34,49,0.6)" }}>A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div className="r5-lp-rule"></div>
          <div className="r5-lp-row"><div className="r5-mono" style={{ fontSize: "8px" }}>GRAPE</div><div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14.5px" }}>Sémillon</div></div>
          <div className="r5-lp-row"><div className="r5-mono" style={{ fontSize: "8px" }}>STYLE</div><div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14.5px" }}>Dry white, bottle-aged</div></div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
          <div className="r5-lp-btn navy" style={{ flex: 1 }}>KEEP THIS MEMORY</div>
          <div className="r5-lp-btn ghost" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WeaveMoon, WeaveLong, LightPourRefined });
