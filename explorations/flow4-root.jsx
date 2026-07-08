// FLOW v4 — root App. Same architecture as v3 (editable timelines on a
// parallel motion clock, spring eases, Design/Motion tweaks tabs) plus the
// desktop-polish pass: orbit float/magnetism tuning, desktop veil vignette,
// and a __vaDrive hook for scripted walkthroughs.

const FLOW4_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "night", "viewport": "auto", "uiExit": "fade",
  "grainSize": 260, "grainNight": 0.18, "grainDay": 0.16, "veilNight": 0.11, "veilDay": 0.09,
  "deckTop": 18, "deckW": 190, "deckWDesk": 250, "knowingSize": 22, "lensSize": 17, "lensPad": 12,
  "orbitCardVh": 52, "knowingDesk": 26.5, "lensFlare": false, "shoutSize": 56, "pourShift": 0,
  "orbFloat": true, "orbAmp": 7, "orbSpeed": 1, "orbBreath": 0.014, "orbRadius": 210, "orbPull": 0.1, "orbGrow": 0.055, "orbSpread": 1,
  "veilEdgeDesk": 92,
  "centerY": 47, "bleedWarp": 140, "dUiExit": 620, "lensStep": 140, "ffSpeed": 4,
  "tlDraw": { "pull": { "s": 0, "d": 480 }, "lift": { "s": 480, "d": 520 }, "flip": { "s": 480, "d": 950 }, "settle": { "s": 1430, "d": 580 }, "bleed": { "s": 2010, "d": 3500 }, "rest": { "s": 2430, "d": 480 }, "voice": { "s": 2910, "d": 440 }, "lenses": { "s": 3350, "d": 430 } },
  "tlChoice": { "choose": { "s": 0, "d": 450 }, "slide": { "s": 450, "d": 740 }, "echo": { "s": 1190, "d": 640 }, "pour": { "s": 1830, "d": 640 } },
  "tlReturn": { "release": { "s": 0, "d": 575 }, "reform": { "s": 575, "d": 1300 } },
  "easePull": { "p": "silk" }, "easeLift": { "p": "silk" }, "easeFlip": { "p": "swift" },
  "easeSettle": { "p": "supple" }, "easeRest": { "p": "silk" }, "easeSlide": { "p": "silk" },
  "easeRelease": { "p": "gentle" }, "easeReform": { "p": "supple" },
  "easeBleed": { "p": "molasses" }, "easeVoice": { "p": "gentle" }, "easeLens": { "p": "silk" },
  "easeEcho": { "p": "silk" }, "easePour": { "p": "silk" }, "easeUiExit": { "p": "gentle" }
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
  { key: "echo", label: "Echo", ease: "easeEcho" },
  { key: "pour", label: "Pour", ease: "easePour" },
];
const BEATS_RETURN = [
  { key: "release", label: "Release", ease: "easeRelease" },
  { key: "reform", label: "Reform", ease: "easeReform" },
];

