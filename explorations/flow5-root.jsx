// FLOW v5 — root App (fork of flow4-root). Desktop/texture polish pass:
// · Vignette masks are SVG data-URIs built here (edge + distortion tweakable
//   per breakpoint); the veil IMAGE gets its own opt-in distortion filter.
// · Card slot + eyebrow re-place on any relayout (sliders, breakpoint flips)
//   via a ResizeObserver on the read-card slot — the actor tracks the layout.
// · Actor→layout handoffs are same-frame swaps (no crossfade doubling).

const FLOW5_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "night", "viewport": "auto", "uiExit": "fade",
  "grainSize": 260, "grainNight": 0.18, "grainDay": 0.22, "veilNight": 0.11, "veilDay": 0.1,
  "veilEdgeMob": 63, "veilEdgeDesk": 100, "vigWarpMob": 120, "vigWarpDesk": 120, "veilWarpMob": 0, "veilWarpDesk": 0,
  "deckTop": 18, "deckW": 190, "deckWDesk": 226, "knowingSize": 22, "lensSize": 17, "lensPad": 12,
  "orbitCardVh": 51, "knowingDesk": 32, "lensFlare": false, "shoutSize": 56, "pourShift": -16, "rvCol": 620,
  "orbFloat": true, "orbAmp": 7, "orbSpeed": 1, "orbBreath": 0.014, "orbRadius": 210, "orbPull": 0.1, "orbGrow": 0.055, "orbSpread": 1,
  "centerY": 47, "bleedWarp": 140, "dUiExit": 620, "lensStep": 140, "ffSpeed": 4, "settleScale": 1.08, "flipScale": 1.1,
  "tlDraw": { "pull": { "s": 0, "d": 480 }, "lift": { "s": 480, "d": 520 }, "flip": { "s": 515, "d": 1020 }, "settle": { "s": 1495, "d": 685 }, "bleed": { "s": 960, "d": 7855 }, "rest": { "s": 3115, "d": 1775 }, "voice": { "s": 3390, "d": 1160 }, "lenses": { "s": 5115, "d": 920 } },
  "tlChoice": { "choose": { "s": 0, "d": 450 }, "slide": { "s": 295, "d": 1085 }, "bottle": { "s": 1275, "d": 1040 }, "echo": { "s": 1135, "d": 1040 }, "pour": { "s": 1555, "d": 640 }, "glow": { "s": 1555, "d": 640 } },
  "tlReturn": { "release": { "s": 0, "d": 575 }, "reform": { "s": 575, "d": 1300 } },
  "easePull": { "p": "silk" }, "easeLift": { "p": "silk" }, "easeFlip": { "p": "swift" },
  "easeSettle": { "p": "supple" }, "easeRest": { "p": "swift" }, "easeSlide": { "p": "silk" },
  "easeRelease": { "p": "gentle" }, "easeReform": { "p": "supple" },
  "easeBleed": { "p": "custom", "t": 50, "f": 12, "m": 1 }, "easeVoice": { "p": "gentle" }, "easeLens": { "p": "silk" },
  "easeEcho": { "p": "silk" }, "easeBottle": { "p": "silk" }, "easePour": { "p": "silk" }, "easeGlow": { "p": "fade" }, "easeUiExit": { "p": "gentle" }
}/*EDITMODE-END*/;

const BEATS_DRAW = [
  { key: "pull", label: "Pull", ease: "easePull" },
  { key: "lift", label: "Lift", ease: "easeLift" },
  { key: "flip", label: "Flip", ease: "easeFlip" },
  { key: "settle", label: "Settle", ease: "easeSettle" },
  { key: "bleed", label: "Veil bleed", ease: "easeBleed" },
  { key: "rest", label: "Rest glide", ease: "easeRest" },
  { key: "voice", label: "Voice", ease: "easeVoice" },
  { key: "lenses", label: "Lenses", ease: "easeLens" },
];
const BEATS_CHOICE = [
  { key: "choose", label: "Lenses out", note: "fade-out · rides the Lenses curve (see The Draw)" },
  { key: "slide", label: "Card slide", ease: "easeSlide" },
  { key: "bottle", label: "Bottle", ease: "easeBottle" },
  { key: "echo", label: "Echo", ease: "easeEcho" },
  { key: "pour", label: "Pour", ease: "easePour" },
  { key: "glow", label: "Glow", ease: "easeGlow" },
];
const BEATS_RETURN = [
  { key: "release", label: "Release", ease: "easeRelease" },
  { key: "reform", label: "Reform", ease: "easeReform" },
];

