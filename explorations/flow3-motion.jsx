// FLOW v3 — motion toolkit for the Tweaks panel:
//   · spring curves → CSS linear() easings, with presets + custom tension/friction/mass
//   · TweakFold (collapsible sections, persisted) + TweakTabs (Design / Motion)
//   · MotionTimeline — AE-style beat bars (drag to move, drag right edge to resize)
//   · BeatInspector — start/dur scrubbers + ease picker w/ curve preview
//   · useMotionClock — rAF timeline runner (parallel beats, fast-forward aware)

// ── spring math ──────────────────────────────────────────────────────────────
const SPRINGS = {
  silk:     { label: "Silk · settles clean",    t: 170, f: 26, m: 1 },
  gentle:   { label: "Gentle · soft drift",     t: 120, f: 17, m: 1 },
  swift:    { label: "Swift · quick, composed", t: 320, f: 30, m: 1 },
  supple:   { label: "Supple · a breath over",  t: 210, f: 19, m: 1 },
  bounce:   { label: "Bounce · playful",        t: 300, f: 13, m: 1 },
  molasses: { label: "Molasses · slow pour",    t: 60,  f: 16, m: 1 },
};

// Non-spring CSS eases — for pure opacity fades. Springs are settle-normalized,
// so they LOOK finished well before the duration ends (the last stretch is an
// invisible asymptote); a fade that should read for its full length needs a
// plain bezier instead.
const CSS_EASES = {
  fade:   { label: "Fade · full-length", css: "cubic-bezier(0.42, 0, 0.42, 1)" },
  linear: { label: "Linear · mechanical", css: "linear" },
};

function springParams(e) {
  if (e && e.p === "custom") return { t: e.t || 170, f: e.f || 26, m: e.m || 1 };
  return SPRINGS[(e && e.p)] || SPRINGS.silk;
}

// Simulate x'' = (-k(x-1) - c·x')/m from rest, find settle time, resample to
// `steps` evenly-spaced points over [0, settle]. Time axis is then normalized —
// the curve SHAPE is the spring; the transition duration stretches it.
function sampleSpring(t, f, m, steps = 56) {
  const k = t, c = f, mass = m || 1, dt = 1 / 240;
  let x = 0, v = 0, time = 0, settle = null;
  const raw = [0];
  while (time < 12) {
    const a = (-k * (x - 1) - c * v) / mass;
    v += a * dt; x += v * dt; time += dt;
    raw.push(x);
    if (settle === null && Math.abs(x - 1) < 0.0015 && Math.abs(v) < 0.02) settle = time;
  }
  const n = Math.max(4, Math.round((settle || 12) / dt));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    pts.push(raw[Math.min(raw.length - 1, Math.round((i / steps) * (n - 1)))]);
  }
  pts[0] = 0; pts[steps] = 1;
  return pts;
}

const __supportsLinear = typeof CSS !== "undefined" && CSS.supports &&
  CSS.supports("transition-timing-function", "linear(0, 1)");

const __easeCache = {};
// Ease value → CSS timing-function string.
function easeCss(e) {
  if (e && CSS_EASES[e.p]) return CSS_EASES[e.p].css;
  const p = springParams(e);
  const key = p.t + "/" + p.f + "/" + p.m;
  if (__easeCache[key]) return __easeCache[key];
  let out;
  if (__supportsLinear) {
    out = "linear(" + sampleSpring(p.t, p.f, p.m).map((v) => +v.toFixed(4)).join(", ") + ")";
  } else {
    // fallback: damping-ratio-aware bezier approximation
    const zeta = p.f / (2 * Math.sqrt(p.t * (p.m || 1)));
    out = zeta < 0.5 ? "cubic-bezier(0.3, 1.4, 0.4, 1)"
      : zeta < 0.85 ? "cubic-bezier(0.3, 1.12, 0.35, 1)"
      : "cubic-bezier(0.3, 0.7, 0.2, 1)";
  }
  __easeCache[key] = out;
  return out;
}

