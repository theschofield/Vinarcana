// ROUND 3 — Mobile reading layouts, four divergent takes
// Each uses a different lettering voice so layouts and type can be mixed freely.
// Exports: MobV1, MobV2, MobV3, MobV4

const R3M_MOON = "assets/cards/major_18.png";
const R3M_ORANGE = "#f4500a";

function MobV1() {
  return (
    <div className="lthr mv" style={{ "--stamp": R3M_ORANGE }} data-screen-label="V1 — The Ledger">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", paddingTop: "24px" }}>
        <div className="mv-eyebrow">
          <div className="rule"></div>
          <div className="txt stamp" style={{ color: R3M_ORANGE }}>XVIII · THE MOON</div>
          <div className="rule"></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <img className="mv-cardimg" src={R3M_MOON} alt="The Moon" width="158" />
        </div>
        <div className="v1-title" style={{ marginTop: "22px" }}>The Moon</div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "15.5px", textAlign: "center", color: "rgba(233,222,198,0.55)", margin: "8px 40px 0", lineHeight: 1.4 }}>
          Things are not as they seem tonight. Good — they rarely are.
        </div>
        <div style={{ margin: "20px 28px 0" }}>
          <div className="v1-row">
            <div className="v1-num stamp">I</div>
            <div>
              <div className="v1-name">It won't sit still</div>
              <div className="v1-whisper">it changes every time you look</div>
            </div>
          </div>
          <div className="v1-row">
            <div className="v1-num stamp">II</div>
            <div>
              <div className="v1-name">Drawn by tides</div>
              <div className="v1-whisper">moved by forces you can't see</div>
            </div>
          </div>
          <div className="v1-row">
            <div className="v1-num stamp">III</div>
            <div>
              <div className="v1-name">Nothing is what it appears</div>
              <div className="v1-whisper">the nose promises; the truth pours</div>
            </div>
          </div>
          <div className="v1-row">
            <div className="v1-num stamp">IV</div>
            <div>
              <div className="v1-name">Trust the dark</div>
              <div className="v1-whisper">your senses know more than your eyes</div>
            </div>
          </div>
        </div>
        <div className="mv-caption" style={{ marginTop: "auto", paddingBottom: "26px" }}>
          T1 VOICE · TURN TOWARD THE ONE THAT KNOWS YOU
        </div>
      </div>
    </div>);

}

function MobV2() {
  return (
    <div className="lthr mv" style={{ "--stamp": R3M_ORANGE }} data-screen-label="V2 — The Veil">
      <div className="v2-veil"><img src={R3M_MOON} alt="" /></div>
      <div className="lthr-vignette"></div>
      <div className="mv-eyebrow" style={{ marginTop: "26px", position: "relative", zIndex: 5 }}>
        <div className="rule"></div>
        <div className="txt stamp" style={{ color: R3M_ORANGE }}>XVIII · THE MOON</div>
        <div className="rule"></div>
      </div>

      <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)", zIndex: 3 }}>
        <img className="mv-cardimg" src={R3M_MOON} alt="The Moon" width="206" />
      </div>

      <div className="v2-anchor" style={{ left: "22px", top: "104px" }}>
        <div className="num stamp">I</div>
        <div className="name">It won't sit still</div>
        <div className="whis">changes every time you look</div>
      </div>
      <div className="v2-anchor r" style={{ right: "22px", top: "150px" }}>
        <div className="num stamp">II</div>
        <div className="name">Drawn by tides</div>
        <div className="whis">forces you can't see</div>
      </div>
      <div className="v2-anchor" style={{ left: "22px", top: "596px" }}>
        <div className="num stamp">III</div>
        <div className="name">Nothing is what it appears</div>
        <div className="whis">the nose promises; the truth pours</div>
      </div>
      <div className="v2-anchor r" style={{ right: "22px", top: "642px" }}>
        <div className="num stamp">IV</div>
        <div className="name">Trust the dark</div>
        <div className="whis">senses over eyes</div>
      </div>

      <div className="mv-caption" style={{ position: "absolute", left: 0, right: 0, bottom: "26px", zIndex: 5 }}>
        V2 VOICE · THE IMAGE BECOMES THE ROOM
      </div>
    </div>);

}

