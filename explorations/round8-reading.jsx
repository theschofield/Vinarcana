// ROUND 8 — Reading (data-driven, v2 hierarchy), Approach, Content board, Vignette experiment
// Reads window.ARCANA from round8-content.jsx
// Exports: ReadingCard, ApproachA, ApproachB, ContentBoard, VignetteCompare

function Reading({ id, mode = "dark", flat = false }) {
  const c = window.ARCANA[id];
  const light = mode === "light";
  return (
    <div className={"r8 " + (light ? "r8-light" : "r8-dark")} data-screen-label={"R8 — Reading · " + c.name}>
      <div className={"r8-veil" + (flat ? " flat" : "")}><img src={"assets/cards/" + CARD_FILE[id]} alt="" /></div>
      <div className="r8-mottle"></div>
      <div className="r8-read">
        <div className="r8-read-head">
          <div className="r8-eyebrow" style={{ color: light ? "var(--amber)" : "var(--apri)" }}>
            <div className="rule"></div><div className="txt">{c.num} · {c.name.toUpperCase()}</div><div className="rule"></div>
          </div>
        </div>
        <div className="r8-read-card"><img src={"assets/cards/" + CARD_FILE[id]} alt={c.name} width={c.lenses.length >= 5 ? 134 : 150} /></div>
        <div className="r8-knowing">{c.knowing}</div>
        <div className="r8-lenswrap">
          {c.lenses.map((l) => (
            <div key={l.n} className={"r8-lens" + (l.nudge ? " nudge" : "")}>
              <div className="r8-lens-num">{l.n}</div>
              <div className="r8-lens-body">
                <div className="r8-lens-name">{l.name}</div>
                <div className="r8-lens-whis">{l.whis}</div>
              </div>
            </div>
          ))}
          <div className="r8-read-foot">
            <div className="r8-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_FILE = { moon: "major_18.png", wheel: "major_18.png", death: "major_18.png", tower: "major_16.png", fool: "major_18.png" };
// NOTE: real weathered scans exist for the Tower (XVI) and Moon (XVIII). Wheel/Death/Fool
// reuse The Moon art as a stand-in until those scans arrive.

function ReadingCard(props) { return <Reading {...props}></Reading>; }

function ApproachBase({ footer, hero, whisperOpen, label }) {
  return (
    <div className="r8 r8-dark" data-screen-label={"R8 — Approach · " + label}>
      <div className="r8-mottle"></div>
      <div className="r8-approach">
        <div className="r8-approach-top">
          <div className="r8-mono" style={{ fontSize: "9px" }}>VINTNER'S ARCANA</div>
          <div className="r8-mono" style={{ fontSize: "9px" }}>MEMORY · CELLAR</div>
        </div>

        <div className="r8-deck">
          <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
          <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
          <img className="backimg" src="assets/card-back.png" alt="Vintner's Arcana deck back" />
        </div>

        <div className="r8-approach-invite" dangerouslySetInnerHTML={{ __html: hero }}></div>

        {whisperOpen ? (
          <div className="r8-whisper-open">
            <div className="r8-whisper-field">
              <span className="txt">tonight I keep circling the same decision…</span>
              <span className="caret"></span>
            </div>
          </div>
        ) : (
          <>
            <div className="r8-whisper-btn">
              <span className="spark">✶</span>
              <span>first, whisper what's on your mind</span>
            </div>
            <div className="r8-whisper-note">OPTIONAL · IT LISTENS, IT WON'T REPEAT</div>
          </>
        )}

        <div className="r8-draw-hint" dangerouslySetInnerHTML={{ __html: footer }}></div>
      </div>
    </div>
  );
}

function ApproachA() {
  return <ApproachBase
    label="A · whisper closed"
    hero={'Go on. <span class="i">We don\u2019t bite.</span>'}
    footer={'TAP THE DECK WHEN YOU\u2019RE READY'}
    whisperOpen={false}
  ></ApproachBase>;
}

function ApproachB() {
  return <ApproachBase
    label="B · whisper opened"
    hero={'Let the spirits <span class="i">pour.</span>'}
    footer={'<span class="lit">ONE TAP, ONE CARD</span>'}
    whisperOpen={true}
  ></ApproachBase>;
}

function VignetteCompare() {
  return (
    <div className="r8 r8-dark r8-explain" data-screen-label="R8 — Background: vignette vs constant 8%">
      <div className="r8-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r8-explain-label">THE BACKGROUND — UNEVEN VIGNETTE VS CONSTANT 8%</div>
        <div className="r8-explain-sub">Left: the card fades organically on every edge (slightly brighter heart, mottled falloff). Right: the flat constant-8% you said you'd happily settle for. Both dark; the reading mocks use the vignette.</div>
      </div>
      <div className="r8-compare" style={{ position: "relative", zIndex: 2 }}>
        <div className="r8-compare-cell">
          <div className="r8-compare-frame r8 r8-dark">
            <div className="r8-veil"><img src="assets/cards/major_18.png" alt="" /></div>
            <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <img src="assets/cards/major_18.png" alt="" width="96" style={{ borderRadius: "6px", boxShadow: "0 16px 36px -14px rgba(0,0,0,0.8)" }} />
            </div>
          </div>
          <div className="r8-compare-cap">UNEVEN VIGNETTE · ALL EDGES</div>
        </div>
        <div className="r8-compare-cell">
          <div className="r8-compare-frame r8 r8-dark">
            <div className="r8-veil flat"><img src="assets/cards/major_18.png" alt="" /></div>
            <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <img src="assets/cards/major_18.png" alt="" width="96" style={{ borderRadius: "6px", boxShadow: "0 16px 36px -14px rgba(0,0,0,0.8)" }} />
            </div>
          </div>
          <div className="r8-compare-cap">CONSTANT 8% · FLAT</div>
        </div>
      </div>
    </div>
  );
}

function ContentBoard() {
  const order = window.ARCANA_ORDER;
  return (
    <div className="r8 r8-dark r8-cb" data-screen-label="R8 — The Writing · five flows">
      <div className="r8-cb-head">
        <div>
          <div className="r8-cb-title">The Writing</div>
          <div className="r8-cb-sub">Five flows, voice-locked — every lens distilled from a real pairing idea in your framework, every reveal grounded in one true fact and landing on the wine.</div>
        </div>
        <div className="r8-cb-rules">
          KNOWING SMILE<br />ONE SLY BEAT · ONE TRUE FACT<br />NEVER JUDGES · ENDS ON THE WINE
        </div>
      </div>
      <div className="r8-cb-grid">
        {order.map((id) => {
          const c = window.ARCANA[id];
          return (
            <div key={id} className="r8-cb-col">
              <div className="r8-cb-num">{c.num}</div>
              <div className="r8-cb-name">{c.name}</div>
              <div className="r8-cb-chal">{c.challenging ? "CHALLENGING CARD" : "—"}</div>
              <div className="r8-cb-knowing">“{c.knowing}”</div>

              <div className="r8-cb-section">THE LENSES — {c.lenses.length}</div>
              {c.lenses.map((l) => (
                <div key={l.n} className={"r8-cb-lens" + (l.nudge ? " nudge" : "")}>
                  <div className="r8-cb-lens-name">{l.n} · {l.name}</div>
                  <div className="r8-cb-lens-whis">{l.whis}</div>
                </div>
              ))}

              <div className="r8-cb-reveal">
                <div className="r8-cb-reveal-lens">IF {c.reveal.lens}</div>
                <div className="r8-cb-reveal-head">{c.reveal.headline[0]}<span className="i">{c.reveal.headline[1]}</span></div>
                <div className="r8-cb-reveal-wine">{c.reveal.wine}</div>
                <div className="r8-cb-reveal-sub">{c.reveal.sub}</div>
                <div className="r8-cb-reveal-body">{c.reveal.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { ReadingCard, ApproachA, ApproachB, ContentBoard, VignetteCompare });