// ---------- vignette mask builder ----------
// White-alpha SVG: gradient ellipses, optionally edge-warped by turbulence.
// Because the warp lives INSIDE the mask image, it distorts only the fade
// boundary — never the veil photograph behind it.
function vigMaskCss(w, h, bf, warp, shapes) {
  let defs = "", body = "";
  shapes.forEach((s, i) => {
    const stops = s.stops.map((st) => "<stop offset='" + st[0] + "' stop-color='#fff' stop-opacity='" + st[1] + "'/>").join("");
    defs += "<radialGradient id='g" + i + "'>" + stops + "</radialGradient>";
    body += "<ellipse cx='" + s.cx + "' cy='" + s.cy + "' rx='" + s.rx + "' ry='" + s.ry + "' fill='url(#g" + i + ")'/>";
  });
  if (warp > 0) {
    defs += "<filter id='w' x='-25%' y='-25%' width='150%' height='150%'>" +
      "<feTurbulence type='fractalNoise' baseFrequency='" + bf + "' numOctaves='3' seed='7' result='n'/>" +
      "<feDisplacementMap in='SourceGraphic' in2='n' scale='" + warp + "' xChannelSelector='R' yChannelSelector='G'/></filter>";
    body = "<g filter='url(#w)'>" + body + "</g>";
  }
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " " + h + "' preserveAspectRatio='none'>" + defs + body + "</svg>";
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}
// mobile: round10 recipe, on the oversized img
function vigMaskMob(edgePct, warp) {
  const edge = Math.max(0.55, edgePct / 100);
  return vigMaskCss(1000, 1000, 0.011, warp, [
    { cx: 500, cy: 500, rx: 500, ry: 500, stops: [[0.14, 1], [0.5, 0.6], [edge, 0]] },
    { cx: 260, cy: 320, rx: 220, ry: 180, stops: [[0, 1], [0.7, 0]] },
    { cx: 760, cy: 660, rx: 240, ry: 200, stops: [[0, 1], [0.7, 0]] },
  ]);
}
// desktop: viewport-scale recipe, on .rx-veil itself
function vigMaskDesk(edgePct, warp) {
  const edge = Math.max(0.55, edgePct / 100);
  return vigMaskCss(1000, 700, 0.012, warp, [
    { cx: 500, cy: 350, rx: 580, ry: 392, stops: [[0.24, 1], [0.58, 0.62], [edge, 0]] },
    { cx: 280, cy: 210, rx: 260, ry: 154, stops: [[0, 1], [0.72, 0]] },
    { cx: 730, cy: 469, rx: 260, ry: 154, stops: [[0, 1], [0.72, 0]] },
  ]);
}
// the bleed blob — grows via mask-size; its edge carries the Bleed-warp
// turbulence PLUS a share of the vignette's edge distortion, so the growing
// boundary reads like the same treated edge the resting vignette has
function bleedMask(warp, vig) {
  return vigMaskCss(1000, 1000, 0.009, Math.round(warp * 0.3 + (vig || 0) * 0.6), [
    { cx: 500, cy: 500, rx: 460, ry: 500, stops: [[0.58, 1], [0.78, 0.78], [0.97, 0]] },
  ]);
}