function App() {
  const [t, setTweak] = useTweaks(FLOW4_DEFAULTS);
  const tRef = React.useRef(t); tRef.current = t;
  const light = t.mode === "day";
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
  const [shellScale, setShellScale] = React.useState(1);
  const [fontsTick, setFontsTick] = React.useState(0);
  const vaRef = React.useRef(null);
  const faceARRef = React.useRef(FACE_AR);
  const toastTimer = React.useRef(null);
  const clock = useMotionClock();

  const spd = ff ? t.ffSpeed : 1;
  const dv = (ms) => ms / (ffRef.current > 1 ? ffRef.current : 1); // css-side dur at move time
  const E = (k) => easeCss(tRef.current[k]);

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

  React.useLayoutEffect(() => {
    const el = vaRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setVaH(el.offsetHeight));
    ro.observe(el);
    setVaH(el.offsetHeight);
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

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const p = phaseRef.current;
      if (p === "approach") placeOnDeck(true);
      if (p === "reading") placeOnReadSlot(true);
    });
    return () => cancelAnimationFrame(id);
  }, [phase, vaH, phoneFrame, desktop, shellScale, fontsTick, t.deckW, t.deckWDesk, t.deckTop, t.orbitCardVh]);

  React.useEffect(() => {
    const el = vaRoot() && vaRoot().querySelector('[data-va-slot="deck-top"]');
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (phaseRef.current === "approach") placeOnDeck(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
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
    setWhispered(whisper.trim().length > 0);
    const c = ARCANA[id];
    const pre = new Image(); pre.src = "assets/cards/" + c.file + ".png";
    pre.onload = () => { if (pre.naturalWidth) faceARRef.current = pre.naturalHeight / pre.naturalWidth; };
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
      setActor((a) => ({ ...a, flip: 180, flipDur: dv(TL.flip.d), flipEase: E("easeFlip"), instant: false }));
    } });
    ev.push({ t: TL.flip.s + TL.flip.d * 0.55, run: () => { if (phaseRef.current === "lift") setPhase("drop"); } });
    ev.push({ t: TL.settle.s, run: () => { setPhase("settle"); setMounts((m) => (m.reading ? m : { ...m, reading: true }));
      const S = vaSize(); const r = slotRect("read-card");
      const ar = r ? r.height / r.width : faceARRef.current;
      const w = r ? Math.min(r.width * 1.16, S.w * 0.58) : S.w * 0.5;
      const cy = S.h * (tRef.current.centerY / 100);
      setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
        dur: dv(TL.settle.d), ease: E("easeSettle"), shadow: "sh-rest", radius: 9, instant: false }));
    } });
    ev.push({ t: TL.bleed.s, run: () => { setPhase("bleed");
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
    ev.push({ t: TL.voice.s, run: () => setPhase("voice") });
    ev.push({ t: TL.lenses.s, run: () => setPhase("lenses") });
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
    ev.push({ t: TL.choose.s, run: () => { setPhase("choose"); setMounts((m) => ({ ...m, reveal: true })); } });
    ev.push({ t: TL.slide.s, run: () => { setPhase("slide");
      const r = slotRect("reveal-card");
      if (r) setActor((a) => ({ ...a, left: r.left, top: r.top, width: r.width, ar: r.height / r.width, rot: -4,
        dur: dv(TL.slide.d), ease: E("easeSlide"), shadow: "sh-rev", radius: 8, instant: false }));
      const er = slotRect("eyeb-rev");
      if (er) setEyeb((e) => e && ({ ...e, left: er.left, top: er.top, fs: 9, ls: 0.28, rules: false, mode: "rev", dur: dv(TL.slide.d), instant: false }));
    } });
    ev.push({ t: TL.echo.s, run: () => { setPhase("echo"); setMounts((m) => ({ ...m, reading: false })); setEyeb((e) => e && ({ ...e, lensOn: true }));
      setActor((a) => a && ({ ...a, o: 0, oDur: 180, instant: false }));
    } });
    ev.push({ t: TL.pour.s, run: () => setPhase("pour") });
    const end = Math.max(TL.choose.s + TL.choose.d, TL.slide.s + TL.slide.d,
      TL.echo.s + TL.echo.d, TL.pour.s + TL.pour.d + 460);
    clock.run(ev, end, ffRef, () => { setPhase("reveal"); ffRef.current = 1; setFF(false);
      setEyeb((e) => e && ({ ...e, o: 0, oDur: 200 }));
    });
  };

  const release = (pour, kept) => {
    const from = phaseRef.current;
    if (from === "approach" || from === "release" || from === "reform") return;
    if (pour) savePull({ ts: Date.now(), card: cardRef.current, lens: lens ? lens.name : null, wine: pour.wine, kept });
    if (kept && pour) showToast("KEPT · " + pour.wine.toUpperCase());
    const TL = tRef.current.tlReturn;
    const ev = [];
    ev.push({ t: TL.release.s, run: () => { setPhase("release");
      setActor((a) => a && ({ ...a, o: 0, top: a.top + 36, dur: dv(TL.release.d), oDur: dv(TL.release.d), ease: E("easeRelease"), instant: false }));
      setEyeb((e) => e && ({ ...e, o: 0, dur: dv(TL.release.d), oDur: dv(TL.release.d), instant: false }));
    } });
    ev.push({ t: TL.reform.s, run: () => { setPhase("reform"); ffRef.current = 1; setFF(false);
      setMounts((m) => ({ ...m, reading: false, reveal: false }));
      setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
      setInvite(pickInvitation());
      const delay = Math.round(TL.reform.d * 0.3), drop = Math.round(TL.reform.d * 0.4);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const r = slotRectStatic("deck-top"); if (!r) return;
        setActor({ left: r.left, top: r.top - 42, width: r.width, ar: CARD_AR, rot: 0, flip: 0, o: 0, dur: 0, radius: 14, shadow: "sh-deck", instant: true });
        setTimeout(() => setActor((a) => a && ({ ...a, top: r.top, o: 1, dur: dv(drop), oDur: dv(Math.round(drop * 0.8)), ease: E("easeReform"), instant: false })), dv(delay));
      }));
    } });
    const end = Math.max(TL.release.s + TL.release.d, TL.reform.s + TL.reform.d);
    clock.run(ev, end, ffRef, () => setPhase("approach"));
  };

  const home = () => { if (phaseRef.current !== "approach") release(null, false); };

  const replay = () => {
    const p = phaseRef.current;
    if (!cardRef.current || p === "approach" || p === "reform") { showToast("PULL A CARD FIRST"); return; }
    const id = cardRef.current;
    clock.cancel();
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
    veilIn: ["bleed", "rest", "voice", "lenses", "reading", "choose", "slide", "echo", "pour", "reveal"].includes(phase),
    voiceIn: ["rest", "voice", "lenses", "reading"].includes(phase),
    lensesIn: ["lenses", "reading"].includes(phase),
    footIn: ["lenses", "reading"].includes(phase),
    choosing: ["choose", "slide", "echo", "pour", "reveal"].includes(phase),
    echoIn: ["echo", "pour", "reveal"].includes(phase),
    pourIn: ["pour", "reveal"].includes(phase),
    cardHandoff: ["echo", "pour", "reveal"].includes(phase),
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
    "--va-veil-edge": t.veilEdgeDesk + "%",
    "--va-deck-top": t.deckTop / 100,
    "--va-deck-w": t.deckW + "px", "--va-deck-w-desk": t.deckWDesk + "px",
    "--va-knowing-size": t.knowingSize + "px", "--va-lens-size": t.lensSize + "px", "--va-lens-pad": t.lensPad + "px",
    "--va-orbit-vh": t.orbitCardVh / 100, "--va-knowing-desk": t.knowingDesk + "px", "--va-shout": t.shoutSize + "px",
    "--vaH": vaH + "px",
    "--dUiExit": ms(t.dUiExit), "--dLift": ms(t.tlDraw.flip.d), "--dBleed": ms(t.tlDraw.bleed.d),
    "--dVoice": ms(t.tlDraw.voice.d), "--lensDur": ms(t.tlDraw.lenses.d),
    "--dChoose": ms(t.tlChoice.choose.d), "--dEcho": ms(t.tlChoice.echo.d), "--dPour": ms(t.tlChoice.pour.d),
    "--dRelease": ms(t.tlReturn.release.d),
    "--rv-shift": t.pourShift + "px",
    "--eBleed": easeCss(t.easeBleed), "--eVoice": easeCss(t.easeVoice), "--eLens": easeCss(t.easeLens),
    "--eEcho": easeCss(t.easeEcho), "--ePour": easeCss(t.easePour),
    "--eUiExit": easeCss(t.easeUiExit), "--eRelease": easeCss(t.easeRelease),
  };

  const orbitTuning = {
    on: t.orbFloat, amp: t.orbAmp, speed: t.orbSpeed, breath: t.orbBreath,
    radius: t.orbRadius, pull: t.orbPull, grow: t.orbGrow, spread: t.orbSpread,
  };

  const c = card ? ARCANA[card] : null;
  const face = c ? "assets/cards/" + c.file + ".png" : null;
  const vaCls = "va p-" + phase +
    (desktop ? " vw-desk" : "") + (phoneFrame ? " vw-phone" : "") +
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
      </svg>
      <div className={vaCls} style={phoneFrame ? { ...vars, width: "393px", height: "852px", flex: "none", transform: "scale(" + shellScale + ")" } : vars} ref={vaRef}>
        <div className={"rx " + (light ? "rx-light" : "rx-dark")}>
          {c ? (
            <div className={"va-veilwrap" + (F.veilIn ? " in" : "")}><div className="rx-veil"><img src={face} alt="" /></div></div>
          ) : null}
          <div className="rx-grain"></div>
          {F.echoIn || phase === "release" ? <div className="rv-glow"></div> : null}

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
          {transitional ? <div className="va-ff-catch" onPointerDown={hurry}></div> : null}

          <StatusBar light={light} onHome={home} onToast={showToast}></StatusBar>
          {toast ? <div className={"va-toast" + (light ? " light" : "")}>{toast}</div> : null}
        </div>
      </div>
      {phoneFrame ? <div className="va-frame-tag">393 × 852 · phone frame · tap mid-ritual to fast-forward</div> : null}

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
      <TweakTabs tabs={["Design", "Motion"]} value={tab} onChange={setTab}></TweakTabs>

      {tab === "Design" ? (
        <React.Fragment>
          <TweakFold key="d-stage" id="d-stage" label="Stage" hint="mode · viewport" defaultOpen={true}>
            <TweakRadio label="Field" value={t.mode} options={["night", "day"]} onChange={(v) => setTweak("mode", v)}></TweakRadio>
            <TweakRadio label="Viewport" value={t.viewport} options={["phone", "auto"]} onChange={(v) => setTweak("viewport", v)}></TweakRadio>
          </TweakFold>
          <TweakFold key="d-texture" id="d-texture" label="Texture" hint="grain · veil">
            <TweakSlider label="Grain scale" value={t.grainSize} min={120} max={600} step={10} unit="px" onChange={(v) => setTweak("grainSize", v)}></TweakSlider>
            <TweakSlider label="Grain · night" value={t.grainNight} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainNight", v)}></TweakSlider>
            <TweakSlider label="Grain · day" value={t.grainDay} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainDay", v)}></TweakSlider>
            <TweakSlider label="Veil · night" value={t.veilNight} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilNight", v)}></TweakSlider>
            <TweakSlider label="Veil · day" value={t.veilDay} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilDay", v)}></TweakSlider>
            <TweakSlider label="Vignette edge · desktop" value={t.veilEdgeDesk} min={70} max={120} step={1} unit="%" onChange={(v) => setTweak("veilEdgeDesk", v)}></TweakSlider>
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
          </TweakFold>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TweakFold key="m-play" id="m-play" label="Playback" defaultOpen={true}>
            <TweakButton label="Replay ritual" onClick={replay}></TweakButton>
            <TweakSlider label="Fast-forward ×" value={t.ffSpeed} min={1.5} max={12} step={0.5} onChange={(v) => setTweak("ffSpeed", v)}></TweakSlider>
          </TweakFold>
          <TweakFold key="m-draw" id="m-draw" label="The Draw" hint="deck → lenses" defaultOpen={true}>
            <StageMotion id="draw" beats={BEATS_DRAW} tlKey="tlDraw" t={t} setTweak={setTweak} tail={t.lensStep * 5}></StageMotion>
            <TweakSection label="Draw extras"></TweakSection>
            <TweakRadio label="UI exit" value={t.uiExit} options={["fade", "smoke"]} onChange={(v) => setTweak("uiExit", v)}></TweakRadio>
            <TweakSlider label="UI exit time" value={t.dUiExit} min={200} max={1400} step={20} unit="ms" onChange={(v) => setTweak("dUiExit", v)}></TweakSlider>
            <EasePicker label="UI exit curve" value={t.easeUiExit} onChange={(v) => setTweak("easeUiExit", v)}></EasePicker>
            <TweakSlider label="Optical centre" value={t.centerY} min={35} max={60} step={0.5} unit="%" onChange={(v) => setTweak("centerY", v)}></TweakSlider>
            <TweakSlider label="Bleed warp" value={t.bleedWarp} min={0} max={240} step={2} onChange={(v) => setTweak("bleedWarp", v)}></TweakSlider>
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

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
