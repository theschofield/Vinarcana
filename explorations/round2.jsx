// ROUND 2 — "Ember & Ink" artboards
// Exports: R2Tile, R2Approach, R2Reveal, R2Reading, R2Pour, R2Mobile

const R2_MOON = "assets/cards/major_18.png";

function R2Chrome() {
  return (
    <div className="r2-top">
      <div className="r2-brand">
        <div className="r2-crescent"></div>
        <div className="r2-mono" style={{ color: "rgba(234,224,204,0.7)" }}>VINTNER'S ARCANA</div>
      </div>
      <div className="r2-navlinks">
        <div className="r2-mono">MEMORY</div>
        <div className="r2-mono">CELLAR</div>
      </div>
    </div>
  );
}

function R2Tile() {
  return (
    <div className="r2 r2-tile" data-screen-label="R2 — Style Tile">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r2-tile-name">Ember &amp; Ink</div>
        <div className="r2-tile-desc">
          The fused direction. Stark ember orange against near-black — pulled from
          the flag in The Sun. The weathered Rider–Waite scans carry the ancient;
          Bodoni's swelling, tapering strokes carry the ink-in-a-vein sensuality.
          Ornament stays hairline; the cards themselves are the engraving.
        </div>

        <div className="r2-tile-section">PALETTE</div>
        <div className="r2-swatches" style={{ marginBottom: "24px" }}>
          <div className="r2-swatch" style={{ background: "#0b0806" }}><span>ink</span></div>
          <div className="r2-swatch" style={{ background: "#3a2415" }}><span>smoke</span></div>
          <div className="r2-swatch" style={{ background: "#7a2d0e" }}><span>scorch</span></div>
          <div className="r2-swatch" style={{ background: "#e0571c" }}><span>ember</span></div>
          <div className="r2-swatch" style={{ background: "#eae0cc" }}><span>bone</span></div>
        </div>

        <div className="r2-tile-section">TYPE</div>
        <div className="r2-type-display">THE MOON <em>— poured in confidence.</em></div>
        <div className="r2-type-voice">EB Garamond italic stays the speaking voice — quiet, complicit.</div>
        <div className="r2-type-note">
          Bodoni Moda: razor hairlines against full-blooded stems — the stroke
          ebbs and flows like ink under pressure. IBM Plex Mono whispers the
          coordinates. Three fonts, no more.
        </div>

        <div className="r2-tile-section">DECIDED THIS ROUND</div>
        <div className="r2-type-note" style={{ marginTop: "0" }}>
          Ritual: <b style={{ color: "#eae0cc" }}>R2 · One Breath</b> — one tap, card rises, smoke parts.<br />
          Steering: <b style={{ color: "#eae0cc" }}>optional whisper before the pull</b>; silence simply
          means the lenses wait for you after the reveal.<br />
          Card art: <b style={{ color: "#eae0cc" }}>your weathered Rider–Waite scans</b>, which bleed out
          faintly behind the drawn card — the image begins to consume the room.
        </div>

        <div className="r2-tile-section">MOTIFS</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div className="r2-deckmoon" style={{ width: "34px", height: "34px" }}></div>
          <div className="r2-deckdiamond"></div>
          <div className="r2-eyebrow" style={{ justifyContent: "flex-start" }}>
            <div className="rule" style={{ transform: "scaleX(-1)" }}></div>
            <div className="txt">XVIII</div>
            <div className="rule r" style={{ transform: "scaleX(-1)" }}></div>
          </div>
          <span className="r2-emberdot"></span>
        </div>
      </div>
    </div>
  );
}

