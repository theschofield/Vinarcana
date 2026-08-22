// FLOW v5 — the Reveal layer.
// · Every pour renders a real bottle image (the shared fallback rule,
//   wine-surfaces.jsx, stands in when a pour has none).
// · The palate rows are the shared WineScales (one vocabulary everywhere, D24).
// · Paginated pours pin the shout + card: they live on a layer UNDER the
//   panes (bottles still pass in front), tracking the active pane's vertical
//   scroll — horizontal swipes never move them. Panes keep invisible copies
//   as spacers so scroll geometry and the actor's ghost slot are unchanged.

function PourPane({ p, hl, light, i, F, spd, pinned, onV, entry, hasGuide, onDeeper }) {
  // the ENTRY pane choreographs in (pane 0 normally; the kept wine's pane on
  // memory re-entry); the others render settled — they're offscreen until swiped
  const heroIn = !entry || F.echoIn;
  const bodyIn = !entry || F.pourIn;
  const bottleIn = !entry || F.bottleIn;
  const bottleSrc = p.bottle || wineBottleSrc(null);
  const [scrolled, setScrolled] = React.useState(false);
  const d = (ms) => ({ transitionDelay: Math.round((!entry ? 0 : ms) / spd) + "ms" });
  const onScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    setScrolled(top > 4);
    if (onV) onV(i, top);
  };
  return (
    <div className="rv-pane">
      <div className={"rv-vscroll" + (scrolled ? " scrolled" : "")} onScroll={onScroll}>
        <div className={"rv-headline fx up" + (heroIn ? " in" : "")}
          style={{ "--fxd": "var(--dEcho)", visibility: pinned ? "hidden" : "visible", ...d(0) }}>{hl[0]}<span className="i">{hl[1]}</span></div>
        <div className="rv-hero">
          <div className="hero-scale">
            {i === 0 && !pinned ? <div className="rv-card-ghost" data-va-slot="reveal-card"></div> : null}
            <img className={"card" + (!pinned && (i > 0 || F.cardHandoff) ? " live" : "")} src={p.cardSrc} alt="" />
          <img className={"bottle fx slide-l" + (bottleIn ? " in" : "")} style={{ "--fxd": "var(--dBottle)" }} src={bottleSrc} alt={p.wine} />
          <div className={"rv-namewrap fx" + (heroIn ? " in" : "")} style={{ "--fxd": "var(--dEcho)", ...d(280) }}>
            <div className="rv-pour-label">THE POUR</div>
            <div className="rv-wine">{p.wine}</div>
            <div className="rv-sub">{p.sub[0]}<br />{p.sub[1]}</div>
            {p.cellarMatch ? <div className="rv-cellar-line"><span className="rv-cellar-dot"></span>IN YOUR CELLAR</div> : null}
            {hasGuide ? <div><span className="dr5-pourbtn" onClick={(e) => { e.stopPropagation(); onDeeper(); }}>Card meaning</span></div> : null}
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
          <WineScales tastes={p.tastes}></WineScales>
        </div>
      </div>
    </div>
  );
}

function Reveal({ card, lens, light, F, onKeep, onFade, spd, initialWine, onDeeper }) {
  const hasGuide = !!(window.GUIDES && GUIDES[card]);
  const c = ARCANA[card];
  const cardSrc = "assets/cards/" + c.file + ".webp";
  // POURS is keyed by lens_no (each lens carries its own echo + pours);
  // fall back to the first lens that has pours if the picked one has none yet.
  const byLens = POURS[card] || {};
  const lensKey = lens && byLens[lens.n] && byLens[lens.n].length ? lens.n
    : Object.keys(byLens).find((k) => byLens[k] && byLens[k].length);
  const pours = (byLens[lensKey] || []).map((p) => ({ ...p, cardSrc }));
  const pinned = pours.length > 1;
  // memory re-entry lands on the KEPT wine's pane, not pane 0
  const initIdx = React.useMemo(() => {
    if (!initialWine) return 0;
    const i = pours.findIndex((p) => p.wine === initialWine);
    return i < 0 ? 0 : i;
  }, []);
  const [idx, setIdx] = React.useState(initIdx);
  const idxRef = React.useRef(initIdx);
  const [pinY, setPinY] = React.useState(0);
  const [pinAnim, setPinAnim] = React.useState(false);
  const animTimer = React.useRef(null);
  const topsRef = React.useRef([]);
  const ref = React.useRef(null);
  React.useEffect(() => () => clearTimeout(animTimer.current), []);
  // memory re-entry: stand on the kept wine's pane before first paint
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (el && initIdx > 0) el.scrollLeft = initIdx * el.clientWidth;
  }, []);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    const i = Math.max(0, Math.min(pours.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
    if (i !== idxRef.current) {
      idxRef.current = i; setIdx(i);
      // glide the pinned shout + card to the new pane's scroll offset
      setPinAnim(true); setPinY(topsRef.current[i] || 0);
      clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => setPinAnim(false), 420);
    }
  };
  const onV = (i, top) => {
    topsRef.current[i] = top;
    if (i === idxRef.current) setPinY(top);
  };
  const jump = (i) => { const el = ref.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" }); };
  const hl = (c.reveal.headlineByLens && c.reveal.headlineByLens[lensKey]) || c.reveal.headline;
  const d = (ms) => ({ transitionDelay: Math.round(ms / spd) + "ms" });
  return (
    <div className="rv-screen va-layer" data-screen-label="Flow — Reveal">
      <div className="va-foot-pin">
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
      <div className="rv-eyebrow">
        <span className="txt" style={{ visibility: F.handoff ? "visible" : "hidden" }} data-va-slot="eyeb-rev">
          <span className="card-part">{c.num} · {c.name.toUpperCase()}</span>
          <span className="lens-part"> — {lens.name.toUpperCase()}</span>
        </span>
      </div>
      <div className="rv-pourswrap">
        {pinned ? (
          <div className={"rv-pin" + (pinY > 4 ? " scrolled" : "")}>
            <div style={{ transform: "translateY(" + (-pinY) + "px)",
              transition: pinAnim ? "transform 380ms cubic-bezier(0.3, 0.7, 0.2, 1)" : "none" }}>
              <div className={"rv-headline fx up" + (F.echoIn ? " in" : "")} style={{ "--fxd": "var(--dEcho)" }}>{hl[0]}<span className="i">{hl[1]}</span></div>
              <div className="rv-hero">
                <div className="hero-scale">
                  <div className="rv-card-ghost" data-va-slot="reveal-card"></div>
                  <img className={"card" + (F.cardHandoff ? " live" : "")} src={cardSrc} alt="" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="rv-pours" ref={ref} onScroll={onScroll}>
          {pours.map((p, i) => <PourPane key={i} p={p} hl={hl} light={light} i={i} F={F} spd={spd} pinned={pinned} onV={onV} entry={i === initIdx} hasGuide={hasGuide} onDeeper={onDeeper}></PourPane>)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PourPane, Reveal });
