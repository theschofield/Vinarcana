// FLOW v6 — DEEPER READING ("The Flip").
// The card's guidebook meaning lives on its BACK: on the Reading screen the
// resting card beckons with the DECK's own tilt-and-shine grammar, and
// tapping it flips it over and scales it up to the slab panel (deeper-v5
// geometry: the card's exact aspect, centered, radius 18). The Pour reaches
// the same panel through the CARD MEANING pill.
// · DeeperAffordance: an invisible hit surface over the resting card that
//   drives the CardActor's DOM directly (vars + classes, no re-renders —
//   the deck-tile recipe). Desktop hover = deck-tile hover; mobile touch =
//   press-down, flip on release. One-shot arrival hint: the card tilts and
//   catches the light as if a hand hovered over its bottom-right corner.
// · DeeperReading: the flip container itself — front face is the card,
//   back face is the guidebook slab. Rect/rotation/shadow morph from the
//   measured origin (read slot or Pour card) on the house flip curve.
// Content: window.GUIDES (arcana-guide.js). Cards without a guide never
// show the affordance.

// The deck's tilt vocabulary, deepened: deck tiles whisper at 9°/11°; the
// Reading card leans harder — it is ABOUT to be flipped, and the hand
// should feel it give.
const DR_TILT = { rx: 13, ry: 16 };
const DR_PANEL_AR = 2100 / 3600;    // width / height of the card face

function drPanelRect() {
  const S = vaSize();
  // center in the VISIBLE viewport, not the layout box: on the stages the
  // .va box is 100lvh + overshoot (taller than what iOS actually shows with
  // its chrome up), so centering on S.h sat the panel low and slid its foot
  // under the bottom bar. visualViewport.height is the real visible height
  // — a measurement, not a bottom-anchored element, so it cannot summon the
  // toolbar backdrop. (Stages sit at scroll 0, so viewport top == box top.)
  const vh = Math.min(S.h, (window.visualViewport && window.visualViewport.height) || window.innerHeight);
  const w = Math.min(0.872 * S.w, 0.83 * vh * DR_PANEL_AR);
  const h = w / DR_PANEL_AR;
  return { left: (S.w - w) / 2, top: (vh - h) / 2, width: w, height: h };
}

const DR_PANEL_SHADOW = {
  dark: "0 40px 110px -30px rgba(0,0,0,0.95), 0 12px 32px -14px rgba(0,0,0,0.72)",
  light: "0 40px 100px -28px rgba(21,34,49,0.55), 0 12px 30px -14px rgba(21,34,49,0.3)",
};
const DR_REST_SHADOW = {
  dark: "0 30px 64px -22px rgba(0, 0, 0, 0.88)",
  light: "0 30px 64px -22px rgba(21, 34, 49, 0.42)",
};

