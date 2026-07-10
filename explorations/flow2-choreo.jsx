// FLOW v2 — choreography primitives: slot measurement, the card actor,
// the eyebrow actor, the smoke FX canvas, and the beat sequencer.

const CARD_AR = 1285 / 816;   // deck back
const FACE_AR = 3600 / 2100;  // card-face scans

function vaRoot() { return document.querySelector(".va"); }

// the phone frame scales via transform — all rects normalize back to local px
function vaScale() {
  const va = vaRoot(); if (!va || !va.offsetWidth) return 1;
  return va.getBoundingClientRect().width / va.offsetWidth;
}

function slotRect(name) {
  const va = vaRoot(); if (!va) return null;
  const el = va.querySelector('[data-va-slot="' + name + '"]'); if (!el) return null;
  const r = el.getBoundingClientRect(), v = va.getBoundingClientRect();
  const s = vaScale();
  return { left: (r.left - v.left) / s, top: (r.top - v.top) / s, width: r.width / s, height: r.height / s };
}

function vaSize() {
  const va = vaRoot(); if (!va) return { w: 390, h: 800 };
  return { w: va.offsetWidth, h: va.offsetHeight };
}

// Static (layout-tree) rect: sums offsetLeft/Top up to .va. Ignores transforms
// and running animations — use for the deck, whose reform drop-in animates
// translate and would poison a getBoundingClientRect read.
function slotRectStatic(name) {
  const va = vaRoot(); if (!va) return null;
  const el = va.querySelector('[data-va-slot="' + name + '"]'); if (!el) return null;
  let x = 0, y = 0, n = el;
  while (n && n !== va) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { left: x, top: y, width: el.offsetWidth, height: el.offsetHeight };
}

// ---------- THE CARD ACTOR ----------
// a = { left, top, width, ar, rot, sc, flip, o, dur, ease, flipDur, oDur, radius, shadow, instant }
// ar = height/width of the box; morphs back-aspect → face-aspect during the flip
// sc: composited scale — use for mid-flight swells so width (layout) stays put
// rPct (optional): corner radius as % of card width — the tokenized form.
// When given it overrides a.radius, so one value rules every placement.
function CardActor({ a, face, poster, rPct }) {
  if (!a) return null;
  const h = a.width * (a.ar || CARD_AR);
  const rad = rPct != null ? a.width * rPct / 100 : (a.radius != null ? a.radius : 12);
  const ease = a.ease || "ease";
  const tr = a.instant ? "none" :
    "left " + a.dur + "ms " + ease + ", top " + a.dur + "ms " + ease + ", width " + a.dur + "ms " + ease +
    ", height " + a.dur + "ms " + ease + ", transform " + a.dur + "ms " + ease +
    ", border-radius " + a.dur + "ms ease, opacity " + (a.oDur != null ? a.oDur : a.dur) + "ms ease";
  const ftr = a.instant ? "none" : "transform " + (a.flipDur != null ? a.flipDur : a.dur) + "ms " + (a.flipEase || "cubic-bezier(0.55, 0.06, 0.28, 1)");
  return (
    <div className={"va-card-actor " + (a.shadow || "sh-deck")}
      style={{ left: a.left + "px", top: a.top + "px", width: a.width + "px", height: h + "px",
        opacity: a.o, borderRadius: rad + "px",
        transform: "rotate(" + (a.rot || 0) + "deg) scale(" + (a.sc || 1) + ")", transition: tr }}>
      <div className="flip3d" style={{ transform: "rotateY(" + (a.flip || 0) + "deg)", transition: ftr }}>
        <img src="assets/card-back.webp" alt="" draggable="false" />
        {poster ? <img className="face" src={poster} alt="" draggable="false" /> : null}
        {face ? <img className="face" src={face} alt="" draggable="false" /> : null}
      </div>
    </div>
  );
}

// ---------- THE EYEBROW ACTOR ----------
// e = { left, top, fs, ls, o, dur, oDur, rules, lensOn, mode, instant }
function EyebrowActor({ e, num, name, lens }) {
  if (!e) return null;
  const tr = e.instant ? "none" :
    "left " + e.dur + "ms cubic-bezier(0.3, 0.7, 0.2, 1), top " + e.dur + "ms cubic-bezier(0.3, 0.7, 0.2, 1)" +
    ", font-size " + e.dur + "ms ease, letter-spacing " + e.dur + "ms ease, padding-left " + e.dur + "ms ease, opacity " + (e.oDur != null ? e.oDur : e.dur) + "ms ease";
  return (
    <div className={"va-eyeb-actor" + (e.rules ? "" : " no-rules") + (e.lensOn ? " lens-on" : "") + (e.mode === "rev" ? " mode-rev" : " mode-read")}
      style={{ left: e.left + "px", top: e.top + "px", fontSize: e.fs + "px", letterSpacing: e.ls + "em",
        paddingLeft: e.mode === "read" ? e.ls + "em" : "0em", opacity: e.o, transition: tr }}>
      <span className="rule l"></span>
      <span className="cp">{num} · {(name || "").toUpperCase()}</span>
      <span className="lp">{"\u00A0— " + (lens || "").toUpperCase()}</span>
      <span className="rule r"></span>
    </div>
  );
}

