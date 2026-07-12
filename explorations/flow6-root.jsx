// FLOW v6 — root App (fork of flow5-root). Adds THE DECK view:
// · DECK in the header opens a browsable grid of every card face
//   (flow6-deck.jsx / flow6.css). New phases: todeck → deck → deckfly.
// · Tapping a tile runs the tail of The Draw timeline (the card is
//   already face-up): fly → settle → bleed → voice → lenses — from
//   there the flow is the normal one (pick a lens → The Pour).
// · Exits reuse the Return machinery so everything sinks and the
//   deck reforms exactly like a release.
// Original flow5 notes:
// · Vignette masks are SVG data-URIs built here (edge + distortion tweakable
//   per breakpoint); the veil IMAGE gets its own opt-in distortion filter.
// · Card slot + eyebrow re-place on any relayout (sliders, breakpoint flips)
//   via a ResizeObserver on the read-card slot — the actor tracks the layout.
// · Actor→layout handoffs are same-frame swaps (no crossfade doubling).

const FLOW5_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "system", "viewport": "auto", "uiExit": "fade",
  "grainSize": 260, "grainNight": 0.18, "grainDay": 0.22, "veilNight": 0.11, "veilDay": 0.1,
  "veilEdgeMob": 67, "veilEdgeDesk": 100, "vigWarpMob": 120, "vigWarpDesk": 120, "veilWarpMob": 0, "veilWarpDesk": 0,
  "deckLift": 35, "deckLiftDesk": 34, "deckW": 190, "deckWDesk": 226, "knowingSize": 22, "lensSize": 17, "lensPad": 12, "cardRadius": 5.3,
  "beckonDelay": 3, "beckonColorN": "bone", "beckonColorD": "bone", "beckonAlpha": 0.9,
  "beckonDurA": 7, "beckonBandA": 100, "beckonDurL": 7, "beckonBandL": 100,
  "orbitCardVh": 51, "knowingDesk": 32, "lensFlare": false, "shoutSize": 56, "pourShift": -16, "rvCol": 620,
  "orbFloat": true, "orbAmp": 7, "orbSpeed": 1, "orbBreath": 0.014, "orbRadius": 210, "orbPull": 0.1, "orbGrow": 0.055, "orbSpread": 1,
  "centerY": 44, "bleedWarp": 140, "dUiExit": 620, "lensStep": 140, "ffSpeed": 4, "settleScale": 1.07, "flipScale": 1.1,
  "tlDraw": { "pull": { "s": 0, "d": 480 }, "lift": { "s": 480, "d": 520 }, "flip": { "s": 515, "d": 1020 }, "settle": { "s": 1495, "d": 685 }, "bleed": { "s": 1130, "d": 6555 }, "rest": { "s": 3115, "d": 1775 }, "voice": { "s": 3390, "d": 1160 }, "lenses": { "s": 5115, "d": 920 } },
  "tlChoice": { "choose": { "s": 0, "d": 450 }, "slide": { "s": 295, "d": 1085 }, "bottle": { "s": 1275, "d": 1040 }, "echo": { "s": 1135, "d": 1040 }, "pour": { "s": 1555, "d": 640 }, "glow": { "s": 1555, "d": 640 } },
  "tlReturn": { "release": { "s": 0, "d": 575 }, "reform": { "s": 575, "d": 1300 } },
  "easePull": { "p": "silk" }, "easeLift": { "p": "silk" }, "easeFlip": { "p": "swift" },
  "easeSettle": { "p": "supple" }, "easeRest": { "p": "swift" }, "easeSlide": { "p": "silk" },
  "easeRelease": { "p": "gentle" }, "easeReform": { "p": "supple" },
  "easeBleed": { "p": "custom", "t": 50, "f": 12, "m": 0.9 }, "easeVoice": { "p": "gentle" }, "easeLens": { "p": "silk" },
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
  const edge = Math.max(0.25, edgePct / 100);
  return vigMaskCss(1000, 1000, 0.011, warp, [
    { cx: 500, cy: 500, rx: 500, ry: 500, stops: [[0.14, 1], [0.5, 0.6], [edge, 0]] },
    { cx: 260, cy: 320, rx: 220, ry: 180, stops: [[0, 1], [0.7, 0]] },
    { cx: 760, cy: 660, rx: 240, ry: 200, stops: [[0, 1], [0.7, 0]] },
  ]);
}
// desktop: viewport-scale recipe, on .rx-veil itself
function vigMaskDesk(edgePct, warp) {
  const edge = Math.max(0.25, edgePct / 100);
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

// shimmer band colors — drawn from the app's own palette, as [r,g,b,a] so the
// Intensity slider can blend the band toward the resting text color (a plain
// alpha fade would punch see-through holes in clip-text lettering). Night and
// day each pick their own color; a white pass on the day field would vanish,
// so bone carries a navy rendering there.
const BECKON_COLORS = {
  apricot: { label: "Apricot", hot: [245, 170, 93, 0.95], peak: [255, 234, 203, 1], hotL: [198, 127, 65, 1], peakL: [232, 166, 98, 1] },
  bone: { label: "Bone white", hot: [239, 236, 228, 0.98], peak: [255, 255, 255, 1], hotL: [21, 34, 49, 0.9], peakL: [21, 34, 49, 1] },
  amber: { label: "Amber", hot: [198, 127, 65, 0.95], peak: [240, 197, 146, 1], hotL: [163, 90, 42, 1], peakL: [198, 127, 65, 1] },
};
const bkMix = (a, b, u) => "rgba(" + [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * u)).join(",") + "," + (a[3] + (b[3] - a[3]) * u).toFixed(3) + ")";

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
  // color field: follow the device (prefers-color-scheme) unless the studio
  // switch pinned a mode — t.mode is "system" | "night" | "day"
  const [sysLight, setSysLight] = React.useState(() =>
    !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches));
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const on = (e) => setSysLight(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", on); else mq.removeListener(on); };
  }, []);
  const light = t.mode === "day" || (t.mode === "system" && sysLight);
  // deploy gating: with no host toolbar the Tweaks panel never activates on
  // its own — ?studio is the production key. It self-sends the same protocol
  // message the design-tool toolbar sends, so both paths share one code path.
  React.useEffect(() => {
    const activate = () => window.postMessage({ type: "__activate_edit_mode" }, "*");
    let id = null;
    if (/[?&]studio\b/.test(window.location.search)) id = setTimeout(activate, 80);
    const kd = (e) => { if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) { e.preventDefault(); activate(); } };
    window.addEventListener("keydown", kd);
    return () => { if (id) clearTimeout(id); window.removeEventListener("keydown", kd); };
  }, []);
  const desktopMQ = useDesktopMQ();
  const phoneFrame = t.viewport === "phone" && desktopMQ;
  const desktop = t.viewport === "auto" && desktopMQ;
  // real-device capability check (independent of the viewport tweak / window
  // width) — a touch device with no hover is a phone/tablet even when the
  // "auto" viewport tweak renders the plain mobile layout on it. Used only to
  // pick the Deck-top offset that reads right on an actual phone's Safari
  // chrome vs. the same layout previewed in a desktop browser window.
  const isRealMobile = React.useMemo(() => (
    typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches
  ), []);
  // standalone (PWA / home-screen): no browser chrome at all — fixed
  // positioning works normally, and the deck wants the desktop-ish top
  const isStandalone = React.useMemo(() => (
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true)
  ), []);

  const [phase, setPhase] = React.useState("approach");
  const phaseRef = React.useRef("approach"); phaseRef.current = phase;
  const [mounts, setMounts] = React.useState({ approach: true, reading: false, reveal: false, deck: false, memory: false });
  // Memory → Pour re-entry: which ledger row the actor took over, and which
  // wine's pane the Reveal should open on (multi-pour lenses)
  const [memPicked, setMemPicked] = React.useState(null);
  const [pourWine, setPourWine] = React.useState(null);
  // Deeper Reading: null | "read" | "pour" (which surface the flip came from);
  // the arrival hint fires once per drawn card
  const [deeper, setDeeper] = React.useState(null);
  const deeperRef = React.useRef(null); deeperRef.current = deeper;
  const hintDoneRef = React.useRef(false);
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
  // in document-flow the .va grows with scroll content; every consumer of
  // vaH means "the screen", so clamp to the visual viewport
  const clampVaH = (el) => document.documentElement.classList.contains("va-flow")
    ? Math.min(el.offsetHeight, window.innerHeight) : el.offsetHeight;
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
  // Bake the turbulence-distorted mask to a plain raster PNG once per config,
  // instead of animating mask-size on the live filtered SVG. A filtered SVG
  // mask-image must be re-rasterized by the browser at EVERY intermediate
  // mask-size during the transition (expensive, especially on mobile Safari);
  // a flat PNG mask is just cheaply resampled like any other image. The blob
  // shape is identical either way — only the per-frame cost changes.
  const [bleedPngUrl, setBleedPngUrl] = React.useState(null);
  React.useEffect(() => {
    setBleedPngUrl(null);
    const m = /^url\("(.*)"\)$/.exec(bleedMaskUrl);
    if (!m) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const size = 640;
      const cv = document.createElement("canvas");
      cv.width = size; cv.height = size;
      const ctx = cv.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);
      try { setBleedPngUrl('url("' + cv.toDataURL("image/png") + '")'); } catch (e) {}
    };
    img.src = m[1];
    return () => { cancelled = true; };
  }, [bleedMaskUrl]);
  const bleedMaskFinal = bleedPngUrl || bleedMaskUrl;
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
    const ro = new ResizeObserver(() => { setVaH(clampVaH(el)); setVaW(el.offsetWidth); });
    ro.observe(el);
    setVaH(clampVaH(el)); setVaW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    let alive = true;
    const bump = () => { if (alive) setFontsTick((n) => n + 1); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(bump);
    window.addEventListener("load", bump);
    return () => { alive = false; window.removeEventListener("load", bump); };
  }, []);

  // Safari shows the DOCUMENT's background behind the status bar and
  // toolbar (the app shell only covers the layout viewport), and samples it
  // to tint the translucent chrome. It must match the RENDERED field — base
  // + veil + grain (sampled from device screenshots) — not the raw base
  // token; the old #0c0b0b read as a black letterbox band around the app.
  React.useEffect(() => {
    const bg = light ? "#d2cfc9" : "#201e1c";
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
    meta.content = bg;
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }, [light]);

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
  // NEVER while a timeline is in flight: phaseRef can be a frame stale there
  // (rAF callbacks in the same frame as a clock tick read the pre-commit
  // phase), and a placeOnDeck landing after a beat's setActor re-summons the
  // card at full opacity — the "deck card haunting the Memory ledger" bug.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (clock.running()) return;
      const p = phaseRef.current;
      if (p === "approach") placeOnDeck(true);
      if (p === "reading") { placeOnReadSlot(true); placeEyebrowOnRead(true); }
    });
    return () => cancelAnimationFrame(id);
  }, [phase, vaH, phoneFrame, desktop, shellScale, fontsTick,
    t.deckW, t.deckWDesk, t.deckLift, t.deckLiftDesk, t.orbitCardVh, t.knowingSize, t.lensSize, t.lensPad, t.knowingDesk, t.orbSpread]);

  React.useEffect(() => {
    const el = vaRoot() && vaRoot().querySelector('[data-va-slot="deck-top"]');
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!clock.running() && phaseRef.current === "approach") placeOnDeck(true);
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

  // warm the whole deck in the background so a draw never catches an
  // unloaded image mid-flip. Thumbs FIRST and in PARALLEL (8 lanes) — the
  // DECK view wants all 78 at once, and the old one-at-a-time waterfall
  // (12ms gap + a full round-trip per thumb) took long enough that a user
  // tapping DECK early watched tiles trickle in. Full-res faces amble
  // behind on a single lane once every thumb is in cache.
  React.useEffect(() => {
    const ids = (window.ARCANA_ORDER || []).slice();
    // the bottle PNGs render on The Pour mid-transition — a cold bottle
    // pops in as it decodes (read as a flash). They're few and small: warm
    // them before everything else.
    const bottles = new Set(["assets/bottle-red.png"]);
    Object.values(window.POURS || {}).forEach((byLens) =>
      Object.values(byLens).forEach((arr) => (arr || []).forEach((p) => { if (p.bottle) bottles.add(p.bottle); })));
    const thumbs = [...bottles].concat(ids.map((id) => "assets/cards/thumbs/" + ARCANA[id].file + ".webp"));
    const faces = ids.map((id) => "assets/cards/" + ARCANA[id].file + ".webp");
    let cancelled = false;
    let ti = 0, fi = 0, lanes = 0;
    const faceNext = () => {
      if (cancelled || fi >= faces.length) return;
      const im = new Image();
      im.onload = im.onerror = () => setTimeout(faceNext, 40);
      im.src = faces[fi++];
    };
    const thumbNext = () => {
      if (cancelled) return;
      if (ti >= thumbs.length) { if (--lanes === 0) faceNext(); return; }
      const im = new Image();
      im.onload = im.onerror = thumbNext;
      im.src = thumbs[ti++];
    };
    const t0 = setTimeout(() => { lanes = 8; for (let k = 0; k < 8; k++) thumbNext(); }, 250);
    return () => { cancelled = true; clearTimeout(t0); };
  }, []);

  const onDeckHover = (h) => { if (phaseRef.current === "approach") placeOnDeck(false, h); };

  // ---- iOS 26 immersion: constant three-layer construction ----
  // (flow6-docflow.css) The field scrolls in the document; the veil + glow
  // pin to the viewport; UI floats. Deck / Pour unwrap into the document
  // WHENEVER MOUNTED — driven by the mounts, not the phase, so layouts
  // never re-wrap mid-choreography (that re-wrap was the "wild background
  // jump"). Leaving a scrolled view glides the window home as part of the
  // choreography instead of teleporting it.
  const docMode = isRealMobile && !phoneFrame && !desktop && !isStandalone;
  const pourMounted = !!(mounts.reveal && card && lens);
  React.useEffect(() => {
    const H = document.documentElement;
    H.classList.toggle("va-doc", docMode);
    H.classList.toggle("va-flow-deck", docMode && mounts.deck);
    H.classList.toggle("va-flow-mem", docMode && mounts.memory && !mounts.deck);
    H.classList.toggle("va-flow-pour", docMode && pourMounted && !mounts.deck && !mounts.memory);
    H.classList.toggle("va-flow", docMode && (mounts.deck || mounts.memory || pourMounted));
  }, [docMode, mounts.deck, mounts.memory, pourMounted]);
  // overlay pinning is pure CSS (fixed) — see flow6-docflow.css. The
  // --va-sy scroll-var experiment is dead: rAF-throttled scroll vars trail
  // the compositor on iOS and made every overlay jitter.
  const glideScrollTop = (dur) => {
    if (!docMode) return;
    const y0 = window.scrollY;
    if (y0 < 2) return;
    const D = dur || Math.min(520, 240 + y0 * 0.08);
    const t0 = performance.now();
    const step = (now) => {
      const u = Math.min(1, (now - t0) / D);
      const e = 1 - Math.pow(1 - u, 3);
      window.scrollTo(0, Math.round(y0 * (1 - e)));
      if (u < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ---- THE RIDE (deck/memory tile → center, on a scrolled page) ----
  // A flying card and a gliding window CANNOT be animated against each other
  // on iOS: the compositor applies scroll on its own clock while a CSS
  // transition samples on the main thread, and every scheme that pairs them
  // (tap-time glide, spring-matched glide) either threw the card off-screen
  // or jittered it. The house answer is the same one the veil and status bar
  // use: STICKY. During the flight the actor hangs from a zero-height sticky
  // pin (.va-actor-pin, DOM-early like .va-status-pin) — the COMPOSITOR
  // keeps it viewport-locked while the window glides home beneath it, so the
  // flight is a pure CSS transition in viewport space and the two motions
  // can never fight. At the settle beat (scroll long home) the actor hands
  // back to document space at rest with zero visual delta.
  const actorPinRef = React.useRef(null);
  // offset between pin space (viewport) and va space (document): add to go
  // pin→doc, subtract to go doc→pin. Measured live so any scroll state works.
  const pinDelta = () => {
    const p = actorPinRef.current, va = vaRoot();
    if (!p || !va) return { dx: 0, dy: 0 };
    const s = vaScale();
    const pr = p.getBoundingClientRect(), vr = va.getBoundingClientRect();
    return { dx: (pr.left - vr.left) / s, dy: (pr.top - vr.top) / s };
  };

  // idle beckon: a resting stage + a stretch of inaction reads as “I don't
  // know what to do” — the hint text catches a slow pass of light until the
  // user acts. Armed only on the two waiting stages; any press re-arms it.
  React.useEffect(() => {
    const va = vaRoot(); if (!va) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = phase === "approach" ? ".rx-draw-hint"
      : phase === "reading" ? ".rx-read-foot .rx-mono" : null;
    if (!sel) return;
    let timer = null;
    const disarm = () => { const b = va.querySelector(".beckon"); if (b) b.classList.remove("beckon"); };
    const arm = () => {
      clearTimeout(timer); disarm();
      timer = setTimeout(() => {
        const el = va.querySelector(sel);
        if (el) el.classList.add("beckon");
      }, (tRef.current.beckonDelay || 10) * 1000);
    };
    va.addEventListener("pointerdown", arm, true);
    window.addEventListener("keydown", arm, true);
    arm();
    return () => {
      clearTimeout(timer); disarm();
      va.removeEventListener("pointerdown", arm, true);
      window.removeEventListener("keydown", arm, true);
    };
  }, [phase]);

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
    setDeeper(null); hintDoneRef.current = false;
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
      // swell rides a composited transform scale — animating width here would
      // re-rasterize the card image every frame mid-rotation (visible jitter)
      setActor((a) => ({ ...a, flip: 180, flipDur: dv(TL.flip.d), flipEase: E("easeFlip"),
        sc: fs, dur: dv(TL.flip.d), ease: E("easeFlip"), instant: false }));
    } });
    ev.push({ t: TL.flip.s + TL.flip.d * 0.55, run: () => { if (phaseRef.current === "lift") setPhase("drop"); } });
    ev.push({ t: TL.settle.s, run: () => { setPhase("settle"); setMounts((m) => (m.reading ? m : { ...m, reading: true }));
      const S = vaSize(); const r = slotRect("read-card");
      const ar = r ? r.height / r.width : faceARRef.current;
      // settle overshoot is based on the APPROACH DECK's size (like the flip
      // swell), not the final rest size — on crowded lens screens the rest
      // card is smaller than the deck, and a rest-based settle made the drop
      // anticlimactic. max() keeps desktop (big rest card) unchanged.
      const dw = (desktop ? tRef.current.deckWDesk : tRef.current.deckW) || 0;
      const w = Math.min(Math.max(r ? r.width : 0, dw) * (tRef.current.settleScale || 1.16), S.w * 0.58) || S.w * 0.5;
      const cy = S.h * (tRef.current.centerY / 100);
      setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0, sc: 1,
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

  // shared actor→pane cut for every road into The Pour (lens pick, memory
  // re-entry): transitionend-armed, with the final drift re-measure pass
  const armPourHandoff = () => {
    const doSwap = () => {
      if (!["choose", "slide", "echo", "pour", "reveal"].includes(phaseRef.current)) return;
      setMounts((m) => ({ ...m, reading: false })); setHandoffOn(true);
      setActor((a) => a && ({ ...a, o: 0, oDur: 0, instant: false }));
    };
    // final truth pass: on device the viewport can shift mid-flight (chrome
    // collapse, dvh resize), so the slide-beat targets can be stale by a few
    // px — the eyebrow visibly jumped at the cut. Re-measure both slots
    // against the SETTLED pane; if drifted, glide there before cutting.
    const doCut = () => {
      const va2 = vaRoot();
      const rr = slotRect("reveal-card"), er2 = slotRect("eyeb-rev");
      let drift = false;
      const cardEl = va2 && va2.querySelector(".va-card-actor");
      if (rr && cardEl && Math.abs(parseFloat(cardEl.style.left) - rr.left)
        + Math.abs(parseFloat(cardEl.style.top) - rr.top)
        + Math.abs(parseFloat(cardEl.style.width) - rr.width) > 1.5) {
        drift = true;
        setActor((a) => a && ({ ...a, left: rr.left, top: rr.top, width: rr.width, ar: rr.height / rr.width, dur: 220, ease: "ease", instant: false }));
      }
      const eyebEl = va2 && va2.querySelector(".va-eyeb-actor");
      if (er2 && eyebEl) {
        const dE = Math.abs(parseFloat(eyebEl.style.left) - er2.left)
          + Math.abs(parseFloat(eyebEl.style.top) - er2.top);
        // tiny drift: do NOT glide — the 220ms correction read as the
        // eyebrow visibly hopping down at the end; the same-frame swap
        // hides a ≤4px discontinuity completely
        if (dE > 4) {
          drift = true;
          setEyeb((e) => e && ({ ...e, left: er2.left, top: er2.top, dur: 220, instant: false }));
        }
      }
      if (drift) setTimeout(doSwap, 240); else doSwap();
    };
    const va = vaRoot(); const el = va && va.querySelector(".va-card-actor");
    if (!el) { doCut(); return; }
    let done = false;
    const finish = () => { if (done) return; done = true; el.removeEventListener("transitionend", onEnd); doCut(); };
    const onEnd = (e2) => { if (e2.target === el && (e2.propertyName === "left" || e2.propertyName === "top" || e2.propertyName === "width")) finish(); };
    el.addEventListener("transitionend", onEnd);
    setTimeout(finish, dv(700));
  };

  const pick = (l) => {
    if (phaseRef.current !== "reading" && phaseRef.current !== "lenses") return;
    setLens(l); setPicked(l.n); setPourWine(null);
    const TL = tRef.current.tlChoice;
    const ev = [];
    ev.push({ t: TL.choose.s, run: () => { setPhase("choose"); setVoiceOn(false); setLensesOn(false); setMounts((m) => ({ ...m, reveal: true })); } });
    ev.push({ t: TL.slide.s, run: () => { setPhase("slide");
      // the actor's sh-rev shadow must render at the same scale as the real
      // card's (which sits inside the transform-scaled .hero-scale) — read
      // the live scale and let flow6.css shrink the shadow geometry to match
      const hs = (vaRoot() || document).querySelector(".rv-hero .hero-scale");
      if (vaRef.current) {
        const m = hs ? getComputedStyle(hs).transform : "none";
        const sc = m && m.indexOf("matrix(") === 0 ? parseFloat(m.slice(7)) : 1;
        vaRef.current.style.setProperty("--rvShSc", String(sc > 0 ? sc : 1));
      }
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
    // actor→pane handoff: keyed to the actor's ACTUAL transitionend, not the
    // nominal slide end — the CSS transition starts a couple frames after the
    // state move and the slide ease has a long tail, so cutting at
    // slide.s+slide.d catches the last ~3px mid-glide (the card visibly
    // jumped / "crossfaded into itself" right at the end). The clock event
    // only ARMS the listener (an echo dragged earlier than the slide must
    // still not teleport the card); a timeout is the can't-hang fallback.
    ev.push({ t: Math.max(TL.echo.s, TL.slide.s + TL.slide.d), run: armPourHandoff });
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

  // The Pour buttons ride the iOS 26 chrome as it collapses/expands: --foot-vh
  // tracks the live VisualViewport height, and flow6-docflow tops the fixed bar
  // at (foot-vh - 88px) so it stays just above the current chrome edge — low
  // when the bar is collapsed, without a bottom-anchored element (which triggers
  // the toolbar backdrop). rAF-throttled so it rides the compositor.
  React.useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const root = document.documentElement;
    let raf = 0;
    const apply = () => { raf = 0; root.style.setProperty("--foot-vh", vv.height + "px"); };
    const onChange = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    vv.addEventListener("resize", onChange);
    vv.addEventListener("scroll", onChange);
    return () => {
      vv.removeEventListener("resize", onChange);
      vv.removeEventListener("scroll", onChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const release = (pour, kept) => {
    const from = phaseRef.current;
    if (from === "approach" || from === "release" || from === "reform") return;
    glideScrollTop();
    // a Choice clock may still be running (fade tapped mid-transition) — its
    // end callback would setPhase("reveal") OVER our release. Kill it first.
    clock.cancel();
    if (pour) savePull({ ts: Date.now(), card: cardRef.current, lens: lens ? lens.name : null, wine: pour.wine, kept });
    // a keep writes the journal: the deck jots the first note itself.
    // Memory re-entry (pourWine set) re-keeping the SAME wine is a no-op —
    // it's already in the book; a different pane's wine is a real new keep.
    if (kept && pour && pour.wine !== pourWine) MemoryStore.add({
      ts: Date.now(), card: cardRef.current, lens: lens ? lens.n : null,
      wine: pour.wine, sub: pour.sub || ["", ""], bottle: pour.bottle || "assets/bottle-red.png",
      jot: memoryJotFor(pour), hearted: false,
    });
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
      setMounts((m) => ({ ...m, reading: false, reveal: false, deck: false, memory: false }));
      setVoiceOn(false); setVeilOn(false); setLensesOn(false);
      setEchoOn(false); setPourOn(false); setGlowOn(false); setBottleOn(false); setHandoffOn(false);
      setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
      setMemPicked(null); setPourWine(null); setDeeper(null);
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

  // ---------- DEEPER READING ----------
  // src "read": the Reading card was tapped (rest only). src "pour": the
  // CARD MEANING pill. Both open the same flipped-card panel; closing is
  // owned by the component (it flies back to wherever it came from).
  const openDeeper = (src) => {
    if (deeperRef.current) return;
    if (!(window.GUIDES && cardRef.current && GUIDES[cardRef.current])) return;
    if (src === "read" && phaseRef.current !== "reading") return;
    if (src === "pour" && phaseRef.current !== "reveal") return;
    glideScrollTop();
    setDeeper(src);
  };

  // ---------- THE DECK ----------
  const toDeck = () => {
    const p = phaseRef.current;
    if (p === "deck" || p === "todeck" || p === "deckfly") return;
    glideScrollTop();
    clock.cancel();
    if (p === "approach" || p === "reform" || p === "pull") {
      // from the approach: UI + deck fade on the UI-exit curve, grid rises
      setReleasing(false);
      const dur = tRef.current.dUiExit;
      const ev = [];
      ev.push({ t: 0, run: () => { setPhase("todeck");
        // the top-of-deck actor sinks with the stack beneath it
        setActor((a) => a && ({ ...a, o: 0, top: a.top + 14, dur: dv(dur), oDur: dv(dur), ease: E("easeUiExit"), instant: false }));
      } });
      // the grid mounts only AFTER the approach has (nearly) faded — same
      // contract as the release path, minus 150ms so it doesn't drag
      ev.push({ t: Math.max(0, dur - 150), run: () => {
        setMounts((m) => ({ ...m, deck: true }));
        setPhase("deck");
      } });
      clock.run(ev, dur + 40, ffRef, () => { if (phaseRef.current === "todeck") { setMounts((m) => ({ ...m, deck: true })); setPhase("deck"); } });
    } else {
      // from reading / reveal (or mid-flight): the Release sink, landing on the grid
      const TL = tRef.current.tlReturn;
      const ev = [];
      ev.push({ t: 0, run: () => { setPhase("release"); setReleasing(true); setVeilOn(false); setGlowOn(false);
        setActor((a) => a && ({ ...a, o: 0, top: a.top + 36, dur: dv(TL.release.d), oDur: dv(TL.release.d), ease: E("easeRelease"), instant: false }));
        setEyeb((e) => e && ({ ...e, o: 0, dur: dv(TL.release.d), oDur: dv(TL.release.d), instant: false }));
      } });
      ev.push({ t: TL.release.d, run: () => {
        setReleasing(false);
        setMounts((m) => ({ ...m, reading: false, reveal: false, memory: false, deck: true }));
        setVoiceOn(false); setLensesOn(false); setEchoOn(false); setPourOn(false);
        setGlowOn(false); setBottleOn(false); setHandoffOn(false);
        setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
        setMemPicked(null); setPourWine(null); setDeeper(null);
        // keep the actor MOUNTED (hidden): unmounting it means the next tap
        // remounts fresh <img>s, which iOS blanks for several frames while
        // decoding — the vanishing-card flash on device
        setActor((a) => a && ({ ...a, o: 0, dur: 0, instant: true }));
        setEyeb(null);
        setPhase("deck");
      } });
      clock.run(ev, TL.release.d + 40, ffRef, () => { ffRef.current = 1; setFF(false); });
    }
  };

  // tap a tile: the card is already face-up — run the tail of The Draw,
  // flying from the tile's own rect instead of pulling from the deck
  const runDeckDraw = (id, r) => {
    if (phaseRef.current !== "deck") return;
    // THE RIDE: the actor is viewport-locked on the sticky pin for the whole
    // flight, so the window can glide home on its own clock (the original
    // chrome-smooth 320ms) without ever moving the card on screen.
    glideScrollTop();
    setCard(id);
    setReleasing(false);
    setDeeper(null); hintDoneRef.current = false;
    setVoiceOn(false); setVeilOn(false); setLensesOn(false);
    setEchoOn(false); setPourOn(false); setGlowOn(false); setBottleOn(false); setHandoffOn(false);
    setWhispered(false); setLens(null); setPicked(null);
    const c = ARCANA[id];
    const pre = new Image(); pre.src = "assets/cards/" + c.file + ".webp";
    pre.onload = () => { if (pre.naturalWidth) faceARRef.current = pre.naturalHeight / pre.naturalWidth; };
    if (pre.decode) pre.decode().catch(() => {});
    const preBg = new Image(); preBg.src = "assets/cards/" + c.file + "-bg.webp";
    if (preBg.decode) preBg.decode().catch(() => {});

    // the actor takes over the tapped tile IN PIN (viewport) SPACE, face
    // already showing — from here the scroll cannot touch it
    const dl0 = pinDelta();
    setActor({ left: r.left - dl0.dx, top: r.top - dl0.dy, width: r.width, ar: r.height / r.width, rot: 0, flip: 180, o: 1,
      dur: 0, radius: 8, shadow: "sh-rest", instant: true });

    const T = tRef.current, TL = T.tlDraw;
    const off = TL.lift.s; // timeline starts at the lift — no pull, no flip
    const sh = (x) => Math.max(0, x - off);
    const ev = [];
    ev.push({ t: 0, run: () => { setPhase("deckfly"); setMounts((m) => (m.reading ? m : { ...m, reading: true }));
      const S = vaSize(); const w = Math.min(S.w * 0.62, 300); const ar = faceARRef.current;
      const cy = S.h * (tRef.current.centerY / 100);
      requestAnimationFrame(() => requestAnimationFrame(() =>
        setActor((a) => a && ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
          dur: dv(TL.lift.d), ease: E("easeLift"), shadow: "sh-air", instant: false }))));
    } });
    ev.push({ t: sh(TL.settle.s), run: () => { setPhase("settle");
      // scroll is home by now (glide ended ~340ms), so pin space == document
      // space and the slot math needs no conversion
      setMounts((m) => ({ ...m, reading: true, deck: false }));
      const S = vaSize(); const rr = slotRect("read-card");
      const ar = rr ? rr.height / rr.width : faceARRef.current;
      const dw2 = (desktop ? tRef.current.deckWDesk : tRef.current.deckW) || 0;
      const w = Math.min(Math.max(rr ? rr.width : 0, dw2) * (tRef.current.settleScale || 1.16), S.w * 0.58) || S.w * 0.5;
      const cy = S.h * (tRef.current.centerY / 100);
      setActor((a) => a && ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0, sc: 1,
        dur: dv(TL.settle.d), ease: E("easeSettle"), shadow: "sh-rest", radius: 9, instant: false }));
    } });
    ev.push({ t: sh(TL.bleed.s), run: () => { setPhase("bleed"); setVeilOn(true);
      const place = (tries) => {
        const er = slotRect("eyeb-read");
        if (!er) { if (tries > 0) requestAnimationFrame(() => place(tries - 1)); return; }
        setEyeb({ left: er.left, top: er.top, fs: 9.5, ls: 0.3, o: 0, dur: 0, rules: true, lensOn: false, mode: "read", instant: true });
        requestAnimationFrame(() => requestAnimationFrame(() =>
          setEyeb((e) => e && ({ ...e, o: 1, dur: 650, oDur: 650, instant: false }))));
      };
      place(30);
    } });
    ev.push({ t: sh(TL.rest.s), run: () => { setPhase("rest");
      const rr = slotRect("read-card");
      if (rr) setActor((a) => ({ ...a, left: rr.left, top: rr.top, width: rr.width, ar: rr.height / rr.width,
        dur: dv(TL.rest.d), ease: E("easeRest"), instant: false }));
    } });
    ev.push({ t: sh(TL.voice.s), run: () => { setPhase("voice"); setVoiceOn(true); } });
    ev.push({ t: sh(TL.lenses.s), run: () => { setPhase("lenses"); setLensesOn(true); } });
    const end = Math.max(
      sh(TL.lift.s) + TL.lift.d, sh(TL.settle.s) + TL.settle.d, sh(TL.rest.s) + TL.rest.d,
      sh(TL.voice.s) + TL.voice.d, sh(TL.lenses.s) + TL.lenses.d + T.lensStep * 5);
    clock.run(ev, end, ffRef, () => { setPhase("reading"); ffRef.current = 1; setFF(false); });
  };

  // ---------- MEMORY ----------
  // Enter from the status bar on any stage — same two roads as THE DECK:
  // from the Approach the UI fades on its exit curve; from anywhere deeper
  // it's the house Release sink, landing on the ledger.
  const toMemory = () => {
    const p = phaseRef.current;
    if (p === "memory" || p === "tomem" || p === "memfly") return;
    glideScrollTop();
    clock.cancel();
    migrateMemoryFromPulls();
    if (p === "approach" || p === "reform" || p === "pull") {
      setReleasing(false);
      const dur = tRef.current.dUiExit;
      const ev = [];
      ev.push({ t: 0, run: () => { setPhase("tomem");
        setActor((a) => a && ({ ...a, o: 0, top: a.top + 14, dur: dv(dur), oDur: dv(dur), ease: E("easeUiExit"), instant: false }));
      } });
      ev.push({ t: Math.max(0, dur - 150), run: () => {
        setMounts((m) => ({ ...m, memory: true }));
        setPhase("memory");
      } });
      clock.run(ev, dur + 40, ffRef, () => { if (phaseRef.current === "tomem") { setMounts((m) => ({ ...m, memory: true })); setPhase("memory"); } });
    } else {
      const TL = tRef.current.tlReturn;
      const ev = [];
      ev.push({ t: 0, run: () => { setPhase("release"); setReleasing(true); setVeilOn(false); setGlowOn(false);
        setActor((a) => a && ({ ...a, o: 0, top: a.top + 36, dur: dv(TL.release.d), oDur: dv(TL.release.d), ease: E("easeRelease"), instant: false }));
        setEyeb((e) => e && ({ ...e, o: 0, dur: dv(TL.release.d), oDur: dv(TL.release.d), instant: false }));
      } });
      ev.push({ t: TL.release.d, run: () => {
        setReleasing(false);
        setMounts((m) => ({ ...m, reading: false, reveal: false, deck: false, memory: true }));
        setVoiceOn(false); setLensesOn(false); setEchoOn(false); setPourOn(false);
        setGlowOn(false); setBottleOn(false); setHandoffOn(false);
        setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
        setMemPicked(null); setPourWine(null); setDeeper(null);
        // same as toDeck: hidden, never unmounted (iOS img-remount flash)
        setActor((a) => a && ({ ...a, o: 0, dur: 0, instant: true }));
        setEyeb(null);
        setPhase("memory");
      } });
      clock.run(ev, TL.release.d + 40, ffRef, () => { ffRef.current = 1; setFF(false); });
    }
  };

  // Tap a ledger row → The Pour for that wine: re-entry into the reveal, no
  // re-draw. The row's mini card is already face-up — the actor takes it
  // over, rises to center on the Draw's lift beat while the ledger sinks
  // (the deckfly grammar), then the Choice tail plays: slide into the hero,
  // echo, bottle, pour. The eyebrow materializes in place (no Reading to
  // fly from) on the bleed beat's own fade recipe.
  const openMemoryPour = (entry, r) => {
    if (phaseRef.current !== "memory") return;
    const c = ARCANA[entry.card];
    const byLens = (window.POURS || {})[entry.card] || {};
    // resolve the lens: the kept numeral → the wine's own lens → first with pours
    let lensObj = c && (c.lenses || []).find((l) => l.n === entry.lens && byLens[l.n] && byLens[l.n].length);
    if (c && !lensObj) {
      const k = Object.keys(byLens).find((k2) => (byLens[k2] || []).some((p) => p.wine === entry.wine))
        || Object.keys(byLens).find((k2) => byLens[k2] && byLens[k2].length);
      lensObj = (c.lenses || []).find((l) => l.n === k);
    }
    if (!c || !lensObj) { showToast("THIS PAGE HAS FADED"); return; }
    // THE RIDE, ledger edition: viewport-locked actor, free-running glide
    glideScrollTop();
    clock.cancel();
    setCard(entry.card);
    setLens(lensObj); setPicked(lensObj.n);
    setPourWine(entry.wine);
    setMemPicked(entry.id);
    setReleasing(false);
    setVoiceOn(false); setVeilOn(false); setLensesOn(false);
    setEchoOn(false); setPourOn(false); setGlowOn(false); setBottleOn(false); setHandoffOn(false);
    setWhispered(false);
    const pre = new Image(); pre.src = "assets/cards/" + c.file + ".webp";
    pre.onload = () => { if (pre.naturalWidth) faceARRef.current = pre.naturalHeight / pre.naturalWidth; };
    if (pre.decode) pre.decode().catch(() => {});
    const preBg = new Image(); preBg.src = "assets/cards/" + c.file + "-bg.webp";
    if (preBg.decode) preBg.decode().catch(() => {});

    // the actor takes over the row's mini card IN PIN (viewport) SPACE
    // (face up, −4° like the row)
    const dl0 = pinDelta();
    setActor({ left: r.left - dl0.dx, top: r.top - dl0.dy, width: r.width, ar: r.height / r.width, rot: -4, flip: 180, o: 1,
      dur: 0, radius: 4, shadow: "sh-rest", instant: true });

    const T = tRef.current, TLd = T.tlDraw, TLc = T.tlChoice;
    // rise first; the ledger completes its exit-curve sink beneath the flight
    const base = Math.max(TLd.lift.d, T.dUiExit) + 60;
    const ev = [];
    ev.push({ t: 0, run: () => { setPhase("memfly");
      const S = vaSize(); const w = Math.min(S.w * 0.62, 300); const ar = faceARRef.current;
      const cy = S.h * (tRef.current.centerY / 100);
      requestAnimationFrame(() => requestAnimationFrame(() =>
        setActor((a) => a && ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
          dur: dv(TLd.lift.d), ease: E("easeLift"), shadow: "sh-air", instant: false }))));
    } });
    // the ledger has faded (and the scroll is long home, so pin space ==
    // document space) — swap layouts and let The Pour choreograph in
    ev.push({ t: base, run: () => { setPhase("choose");
      setMounts((m) => ({ ...m, memory: false, reveal: true }));
      setMemPicked(null);
      setVeilOn(true);
    } });
    ev.push({ t: base + TLc.slide.s, run: () => { setPhase("slide");
      const hs = (vaRoot() || document).querySelector(".rv-hero .hero-scale");
      if (vaRef.current) {
        const m = hs ? getComputedStyle(hs).transform : "none";
        const sc = m && m.indexOf("matrix(") === 0 ? parseFloat(m.slice(7)) : 1;
        vaRef.current.style.setProperty("--rvShSc", String(sc > 0 ? sc : 1));
      }
      const place = (tries) => {
        const rr = slotRect("reveal-card"), er = slotRect("eyeb-rev");
        if (!rr || !er) { if (tries > 0) requestAnimationFrame(() => place(tries - 1)); return; }
        setActor((a) => a && ({ ...a, left: rr.left, top: rr.top, width: rr.width, ar: rr.height / rr.width, rot: -4,
          dur: dv(TLc.slide.d), ease: E("easeSlide"), shadow: "sh-rev", radius: 8, instant: false }));
        setEyeb({ left: er.left, top: er.top, fs: 9, ls: 0.28, o: 0, dur: 0, rules: false, lensOn: false, mode: "rev", instant: true });
        requestAnimationFrame(() => requestAnimationFrame(() =>
          setEyeb((e) => e && ({ ...e, o: 1, dur: 650, oDur: 650, instant: false }))));
      };
      place(30);
    } });
    ev.push({ t: base + TLc.echo.s, run: () => { setPhase("echo"); setEchoOn(true); setEyeb((e) => e && ({ ...e, lensOn: true })); } });
    ev.push({ t: base + Math.max(TLc.echo.s, TLc.slide.s + TLc.slide.d), run: armPourHandoff });
    ev.push({ t: base + TLc.bottle.s, run: () => setBottleOn(true) });
    ev.push({ t: base + TLc.pour.s, run: () => { setPhase("pour"); setPourOn(true); } });
    ev.push({ t: base + TLc.glow.s, run: () => setGlowOn(true) });
    const end = base + Math.max(TLc.choose.s + TLc.choose.d, TLc.slide.s + TLc.slide.d,
      TLc.echo.s + TLc.echo.d, TLc.pour.s + TLc.pour.d + 460, TLc.glow.s + TLc.glow.d,
      TLc.bottle.s + TLc.bottle.d);
    clock.run(ev, end, ffRef, () => { setPhase("reveal"); ffRef.current = 1; setFF(false);
      setEyeb((e) => e && ({ ...e, o: 0, oDur: 0 }));
    });
  };

  const replay = () => {
    const p = phaseRef.current;
    if (!cardRef.current || p === "approach" || p === "reform") { showToast("PULL A CARD FIRST"); return; }
    const id = cardRef.current;
    glideScrollTop();
    clock.cancel();
    setReleasing(false);
    setPhase("approach"); setMounts({ approach: true, reading: false, reveal: false, deck: false, memory: false });
    setLens(null); setPicked(null); setEyeb(null); setCard(id);
    setMemPicked(null); setPourWine(null); setDeeper(null);
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
    deck: () => toDeck(),
    deckDraw: (id, r) => runDeckDraw(id, r),
    memory: () => toMemory(),
    memoryOpen: (entry, r) => openMemoryPour(entry, r),
    deeper: (src) => openDeeper(src || "read"),
    hurry, phase: () => phaseRef.current,
  };

  // ---------- flags ----------
  const F = {
    phase,
    canDraw: phase === "approach",
    approachUiIn: phase === "approach" || phase === "reform",
    approachShown: ["approach", "pull", "lift", "drop", "reform", "todeck", "tomem"].includes(phase),
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
    "--va-vig-mob": vigMob, "--va-vig-desk": vigDesk, "--va-bleed-mask": bleedMaskFinal,
    "--va-deck-top": (50 - (desktop ? t.deckLiftDesk : t.deckLift)) / 100,
    "--va-deck-w": t.deckW + "px", "--va-deck-w-desk": t.deckWDesk + "px",
    "--va-knowing-size": t.knowingSize + "px", "--va-lens-size": t.lensSize + "px", "--va-lens-pad": t.lensPad + "px",
    "--va-card-r": t.cardRadius,
    "--bkHot": bkMix(light ? [21, 34, 49, 0.5] : [239, 236, 228, 0.5],
      (BECKON_COLORS[light ? t.beckonColorD : t.beckonColorN] || BECKON_COLORS.apricot)[light ? "hotL" : "hot"], t.beckonAlpha),
    "--bkPeak": bkMix(light ? [21, 34, 49, 0.5] : [239, 236, 228, 0.5],
      (BECKON_COLORS[light ? t.beckonColorD : t.beckonColorN] || BECKON_COLORS.apricot)[light ? "peakL" : "peak"], t.beckonAlpha),
    "--bkDurA": t.beckonDurA + "s", "--bkBandA": t.beckonBandA + "px",
    "--bkDurL": t.beckonDurL + "s", "--bkBandL": t.beckonBandL + "px",
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
  // the actor carries the poster thumb (sharp at flight sizes, warm from the
  // boot preload) through every MOVING beat; the full-res face only mounts
  // once the card is at rest (bleed onward). Painting a 400KB decode the
  // moment it arrives mid-flip was the visible stutter before the apex.
  const actorFace = ["pull", "lift", "drop", "settle", "deckfly"].includes(phase) ? null : face;
  const faceBg = c ? "assets/cards/" + c.file + "-bg.webp" : null;
  const vaCls = "va p-" + phase + (releasing ? " p-release" : "") +
    (deeper ? " dr-open" : "") +
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
          <div className="va-status-pin"><StatusBar6 light={light} onHome={home} onDeck={toDeck} onToast={showToast}
            deckOn={["todeck", "deck", "deckfly"].includes(phase)}
            onMemory={toMemory} memOn={["tomem", "memory", "memfly"].includes(phase)}></StatusBar6></div>
          {/* THE ACTOR'S ONE HOME: a zero-height sticky pin (the status-pin
              recipe), DOM-early so sticky can pin. Its origin is the
              viewport in doc mode and the .va box everywhere else — equal to
              document space whenever scroll is 0 (every resting beat), so
              all slot math holds; the two scrolled takeovers convert via
              pinDelta. The actor must NEVER remount or re-parent: iOS blanks
              freshly-mounted imgs for several frames while it decodes them
              (the vanishing-card flash on device). */}
          <div className="va-actor-pin" ref={actorPinRef}>
            <CardActor a={actor} face={actorFace} rPct={t.cardRadius} poster={c ? "assets/cards/thumbs/" + c.file + ".webp" : null}></CardActor>
          </div>

          {mounts.approach ? (
            <Approach light={light} invite={invite} whisper={whisper} setWhisper={setWhisper}
              onDraw={() => runDraw()} onDeckHover={onDeckHover} F={F} spd={spd}></Approach>
          ) : null}
          {mounts.reading && card ? (
            <Reading card={card} light={light} whispered={whispered} flare={t.lensFlare}
              desktop={desktop} F={F} onPick={pick} lensStep={t.lensStep} spd={spd} orbit={orbitTuning}></Reading>
          ) : null}
          {mounts.reveal && card && lens ? (
            <Reveal card={card} lens={lens} light={light} F={F} spd={spd} initialWine={pourWine}
              onDeeper={() => openDeeper("pour")}
              onKeep={(p) => release(p, true)} onFade={(p) => release(p, false)}></Reveal>
          ) : null}
          {mounts.deck ? (
            <DeckGrid F={F} drawingId={card} onPick={runDeckDraw}></DeckGrid>
          ) : null}
          {mounts.memory ? (
            <MemoryScreen light={light} leaving={phase === "memfly"} pickedId={memPicked}
              onOpen={openMemoryPour} onDraw={() => release(null, false)}></MemoryScreen>
          ) : null}
          {phase === "reading" && card && !deeper && window.GUIDES && GUIDES[card] ? (
            <DeeperAffordance key={card} hintArm={!hintDoneRef.current}
              onHinted={() => { hintDoneRef.current = true; }}
              onOpen={() => openDeeper("read")}></DeeperAffordance>
          ) : null}
          {deeper && card ? (
            <DeeperReading card={card} src={deeper} light={light} rPct={t.cardRadius}
              flipDur={Math.max(360, Math.round(t.tlDraw.flip.d / spd))} flipEase={easeCss(t.easeFlip)}
              onClosed={() => setDeeper(null)}></DeeperReading>
          ) : null}

          {c ? <EyebrowActor e={eyeb} num={c.num} name={c.name} lens={lens ? lens.name : ""}></EyebrowActor> : null}
          <SmokeFX light={light}></SmokeFX>

          {toast ? <div className={"va-toast" + (light ? " light" : "")}>{toast}</div> : null}
        </div>
      </div>
      {phoneFrame ? <div className="va-frame-tag">393 × 852 · phone frame</div> : null}

      <FlowPanel t={t} setTweak={setTweak} replay={replay}></FlowPanel>
    </div>
  );
}

// ---------- the panel ----------
function FlowPanel({ t, setTweak, replay }) {
  const [tab, setTab] = usePanelPref("tab", "Design");
  return (
    <TweaksPanel>
      <Flow3PanelStyle></Flow3PanelStyle>
      <TweakButton label="Export design-tokens.json" onClick={() => exportTokens(t)}></TweakButton>
      <TweakRadio label="Color field" value={t.mode} options={["system", "night", "day"]} onChange={(v) => setTweak("mode", v)}></TweakRadio>
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
            <TweakSlider label="Edge · mobile" value={t.veilEdgeMob} min={25} max={100} step={1} unit="%" onChange={(v) => setTweak("veilEdgeMob", v)}></TweakSlider>
            <TweakSlider label="Edge · desktop" value={t.veilEdgeDesk} min={70} max={100} step={1} unit="%" onChange={(v) => setTweak("veilEdgeDesk", v)}></TweakSlider>
            <TweakSlider label="Distortion · mobile" value={t.vigWarpMob} min={0} max={120} step={2} onChange={(v) => setTweak("vigWarpMob", v)}></TweakSlider>
            <TweakSlider label="Distortion · desktop" value={t.vigWarpDesk} min={0} max={120} step={2} onChange={(v) => setTweak("vigWarpDesk", v)}></TweakSlider>
            <TweakSection label="Veil image"></TweakSection>
            <TweakSlider label="Distortion · mobile" value={t.veilWarpMob} min={0} max={240} step={5} onChange={(v) => setTweak("veilWarpMob", v)}></TweakSlider>
            <TweakSlider label="Distortion · desktop" value={t.veilWarpDesk} min={0} max={240} step={5} onChange={(v) => setTweak("veilWarpDesk", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-card" id="d-card" label="The Card" hint="one token, every instance">
            <TweakSlider label="Corner radius" value={t.cardRadius} min={2} max={9} step={0.1} unit="%" hint="of card width — deck, actor, reading, reveal, and grid all derive from it" onChange={(v) => setTweak("cardRadius", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-beckon" id="d-beckon" label="Hint shimmer" hint="idle nudge">
            <TweakSlider label="Shimmer after" value={t.beckonDelay} min={3} max={30} step={1} unit="s" hint="idle time before the hint text catches the light" onChange={(v) => setTweak("beckonDelay", v)}></TweakSlider>
            <TweakSelect label="Color · night" value={t.beckonColorN} options={Object.keys(BECKON_COLORS).map((k) => ({ value: k, label: BECKON_COLORS[k].label }))} onChange={(v) => setTweak("beckonColorN", v)}></TweakSelect>
            <TweakSelect label="Color · day" value={t.beckonColorD} options={Object.keys(BECKON_COLORS).map((k) => ({ value: k, label: BECKON_COLORS[k].label }))} onChange={(v) => setTweak("beckonColorD", v)}></TweakSelect>
            <TweakSlider label="Intensity" value={t.beckonAlpha} min={0.2} max={1} step={0.05} hint="blends the band toward the resting text color" onChange={(v) => setTweak("beckonAlpha", v)}></TweakSlider>
            <TweakSection label="The Approach"></TweakSection>
            <TweakSlider label="Pass every" value={t.beckonDurA} min={2} max={16} step={0.5} unit="s" onChange={(v) => setTweak("beckonDurA", v)}></TweakSlider>
            <TweakSlider label="Band width" value={t.beckonBandA} min={8} max={120} step={2} unit="px" onChange={(v) => setTweak("beckonBandA", v)}></TweakSlider>
            <TweakSection label="The Lenses"></TweakSection>
            <TweakSlider label="Pass every" value={t.beckonDurL} min={2} max={16} step={0.5} unit="s" onChange={(v) => setTweak("beckonDurL", v)}></TweakSlider>
            <TweakSlider label="Band width" value={t.beckonBandL} min={8} max={120} step={2} unit="px" onChange={(v) => setTweak("beckonBandL", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="d-approach" id="d-approach" label="The Approach" hint="deck">
            <TweakSlider label="Deck lift · mobile" value={t.deckLift} min={24} max={48} step={0.5} unit="%" hint="how far the deck block's top sits ABOVE the viewport's vertical midpoint — scales with any phone's height" onChange={(v) => setTweak("deckLift", v)}></TweakSlider>
            <TweakSlider label="Deck lift · desktop" value={t.deckLiftDesk} min={24} max={48} step={0.5} unit="%" onChange={(v) => setTweak("deckLiftDesk", v)}></TweakSlider>
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
            <TweakSlider label="Settle size ×" value={t.settleScale} min={0.9} max={1.4} step={0.01} onChange={(v) => setTweak("settleScale", v)} hint="card size at the end of Settle, × the LARGER of the Approach deck and the final rest size"></TweakSlider>
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
