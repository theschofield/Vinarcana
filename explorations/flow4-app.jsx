// FLOW v4 — Reading override: the desktop ORBIT gains life.
// · Each lens floats on its own slow multi-sine drift (position + scale breath)
// · Cursor proximity gently grows a lens and draws it toward the pointer
// · All motion runs on one rAF loop writing transforms to an inner .orb-float
//   wrapper — the outer element keeps position/enter-exit, so slot math and
//   hit-targets stay honest. Loads AFTER flow2-app.jsx and replaces Reading.

const ORBIT_V4_4 = [
  { x: 17, y: 26, side: "l" }, { x: 15, y: 62, side: "l" },
  { x: 83, y: 26, side: "r" }, { x: 85, y: 62, side: "r" },
];
const ORBIT_V4_5 = [
  { x: 17, y: 24, side: "l" }, { x: 14, y: 58, side: "l" },
  { x: 83, y: 18, side: "r" }, { x: 86, y: 44, side: "r" }, { x: 83, y: 72, side: "r" },
];

// per-lens drift signatures — w in rad/s (periods ~9–14s), phases scattered
const ORB_SEEDS = [
  { wx: 0.62, px: 0.8, wx2: 1.31, px2: 4.1, wy: 0.47, py: 2.3, wy2: 1.02, py2: 0.5, ws: 0.55, ps: 1.7 },
  { wx: 0.51, px: 3.9, wx2: 1.13, px2: 1.2, wy: 0.66, py: 5.1, wy2: 0.91, py2: 3.3, ws: 0.44, ps: 4.2 },
  { wx: 0.58, px: 5.6, wx2: 1.22, px2: 2.8, wy: 0.52, py: 0.9, wy2: 1.08, py2: 5.7, ws: 0.61, ps: 0.4 },
  { wx: 0.45, px: 2.2, wx2: 1.05, px2: 5.3, wy: 0.60, py: 3.8, wy2: 0.86, py2: 1.9, ws: 0.50, ps: 3.1 },
  { wx: 0.67, px: 1.4, wx2: 1.40, px2: 0.2, wy: 0.43, py: 4.6, wy2: 1.15, py2: 2.6, ws: 0.58, ps: 5.5 },
];

// One rAF loop for all lenses. tuningRef.current = { on, amp, speed, breath,
// radius, pull, grow }. frozenRef.current = true → hold last frame (choose beat).
function useOrbitFloat(enabled, count, floatRefs, outerRefs, tuningRef, frozenRef) {
  React.useEffect(() => {
    if (!enabled || count === 0) return;
    const va = vaRoot(); if (!va) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = performance.now(), cursor = null;
    const cur = Array.from({ length: count }, () => ({ x: 0, y: 0, s: 1 }));
    const onMove = (e) => {
      const v = va.getBoundingClientRect(); const sc = vaScale();
      cursor = { x: (e.clientX - v.left) / sc, y: (e.clientY - v.top) / sc };
    };
    const onLeave = () => { cursor = null; };
    va.addEventListener("pointermove", onMove);
    va.addEventListener("pointerleave", onLeave);
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, now - last); last = now;
      if (frozenRef.current) return;
      const t = tuningRef.current;
      const vr = va.getBoundingClientRect(); const sc = vaScale();
      const sec = now * 0.001 * (t.speed || 1);
      const k = 1 - Math.exp(-dt / 150); // spring-ish smoothing
      for (let i = 0; i < count; i++) {
        const el = floatRefs.current[i]; const out = outerRefs.current[i];
        if (!el || !out) continue;
        const sd = ORB_SEEDS[i % ORB_SEEDS.length];
        let tx = 0, ty = 0, ts = 1;
        if (t.on && !reduced) {
          tx = Math.sin(sec * sd.wx + sd.px) * t.amp + Math.sin(sec * sd.wx2 + sd.px2) * t.amp * 0.35;
          ty = Math.sin(sec * sd.wy + sd.py) * t.amp * 0.85 + Math.sin(sec * sd.wy2 + sd.py2) * t.amp * 0.3;
          ts = 1 + Math.sin(sec * sd.ws + sd.ps) * t.breath;
        }
        if (cursor && !reduced && t.radius > 0) {
          const r = out.getBoundingClientRect();
          const cx = (r.left + r.width / 2 - vr.left) / sc;
          const cy = (r.top + r.height / 2 - vr.top) / sc;
          const dx = cursor.x - cx, dy = cursor.y - cy;
          const d = Math.hypot(dx, dy);
          if (d < t.radius) {
            let u = 1 - d / t.radius; u = u * u * (3 - 2 * u); // smoothstep
            tx += dx * u * t.pull;
            ty += dy * u * t.pull;
            ts += u * t.grow;
          }
        }
        const c = cur[i];
        c.x += (tx - c.x) * k; c.y += (ty - c.y) * k; c.s += (ts - c.s) * k;
        el.style.transform = "translate3d(" + c.x.toFixed(2) + "px, " + c.y.toFixed(2) + "px, 0) scale(" + c.s.toFixed(4) + ")";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      va.removeEventListener("pointermove", onMove);
      va.removeEventListener("pointerleave", onLeave);
      floatRefs.current.forEach((el) => { if (el) el.style.transform = ""; });
    };
  }, [enabled, count]);
}

function Reading({ card, light, whispered, flare, desktop, F, onPick, lensStep, spd, orbit }) {
  const c = ARCANA[card];
  const face = "assets/cards/" + c.file + ".png";
  const orbitRef = React.useRef(orbit); orbitRef.current = orbit || {};
  const frozenRef = React.useRef(false);
  frozenRef.current = F.choosing;
  const floatRefs = React.useRef([]);
  const outerRefs = React.useRef([]);
  useOrbitFloat(!!desktop, desktop ? c.lenses.length : 0, floatRefs, outerRefs, orbitRef, frozenRef);

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
    const slots = c.lenses.length > 4 ? ORBIT_V4_5 : ORBIT_V4_4;
    const spread = (orbit && orbit.spread) || 1;
    return (
      <div className="rx-read va-layer" data-screen-label="Flow — Reading (orbit)">
        {eyebrow}
        <div className="va-orbit">
          <img className="va-orbit-card" src={face} alt="" style={{ visibility: "hidden" }} data-va-slot="read-card" />
          <div className={"va-orbit-knowing fx up" + (F.voiceIn && !F.choosing ? " in" : "")} style={{ "--fxd": "var(--dVoice)" }}>{c.knowing}</div>
          {c.lenses.map((l, i) => {
            const s = slots[i] || slots[slots.length - 1];
            const fx = lensFx(l, i);
            const lx = 50 + (s.x - 50) * spread;
            const ly = 44 + (s.y - 44) * spread;
            return (
              <div key={l.n} ref={(el) => { outerRefs.current[i] = el; }}
                className={"va-orbit-lens side-" + s.side + (whispered && l.nudge ? " nudge" : "") + " " + fx.cls}
                style={{ left: lx + "%", top: ly + "%", ...fx.style }} onClick={() => onPick(l)}>
                <div className="orb-float" ref={(el) => { floatRefs.current[i] = el; }}>
                  {flare ? <div className="va-orbit-flare"></div> : null}
                  <div className="body">
                    <div className="rx-lens-name">{l.name}{l.cellar ? <span className="rx-lens-dot"></span> : null}</div>
                    <div className="rx-lens-whis">{l.whis}</div>
                  </div>
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

Object.assign(window, { Reading, useOrbitFloat, ORB_SEEDS });