// ── panel UI prefs (folds / tab / selection — UI state, not design state) ────
function __panelPrefs() {
  try { return JSON.parse(localStorage.getItem("va-flow3-panel") || "{}"); } catch (e) { return {}; }
}
function __setPanelPref(k, v) {
  const p = __panelPrefs(); p[k] = v;
  localStorage.setItem("va-flow3-panel", JSON.stringify(p));
}
function usePanelPref(key, def) {
  const [v, setV] = React.useState(() => {
    const p = __panelPrefs();
    return p[key] === undefined ? def : p[key];
  });
  const set = React.useCallback((nv) => { setV(nv); __setPanelPref(key, nv); }, [key]);
  return [v, set];
}

// ── TweakTabs ────────────────────────────────────────────────────────────────
function TweakTabs({ tabs, value, onChange }) {
  const idx = Math.max(0, tabs.indexOf(value));
  return (
    <div className="twk-tabs">
      <div className="twk-tabs-thumb" style={{
        left: "calc(2px + " + idx + " * (100% - 4px) / " + tabs.length + ")",
        width: "calc((100% - 4px) / " + tabs.length + ")" }}></div>
      {tabs.map((tb) => (
        <button key={tb} type="button" data-on={tb === value ? "1" : "0"} onClick={() => onChange(tb)}>{tb}</button>
      ))}
    </div>
  );
}

// ── TweakFold — collapsible section ─────────────────────────────────────────
function TweakFold({ id, label, hint, defaultOpen = false, children }) {
  const [open, setOpen] = usePanelPref("fold:" + id, defaultOpen);
  return (
    <div className="twk-fold" data-open={open ? "1" : "0"}>
      <button type="button" className="twk-fold-h" onClick={() => setOpen(!open)}>
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d="M2 1 L6 4 L2 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <span>{label}</span>
        {hint ? <em>{hint}</em> : null}
      </button>
      {open ? <div className="twk-fold-b">{children}</div> : null}
    </div>
  );
}

