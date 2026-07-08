// ROUND 7 — Reading (DM Serif, lower list, two title treatments) + Orbit
// Exports: ReadingTitled, ReadingBare, ReadingFive, OrbitFive7

const R7_MOON = "assets/cards/major_18.png";

const LENS4 = [
  { n: "I", name: "It won't sit still", whis: "it changes every time you look" },
  { n: "II", name: "Drawn by tides", whis: "moved by forces you can't see" },
  { n: "III", name: "Nothing is what it appears", whis: "the nose promises; the truth pours" },
  { n: "IV", name: "Trust the dark", whis: "your senses know more than your eyes" },
];
const LENS5 = [...LENS4, { n: "V", name: "The long way home", whis: "the path bends before it arrives" }];

function LensList({ lenses, nudgeIndex = 2 }) {
  return (
    <div className="r7-lenslist">
      {lenses.map((l, i) => (
        <div key={l.n} className={"r7-lens" + (i === nudgeIndex ? " nudge" : "")}>
          <div className="r7-lens-num">{l.n}</div>
          <div className="r7-lens-body">
            <div className="r7-lens-name">{l.name}</div>
            <div className="r7-lens-whis">{l.whis}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Variant A — title BENEATH the card (DM Serif), 4 lenses
function ReadingTitled() {
  return (
    <div className="r7 r7-dark" data-screen-label="R7 — Reading · title beneath">
      <div className="r7-veil"><img src={R7_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div className="r7-read">
        <div className="r7-read-head">
          <div className="r7-eyebrow" style={{ color: "var(--apri)" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r7-read-card"><img src={R7_MOON} alt="The Moon" width="172" /></div>
        <div className="r7-read-title">The Moon</div>
        <div className="r7-read-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <div className="r7-lenswrap">
          <LensList lenses={LENS4}></LensList>
          <div className="r7-read-foot" style={{ paddingTop: "22px" }}>
            <div className="r7-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
        <div style={{ height: "22px" }}></div>
      </div>
    </div>
  );
}

// Variant B — NO title, card grows, 4 lenses
function ReadingBare() {
  return (
    <div className="r7 r7-dark" data-screen-label="R7 — Reading · no title, bigger card">
      <div className="r7-veil"><img src={R7_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div className="r7-read">
        <div className="r7-read-head">
          <div className="r7-eyebrow" style={{ color: "var(--apri)" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r7-read-card"><img src={R7_MOON} alt="The Moon" width="212" /></div>
        <div className="r7-read-knowing" style={{ marginTop: "20px" }}>Things are not as they seem tonight. Good — they rarely are.</div>
        <div className="r7-lenswrap">
          <LensList lenses={LENS4}></LensList>
          <div className="r7-read-foot" style={{ paddingTop: "22px" }}>
            <div className="r7-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
        <div style={{ height: "22px" }}></div>
      </div>
    </div>
  );
}

// Five-lens, list moved lower (symmetric breathing room)
function ReadingFive() {
  return (
    <div className="r7 r7-light" data-screen-label="R7 — Reading · Day · 5 lenses">
      <div className="r7-veil"><img src={R7_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div className="r7-read">
        <div className="r7-read-head">
          <div className="r7-eyebrow" style={{ color: "var(--amber)" }}>
            <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
          </div>
        </div>
        <div className="r7-read-card"><img src={R7_MOON} alt="The Moon" width="158" /></div>
        <div className="r7-read-title">The Moon</div>
        <div className="r7-read-knowing">Things are not as they seem tonight. Good — they rarely are.</div>
        <div className="r7-lenswrap">
          <LensList lenses={LENS5}></LensList>
          <div className="r7-read-foot" style={{ paddingTop: "20px" }}>
            <div className="r7-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
        <div style={{ height: "20px" }}></div>
      </div>
    </div>
  );
}

function OrbitFive7() {
  return (
    <div className="r7 r7-dark" data-screen-label="R7 — Orbit · bigger card, dark backing">
      <div className="r7-veil"><img src={R7_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div style={{ position: "relative", zIndex: 3, paddingTop: "24px" }}>
        <div className="r7-eyebrow" style={{ color: "var(--apri)" }}>
          <div className="rule"></div><div className="txt">XVIII · THE MOON</div><div className="rule"></div>
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 3 }}>
        <img src={R7_MOON} alt="The Moon" width="182" style={{ borderRadius: "10px", boxShadow: "0 28px 64px -20px rgba(0,0,0,0.9)" }} />
      </div>

      {/* anti-flare dark backings + anchors */}
      <div className="r7-orbit-backing" style={{ width: "230px", height: "150px", left: "-50px", top: "120px" }}></div>
      <div className="r7-orbit-anchor" style={{ left: "20px", top: "146px" }}>
        <div className="r7-orbit-num">I</div>
        <div className="r7-orbit-name">It won't sit still</div>
        <div className="r7-orbit-whis">changes every time you look</div>
      </div>

      <div className="r7-orbit-backing" style={{ width: "230px", height: "150px", right: "-50px", top: "210px" }}></div>
      <div className="r7-orbit-anchor r" style={{ right: "20px", top: "232px" }}>
        <div className="r7-orbit-num">II</div>
        <div className="r7-orbit-name">Drawn by tides</div>
        <div className="r7-orbit-whis">forces you can't see</div>
      </div>

      <div className="r7-orbit-backing" style={{ width: "240px", height: "160px", left: "-50px", top: "470px" }}></div>
      <div className="r7-orbit-anchor" style={{ left: "20px", top: "496px" }}>
        <div className="r7-orbit-num">III</div>
        <div className="r7-orbit-name">Nothing is what it appears</div>
        <div className="r7-orbit-whis">the nose promises; the truth pours</div>
      </div>

      <div className="r7-orbit-backing" style={{ width: "230px", height: "150px", right: "-50px", top: "556px" }}></div>
      <div className="r7-orbit-anchor r" style={{ right: "20px", top: "582px" }}>
        <div className="r7-orbit-num">IV</div>
        <div className="r7-orbit-name">Trust the dark</div>
        <div className="r7-orbit-whis">senses over eyes</div>
      </div>

      <div className="r7-orbit-backing" style={{ width: "260px", height: "140px", left: "50%", bottom: "44px", transform: "translateX(-50%)" }}></div>
      <div className="r7-orbit-anchor" style={{ left: "50%", bottom: "66px", transform: "translateX(-50%)", textAlign: "center", width: "210px" }}>
        <div className="r7-orbit-num">V</div>
        <div className="r7-orbit-name">The long way home</div>
        <div className="r7-orbit-whis">the path bends before it arrives</div>
      </div>
    </div>
  );
}

Object.assign(window, { ReadingTitled, ReadingBare, ReadingFive, OrbitFive7 });
