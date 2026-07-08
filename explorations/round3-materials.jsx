// ROUND 3 — Materials: stamped leather, orange calibration, daylight
// Exports: LthrTile, CalBoard, LthrDraw, DayPour

const R3_MOON = "assets/cards/major_18.png";
const R3_ORANGE = "#f4500a"; // working guess — see calibration board

function LthrTile() {
  return (
    <div className="lthr lthr-tile" style={{ "--stamp": R3_ORANGE }} data-screen-label="R3 — Stamped Leather tile">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="lthr-tile-name">Stamped Leather</div>
        <div className="lthr-tile-desc">
          Not pure black — a muddy, oiled-hide near-black with mottling and grain.
          The orange isn't lit from within; it's <b style={{ fontStyle: "normal", color: "#f0e7d0" }}>pressed in</b>,
          like hot foil into a ledger cover. Vintage confidence over digital glow.
        </div>

        <div className="lthr-tile-section">THE SURFACE</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1, height: "64px", background: "radial-gradient(80% 80% at 30% 20%, #221509, #130b05)", border: "1px solid rgba(233,222,198,0.1)" }}></div>
          <div style={{ flex: 1, height: "64px", background: "radial-gradient(80% 80% at 70% 60%, #1d1208, #110a05)", border: "1px solid rgba(233,222,198,0.1)" }}></div>
        </div>
        <div className="lthr-mono" style={{ marginTop: "8px", letterSpacing: "0.08em", fontSize: "9.5px" }}>
          mottled radial grain · no flat fills · heavy vignette
        </div>

        <div className="lthr-tile-section">THE STAMP</div>
        <div className="stamp" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "30px" }}>THE MOON</div>
        <div className="stamp-blind" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "30px", marginTop: "6px" }}>THE MOON</div>
        <div className="lthr-mono" style={{ marginTop: "10px", letterSpacing: "0.08em", fontSize: "9.5px" }}>
          foil stamp (orange, letterpress shadow) · blind deboss (tone-on-tone)
        </div>

        <div className="lthr-tile-section">BRIEF AMENDED</div>
        <div className="lthr-tile-desc" style={{ marginTop: "0" }}>
          The app now ships with a dark mode <i>and</i> a light mode — see the
          Daylight board. Same stamps, same bones, parchment instead of hide.
        </div>
      </div>
    </div>);

}

function CalBoard() {
  const oranges = [
  { hex: "#E0571C", name: "Round Two", note: "what v2 used — a touch brown, a touch shy", pick: false },
  { hex: "#F4500A", name: "Persimmon Stamp", note: "stark and red-leaning — my best guess at your screenshot", pick: true },
  { hex: "#FF6A1A", name: "Hot Foil", note: "the loudest — nearly glows; risks feeling digital", pick: false },
  { hex: "#D8430F", name: "Vermillion Hide", note: "deepest — dried vermillion, the most vintage", pick: false },
  { hex: "#E8762A", name: "Burnt Apricot", note: "the gentlest — warm, but maybe not 'stark'", pick: false }];

  return (
    <div className="lthr" data-screen-label="R3 — Orange calibration">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div className="cal">
        {oranges.map((o) =>
        <div key={o.hex} className={"cal-col" + (o.pick ? " pick" : "")} style={{ "--stamp": o.hex }}>
            <div className="cal-stamp stamp">THE MOON</div>
            <div className="cal-num stamp">XVIII</div>
            <div className="cal-chip" style={{ background: o.hex }}></div>
            <div className="cal-name">{o.name}{o.pick ? " ←" : ""}</div>
            <div className="cal-hex">{o.hex}</div>
            <div className="cal-note">{o.note}</div>
          </div>
        )}
      </div>
    </div>);

}

