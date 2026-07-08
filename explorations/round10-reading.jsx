// ROUND 10 — Reading (spacing fixed, no moon glyph), Approach (round-8 layout, small circle), Strategy
// Reads window.ARCANA / window.ARCANA_ORDER from round10-content.jsx
// Exports: ReadingX, ApproachXClosed, ApproachXOpen, StrategyBoardX

function StatusBarX({ light }) {
  return (
    <div className="rx-status" style={{ width: "338px" }}>
      <div className="rx-mono" style={{ fontSize: "9px", color: light ? "rgba(21,34,49,0.62)" : "rgba(239,236,228,0.7)" }}>VINTNER'S ARCANA</div>
      <div className="links">
        <div className="rx-mono" style={{ fontSize: "9px" }}>MEMORY</div>
        <div className="rx-mono" style={{ fontSize: "9px" }}>CELLAR</div>
      </div>
    </div>);

}

function WhisperGlyphX() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M6 7.5 Q8.5 10 6 12.5" />
      <path d="M9.5 5.5 Q13 10 9.5 14.5" />
      <path d="M13 7 Q15 10 13 13" opacity="0.6" />
    </svg>);

}

// Render *word* as italic + apricot emphasis
function renderKnowing(text) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("*") && p.endsWith("*")) {
      return <em key={i} style={{ color: "var(--apri)", fontStyle: "italic" }}>{p.slice(1, -1)}</em>;
    }
    return p;
  });
}

function ReadingX({ id, mode = "dark" }) {
  const c = window.ARCANA[id];
  const light = mode === "light";
  return (
    <div className={"rx " + (light ? "rx-light" : "rx-dark")} data-screen-label={"R10 — Reading · " + c.name}>
      <div className="rx-veil"><img src={"assets/cards/" + c.file + ".png"} alt="" /></div>
      <div className="rx-mottle"></div>
      <div className="rx-grain"></div>
      <div className="rx-read">
        <StatusBarX light={light}></StatusBarX>
        <div className="rx-read-eyebrow" style={{ padding: "24px" }}>
          <div className="rx-eyebrow" style={{ color: light ? "var(--amber)" : "var(--apri)" }}>
            <div className="rule"></div><div className="txt">{c.num} · {c.name.toUpperCase()}</div><div className="rule"></div>
          </div>
        </div>
        <div className="rx-read-fill">
          <div className="rx-read-card"><img src={"assets/cards/" + c.file + ".png"} alt={c.name} /></div>
          <div className="rx-knowing">{renderKnowing(c.knowing)}</div>
        </div>
        <div className="rx-lenswrap">
          {c.lenses.map((l) =>
          <div key={l.n} className={"rx-lens" + (l.nudge ? " nudge" : "")}>
              <div className="rx-lens-num">{l.n}</div>
              <div className="rx-lens-body">
                <div className="rx-lens-name">{l.name}</div>
                <div className="rx-lens-whis">{l.whis}</div>
              </div>
              {l.cellar && <div className="rx-lens-dot"></div>}
            </div>
          )}
          <div className="rx-read-foot" style={{ padding: "16px 0px 22px" }}>
            <div className="rx-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
      </div>
    </div>);

}

function ApproachShellX({ children, label, light }) {
  return (
    <div className={"rx " + (light ? "rx-light" : "rx-dark")} data-screen-label={"R12 — Approach · " + label}>
      <div className="rx-mottle"></div>
      <div className="rx-grain"></div>
      <div className="rx-approach">
        <StatusBarX light={light}></StatusBarX>
        <div className="rx-approach-hero" style={{ alignItems: "center", justifyContent: "flex-end", padding: "0px" }}>
          <div className="rx-deck">
            <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
            <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
            <img className="backimg" src="assets/card-back.png" alt="Vintner's Arcana deck back" />
          </div>
          <div className="rx-approach-invite">Go on. <span className="i">We don't bite.</span></div>
        </div>
        <div className="rx-whisper-region" style={{ height: "220px" }}>{children}</div>
        <div className="rx-draw-hint">TAP THE DECK WHEN YOU'RE READY</div>
      </div>
    </div>);

}

function ApproachXClosed() {
  return (
    <ApproachShellX label="closed · dark">
      <div className="rx-whisper-circle"><WhisperGlyphX></WhisperGlyphX></div>
      <div className="rx-whisper-hint">OR WHISPER FIRST</div>
    </ApproachShellX>);
}

