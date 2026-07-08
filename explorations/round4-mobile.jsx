// ROUND 4 — mobile: Veil II (two tappable takes), Light Pour II, the Weave
// Exports: VeilA, VeilB, LightPourII, Weave

const R4_MOON = "assets/cards/major_18.png";

function VeilA() {
  return (
    <div className="r4-dark r4root" data-screen-label="Veil II-A — plaques">
      <div className="r4-veil"><img src={R4_MOON} alt="" /></div>
      <div className="r4-mottle"></div>
      <div className="r4-eyebrow" style={{ marginTop: "26px", position: "relative", zIndex: 5, color: "#f5aa5d" }}>
        <div className="rule"></div>
        <div className="txt">XVIII · THE MOON</div>
        <div className="rule"></div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "26px", position: "relative", zIndex: 3 }}>
        <img className="r4-cardimg" src={R4_MOON} alt="The Moon" width="212" />
      </div>
      <div className="r4-body" style={{ position: "relative", zIndex: 4, textAlign: "center", margin: "26px 48px 0", fontWeight: 300, fontSize: "15.5px", color: "rgba(236,234,229,0.66)" }}>
        Things are not as they seem tonight. Good — they rarely are.
      </div>
      <div className="r4-plaques">
        <div className="r4-plaque">
          <div className="n">I</div>
          <div className="t">It won't sit still</div>
        </div>
        <div className="r4-plaque">
          <div className="n">II</div>
          <div className="t">Drawn by tides</div>
        </div>
        <div className="r4-plaque lit">
          <div className="n">III</div>
          <div className="t">Nothing is what it appears</div>
        </div>
        <div className="r4-plaque">
          <div className="n">IV</div>
          <div className="t">Trust the dark</div>
        </div>
      </div>
      <div className="r4-mono" style={{ position: "absolute", left: 0, right: 0, bottom: "24px", textAlign: "center", fontSize: "8.5px", zIndex: 5 }}>
        EVERY TARGET A THUMB'S WIDTH — THE VEIL STAYS
      </div>
    </div>
  );
}

function VeilB() {
  return (
    <div className="r4-dark r4root" data-screen-label="Veil II-B — compass">
      <div className="r4-veil"><img src={R4_MOON} alt="" /></div>
      <div className="r4-mottle"></div>
      <div className="r4-eyebrow" style={{ marginTop: "26px", position: "relative", zIndex: 5, color: "#f5aa5d" }}>
        <div className="rule"></div>
        <div className="txt">XVIII · THE MOON</div>
        <div className="rule"></div>
      </div>
      <div className="r4-cross-v"></div>
      <div className="r4-cross-h"></div>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 3 }}>
        <img className="r4-cardimg" src={R4_MOON} alt="The Moon" width="156" />
      </div>

      <div className="r4-quad" style={{ left: "24px", top: "128px" }}>
        <div className="n">I</div>
        <div className="t">It won't sit still</div>
        <div className="w">changes every time you look</div>
      </div>
      <div className="r4-quad r" style={{ right: "24px", top: "168px" }}>
        <div className="n">II</div>
        <div className="t">Drawn by tides</div>
        <div className="w">forces you can't see</div>
      </div>
      <div className="r4-quad pressed" style={{ left: "24px", top: "590px" }}>
        <div className="n">III</div>
        <div className="t">Nothing is what it appears</div>
        <div className="w">the nose promises; the truth pours</div>
      </div>
      <div className="r4-quad r" style={{ right: "24px", top: "646px" }}>
        <div className="n">IV</div>
        <div className="t">Trust the dark</div>
        <div className="w">senses over eyes</div>
      </div>

      <div className="r4-mono" style={{ position: "absolute", left: 0, right: 0, bottom: "24px", textAlign: "center", fontSize: "8.5px", zIndex: 5 }}>
        TAP ANYWHERE IN A QUARTER — THE NEAREST FACE ANSWERS
      </div>
    </div>
  );
}