function LthrDraw() {
  return (
    <div className="lthr mv" style={{ "--stamp": R3_ORANGE }} data-screen-label="R3 — Mobile draw on leather">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", paddingTop: "26px" }}>
        <div className="stamp" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "13px", textAlign: "center", letterSpacing: "0.3em", paddingLeft: "0.3em" }}>
          VINTNER'S ARCANA
        </div>
        <div className="mv-eyebrow" style={{ marginTop: "44px" }}>
          <div className="rule"></div>
          <div className="txt" style={{ color: "rgba(233,222,198,0.5)" }}>THE DECK IS CUT</div>
          <div className="rule"></div>
        </div>
        <div style={{ marginTop: "34px" }}>
          <div className="lthr-deck">
            <div className="lthr-deck-moon"></div>
          </div>
        </div>
        <div style={{ margin: "44px 44px 0" }}>
          <div className="lthr-whisper">something's on your mind — whisper it, or don't</div>
          <div className="lthr-mono" style={{ textAlign: "center", marginTop: "12px", fontSize: "8.5px" }}>
            THE DECK LISTENS. IT DOESN'T REPEAT.
          </div>
        </div>
        <div className="mv-caption" style={{ marginTop: "auto", paddingBottom: "30px" }}>
          TAP THE DECK — <span className="stamp" style={{ color: R3_ORANGE }}>ONE TAP, ONE CARD</span>
        </div>
      </div>
    </div>);

}

function DayPour() {
  return (
    <div className="day mv" style={{ "--stamp": "#d8430f" }} data-screen-label="R3 — Daylight pour (light mode)">
      <div className="day-grain"></div>
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", padding: "26px 28px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="day-mono" style={{ fontSize: "9px" }}>VINTNER'S ARCANA</div>
          <div className="day-mono" style={{ fontSize: "9px" }}>CELLAR</div>
        </div>

        <div className="day-mono" style={{ marginTop: "34px" }}>
          <span className="stamp" style={{ color: "#d8430f" }}>XVIII · THE MOON</span>&nbsp; — III · THE BEAUTIFUL LIE
        </div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "34px", color: "#241b0e", marginTop: "14px", lineHeight: 1.15 }}>
          You chose misdirection. Wise.
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "26px" }}>
          <img src={R3_MOON} alt="The Moon" width="104" style={{ borderRadius: "7px", boxShadow: "0 16px 36px -12px rgba(60,40,15,0.45)", transform: "rotate(-2.5deg)" }} />
          <div style={{ flex: 1 }}>
            <div className="day-mono" style={{ color: "#b04a18", fontSize: "9px" }}>THE POUR</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "33px", lineHeight: 1.05, color: "#241b0e", marginTop: "8px" }}>
              Tyrrell's <em>Vat 1</em>
            </div>
            <div className="day-mono" style={{ marginTop: "8px", fontSize: "8.5px" }}>SÉMILLON — HUNTER VALLEY</div>
          </div>
        </div>

        <div style={{ fontSize: "16.5px", lineHeight: 1.55, color: "rgba(42,32,18,0.85)", marginTop: "22px", textWrap: "pretty" }}>
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw
          a stave. Bone-dry, eleven percent, all misdirection. The Moon would approve.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#d8430f", display: "inline-block" }}></span>
          <span className="day-mono" style={{ fontSize: "8.5px", color: "rgba(42,32,18,0.65)" }}>A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div style={{ marginTop: "20px" }}>
          <div className="day-rule"></div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid rgba(42,32,18,0.12)" }}>
            <div className="day-mono" style={{ fontSize: "8.5px" }}>GRAPE</div>
            <div style={{ fontSize: "15.5px" }}>Sémillon</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid rgba(42,32,18,0.12)" }}>
            <div className="day-mono" style={{ fontSize: "8.5px" }}>STYLE</div>
            <div style={{ fontSize: "15.5px" }}>Dry white, bottle-aged</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
          <div style={{ flex: 1, textAlign: "center", padding: "14px 0 13px", background: "#d8430f", color: "#f7f0df", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9.5px", letterSpacing: "0.22em", paddingLeft: "0.22em", textTransform: "uppercase", boxShadow: "0 10px 26px -10px rgba(216,67,15,0.6)" }}>
            KEEP THIS MEMORY
          </div>
          <div style={{ flex: 1, textAlign: "center", padding: "14px 0 13px", border: "1px solid rgba(42,32,18,0.3)", color: "rgba(42,32,18,0.75)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9.5px", letterSpacing: "0.22em", paddingLeft: "0.22em", textTransform: "uppercase" }}>
            TELL ME MORE
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { LthrTile, CalBoard, LthrDraw, DayPour });