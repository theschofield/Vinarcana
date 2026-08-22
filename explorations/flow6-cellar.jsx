// FLOW v6 — THE CELLAR (sprint 1: the manual-only rack).
// Canon: "Cellar - Final.html" boards (flow6-cellar.css lifts the values
// verbatim; cellar-plan §1 conversions applied). The three screens —
// rack, detail, form — are SCROLL OWNERS on the Memory recipe (doc-flow
// rules in flow6-docflow.css); row → detail is a push within the view,
// not a choreography beat (v1, the brief's law).
// · Data rides window.CellarStore (cellar-store.js) — the storage seam.
// · The count sheet is EXPERIMENT E-A (cellar-plan §5.6, D2): strictly
//   transient, genuinely bottom-anchored, unmounted after close.
// · The Cellar UI NEVER shows pairings — hard product law.
// · Every wine renders through the shared wine surfaces (wine-surfaces.jsx,
//   D24): wineView() is the one derivation, WineHero/WineNameBlock/
//   WineStats/WineScales/WineWindow/WineBottle the one dress.
// · Analytics (D13, docs/analytics.md): cellar_added at the manual-add
//   commit, cellar_count on stepper confirms — through the vaTrack guard
//   pattern; analytics missing must cost the cellar nothing.

const vaTrackCel = (ev, props) => { try { if (window.VAAnalytics) VAAnalytics.track(ev, props); } catch (e) {} };

// ---------- icons (canvas vocabulary) ----------
function CelPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
function CelMinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
function CelBackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 6 8.5 12 14.5 18"></polyline>
    </svg>
  );
}
function CelChevDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9.5 12 15.5 18 9.5"></polyline>
    </svg>
  );
}
function CelWave() {
  return (
    <svg viewBox="0 0 120 10" preserveAspectRatio="none">
      <path d="M2 5.5 C 25 2.5, 48 6.5, 70 4.5 S 108 3, 118 4.8"></path>
    </svg>
  );
}

function CelPenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  );
}

// ---------- photo intake (S2, R3: native input — no custom camera) ----------
// The browser's own decode applies EXIF orientation (iOS 13.4+ default),
// so drawing to a canvas normalizes rotation AND format (HEIC from the
// library re-encodes too): ≤1280px longest edge, JPEG q0.8 — the ~150-250KB
// the extract function expects. The blob is the retention-law artifact
// (kept ONLY if the record lands manual+unmatched); the dataUrl rides the
// pipeline request and dies with it.
function cellarProcessPhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, 1280 / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const cv = document.createElement("canvas");
        cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        cv.toBlob((blob) => {
          if (!blob) { reject(new Error("encode")); return; }
          const rd = new FileReader();
          rd.onload = () => resolve({ blob, dataUrl: rd.result });
          rd.onerror = () => reject(new Error("read"));
          rd.readAsDataURL(blob);
        }, "image/jpeg", 0.8);
      } catch (e) { reject(e); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("decode")); };
    img.src = url;
  });
}

// pipeline calls carry the analytics install id — the per-install quota
// key (cellar-plan §8.13: today's quota seam is tomorrow's entitlement
// meter). Analytics missing must cost the cellar nothing, as ever.
const celInstallId = () => { try { return (window.VAAnalytics && VAAnalytics.install) || null; } catch (e) { return null; } };

// the identify stage's honest lines (voice copy for Ed's S2 review)
const CEL_FAIL_LINES = {
  offline: "No connection to your cellar right now",
  disabled: "The reader is resting",
  quota: "The reader needs a breath · try again soon",
  error: "The label kept its secrets",
};

