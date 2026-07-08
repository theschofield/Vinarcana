// ROUND 9 — Reading (status bar, bigger card, real art), Approach (whisper circle), Strategy board
// Reads window.ARCANA / window.ARCANA_ORDER from round9-content.jsx
// Exports: Reading9, Approach9Closed, Approach9Open, StrategyBoard

function StatusBar({ light }) {
  return (
    <div className="r9-status">
      <div className="brand">
        <div className="r9-mono" style={{ fontSize: "9px", color: light ? "rgba(21,34,49,0.6)" : "rgba(239,236,228,0.7)" }}>VINTNER'S ARCANA</div>
      </div>
      <div className="links">
        <div className="r9-mono" style={{ fontSize: "9px" }}>MEMORY</div>
        <div className="r9-mono" style={{ fontSize: "9px" }}>CELLAR</div>
      </div>
    </div>
  );
}

function WhisperGlyph() {
  // a faint "whispered voice" mark — three soft sound-curves
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M6 7.5 Q8.5 10 6 12.5" />
      <path d="M9.5 5.5 Q13 10 9.5 14.5" />
      <path d="M13 7 Q15 10 13 13" opacity="0.6" />
    </svg>
  );
}

function Reading9({ id, mode = "dark" }) {
  const c = window.ARCANA[id];
  const light = mode === "light";
  const cardW = c.lenses.length >= 5 ? 178 : 206;
  return (
    <div className={"r9 " + (light ? "r9-light" : "r9-dark")} data-screen-label={"R9 — Reading · " + c.name}>
      <div className="r9-veil"><img src={"assets/cards/" + c.file + ".png"} alt="" /></div>
      <div className="r9-mottle"></div>
      <div className="r9-read">
        <StatusBar light={light}></StatusBar>
        <div className="r9-read-eyebrow">
          <div className="r9-eyebrow" style={{ color: light ? "var(--amber)" : "var(--apri)" }}>
            <div className="rule"></div><div className="txt">{c.num} · {c.name.toUpperCase()}</div><div className="rule"></div>
          </div>
        </div>
        <div className="r9-read-card"><img src={"assets/cards/" + c.file + ".png"} alt={c.name} width={cardW} /></div>
        <div className="r9-knowing">{c.knowing}</div>
        <div className="r9-lenswrap">
          {c.lenses.map((l) => (
            <div key={l.n} className={"r9-lens" + (l.nudge ? " nudge" : "")}>
              <div className="r9-lens-num">{l.n}</div>
              <div className="r9-lens-body">
                <div className="r9-lens-name">{l.name}</div>
                <div className="r9-lens-whis">{l.whis}</div>
              </div>
            </div>
          ))}
          <div className="r9-read-foot">
            <div className="r9-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApproachShell({ hero, footer, children, label }) {
  return (
    <div className="r9 r9-dark" data-screen-label={"R9 — Approach · " + label}>
      <div className="r9-mottle"></div>
      <div className="r9-approach">
        <StatusBar></StatusBar>
        <div className="r9-deck">
          <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
          <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
          <img className="backimg" src="assets/card-back.png" alt="Vintner's Arcana deck back" />
        </div>
        <div className="r9-approach-invite" dangerouslySetInnerHTML={{ __html: hero }}></div>
        <div className="r9-whisper-zone">{children}</div>
        <div className="r9-draw-hint" dangerouslySetInnerHTML={{ __html: footer }}></div>
      </div>
    </div>
  );
}

function Approach9Closed() {
  return (
    <ApproachShell
      label="closed · the quiet circle"
      hero={'Go on. <span class="i">We don\u2019t bite.</span>'}
      footer={'TAP THE DECK WHEN YOU\u2019RE READY'}
    >
      <div className="r9-whisper-circle"><WhisperGlyph></WhisperGlyph></div>
      <div className="r9-whisper-hint">WHISPER FIRST · OPTIONAL</div>
    </ApproachShell>
  );
}

function Approach9Open() {
  return (
    <ApproachShell
      label="opened · the field"
      hero={'Go on. <span class="i">We don\u2019t bite.</span>'}
      footer={'TAP THE DECK WHEN YOU\u2019RE READY'}
    >
      <div className="r9-whisper-open">
        <div className="r9-whisper-field">
          <span className="txt">something on your mind?</span>
          <span className="caret"></span>
        </div>
        <div className="r9-whisper-sub">THE DECK LISTENS · IT DOESN'T REPEAT</div>
      </div>
    </ApproachShell>
  );
}

function StrategyBoard() {
  return (
    <div className="r9 r9-dark r9-strat" data-screen-label="R9 — Content strategy: lens vs reveal">
      <div className="r9-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r9-strat-title">The Lens &amp; The Reveal</div>
        <div className="r9-strat-sub">
          The content engine, codified so it replicates across all 78 cards. The reading is where a moment of
          chance becomes personally relevant; the reveal is where that relevance becomes profundity, and connects
          you to a wine. The lens never mentions wine — that's the whole trick.
        </div>

        <div className="r9-strat-flow">
          <div className="r9-strat-step">
            <div className="r9-strat-badge">01 · UNDER THE CARD</div>
            <div className="r9-strat-h">The spirit's voice</div>
            <ul className="r9-strat-rules">
              <li>The <b>wise, strangely relatable stranger at the bar.</b> Observational, conversational.</li>
              <li>Makes you <b>feel</b> the card — never narrates it at you, never bossy, never inevitable.</li>
              <li>Says the thing you can't help but nod at. Ties it in a bow.</li>
            </ul>
            <div className="r9-strat-ex">
              <div className="r9-strat-ex-tag">THE GOLD STANDARD — THE MOON</div>
              <div className="r9-strat-ex-good">“Things are not as they seem tonight. Good — they rarely are.”</div>
            </div>
          </div>

          <div className="r9-strat-step">
            <div className="r9-strat-badge">02 · WHAT YOU TAP</div>
            <div className="r9-strat-h">The lens — a felt response</div>
            <ul className="r9-strat-rules">
              <li>Your <b>human reaction</b> to the card: a stance, a mood, a truth about your life right now.</li>
              <li><b>No wine words. Ever.</b> Not grapes, glasses, farms, vintages, producers.</li>
              <li>Written like <b>an invitation from someone you'd be joining</b> — vaguely mysterious, alluring. You feel understood. That recognition is the profundity.</li>
              <li>Craft: <b>“A” over “The”</b> so you recognize it as your own; words you can lean into; short subtitles that imply more.</li>
            </ul>
            <div className="r9-strat-ex">
              <div className="r9-strat-ex-tag">RECOGNISABLE vs TOO SPECIFIC</div>
              <div className="r9-strat-ex-good">“A shifting face — every time you look, it's someone new.”</div>
              <div className="r9-strat-ex-bad"><s>“The shifting face.”</s> &nbsp;“The” points at something specific you can't place — so you can't see yourself in it.</div>
            </div>
          </div>

          <div className="r9-strat-step">
            <div className="r9-strat-badge">03 · AFTER YOU PICK</div>
            <div className="r9-strat-h">The reveal — connect the dots</div>
            <ul className="r9-strat-rules">
              <li><b>Open by echoing why you felt that</b> — name the stance back to them.</li>
              <li>Reveal the wine that embodies it, on <b>one true fact.</b></li>
              <li>Land on the bottle. One sly beat. Never judges.</li>
            </ul>
            <div className="r9-strat-ex">
              <div className="r9-strat-ex-tag">THE BRIDGE — THE MOON / THE BEAUTIFUL LIE</div>
              <div className="r9-strat-ex-good">“You came for something playing a part. So is this…”</div>
              <div className="r9-strat-ex-bad">→ Tyrrell's Vat 1: tastes of oak it never touched. Bone-dry, lying beautifully for twenty years.</div>
            </div>
          </div>
        </div>

        <div className="r9-strat-foot">
          <div className="r9-strat-foot-k">WRITTEN TO SPEC</div>
          <div className="r9-strat-foot-v">
            Six cards now follow this exactly — <b>The Moon, Wheel of Fortune, Death, The Tower, The Fool, The Hermit</b>
            — see them in the readings to the right. The rest of the 78 get written against this same three-beat engine.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reading9, Approach9Closed, Approach9Open, StrategyBoard });