function R2Approach() {
  return (
    <div className="r2" data-screen-label="R2 — The Approach (whisper + draw)">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <div className="r2-vignette"></div>
      <R2Chrome></R2Chrome>
      <div style={{ position: "relative", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "84px" }}>
        <div className="r2-eyebrow">
          <div className="rule"></div>
          <div className="txt">THE DECK IS CUT</div>
          <div className="rule r"></div>
        </div>
        <div className="r2-deckwrap" style={{ marginTop: "34px" }}>
          <div className="r2-deck-under" style={{ transform: "rotate(2.2deg) translate(7px, 3px)" }}></div>
          <div className="r2-deck-under" style={{ transform: "rotate(-1.6deg) translate(-5px, 5px)" }}></div>
          <div className="r2-deckcard">
            <div className="r2-deckglyph">
              <div className="r2-deckmoon"></div>
              <div className="r2-deckdiamond"></div>
            </div>
          </div>
        </div>
        <div className="r2-whisper" style={{ marginTop: "46px" }}>
          <div className="r2-whisper-line">
            <span>something's on your mind — whisper it, or don't</span>
            <span className="caret"></span>
          </div>
          <div className="r2-mono r2-whisper-note">THE DECK LISTENS. IT DOESN'T REPEAT.</div>
        </div>
        <div className="r2-mono" style={{ marginTop: "40px", color: "rgba(234,224,204,0.55)" }}>
          TAP THE DECK WHEN YOU'RE READY <span className="lit">— ONE TAP, ONE CARD</span>
        </div>
      </div>
    </div>
  );
}

function R2Reveal() {
  return (
    <div className="r2" data-screen-label="R2 — The Reveal (the image consumes)">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <R2Chrome></R2Chrome>
      <div className="r2-bleedwrap" style={{ position: "relative", zIndex: 3, flexDirection: "column", paddingTop: "66px" }}>
        <img className="r2-bleed" src={R2_MOON} alt="" style={{ top: "56%" }} />
        <div className="r2-eyebrow" style={{ position: "relative", zIndex: 2 }}>
          <div className="rule"></div>
          <div className="txt">XVIII · THE MOON</div>
          <div className="rule r"></div>
        </div>
        <img className="r2-cardimg" src={R2_MOON} alt="The Moon — weathered Rider–Waite" width="330" style={{ marginTop: "30px" }} />
        <div className="r2-display" style={{ fontSize: "40px", marginTop: "38px", position: "relative", zIndex: 2, textAlign: "center" }}>
          Things are not as they seem tonight.
        </div>
        <div className="r2-voice" style={{ fontSize: "21px", marginTop: "12px", position: "relative", zIndex: 2, textAlign: "center" }}>
          Good — they rarely are.
        </div>
      </div>
      <div className="r2-vignette"></div>
    </div>
  );
}

