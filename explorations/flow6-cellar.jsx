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

// ---------- display helpers ----------
const celBottleFor = (rec) => {
  const c = String((rec.facts && rec.facts.color) || "").toLowerCase();
  return c === "red" ? "assets/bottle-red.png" : "assets/bottle-white.png";
};
const celGrapesLine = (rec) => {
  const f = rec.facts || {};
  return [...(f.grapes || []), ...(f.otherGrapes || [])].join(", ");
};
const celGyLine = (rec) => {
  const g = celGrapesLine(rec);
  const v = (rec.identity && rec.identity.vintage) || "";
  return [g, v].filter(Boolean).join(" · ");
};
const celLocLine = (rec) => {
  const f = rec.facts || {};
  return [f.region, f.country].filter(Boolean).join(", ");
};
const celAddedLabel = (ts) => new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric" });
const celCountLine = (wines, bottles) =>
  wines + (wines === 1 ? " wine · " : " wines · ") + bottles + (bottles === 1 ? " bottle sleeping" : " bottles sleeping");

// decode-gated bottle render (the deck's img law: fresh <img>s blank on
// iOS while they decode — cached ones must appear WITH their tile)
function CelBot({ src, style }) {
  return (
    <img className="cf-bot" src={src} alt="" decoding="async" draggable={false} style={style}
      onLoad={(e) => { const el = e.currentTarget;
        if (el.classList.contains("ld") || el.classList.contains("ld-i")) return;
        const t0 = el.dataset.t0 ? +el.dataset.t0 : 0;
        const quick = t0 && performance.now() - t0 < 160;
        const done = () => el.classList.add(quick ? "ld-i" : "ld");
        if (el.decode) el.decode().then(done).catch(done); else done();
      }}
      ref={(el) => { if (!el || el.dataset.t0) return;
        el.dataset.t0 = String(performance.now());
        if (el.complete && el.naturalWidth) el.classList.add("ld-i");
      }} />
  );
}

// window status chip: READY renders NOTHING on rows (canvas law)
function CelWin({ w }) {
  if (!w || w.status === "ready") return null;
  const cls = cellarWinClass(w.status);
  return <span className={"cl-win " + cls}><span className="dot"></span>{w.status === "fading" ? "DRINK SOON" : "RESTING"}</span>;
}

