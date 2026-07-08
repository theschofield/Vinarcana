// FLOW v2 — the Reveal layer. Card + eyebrow arrive via the actors; pane 0
// carries the measurement ghost and hands off to its real card at rest.
// Cascade: headline+bottle+name at 'echo', body/stats/scales/dots/actions at 'pour'.

function BottleSil() {
  return (
    <svg viewBox="0 0 93 336" fill="none">
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z" fill="currentColor" opacity="0.16"></path>
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z" stroke="currentColor" opacity="0.35" strokeWidth="1"></path>
      <rect x="24" y="150" width="45" height="88" rx="3" fill="currentColor" opacity="0.1"></rect>
    </svg>
  );
}

function Scale({ l, r, v }) {
  return (
    <div className="rv-scale">
      <span className={"lab" + (v <= 0.5 ? " hot" : "")}>{l}</span>
      <div className="track"><div className="mark" style={{ left: v * 100 + "%" }}></div></div>
      <span className={"lab r" + (v > 0.5 ? " hot" : "")}>{r}</span>
    </div>
  );
}

function PourPane({ p, hl, light, i, F, spd }) {
  // pane 0 choreographs in; later panes render settled (they're offscreen until swiped)
  const heroIn = i > 0 || F.echoIn;
  const bodyIn = i > 0 || F.pourIn;
  const [scrolled, setScrolled] = React.useState(false);
  const d = (ms) => ({ transitionDelay: Math.round((i > 0 ? 0 : ms) / spd) + "ms" });
  return (
    <div className="rv-pane">
      <div className={"rv-vscroll" + (scrolled ? " scrolled" : "")} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}>
        <div className={"rv-headline fx up" + (heroIn ? " in" : "")} style={{ "--fxd": "var(--dEcho)", ...d(0) }}>{hl[0]}<span className="i">{hl[1]}</span></div>
        <div className="rv-hero">
          <div className="hero-scale">
            {i === 0 ? <div className="rv-card-ghost" data-va-slot="reveal-card"></div> : null}
            <img className={"card" + (i > 0 || F.cardHandoff ? " live" : "")} src={p.cardSrc} alt="" />
          {p.bottle ? (
            <img className={"bottle fx slide-l" + (heroIn ? " in" : "")} style={{ "--fxd": "var(--dEcho)", ...d(140) }} src={p.bottle} alt={p.wine} />
          ) : (
            <div className={"bottle-sil fx slide-l" + (heroIn ? " in" : "")} style={{ color: light ? "#152231" : "#efece4", "--fxd": "var(--dEcho)", ...d(140) }}><BottleSil></BottleSil></div>
          )}
          <div className={"rv-namewrap fx" + (heroIn ? " in" : "")} style={{ "--fxd": "var(--dEcho)", ...d(280) }}>
            <div className="rv-pour-label">THE POUR</div>
            <div className="rv-wine">{p.wine}</div>
            <div className="rv-sub">{p.sub[0]}<br />{p.sub[1]}</div>
            {p.cellarMatch ? <div className="rv-cellar-line"><span className="rv-cellar-dot"></span>ONE MATCH SLEEPS IN YOUR CELLAR</div> : null}
          </div>
        </div>
      </div>
      <div className={"rv-body fx up" + (bodyIn ? " in" : "")} style={{ "--fxd": "var(--dPour)", ...d(0) }}>{p.body}</div>
        <div className={"rv-stats fx up" + (bodyIn ? " in" : "")} style={{ "--fxd": "var(--dPour)", ...d(130) }}>
          {Object.entries(p.stats).map(([k, v]) => (
            <div key={k} className="rv-stat"><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
        <div className={"rv-scales fx up" + (bodyIn ? " in" : "")} style={{ "--fxd": "var(--dPour)", ...d(240) }}>
          <div className="rv-scales-h">ON THE PALATE</div>
          <Scale l="SOFT" r="ACIDIC" v={p.tastes.acid}></Scale>
          <Scale l="DRY" r="SWEET" v={p.tastes.sweet}></Scale>
          <Scale l="SMOOTH" r="TANNIC" v={p.tastes.tannin}></Scale>
          <Scale l="LIGHT" r="BOLD" v={p.tastes.body}></Scale>
        </div>
      </div>
    </div>
  );
}

function Reveal({ card, lens, light, F, onKeep, onFade, spd }) {
  const c = ARCANA[card];
  const pours = (POURS[card] || []).map((p) => ({ ...p, cardSrc: "assets/cards/" + c.file + ".png" }));
  const [idx, setIdx] = React.useState(0);
  const ref = React.useRef(null);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    setIdx(Math.max(0, Math.min(pours.length - 1, Math.round(el.scrollLeft / el.clientWidth))));
  };
  const jump = (i) => { const el = ref.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" }); };
  const hl = c.reveal.headline;
  const d = (ms) => ({ transitionDelay: Math.round(ms / spd) + "ms" });
  return (
    <div className="rv-screen va-layer" data-screen-label="Flow — Reveal">
      <div className="rv-eyebrow">
        <span className="txt" style={{ visibility: F.handoff ? "visible" : "hidden" }} data-va-slot="eyeb-rev">
          <span className="card-part">{c.num} · {c.name.toUpperCase()}</span>
          <span className="lens-part"> — {lens.name.toUpperCase()}</span>
        </span>
      </div>
      <div className="rv-pours" ref={ref} onScroll={onScroll}>
        {pours.map((p, i) => <PourPane key={i} p={p} hl={hl} light={light} i={i} F={F} spd={spd}></PourPane>)}
      </div>
      {pours.length > 1 ? (
        <div className={"rv-dotswrap fx" + (F.pourIn ? " in" : "")} style={{ "--fxd": "var(--dPour)", ...d(320) }}>
          <div className="rv-dots">
            {pours.map((_, i) => <div key={i} className={"dot" + (i === idx ? " on" : "")} onClick={() => jump(i)}></div>)}
          </div>
        </div>
      ) : null}
      <div className={"rv-actions fx up" + (F.pourIn ? " in" : "")} style={{ "--fxd": "var(--dPour)", ...d(400) }}>
        <div className="rv-btn ghost" onClick={() => onFade(pours[idx])}>LET IT FADE</div>
        <div className="rv-btn fill" onClick={() => onKeep(pours[idx])}>KEEP THIS MEMORY</div>
      </div>
    </div>
  );
}

Object.assign(window, { BottleSil, Scale, PourPane, Reveal });