// ── curve preview ────────────────────────────────────────────────────────────
function CurvePreview({ ease }) {
  const cssPreset = ease && CSS_EASES[ease.p];
  const p = springParams(ease);
  const pts = React.useMemo(() => {
    if (cssPreset) {
      const out = [];
      for (let i = 0; i <= 72; i++) {
        const x = i / 72;
        out.push(ease.p === "linear" ? x : x * x * (3 - 2 * x)); // smoothstep ≈ the fade bezier
      }
      return out;
    }
    return sampleSpring(p.t, p.f, p.m, 72);
  }, [cssPreset ? ease.p : null, p.t, p.f, p.m]);
  let lo = 0, hi = 1;
  for (const v of pts) { if (v < lo) lo = v; if (v > hi) hi = v; }
  lo -= 0.06; hi += 0.06;
  const W = 100, H = 44;
  const y = (v) => H - ((v - lo) / (hi - lo)) * H;
  const poly = pts.map((v, i) => ((i / (pts.length - 1)) * W).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  return (
    <svg className="mtl-curve" viewBox={"0 0 " + W + " " + H} preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" x2={W} y1={y(1)} y2={y(1)} stroke="rgba(0,0,0,0.14)" strokeDasharray="2 3" vectorEffect="non-scaling-stroke"></line>
      <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="rgba(0,0,0,0.09)" vectorEffect="non-scaling-stroke"></line>
      <polyline points={poly} fill="none" stroke="#a35a2a" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></polyline>
    </svg>
  );
}

// ── EasePicker — preset dropdown + custom spring params ─────────────────────
function EasePicker({ value, onChange, label = "Curve" }) {
  const opts = [
    ...Object.keys(SPRINGS).map((k) => ({ value: k, label: SPRINGS[k].label })),
    ...Object.keys(CSS_EASES).map((k) => ({ value: k, label: CSS_EASES[k].label })),
    { value: "custom", label: "Custom spring…" },
  ];
  const cur = (value && value.p) || "silk";
  const p = springParams(value);
  const pick = (k) => {
    if (k === "custom") onChange({ p: "custom", t: p.t, f: p.f, m: p.m || 1 });
    else onChange({ p: k });
  };
  return (
    <React.Fragment>
      <TweakSelect label={label} value={cur} options={opts} onChange={pick}></TweakSelect>
      <CurvePreview ease={value}></CurvePreview>
      {cur === "custom" ? (
        <React.Fragment>
          <TweakSlider label="Tension" value={value.t} min={30} max={600} step={5} onChange={(v) => onChange({ ...value, t: v })}></TweakSlider>
          <TweakSlider label="Friction" value={value.f} min={4} max={60} step={1} onChange={(v) => onChange({ ...value, f: v })}></TweakSlider>
          <TweakSlider label="Mass" value={value.m || 1} min={0.5} max={3} step={0.1} onChange={(v) => onChange({ ...value, m: v })}></TweakSlider>
        </React.Fragment>
      ) : null}
      <div className="mtl-note">spring shape · stretched to the beat's duration</div>
    </React.Fragment>
  );
}

// ── timeline helpers ─────────────────────────────────────────────────────────
function niceSpan(maxEnd) {
  const opts = [1000, 1500, 2000, 3000, 4000, 5000, 6000, 8000, 10000, 12000];
  for (const o of opts) { if (maxEnd * 1.05 <= o) return o; }
  return 14000;
}
function tickStep(span) {
  return span <= 1500 ? 250 : span <= 3000 ? 500 : span <= 6000 ? 1000 : 2000;
}
function fmtT(ms) { return ms >= 1000 ? (ms % 1000 === 0 ? ms / 1000 + "s" : (ms / 1000).toFixed(2) + "s") : String(ms); }
function snapMs(v) { return Math.round(v / 5) * 5; }

// ── MotionTimeline ───────────────────────────────────────────────────────────
// beats: [{ key, label, ease? }] · values: { key: { s, d } }
function MotionTimeline({ beats, values, onChange, selected, onSelect, tail = 0 }) {
  const scaleRef = React.useRef(null);
  const maxEnd = beats.reduce((m, b) => {
    const v = values[b.key]; return v ? Math.max(m, v.s + v.d) : m;
  }, 0) + tail;
  const span = niceSpan(maxEnd);
  const step = tickStep(span);
  const ticks = [];
  for (let x = 0; x <= span; x += step) ticks.push(x);
  const pct = (ms) => (ms / span) * 100 + "%";

  const startDrag = (e, key, mode) => {
    e.preventDefault(); e.stopPropagation();
    onSelect(key);
    const el = scaleRef.current; if (!el) return;
    const pxMs = el.getBoundingClientRect().width / span;
    const v0 = { ...values[key] };
    const x0 = e.clientX;
    const move = (ev) => {
      const dm = (ev.clientX - x0) / pxMs;
      if (mode === "move") onChange(key, { s: snapMs(Math.max(0, v0.s + dm)) });
      else onChange(key, { d: snapMs(Math.max(60, v0.d + dm)) });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className="mtl">
      <div className="mtl-head">
        <div className="mtl-lbl"></div>
        <div className="mtl-scale" ref={scaleRef}>
          {ticks.map((x, i) => (
            <span key={x} style={{ left: pct(x), transform: i === 0 ? "none" : undefined }}>{fmtT(x)}</span>
          ))}
        </div>
      </div>
      {beats.map((b) => {
        const v = values[b.key]; if (!v) return null;
        const on = selected === b.key;
        return (
          <div key={b.key} className={"mtl-row" + (on ? " on" : "")} onClick={() => onSelect(b.key)}>
            <div className="mtl-lbl">{b.label}</div>
            <div className="mtl-track" style={{ backgroundSize: "calc(100% * " + step / span + ") 100%" }}>
              <div className="mtl-bar" style={{ left: pct(v.s), width: pct(v.d) }}
                onPointerDown={(e) => startDrag(e, b.key, "move")}
                title={b.label + " · " + Math.round(v.s) + "ms → " + Math.round(v.s + v.d) + "ms"}>
                {v.d / span > 0.17 ? <span>{Math.round(v.d)}</span> : null}
                <i className="mtl-h" onPointerDown={(e) => startDrag(e, b.key, "size")}></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── BeatInspector ────────────────────────────────────────────────────────────
function BeatInspector({ beat, values, onChange, easeValue, onEase }) {
  const v = values[beat.key];
  if (!v) return null;
  return (
    <div className="mtl-insp">
      <div className="mtl-insp-h">{beat.label}</div>
      <div className="mtl-insp-nums">
        <TweakNumber label="Start" value={Math.round(v.s)} min={0} max={12000} step={10} unit="ms" onChange={(n) => onChange(beat.key, { s: n })}></TweakNumber>
        <TweakNumber label="Dur" value={Math.round(v.d)} min={60} max={12000} step={10} unit="ms" onChange={(n) => onChange(beat.key, { d: n })}></TweakNumber>
      </div>
      {beat.ease ? (
        <EasePicker value={easeValue} onChange={onEase}></EasePicker>
      ) : (
        <div className="mtl-note">{beat.note || "crossfade beat · timing follows duration"}</div>
      )}
    </div>
  );
}

// ── StageMotion — timeline + inspector for one stage ────────────────────────
function StageMotion({ id, beats, tlKey, t, setTweak, tail = 0 }) {
  const [sel, setSel] = usePanelPref("sel:" + id, beats[0].key);
  const tl = t[tlKey];
  const patch = (key, p) => setTweak(tlKey, { ...tl, [key]: { ...tl[key], ...p } });
  const beat = beats.find((b) => b.key === sel) || beats[0];
  return (
    <React.Fragment>
      <MotionTimeline beats={beats} values={tl} onChange={patch} selected={beat.key} onSelect={setSel} tail={tail}></MotionTimeline>
      <BeatInspector beat={beat} values={tl} onChange={patch}
        easeValue={beat.ease ? t[beat.ease] : null}
        onEase={(v) => setTweak(beat.ease, v)}></BeatInspector>
    </React.Fragment>
  );
}

// ── useMotionClock — parallel beat scheduler on a rAF virtual clock ──────────
// run(events, endMs, ffRef, onEnd): events = [{ t, run }]. The clock advances at
// ffRef.current× real time, so fast-forward mid-flight compresses what remains.
function useMotionClock() {
  const st = React.useRef(null);
  const cancel = React.useCallback(() => {
    if (st.current) { cancelAnimationFrame(st.current.raf); st.current = null; }
  }, []);
  const run = React.useCallback((events, endMs, ffRef, onEnd) => {
    cancel();
    const s = { vt: 0, last: performance.now(), evts: [...events].sort((a, b) => a.t - b.t), i: 0, raf: 0 };
    st.current = s;
    const tick = (now) => {
      if (st.current !== s) return;
      const spd = ffRef && ffRef.current > 1 ? ffRef.current : 1;
      // Honest wall-clock advance — EXCEPT when it would collapse two or more
      // beats into one tick (one janky frame swallowing multiple events lands
      // them in a single React commit, so intermediate states never paint).
      // In that case: run only the first due beat and hold the clock just
      // short of the second, so it fires on the next frame.
      let nvt = s.vt + (now - s.last) * spd;
      s.last = now;
      let j = s.i;
      while (j < s.evts.length && s.evts[j].t <= nvt) j++;
      if (j - s.i >= 2) {
        nvt = Math.max(s.evts[s.i + 1].t - 1, s.evts[s.i].t);
        s.evts[s.i++].run();
      } else if (j - s.i === 1) {
        s.evts[s.i++].run();
      }
      s.vt = nvt;
      if (s.vt >= endMs && s.i >= s.evts.length) { st.current = null; if (onEnd) onEnd(); return; }
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
  }, [cancel]);
  const running = React.useCallback(() => !!st.current, []);
  return { run, cancel, running };
}

// ── panel CSS additions ──────────────────────────────────────────────────────
const __FLOW3_CSS = `
  .twk-panel{width:332px}
  .twk-tabs{position:relative;display:flex;flex:none;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none;margin-bottom:2px}
  .twk-tabs-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .16s cubic-bezier(.3,.7,.4,1)}
  .twk-tabs button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:rgba(41,38,27,.55);font:inherit;font-weight:600;
    min-height:22px;border-radius:6px;cursor:default;padding:3px 6px}
  .twk-tabs button[data-on="1"]{color:#29261b}

  .twk-fold{border:.5px solid rgba(0,0,0,.09);border-radius:9px;background:rgba(255,255,255,.35)}
  .twk-fold-h{appearance:none;display:flex;align-items:center;gap:7px;width:100%;
    padding:8px 10px;background:transparent;border:0;font:inherit;font-size:10px;
    font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.6);cursor:default;text-align:left}
  .twk-fold-h:hover{color:#29261b}
  .twk-fold-h svg{flex:none;color:rgba(41,38,27,.4);transition:transform .16s}
  .twk-fold[data-open="1"] .twk-fold-h svg{transform:rotate(90deg)}
  .twk-fold-h em{font-style:normal;font-weight:500;letter-spacing:.02em;
    text-transform:none;color:rgba(41,38,27,.38);margin-left:auto}
  .twk-fold-b{display:flex;flex-direction:column;gap:10px;padding:2px 10px 12px}
  .twk-fold-b .twk-sect{padding-top:4px}

  .mtl{display:flex;flex-direction:column;gap:3px}
  .mtl-head{display:flex;height:13px;margin-bottom:1px}
  .mtl-lbl{width:62px;flex:none;font-size:10px;font-weight:500;color:rgba(41,38,27,.62);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:6px}
  .mtl-scale{position:relative;flex:1}
  .mtl-scale span{position:absolute;top:0;font-size:8.5px;color:rgba(41,38,27,.38);
    transform:translateX(-50%);font-variant-numeric:tabular-nums}
  .mtl-row{display:flex;align-items:center;height:21px;border-radius:5px;padding:0 0 0 2px;margin:0 -2px}
  .mtl-row.on{background:rgba(163,90,42,.08)}
  .mtl-row.on .mtl-lbl{color:#29261b}
  .mtl-track{position:relative;flex:1;height:15px;border-radius:4px;
    background-color:rgba(0,0,0,.035);
    background-image:linear-gradient(to right, rgba(0,0,0,.08) .5px, transparent .5px);
    background-repeat:repeat-x}
  .mtl-bar{position:absolute;top:1px;bottom:1px;min-width:7px;border-radius:3px;
    background:rgba(41,38,27,.62);cursor:grab;display:flex;align-items:center;
    justify-content:center;touch-action:none}
  .mtl-bar:active{cursor:grabbing}
  .mtl-row.on .mtl-bar{background:#a35a2a}
  .mtl-bar span{font-size:8.5px;line-height:1;color:rgba(255,255,255,.9);
    pointer-events:none;font-variant-numeric:tabular-nums}
  .mtl-h{position:absolute;right:0;top:0;bottom:0;width:7px;cursor:ew-resize;
    border-radius:0 3px 3px 0;background:rgba(255,255,255,.28)}

  .mtl-insp{border-top:.5px dashed rgba(0,0,0,.14);padding-top:9px;
    display:flex;flex-direction:column;gap:9px}
  .mtl-insp-h{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;
    color:#a35a2a}
  .mtl-insp-nums{display:flex;gap:8px}
  .mtl-insp-nums .twk-num{flex:1}
  .mtl-curve{width:100%;height:44px;border:.5px solid rgba(0,0,0,.09);border-radius:6px;
    background:rgba(255,255,255,.5);display:block}
  .mtl-note{font-size:9.5px;color:rgba(41,38,27,.42)}
`;

function Flow3PanelStyle() { return <style>{__FLOW3_CSS}</style>; }

Object.assign(window, {
  SPRINGS, springParams, sampleSpring, easeCss,
  usePanelPref, TweakTabs, TweakFold, CurvePreview, EasePicker,
  MotionTimeline, BeatInspector, StageMotion, useMotionClock, Flow3PanelStyle,
});
