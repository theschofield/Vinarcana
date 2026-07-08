// FLOW PROTOTYPE — Approach → tap deck → One Breath ritual → Reading → lens → Reveal (swipe pours) → keep/fade → Approach.
// Locked v13 visual system. Reads window.ARCANA / ARCANA_ORDER (round12-content) + window.POURS / INVITATIONS (flow-content).

const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "night",
  "grainSize": 300,
  "grainNight": 0.18,
  "grainDay": 0.16,
  "veilNight": 0.11,
  "veilDay": 0.09,
  "whisperH": 200,
  "deckW": 206,
  "deckWDesk": 250,
  "knowingSize": 21,
  "lensSize": 17,
  "lensPad": 12,
  "orbitCardVh": 52,
  "knowingDesk": 25,
  "lensFlare": false,
  "shoutSize": 54
}/*EDITMODE-END*/;

// ---------- helpers ----------
function useDesktop() {
  const [d, setD] = useState(() => window.matchMedia("(min-width: 900px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const fn = (e) => setD(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return d;
}

function loadPulls() {
  try { return JSON.parse(localStorage.getItem("va-pulls") || "[]"); } catch (e) { return []; }
}
function savePull(p) {
  const pulls = loadPulls(); pulls.push(p);
  localStorage.setItem("va-pulls", JSON.stringify(pulls));
}

function pickInvitation() {
  let seen;
  try { seen = JSON.parse(localStorage.getItem("va-inv-seen") || "[]"); } catch (e) { seen = []; }
  let unseen = INVITATIONS.map((_, i) => i).filter((i) => !seen.includes(i));
  if (unseen.length === 0) { seen = []; unseen = INVITATIONS.map((_, i) => i); }
  const idx = unseen[Math.floor(Math.random() * unseen.length)];
  localStorage.setItem("va-inv-seen", JSON.stringify([...seen, idx]));
  return INVITATIONS[idx];
}

function pickCard() {
  const last = localStorage.getItem("va-last-card");
  const pool = ARCANA_ORDER.filter((id) => id !== last);
  const id = pool[Math.floor(Math.random() * pool.length)];
  localStorage.setItem("va-last-card", id);
  return id;
}

// ---------- shared chrome ----------
function StatusBar({ light, onToast }) {
  const dim = light ? "rgba(21,34,49,0.62)" : "rgba(239,236,228,0.7)";
  const kept = loadPulls().filter((p) => p.kept).length;
  return (
    <div className="rx-status">
      <div className="rx-mono" style={{ fontSize: "9px", color: dim }}>VINTNER'S ARCANA</div>
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
function Approach({ light, invite, whisper, setWhisper, onDraw, onToast }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  return (
    <div className="rx-approach" data-screen-label="Flow — Approach">
      <StatusBar light={light} onToast={onToast}></StatusBar>
      <div className="rx-approach-hero" style={{ alignItems: "center", justifyContent: "flex-end", padding: "0px" }}>
        <div className="rx-deck" onClick={onDraw} data-comment-anchor="flow-deck">
          <div className="stack" style={{ transform: "rotate(3deg) translate(6px, 4px)" }}></div>
          <div className="stack" style={{ transform: "rotate(-2deg) translate(-5px, 2px)" }}></div>
          <img className="backimg" src="assets/card-back.png" alt="Vintner's Arcana deck back" />
        </div>
        <div className="rx-approach-invite">{invite[0]}<span className="i">{invite[1]}</span></div>
      </div>
      <div className="rx-whisper-region">
        {!open ? (
          <React.Fragment>
            <div className="rx-whisper-circle" onClick={() => setOpen(true)} data-comment-anchor="flow-whisper-circle"><WhisperGlyph></WhisperGlyph></div>
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
      <div className="rx-draw-hint"><span className="lit">TAP THE DECK</span> WHEN YOU'RE READY</div>
    </div>
  );
}

// ---------- THE RITUAL — One Breath ----------
function Ritual({ card, onDone }) {
  const [phase, setPhase] = useState("");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("rise"), 60);
    const t2 = setTimeout(() => setPhase("flip"), 1500);
    const t3 = setTimeout(onDone, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  const c = ARCANA[card];
  return (
    <div className={"va-ritual " + phase} data-screen-label="Flow — Draw ritual">
      <div className="va-smoke s1" style={{ marginLeft: "-14vmin", marginTop: "-8vmin" }}></div>
      <div className="va-smoke s2" style={{ marginLeft: "14vmin", marginTop: "-12vmin" }}></div>
      <div className="va-smoke s3" style={{ marginLeft: "-10vmin", marginTop: "12vmin" }}></div>
      <div className="va-smoke s4" style={{ marginLeft: "12vmin", marginTop: "10vmin" }}></div>
      <div className="va-ritual-card">
        <img src="assets/card-back.png" alt="" />
        <img className="face" src={"assets/cards/" + c.file + ".png"} alt="" />
      </div>
      <div className="va-ritual-hint">ONE BREATH</div>
    </div>
  );
}

// ---------- THE READING ----------
function LensRow({ l, nudged, onPick }) {
  return (
    <div className={"rx-lens" + (nudged ? " nudge" : "")} onClick={() => onPick(l)}>
      <div className="rx-lens-num">{l.n}</div>
      <div className="rx-lens-body">
        <div className="rx-lens-name">{l.name}</div>
        <div className="rx-lens-whis">{l.whis}</div>
      </div>
      {l.cellar ? <div className="rx-lens-dot"></div> : null}
    </div>
  );
}

const ORBIT_4 = [
  { x: 17, y: 26, side: "l" }, { x: 15, y: 62, side: "l" },
  { x: 83, y: 26, side: "r" }, { x: 85, y: 62, side: "r" },
];
const ORBIT_5 = [
  { x: 17, y: 24, side: "l" }, { x: 14, y: 58, side: "l" },
  { x: 83, y: 18, side: "r" }, { x: 86, y: 44, side: "r" }, { x: 83, y: 72, side: "r" },
];

function Reading({ card, light, whispered, flare, onPick, onToast }) {
  const c = ARCANA[card];
  const desktop = useDesktop();
  const eyebrow = (
    <div className="rx-read-eyebrow" style={{ padding: "24px" }}>
      <div className="rx-eyebrow" style={{ color: light ? "var(--amber)" : "var(--apri)" }}>
        <div className="rule"></div><div className="txt">{c.num} · {c.name.toUpperCase()}</div><div className="rule"></div>
      </div>
    </div>
  );
  if (desktop) {
    const slots = c.lenses.length > 4 ? ORBIT_5 : ORBIT_4;
    return (
      <div className="rx-read" data-screen-label="Flow — Reading (orbit)">
        <StatusBar light={light} onToast={onToast}></StatusBar>
        {eyebrow}
        <div className="va-orbit">
          <img className="va-orbit-card" src={"assets/cards/" + c.file + ".png"} alt={c.name} />
          <div className="va-orbit-knowing">{c.knowing}</div>
          {c.lenses.map((l, i) => {
            const s = slots[i] || slots[slots.length - 1];
            return (
              <div key={l.n} className={"va-orbit-lens side-" + s.side + (whispered && l.nudge ? " nudge" : "")}
                style={{ left: s.x + "%", top: s.y + "%" }} onClick={() => onPick(l)}>
                {flare ? <div className="va-orbit-flare"></div> : null}
                <div className="body">
                  <div className="rx-lens-name">{l.name}{l.cellar ? <span className="rx-lens-dot"></span> : null}</div>
                  <div className="rx-lens-whis">{l.whis}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rx-read-foot" style={{ padding: "16px 0px 22px" }}>
          <div className="rx-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
        </div>
      </div>
    );
  }
  return (
    <div className="rx-read" data-screen-label="Flow — Reading">
      <StatusBar light={light} onToast={onToast}></StatusBar>
      {eyebrow}
      <div className="rx-read-fill">
        <div className="rx-read-card"><img src={"assets/cards/" + c.file + ".png"} alt={c.name} /></div>
        <div className="rx-knowing">{c.knowing}</div>
      </div>
      <div className="rx-lenswrap">
        {c.lenses.map((l) => <LensRow key={l.n} l={l} nudged={whispered && l.nudge} onPick={onPick}></LensRow>)}
        <div className="rx-read-foot" style={{ padding: "16px 0px 22px" }}>
          <div className="rx-mono">TURN TOWARD THE ONE THAT KNOWS YOU</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TWEAK_DEFAULTS_FLOW: TWEAK_DEFAULTS, useDesktop, loadPulls, savePull, pickInvitation, pickCard, StatusBar, Approach, Ritual, Reading });