// exportTokens — snapshot the live tweak state as design-tokens.json.
// Copies pretty JSON to the clipboard AND downloads the file; drop it at the
// repo root to make the current look/motion the committed production values.
function exportTokens(t) {
  const out = {};
  Object.keys(FLOW5_DEFAULTS).forEach((k) => { out[k] = t[k]; });
  const json = JSON.stringify(out, null, 2) + "\n";
  try { navigator.clipboard.writeText(json); } catch (e) {}
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a.download = "design-tokens.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// Running inside a parent frame (the Claude design canvas embeds this app in an
// iframe and drives the panel over postMessage). True => keep the panel wired
// up exactly as before so design sessions are unaffected.
function isEmbedded() {
  try { return !!(window.parent && window.parent !== window); } catch (e) { return true; }
}

// The design tweak panel ships hidden on the standalone (deployed) site. Unlock
// it by appending ?studio to the URL — the choice is remembered for this browser
// (localStorage), so you only do it once. ?studio=off re-hides it, and
// Ctrl+Shift+E toggles it in-page. There is no button or hint anywhere, so a
// visitor who doesn't know the trick can't find it. Inside the design canvas the
// panel stays available as always.
function readStudioUnlock() {
  try {
    if (isEmbedded()) return true;
    const q = new URLSearchParams(window.location.search);
    if (q.has("studio")) {
      const v = (q.get("studio") || "").toLowerCase();
      const on = v !== "off" && v !== "0" && v !== "false";
      try { on ? localStorage.setItem("va-studio", "1") : localStorage.removeItem("va-studio"); } catch (e) {}
      return on;
    }
    return localStorage.getItem("va-studio") === "1";
  } catch (e) { return false; }
}

function App() {
  // Token layering: design-tokens.json (fetched at boot) is the portable base;
  // the EDITMODE block is the live layer the sliders persist into, so it wins
  // here. In production only the tokens file exists — same shape, one layer.
  const [t, setTweak] = useTweaks({ ...(window.__vaTokens || {}), ...FLOW5_DEFAULTS });
  const tRef = React.useRef(t); tRef.current = t;
  // Voice is its own beat, not a side-effect of phase order: the tlDraw "voice"
  // event sets this flag, so dragging Rest glide / Veil bleed around can never
  // double-fire the fade.
  const [voiceOn, setVoiceOn] = React.useState(false);
  // Same treatment for every other gated layer: each beat OWNS its flag, set by
  // its own clock event — beats can be reordered freely without flicker.
  const [veilOn, setVeilOn] = React.useState(false);
  const [lensesOn, setLensesOn] = React.useState(false);
  const [echoOn, setEchoOn] = React.useState(false);
  const [pourOn, setPourOn] = React.useState(false);
  const [glowOn, setGlowOn] = React.useState(false);
  const [bottleOn, setBottleOn] = React.useState(false);
  const [handoffOn, setHandoffOn] = React.useState(false);
  // releasing drives the p-release class independently of the phase variable,
  // so the sink fade can never be cut short (or skipped) by reform — or by a
  // still-running Choice clock overwriting the phase.
  const [releasing, setReleasing] = React.useState(false);
  // Light/dark follows the device's prefers-color-scheme LIVE — it flips the
  // instant the OS theme changes, no reload. The secret panel's "Day field"
  // toggle sets a persisted manual override that wins until "Follow device".
  const [autoMode, setAutoMode] = React.useState(
    () => (!window.matchMedia || window.matchMedia("(prefers-color-scheme: dark)").matches) ? "night" : "day");
  const [modeManual, setModeManual] = React.useState(() => {
    try { return localStorage.getItem("va-mode-manual") === "1"; } catch (e) { return false; }
  });
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setAutoMode(mq.matches ? "night" : "day");
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);
  const setManualMode = (v) => {
    try { localStorage.setItem("va-mode-manual", "1"); } catch (e) {}
    setModeManual(true); setTweak("mode", v ? "day" : "night");
  };
  const followDevice = () => {
    try { localStorage.removeItem("va-mode-manual"); } catch (e) {}
    setModeManual(false);
  };
  const light = (modeManual ? t.mode : autoMode) === "day";

  // Secret studio unlock: ?studio in the URL (persists per-browser), ?studio=off
  // to re-hide, or Ctrl+Shift+E to toggle. Hidden with no visible affordance.
  // Embedded (design canvas) => the host opens the panel, so don't force it.
  const embedded = isEmbedded();
  const [studio, setStudio] = React.useState(readStudioUnlock);
  const lockStudio = () => {
    try { localStorage.removeItem("va-studio"); } catch (e) {}
    setStudio(false);
  };
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        setStudio((s) => {
          const n = !s;
          try { n ? localStorage.setItem("va-studio", "1") : localStorage.removeItem("va-studio"); } catch (x) {}
          return n;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const desktopMQ = useDesktopMQ();
  const phoneFrame = t.viewport === "phone" && desktopMQ;
  const desktop = t.viewport === "auto" && desktopMQ;

  const [phase, setPhase] = React.useState("approach");
  const phaseRef = React.useRef("approach"); phaseRef.current = phase;
  const [mounts, setMounts] = React.useState({ approach: true, reading: false, reveal: false });
  const [card, setCard] = React.useState(null);
  const cardRef = React.useRef(null); cardRef.current = card;
  const [lens, setLens] = React.useState(null);
  const [picked, setPicked] = React.useState(null);
  const [invite, setInvite] = React.useState(() => pickInvitation());
  const [whisper, setWhisper] = React.useState("");
  const [whispered, setWhispered] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [actor, setActor] = React.useState(null);
  const [eyeb, setEyeb] = React.useState(null);
  const [ff, setFF] = React.useState(false);
  const ffRef = React.useRef(1);
  const [vaH, setVaH] = React.useState(800);
  const [vaW, setVaW] = React.useState(400);
  const [shellScale, setShellScale] = React.useState(1);
  const [fontsTick, setFontsTick] = React.useState(0);
  const vaRef = React.useRef(null);
  const faceARRef = React.useRef(FACE_AR);
  const toastTimer = React.useRef(null);
  const clock = useMotionClock();

  const spd = ff ? t.ffSpeed : 1;
  const dv = (ms) => ms / (ffRef.current > 1 ? ffRef.current : 1); // css-side dur at move time
  const E = (k) => easeCss(tRef.current[k]);

  const vigMob = React.useMemo(() => vigMaskMob(t.veilEdgeMob, t.vigWarpMob), [t.veilEdgeMob, t.vigWarpMob]);
  const vigDesk = React.useMemo(() => vigMaskDesk(t.veilEdgeDesk, t.vigWarpDesk), [t.veilEdgeDesk, t.vigWarpDesk]);
  const bleedMaskUrl = React.useMemo(
    () => bleedMask(t.bleedWarp, desktop ? t.vigWarpDesk : t.vigWarpMob),
    [t.bleedWarp, desktop, t.vigWarpDesk, t.vigWarpMob]);
  // Honest bleed endpoint: the blob's fully-opaque core reaches the farthest
  // viewport corner EXACTLY at the end of the Veil-bleed duration — so the
  // number on the timeline is the time it takes to reach the edge.
  const bleedEnd = React.useMemo(() => {
    const w = vaW || 400, h = vaH || 800;
    const dx = 0.5 * w, dy = 0.52 * h; // farthest corner from the blob origin (50%, 52%)
    // core (opacity-1) radii at mask-size S: 0.58 × (0.46·S·w, 0.50·S·h)
    const S = Math.sqrt(Math.pow(dx / (0.58 * 0.46 * w), 2) + Math.pow(dy / (0.58 * 0.50 * h), 2));
    return Math.ceil(S * 100 + 4) + "%";
  }, [vaW, vaH]);
  const imgWarp = desktop ? t.veilWarpDesk : t.veilWarpMob;

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  // ---------- actor placement ----------
  const placeOnDeck = (instant, lift) => {
    const r = slotRectStatic("deck-top"); if (!r) return;
    setActor({ left: r.left, top: r.top - (lift ? 6 : 0), width: r.width, ar: CARD_AR, rot: 0, flip: 0, o: 1,
      dur: 250, ease: "ease", radius: 14, shadow: "sh-deck", instant: !!instant });
  };
  const placeOnReadSlot = (instant) => {
    const r = slotRect("read-card"); if (!r) return;
    setActor((a) => ({ ...(a || {}), left: r.left, top: r.top, width: r.width, ar: r.height / r.width, rot: 0, flip: 180, o: 1,
      dur: 250, ease: "ease", radius: 9, shadow: "sh-rest", instant: !!instant }));
  };
  const placeEyebrowOnRead = (instant) => {
    const r = slotRect("eyeb-read"); if (!r) return;
    setEyeb((e) => e && ({ ...e, left: r.left, top: r.top, mode: "read", instant: !!instant }));
  };

  React.useLayoutEffect(() => {
    const el = vaRef.current; if (!el) return;
    const ro = new ResizeObserver(() => { setVaH(el.offsetHeight); setVaW(el.offsetWidth); });
    ro.observe(el);
    setVaH(el.offsetHeight); setVaW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    let alive = true;
    const bump = () => { if (alive) setFontsTick((n) => n + 1); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(bump);
    window.addEventListener("load", bump);
    return () => { alive = false; window.removeEventListener("load", bump); };
  }, []);

  React.useEffect(() => {
    if (!phoneFrame) { setShellScale(1); return; }
    const calc = () => {
      const el = vaRef.current; const shell = el ? el.parentElement : null;
      const w = shell ? shell.clientWidth : window.innerWidth;
      const h = shell ? shell.clientHeight : window.innerHeight;
      setShellScale(Math.max(0.3, Math.min((h - 46) / 852, (w - 40) / 393)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [phoneFrame]);

  // settle-phase re-place: any relayout (viewport, frame, tweak sliders) moves
  // BOTH the card actor and the eyebrow actor to their current slots.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const p = phaseRef.current;
      if (p === "approach") placeOnDeck(true);
      if (p === "reading") { placeOnReadSlot(true); placeEyebrowOnRead(true); }
    });
    return () => cancelAnimationFrame(id);
  }, [phase, vaH, phoneFrame, desktop, shellScale, fontsTick,
    t.deckW, t.deckWDesk, t.deckTop, t.orbitCardVh, t.knowingSize, t.lensSize, t.lensPad, t.knowingDesk, t.orbSpread]);

  React.useEffect(() => {
    const el = vaRoot() && vaRoot().querySelector('[data-va-slot="deck-top"]');
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (phaseRef.current === "approach") placeOnDeck(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // live tracking: the read-card slot is flex-sized on mobile — when text
  // tweaks (voice/lens size, padding) reflow the column, the slot resizes and
  // the actor follows. Also fires on breakpoint flips (slot element swaps).
  React.useEffect(() => {
    if (!mounts.reading) return;
    const va = vaRoot(); if (!va) return;
    const el = va.querySelector('[data-va-slot="read-card"]'); if (!el) return;
    const sync = () => {
      if (phaseRef.current !== "reading") return;
      placeOnReadSlot(true); placeEyebrowOnRead(true);
    };
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounts.reading, desktop]);

  // warm the whole deck's card faces in the background so a draw never
  // catches an unloaded image mid-flip (card tier only — ~400KB each)
  React.useEffect(() => {
    const ids = (window.ARCANA_ORDER || []).slice(); let i = 0;
    let cancelled = false;
    const next = () => {
      if (cancelled || i >= ids.length) return;
      const im = new Image();
      im.onload = im.onerror = () => setTimeout(next, 40);
      im.src = "assets/cards/" + ARCANA[ids[i++]].file + ".webp";
    };
    const t0 = setTimeout(next, 1200);
    return () => { cancelled = true; clearTimeout(t0); };
  }, []);

  const onDeckHover = (h) => { if (phaseRef.current === "approach") placeOnDeck(false, h); };

  // ---------- sequences ----------
  const smokeUi = () => {
    const va = vaRoot(); if (!va || !VASmoke.burst) return;
    const v = va.getBoundingClientRect();
    const rects = [...va.querySelectorAll("[data-va-fx]")].map((el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left - v.left, top: r.top - v.top, width: r.width, height: r.height };
    });
    VASmoke.burst(rects);
  };

  const runDraw = (forcedId) => {
    if (phaseRef.current !== "approach") return;
    const id = forcedId || pickCard();
    setCard(id);
    setReleasing(false);
    setVoiceOn(false); setVeilOn(false); setLensesOn(false);
    setEchoOn(false); setPourOn(false); setGlowOn(false); setBottleOn(false); setHandoffOn(false);
    setWhispered(whisper.trim().length > 0);
    const c = ARCANA[id];
    // decode BOTH tiers before they're needed: the full-res background veil
    // decoding mid-flip is a guaranteed dropped frame on its mount beat
    const pre = new Image(); pre.src = "assets/cards/" + c.file + ".webp";
    pre.onload = () => { if (pre.naturalWidth) faceARRef.current = pre.naturalHeight / pre.naturalWidth; };
    if (pre.decode) pre.decode().catch(() => {});
    const preBg = new Image(); preBg.src = "assets/cards/" + c.file + "-bg.webp";
    if (preBg.decode) preBg.decode().catch(() => {});
    if (tRef.current.uiExit === "smoke") smokeUi();

    const T = tRef.current, TL = T.tlDraw;
    const ev = [];
    ev.push({ t: TL.pull.s, run: () => { setPhase("pull");
      const r = slotRect("deck-top");
      if (r) setActor((a) => ({ ...a, top: r.top + r.height * 0.5, rot: -3, dur: dv(TL.pull.d), ease: E("easePull"), shadow: "sh-air", instant: false }));
    } });
    ev.push({ t: TL.lift.s, run: () => { setPhase("lift"); setMounts((m) => (m.reading ? m : { ...m, reading: true }));
      const S = vaSize(); const w = Math.min(S.w * 0.62, 300); const ar = faceARRef.current;
      const cy = S.h * (tRef.current.centerY / 100);
      setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
        dur: dv(TL.lift.d), ease: E("easeLift"), instant: false }));
    } });
    ev.push({ t: TL.flip.s, run: () => {
      const fs = tRef.current.flipScale || 1;
      setActor((a) => {
        const next = { ...a, flip: 180, flipDur: dv(TL.flip.d), flipEase: E("easeFlip"), instant: false };
        if (fs !== 1 && a.width) {
          // swell around the card's centre while it turns; Settle re-targets after
          const w2 = a.width * fs, ar = a.ar || faceARRef.current;
          next.left = a.left - (w2 - a.width) / 2;
          next.top = a.top - ((w2 - a.width) * ar) / 2;
          next.width = w2;
          next.dur = dv(TL.flip.d); next.ease = E("easeFlip");
        }
        return next;
      });
    } });
    ev.push({ t: TL.flip.s + TL.flip.d * 0.55, run: () => { if (phaseRef.current === "lift") setPhase("drop"); } });
    ev.push({ t: TL.settle.s, run: () => { setPhase("settle"); setMounts((m) => (m.reading ? m : { ...m, reading: true }));
      const S = vaSize(); const r = slotRect("read-card");
      const ar = r ? r.height / r.width : faceARRef.current;
      const w = r ? Math.min(r.width * (tRef.current.settleScale || 1.16), S.w * 0.58) : S.w * 0.5;
      const cy = S.h * (tRef.current.centerY / 100);
      setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
        dur: dv(TL.settle.d), ease: E("easeSettle"), shadow: "sh-rest", radius: 9, instant: false }));
    } });
    ev.push({ t: TL.bleed.s, run: () => { setPhase("bleed"); setVeilOn(true);
      // the reading mount may not have committed yet when beats collapse into
      // one clock tick — retry the slot measurement across frames
      const place = (tries) => {
        const r = slotRect("eyeb-read");
        if (!r) { if (tries > 0) requestAnimationFrame(() => place(tries - 1)); return; }
        setEyeb({ left: r.left, top: r.top, fs: 9.5, ls: 0.3, o: 0, dur: 0, rules: true, lensOn: false, mode: "read", instant: true });
        requestAnimationFrame(() => requestAnimationFrame(() =>
          setEyeb((e) => e && ({ ...e, o: 1, dur: 650, oDur: 650, instant: false }))));
      };
      place(30);
    } });
    ev.push({ t: TL.rest.s, run: () => { setPhase("rest");
      const r = slotRect("read-card");
      if (r) setActor((a) => ({ ...a, left: r.left, top: r.top, width: r.width, ar: r.height / r.width,
        dur: dv(TL.rest.d), ease: E("easeRest"), instant: false }));
    } });
    ev.push({ t: TL.voice.s, run: () => { setPhase("voice"); setVoiceOn(true); } });
    ev.push({ t: TL.lenses.s, run: () => { setPhase("lenses"); setLensesOn(true); } });
    // end = when every gating beat has finished (the bleed keeps burning past it)
    const end = Math.max(
      TL.pull.s + TL.pull.d, TL.lift.s + TL.lift.d, TL.flip.s + TL.flip.d,
      TL.settle.s + TL.settle.d, TL.rest.s + TL.rest.d, TL.voice.s + TL.voice.d,
      TL.lenses.s + TL.lenses.d + T.lensStep * 5);
    clock.run(ev, end, ffRef, () => { setPhase("reading"); ffRef.current = 1; setFF(false); });
  };

  const pick = (l) => {
    if (phaseRef.current !== "reading") return;
    setLens(l); setPicked(l.n);
    const TL = tRef.current.tlChoice;
    const ev = [];
    ev.push({ t: TL.choose.s, run: () => { setPhase("choose"); setVoiceOn(false); setLensesOn(false); setMounts((m) => ({ ...m, reveal: true })); } });
    ev.push({ t: TL.slide.s, run: () => { setPhase("slide");
      const r = slotRect("reveal-card");
      if (r) setActor((a) => ({ ...a, left: r.left, top: r.top, width: r.width, ar: r.height / r.width, rot: -4,
        dur: dv(TL.slide.d), ease: E("easeSlide"), shadow: "sh-rev", radius: 8, instant: false }));
      const er = slotRect("eyeb-rev");
      if (er) setEyeb((e) => e && ({ ...e, left: er.left, top: er.top, fs: 9, ls: 0.28, rules: false, mode: "rev", dur: dv(TL.slide.d), instant: false }));
    } });
    // echo: the pane's own fades (headline · bottle · name) ride this beat —
    // but the actor→pane card handoff must wait for the slide to finish, or an
    // echo dragged earlier than the slide teleports the card (visible flash).
    ev.push({ t: TL.echo.s, run: () => { setPhase("echo"); setEchoOn(true); setEyeb((e) => e && ({ ...e, lensOn: true })); } });
    ev.push({ t: Math.max(TL.echo.s, TL.slide.s + TL.slide.d), run: () => {
      setMounts((m) => ({ ...m, reading: false })); setHandoffOn(true);
      setActor((a) => a && ({ ...a, o: 0, oDur: 0, instant: false }));
    } });
    ev.push({ t: TL.bottle.s, run: () => setBottleOn(true) });
    ev.push({ t: TL.pour.s, run: () => { setPhase("pour"); setPourOn(true); } });
    ev.push({ t: TL.glow.s, run: () => setGlowOn(true) });
    const end = Math.max(TL.choose.s + TL.choose.d, TL.slide.s + TL.slide.d,
      TL.echo.s + TL.echo.d, TL.pour.s + TL.pour.d + 460, TL.glow.s + TL.glow.d,
      TL.bottle.s + TL.bottle.d);
    clock.run(ev, end, ffRef, () => { setPhase("reveal"); ffRef.current = 1; setFF(false);
      // same-frame handoff: real eyebrow becomes visible as the actor cuts out
      setEyeb((e) => e && ({ ...e, o: 0, oDur: 0 }));
    });
  };

  const release = (pour, kept) => {
    const from = phaseRef.current;
    if (from === "approach" || from === "release" || from === "reform") return;
    // a Choice clock may still be running (fade tapped mid-transition) — its
    // end callback would setPhase("reveal") OVER our release. Kill it first.
    clock.cancel();
    if (pour) savePull({ ts: Date.now(), card: cardRef.current, lens: lens ? lens.name : null, wine: pour.wine, kept });
    if (kept && pour) showToast("KEPT · " + pour.wine.toUpperCase());
    const TL = tRef.current.tlReturn;
    const ev = [];
    ev.push({ t: TL.release.s, run: () => { setPhase("release"); setReleasing(true); setVeilOn(false);
      setGlowOn(false); // state-driven exit — the fade must not depend on cascade order
      setActor((a) => a && ({ ...a, o: 0, top: a.top + 36, dur: dv(TL.release.d), oDur: dv(TL.release.d), ease: E("easeRelease"), instant: false }));
      setEyeb((e) => e && ({ ...e, o: 0, dur: dv(TL.release.d), oDur: dv(TL.release.d), instant: false }));
    } });
    // unmount only after the sink fade has fully painted — even if the Reform
    // beat is dragged earlier than the Release beat's end
    ev.push({ t: Math.max(TL.reform.s, TL.release.s + TL.release.d), run: () => {
      setReleasing(false);
      setMounts((m) => ({ ...m, reading: false, reveal: false }));
      setVoiceOn(false); setVeilOn(false); setLensesOn(false);
      setEchoOn(false); setPourOn(false); setGlowOn(false); setBottleOn(false); setHandoffOn(false);
      setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
    } });
    ev.push({ t: TL.reform.s, run: () => { setPhase("reform"); ffRef.current = 1; setFF(false);
      setInvite(pickInvitation());
      const delay = Math.round(TL.reform.d * 0.3), drop = Math.round(TL.reform.d * 0.4);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const r = slotRectStatic("deck-top"); if (!r) return;
        setActor({ left: r.left, top: r.top - 42, width: r.width, ar: CARD_AR, rot: 0, flip: 0, o: 0, dur: 0, radius: 14, shadow: "sh-deck", instant: true });
        setTimeout(() => setActor((a) => a && ({ ...a, top: r.top, o: 1, dur: dv(drop), oDur: dv(Math.round(drop * 0.8)), ease: E("easeReform"), instant: false })), dv(delay));
      }));
    } });
    const end = Math.max(TL.release.s + TL.release.d, TL.reform.s + TL.reform.d);
    clock.run(ev, end, ffRef, () => { setReleasing(false); setPhase("approach"); });
  };

  const home = () => { if (phaseRef.current !== "approach") release(null, false); };

  const replay = () => {
    const p = phaseRef.current;
    if (!cardRef.current || p === "approach" || p === "reform") { showToast("PULL A CARD FIRST"); return; }
    const id = cardRef.current;
    clock.cancel();
    setReleasing(false);
    setPhase("approach"); setMounts({ approach: true, reading: false, reveal: false });
    setLens(null); setPicked(null); setEyeb(null); setCard(id);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      placeOnDeck(true);
      setTimeout(() => runDraw(id), 380);
    }));
  };

  const hurry = () => { ffRef.current = tRef.current.ffSpeed; setFF(true); };

  // scripted-walkthrough hook (screenshots / QA) — not user-facing
  window.__vaDrive = {
    draw: (id) => runDraw(id),
    pick: (i) => { const c = ARCANA[cardRef.current]; if (c && c.lenses[i]) pick(c.lenses[i]); },
    release: () => release(null, false),
    hurry, phase: () => phaseRef.current,
  };

  // ---------- flags ----------
  const F = {
    phase,
    canDraw: phase === "approach",
    approachUiIn: phase === "approach" || phase === "reform",
    approachShown: ["approach", "pull", "lift", "drop", "reform"].includes(phase),
    deckIn: ["approach", "pull", "lift", "reform"].includes(phase),
    veilIn: veilOn,
    voiceIn: voiceOn,
    lensesIn: lensesOn,
    footIn: lensesOn,
    choosing: ["choose", "slide", "echo", "pour", "reveal"].includes(phase),
    echoIn: echoOn,
    pourIn: pourOn,
    glowIn: glowOn,
    bottleIn: bottleOn,
    cardHandoff: handoffOn,
    handoff: phase === "reveal",
    picked,
  };
  const transitional = !["approach", "reading", "reveal"].includes(phase);

  // ---------- css vars ----------
  const ms = (x) => Math.round(x / spd) + "ms";
  const vars = {
    "--va-grain-size": t.grainSize + "px",
    "--va-grain-o-dark": t.grainNight, "--va-grain-o-light": t.grainDay,
    "--va-veil-o-dark": t.veilNight, "--va-veil-o-light": t.veilDay,
    "--va-vig-mob": vigMob, "--va-vig-desk": vigDesk, "--va-bleed-mask": bleedMaskUrl,
    "--va-deck-top": t.deckTop / 100,
    "--va-deck-w": t.deckW + "px", "--va-deck-w-desk": t.deckWDesk + "px",
    "--va-knowing-size": t.knowingSize + "px", "--va-lens-size": t.lensSize + "px", "--va-lens-pad": t.lensPad + "px",
    "--va-orbit-vh": t.orbitCardVh / 100, "--va-knowing-desk": t.knowingDesk + "px", "--va-shout": t.shoutSize + "px",
    "--rv-col": t.rvCol + "px",
    "--vaH": vaH + "px",
    "--dUiExit": ms(t.dUiExit), "--dLift": ms(t.tlDraw.flip.d), "--dBleed": ms(t.tlDraw.bleed.d),
    "--dVoice": ms(t.tlDraw.voice.d), "--lensDur": ms(t.tlDraw.lenses.d),
    "--dChoose": ms(t.tlChoice.choose.d), "--dEcho": ms(t.tlChoice.echo.d), "--dPour": ms(t.tlChoice.pour.d),
    "--dGlow": ms(t.tlChoice.glow.d), "--dBottle": ms(t.tlChoice.bottle.d),
    "--dRelease": ms(t.tlReturn.release.d),
    "--va-bleed-end": bleedEnd,
    "--rv-shift": t.pourShift + "px",
    "--eBleed": easeCss(t.easeBleed), "--eVoice": easeCss(t.easeVoice), "--eLens": easeCss(t.easeLens),
    "--eEcho": easeCss(t.easeEcho), "--ePour": easeCss(t.easePour), "--eGlow": easeCss(t.easeGlow), "--eBottle": easeCss(t.easeBottle),
    "--eUiExit": easeCss(t.easeUiExit), "--eRelease": easeCss(t.easeRelease),
  };

  const orbitTuning = {
    on: t.orbFloat, amp: t.orbAmp, speed: t.orbSpeed, breath: t.orbBreath,
    radius: t.orbRadius, pull: t.orbPull, grow: t.orbGrow, spread: t.orbSpread,
  };

  const c = card ? ARCANA[card] : null;
  const face = c ? "assets/cards/" + c.file + ".webp" : null;
  const faceBg = c ? "assets/cards/" + c.file + "-bg.webp" : null;
  const vaCls = "va p-" + phase + (releasing ? " p-release" : "") +
    (desktop ? " vw-desk" : "") + (phoneFrame ? " vw-phone" : "") +
    (imgWarp > 0 ? " imgwarp" : "") +
    (!F.deckIn ? " deck-off" : "") +
    (t.uiExit === "smoke" && !F.approachUiIn ? " ui-smoke" : "") +
    (vaH < 640 ? " vh-short" : "") + (vaH >= 760 ? " vh-tall" : "");

  return (
    <div className="va-shell">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="va-bleed-warp" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="4" seed="7" result="n"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale={t.bleedWarp} xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
        </filter>
        <filter id="va-img-warp" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="4" seed="11" result="n2"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n2" scale={imgWarp} xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
        </filter>
      </svg>
      <div className={vaCls} style={phoneFrame ? { ...vars, width: "393px", height: "852px", flex: "none", transform: "scale(" + shellScale + ")" } : vars} ref={vaRef}>
        <div className={"rx " + (light ? "rx-light" : "rx-dark")}>
          {c ? (
            <div className={"va-veilwrap" + (F.veilIn ? " in" : "")}><div className="rx-veil"><img src={faceBg} alt="" decoding="async" /></div></div>
          ) : null}
          <div className="rx-grain"></div>
          {F.echoIn || phase === "release" ? <div className={"rv-glow" + (F.glowIn ? " on" : "")}></div> : null}

          {mounts.approach ? (
            <Approach light={light} invite={invite} whisper={whisper} setWhisper={setWhisper}
              onDraw={() => runDraw()} onDeckHover={onDeckHover} F={F} spd={spd}></Approach>
          ) : null}
          {mounts.reading && card ? (
            <Reading card={card} light={light} whispered={whispered} flare={t.lensFlare}
              desktop={desktop} F={F} onPick={pick} lensStep={t.lensStep} spd={spd} orbit={orbitTuning}></Reading>
          ) : null}
          {mounts.reveal && card && lens ? (
            <Reveal card={card} lens={lens} light={light} F={F} spd={spd}
              onKeep={(p) => release(p, true)} onFade={(p) => release(p, false)}></Reveal>
          ) : null}

          <CardActor a={actor} face={face}></CardActor>
          {c ? <EyebrowActor e={eyeb} num={c.num} name={c.name} lens={lens ? lens.name : ""}></EyebrowActor> : null}
          <SmokeFX light={light}></SmokeFX>

          <StatusBar light={light} onHome={home} onToast={showToast}></StatusBar>
          {toast ? <div className={"va-toast" + (light ? " light" : "")}>{toast}</div> : null}
        </div>
      </div>
      {phoneFrame ? <div className="va-frame-tag">393 × 852 · phone frame</div> : null}

      {studio ? <FlowPanel t={t} setTweak={setTweak} replay={replay}
        light={light} manual={modeManual} onMode={setManualMode} onFollowDevice={followDevice}
        forceOpen={!embedded} onClose={lockStudio}></FlowPanel> : null}
    </div>
  );
}

