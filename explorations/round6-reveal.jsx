// ROUND 6 — Reveal rebuilt (bottle over card, pagination, glow button) + Smoke reveal concept
// Exports: RevealLight, RevealNight, SmokeReveal

const R6R_MOON = "assets/cards/major_18.png";

function Bottle({ name = "Vat 1", sub = "SÉMILLON" }) {
  return (
    <div className="r6-bottle">
      <div className="cap"></div>
      <div className="neck"></div>
      <div className="shoulder"></div>
      <div className="body"></div>
      <div className="label">
        <div className="ln1">Tyrrell's<br />{name}</div>
        <div className="rule"></div>
        <div className="ln2">{sub}</div>
      </div>
    </div>
  );
}

function RevealLight() {
  return (
    <div className="r6 r6-light" data-screen-label="R6 — Reveal · Day (bottle, swipe, glow)">
      <div className="r6-veil"><img src={R6R_MOON} alt="" /></div>
      <div className="r6-mottle"></div>
      <div className="r6-reveal">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r6-mono" style={{ fontSize: "8.5px" }}>VINTNER'S ARCANA</div>
          <div className="r6-mono" style={{ fontSize: "8.5px" }}>CELLAR</div>
        </div>
        <div className="r6-mono" style={{ marginTop: "20px", fontSize: "9px" }}>
          <span style={{ color: "var(--amber)" }}>XVIII · THE MOON</span> — III · THE BEAUTIFUL LIE
        </div>

        {/* card with bottle overlapping */}
        <div className="r6-reveal-stage">
          <img className="r6-reveal-card" src={R6R_MOON} alt="The Moon" width="150" />
          <Bottle></Bottle>
        </div>

        <div className="r6-reveal-name" style={{ fontSize: "44px", color: "var(--navy)", marginTop: "18px" }}>Tyrrell's Vat 1</div>
        <div className="r6-mono" style={{ marginTop: "8px", fontSize: "8px" }}>SÉMILLON — HUNTER VALLEY, AUSTRALIA</div>

        {/* pagination across the wines that fit this lens */}
        <div className="r6-dots" style={{ marginTop: "14px" }}>
          <div className="r6-dot on"></div><div className="r6-dot"></div><div className="r6-dot"></div><div className="r6-dot"></div>
        </div>
        <div className="r6-swipehint">◂ swipe — 4 pours fit this lie, white through red ▸</div>

        <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14.5px", fontWeight: 400, lineHeight: 1.5, color: "rgba(21,34,49,0.85)", marginTop: "16px", textWrap: "pretty" }}>
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. All misdirection.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--amber)" }}></span>
          <span className="r6-mono" style={{ fontSize: "8px", color: "rgba(21,34,49,0.6)" }}>BOTTLE 1 OF 4 SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div className="r6-btns">
          <div className="r6-btn fill-l" style={{ flex: 1.4 }}>KEEP THIS MEMORY</div>
          <div className="r6-btn ghost-l" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

function RevealNight() {
  return (
    <div className="r6 r6-dark" data-screen-label="R6 — Reveal · Night (swipe to a red)">
      <div className="r6-veil"><img src={R6R_MOON} alt="" /></div>
      <div className="r6-mottle"></div>
      <div className="r6-reveal">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r6-mono" style={{ fontSize: "8.5px" }}>VINTNER'S ARCANA</div>
          <div className="r6-mono" style={{ fontSize: "8.5px" }}>CELLAR</div>
        </div>
        <div className="r6-mono" style={{ marginTop: "20px", fontSize: "9px" }}>
          <span style={{ color: "var(--apri)" }}>XVIII · THE MOON</span> — III · THE BEAUTIFUL LIE
        </div>

        <div className="r6-reveal-stage">
          <img className="r6-reveal-card" src={R6R_MOON} alt="The Moon" width="150" />
          <Bottle name="—" sub="NEBBIOLO"></Bottle>
        </div>

        <div className="r6-reveal-name" style={{ fontSize: "40px", color: "var(--bone)", marginTop: "18px" }}>Produttori<br />del Barbaresco</div>
        <div className="r6-mono" style={{ marginTop: "10px", fontSize: "8px" }}>NEBBIOLO — PIEDMONT · A PRODUCER, NOT A BOTTLE</div>

        <div className="r6-dots" style={{ marginTop: "14px" }}>
          <div className="r6-dot"></div><div className="r6-dot"></div><div className="r6-dot on"></div><div className="r6-dot"></div>
        </div>
        <div className="r6-swipehint">◂ you swiped past the whites — here's the red ▸</div>

        <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "14.5px", fontWeight: 400, lineHeight: 1.5, color: "rgba(239,236,228,0.82)", marginTop: "16px", textWrap: "pretty" }}>
          Rose and tar from the same glass — the prettiest thing here is also the most structured. The Moon's
          favorite kind of contradiction.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--apri)" }}></span>
          <span className="r6-mono" style={{ fontSize: "8px", color: "rgba(239,236,228,0.6)" }}>NONE OF THESE IN YOUR CELLAR YET</span>
        </div>

        <div className="r6-btns">
          <div className="r6-btn fill-d" style={{ flex: 1.4 }}>KEEP THIS MEMORY</div>
          <div className="r6-btn ghost-d" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

function SmokeReveal() {
  return (
    <div className="r6 r6-dark r6-smoke-board" data-screen-label="R6 — Smoke reveal concept">
      <div className="r6-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r6-hunt-label">THE REVEAL, RECONSIDERED — THE NAME TURNS TO SMOKE</div>
        <div className="r6-hunt-sub">
          Replacing the weave. The card name is already drawn in script; as the card slides up and strikes it,
          the letters ignite and rise as smoke — the name doesn't leave, it disperses into the atmosphere the
          app is made of. Three frames of the motion.
        </div>
      </div>
      <div className="r6-smoke-frames" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r6-smoke-frame" style={{ flex: 1 }}>
            <div className="r6-smoke-word" style={{ top: "38%" }}>Moon</div>
            <img className="r6-smoke-card" src={R6R_MOON} alt="" style={{ transform: "translateY(70px)" }} />
          </div>
          <div className="r6-smoke-cap">01 · THE NAME WAITS</div>
          <div className="r6-smoke-note">Script name centered, card rising from below.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r6-smoke-frame" style={{ flex: 1 }}>
            <div className="r6-smoke-word dissolve" style={{ top: "30%" }}>Moon</div>
            <div className="r6-smoke-puff" style={{ width: "70px", height: "70px", top: "26%", left: "32%" }}></div>
            <div className="r6-smoke-puff" style={{ width: "50px", height: "50px", top: "20%", right: "28%" }}></div>
            <img className="r6-smoke-card" src={R6R_MOON} alt="" style={{ transform: "translateY(10px)" }} />
          </div>
          <div className="r6-smoke-cap">02 · IMPACT</div>
          <div className="r6-smoke-note">Card meets the letters; they blur, lift, and break into embered smoke.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r6-smoke-frame" style={{ flex: 1 }}>
            <div className="r6-smoke-word gone" style={{ top: "16%" }}>Moon</div>
            <div className="r6-smoke-puff" style={{ width: "90px", height: "90px", top: "10%", left: "30%", opacity: 0.5 }}></div>
            <img className="r6-smoke-card" src={R6R_MOON} alt="" />
          </div>
          <div className="r6-smoke-cap">03 · SETTLED</div>
          <div className="r6-smoke-note">Smoke clears to the ceiling; the card stands alone, the room still scented.</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RevealLight, RevealNight, SmokeReveal });
