// FLOW v2 — helpers, persistent status bar, Approach, Reading.
// Screens are layers: elements carry .fx classes driven by the flags object F.
// The card and eyebrow are NOT rendered here — the actors own them; screens
// only render invisible slot elements ([data-va-slot]) for measurement.

function loadPulls() {
  try { return JSON.parse(localStorage.getItem("va-pulls") || "[]"); } catch (e) { return []; }
}
function savePull(p) {
  const pulls = loadPulls(); pulls.push(p);
  localStorage.setItem("va-pulls", JSON.stringify(pulls));
}

// Invitations — italics only where the sly beat earns them; some lines carry none.
const INVITES2 = [
  [{ t: "Go on. " }, { t: "We don't bite.", i: true }],
  [{ t: "Fate favors " }, { t: "the thirsty.", i: true }],
  [{ t: "The cards have been " }, { t: "talking", i: true }, { t: " about you." }],
  [{ t: "Curiosity " }, { t: "looks good", i: true }, { t: " on you." }],
  [{ t: "It already knows. Go ahead, ask." }],
  [{ t: "Ask nothing. Learn everything." }],
  [{ t: "Shall we?" }],
  [{ t: "The spirits have " }, { t: "opinions", i: true }, { t: " tonight." }],
];

function pickInvitation() {
  let seen;
  try { seen = JSON.parse(localStorage.getItem("va-inv-seen") || "[]"); } catch (e) { seen = []; }
  let unseen = INVITES2.map((_, i) => i).filter((i) => !seen.includes(i));
  if (unseen.length === 0) { seen = []; unseen = INVITES2.map((_, i) => i); }
  const idx = unseen[Math.floor(Math.random() * unseen.length)];
  localStorage.setItem("va-inv-seen", JSON.stringify([...seen, idx]));
  return INVITES2[idx];
}

function pickCard() {
  const last = localStorage.getItem("va-last-card");
  const pool = ARCANA_ORDER.filter((id) => id !== last);
  const id = pool[Math.floor(Math.random() * pool.length)];
  localStorage.setItem("va-last-card", id);
  return id;
}

function useDesktopMQ() {
  const [d, setD] = React.useState(() => window.matchMedia("(min-width: 900px)").matches);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const fn = (e) => setD(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return d;
}

// ---------- persistent chrome ----------
function StatusBar({ light, onHome, onToast }) {
  const dim = light ? "rgba(21,34,49,0.62)" : "rgba(239,236,228,0.7)";
  const kept = loadPulls().filter((p) => p.kept).length;
  return (
    <div className="rx-status">
      <div className="rx-mono wordmark" style={{ fontSize: "9px", color: dim }} onClick={onHome}>VINTNER'S ARCANA</div>
      <div className="links">
        <div className="rx-mono" style={{ fontSize: "9px" }} onClick={() => onToast("MEMORY · " + kept + " KEPT · PAGE STILL BINDING")}>MEMORY</div>
        <div className="rx-mono" style={{ fontSize: "9px" }} onClick={() => onToast("CELLAR · STILL IN THE CASK")}>CELLAR</div>
      </div>
    </div>
  );
}

function WhisperGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M6 7.5 Q8.5 10 6 12.5"></path>
      <path d="M9.5 5.5 Q13 10 9.5 14.5"></path>
      <path d="M13 7 Q15 10 13 13" opacity="0.6"></path>
    </svg>
  );
}

// ---------- THE APPROACH ----------
function Approach({ light, invite, whisper, setWhisper, onDraw, onDeckHover, F, spd }) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  const inCls = F.approachUiIn ? " in" : "";
  const reform = F.phase === "reform";
  // entering (reform): waits for the deck to fall; exiting (pull): quick stagger
  const dly = (inMs, outMs) => ({ transitionDelay: Math.round((F.approachUiIn ? (reform ? inMs : 0) : outMs) / spd) + "ms", "--fxd": "var(--dUiExit)" });
  return (
    <div className="rx-approach va-layer" style={{ visibility: F.approachShown ? "visible" : "hidden" }} data-screen-label="Flow — Approach">
      <div className="rx-approach-hero">
        <div className="rx-deck" onClick={F.canDraw ? onDraw : undefined}
          onMouseEnter={() => onDeckHover(true)} onMouseLeave={() => onDeckHover(false)} data-comment-anchor="flow-deck">
          <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
          <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
          <img className="backimg" src="assets/card-back.webp" alt="Vintner's Arcana deck" data-va-slot="deck-top" />
        </div>
        <div className={"rx-approach-invite fx up" + inCls} style={dly(540, 0)} data-va-fx="invite">{invite.map((seg, i) => <span key={i} className={seg.i ? "i" : ""}>{seg.t}</span>)}</div>
      </div>
      <div className={"rx-whisper-region fx" + inCls} style={dly(660, 90)} data-va-fx="whisper">
        {!open ? (
          <React.Fragment>
            <div className="rx-whisper-circle" onClick={() => F.canDraw && setOpen(true)} data-comment-anchor="flow-whisper-circle"><WhisperGlyph></WhisperGlyph></div>
            <div className="rx-whisper-hint">{whisper ? "" : "OR WHISPER FIRST"}</div>
            {whisper ? <div className="rx-whisper-kept">THE DECK HEARD YOU</div> : null}
          </React.Fragment>
        ) : (
          <div className="rx-whisper-open">
            <div className="rx-whisper-field" style={{ borderBottomColor: light ? "rgba(21,34,49,0.32)" : undefined }}>
              <input ref={inputRef} className="rx-whisper-input" placeholder="something on your mind?"
                value={whisper} onChange={(e) => setWhisper(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpen(false); }}
                onBlur={() => setOpen(false)} />
            </div>
            <div className="rx-whisper-sub" style={{ color: light ? "rgba(21,34,49,0.4)" : undefined }}>THE DECK LISTENS · IT DOESN'T REPEAT</div>
          </div>
        )}
      </div>
      <div className={"rx-draw-hint fx" + inCls} style={dly(780, 160)} data-va-fx="hint"><span className="lit">TAP THE DECK</span> WHEN YOU'RE READY</div>
    </div>
  );
}

