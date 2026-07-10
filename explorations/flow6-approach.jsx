// FLOW v6 — Approach fork (overrides flow2-app's Approach via load order).
// The whisper circle → field swap used to be a hard React unmount: the
// circle popped away with no exit and the field mounted with a rushed
// 320ms rise — out of step with the app's unhurried clock. Both states
// now stay mounted in one grid cell and CROSSFADE (flow6.css
// .rx-whisper-stack): the circle settles away, the field rises in behind
// it, and closing reverses the same move. The input is always mounted, so
// it can be focused synchronously inside the tap gesture — required for
// mobile Safari to raise the keyboard.

function Approach({ light, invite, whisper, setWhisper, onDraw, onDeckHover, F, spd }) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const openField = () => {
    if (!F.canDraw || open) return;
    setOpen(true);
    if (inputRef.current) inputRef.current.focus(); // sync, inside the gesture
  };
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
        <div className={"rx-whisper-stack" + (open ? " open" : "")}>
          <div className="wh-rest">
            <div className="rx-whisper-circle" onClick={openField} data-comment-anchor="flow-whisper-circle"><WhisperGlyph></WhisperGlyph></div>
            <div className="rx-whisper-hint">{whisper ? "" : "OR WHISPER FIRST"}</div>
            {whisper ? <div className="rx-whisper-kept">THE DECK HEARD YOU</div> : null}
          </div>
          <div className="wh-field">
            <div className="rx-whisper-open in">
              <div className="rx-whisper-field" style={{ borderBottomColor: light ? "rgba(21,34,49,0.32)" : undefined }}>
                <input ref={inputRef} className="rx-whisper-input" placeholder="something on your mind?"
                  value={whisper} onChange={(e) => setWhisper(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                  onBlur={() => setOpen(false)} tabIndex={open ? 0 : -1} />
              </div>
              <div className="rx-whisper-sub" style={{ color: light ? "rgba(21,34,49,0.4)" : undefined }}>THE DECK LISTENS · IT DOESN'T REPEAT</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"rx-draw-hint fx" + inCls} style={dly(780, 160)} data-va-fx="hint"><span className="lit">TAP THE DECK</span> WHEN YOU'RE READY</div>
    </div>
  );
}

Object.assign(window, { Approach });