// ---------- SMOKE FX (2D canvas, no dependencies) ----------
const VASmoke = { burst: null };

function SmokeFX({ light }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, parts = [], raf = null, last = 0;
    const fit = () => {
      const p = cv.parentElement; if (!p) return;
      W = p.offsetWidth; H = p.offsetHeight;
      cv.width = Math.max(1, W * dpr); cv.height = Math.max(1, H * dpr);
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(cv.parentElement);
    const mkSprite = (r, g, b) => {
      const s = document.createElement("canvas"); s.width = s.height = 64;
      const c = s.getContext("2d");
      const gr = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, "rgba(" + r + "," + g + "," + b + ",0.5)");
      gr.addColorStop(0.5, "rgba(" + r + "," + g + "," + b + ",0.16)");
      gr.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
      c.fillStyle = gr; c.fillRect(0, 0, 64, 64);
      return s;
    };
    const sprites = light ? [mkSprite(21, 34, 49), mkSprite(198, 127, 65)] : [mkSprite(239, 236, 228), mkSprite(245, 170, 93)];
    const tick = (ts) => {
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";
      parts = parts.filter((p) => p.t < p.life + p.delay);
      for (const p of parts) {
        p.t += dt;
        const u = (p.t - p.delay) / p.life;
        if (u < 0 || u > 1) continue;
        p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= 6 * dt;
        const r = p.r0 + p.grow * u;
        const a = Math.sin(Math.min(1, u) * Math.PI) * p.a0;
        ctx.globalAlpha = a;
        ctx.drawImage(p.sp, p.x - r, p.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      if (parts.length) raf = requestAnimationFrame(tick);
      else { raf = null; ctx.clearRect(0, 0, W, H); }
    };
    VASmoke.burst = (rects) => {
      let total = 0;
      for (const rect of rects) {
        if (!rect) continue;
        const n = Math.max(10, Math.min(48, Math.round((rect.width * rect.height) / 1100)));
        for (let i = 0; i < n && total < 200; i++, total++) {
          parts.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 30, vy: -22 - Math.random() * 44,
            r0: 10 + Math.random() * 20, grow: 34 + Math.random() * 60,
            life: 1.1 + Math.random() * 1.1, delay: Math.random() * 0.22, t: 0,
            a0: 0.75 + Math.random() * 0.25,
            sp: sprites[Math.random() < 0.78 ? 0 : 1],
          });
        }
      }
      if (!raf && parts.length) { last = performance.now(); raf = requestAnimationFrame(tick); }
    };
    return () => { ro.disconnect(); if (raf) cancelAnimationFrame(raf); VASmoke.burst = null; };
  }, [light]);
  return <canvas ref={ref} className="va-smoke-fx"></canvas>;
}

// ---------- BEAT SEQUENCER ----------
// run(steps, speedRef): steps = [{ run, dur }]; dur may be a fn read at schedule
// time so tweak changes apply live. speedRef.current > 1 = fast-forward divisor.
// hurry() skips the current wait so a tap feels instant.
function useSequencer() {
  const st = React.useRef(null);
  const cancel = React.useCallback(() => {
    if (st.current) { st.current.cancelled = true; clearTimeout(st.current.timer); st.current = null; }
  }, []);
  const run = React.useCallback((steps, speedRef) => {
    cancel();
    const s = { cancelled: false, timer: null, i: 0 };
    st.current = s;
    const next = () => {
      if (s.cancelled) return;
      if (s.i >= steps.length) { if (st.current === s) st.current = null; return; }
      const step = steps[s.i++];
      if (step.run) step.run();
      const base = typeof step.dur === "function" ? step.dur() : (step.dur || 0);
      const spd = speedRef && speedRef.current > 1 ? speedRef.current : 1;
      s.timer = setTimeout(next, base / spd);
    };
    s.next = next;
    next();
  }, [cancel]);
  const hurry = React.useCallback(() => {
    const s = st.current;
    if (s && !s.cancelled) { clearTimeout(s.timer); s.timer = setTimeout(s.next, 70); }
  }, []);
  const running = React.useCallback(() => !!st.current, []);
  return { run, cancel, hurry, running };
}

Object.assign(window, { CARD_AR, FACE_AR, vaRoot, vaScale, slotRect, slotRectStatic, vaSize, CardActor, EyebrowActor, SmokeFX, VASmoke, useSequencer });
