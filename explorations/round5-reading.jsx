// ROUND 5 — The Reading (tappable list over uneven veil), tap states, font-pairing test
// Exports: ReadingDark, ReadingLight, TapStates, PairingTestDark, PairingTestLight, VeilCompare

const R5_MOON = "assets/cards/major_18.png";

// Five lenses — proving the layout scales past four
const MOON_LENSES = [
  { n: "I", name: "It won't sit still", whis: "it changes every time you look" },
  { n: "II", name: "Drawn by tides", whis: "moved by forces you can't see" },
  { n: "III", name: "Nothing is what it appears", whis: "the nose promises; the truth pours" },
  { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
  { n: "V", name: "The long way home", whis: "the path bends before it arrives" },
];

function LensList({ activeIndex = 2, cls = "" }) {
  return (
    <div className={"r5-lenslist " + cls}>
      {MOON_LENSES.map((l, i) => (
        <div key={l.n} className={"r5-lens-row" + (i === activeIndex ? " active" : "")}>
          <div className="r5-lens-num">{l.n}</div>
          <div className="r5-lens-body">
            <div className="r5-lens-name">{l.name}</div>
            <div className="r5-lens-whis">{l.whis}</div>
          </div>
          <div className="r5-lens-go">→</div>
        </div>
      ))}
    </div>
  );
}

function ReadingDark() {
  return (
    <div className="r5 r5-dark" data-screen-label="R5 — The Reading (dark, 5 lenses)">
      <div className="r5-veil"><img src={R5_MOON} alt="" /></div>
      <div className="r5-mottle"></div>
      <div className="r5-read">
        <div className="r5-read-head">
          <div className="r5-eyebrow" style={{ color: "var(--apri)" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r5-read-card"><img src={R5_MOON} alt="The Moon" width="150" /></div>
        <div className="r5-read-title">The Moon</div>
        <div className="r5-read-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <LensList activeIndex={2}></LensList>
        <div className="r5-read-foot">
          <div className="r5-mono" style={{ fontSize: "8.5px" }}>FIVE FACES TONIGHT — TURN TOWARD THE ONE THAT KNOWS YOU</div>
        </div>
      </div>
    </div>
  );
}

function ReadingLight() {
  return (
    <div className="r5 r5-light" data-screen-label="R5 — The Reading (light, 5 lenses)">
      <div className="r5-veil"><img src={R5_MOON} alt="" /></div>
      <div className="r5-mottle"></div>
      <div className="r5-read">
        <div className="r5-read-head">
          <div className="r5-eyebrow" style={{ color: "var(--amber)" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r5-read-card"><img src={R5_MOON} alt="The Moon" width="150" /></div>
        <div className="r5-read-title">The Moon</div>
        <div className="r5-read-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <LensList activeIndex={2}></LensList>
        <div className="r5-read-foot">
          <div className="r5-mono" style={{ fontSize: "8.5px" }}>FIVE FACES TONIGHT — TURN TOWARD THE ONE THAT KNOWS YOU</div>
        </div>
      </div>
    </div>
  );
}

function TapStates() {
  return (
    <div className="r5 r5-dark r5-tap" data-screen-label="R5 — Tappable states (no orange box)">
      <div className="r5-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r5-ts-label">MAKING A CHOSEN LENS FEEL TAPPED — WITHOUT THE ORANGE OUTLINE</div>
        <div className="r5-ts-sub">Three quieter ways to say "this one." Each keeps the full row as the hit target (≥44px).</div>
      </div>
      <div className="r5-tap-grid" style={{ position: "relative", zIndex: 2 }}>
        <div className="r5-tap-col">
          <div className="r5-tap-title">A · TICK + WASH</div>
          <div className="r5-tap-note">A short apricot tick at the edge, a whisper of warm gradient, the numeral lights. Used in the Reading mocks.</div>
          <div className="r5-tap-demo">
            <div className="r5-lens-row"><div className="r5-lens-num">II</div><div className="r5-lens-body"><div className="r5-lens-name">Drawn by tides</div></div></div>
            <div className="r5-lens-row active"><div className="r5-lens-num">III</div><div className="r5-lens-body"><div className="r5-lens-name">Nothing is what it appears</div></div><div className="r5-lens-go">→</div></div>
            <div className="r5-lens-row" style={{ borderBottom: "none" }}><div className="r5-lens-num">IV</div><div className="r5-lens-body"><div className="r5-lens-name">Trust the dark</div></div></div>
          </div>
        </div>
        <div className="r5-tap-col">
          <div className="r5-tap-title">B · FILLED NUMERAL</div>
          <div className="r5-tap-note">The roman numeral sits in a ring; tapping fills it solid apricot. Tactile, button-like, no row chrome.</div>
          <div className="r5-tap-demo r5-tap-pill">
            <div className="r5-lens-row"><div className="r5-lens-num">II</div><div className="r5-lens-body"><div className="r5-lens-name">Drawn by tides</div></div></div>
            <div className="r5-lens-row active"><div className="r5-lens-num">III</div><div className="r5-lens-body"><div className="r5-lens-name">Nothing is what it appears</div></div></div>
            <div className="r5-lens-row" style={{ borderBottom: "none" }}><div className="r5-lens-num">IV</div><div className="r5-lens-body"><div className="r5-lens-name">Trust the dark</div></div></div>
          </div>
        </div>
        <div className="r5-tap-col">
          <div className="r5-tap-title">C · UNDERLINE DRAW</div>
          <div className="r5-tap-note">A single hairline draws under the chosen name, like underscoring a word in ink. The quietest of the three.</div>
          <div className="r5-tap-demo r5-tap-underline">
            <div className="r5-lens-row"><div className="r5-lens-num">II</div><div className="r5-lens-body"><div className="r5-lens-name">Drawn by tides</div></div></div>
            <div className="r5-lens-row active"><div className="r5-lens-num">III</div><div className="r5-lens-body"><div className="r5-lens-name">Nothing is what it appears</div></div></div>
            <div className="r5-lens-row" style={{ borderBottom: "none" }}><div className="r5-lens-num">IV</div><div className="r5-lens-body"><div className="r5-lens-name">Trust the dark</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Font-pairing test: Round-3 pairing (Instrument Serif + Cormorant) on new colors ----
function PairingTestRow({ light }) {
  return (
    <div className="r5-lenslist" style={{ margin: "18px 22px 0" }}>
      {MOON_LENSES.slice(0, 4).map((l, i) => (
        <div key={l.n} className={"r5-lens-row" + (i === 2 ? " active" : "")}>
          <div className="r5-lens-num" style={{ fontFamily: "Cormorant, serif", fontStyle: "italic" }}>{l.n}</div>
          <div className="r5-lens-body">
            <div className="r5-lens-name" style={{ fontFamily: "Cormorant, serif", fontWeight: 500, fontSize: "22px" }}>{l.name}</div>
            <div className="r5-lens-whis" style={{ fontFamily: "Cormorant, serif", fontStyle: "italic", fontSize: "14.5px" }}>{l.whis}</div>
          </div>
          <div className="r5-lens-go">→</div>
        </div>
      ))}
    </div>
  );
}

function PairingTestDark() {
  return (
    <div className="r5 r5-dark" data-screen-label="R5 — Old pairing on new color (dark)">
      <div className="r5-veil"><img src={R5_MOON} alt="" /></div>
      <div className="r5-mottle"></div>
      <div className="r5-read">
        <div className="r5-read-head">
          <div className="r5-mono" style={{ fontSize: "8px", color: "rgba(245,170,93,0.7)" }}>FONT TEST · INSTRUMENT SERIF + CORMORANT</div>
          <div className="r5-eyebrow" style={{ color: "var(--apri)", marginTop: "12px" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r5-read-card"><img src={R5_MOON} alt="The Moon" width="146" /></div>
        <div className="r5-read-title" style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}>The Moon</div>
        <div className="r5-read-knowing" style={{ fontFamily: "Cormorant, serif", fontStyle: "italic", fontSize: "17px" }}>Things are not as they seem tonight. Good — they rarely are.</div>
        <PairingTestRow></PairingTestRow>
        <div className="r5-read-foot"><div className="r5-mono" style={{ fontSize: "8px" }}>THE ROUND-3 PAIRING, MINUS THE HALLOWEEN</div></div>
      </div>
    </div>
  );
}

function PairingTestLight() {
  return (
    <div className="r5 r5-light" data-screen-label="R5 — Old pairing on new color (light)">
      <div className="r5-veil"><img src={R5_MOON} alt="" /></div>
      <div className="r5-mottle"></div>
      <div className="r5-read">
        <div className="r5-read-head">
          <div className="r5-mono" style={{ fontSize: "8px", color: "rgba(198,127,65,0.85)" }}>FONT TEST · INSTRUMENT SERIF + CORMORANT</div>
          <div className="r5-eyebrow" style={{ color: "var(--amber)", marginTop: "12px" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r5-read-card"><img src={R5_MOON} alt="The Moon" width="146" /></div>
        <div className="r5-read-title" style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}>The Moon</div>
        <div className="r5-read-knowing" style={{ fontFamily: "Cormorant, serif", fontStyle: "italic", fontSize: "17px" }}>Things are not as they seem tonight. Good — they rarely are.</div>
        <PairingTestRow light></PairingTestRow>
        <div className="r5-read-foot"><div className="r5-mono" style={{ fontSize: "8px" }}>THE ROUND-3 PAIRING, MINUS THE HALLOWEEN</div></div>
      </div>
    </div>
  );
}

function VeilCompare() {
  return (
    <div className="r5 r5-dark" style={{ display: "flex", flexDirection: "column", padding: "30px 34px", boxSizing: "border-box" }} data-screen-label="R5 — Veil: flat vs uneven fade">
      <div className="r5-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r5-ts-label">THE VEIL — FLAT (R4) VS UNEVEN FADE (NEW)</div>
        <div className="r5-ts-sub">The new veil is a radial mask: present at the heart, dissolving to nothing at the edges — the way the V2 veil read. Shown both modes.</div>
      </div>
      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "22px", flex: 1, marginTop: "22px" }}>
        <VeilMini mode="dark" flat caption="DARK · FLAT 8%"></VeilMini>
        <VeilMini mode="dark" caption="DARK · UNEVEN FADE"></VeilMini>
        <VeilMini mode="light" caption="LIGHT · UNEVEN FADE"></VeilMini>
      </div>
    </div>
  );
}

function VeilMini({ mode, flat, caption }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={"r5 " + (mode === "light" ? "r5-light" : "r5-dark")} style={{ flex: 1, borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(239,236,228,0.1)" }}>
        <div className={"r5-veil" + (flat ? " flat" : "")}><img src={R5_MOON} alt="" /></div>
        <div className="r5-mottle"></div>
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "14px" }}>
          <img src={R5_MOON} alt="The Moon" width="92" style={{ borderRadius: "6px", boxShadow: "0 16px 36px -14px rgba(0,0,0,0.8)" }} />
          <div className="r5-serif" style={{ fontSize: "22px", color: mode === "light" ? "var(--navy)" : "var(--bone)" }}>The Moon</div>
        </div>
      </div>
      <div className="r5-mono" style={{ fontSize: "8px", textAlign: "center", marginTop: "10px" }}>{caption}</div>
    </div>
  );
}

Object.assign(window, { ReadingDark, ReadingLight, TapStates, PairingTestDark, PairingTestLight, VeilCompare });