// ---------- the panel ----------
function FlowPanel({ t, setTweak, replay, light, manual, onMode, onFollowDevice, forceOpen, onClose }) {
  const [tab, setTab] = usePanelPref("tab", "Design");
  return (
    <TweaksPanel forceOpen={forceOpen} onDismiss={onClose}>
      <Flow3PanelStyle></Flow3PanelStyle>
      <TweakButton label="Export design-tokens.json" onClick={() => exportTokens(t)}></TweakButton>
      <TweakToggle label={"Day field" + (manual ? "" : " · auto")} value={light} onChange={onMode}></TweakToggle>
      {manual ? <TweakButton label="Follow device theme" onClick={onFollowDevice}></TweakButton> : null}
      <TweakToggle label="Phone frame" value={t.viewport === "phone"} onChange={(v) => setTweak("viewport", v ? "phone" : "auto")}></TweakToggle>
      <TweakTabs tabs={["Design", "Motion"]} value={tab} onChange={setTab}></TweakTabs>

      {tab === "Design" ? (
        <React.Fragment>
          <TweakFold key="d-texture" id="d-texture" label="Texture" hint="grain · veil · vignette">
            <TweakSlider label="Grain scale" value={t.grainSize} min={120} max={600} step={10} unit="px" onChange={(v) => setTweak("grainSize", v)}></TweakSlider>
            <TweakSlider label="Grain · night" value={t.grainNight} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainNight", v)}></TweakSlider>
            <TweakSlider label="Grain · day" value={t.grainDay} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainDay", v)}></TweakSlider>
            <TweakSlider label="Veil · night" value={t.veilNight} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilNight", v)}></TweakSlider>
            <TweakSlider label="Veil · day" value={t.veilDay} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilDay", v)}></TweakSlider>
            <TweakSection label="Vignette"></TweakSection>
            <TweakSlider label="Edge · mobile" value={t.veilEdgeMob} min={60} max={100} step={1} unit="%" onChange={(v) => setTweak("veilEdgeMob", v)}></TweakSlider>
            <TweakSlider label="Edge · desktop" value={t.veilEdgeDesk} min={70} max={100} step={1} unit="%" onChange={(v) => setTweak("veilEdgeDesk", v)}></TweakSlider>
            <TweakSlider label="Distortion · mobile" value={t.vigWarpMob} min={0} max={120} step={2} onChange={(v) => setTweak("vigWarpMob", v)}></TweakSlider>
            <TweakSlider label="Distortion · desktop" value={t.vigWarpDesk} min={0} max={120} step={2} onChange={(v) => setTweak("vigWarpDesk", v)}></TweakSlider>
            <TweakSection label="Veil image"></TweakSection>
            <TweakSlider label="Distortion · mobile" value={t.veilWarpMob} min={0} max={240} step={5} onChange={(v) => setTweak("veilWarpMob", v)}></TweakSlider>
            <TweakSlider label="Distortion · desktop" value={t.veilWarpDesk} min={0} max={240} step={5} onChange={(v) => setTweak("veilWarpDesk", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-approach" id="d-approach" label="The Approach" hint="deck">
            <TweakSlider label="Deck top" value={t.deckTop} min={2} max={26} step={0.5} unit="%" onChange={(v) => setTweak("deckTop", v)}></TweakSlider>
            <TweakSlider label="Deck width · mobile" value={t.deckW} min={160} max={340} step={2} unit="px" onChange={(v) => setTweak("deckW", v)}></TweakSlider>
            <TweakSlider label="Deck width · desktop" value={t.deckWDesk} min={200} max={360} step={2} unit="px" onChange={(v) => setTweak("deckWDesk", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-lenses" id="d-lenses" label="The Lenses" hint="card · lens choice">
            <TweakSection label="Mobile"></TweakSection>
            <TweakSlider label="Voice size" value={t.knowingSize} min={16} max={28} step={0.5} unit="px" onChange={(v) => setTweak("knowingSize", v)}></TweakSlider>
            <TweakSlider label="Lens size" value={t.lensSize} min={14} max={22} step={0.5} unit="px" onChange={(v) => setTweak("lensSize", v)}></TweakSlider>
            <TweakSlider label="Lens padding" value={t.lensPad} min={6} max={20} step={1} unit="px" onChange={(v) => setTweak("lensPad", v)}></TweakSlider>
            <TweakSection label="Desktop (orbit)"></TweakSection>
            <TweakSlider label="Card height" value={t.orbitCardVh} min={36} max={68} step={1} unit="vh" onChange={(v) => setTweak("orbitCardVh", v)}></TweakSlider>
            <TweakSlider label="Voice size" value={t.knowingDesk} min={18} max={32} step={0.5} unit="px" onChange={(v) => setTweak("knowingDesk", v)}></TweakSlider>
            <TweakSlider label="Orbit spread" value={t.orbSpread} min={0.7} max={1.25} step={0.01} onChange={(v) => setTweak("orbSpread", v)}></TweakSlider>
            <TweakToggle label="Anti-lens-flare" value={t.lensFlare} onChange={(v) => setTweak("lensFlare", v)}></TweakToggle>
            <TweakSection label="Orbit float"></TweakSection>
            <TweakToggle label="Float" value={t.orbFloat} onChange={(v) => setTweak("orbFloat", v)}></TweakToggle>
            <TweakSlider label="Drift" value={t.orbAmp} min={0} max={18} step={0.5} unit="px" onChange={(v) => setTweak("orbAmp", v)}></TweakSlider>
            <TweakSlider label="Drift speed" value={t.orbSpeed} min={0.3} max={2.5} step={0.05} onChange={(v) => setTweak("orbSpeed", v)}></TweakSlider>
            <TweakSlider label="Scale breath" value={t.orbBreath} min={0} max={0.04} step={0.002} onChange={(v) => setTweak("orbBreath", v)}></TweakSlider>
            <TweakSlider label="Cursor reach" value={t.orbRadius} min={0} max={420} step={10} unit="px" onChange={(v) => setTweak("orbRadius", v)}></TweakSlider>
            <TweakSlider label="Cursor pull" value={t.orbPull} min={0} max={0.3} step={0.01} onChange={(v) => setTweak("orbPull", v)}></TweakSlider>
            <TweakSlider label="Cursor grow" value={t.orbGrow} min={0} max={0.16} step={0.005} onChange={(v) => setTweak("orbGrow", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-pour" id="d-pour" label="The Pour" hint="the wine">
            <TweakSlider label="Hero from left" value={t.pourShift} min={-20} max={140} step={2} unit="px" onChange={(v) => setTweak("pourShift", v)}></TweakSlider>
            <TweakSlider label="Shout size · desktop" value={t.shoutSize} min={31} max={80} step={1} unit="px" onChange={(v) => setTweak("shoutSize", v)}></TweakSlider>
            <TweakSlider label="Column width · desktop" value={t.rvCol} min={480} max={760} step={10} unit="px" onChange={(v) => setTweak("rvCol", v)}></TweakSlider>
          </TweakFold>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TweakFold key="m-play" id="m-play" label="Playback" defaultOpen={true}>
            <TweakButton label="Replay ritual" onClick={replay}></TweakButton>
          </TweakFold>
          <TweakFold key="m-draw" id="m-draw" label="The Draw" hint="deck → lenses" defaultOpen={true}>
            <StageMotion id="draw" beats={BEATS_DRAW} tlKey="tlDraw" t={t} setTweak={setTweak} tail={t.lensStep * 5}></StageMotion>
            <TweakSection label="Draw extras"></TweakSection>
            <TweakRadio label="UI exit" value={t.uiExit} options={["fade", "smoke"]} onChange={(v) => setTweak("uiExit", v)}></TweakRadio>
            <TweakSlider label="UI exit time" value={t.dUiExit} min={200} max={1400} step={20} unit="ms" onChange={(v) => setTweak("dUiExit", v)}></TweakSlider>
            <EasePicker label="UI exit curve" value={t.easeUiExit} onChange={(v) => setTweak("easeUiExit", v)}></EasePicker>
            <TweakSlider label="Optical centre" value={t.centerY} min={35} max={60} step={0.5} unit="%" onChange={(v) => setTweak("centerY", v)}></TweakSlider>
            <TweakSlider label="Settle size ×" value={t.settleScale} min={0.9} max={1.4} step={0.01} onChange={(v) => setTweak("settleScale", v)} hint="card size at the end of Settle, × the final rest size"></TweakSlider>
            <TweakSlider label="Flip swell ×" value={t.flipScale} min={1} max={1.5} step={0.01} onChange={(v) => setTweak("flipScale", v)} hint="how much the card grows during the Flip"></TweakSlider>
            <TweakSlider label="Bleed warp" value={t.bleedWarp} min={0} max={240} step={2} onChange={(v) => setTweak("bleedWarp", v)} hint="organic edge of the veil bleed"></TweakSlider>
            <TweakSlider label="Lens stagger" value={t.lensStep} min={0} max={400} step={10} unit="ms" onChange={(v) => setTweak("lensStep", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="m-choice" id="m-choice" label="The Choice" hint="lenses → pour">
            <StageMotion id="choice" beats={BEATS_CHOICE} tlKey="tlChoice" t={t} setTweak={setTweak} tail={460}></StageMotion>
          </TweakFold>
          <TweakFold key="m-return" id="m-return" label="The Return" hint="pour → approach">
            <StageMotion id="return" beats={BEATS_RETURN} tlKey="tlReturn" t={t} setTweak={setTweak}></StageMotion>
          </TweakFold>
        </React.Fragment>
      )}
    </TweaksPanel>
  );
}

// Boot: load the canonical tokens file first, then mount. A missing or
// malformed file is fine — the EDITMODE block covers every key.
fetch("design-tokens.json")
  .then((r) => (r.ok ? r.json() : null))
  .catch(() => null)
  .then((tokens) => {
    window.__vaTokens = tokens || {};
    // drift check: the tokens file and the built-in defaults must describe the
    // same set of knobs — a mismatch means someone added/renamed a tweak
    // without re-exporting (or vice versa).
    const dk = Object.keys(FLOW5_DEFAULTS), tk = Object.keys(window.__vaTokens);
    const missing = dk.filter((k) => !tk.includes(k)), extra = tk.filter((k) => !dk.includes(k));
    if (tk.length && (missing.length || extra.length)) {
      console.warn("[design-tokens] drift — in code but not in file:", missing, "· in file but not in code:", extra,
        "— re-export via the Tweaks panel button.");
    }
    ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
  });
