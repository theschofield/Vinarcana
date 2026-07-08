// ROUND 6 — Reading rebuilt (giant script backdrop, full-bleed shimmer) + Orbit-5
// Exports: ReadingNight, ReadingDay, OrbitFive

const R6_MOON = "assets/cards/major_18.png";

const LENSES5 = [
  { n: "I", name: "It won't sit still", whis: "it changes every time you look" },
  { n: "II", name: "Drawn by tides", whis: "moved by forces you can't see" },
  { n: "III", name: "Nothing is what it appears", whis: "the nose promises; the truth pours" },
  { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
  { n: "V", name: "The long way home", whis: "the path bends before it arrives" },
];

function ReadingBody({ light }) {
  return (
    <div className="r6-read">
      <div className="r6-read-head">
        <div className="r6-eyebrow" style={{ color: light ? "var(--amber)" : "var(--apri)" }}>
          <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
        </div>
      </div>
      {/* giant faint script name, printed behind the card in z-space */}
      <div className="r6-bgname">Moon</div>
      <div className="r6-read-card"><img src={R6_MOON} alt="The Moon" width="178" /></div>
      <div className="r6-read-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
      <div className="r6-lenslist">
        {LENSES5.map((l, i) => (
          <div key={l.n} className={"r6-lens" + (i === 2 ? " nudge" : "")}>
            <div className="r6-lens-num">{l.n}</div>
            <div className="r6-lens-body">
              <div className="r6-lens-name">{l.name}</div>
              <div className="r6-lens-whis">{l.whis}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="r6-read-foot">
        <div className="r6-mono" style={{ fontSize: "8.5px" }}>TURN TOWARD THE ONE THAT KNOWS YOU</div>
      </div>
    </div>
  );
}

function ReadingNight() {
  return (
    <div className="r6 r6-dark" data-screen-label="R6 — Reading · Night">
      <div className="r6-veil"><img src={R6_MOON} alt="" /></div>
      <div className="r6-mottle"></div>
      <ReadingBody></ReadingBody>
    </div>
  );
}

function ReadingDay() {
  return (
    <div className="r6 r6-light" data-screen-label="R6 — Reading · Day">
      <div className="r6-veil"><img src={R6_MOON} alt="" /></div>
      <div className="r6-mottle"></div>
      <ReadingBody light></ReadingBody>
    </div>
  );
}

function OrbitFive() {
  return (
    <div className="r6 r6-dark" data-screen-label="R6 — Orbit with 5 lenses">
      <div className="r6-veil"><img src={R6_MOON} alt="" /></div>
      <div className="r6-mottle"></div>
      <div style={{ position: "relative", zIndex: 3, paddingTop: "24px" }}>
        <div className="r6-eyebrow" style={{ color: "var(--apri)" }}>
          <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
        </div>
      </div>
      {/* centered card */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 3 }}>
        <img src={R6_MOON} alt="The Moon" width="150" style={{ borderRadius: "9px", boxShadow: "0 26px 60px -20px rgba(0,0,0,0.85)" }} />
      </div>

      {/* five anchors arranged around the card */}
      <div className="r6-orbit-anchor" style={{ left: "22px", top: "150px" }}>
        <div className="r6-orbit-num">I</div>
        <div className="r6-orbit-name">It won't sit still</div>
        <div className="r6-orbit-whis">changes every time you look</div>
      </div>
      <div className="r6-orbit-anchor r" style={{ right: "22px", top: "212px" }}>
        <div className="r6-orbit-num">II</div>
        <div className="r6-orbit-name">Drawn by tides</div>
        <div className="r6-orbit-whis">forces you can't see</div>
      </div>
      <div className="r6-orbit-anchor nudge" style={{ left: "22px", top: "486px" }}>
        <div className="r6-orbit-num">III</div>
        <div className="r6-orbit-name">Nothing is what it appears</div>
        <div className="r6-orbit-whis">the nose promises; the truth pours</div>
      </div>
      <div className="r6-orbit-anchor r" style={{ right: "22px", top: "548px" }}>
        <div className="r6-orbit-num">IV</div>
        <div className="r6-orbit-name">Trust the dark</div>
        <div className="r6-orbit-whis">senses over eyes</div>
      </div>
      <div className="r6-orbit-anchor" style={{ left: "50%", bottom: "70px", transform: "translateX(-50%)", textAlign: "center", width: "200px" }}>
        <div className="r6-orbit-num">V</div>
        <div className="r6-orbit-name">The long way home</div>
        <div className="r6-orbit-whis">the path bends before it arrives</div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: "26px", textAlign: "center", zIndex: 4 }}>
        <div className="r6-mono" style={{ fontSize: "8px" }}>FIVE IN ORBIT — TIGHTER, BUT IT HOLDS</div>
      </div>
    </div>
  );
}

Object.assign(window, { ReadingNight, ReadingDay, OrbitFive });