function R2Reading() {
  return (
    <div className="r2" data-screen-label="R2 — The Reading (four lenses)">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <R2Chrome></R2Chrome>

      <div className="r2-eyebrow" style={{ position: "absolute", top: "92px", left: 0, right: 0, zIndex: 4 }}>
        <div className="rule"></div>
        <div className="txt">XVIII · THE MOON</div>
        <div className="rule r"></div>
      </div>

      <div className="r2-bleedwrap" style={{ position: "absolute", inset: 0 }}>
        <img className="r2-bleed" src={R2_MOON} alt="" style={{ width: "680px", opacity: "0.2" }} />
        <img className="r2-cardimg" src={R2_MOON} alt="The Moon — weathered Rider–Waite" width="310" />
      </div>

      <div className="r2-lens dim" style={{ left: "120px", top: "200px", width: "270px" }}>
        <div className="r2-lens-tag">
          <span className="r2-lens-num">I</span>
          <span className="r2-mono">THE SHIFTING FACE</span>
        </div>
        <div className="r2-lens-name">It won't sit still</div>
        <div className="r2-lens-whisper">it changes every time you look at it</div>
        <div className="r2-lens-cta">Follow this thread →</div>
        <div className="r2-lens-rule"></div>
      </div>

      <div className="r2-lens dim" style={{ left: "170px", top: "590px", width: "270px" }}>
        <div className="r2-lens-tag">
          <span className="r2-lens-num">II</span>
          <span className="r2-mono">THE LUNAR PULL</span>
        </div>
        <div className="r2-lens-name">Drawn by tides</div>
        <div className="r2-lens-whisper">moved by forces you can't see</div>
        <div className="r2-lens-cta">Follow this thread →</div>
        <div className="r2-lens-rule"></div>
      </div>

      <div className="r2-lens" style={{ right: "130px", top: "260px", width: "300px" }}>
        <div className="r2-lens-tag">
          <span className="r2-lens-num">III</span>
          <span className="r2-mono" style={{ color: "rgba(224,87,28,0.95)" }}>THE BEAUTIFUL LIE</span>
        </div>
        <div className="r2-lens-name">Nothing is what it appears</div>
        <div className="r2-lens-whisper">the nose promises one thing; the truth pours another</div>
        <div className="r2-lens-cta">Follow this thread →</div>
        <div className="r2-lens-lean">
          <span className="r2-emberdot"></span>
          <span className="r2-mono" style={{ color: "rgba(234,224,204,0.6)" }}>THE SPIRITS LEAN HERE — FROM YOUR WHISPER</span>
        </div>
        <div className="r2-lens-rule" style={{ background: "rgba(224,87,28,0.85)" }}></div>
      </div>

      <div className="r2-lens dim" style={{ right: "180px", top: "640px", width: "270px" }}>
        <div className="r2-lens-tag">
          <span className="r2-lens-num">IV</span>
          <span className="r2-mono">EYES CLOSED</span>
        </div>
        <div className="r2-lens-name">Trust the dark</div>
        <div className="r2-lens-whisper">your senses know more than your eyes</div>
        <div className="r2-lens-cta">Follow this thread →</div>
        <div className="r2-lens-rule"></div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: "56px", textAlign: "center", zIndex: 4 }}>
        <div className="r2-display" style={{ fontSize: "27px" }}>
          The Moon shows four faces. Turn toward the one that knows you.
        </div>
        <div className="r2-mono" style={{ marginTop: "14px" }}>MOVE TO EXPLORE — THE NEAREST READING OPENS TO YOU</div>
      </div>
      <div className="r2-vignette"></div>
    </div>
  );
}

function R2Pour() {
  return (
    <div className="r2" data-screen-label="R2 — The Pour (pairing)">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <R2Chrome></R2Chrome>
      <img className="r2-pour-art" src={R2_MOON} alt="" />
      <div className="r2-pour-col">
        <div className="r2-mono"><span className="lit">XVIII · THE MOON</span> — III · THE BEAUTIFUL LIE</div>
        <div className="r2-display" style={{ fontSize: "52px", marginTop: "20px" }}>
          You chose misdirection. <em>Wise.</em>
        </div>
        <div className="r2-voice" style={{ fontSize: "21px", marginTop: "14px", maxWidth: "56ch" }}>
          Here is a white that has been lying beautifully for twenty years.
        </div>

        <div className="r2-mono r2-pourlabel" style={{ color: "rgba(224,87,28,0.95)" }}>THE POUR</div>
        <div className="r2-winename">Tyrrell's <em>Vat 1</em></div>
        <div className="r2-mono" style={{ marginTop: "14px", color: "rgba(234,224,204,0.6)" }}>SÉMILLON — HUNTER VALLEY, AUSTRALIA</div>

        <div style={{ fontSize: "19px", lineHeight: "1.55", color: "rgba(234,224,204,0.82)", marginTop: "22px", maxWidth: "58ch", textWrap: "pretty" }}>
          Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw
          a stave. Bone-dry, eleven percent, all misdirection. The Moon would approve.
        </div>

        <div className="r2-cellarmatch">
          <span className="r2-emberdot"></span>
          <span className="r2-mono" style={{ color: "rgba(234,224,204,0.75)" }}>A MATCH SLEEPS IN YOUR CELLAR — VAT 1, 2014</span>
        </div>

        <div className="r2-details">
          <div className="r2-detail-row"><div className="r2-mono">GRAPE</div><div className="r2-detail-v">Sémillon</div></div>
          <div className="r2-detail-row"><div className="r2-mono">PLACE</div><div className="r2-detail-v">Hunter Valley, Australia</div></div>
          <div className="r2-detail-row"><div className="r2-mono">STYLE</div><div className="r2-detail-v">Dry white, bottle-aged</div></div>
        </div>

        <div className="r2-actions">
          <div className="r2-btn primary">KEEP THIS MEMORY</div>
          <div className="r2-btn ghost">TELL ME MORE</div>
        </div>
      </div>
      <div className="r2-vignette"></div>
    </div>
  );
}