// the drink-window band (detail): track spans [from−4, to+2] so the
// window floats inside it — the canvas boards' proportions, derived once
function CelWindow({ w }) {
  const y0 = parseInt(w.from, 10), y1 = parseInt(w.to, 10);
  const t0 = y0 - 4, t1 = y1 + 2, span = Math.max(1, t1 - t0);
  const nowY = new Date().getFullYear();
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const b0 = (y0 - t0) / span, b1 = (y1 - t0) / span;
  const now = clamp((nowY - t0) / span, 0.04, 0.96);
  const st = cellarWinClass(w.status);
  return (
    <div className="cd-window">
      <div className="cd-window-h">
        <span>Drink window</span>
        <span className={"st " + st}><span className="dot"></span>{w.word}</span>
      </div>
      <div className="cd-track">
        <div className="cd-band" style={{ left: (b0 * 100) + "%", width: ((b1 - b0) * 100) + "%" }}></div>
        <div className="cd-now" style={{ left: (now * 100) + "%" }}></div>
      </div>
      <div className="cd-track-labs"><span>{w.from}</span><span>{w.to}</span></div>
    </div>
  );
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
    // Safari only raises the keyboard for focus() run synchronously
    ReactDOM.flushSync(() => onOpen(k));
    if (inputRef.current) inputRef.current.focus();
    // the keyboard will cover low fields: bring the field into view
    // once the viewport has resized around it
    setTimeout(() => { if (fieldRef.current) fieldRef.current.scrollIntoView({ block: "center", behavior: "smooth" }); }, 260);
  };
  // accent-blind narrowing: "sem" must find Sémillon, "gruner" Grüner
  const fold = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const qn = fold(q.trim());
  let rows = [];
  if (active) {
    const starts = list.filter((x) => fold(x).startsWith(qn));
    const holds = qn ? list.filter((x) => !fold(x).startsWith(qn) && fold(x).includes(qn)) : [];
    rows = [...starts, ...holds].filter((x) => !(chips || []).includes(x)).slice(0, 6);
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
            {(chips || []).map((c) => (
              <span key={c} className="ca2-chip">{c} <span className="x" onClick={(ev) => { ev.stopPropagation(); onUnpick(c, false); }}>✕</span></span>
            ))}
            {(otherChips || []).map((c) => (
              <span key={"o:" + c} className="ca2-chip">{c} <span className="x" onClick={(ev) => { ev.stopPropagation(); onUnpick(c, true); }}>✕</span></span>
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
        <React.Fragment>
          <div className="ca2-dd">
            {rows.map((x) => (
              <div key={x} className="ca2-dd-row" onPointerDown={(ev) => { ev.preventDefault(); onPick(x, false); setQ(""); }}>{mark(x)}</div>
            ))}
            {showOther ? (
              <div className="ca2-dd-row" onPointerDown={(ev) => { ev.preventDefault(); onPick(q.trim(), true); setQ(""); }}>Use “{q.trim()}”</div>
            ) : null}
            {!rows.length && !showOther ? <div className="ca2-dd-row" style={{ opacity: 0.5 }}>Nothing in the lists</div> : null}
          </div>
          <div className="ca2-dd-note">{note || "Tap one to add it · typing alone adds nothing"}</div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

// ---------- the screen ----------
function CellarScreen({ light, desktop, leaving, onToast }) {
  const [entries, setEntries] = React.useState(() => CellarStore.all());
  const [view, setView] = React.useState({ name: "rack" });
  const [filters, setFilters] = React.useState([]);
  const [sheet, setSheet] = React.useState(null);       // { id, n0, n, cls }
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
  const openSheet = (id) => {
    const rec = CellarStore.get(id); if (!rec) return;
    setSheet({ id, n0: rec.count, n: rec.count, cls: "" });
    requestAnimationFrame(() => requestAnimationFrame(() =>
      setSheet((s) => s && s.id === id ? { ...s, cls: "in" } : s)));
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
          setView((v) => (v.name === "detail" && v.id === id ? { name: "rack" } : v));
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
    setView({ name: "form", mode, id: id || null });
  };
  const submitForm = () => {
    if (!form.wine.trim()) return;
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
      setView({ name: "detail", id: view.id });
      return;
    }
    const dup = CellarStore.findByIdentity(identity);
    if (dup) {
      // duplicate add = identity match → count++, zero pipeline (§5.1)
      CellarStore.update(dup.id, { count: dup.count + 1 });
      refresh();
      if (onToast) onToast("ALREADY SLEEPING · NOW ×" + (dup.count + 1));
      setView({ name: "rack" });
      return;
    }
    const rec = CellarStore.add({ identity, facts, window: null });
    CellarStore.update(rec.id, { window: cellarComputeWindow(rec) });
    refresh();
    vaTrackCel("cellar_added", { wine: identity.wine, method: "form" });
    setView({ name: "rack" });
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

  // headless drive for the suite + the band probe
  React.useEffect(() => {
    window.__vaCellar = {
      view: () => view.name,
      go: (name, id) => (name === "form" ? openForm("add") : setView(id ? { name, id } : { name })),
      openSheet, closeSheet, refresh,
    };
    return () => { if (window.__vaCellar) delete window.__vaCellar; };
  });

  const sheetRec = sheet ? CellarStore.get(sheet.id) : null;

  // ---------- pieces ----------
  const head = (
    <div className="cl-head">
      <div className="cl-head-row">
        <div>
          <h2 className="cl-title">Cellar</h2>
          <div className="cl-count">{countLine}</div>
        </div>
        {entries.length === 0 ? null : (
          <div className="cl-add" onClick={() => openForm("add")}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
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
      ) : rows.map((e, i) => (
        <div key={e.id} className={"cl2-tilewrap" + (closingId === e.id ? " closing" : "")} style={{ "--cfi": Math.min(i * 30, 360) + "ms" }}>
          <div className="cl2-tile" onClick={() => setView({ name: "detail", id: e.id })}>
            <div className="bot"><CelBot src={celBottleFor(e)}></CelBot></div>
            <div className="tx">
              <div className="p">{e.identity.producer}</div>
              <div className="n">{e.identity.wine}</div>
              <div className="gy">{celGyLine(e)}</div>
              <div className="lc">{celLocLine(e)}</div>
            </div>
            <span className="cl-qty" onClick={(ev) => { ev.stopPropagation(); openSheet(e.id); }}>×{e.count}</span>
            <CelWin w={e.window}></CelWin>
          </div>
        </div>
      ))}
    </div>
  );
  const empty = (
    <div className="cl-empty">
      <div className="cl-empty-bots">
        <CelBot src="assets/bottle-white.png" style={{ height: "108px", transform: "rotate(-3deg)" }}></CelBot>
        <CelBot src="assets/bottle-red.png" style={{ height: "128px" }}></CelBot>
        <CelBot src="assets/bottle-white.png" style={{ height: "100px", transform: "rotate(2.5deg)" }}></CelBot>
      </div>
      <h3 className="cl-empty-title">The rack stands empty.</h3>
      <span className="cl-jotline">
        every cellar starts with one
        <CelWave></CelWave>
      </span>
      <div className="cl-cta cl2-cta" onClick={() => openForm("add")}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
    </div>
  );

  // ---------- desktop rack (the menu spans the window; rack width-capped) ----------
  const deskRack = (
    <div className={"va-layer cl-screen cf-screen cf-rack" + (view.name !== "rack" ? " cf-hidden" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar">
      <div className="cld-wrap">
        <div className="cld-head">
          <div>
            <h2 className="cld-title">Cellar</h2>
            <div className="cl-count">{countLine}</div>
          </div>
          {entries.length === 0 ? null : (
            <div className="cl-add" onClick={() => openForm("add")}><CelPlusIcon></CelPlusIcon><span>Add a bottle</span></div>
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
              ) : rows.map((e) => (
                <div className="cld2-cols cld-row" key={e.id} onClick={() => setView({ name: "detail", id: e.id })}>
                  <span className="bot"><CelBot src={celBottleFor(e)}></CelBot></span>
                  <span>
                    <div className="cl-eyebrow">{[e.identity.vintage, e.identity.producer && e.identity.producer.toUpperCase()].filter(Boolean).join(" · ")}</div>
                    <div className="cl-wine" style={{ marginTop: "3px" }}>{e.identity.wine}</div>
                  </span>
                  <span className="cl-sub" style={{ marginTop: 0 }}>{celGrapesLine(e).toUpperCase()}</span>
                  <span className="cl-sub" style={{ marginTop: 0 }}>{celLocLine(e).toUpperCase()}</span>
                  <span><CelWin w={e.window}></CelWin></span>
                  <span className="added">{celAddedLabel(e.addedTs).toUpperCase()}</span>
                  <span className="cl-qty" onClick={(ev) => { ev.stopPropagation(); openSheet(e.id); }}>×{e.count}</span>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );

  const rack = desktop ? deskRack : (
    <div className={"va-layer cl-screen cf-screen cf-rack" + (view.name !== "rack" ? " cf-hidden" : "") + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar">
      <div className={"cf-scroll" + (scrolled.rack ? " scrolled" : "")} onScroll={armScroll("rack")}>
        <div className="cf-flow">
          {head}
          {pills}
          {entries.length === 0 ? empty : tiles}
        </div>
      </div>
      {sheet ? <div className={"cl-scrim " + sheet.cls} onClick={closeSheet}></div> : null}
    </div>
  );

  // ---------- detail (the wine, opened — sparse S1 records) ----------
  let detail = null;
  if (view.name === "detail") {
    const d = CellarStore.get(view.id);
    if (!d) { detail = null; }
    else {
      const stats = [];
      const g = celGrapesLine(d);
      if (g) stats.push(["GRAPE", g]);
      if (d.facts && d.facts.color) stats.push(["STYLE", d.facts.color]);
      const loc = celLocLine(d);
      if (loc) stats.push(["REGION", loc]);
      if (d.identity.vintage) stats.push(["VINTAGE", d.identity.vintage]);
      detail = (
        <div className={"va-layer cl-screen cf-screen cf-detail" + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar detail">
          <div className="cl2-nav">
            <span className="cl2-circ" onClick={() => setView({ name: "rack" })}><CelBackIcon></CelBackIcon></span>
            <span></span>
          </div>
          <div className={"cf-scroll" + (scrolled.detail ? " scrolled" : "")} onScroll={armScroll("detail")}>
            <div className="cf-flow">
              <div className="cd-scroll">
                <div className="cd-heroB" style={{ paddingTop: "6px" }}>
                  <div className="bot"><CelBot src={celBottleFor(d)} style={{ height: "150px" }}></CelBot></div>
                  <div className="cd-eyebrow" style={{ marginTop: "14px" }}>{d.identity.producer}</div>
                  <div className="cd-name">{d.identity.wine}</div>
                  {celGyLine(d) ? <div className="clf-gy">{celGyLine(d)}</div> : null}
                  {celLocLine(d) ? <div className="clf-loc">{celLocLine(d)}</div> : null}
                  <span className="cl-qty clf-qty" onClick={() => openSheet(d.id)}>×{d.count}</span>
                </div>
                {d.window ? <CelWindow w={d.window}></CelWindow> : null}
                {d.story ? <div className="cd-story">{d.story}</div> : null}
                {stats.length ? (
                  <div className="cd-stats">
                    {stats.map(([k, v]) => (
                      <div className="cd-stat" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
                    ))}
                  </div>
                ) : null}
                {d.tastes ? (
                  <div className="cd-scales">
                    <div className="cd-scales-h">The palate</div>
                    {Object.entries({ ACID: ["SOFT", "BRIGHT"], SWEET: ["DRY", "SWEET"], TANNIN: ["SILK", "GRIP"], BODY: ["LIGHT", "FULL"] }).map(([k, ends]) => (
                      d.tastes[k.toLowerCase()] == null ? null : (
                        <div className="cd-scale" key={k}>
                          <span className="lab">{ends[0]}</span>
                          <span className="track"><span className="mark" style={{ left: (d.tastes[k.toLowerCase()] * 100) + "%" }}></span></span>
                          <span className="lab r">{ends[1]}</span>
                        </div>
                      )
                    ))}
                  </div>
                ) : null}
                <div className="cd-foot">
                  <span className="cd-fix" onClick={() => openForm("edit", d.id)}>Not the right wine? Set it right</span>
                </div>
              </div>
            </div>
          </div>
          {sheet ? <div className={"cl-scrim " + sheet.cls} onClick={closeSheet}></div> : null}
        </div>
      );
    }
  }

  // ---------- the manual form (add + identity-level correction) ----------
  let formView = null;
  if (view.name === "form") {
    const editing = view.mode === "edit";
    const vintages = cellarVintages();
    const L = window.CELLAR_LISTS || { types: [], countries: [], grapes: [] };
    formView = (
      <div className={"va-layer cl-screen cf-screen cf-form" + (leaving ? " leaving" : "")} data-screen-label="Flow — Cellar form">
        <div className="cl2-nav">
          <span></span>
          <span className="cl2-circ" onClick={() => setView(editing ? { name: "detail", id: view.id } : { name: "rack" })}>✕</span>
        </div>
        <div className={"cf-scroll" + (scrolled.form ? " scrolled" : "")} onScroll={armScroll("form")}>
          <div className="cf-flow">
            <div className="ca-formcol" onClick={() => setActiveSel(null)}>
              <div className="ca-fix-head">
                <h2 className="ca-fix-title">{editing ? "Set it right." : "Your bottle, your words."}</h2>
              </div>
              <div className="ca-form">
                <div className="ca-form-grid" onClick={(ev) => ev.stopPropagation()}>
                  <div className="ca-field full"><div className="k">Producer</div>
                    <div className="v"><input value={form.producer} placeholder="Who made it"
                      onFocus={(e) => setTimeout(() => e.target.closest(".ca-field").scrollIntoView({ block: "center", behavior: "smooth" }), 260)}
                      onChange={(e) => setForm((f) => ({ ...f, producer: e.target.value }))} /></div>
                  </div>
                  <div className="ca-field full"><div className="k">Wine</div>
                    <div className="v"><input value={form.wine} placeholder="What the label calls it"
                      onFocus={(e) => setTimeout(() => e.target.closest(".ca-field").scrollIntoView({ block: "center", behavior: "smooth" }), 260)}
                      onChange={(e) => setForm((f) => ({ ...f, wine: e.target.value }))} /></div>
                  </div>
                  <CelCombo k="vintage" label="Vintage" list={vintages} value={form.vintage}
                    active={activeSel === "vintage"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("vintage")} note="Tap one to choose it · typing alone picks nothing"></CelCombo>
                  <CelCombo k="type" label="Type" list={L.types} value={form.type}
                    active={activeSel === "type"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("type")} note="Tap one to choose it · typing alone picks nothing"></CelCombo>
                  <CelCombo k="grapes" label="Grape" full list={L.grapes} chips={form.grapes} otherChips={form.otherGrapes}
                    allowOther active={activeSel === "grapes"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("grapes")} onUnpick={unpickGrape}></CelCombo>
                  <div className="ca-field"><div className="k">Region</div>
                    <div className="v"><input value={form.region} placeholder="Where it grew"
                      onFocus={(e) => setTimeout(() => e.target.closest(".ca-field").scrollIntoView({ block: "center", behavior: "smooth" }), 260)}
                      onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} /></div>
                  </div>
                  <CelCombo k="country" label="Country" list={L.countries} value={form.country}
                    active={activeSel === "country"} onOpen={setActiveSel} onClose={() => setActiveSel(null)}
                    onPick={pickSel("country")} note="Tap one to choose it · typing alone picks nothing"></CelCombo>
                </div>
                <div className="ca-form-note">Vintage, type, grape and country come from the cellar's own lists, so your rack sorts clean.</div>
              </div>
              <div className="ca-form-ctas">
                <div className={"ca-cta fill" + (form.wine.trim() ? "" : " disabled")} onClick={submitForm}>
                  {editing ? "Set it right" : "Add to the cellar"}
                </div>
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
      {/* THE COUNT SHEET — E-A (cellar-plan §5.6): strictly transient,
          genuinely bottom-anchored, unmounted after the close animation.
          Nothing carries `bottom:` at rest. */}
      {sheet && sheetRec ? (
        <div className={"cl-sheet " + sheet.cls}>
          <div className="cl-grab"></div>
          <div className="cl-sheet-name">{sheetRec.identity.wine}</div>
          <div className="cl-sheet-sub">{[sheetRec.identity.producer, sheetRec.identity.vintage, celLocLine(sheetRec)].filter(Boolean).join(" · ").toUpperCase()}</div>
          <div className="cl-sheet-cap">Bottles on hand</div>
          <div className="cl-sheet-row">
            <span className={"cl-stepbtn" + (sheet.n === 0 ? " dim" : "")} onClick={() => setSheet((s) => s && s.n > 0 ? { ...s, n: s.n - 1 } : s)}><CelMinusIcon></CelMinusIcon></span>
            <span className="cl-bignum">{sheet.n}</span>
            <span className="cl-stepbtn" onClick={() => setSheet((s) => s && ({ ...s, n: s.n + 1 }))}><CelPlusIcon></CelPlusIcon></span>
          </div>
          <div className="cl-sheet-note">At zero, the wine leaves the rack</div>
          <div className="cl-done" onClick={closeSheet}>Done</div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

Object.assign(window, { CellarScreen });
