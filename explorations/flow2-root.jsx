// FLOW v2 — root App: the choreography state machine.
// Phases: approach → pull → lift → drop → settle → bleed → rest → voice →
// lenses → reading → choose → slide → echo → pour → reveal → release → reform → approach.
// One CardActor + one EyebrowActor persist across all of it.

const FLOW2_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "night", "viewport": "phone", "uiExit": "fade",
  "grainSize": 260, "grainNight": 0.18, "grainDay": 0.16, "veilNight": 0.11, "veilDay": 0.09,
  "deckTop": 18, "deckW": 190, "deckWDesk": 250, "knowingSize": 22, "lensSize": 17, "lensPad": 12,
  "orbitCardVh": 52, "knowingDesk": 26.5, "lensFlare": false, "shoutSize": 56,
  "centerY": 47, "bleedWarp": 140,
  "dPull": 480, "dUiExit": 620, "dLift": 950, "dSettle": 580, "dBleed": 3500, "dRest": 480, "dVoice": 440,
  "lensStep": 140, "lensDur": 430, "dChoose": 450, "dSlide": 740, "dEcho": 640, "dPour": 640,
  "dRelease": 575, "dReform": 1300, "ffSpeed": 4
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(FLOW2_DEFAULTS);
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
  const seq = useSequencer();

  const spd = ff ? t.ffSpeed : 1;
  const dv = (k) => tRef.current[k] / (ffRef.current > 1 ? ffRef.current : 1); // css-side dur at move time
  const D = (k) => tRef.current[k]; // runner divides by ffRef itself

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  // ---------- actor placement ----------
  // Deck placement uses STATIC offset measurement (slotRectStatic) — immune to
  // the reform drop-in animation's translate, which poisons bounding-box reads.
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

  // fonts + full page load shift layout after first paint — re-place when settled
  React.useEffect(() => {
    let alive = true;
    const bump = () => { if (alive) setFontsTick((n) => n + 1); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(bump);
    window.addEventListener("load", bump);
    return () => { alive = false; window.removeEventListener("load", bump); };
  }, []);

  // phone frame renders at a true 393×852 and scales to fit the window height
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

  // re-place the idle actor AFTER the render that applies --vaH / viewport changes,
  // so slot measurements reflect the final layout (never stale defaults).
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const p = phaseRef.current;
      if (p === "approach") placeOnDeck(true);
      if (p === "reading") placeOnReadSlot(true);
    });
    return () => cancelAnimationFrame(id);
  }, [phase, vaH, phoneFrame, desktop, shellScale, fontsTick, t.deckW, t.deckWDesk, t.deckTop]);

  // any size change of the deck slot itself (image decode, var tweak, font reflow)
  // re-places the idle actor — catches every layout-shift cause at the source
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
    seq.run([
      { run: () => { setPhase("pull");
          const r = slotRect("deck-top");
          if (r) setActor((a) => ({ ...a, top: r.top + r.height * 0.5, rot: -3, dur: dv("dPull"), ease: "cubic-bezier(0.3, 0.7, 0.25, 1)", shadow: "sh-air", instant: false }));
        }, dur: () => D("dPull") },
      { run: () => { setPhase("lift"); setMounts((m) => ({ ...m, reading: true }));
          const S = vaSize(); const w = Math.min(S.w * 0.62, 300); const ar = faceARRef.current;
          const cy = S.h * (tRef.current.centerY / 100);
          setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0, flip: 180,
            dur: dv("dLift") * 0.55, flipDur: dv("dLift"), ease: "cubic-bezier(0.3, 0.6, 0.2, 1)", instant: false }));
        }, dur: () => D("dLift") * 0.55 },
      { run: () => setPhase("drop"), dur: () => D("dLift") * 0.45 },
      { run: () => { setPhase("settle");
          // the card falls to the table at the optical centre, slightly larger than rest size
          const S = vaSize(); const r = slotRect("read-card");
          const ar = r ? r.height / r.width : faceARRef.current;
          const w = r ? Math.min(r.width * 1.16, S.w * 0.58) : S.w * 0.5;
          const cy = S.h * (tRef.current.centerY / 100);
          setActor((a) => ({ ...a, left: S.w / 2 - w / 2, top: cy - (w * ar) / 2, width: w, ar, rot: 0,
            dur: dv("dSettle"), ease: "cubic-bezier(0.3, 1.16, 0.35, 1)", shadow: "sh-rest", radius: 9, instant: false }));
        }, dur: () => D("dSettle") },
      { run: () => { setPhase("bleed");
          // the veil starts bleeding (long, ~2s) but the sequence moves on — it never holds the card up
          const r = slotRect("eyeb-read");
          if (r) { setEyeb({ left: r.left, top: r.top, fs: 9.5, ls: 0.3, o: 0, dur: 0, rules: true, lensOn: false, mode: "read", instant: true });
            requestAnimationFrame(() => requestAnimationFrame(() =>
              setEyeb((e) => e && ({ ...e, o: 1, dur: 650, oDur: 650, instant: false })))); }
        }, dur: () => Math.min(420, D("dBleed") * 0.2) },
      { run: () => { setPhase("rest");
          // glide UP from the table into the reading position while the voice fades in
          const r = slotRect("read-card");
          if (r) setActor((a) => ({ ...a, left: r.left, top: r.top, width: r.width, ar: r.height / r.width, dur: dv("dRest"), ease: "cubic-bezier(0.3, 0.7, 0.2, 1)", instant: false }));
        }, dur: () => D("dRest") },
      { run: () => setPhase("voice"), dur: () => D("dVoice") },
      { run: () => setPhase("lenses"), dur: () => D("lensDur") + D("lensStep") * 5 },
      { run: () => { setPhase("reading"); ffRef.current = 1; setFF(false); } },
    ], ffRef);
  };

  const pick = (l) => {
    if (phaseRef.current !== "reading") return;
    setLens(l); setPicked(l.n);
    seq.run([
      { run: () => { setPhase("choose"); setMounts((m) => ({ ...m, reveal: true })); }, dur: () => D("dChoose") },
      { run: () => { setPhase("slide");
          const r = slotRect("reveal-card");
          if (r) setActor((a) => ({ ...a, left: r.left, top: r.top, width: r.width, ar: r.height / r.width, rot: -4,
            dur: dv("dSlide"), ease: "cubic-bezier(0.35, 0.7, 0.25, 1)", shadow: "sh-rev", radius: 8, instant: false }));
          const er = slotRect("eyeb-rev");
          if (er) setEyeb((e) => e && ({ ...e, left: er.left, top: er.top, fs: 9, ls: 0.28, rules: false, mode: "rev", dur: dv("dSlide"), instant: false }));
        }, dur: () => D("dSlide") },
      { run: () => { setPhase("echo"); setMounts((m) => ({ ...m, reading: false })); setEyeb((e) => e && ({ ...e, lensOn: true }));
          // the card is at rest — hand off to the in-pane card NOW so the bottle layers in front of it
          setActor((a) => a && ({ ...a, o: 0, oDur: 180, instant: false }));
        }, dur: () => D("dEcho") },
      { run: () => setPhase("pour"), dur: () => D("dPour") + 460 },
      { run: () => { setPhase("reveal"); ffRef.current = 1; setFF(false);
          setEyeb((e) => e && ({ ...e, o: 0, oDur: 200 }));
        } },
    ], ffRef);
  };

  const release = (pour, kept) => {
    const from = phaseRef.current;
    if (from === "approach" || from === "release" || from === "reform") return;
    if (pour) savePull({ ts: Date.now(), card: cardRef.current, lens: lens ? lens.name : null, wine: pour.wine, kept });
    if (kept && pour) showToast("KEPT · " + pour.wine.toUpperCase());
    seq.run([
      { run: () => { setPhase("release");
          setActor((a) => a && ({ ...a, o: 0, top: a.top + 36, dur: dv("dRelease"), oDur: dv("dRelease"), ease: "ease", instant: false }));
          setEyeb((e) => e && ({ ...e, o: 0, dur: dv("dRelease"), oDur: dv("dRelease"), instant: false }));
        }, dur: () => D("dRelease") },
      { run: () => { setPhase("reform"); ffRef.current = 1; setFF(false);
          setMounts((m) => ({ ...m, reading: false, reveal: false }));
          setCard(null); setLens(null); setPicked(null); setWhisper(""); setWhispered(false);
          setInvite(pickInvitation());
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const r = slotRectStatic("deck-top"); if (!r) return;
            setActor({ left: r.left, top: r.top - 42, width: r.width, ar: CARD_AR, rot: 0, flip: 0, o: 0, dur: 0, radius: 14, shadow: "sh-deck", instant: true });
            setTimeout(() => setActor((a) => a && ({ ...a, top: r.top, o: 1, dur: 520, oDur: 420, ease: "cubic-bezier(0.2, 0.8, 0.25, 1.06)", instant: false })), 400 / (ffRef.current > 1 ? ffRef.current : 1));
          }));
        }, dur: () => D("dReform") },
      { run: () => setPhase("approach") },
    ], ffRef);
  };

  const home = () => { if (phaseRef.current !== "approach") release(null, false); };

  const replay = () => {
    const p = phaseRef.current;
    if (!cardRef.current || p === "approach" || p === "reform") { showToast("PULL A CARD FIRST"); return; }
    const id = cardRef.current;
    seq.cancel();
    setPhase("approach"); setMounts({ approach: true, reading: false, reveal: false });
    setLens(null); setPicked(null); setEyeb(null); setCard(id);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      placeOnDeck(true);
      setTimeout(() => runDraw(id), 380);
    }));
  };

  const hurry = () => { ffRef.current = tRef.current.ffSpeed; setFF(true); seq.hurry(); };

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
  const ms = (k) => Math.round(t[k] / spd) + "ms";
  const vars = {
    "--va-grain-size": t.grainSize + "px",
    "--va-grain-o-dark": t.grainNight, "--va-grain-o-light": t.grainDay,
    "--va-veil-o-dark": t.veilNight, "--va-veil-o-light": t.veilDay,
    "--va-deck-top": t.deckTop / 100,
    "--va-deck-w": t.deckW + "px", "--va-deck-w-desk": t.deckWDesk + "px",
    "--va-knowing-size": t.knowingSize + "px", "--va-lens-size": t.lensSize + "px", "--va-lens-pad": t.lensPad + "px",
    "--va-orbit-vh": t.orbitCardVh / 100, "--va-knowing-desk": t.knowingDesk + "px", "--va-shout": t.shoutSize + "px",
    "--vaH": vaH + "px",
    "--dUiExit": ms("dUiExit"), "--dLift": ms("dLift"), "--dBleed": ms("dBleed"), "--dVoice": ms("dVoice"),
    "--lensDur": ms("lensDur"), "--dChoose": ms("dChoose"), "--dEcho": ms("dEcho"), "--dPour": ms("dPour"),
    "--dRelease": ms("dRelease"),
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
          {/* Approach stays mounted (visibility-hidden) so its images never re-decode on return */}
          {mounts.reading && card ? (
            <Reading card={card} light={light} whispered={whispered} flare={t.lensFlare}
              desktop={desktop} F={F} onPick={pick} lensStep={t.lensStep} spd={spd}></Reading>
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

      <TweaksPanel>
        <TweakSection label="Mode"></TweakSection>
        <TweakRadio label="Field" value={t.mode} options={["night", "day"]} onChange={(v) => setTweak("mode", v)}></TweakRadio>
        <TweakRadio label="Viewport" value={t.viewport} options={["phone", "auto"]} onChange={(v) => setTweak("viewport", v)}></TweakRadio>
        <TweakSection label="Choreography"></TweakSection>
        <TweakButton label="Replay ritual" onClick={replay}></TweakButton>
        <TweakSlider label="Fast-forward ×" value={t.ffSpeed} min={1.5} max={12} step={0.5} onChange={(v) => setTweak("ffSpeed", v)}></TweakSlider>
        <TweakRadio label="UI exit" value={t.uiExit} options={["fade", "smoke"]} onChange={(v) => setTweak("uiExit", v)}></TweakRadio>
        <TweakSection label="Beats · the draw"></TweakSection>
        <TweakSlider label="Optical centre" value={t.centerY} min={35} max={60} step={0.5} unit="%" onChange={(v) => setTweak("centerY", v)}></TweakSlider>
        <TweakSlider label="Pull" value={t.dPull} min={200} max={1400} step={20} unit="ms" onChange={(v) => setTweak("dPull", v)}></TweakSlider>
        <TweakSlider label="UI exit" value={t.dUiExit} min={200} max={1400} step={20} unit="ms" onChange={(v) => setTweak("dUiExit", v)}></TweakSlider>
        <TweakSlider label="Lift + flip" value={t.dLift} min={400} max={2200} step={25} unit="ms" onChange={(v) => setTweak("dLift", v)}></TweakSlider>
        <TweakSlider label="Settle" value={t.dSettle} min={200} max={1400} step={20} unit="ms" onChange={(v) => setTweak("dSettle", v)}></TweakSlider>
        <TweakSlider label="Veil bleed" value={t.dBleed} min={500} max={5000} step={50} unit="ms" onChange={(v) => setTweak("dBleed", v)}></TweakSlider>
        <TweakSlider label="Bleed warp" value={t.bleedWarp} min={0} max={240} step={2} onChange={(v) => setTweak("bleedWarp", v)}></TweakSlider>
        <TweakSlider label="Rest glide" value={t.dRest} min={200} max={1200} step={20} unit="ms" onChange={(v) => setTweak("dRest", v)}></TweakSlider>
        <TweakSlider label="Voice in" value={t.dVoice} min={200} max={1200} step={20} unit="ms" onChange={(v) => setTweak("dVoice", v)}></TweakSlider>
        <TweakSlider label="Lens fade" value={t.lensDur} min={150} max={1000} step={10} unit="ms" onChange={(v) => setTweak("lensDur", v)}></TweakSlider>
        <TweakSlider label="Lens stagger" value={t.lensStep} min={0} max={400} step={10} unit="ms" onChange={(v) => setTweak("lensStep", v)}></TweakSlider>
        <TweakSection label="Beats · the choice"></TweakSection>
        <TweakSlider label="Lenses out" value={t.dChoose} min={150} max={1200} step={20} unit="ms" onChange={(v) => setTweak("dChoose", v)}></TweakSlider>
        <TweakSlider label="Card slide" value={t.dSlide} min={300} max={1600} step={20} unit="ms" onChange={(v) => setTweak("dSlide", v)}></TweakSlider>
        <TweakSlider label="Echo + bottle" value={t.dEcho} min={250} max={1400} step={25} unit="ms" onChange={(v) => setTweak("dEcho", v)}></TweakSlider>
        <TweakSlider label="Pour cascade" value={t.dPour} min={250} max={1400} step={25} unit="ms" onChange={(v) => setTweak("dPour", v)}></TweakSlider>
        <TweakSection label="Beats · the return"></TweakSection>
        <TweakSlider label="Release" value={t.dRelease} min={250} max={1400} step={25} unit="ms" onChange={(v) => setTweak("dRelease", v)}></TweakSlider>
        <TweakSlider label="Reform" value={t.dReform} min={400} max={2200} step={25} unit="ms" onChange={(v) => setTweak("dReform", v)}></TweakSlider>
        <TweakSection label="Texture"></TweakSection>
        <TweakSlider label="Grain scale" value={t.grainSize} min={120} max={600} step={10} unit="px" onChange={(v) => setTweak("grainSize", v)}></TweakSlider>
        <TweakSlider label="Grain · night" value={t.grainNight} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainNight", v)}></TweakSlider>
        <TweakSlider label="Grain · day" value={t.grainDay} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainDay", v)}></TweakSlider>
        <TweakSlider label="Veil · night" value={t.veilNight} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilNight", v)}></TweakSlider>
        <TweakSlider label="Veil · day" value={t.veilDay} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilDay", v)}></TweakSlider>
        <TweakSection label="Approach"></TweakSection>
        <TweakSlider label="Deck top" value={t.deckTop} min={2} max={26} step={0.5} unit="%" onChange={(v) => setTweak("deckTop", v)}></TweakSlider>
        <TweakSlider label="Deck width · mobile" value={t.deckW} min={160} max={340} step={2} unit="px" onChange={(v) => setTweak("deckW", v)}></TweakSlider>
        <TweakSlider label="Deck width · desktop" value={t.deckWDesk} min={200} max={360} step={2} unit="px" onChange={(v) => setTweak("deckWDesk", v)}></TweakSlider>
        <TweakSection label="Reading · mobile"></TweakSection>
        <TweakSlider label="Voice size" value={t.knowingSize} min={16} max={28} step={0.5} unit="px" onChange={(v) => setTweak("knowingSize", v)}></TweakSlider>
        <TweakSlider label="Lens size" value={t.lensSize} min={14} max={22} step={0.5} unit="px" onChange={(v) => setTweak("lensSize", v)}></TweakSlider>
        <TweakSlider label="Lens padding" value={t.lensPad} min={6} max={20} step={1} unit="px" onChange={(v) => setTweak("lensPad", v)}></TweakSlider>
        <TweakSection label="Reading · desktop (orbit)"></TweakSection>
        <TweakSlider label="Card height" value={t.orbitCardVh} min={36} max={68} step={1} unit="vh" onChange={(v) => setTweak("orbitCardVh", v)}></TweakSlider>
        <TweakSlider label="Voice size" value={t.knowingDesk} min={18} max={32} step={0.5} unit="px" onChange={(v) => setTweak("knowingDesk", v)}></TweakSlider>
        <TweakToggle label="Anti-lens-flare" value={t.lensFlare} onChange={(v) => setTweak("lensFlare", v)}></TweakToggle>
        <TweakSection label="Reveal · desktop"></TweakSection>
        <TweakSlider label="Shout size" value={t.shoutSize} min={31} max={80} step={1} unit="px" onChange={(v) => setTweak("shoutSize", v)}></TweakSlider>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