function MobV3() {
  return (
    <div className="lthr mv" style={{ "--stamp": R3M_ORANGE }} data-screen-label="V3 — The Letter">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", paddingTop: "26px" }}>
        <div className="mv-eyebrow">
          <div className="rule"></div>
          <div className="txt" style={{ color: "rgba(233,222,198,0.5)" }}>A READING, IN INK</div>
          <div className="rule"></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "22px" }}>
          <img className="mv-cardimg" src={R3M_MOON} alt="The Moon" width="92" style={{ transform: "rotate(-2.5deg)" }} />
        </div>
        <div className="v3-letter" style={{ marginTop: "30px" }}>
          You've drawn the Moon. Things are not as they seem tonight —
          they rarely are. The card speaks of <span className="ph stamp">the face that
          won't sit still</span>, of <span className="ph stamp">tides that pull unseen</span>,
          of <span className="ph lit stamp">the beautiful lie</span>, and of <span className="ph stamp">trusting
          your senses with your eyes closed</span>.
        </div>
        <div className="v3-letter" style={{ marginTop: "18px" }}>
          One of these is yours. You already know which.
        </div>
        <div className="v3-sig">— the deck</div>
        <div className="mv-caption" style={{ marginTop: "auto", paddingBottom: "26px" }}>
          T3 VOICE · TAP THE PHRASE THAT STINGS
        </div>
      </div>
    </div>);

}

function MobV4() {
  return (
    <div className="lthr mv" style={{ "--stamp": R3M_ORANGE }} data-screen-label="V4 — The Procession">
      <div className="lthr-grain"></div>
      <div className="lthr-vignette"></div>
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", paddingTop: "24px", overflow: "hidden" }}>
        <div className="mv-eyebrow">
          <div className="rule"></div>
          <div className="txt stamp" style={{ color: R3M_ORANGE }}>XVIII · THE MOON</div>
          <div className="rule"></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <img className="mv-cardimg" src={R3M_MOON} alt="The Moon" width="216" />
        </div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic", fontSize: "15.5px", textAlign: "center", color: "rgba(233,222,198,0.55)", margin: "16px 44px 0", lineHeight: 1.4 }}>
          Four faces pass before you, one at a time.
        </div>

        <div className="v4-rail" style={{ marginLeft: "-226px" }}>
          <div className="v4-card peek">
            <div className="lthr-mono stamp" style={{ color: R3M_ORANGE, fontSize: "9px" }}>II</div>
            <div className="v4-name">Drawn by Tides</div>
            <div className="v4-whis">moved by forces you can't see</div>
          </div>
          <div className="v4-card">
            <div className="lthr-mono stamp" style={{ color: R3M_ORANGE, fontSize: "9px" }}>III · THE BEAUTIFUL LIE</div>
            <div className="v4-name">Nothing Is What It Appears</div>
            <div className="v4-whis">the nose promises one thing; the truth pours another</div>
            <div className="v4-cta stamp">Follow this thread →</div>
          </div>
          <div className="v4-card peek">
            <div className="lthr-mono stamp" style={{ color: R3M_ORANGE, fontSize: "9px" }}>IV</div>
            <div className="v4-name">Trust the Dark</div>
            <div className="v4-whis">your senses know more than your eyes</div>
          </div>
        </div>

        <div className="v4-dots">
          <div className="v4-dot"></div>
          <div className="v4-dot"></div>
          <div className="v4-dot" style={{ background: R3M_ORANGE }}></div>
          <div className="v4-dot"></div>
        </div>

        <div className="mv-caption" style={{ marginTop: "auto", paddingBottom: "26px" }}>
          T4 VOICE · SWIPE THE PROCESSION — RELEASE TO CHOOSE
        </div>
      </div>
    </div>);

}

Object.assign(window, { MobV1, MobV2, MobV3, MobV4 });