function R2Mobile() {
  return (
    <div className="r2 r2-m" data-screen-label="R2 — Mobile reading">
      <div className="r2-smoke"><div className="wisp"></div></div>
      <div className="r2-m-top">
        <div className="r2-brand">
          <div className="r2-crescent" style={{ width: "14px", height: "14px" }}></div>
          <div className="r2-mono" style={{ fontSize: "9px", color: "rgba(234,224,204,0.7)" }}>VINTNER'S ARCANA</div>
        </div>
        <div className="r2-mono" style={{ fontSize: "9px" }}>CELLAR</div>
      </div>
      <div className="r2-bleedwrap" style={{ flexDirection: "column", marginTop: "18px", position: "relative", zIndex: 3 }}>
        <img className="r2-bleed" src={R2_MOON} alt="" style={{ width: "400px", top: "50%" }} />
        <div className="r2-eyebrow" style={{ position: "relative", zIndex: 2 }}>
          <div className="rule" style={{ width: "30px" }}></div>
          <div className="txt" style={{ fontSize: "9.5px" }}>XVIII · THE MOON</div>
          <div className="rule r" style={{ width: "30px" }}></div>
        </div>
        <img className="r2-cardimg" src={R2_MOON} alt="The Moon — weathered Rider–Waite" width="186" style={{ marginTop: "18px" }} />
      </div>
      <div className="r2-display" style={{ fontSize: "22px", textAlign: "center", margin: "24px 36px 0", position: "relative", zIndex: 4 }}>
        Things are not as they seem tonight.
      </div>
      <div className="r2-m-facets" style={{ marginTop: "20px" }}>
        <div className="r2-m-facet">
          <div className="r2-m-facet-num">I</div>
          <div>
            <div className="r2-m-facet-name">It won't sit still</div>
            <div className="r2-m-facet-whisper">it changes every time you look</div>
          </div>
        </div>
        <div className="r2-m-facet">
          <div className="r2-m-facet-num">II</div>
          <div>
            <div className="r2-m-facet-name">Drawn by tides</div>
            <div className="r2-m-facet-whisper">moved by forces you can't see</div>
          </div>
        </div>
        <div className="r2-m-facet">
          <div className="r2-m-facet-num">III</div>
          <div>
            <div className="r2-m-facet-name">Nothing is what it appears</div>
            <div className="r2-m-facet-whisper">the nose promises; the truth pours</div>
          </div>
          <span className="r2-emberdot lean"></span>
        </div>
        <div className="r2-m-facet">
          <div className="r2-m-facet-num">IV</div>
          <div>
            <div className="r2-m-facet-name">Trust the dark</div>
            <div className="r2-m-facet-whisper">your senses know more than your eyes</div>
          </div>
        </div>
      </div>
      <div className="r2-mono" style={{ textAlign: "center", marginTop: "auto", paddingBottom: "26px", fontSize: "9px", position: "relative", zIndex: 4 }}>
        TURN TOWARD THE ONE THAT KNOWS YOU
      </div>
      <div className="r2-vignette"></div>
    </div>
  );
}

Object.assign(window, { R2Tile, R2Approach, R2Reveal, R2Reading, R2Pour, R2Mobile });