// ---------- display helpers (wine derivations live in wine-surfaces.jsx) ----------
const celAddedLabel = (ts) => new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric" });
// beat-time scroll-home guard (the sanctioned belt-and-braces pattern —
// never a standing keeper): Safari's focus-reveal can nudge the document
// into its overshoot slack and leave it there (the stranded-layout half
// of the zoom bug); one-shot restores at gesture/transition beats only
const celScrollHome = () => { if (window.scrollY > 1) window.scrollTo(0, 0); };
// THE FOCUS CONTRACT (Ed's device verdict, round 2): while a field is
// focused, Safari's own keyboard reveal OWNS the scroll — it places the
// input at the optimal point and we never fight it (the round-1 guard
// snapped the form back down and buried the dropdown behind the chrome).
// The document comes home only when focus LEAVES the form: blur-out,
// dropdown close, or a push away from the screen.
// the restore is a GLIDE, not a teleport (Ed, round 3: Safari's own
// keyboard-dismiss settle followed by an instant scrollTo read as a
// harsh jump). First-frame-clocked ease, the root glideScrollTop's
// recipe; the 320ms lead lets Safari finish its own settle first.
// ONE glide settles everything at once: the document's stranded px AND
// the scroller's beyond-max over-scroll (Safari lets a scroller run past
// its resting max while the keyboard is up, then clamps it back in a
// separate animation — the "second movement" of rounds 4-5; gliding it
// ourselves in the same motion preempts the clamp entirely).
const celGlideHome = () => {
  const y0 = window.scrollY;
  const sc = document.querySelector(".cf-form .cf-scroll, .cf-form .ca-formcol");
  const over0 = sc ? Math.max(0, sc.scrollTop - Math.max(0, sc.scrollHeight - sc.clientHeight)) : 0;
  const st0 = sc ? sc.scrollTop : 0;
  if (y0 < 2 && over0 < 2) return;
  let t0 = null;
  const D = 260;
  const step = (now) => {
    if (t0 == null) t0 = now;
    const u = Math.min(1, (now - t0) / D);
    const e = 1 - Math.pow(1 - u, 3);
    if (y0 >= 2) window.scrollTo(0, Math.round(y0 * (1 - e)));
    if (sc && over0 >= 2) sc.scrollTop = Math.round(st0 - over0 * e);
    if (u < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const celRestoreOnLeave = () => setTimeout(() => {
  const a = document.activeElement;
  if (!a || a.tagName !== "INPUT") celGlideHome();
}, 320);
const celCountLine = (wines, bottles) =>
  wines + (wines === 1 ? " wine · " : " wines · ") + bottles + (bottles === 1 ? " bottle sleeping" : " bottles sleeping");

// the kept label photo (detail; manual+unmatched records only) — the blob
// comes out of the IndexedDB sidecar and rides the decode gate like every
// other image swap (iOS blanks fresh <img>s)
function CelPhotoStrip({ recId }) {
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => {
    let alive = true, obj = null;
    CellarPhotos.get(recId).then((blob) => {
      if (alive && blob) { obj = URL.createObjectURL(blob); setUrl(obj); }
    }).catch(() => {});
    return () => { alive = false; if (obj) URL.revokeObjectURL(obj); };
  }, [recId]);
  return (
    <div className="cd-photo">
      <span className="ph">{url ? <WineBottle src={url}></WineBottle> : null}</span>
      <div className="tx">Your label photo · kept with the bottle<br />because this entry is yours alone</div>
    </div>
  );
}

// window status chip: READY renders NOTHING on rows (canvas law)
function CelWin({ w }) {
  if (!w || w.status === "ready") return null;
  const cls = cellarWinClass(w.status);
  return <span className={"cl-win " + cls}><span className="dot"></span>{w.status === "fading" ? "DRINK SOON" : "RESTING"}</span>;
}

// ---------- the combobox (pick-only; typing alone commits nothing) ----------
// Long lists narrow as you type; a TAP confirms. Grapes land as removable
// chips (multi; blends = several); an unlisted grape can be committed
// explicitly ("Use …") — it renders on the record but never becomes a
// filter facet (sanitized sorting, the brief's open-Q9 resolution).
function CelCombo({ k, label, full, list, value, chips, otherChips, allowOther, active, onOpen, onClose, onPick, onUnpick, note }) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef(null);
  const fieldRef = React.useRef(null);
  React.useEffect(() => { if (active) setQ(""); }, [active]);
  const open = (ev) => {
    ev.stopPropagation();
    // flushSync so the input exists inside the tap gesture — mobile
    // Safari only raises the keyboard for focus() run synchronously.
    // No scroll assistance and no guards here: the native focus-reveal
    // owns placement while the field is up (the focus contract above).
    ReactDOM.flushSync(() => onOpen(k));
    if (inputRef.current) inputRef.current.focus();
  };
  // accent-blind narrowing: "sem" must find Sémillon, "gruner" Grüner
  const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const qn = fold(q.trim());
  let rows = [];
  if (active) {
    const starts = list.filter((x) => fold(x).startsWith(qn));
    const holds = qn ? list.filter((x) => !fold(x).startsWith(qn) && fold(x).includes(qn)) : [];
    // every match, uncapped — the overlay scrolls past ~3.5 rows, so the
    // whole list is browsable before typing anything (Ed's device pass)
    rows = [...starts, ...holds].filter((x) => !(chips || []).includes(x));
  }
  const exact = list.some((x) => fold(x) === qn);
  const showOther = allowOther && qn.length >= 2 && !exact;
  const mark = (x) => {
    const i = fold(x).indexOf(qn);
    if (!qn || i < 0) return x;
    return (<React.Fragment>{x.slice(0, i)}<em>{x.slice(i, i + qn.length)}</em>{x.slice(i + qn.length)}</React.Fragment>);
  };
  const hasValue = chips ? (chips.length + (otherChips || []).length > 0) : !!value;
  return (
    <div ref={fieldRef} className={"ca-field ca2-sel" + (full ? " full" : "") + (active ? " ca2-active" : "")}>
      <div className="k">{label}</div>
      <div className={"v" + (!hasValue && !active ? " empty" : "")} onClick={active ? undefined : open}>
        {chips ? (
          <span className="ca2-chips">
            {/* tapping anywhere on a chip removes it (44px target — the
                tiny ✕ alone was untappable on device) */}
            {(chips || []).map((c) => (
              <span key={c} className="ca2-chip" onClick={(ev) => { ev.stopPropagation(); onUnpick(c, false); }}>{c} <span className="x">✕</span></span>
            ))}
            {(otherChips || []).map((c) => (
              <span key={"o:" + c} className="ca2-chip" onClick={(ev) => { ev.stopPropagation(); onUnpick(c, true); }}>{c} <span className="x">✕</span></span>
            ))}
            {active ? (
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                onBlur={() => setTimeout(() => onClose(k), 140)} />
            ) : (!hasValue ? <span>Tap to choose</span> : null)}
          </span>
        ) : active ? (
          <input ref={inputRef} value={q} placeholder={value || ""} onChange={(e) => setQ(e.target.value)}
            onBlur={() => setTimeout(() => onClose(k), 140)} />
        ) : (
          <span>{value || "Tap to choose"}</span>
        )}
        <span className="ca2-chev"><CelChevDown></CelChevDown></span>
      </div>
      {active ? (
        /* the overlay: pointerdown only guards focus (no blur, no
           keyboard drop); SELECTION happens on click, so the list is
           still mounted under the finger when the tap completes — the
           focus-jump bug was the trailing click falling through a
           layout that had already shifted */
        <div className="ca2-ddwrap" onPointerDown={(ev) => ev.preventDefault()}>
          <div className="ca2-dd">
            {rows.map((x) => (
              <div key={x} className="ca2-dd-row" onClick={(ev) => { ev.stopPropagation(); onPick(x, false); setQ(""); }}>{mark(x)}</div>
            ))}
            {showOther ? (
              <div className="ca2-dd-row" onClick={(ev) => { ev.stopPropagation(); onPick(q.trim(), true); setQ(""); }}>Use “{q.trim()}”</div>
            ) : null}
            {!rows.length && !showOther ? <div className="ca2-dd-row" style={{ opacity: 0.5 }}>Nothing in the lists</div> : null}
          </div>
          <div className="ca2-dd-note">{note || "Tap to select one"}</div>
        </div>
      ) : null}
    </div>
  );
}

// ---------- the screen ----------
function CellarScreen({ light, desktop, leaving, onToast }) {
  const [entries, setEntries] = React.useState(() => CellarStore.all());
  const [view, setView] = React.useState({ name: "rack" });
  const viewRef = React.useRef(view); viewRef.current = view;
  // THE PUSH — exit THEN entrance, never together (the house grammar;
  // Ed's round-2 verdict killed the crossfade): the outgoing screen
  // completes its sink (.cf-push-leave, 300ms) BEFORE the incoming one
  // mounts and plays its entrance; a return to the still-mounted rack
  // fades it back in whole (.cf-back). One beat at a time.
  const [leavingView, setLeavingView] = React.useState(null);
  const [backFlag, setBackFlag] = React.useState(false);
  const leaveTimer = React.useRef(null);
  const go = (next) => {
    const cur = viewRef.current;
    if (cur.name === next.name && cur.id === next.id) return;
    if (leaveTimer.current) return;   // a push is already in flight
    celScrollHome();
    setLeavingView(cur);
    leaveTimer.current = setTimeout(() => {
      leaveTimer.current = null;
      setLeavingView(null);
      setView(next);
      if (next.name === "rack") {
        setBackFlag(true);
        setTimeout(() => setBackFlag(false), 420);
      }
    }, 300);
  };
  const [filters, setFilters] = React.useState([]);
  const [sheet, setSheet] = React.useState(null);       // { id, n0, n, cls, note }
  const sheetRef = React.useRef(null); sheetRef.current = sheet;
  const [closingId, setClosingId] = React.useState(null);
  const [scrolled, setScrolled] = React.useState({});
  const refresh = () => setEntries(CellarStore.all());
  const armScroll = (key) => (ev) => {
    const on = ev.currentTarget.scrollTop > 4;
    setScrolled((s) => (s[key] === on ? s : { ...s, [key]: on }));
  };

  // ---------- filters (AND-combine; facets from the cellar's contents) ----------
  const facetPills = React.useMemo(() => {
    const types = [], countries = [], grapes = [];
    let anyReady = false;
    entries.forEach((e) => {
      const f = e.facts || {};
      if (f.color && !types.includes(f.color)) types.push(f.color);
      if (e.window && e.window.status === "ready") anyReady = true;
      if (f.country && !countries.includes(f.country)) countries.push(f.country);
      (f.grapes || []).forEach((g) => { if (!grapes.includes(g)) grapes.push(g); });
    });
    countries.sort(); grapes.sort();
    const pills = types.map((t) => ({ key: "type:" + t, label: t }));
    if (anyReady) pills.push({ key: "ready", label: "READY NOW" });
    countries.forEach((c) => pills.push({ key: "country:" + c, label: c }));
    grapes.forEach((g) => pills.push({ key: "grape:" + g, label: g }));
    return pills;
  }, [entries]);
  const passes = (e) => filters.every((k) => {
    const f = e.facts || {};
    if (k === "ready") return e.window && e.window.status === "ready";
    if (k.startsWith("type:")) return f.color === k.slice(5);
    if (k.startsWith("country:")) return f.country === k.slice(8);
    if (k.startsWith("grape:")) return (f.grapes || []).includes(k.slice(6));
    return true;
  });
  const rows = filters.length ? entries.filter(passes) : entries;
  const totals = CellarStore.count();
  const shown = { wines: rows.length, bottles: rows.reduce((n, w) => n + (w.count || 0), 0) };
  const countLine = entries.length === 0 ? "NOTHING SLEEPING YET"
    : filters.length ? shown.wines + (shown.wines === 1 ? " wine · " : " wines · ") + shown.bottles + (shown.bottles === 1 ? " bottle" : " bottles") + " · of " + totals.wines
    : celCountLine(totals.wines, totals.bottles);

  // ---------- the count sheet (E-A — transient, see §5.6) ----------
  // S2: opts carry the duplicate prompt (photo road, plan §6) — the sheet
  // IS the prompt: n presets to count+1, the note explains, DONE commits,
  // the scrim cancels. No new surface, the E-A contract untouched.
  const openSheet = (id, opts) => {
    const rec = CellarStore.get(id); if (!rec) return;
    const preset = opts && opts.preset != null ? Math.max(0, opts.preset) : rec.count;
    setSheet({ id, n0: rec.count, n: preset, cls: "", note: (opts && opts.note) || null });
    requestAnimationFrame(() => requestAnimationFrame(() =>
      setSheet((s) => s && s.id === id ? { ...s, cls: "in" } : s)));
  };
  // scrim tap = CANCEL (revert, commit nothing — Ed, round 3); only DONE
  // commits. The sheet still plays its exit and unmounts (E-A contract).
  const cancelSheet = () => {
    const s = sheetRef.current;
    if (!s || s.cls === "out") return;
    setSheet({ ...s, cls: "out" });
    setTimeout(() => setSheet(null), 270);
  };
  // PULL-TO-DISMISS (Ed, round 6: a handled sheet must swipe away): the
  // sheet tracks the finger down (never up past rest), releases past 90px
  // → slides out from where it is and CANCELS; short pulls snap back on
  // the class transition. Drag engages only after 10px of vertical
  // dominance so the stepper and DONE stay ordinary taps.
  const sheetDrag = React.useRef(null);
  const sheetDown = (ev) => {
    sheetDrag.current = { y: ev.clientY, x: ev.clientX, on: false, el: ev.currentTarget };
  };
  const sheetMove = (ev) => {
    const d = sheetDrag.current; if (!d) return;
    const dy = ev.clientY - d.y, dx = ev.clientX - d.x;
    if (!d.on) {
      if (dy < 10 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      d.on = true;
      try { d.el.setPointerCapture(ev.pointerId); } catch (e) {}
    }
    d.dy = Math.max(0, dy);
    d.el.style.transition = "none";
    d.el.style.transform = "translate(-50%, " + d.dy + "px)";
  };
  const sheetUp = () => {
    const d = sheetDrag.current; sheetDrag.current = null;
    if (!d || !d.on) return;
    if ((d.dy || 0) > 90) {
      // out from the finger's own position, then the scrim's cancel
      d.el.style.transition = "transform 240ms cubic-bezier(0.4, 0, 0.6, 1)";
      d.el.style.transform = "translate(-50%, 102%)";
      const s = sheetRef.current;
      if (s && s.cls !== "out") { setSheet({ ...s, cls: "out" }); setTimeout(() => setSheet(null), 250); }
    } else {
      d.el.style.transition = ""; d.el.style.transform = "";
    }
  };
  const closeSheet = () => {
    const s = sheetRef.current;
    if (!s || s.cls === "out") return;   // double-close guard (Done + scrim)
    const { id, n0, n } = s;
    setSheet({ ...s, cls: "out" });
    setTimeout(() => {
      setSheet(null);
      if (n !== n0) {
        vaTrackCel("cellar_count", { delta: n - n0, zero: n === 0, sheet: "E-A" });
        if (n === 0) {
          // count 0 retires the wine — no archive (hard product law);
          // the sheet WAS the one-breath undo (+ brings it back before
          // the close commits). The tile folds quietly.
          const v = viewRef.current;
          if (v.name === "detail" && v.id === id) go({ name: "rack" });
          setClosingId(id);
          setTimeout(() => { CellarStore.remove(id); setClosingId(null); refresh(); }, 320);
        } else {
          CellarStore.update(id, { count: n });
          refresh();
        }
      }
    }, 270);
  };

  // ---------- the form ----------
  const blankForm = { producer: "", wine: "", vintage: "", type: "", grapes: [], otherGrapes: [], region: "", country: "" };
  const [form, setForm] = React.useState(blankForm);
  const [activeSel, setActiveSel] = React.useState(null);
  // dropdown closed (pick, blur, or background tap) → if focus left the
  // form, the document comes home (the focus contract)
  React.useEffect(() => { if (activeSel === null) celRestoreOnLeave(); }, [activeSel]);
  const openForm = (mode, id) => {
    if (mode === "edit" && id) {
      const r = CellarStore.get(id); if (!r) return;
      setForm({
        producer: r.identity.producer || "", wine: r.identity.wine || "",
        vintage: r.identity.vintage || "", type: (r.facts && r.facts.color) || "",
        grapes: (r.facts && r.facts.grapes) || [], otherGrapes: (r.facts && r.facts.otherGrapes) || [],
        region: (r.facts && r.facts.region) || "", country: (r.facts && r.facts.country) || "",
      });
    } else setForm(blankForm);
    setActiveSel(null);
    go({ name: "form", mode, id: id || null });
  };
  // every field is required except REGION (Ed, round 4) — the sanitized
  // facets (vintage, type, grape, country) plus producer and wine must
  // all be filled before the CTA lights
  const formComplete = !!(form.producer.trim() && form.wine.trim() && form.vintage && form.type
    && (form.grapes.length + form.otherGrapes.length > 0) && form.country);
  const submitForm = () => {
    if (!formComplete) return;
    const identity = {
      producer: form.producer.trim(), wine: form.wine.trim(),
      vintage: form.vintage || "NV", source: "manual", matchedId: null, confidence: null,
    };
    const facts = {
      color: form.type || null, grapes: form.grapes, otherGrapes: form.otherGrapes,
      region: form.region.trim() || null, country: form.country || null,
    };
    if (view.mode === "edit" && view.id) {
      // identity-level correction (S1: no pipeline to regenerate — the
      // window recomputes; S3 wires enrichment invalidation here)
      const rec = CellarStore.update(view.id, { identity, facts });
      if (rec) CellarStore.update(view.id, { window: cellarComputeWindow(rec) });
      refresh();
      go({ name: "detail", id: view.id });
      return;
    }
    const dup = CellarStore.findByIdentity(identity);
    if (dup) {
      // duplicate add = identity match → count++, zero pipeline (§5.1)
      CellarStore.update(dup.id, { count: dup.count + 1 });
      refresh();
      if (onToast) onToast("ALREADY SLEEPING · NOW ×" + (dup.count + 1));
      if (view.fromPhoto) { reportIdentify("duplicate"); addFlow.current = null; setMatchData(null); }
      go({ name: "rack" });
      return;
    }
    const rec = CellarStore.add({ identity, facts, window: null });
    CellarStore.update(rec.id, { window: cellarComputeWindow(rec) });
    if (view.fromPhoto) {
      // manual + unmatched: the ONE case the label photo is kept (hard
      // product law) — IndexedDB blob keyed by the record id
      const f = addFlow.current;
      if (f && f.photo && f.photo.blob) {
        CellarPhotos.put(rec.id, f.photo.blob);
        CellarStore.update(rec.id, { labelPhoto: rec.id });
      }
      reportIdentify("manual");
      addFlow.current = null; setMatchData(null);
    }
    refresh();
    vaTrackCel("cellar_added", { wine: identity.wine, method: "form" });
    go({ name: "rack" });
  };
  const pickSel = (k) => (val, other) => {
    setForm((f) => {
      if (k === "grapes") {
        if (other) return f.otherGrapes.includes(val) ? f : { ...f, otherGrapes: [...f.otherGrapes, val] };
        return f.grapes.includes(val) ? f : { ...f, grapes: [...f.grapes, val] };
      }
      return { ...f, [k]: val };
    });
    if (k !== "grapes") setActiveSel(null);
  };
  const unpickGrape = (val, other) => {
    setForm((f) => other
      ? { ...f, otherGrapes: f.otherGrapes.filter((g) => g !== val) }
      : { ...f, grapes: f.grapes.filter((g) => g !== val) });
  };

  // ---------- THE PHOTO ROAD (S2 — capture · identify · match · correct) ----------
  // The add affordance is now the ONE entry (R3): tap → native photo sheet
  // (Take Photo / Photo Library — brief amendment A1) → identify stage →
  // match sheet or correction. The manual form remains reachable as the
  // correction path, and IS the whole road when the pipeline is off.
  const fileRef = React.useRef(null);
  const addFlow = React.useRef(null);   // { photo, extract, candidates, threshold, top, route, reported, ctl }
  const [idState, setIdState] = React.useState(null);   // { step, fail }
  const [matchData, setMatchData] = React.useState(null); // { extract, candidates, threshold }
  const PIPE_OFF = "va-cellar-pipe-off";

  // ONE identify event per attempt (§5.8) — floats + enums only; the
  // props-hygiene law keeps rawReading and guessed names out of here.
  const reportIdentify = (outcome) => {
    const f = addFlow.current;
    if (!f || f.reported) return;
    f.reported = true;
    vaTrackCel("cellar_identify", {
      conf: f.extract ? Math.round(((f.extract.confidence || 0)) * 100) / 100 : 0,
      match: f.top ? f.top.score : 0,
      route: f.route || "none",
      outcome,
    });
  };

  const beginAdd = () => {
    let off = false;
    try { off = sessionStorage.getItem(PIPE_OFF) === "1"; } catch (e) {}
    // kill-switch memory: once the pipeline says disabled, the + goes
    // straight to the form for the rest of the session — manual-only,
    // whole by design; a fresh session re-probes
    if (off || !window.fetch || !fileRef.current) { openForm("add"); return; }
    fileRef.current.value = "";
    fileRef.current.click();
  };

  const onPhotoPicked = (ev) => {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    cellarProcessPhoto(file).then((photo) => {
      reportIdentify("retaken");      // a live attempt being replaced closes out
      if (addFlow.current && addFlow.current.ctl) addFlow.current.ctl.abort();
      addFlow.current = { photo, reported: false };
      setIdState({ step: 0, fail: null });
      setMatchData(null);
      go({ name: "identify" });
      runPipeline(photo);
    }).catch(() => openForm("add"));  // undecodable file → the manual road
  };

  const idFail = (kind) => {
    setIdState((s) => (s ? { ...s, fail: kind } : s));
    reportIdentify(kind === "offline" ? "offline" : kind === "disabled" ? "disabled" : kind === "quota" ? "quota" : "error");
  };

  const runPipeline = async (photo) => {
    const f = addFlow.current;
    const ctl = new AbortController(); f.ctl = ctl;
    const post = (path, body) => fetch(path, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ install: celInstallId(), ...body }),
      signal: ctl.signal,
    });
    try {
      const er = await post("/api/cellar-extract", { image: photo.dataUrl });
      if (ctl.signal.aborted) return;
      if (er.status === 503) {
        const b = await er.json().catch(() => null);
        if (b && b.disabled) { try { sessionStorage.setItem(PIPE_OFF, "1"); } catch (e) {} idFail("disabled"); }
        else idFail("error");
        return;
      }
      if (er.status === 429) { idFail("quota"); return; }
      if (!er.ok) { idFail("error"); return; }
      const extract = await er.json();
      if (ctl.signal.aborted) return;
      f.extract = extract;
      setIdState({ step: 1, fail: null });
      const fields = extract.fields || {};
      let candidates = [], threshold = 1;
      if (fields.producer || fields.wine) {
        try {
          const rr = await post("/api/cellar-resolve", { terms: fields });
          if (rr.ok) {
            const body = await rr.json();
            candidates = body.candidates || [];
            threshold = typeof body.threshold === "number" ? body.threshold : 1;
          }
          // resolve down (501/502) is a MISS, never an error — the
          // correction screen carries on with the read alone
        } catch (e) { if (ctl.signal.aborted) return; }
      }
      if (ctl.signal.aborted) return;
      f.candidates = candidates; f.threshold = threshold;
      f.top = candidates[0] || null;
      const toSheet = !!(f.top && f.top.score >= threshold);
      f.route = toSheet ? "sheet" : "correction";
      setIdState({ step: 2, fail: null });
      setMatchData({ extract, candidates, threshold });
      // let the third step light for a breath before the push
      setTimeout(() => { if (!ctl.signal.aborted) go({ name: toSheet ? "match" : "correct" }); }, 450);
    } catch (err) {
      if (ctl.signal.aborted) return;
      idFail("offline");   // fetch only throws for network trouble here
    }
  };

  // cancel = abandon + discard (plan §6): the photo dies with the flow
  const abandonFlow = () => {
    const f = addFlow.current;
    if (f && f.ctl) f.ctl.abort();
    reportIdentify("abandoned");
    addFlow.current = null;
    setMatchData(null);
    go({ name: "rack" });
  };

  const retake = () => {
    if (!fileRef.current) return;
    fileRef.current.value = "";
    fileRef.current.click();
  };

  // THAT'S THE ONE (match sheet) and a correction runner-up land the same
  // way: identity-only + facts LWIN knows, enrichment pending (the
  // settling shimmer) — generation is post-confirm territory (D11, S3).
  // The photo is DISCARDED on a match (retention law: manual+unmatched only).
  const confirmCandidate = (cand) => {
    const f = addFlow.current || {};
    const fields = (f.extract && f.extract.fields) || {};
    // the year is bottle-level truth: a 4-digit read or an explicit NV
    // stays; anything else stays UNKNOWN — never a guessed "NV" (D24 (10))
    const vRead = String(fields.vintage || "").trim();
    const identity = {
      producer: cand.producer, wine: cand.wine,
      vintage: vRead === "NV" || /^\d{4}$/.test(vRead) ? vRead : "",
      source: "matched", matchedId: cand.lwin, confidence: cand.score,
    };
    const fromCorrect = viewRef.current.name === "correct";
    const dup = CellarStore.findByIdentity(identity);
    if (dup) {
      // duplicate → the count sheet IS the prompt (preset +1, DONE commits)
      reportIdentify("duplicate");
      addFlow.current = null; setMatchData(null);
      go({ name: "rack" });
      setTimeout(() => openSheet(dup.id, {
        preset: dup.count + 1,
        note: "Already in the rack · Done adds this bottle",
      }), 760);
      return;
    }
    // LWIN's facts land whole (D24 (7)): sub-region + classification show
    // on the wine page; designation codes and the bottler are kept unshown
    const facts = {
      color: cand.type || fields.type || null,
      grapes: [], otherGrapes: [],
      region: cand.region || null, subRegion: cand.subRegion || null, country: cand.country || null,
      classification: cand.classification || null, designation: cand.designation || null,
      bottler: cand.bottler || null,
    };
    const rec = CellarStore.add({ identity, facts, window: null });
    CellarStore.update(rec.id, { window: cellarComputeWindow(rec) });
    refresh();
    vaTrackCel("cellar_added", { wine: identity.wine, method: "photo" });
    reportIdentify(fromCorrect ? "corrected" : "added");
    addFlow.current = null; setMatchData(null);
    go({ name: "rack" });
  };

  // "Enter it yourself" — the form, prefilled with whatever the label
  // reader saw; pick-only facets only prefill values the lists know
  const openFormFromPhoto = () => {
    const f = addFlow.current;
    const fields = (f && f.extract && f.extract.fields) || {};
    const L = window.CELLAR_LISTS || { types: [], countries: [], grapes: [] };
    const vintages = cellarVintages();
    const grapes = [], otherGrapes = [];
    (fields.grapes || []).forEach((g) => {
      const hit = (L.grapes || []).find((x) => x.toLowerCase() === String(g).toLowerCase());
      if (hit) { if (!grapes.includes(hit)) grapes.push(hit); }
      else if (g && !otherGrapes.includes(g)) otherGrapes.push(String(g));
    });
    setForm({
      producer: fields.producer || "", wine: fields.wine || "",
      vintage: vintages.includes(fields.vintage) ? fields.vintage : "",
      type: (L.types || []).includes(fields.type) ? fields.type : "",
      grapes, otherGrapes,
      region: fields.region || "",
      country: (L.countries || []).includes(fields.country) ? fields.country : "",
    });
    setActiveSel(null);
    go({ name: "form", mode: "add", fromPhoto: true });
  };

  // headless drive for the suite + the band probe. mockFlow seeds the S2
  // screens (identify / match / correction) with a canned Vat 1 read so
  // harness runs never touch the pipeline (no cost, no quota, no events —
  // reported: true belt on top of the ?va-off braces).
  React.useEffect(() => {
    window.__vaCellar = {
      view: () => view.name,
      go: (name, id) => (name === "form" ? openForm("add") : go(id ? { name, id } : { name })),
      openSheet, closeSheet, refresh,
      mockFlow: (name) => {
        const mk = (lwin, producer, wine, region, score) => ({
          lwin, producer, wine, display: producer + ", " + wine, country: "Australia",
          region, subRegion: null, colour: "White", type: "White",
          designation: null, classification: null, bottler: null, score,
        });
        const cands = [
          mk(1315635, "Tyrrell's", "Vat 1 Semillon", "New South Wales", 0.95),
          mk(1960750, "Tyrrell's", "Vat 15 Semillon", "New South Wales", 0.61),
          mk(1777426, "Tyrrell's", "Semillon", "New South Wales", 0.55),
          mk(1160512, "Tyrrell's", "Vat 47 Chardonnay", "New South Wales", 0.4),
        ];
        addFlow.current = {
          photo: null, reported: true, candidates: cands, threshold: 0.72, top: cands[0],
          route: name === "correct" ? "correction" : "sheet",
          extract: {
            fields: { producer: "Tyrrell's", wine: "Vat 1 Semillon", vintage: "2014", type: "White", region: "Hunter Valley", country: "Australia", grapes: ["Semillon"] },
            confidence: 0.92,
            rawReading: "TYRRELL'S · WINEMAKERS · VAT 1 · HUNTER SEMILLON · 2014",
          },
        };
        setMatchData({ extract: addFlow.current.extract, candidates: cands, threshold: 0.72 });
        if (name === "identify") { setIdState({ step: 1, fail: null }); go({ name: "identify" }); }
        else go({ name: name === "correct" ? "correct" : "match" });
      },
    };
    return () => { if (window.__vaCellar) delete window.__vaCellar; };
  });

  const sheetRec = sheet ? CellarStore.get(sheet.id) : null;

  // push-beat visibility: the view holds the stage until its exit beat
  // finishes (leavingView === the current view while it folds); the next
  // screen mounts only at the commit. The rack alone survives hidden
  // between its turns (scroll kept).
  const rackActive = view.name === "rack";
  const rackLeaving = rackActive && !!leavingView;
  const rackCls = (!rackActive ? " cf-hidden" : "") +
    (rackLeaving ? " cf-push-leave" : "") + (rackActive && backFlag ? " cf-back" : "") + (leaving ? " leaving" : "");
  const detSrc = view.name === "detail" ? view : null;
  const detLeaving = detSrc && !!leavingView;
  const formSrc = view.name === "form" ? view : null;
  const formLeaving = formSrc && !!leavingView;

  // ---------- pieces ----------
  const head = (
    <div className="cl-head">
      <div className="cl-head-row">
        <div>
          <h2 className="cl-title">Cellar</h2>
          <div className="cl-count">{countLine}</div>
        </div>
        {entries.length === 0 ? null : (
          <div className="cl-add" onClick={beginAdd}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
        )}
      </div>
    </div>
  );
  const pills = entries.length === 0 ? null : (
    <div className="cl-pills">
      {facetPills.map((p) => (
        <div key={p.key} className={"cl-pill" + (filters.includes(p.key) ? " on" : "")}
          onClick={() => setFilters((fs) => fs.includes(p.key) ? fs.filter((k) => k !== p.key) : [...fs, p.key])}>
          {p.label}
        </div>
      ))}
    </div>
  );
  const tiles = (
    <div className="cl2-list">
      {rows.length === 0 && filters.length ? (
        <div className="cl-noresult">Nothing sleeping under those filters</div>
      ) : rows.map((e, i) => {
        // the settling shimmer (S2): a photo-matched record lands
        // identity-only and wears the settling dress for its landing
        // moment; S3's enrichment loop takes this over properly
        const settling = e.identity.source === "matched" && e.enrichment
          && e.enrichment.status === "pending" && Date.now() - e.addedTs < 30000;
        const v = wineView(e);
        return (
        <div key={e.id} className={"cl2-tilewrap" + (closingId === e.id ? " closing" : "")} style={{ "--cfi": Math.min(i * 30, 360) + "ms" }}>
          <div className={"cl2-tile" + (settling ? " settling" : "")} onClick={() => go({ name: "detail", id: e.id })}>
            <div className="bot"><WineBottle view={v}></WineBottle></div>
            <div className="tx">
              <WineNameBlock view={v} variant="tile"></WineNameBlock>
              {settling ? <div className="cl-settag">Settling in</div> : null}
            </div>
            <span className="cl-qty" onClick={(ev) => { ev.stopPropagation(); openSheet(e.id); }}>×{e.count}</span>
            <CelWin w={e.window}></CelWin>
          </div>
        </div>
        );
      })}
    </div>
  );
  // the CC BY 4.0 attribution duty ships with the index (cellar-plan §2.1)
  const lwinNote = (
    <div className="cl-lwin-note">Wine identifiers from Liv-ex's LWIN database (CC BY 4.0), modified</div>
  );
  const empty = (
    <div className="cl-empty">
      <div className="cl-empty-bots">
        <WineBottle src="assets/bottle-white.png" style={{ height: "108px", transform: "rotate(-3deg)" }}></WineBottle>
        <WineBottle src="assets/bottle-red.png" style={{ height: "128px" }}></WineBottle>
        <WineBottle src="assets/bottle-white.png" style={{ height: "100px", transform: "rotate(2.5deg)" }}></WineBottle>
      </div>
      <h3 className="cl-empty-title">The rack stands empty.</h3>
      <span className="cl-jotline">
        every cellar starts with one
        <CelWave></CelWave>
      </span>
      <div className="cl-cta cl2-cta" onClick={beginAdd}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
    </div>
  );

  // ---------- desktop rack (the menu spans the window; rack width-capped) ----------
  const deskRack = (
    <div className={"va-layer cl-screen cf-screen cf-rack" + rackCls} data-screen-label="Flow — Cellar">
      <div className="cld-wrap">
        <div className="cld-head">
          <div>
            <h2 className="cld-title">Cellar</h2>
            <div className="cl-count">{countLine}</div>
          </div>
          {entries.length === 0 ? null : (
            <div className="cl-add" onClick={beginAdd}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
          )}
        </div>
        {entries.length === 0 ? empty : (
          <React.Fragment>
            <div className="cl-pills" style={{ padding: "18px 0 0" }}>
              {facetPills.map((p) => (
                <div key={p.key} className={"cl-pill" + (filters.includes(p.key) ? " on" : "")}
                  onClick={() => setFilters((fs) => fs.includes(p.key) ? fs.filter((k) => k !== p.key) : [...fs, p.key])}>
                  {p.label}
                </div>
              ))}
            </div>
            <div className="cld2-cols cld-colhead">
              <span className="c"></span><span className="c">Wine</span><span className="c">Grape</span><span className="c">Region</span><span className="c">Window</span><span className="c">Added</span><span className="c" style={{ textAlign: "right" }}>Count</span>
            </div>
            <div className="cld-list">
              {rows.length === 0 && filters.length ? (
                <div className="cl-noresult">Nothing sleeping under those filters</div>
              ) : rows.map((e, i) => {
                const v = wineView(e);
                return (
                <div className="cld2-cols cld-row" key={e.id} style={{ "--cfi": Math.min(60 + i * 30, 420) + "ms" }}
                  onClick={() => go({ name: "detail", id: e.id })}>
                  <span className="bot"><WineBottle view={v}></WineBottle></span>
                  <WineNameBlock view={v} variant="row"></WineNameBlock>
                  <span className="cl-sub" style={{ marginTop: 0 }}>{v.grapes}</span>
                  <span className="cl-sub" style={{ marginTop: 0 }}>{v.loc}</span>
                  <span><CelWin w={e.window}></CelWin></span>
                  <span className="added">{celAddedLabel(e.addedTs).toUpperCase()}</span>
                  <span className="cl-qty" onClick={(ev) => { ev.stopPropagation(); openSheet(e.id); }}>×{e.count}</span>
                </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
        {lwinNote}
      </div>
      {sheet ? <div className={"cl-scrim " + sheet.cls} onClick={cancelSheet}></div> : null}
    </div>
  );

  const rack = desktop ? deskRack : (
    <div className={"va-layer cl-screen cf-screen cf-rack" + rackCls} data-screen-label="Flow — Cellar">
      <div className={"cf-scroll" + (scrolled.rack ? " scrolled" : "")} onScroll={armScroll("rack")}>
        <div className="cf-flow">
          {head}
          {pills}
          {entries.length === 0 ? empty : tiles}
          {lwinNote}
        </div>
      </div>
      {sheet ? <div className={"cl-scrim " + sheet.cls} onClick={cancelSheet}></div> : null}
    </div>
  );

  // ---------- detail (the wine, opened — sparse S1 records) ----------
  let detail = null;
  if (detSrc) {
    const d = CellarStore.get(detSrc.id);
    if (!d) { detail = null; }
    else {
      const dv = wineView(d);
      const stats = wineStatsFor(dv);
      detail = (
        <div className={"va-layer cl-screen cf-screen cf-detail" + (detLeaving ? " cf-push-leave" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar detail">
          <div className="cl2-nav">
            <span className="cl2-circ" onClick={() => go({ name: "rack" })}><CelBackIcon></CelBackIcon></span>
            <span></span>
          </div>
          <div className={"cf-scroll" + (scrolled.detail ? " scrolled" : "")} onScroll={armScroll("detail")}>
            <div className="cf-flow">
              <div className="cd-scroll">
                <WineHero view={dv} count={d.count} onCount={() => openSheet(d.id)}></WineHero>
                {d.window ? <WineWindow w={d.window}></WineWindow> : null}
                {d.story ? <div className="cd-story">{d.story}</div> : null}
                <WineStats rows={stats}></WineStats>
                {d.labelPhoto ? <CelPhotoStrip recId={d.id}></CelPhotoStrip> : null}
                {d.tastes ? (
                  <div className="cd-scales">
                    <div className="cd-scales-h">The palate</div>
                    <WineScales tastes={d.tastes}></WineScales>
                  </div>
                ) : null}
                <div className="cd-foot">
                  <span className="cd-fix" onClick={() => openForm("edit", d.id)}>Not the right wine? Set it right</span>
                </div>
              </div>
            </div>
          </div>
          {sheet ? <div className={"cl-scrim " + sheet.cls} onClick={cancelSheet}></div> : null}
        </div>
      );
    }
  }

  // ---------- the manual form (add + identity-level correction) ----------
  let formView = null;
  if (formSrc) {
    const editing = formSrc.mode === "edit";
    const vintages = cellarVintages();
    const L = window.CELLAR_LISTS || { types: [], countries: [], grapes: [] };
    formView = (
      <div className={"va-layer cl-screen cf-screen cf-form" + (formLeaving ? " cf-push-leave" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar form">
        {/* add = ✕ closes to the rack; SET IT RIGHT = circled back to the
            detail it came from (Ed's device pass — a correction is a
            step deeper, not a separate errand) */}
        <div className="cl2-nav">
          {editing ? (
            <span className="cl2-circ" onClick={() => go({ name: "detail", id: formSrc.id })}><CelBackIcon></CelBackIcon></span>
          ) : <span></span>}
          {editing ? <span></span> : (
            <span className="cl2-circ" onClick={() => { if (formSrc.fromPhoto) abandonFlow(); else go({ name: "rack" }); }}>✕</span>
          )}
        </div>
        <div className={"cf-scroll" + (scrolled.form ? " scrolled" : "")} onScroll={armScroll("form")}>
          <div className="cf-flow">
            <div className="ca-formcol" onClick={() => {
              setActiveSel(null);
              const a = document.activeElement;
              if (a && a.tagName === "INPUT") a.blur();
            }}>
              <div className="ca-fix-head">
                <h2 className="ca-fix-title">{editing ? "Set it right." : "Your bottle, your words."}</h2>
              </div>
              <div className="ca-form">
                <div className="ca-form-grid" onClick={(ev) => ev.stopPropagation()}>
                  <div className="ca-field full"><div className="k">Producer</div>
                    <div className="v"><input value={form.producer} placeholder="Who made it"
                      onBlur={celRestoreOnLeave}
                      onChange={(e) => setForm((f) => ({ ...f, producer: e.target.value }))} /></div>
                  </div>
                  <div className="ca-field full"><div className="k">Wine</div>
                    <div className="v"><input value={form.wine} placeholder="What the label calls it"
                      onBlur={celRestoreOnLeave}
                      onChange={(e) => setForm((f) => ({ ...f, wine: e.target.value }))} /></div>
                  </div>
                  <CelCombo k="vintage" label="Vintage" list={vintages} value={form.vintage}
                    active={activeSel === "vintage"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("vintage")}></CelCombo>
                  <CelCombo k="type" label="Type" list={L.types} value={form.type}
                    active={activeSel === "type"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("type")}></CelCombo>
                  <CelCombo k="grapes" label="Grape" full list={L.grapes} chips={form.grapes} otherChips={form.otherGrapes}
                    allowOther active={activeSel === "grapes"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("grapes")} onUnpick={unpickGrape}></CelCombo>
                  <div className="ca-field"><div className="k">Region</div>
                    <div className="v"><input value={form.region} placeholder="Where it grew"
                      onBlur={celRestoreOnLeave}
                      onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} /></div>
                  </div>
                  <CelCombo k="country" label="Country" list={L.countries} value={form.country}
                    active={activeSel === "country"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("country")}></CelCombo>
                </div>
              </div>
              <div className="ca-form-ctas">
                <div className={"ca-cta fill" + (formComplete ? "" : " disabled")} onClick={submitForm}>
                  {editing ? "Set it right" : "Add to the cellar"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- identify (S2 — a plain STAGE on the recipe: nothing scrolls,
  // the layer eats the pan; cancel = abandon + discard) ----------
  let identifyView = null;
  if (view.name === "identify" && idState) {
    const stepCls = (i) => (idState.step > i ? " done" : idState.step === i ? " live" : "");
    identifyView = (
      <div className={"va-layer cl-screen ca-idstage" + (leavingView ? " cf-push-leave" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar identify">
        <div className="ca-id">
          <img className="ca-id-bot" src="assets/bottle-white.png" alt="" />
          <h3 className="ca-id-line">Making its acquaintance.</h3>
          {idState.fail ? (
            <div className="ca-id-fail">
              <div className="ca-id-failline">{CEL_FAIL_LINES[idState.fail] || CEL_FAIL_LINES.error}</div>
              <div className="ca-cta ghost ca-id-manual" onClick={openFormFromPhoto}>Manual entry</div>
            </div>
          ) : (
            <div className="ca-id-steps">
              <span className={"ca-id-step" + stepCls(0)}>{idState.step === 0 ? <span className="dot"></span> : null}Reading the label</span>
              <span className={"ca-id-step" + stepCls(1)}>{idState.step === 1 ? <span className="dot"></span> : null}Searching the racks</span>
              <span className={"ca-id-step" + stepCls(2)}>{idState.step === 2 ? <span className="dot"></span> : null}Pulling its record</span>
            </div>
          )}
        </div>
        <div className="ca-id-cancel" onClick={abandonFlow}>Cancel</div>
      </div>
    );
  }

  // ---------- the match (S2 — SPARSE variant, §5.2/D11: database-known
  // facts + the heuristic window word only; the story region carries the
  // quiet sparse line. Decision bar per R2: the Pour's foot-pin
  // construction, NOT QUITE ghost / THAT'S THE ONE filled.) ----------
  let matchView = null;
  if (view.name === "match" && matchData && matchData.candidates.length) {
    const cand = matchData.candidates[0];
    const fields = (matchData.extract && matchData.extract.fields) || {};
    // the wine page's MATCH state: what the database knows + the label's
    // year; no drink window here — the bottle isn't in the cellar (D24 (10))
    const mv = wineView(cand, { vintage: fields.vintage });
    const stats = wineStatsFor(mv);
    matchView = (
      <div className={"va-layer cl-screen cf-screen cf-match" + (leavingView ? " cf-push-leave" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar match">
        <div className="cl2-nav">
          <div className="cl-add" onClick={retake}><CelBackIcon></CelBackIcon><span>Retake</span></div>
          <span className="cl2-circ" onClick={abandonFlow}>✕</span>
        </div>
        <div className={"cf-scroll" + (scrolled.match ? " scrolled" : "")} onScroll={armScroll("match")}>
          <div className="cf-flow">
            <div className="cd-scroll">
            <WineHero view={mv} believes></WineHero>
            <div className="ca-sparse">Its story arrives once it settles in</div>
            <WineStats rows={stats}></WineStats>
            </div>
          </div>
        </div>
        {/* R2: the Pour action bar's construction reused exactly — an
            absolute, VisualViewport-tracked (--foot-vh) child of the
            layer; never bottom-anchored in doc mode; eats pans itself
            (membership rule's self-carry clause) */}
        <div className="ca-barpin">
          <div className="ca-bar">
            <div className="ca-cta ghost" onClick={() => go({ name: "correct" })}>Not quite</div>
            <div className="ca-cta fill" onClick={() => confirmCandidate(cand)}>That's the one</div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- correction (S2 — manual FIRST, runner-ups below at the
  // same level, "THE LABEL READ · …"; identity-level only) ----------
  let correctView = null;
  if (view.name === "correct") {
    const md = matchData || {};
    const fields = (md.extract && md.extract.fields) || {};
    const read = (md.extract && md.extract.rawReading) || "";
    const cameFromMatch = !!(md.candidates && md.candidates.length && md.candidates[0].score >= md.threshold);
    const runners = (md.candidates || []).slice(cameFromMatch ? 1 : 0, cameFromMatch ? 4 : 3);
    const vintage = fields.vintage || "";
    correctView = (
      <div className={"va-layer cl-screen cf-screen cf-correct" + (leavingView ? " cf-push-leave" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar correction">
        <div className="cl2-nav">
          {cameFromMatch ? (
            <span className="cl2-circ" onClick={() => go({ name: "match" })}><CelBackIcon></CelBackIcon></span>
          ) : <span></span>}
          <span className="cl2-circ" onClick={abandonFlow}>✕</span>
        </div>
        <div className={"cf-scroll" + (scrolled.correct ? " scrolled" : "")} onScroll={armScroll("correct")}>
          <div className="cf-flow">
            <div className="cd-scroll">
            <div className="ca-fix-head">
              <h2 className="ca-fix-title">Set it right.</h2>
              {read ? <div className="ca-fix-read">{("The label read · " + read).slice(0, 150)}</div> : null}
            </div>
            <div style={{ marginTop: "14px" }}>
              <div className="ca-opt" onClick={openFormFromPhoto}>
                <span className="ca-opt-ico"><CelPenIcon></CelPenIcon></span>
                <div>
                  <div className="ca-opt-name">Enter it yourself</div>
                  <div className="ca-opt-sub">Producer, year, grape, the lot</div>
                </div>
              </div>
              {runners.length ? (
                <div className="ca-or"><span className="txt">Or one of these</span><span className="rule"></span></div>
              ) : null}
              {runners.map((c) => {
                const cv = wineView(c, { vintage });
                return (
                <div className="ca-opt" key={c.lwin} onClick={() => confirmCandidate(c)}>
                  <div>
                    <div className="ca-opt-name">{cv.oneLine}</div>
                    <div className="ca-opt-sub">{[cv.vintage, cv.loc].filter(Boolean).join(" · ")}</div>
                  </div>
                </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {rack}
      {detail}
      {formView}
      {identifyView}
      {matchView}
      {correctView}
      {/* R3: the native photo input — no capture attribute, so iOS offers
          Take Photo / Photo Library / Choose File (brief amendment A1) */}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onPhotoPicked} />
      {/* THE COUNT SHEET — E-A (cellar-plan §5.6): strictly transient,
          genuinely bottom-anchored, unmounted after the close animation.
          Nothing carries `bottom:` at rest. */}
      {sheet && sheetRec ? (
        <div className={"cl-sheet " + sheet.cls}
          onPointerDown={sheetDown} onPointerMove={sheetMove} onPointerUp={sheetUp} onPointerCancel={sheetUp}>
          <div className="cl-grab"></div>
          <div className="cl-sheet-name">{wineView(sheetRec).name}</div>
          <div className="cl-sheet-sub">{[wineView(sheetRec).producer, wineView(sheetRec).vintage, wineView(sheetRec).loc].filter(Boolean).join(" · ")}</div>
          <div className="cl-sheet-cap">Bottles on hand</div>
          <div className="cl-sheet-row">
            <span className={"cl-stepbtn" + (sheet.n === 0 ? " dim" : "")} onClick={() => setSheet((s) => s && s.n > 0 ? { ...s, n: s.n - 1 } : s)}><CelMinusIcon></CelMinusIcon></span>
            <span className="cl-bignum">{sheet.n}</span>
            <span className="cl-stepbtn" onClick={() => setSheet((s) => s && ({ ...s, n: s.n + 1 }))}><CelPlusIcon></CelPlusIcon></span>
          </div>
          <div className="cl-sheet-note">{sheet.note || "At zero, the wine leaves the rack"}</div>
          <div className="cl-done" onClick={closeSheet}>Done</div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

Object.assign(window, { CellarScreen });