// ---------- the beckoning card ----------
function DeeperAffordance({ onOpen, hintArm, onHinted }) {
  const [rect, setRect] = React.useState(null);
  const hitRef = React.useRef(null);
  const pressRef = React.useRef(null);
  const hintTimers = React.useRef([]);
  const fine = React.useMemo(dkFinePointer, []);

  const actorEls = () => {
    const va = vaRoot(); if (!va) return {};
    const actor = va.querySelector(".va-card-actor");
    return { actor, flip: actor && actor.querySelector(".flip3d"), shdw: actor && actor.querySelector(".shdw") };
  };

  // one writer for the whole pose: tilt + lift + shine origin, with the
  // transition (duration AND curve) riding along so the shadow always
  // travels on the same clock as the card (the actor law)
  const setVars = ({ px, py, rx, ry, sc, ms, ease }) => {
    const { actor, flip, shdw } = actorEls(); if (!actor || !flip) return;
    const tf = "transform " + ms + "ms " + (ease || "cubic-bezier(0.2, 0.7, 0.3, 1)");
    flip.style.transition = tf;
    if (shdw) shdw.style.transition = "box-shadow " + ms + "ms " + (ease || "ease");
    actor.style.setProperty("--drx", rx.toFixed(2) + "deg");
    actor.style.setProperty("--dry", ry.toFixed(2) + "deg");
    actor.style.setProperty("--ds", String(sc));
    actor.style.setProperty("--dmx", (px * 100).toFixed(1) + "%");
    actor.style.setProperty("--dmy", (py * 100).toFixed(1) + "%");
  };

  // track the read slot (the affordance hugs the card through relayouts)
  React.useEffect(() => {
    const va = vaRoot(); if (!va) return;
    const el = va.querySelector('[data-va-slot="read-card"]'); if (!el) return;
    const sync = () => { const r = slotRect("read-card"); if (r) setRect(r); };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // interactive pose — signs calibrated for the pre-flipped card (flip3d
  // already carries rotateY(180)): the edge under the pointer lifts TOWARD
  // the viewer, exactly like a deck tile
  const setPose = (px, py, on, ms, ease) => {
    const { actor } = actorEls(); if (!actor) return;
    setVars({ px, py,
      rx: on ? -(py - 0.5) * DR_TILT.rx : 0,
      ry: on ? -(px - 0.5) * DR_TILT.ry : 0,
      sc: on ? 1.05 : 1, ms: ms || 200, ease });
    actor.style.setProperty("--dsh", on ? "1" : "0");
    actor.classList.toggle("dr-hov", !!on);
  };
  const clearAll = () => {
    hintTimers.current.forEach(clearTimeout); hintTimers.current = [];
    const { actor, flip, shdw } = actorEls(); if (!actor) return;
    ["--drx", "--dry", "--ds", "--dmx", "--dmy", "--dsh", "--dshDur",
      "--hrx", "--hry", "--hto"].forEach((v) => actor.style.removeProperty(v));
    if (hintPrevTr.current != null) { actor.style.transition = hintPrevTr.current; hintPrevTr.current = null; }
    actor.classList.remove("dr-hov", "dr-press");
    if (flip) flip.style.transition = "";
    if (shdw) shdw.style.transition = "";
  };

  // one-shot arrival hint: the bottom-right corner GENTLY RAISES, pivoting
  // from up near the OPPOSITE corner — a center pivot see-saws (raising one
  // corner sinks the other: the "rhombus" read). The raise lives on the
  // actor's OUTER element (--hrx/--hry/--hto; the inner flip3d carries the
  // 180° flip and can't change its origin), with a soft light catching the
  // lifting corner as it comes up. No scale swell, no shadow swap. One rise
  // on a house spring with a long settling tail, a short hold, one release.
  // Never loops; any real contact interrupts it.
  const hintPrevTr = React.useRef(null);
  // remove every hint fingerprint and give the actor its transition back;
  // ms > 0 defers the removal so an in-flight settle-out can land first
  const hintClear = (ms) => {
    const fin = () => {
      const a2 = actorEls().actor; if (!a2) return;
      ["--hrx", "--hry", "--dsh", "--dshDur", "--hto"].forEach((v) => a2.style.removeProperty(v));
      if (hintPrevTr.current != null) { a2.style.transition = hintPrevTr.current; hintPrevTr.current = null; }
    };
    if (ms) setTimeout(fin, ms); else fin();
  };
  // graceful out for interruptions: settle the raise flat, then clear
  const hintSettleOut = () => {
    const { actor } = actorEls();
    if (actor && hintPrevTr.current != null) {
      actor.style.transition = "transform 200ms ease";
      actor.style.setProperty("--hrx", "0deg");
      actor.style.setProperty("--hry", "0deg");
      actor.style.setProperty("--dshDur", "200ms");
      actor.style.setProperty("--dsh", "0");
      hintClear(220);
    }
  };
  React.useEffect(() => {
    if (!hintArm || !rect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onHinted(); return; }
    const T = hintTimers.current;
    const RISE = 950, HOLD = 300, BACK = 340, LEAD = 250;
    T.push(setTimeout(() => {
      const { actor } = actorEls(); if (!actor) return;
      if (hintPrevTr.current == null) hintPrevTr.current = actor.style.transition || "";
      actor.style.transition = "transform " + RISE + "ms " + easeCss({ p: "supple" });
      actor.style.setProperty("--hto", "14% 10%");   // pivot near the far corner
      actor.style.setProperty("--hrx", "8.5deg");    // bottom edge toward the viewer
      actor.style.setProperty("--hry", "-10.5deg");  // right edge toward the viewer
      actor.style.setProperty("--dmx", "88%");       // the light pools on the corner
      actor.style.setProperty("--dmy", "93%");
      actor.style.setProperty("--dshDur", RISE + "ms");
      actor.style.setProperty("--dsh", "0.8");
    }, LEAD));
    T.push(setTimeout(() => {
      const { actor } = actorEls(); if (!actor) return;
      actor.style.transition = "transform " + BACK + "ms " + easeCss({ p: "gentle" });
      actor.style.setProperty("--hrx", "0deg");
      actor.style.setProperty("--hry", "0deg");
      actor.style.setProperty("--dshDur", BACK + "ms");
      actor.style.setProperty("--dsh", "0");
    }, LEAD + RISE + HOLD));
    T.push(setTimeout(() => { hintClear(0); onHinted(); }, LEAD + RISE + HOLD + BACK + 60));
    return () => { T.forEach(clearTimeout); hintTimers.current = []; hintSettleOut(); };
  }, [!!rect, hintArm]);

  const interrupt = () => {
    if (!hintTimers.current.length) return;
    hintTimers.current.forEach(clearTimeout); hintTimers.current = [];
    hintSettleOut();
    onHinted();
  };

  // desktop: the deck-tile hover, verbatim feel
  const move = (e) => {
    if (!fine || !rect) return;
    interrupt();
    const r = e.currentTarget.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    setPose(px, py, true);
  };
  const leave = () => { if (fine) { interrupt(); setPose(0.5, 0.45, false); } };

  // mobile: press the card down on touch, flip on release
  const down = (e) => {
    if (fine) return;
    interrupt();
    pressRef.current = { x: e.clientX, y: e.clientY, on: true };
    const { actor } = actorEls(); if (!actor) return;
    actor.style.setProperty("--ds", "0.97");
    actor.classList.add("dr-press");
  };
  const cancelPress = () => {
    pressRef.current = null;
    const { actor } = actorEls(); if (!actor) return;
    actor.style.setProperty("--ds", "1");
    actor.classList.remove("dr-press");
  };
  const up = (e) => {
    if (fine) { interrupt(); setPose(0.5, 0.45, false, 160); onOpen(); return; }
    const p = pressRef.current;
    cancelPress();
    // the pose glides flat on the persistent actor while the flip container
    // decodes behind the scenes — no snap in the visible frame or two
    if (p && Math.abs(e.clientX - p.x) < 12 && Math.abs(e.clientY - p.y) < 12) { setPose(0.5, 0.45, false, 160); onOpen(); }
  };
  const moveTouch = (e) => {
    const p = pressRef.current; if (fine || !p) return;
    if (Math.abs(e.clientX - p.x) > 12 || Math.abs(e.clientY - p.y) > 12) cancelPress();
  };

  React.useEffect(() => () => clearAll(), []);

  if (!rect) return null;
  return (
    <div ref={hitRef} className="dr-hit"
      style={{ left: rect.left + "px", top: rect.top + "px", width: rect.width + "px", height: rect.height + "px" }}
      onPointerMove={(e) => { move(e); moveTouch(e); }} onPointerLeave={leave}
      onPointerDown={down} onPointerUp={up} onPointerCancel={cancelPress}></div>
  );
}

// ---------- the flip ----------
function DeeperReading({ card, src, light, flipDur, flipEase, rPct, onClosed }) {
  const guide = window.GUIDES && GUIDES[card];
  const c = ARCANA[card];
  const face = "assets/cards/" + c.file + ".webp";
  const [inCls, setInCls] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [atEnd, setAtEnd] = React.useState(false);
  const flipRef = React.useRef(null);
  const flipperRef = React.useRef(null);
  const shdwRef = React.useRef(null);
  const stageRef = React.useRef("opening");
  const originRef = React.useRef(null);

  const originPose = () => {
    const slot = src === "pour" ? "reveal-card" : "read-card";
    const r = slotRect(slot);
    if (!r) return null;
    const va = vaRoot();
    // carry the EXACT rendered shadow of the card being replaced, so the
    // same-frame takeover is invisible (one-shadow law)
    let shadow = DR_REST_SHADOW[light ? "light" : "dark"];
    const el = va && (src === "pour"
      ? [...va.querySelectorAll(".rv-hero .card")].find((x) => x.offsetParent)
      : va.querySelector(".va-card-actor .shdw"));
    if (el) { const bs = getComputedStyle(el).boxShadow; if (bs && bs !== "none") shadow = bs; }
    return { r, rot: src === "pour" ? -4 : 0,
      radius: src === "pour" ? 8 : r.width * (rPct || 5.3) / 100, shadow };
  };

  const apply = (el, pose, radius, rot) => {
    el.style.left = pose.left + "px"; el.style.top = pose.top + "px";
    el.style.width = pose.width + "px"; el.style.height = pose.height + "px";
    el.style.borderRadius = radius + "px";
    el.style.transform = "rotate(" + rot + "deg)";
  };

  React.useLayoutEffect(() => {
    const flip = flipRef.current, flipper = flipperRef.current, shdw = shdwRef.current;
    const o = originPose();
    if (!flip || !flipper || !o) { onClosed(); return; }
    originRef.current = o;
    // the content is laid out at its FINAL size before the first paint —
    // the growing card only ever masks it, so the text never reflows
    const t = drPanelRect();
    flip.style.setProperty("--drPW", t.width + "px");
    flip.style.setProperty("--drPH", t.height + "px");
    flip.style.transition = "none"; flipper.style.transition = "none"; shdw.style.transition = "none";
    flip.style.opacity = "0";  // invisible until the face has DECODED
    apply(flip, o.r, o.radius, o.rot);
    shdw.style.boxShadow = o.shadow;
    flipper.style.transform = "rotateY(0deg)";
    // scrim + veil raise can start immediately (no decode dependency)
    const va = vaRoot(); if (va) va.classList.add("dr-veil-up");
    setInCls(true);
    // DECODE GATE: the real card stays visible until the container's face
    // img is actually paintable — iOS blanks fresh <img>s while decoding,
    // and swapping on the mount frame left a card-shaped hole on device
    let dead = false;
    const img = flip.querySelector(".dr-face img");
    const decoded = img && img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    Promise.race([decoded, new Promise((r) => setTimeout(r, 250))]).then(() => {
      if (dead) return;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (dead) return;
        // same-frame swap: container becomes visible as the originals hide
        if (va) va.classList.add("dr-swap");
        flip.style.opacity = "1";
        // the Approach flip's vocabulary: rect, rotation and shadow all
        // ride the flip beat's own duration and curve, together
        const tr = "left DURms EASE, top DURms EASE, width DURms EASE, height DURms EASE, border-radius DURms EASE, transform DURms EASE"
          .replace(/DUR/g, flipDur).replace(/EASE/g, flipEase);
        flip.style.transition = tr;
        flipper.style.transition = "transform " + flipDur + "ms " + flipEase;
        shdw.style.transition = "box-shadow " + flipDur + "ms " + flipEase;
        apply(flip, t, 18, 0);
        shdw.style.boxShadow = DR_PANEL_SHADOW[light ? "light" : "dark"];
        // continue the hinted motion: the lifted right corner keeps coming
        // toward the viewer and the card turns over to the LEFT
        flipper.style.transform = "rotateY(-180deg)";
        setShown(true);
        setTimeout(() => { if (stageRef.current === "opening") stageRef.current = "open"; }, flipDur + 60);
      }));
    });
    return () => { dead = true; };
  }, []);

  // neither the veil raise nor the card swap may outlive the layer
  // (release-path unmounts skip close(); the unmount commit restores the
  // real card in the same frame the container disappears)
  React.useEffect(() => () => { const va = vaRoot(); if (va) { va.classList.remove("dr-veil-up"); va.classList.remove("dr-swap"); } }, []);

  const close = () => {
    if (stageRef.current === "closing") return;
    stageRef.current = "closing";
    const flip = flipRef.current, flipper = flipperRef.current, shdw = shdwRef.current;
    const o = originPose() || originRef.current;
    // scrim and veil raise release TOGETHER on the close's first beat —
    // holding the raise until unmount left the background briefly brighter
    // than rest, then dimming after the card settled
    const va = vaRoot(); if (va) va.classList.remove("dr-veil-up");
    setInCls(false); setShown(false);
    if (flip && flipper && o) {
      apply(flip, o.r, o.radius, o.rot);
      if (shdw) shdw.style.boxShadow = o.shadow;
      flipper.style.transform = "rotateY(0deg)";
      setTimeout(onClosed, flipDur + 60);
    } else { onClosed(); }
  };

  const onScroll = (e) => {
    const el = e.currentTarget;
    setScrolled(el.scrollTop > 4);
    setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
  };

  if (!guide) return null;
  const kws = guide.keywords || [];
  return (
    <div className={"va-layer dr-layer" + (inCls ? " in" : "")} data-screen-label="Flow — Deeper Reading">
      <div className="gp-scrim" onClick={close}></div>
      <div ref={flipRef} className={"dr-flip" + (shown ? " shown" : "")}>
        <div ref={flipperRef} className="dr-flipper">
          <div ref={shdwRef} className="shdw"></div>
          <div className="dr-face"><img src={face} alt="" draggable={false} decoding="sync" /></div>
          <div className="dr-back">
            <div className="rx-grain"></div>
            <div className="dr-panelfix" style={{ transitionDelay: shown ? Math.round(flipDur * 0.42) + "ms" : "0ms" }}>
            <div className={"dr5-xfloat" + (scrolled ? " scrolled" : "")} onClick={close}>
              <span className="halo"><span className="rx-grain"></span></span>
              <div className="gp-x">✕</div>
            </div>
            <div className={"dr-scroll" + (scrolled ? " scrolled" : "") + (atEnd ? " at-end" : "")} onScroll={onScroll}>
              <div className="gp-head">
                <div className="gp-eyebrow-row">
                  <div className="gp-eyebrow">{(guide.surface || "The Guidebook").toUpperCase()}</div>
                  <div className="gp-x">✕</div>
                </div>
                <div className="gp-title">{c.num} · {c.name}</div>
                <div className="gp-kwline">
                  {kws.map((k, i) => (
                    <React.Fragment key={k}>
                      {i > 0 ? <span className="sep"></span> : null}
                      <span className="kwu">{k}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="gp-body">
                <div className="gp-label"><span className="rule"></span><span className="txt">{guide.meaning.label}</span></div>
                {guide.meaning.paras.map((p, i) => <p key={i} className="gp-para">{p}</p>)}
                <div className="gp-label"><span className="rule"></span><span className="txt">{guide.reading.label}</span></div>
                {guide.reading.paras.map((p, i) => <p key={i} className="gp-para">{p}</p>)}
                {guide.closing ? (
                  <React.Fragment>
                    <div className="gp-label"><span className="rule"></span><span className="txt">{guide.closing.label}</span></div>
                    <p className="gp-para">{guide.closing.para}</p>
                  </React.Fragment>
                ) : null}
                <div className="gp-closing">
                  <div className="gp-close-line">Turn toward the one that knows you.</div>
                  <div className="gp-close-btn" onClick={close}>TURN THE CARD BACK</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DeeperAffordance, DeeperReading });