// ---------- THE READING ----------
const ORBIT_4 = [
  { x: 17, y: 26, side: "l" }, { x: 15, y: 62, side: "l" },
  { x: 83, y: 26, side: "r" }, { x: 85, y: 62, side: "r" },
];
const ORBIT_5 = [
  { x: 17, y: 24, side: "l" }, { x: 14, y: 58, side: "l" },
  { x: 83, y: 18, side: "r" }, { x: 86, y: 44, side: "r" }, { x: 83, y: 72, side: "r" },
];

function Reading({ card, light, whispered, flare, desktop, F, onPick, lensStep, spd }) {
  const c = ARCANA[card];
  const face = "assets/cards/" + c.file + ".png";
  // per-lens fx: stagger in at 'lenses'; on choose the unpicked fade first, the picked lingers
  const lensFx = (l, i) => {
    const inNow = F.lensesIn && !F.choosing;
    const delay = inNow ? i * lensStep : (F.choosing ? (F.picked === l.n ? 240 : i * 45) : 0);
    return {
      cls: "fx up" + (inNow ? " in" : ""),
      style: { transitionDelay: Math.round(delay / spd) + "ms", "--fxd": F.choosing ? "var(--dChoose)" : "var(--lensDur)" },
    };
  };
  const footDelay = F.lensesIn && !F.choosing ? c.lenses.length * lensStep + 80 : 0;
  const eyebrow = (
    <div className="rx-read-eyebrow">
      <div className="rx-eyebrow" style={{ visibility: "hidden" }}>
        <div className="rule"></div>
        <div className="txt" data-va-slot="eyeb-read">{c.num} · {c.name.toUpperCase()}</div>
        <div className="rule"></div>
      </div>
    </div>
  );
  const foot = (
    <div className={"rx-read-foot fx" + (F.footIn && !F.choosing ? " in" : "")}
      style={{ padding: "16px 0px 22px", transitionDelay: Math.round(footDelay / spd) + "ms", "--fxd": "var(--lensDur)" }}>
      <div className="rx-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
    </div>
  );
  if (desktop) {
    const slots = c.lenses.length > 4 ? ORBIT_5 : ORBIT_4;
    return (
      <div className="rx-read va-layer" data-screen-label="Flow — Reading (orbit)">
        {eyebrow}
        <div className="va-orbit">
          <img className="va-orbit-card" src={face} alt="" style={{ visibility: "hidden" }} data-va-slot="read-card" />
          <div className={"va-orbit-knowing fx up" + (F.voiceIn && !F.choosing ? " in" : "")} style={{ "--fxd": "var(--dVoice)" }}>{c.knowing}</div>
          {c.lenses.map((l, i) => {
            const s = slots[i] || slots[slots.length - 1];
            const fx = lensFx(l, i);
            return (
              <div key={l.n} className={"va-orbit-lens side-" + s.side + (whispered && l.nudge ? " nudge" : "") + " " + fx.cls}
                style={{ left: s.x + "%", top: s.y + "%", ...fx.style }} onClick={() => onPick(l)}>
                {flare ? <div className="va-orbit-flare"></div> : null}
                <div className="body">
                  <div className="rx-lens-name">{l.name}{l.cellar ? <span className="rx-lens-dot"></span> : null}</div>
                  <div className="rx-lens-whis">{l.whis}</div>
                </div>
              </div>
            );
          })}
        </div>
        {foot}
      </div>
    );
  }
  return (
    <div className="rx-read va-layer" data-screen-label="Flow — Reading">
      {eyebrow}
      <div className="rx-read-fill">
        <div className="rx-read-card"><img src={face} alt="" style={{ visibility: "hidden" }} data-va-slot="read-card" /></div>
        <div className={"rx-knowing fx up" + (F.voiceIn && !F.choosing ? " in" : "")} style={{ "--fxd": "var(--dVoice)" }}>{c.knowing}</div>
      </div>
      <div className="rx-lenswrap">
        {c.lenses.map((l, i) => {
          const fx = lensFx(l, i);
          return (
            <div key={l.n} className={"rx-lens" + (whispered && l.nudge ? " nudge" : "") + " " + fx.cls} style={fx.style} onClick={() => onPick(l)}>
              <div className="rx-lens-num">{l.n}</div>
              <div className="rx-lens-body">
                <div className="rx-lens-name">{l.name}</div>
                <div className="rx-lens-whis">{l.whis}</div>
              </div>
              {l.cellar ? <div className="rx-lens-dot"></div> : null}
            </div>
          );
        })}
        {foot}
      </div>
    </div>
  );
}

Object.assign(window, { loadPulls, savePull, INVITES2, pickInvitation, pickCard, useDesktopMQ, StatusBar, WhisperGlyph, Approach, Reading });
