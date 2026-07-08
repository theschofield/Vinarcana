// ROUND 7 — Reveal (to user's mockup), Approach (pre-draw), Smoke
// Exports: RevealDay, RevealNight, Approach, SmokeReveal7

const R7R_MOON = "assets/cards/major_18.png";
const R7_BOTTLE = "assets/bottle-vat1.png";
const R7_BACK = "assets/card-back.png";

function RevealDay() {
  return (
    <div className="r7 r7-light" data-screen-label="R7 — Reveal · Day (to mockup)">
      <div className="r7-veil"><img src={R7R_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div className="r7-reveal">
        <div className="r7-reveal-top">
          <div className="r7-mono" style={{ fontSize: "9px" }}>VINTNER'S ARCANA</div>
          <div className="r7-mono" style={{ fontSize: "9px" }}>CELLAR</div>
        </div>
        <div className="r7-reveal-eyebrow">
          <span style={{ color: "var(--amber)" }}>XVIII · THE MOON</span>
          <span style={{ color: "rgba(21,34,49,0.55)" }}> — III · THE BEAUTIFUL LIE</span>
        </div>
        <div className="r7-reveal-headline">You chose misdirection. <span className="r7-serif-i">Wise.</span></div>

        <div className="r7-pour-block">
          <div className="r7-cardbottle">
            <img className="card" src={R7R_MOON} alt="The Moon" />
            <img className="bottle" src={R7_BOTTLE} alt="Tyrrell's Vat 1" />
          </div>
          <div className="r7-pour-meta">
            <div className="r7-pour-label">THE POUR</div>
            <div className="r7-pour-name">Tyrrell's Vat 1</div>
            <div className="r7-pour-sub">SÉMILLON — HUNTER VALLEY</div>
          </div>
        </div>

        <div className="r7-reveal-body">
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. Bone-dry,
          eleven percent, all misdirection. The Moon would approve.
        </div>

        <div className="r7-cellar-line">
          <span className="dot"></span>
          <span className="t">A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div className="r7-stats">
          <div className="r7-stat"><span className="k">GRAPE</span><span className="v">Sémillon</span></div>
          <div className="r7-stat"><span className="k">STYLE</span><span className="v">Dry white, bottle-aged</span></div>
          <div className="r7-stat"><span className="k">COUNTRY</span><span className="v">Australia</span></div>
          <div className="r7-stat"><span className="k">NOTES</span><span className="v">Citrus, Honey, Cream</span></div>
        </div>

        <div className="r7-dots">
          <div className="r7-dot"></div><div className="r7-dot"></div><div className="r7-dot on"></div><div className="r7-dot"></div>
        </div>

        <div className="r7-btns">
          <div className="r7-btn fill-l" style={{ flex: 1.45 }}>KEEP THIS MEMORY</div>
          <div className="r7-btn ghost-l" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

function RevealNight() {
  return (
    <div className="r7 r7-dark" data-screen-label="R7 — Reveal · Night">
      <div className="r7-veil"><img src={R7R_MOON} alt="" /></div>
      <div className="r7-mottle"></div>
      <div className="r7-reveal">
        <div className="r7-reveal-top">
          <div className="r7-mono" style={{ fontSize: "9px" }}>VINTNER'S ARCANA</div>
          <div className="r7-mono" style={{ fontSize: "9px" }}>CELLAR</div>
        </div>
        <div className="r7-reveal-eyebrow">
          <span style={{ color: "var(--apri)" }}>XVIII · THE MOON</span>
          <span style={{ color: "rgba(239,236,228,0.55)" }}> — III · THE BEAUTIFUL LIE</span>
        </div>
        <div className="r7-reveal-headline" style={{ color: "var(--bone)" }}>You chose misdirection. <span className="r7-serif-i">Wise.</span></div>

        <div className="r7-pour-block">
          <div className="r7-cardbottle">
            <img className="card" src={R7R_MOON} alt="The Moon" />
            <img className="bottle" src={R7_BOTTLE} alt="Tyrrell's Vat 1" />
          </div>
          <div className="r7-pour-meta">
            <div className="r7-pour-label">THE POUR</div>
            <div className="r7-pour-name" style={{ color: "var(--bone)" }}>Tyrrell's Vat 1</div>
            <div className="r7-pour-sub">SÉMILLON — HUNTER VALLEY</div>
          </div>
        </div>

        <div className="r7-reveal-body">
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. Bone-dry,
          eleven percent, all misdirection. The Moon would approve.
        </div>

        <div className="r7-cellar-line">
          <span className="dot"></span>
          <span className="t">A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div className="r7-stats">
          <div className="r7-stat"><span className="k">GRAPE</span><span className="v" style={{ color: "var(--bone)" }}>Sémillon</span></div>
          <div className="r7-stat"><span className="k">STYLE</span><span className="v" style={{ color: "var(--bone)" }}>Dry white, bottle-aged</span></div>
          <div className="r7-stat"><span className="k">COUNTRY</span><span className="v" style={{ color: "var(--bone)" }}>Australia</span></div>
          <div className="r7-stat"><span className="k">NOTES</span><span className="v" style={{ color: "var(--bone)" }}>Citrus, Honey, Cream</span></div>
        </div>

        <div className="r7-dots">
          <div className="r7-dot"></div><div className="r7-dot"></div><div className="r7-dot on"></div><div className="r7-dot"></div>
        </div>

        <div className="r7-btns">
          <div className="r7-btn fill-d" style={{ flex: 1.45 }}>KEEP THIS MEMORY</div>
          <div className="r7-btn ghost-d" style={{ flex: 1 }}>TELL ME MORE</div>
        </div>
      </div>
    </div>
  );
}

function Approach() {
  return (
    <div className="r7 r7-dark" data-screen-label="R7 — The Approach (pre-draw)">
      <div className="r7-mottle"></div>
      <div className="r7-approach">
        <div className="r7-approach-top">
          <div className="r7-mono" style={{ fontSize: "9px" }}>VINTNER'S ARCANA</div>
          <div className="r7-mono" style={{ fontSize: "9px" }}>MEMORY · CELLAR</div>
        </div>

        <div className="r7-deck">
          <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
          <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
          <img className="backimg" src={R7_BACK} alt="Vintner's Arcana deck back" />
        </div>

        <div className="r7-approach-invite">Ask nothing.<br /><span className="i">Draw.</span></div>

        <div className="r7-whisper">
          <div className="r7-whisper-field">
            <span className="txt">something's on your mind — whisper it, or don't</span>
            <span className="caret"></span>
          </div>
          <div className="r7-whisper-note">THE DECK LISTENS · IT DOESN'T REPEAT</div>
        </div>

        <div className="r7-draw-hint">TAP THE DECK <span className="lit">— ONE BREATH, ONE CARD</span></div>
      </div>
    </div>
  );
}

function SmokeReveal7() {
  return (
    <div className="r7 r7-dark r7-smoke-board" data-screen-label="R7 — Smoke reveal · DM Serif">
      <div className="r7-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r7-board-label">THE REVEAL — THE NAME TURNS TO SMOKE (DM SERIF)</div>
        <div className="r7-board-sub">
          The card name, set in DM Serif Display, ignites and disperses the instant the rising card strikes it —
          dissolving into the smoke the app is made of. Three motion frames.
        </div>
      </div>
      <div className="r7-smoke-frames" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r7-smoke-frame" style={{ flex: 1 }}>
            <div className="r7-smoke-word" style={{ top: "40%" }}>The Moon</div>
            <img className="r7-smoke-card" src={R7R_MOON} alt="" style={{ transform: "translateY(78px)" }} />
          </div>
          <div className="r7-smoke-cap">01 · THE NAME WAITS</div>
          <div className="r7-smoke-note">Name centered, card rising from below.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r7-smoke-frame" style={{ flex: 1 }}>
            <div className="r7-smoke-word dissolve" style={{ top: "32%" }}>The Moon</div>
            <div className="r7-smoke-puff" style={{ width: "76px", height: "76px", top: "26%", left: "30%" }}></div>
            <div className="r7-smoke-puff" style={{ width: "52px", height: "52px", top: "20%", right: "26%" }}></div>
            <img className="r7-smoke-card" src={R7R_MOON} alt="" style={{ transform: "translateY(12px)" }} />
          </div>
          <div className="r7-smoke-cap">02 · IMPACT</div>
          <div className="r7-smoke-note">The card meets the letters; they blur, lift, break into embered smoke.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="r7-smoke-frame" style={{ flex: 1 }}>
            <div className="r7-smoke-word gone" style={{ top: "16%" }}>The Moon</div>
            <div className="r7-smoke-puff" style={{ width: "92px", height: "92px", top: "10%", left: "30%", opacity: 0.5 }}></div>
            <img className="r7-smoke-card" src={R7R_MOON} alt="" />
          </div>
          <div className="r7-smoke-cap">03 · SETTLED</div>
          <div className="r7-smoke-note">Smoke clears to the ceiling; the card stands alone, the room still scented.</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RevealDay, RevealNight, Approach, SmokeReveal7 });