function ApproachXClosedLight() {
  return (
    <ApproachShellX label="closed · light" light>
      <div className="rx-whisper-circle"><WhisperGlyphX></WhisperGlyphX></div>
      <div className="rx-whisper-hint">OR WHISPER FIRST</div>
    </ApproachShellX>);

}

function ApproachXOpen() {
  return (
    <ApproachShellX label="opened · the field">
      <div className="rx-whisper-open">
        <div className="rx-whisper-field">
          <span className="txt">something on your mind?</span>
          <span className="caret"></span>
        </div>
        <div className="rx-whisper-sub">THE DECK LISTENS · IT DOESN'T REPEAT</div>
      </div>
    </ApproachShellX>);

}

function StrategyBoardX() {
  return (
    <div className="rx rx-dark rx-strat" data-screen-label="R10 — Content strategy (corrected)">
      <div className="rx-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="rx-strat-title">The Lens &amp; The Reveal</div>
        <div className="rx-strat-sub">
          The content engine, corrected. The reading is where chance becomes personal; the reveal is where it
          becomes profound and connects you to a wine. The lens never mentions wine — and it isn't clever for
          its own sake. It's an invitation you accept because it already understands you.
        </div>

        <div className="rx-strat-flow">
          <div className="rx-strat-step">
            <div className="rx-strat-badge">01 · UNDER THE CARD</div>
            <div className="rx-strat-h">The spirit's voice</div>
            <ul className="rx-strat-rules">
              <li>The wise, oddly-relatable <b>stranger on the next barstool</b> — observing a feeling, not narrating the card at you.</li>
              <li>Conversational: “the way I see it…”, “honestly?”. <b>Never preachy, never bossy.</b></li>
              <li>Expresses how it <b>feels</b>, so you intuitively understand the card. You feel seen.</li>
            </ul>
            <div className="rx-strat-ex">
              <div className="rx-strat-ex-tag">THE GOLD STANDARD — THE MOON</div>
              <div className="rx-strat-ex-good">“Things are not as they seem tonight. Good — they rarely are.”</div>
              <div className="rx-strat-ex-bad"><s>“Everything you believed just cracked.”</s> — that's a robot narrating, not a person feeling.</div>
            </div>
          </div>

          <div className="rx-strat-step">
            <div className="rx-strat-badge">02 · WHAT YOU TAP</div>
            <div className="rx-strat-h">The lens — an invitation</div>
            <ul className="rx-strat-rules">
              <li>Written as if spoken by <b>someone you'd be joining</b> if you picked it. You feel understood.</li>
              <li>Vaguely mysterious, alluring, relatable. <b>No wine words. Ever.</b></li>
              <li>“<b>A</b> shifting face” over “The shifting face” — so you can see yourself in it.</li>
              <li>Each maps 1:1 to a wine idea — invisibly.</li>
            </ul>
            <div className="rx-strat-ex">
              <div className="rx-strat-ex-tag">INVITATION vs NERD-TALK</div>
              <div className="rx-strat-ex-good">“Rules are made to be broken.”</div>
              <div className="rx-strat-ex-bad"><s>“Broke the law, made history.”</s> — how a nerd describes an iconoclast, not how it feels to be one.</div>
            </div>
          </div>

          <div className="rx-strat-step">
            <div className="rx-strat-badge">03 · AFTER YOU PICK</div>
            <div className="rx-strat-h">The reveal — connect the dots</div>
            <ul className="rx-strat-rules">
              <li><b>Open by echoing why you felt that</b> — name the stance back to them.</li>
              <li>Reveal the wine that embodies it, on <b>one true fact.</b></li>
              <li>Land on the bottle. One sly beat. Never judges.</li>
            </ul>
            <div className="rx-strat-ex">
              <div className="rx-strat-ex-tag">THE BRIDGE — THE MOON / THE BEAUTIFUL LIE</div>
              <div className="rx-strat-ex-good">“You weren't after honesty tonight — you wanted something playing a part. So is this…”</div>
              <div className="rx-strat-ex-bad">→ Tyrrell's Vat 1: tastes of oak it never touched. Lying beautifully for twenty years.</div>
            </div>
          </div>
        </div>

        <div className="rx-strat-foot">
          <div className="rx-strat-foot-k">WRITTEN TO SPEC</div>
          <div className="rx-strat-foot-v">
            Six cards rewritten to this — <b>The Moon, Wheel of Fortune, Death, The Tower, The Fool, The Hermit</b> —
            in the readings at right. The remaining 72 get written against this same three-beat engine.
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { ReadingX, ApproachXClosed, ApproachXClosedLight, ApproachXOpen, StrategyBoardX });