function LightPourII() {
  return (
    <div className="r4-light r4root" data-screen-label="Light Pour II — greige & ink">
      <div className="r4-veil"><img src={R4_MOON} alt="" /></div>
      <div className="r4-mottle"></div>
      <div style={{ position: "relative", zIndex: 4, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", padding: "26px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r4-mono" style={{ fontSize: "8.5px" }}>VINTNER'S ARCANA</div>
          <div className="r4-mono" style={{ fontSize: "8.5px" }}>CELLAR</div>
        </div>

        <div className="r4-mono" style={{ marginTop: "32px", fontSize: "9px" }}>
          <span style={{ color: "#c67f41" }}>XVIII · THE MOON</span> — III · THE BEAUTIFUL LIE
        </div>
        <div className="r4-display" style={{ fontSize: "37px", color: "#152231", marginTop: "12px" }}>
          You chose misdirection. Wise.
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginTop: "24px" }}>
          <img src={R4_MOON} alt="The Moon" width="100" style={{ borderRadius: "7px", boxShadow: "0 18px 38px -14px rgba(21,34,49,0.5)", transform: "rotate(-2.5deg)" }} />
          <div style={{ flex: 1 }}>
            <div className="r4-mono" style={{ color: "#c67f41", fontSize: "8.5px" }}>THE POUR</div>
            <div className="r4-display" style={{ fontSize: "31px", color: "#152231", marginTop: "7px" }}>Tyrrell's Vat 1</div>
            <div className="r4-mono" style={{ marginTop: "8px", fontSize: "8px" }}>SÉMILLON — HUNTER VALLEY</div>
          </div>
        </div>

        <div className="r4-body" style={{ fontSize: "15.5px", fontWeight: 400, color: "rgba(21,34,49,0.85)", marginTop: "22px", textWrap: "pretty" }}>
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw
          a stave. Bone-dry, eleven percent, all misdirection. The Moon would approve.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c67f41", display: "inline-block" }}></span>
          <span className="r4-mono" style={{ fontSize: "8px", color: "rgba(21,34,49,0.6)" }}>A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div style={{ marginTop: "22px" }}>
          <div className="r4-lp-rule"></div>
          <div className="r4-lp-row">
            <div className="r4-mono" style={{ fontSize: "8px" }}>GRAPE</div>
            <div className="r4-body" style={{ fontSize: "14.5px" }}>Sémillon</div>
          </div>
          <div className="r4-lp-row">
            <div className="r4-mono" style={{ fontSize: "8px" }}>STYLE</div>
            <div className="r4-body" style={{ fontSize: "14.5px" }}>Dry white, bottle-aged</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
          <div className="r4-btn navy" style={{ flex: 1 }}>KEEP THIS MEMORY</div>
          <div className="r4-btn ghostnavy" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

function Weave() {
  return (
    <div className="r4-dark r4root" data-screen-label="The Weave — reveal motion study">
      <div className="r4-mottle"></div>
      <div className="r4-eyebrow" style={{ marginTop: "26px", position: "relative", zIndex: 5, color: "#f5aa5d" }}>
        <div className="rule"></div>
        <div className="txt">XVIII — THE REVEAL</div>
        <div className="rule"></div>
      </div>

      <div className="r4-weave-word" style={{ top: "262px", fontSize: "148px", zIndex: 2 }}>MOON</div>
      <div style={{ position: "absolute", left: "50%", top: "330px", transform: "translateX(-50%) rotate(-1.5deg)", zIndex: 3 }}>
        <img className="r4-cardimg" src={R4_MOON} alt="The Moon" width="224" />
      </div>
      <div className="r4-weave-word front" style={{ top: "262px", fontSize: "148px", zIndex: 4 }}>MOON</div>

      <div className="r4-body" style={{ position: "absolute", left: "48px", right: "48px", bottom: "84px", textAlign: "center", fontWeight: 300, fontSize: "15.5px", color: "rgba(236,234,229,0.66)", zIndex: 5 }}>
        The word slides through the card as it turns — half behind, half ahead.
      </div>
      <div className="r4-mono" style={{ position: "absolute", left: 0, right: 0, bottom: "24px", textAlign: "center", fontSize: "8.5px", zIndex: 5 }}>
        NAFIA HOMAGE — REVEAL MOTION STUDY, STILL FRAME
      </div>
    </div>
  );
}

Object.assign(window, { VeilA, VeilB, LightPourII, Weave });
