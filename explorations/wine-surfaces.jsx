// WINE SURFACES — the one place a wine becomes pixels (cellar-plan §0 D24;
// docs/component-audit.md §5). Window-global like every screen file, loaded
// before flow5-reveal.jsx so the Pour and the Cellar share it.
// · wineView() normalizes every wine-shaped record the app holds — a cellar
//   record, a resolve candidate — into ONE view model; every name, location
//   and bottle derivation lives here and nowhere else.
// · The components are presentational: props in, DOM out. State stays in
//   the stores and the screens. Nothing here is a layer, nothing pins,
//   nothing anchors — the stage recipe (stage-construction §5) is untouched
//   by construction.

const WINE_BOTTLE_RED = "assets/bottle-red.png";
const WINE_BOTTLE_WHITE = "assets/bottle-white.png";

// D24 (2): red bottle for red wines, white for everything else — the one
// fallback on every screen until real bottle images exist
function wineBottleSrc(color) {
  return String(color || "").toLowerCase() === "red" ? WINE_BOTTLE_RED : WINE_BOTTLE_WHITE;
}

const wineIsYear = (v) => /^\d{4}$/.test(String(v || "").trim());

// THE VIEW MODEL. Accepts a cellar record ({ identity, facts, … }) or a
// resolve candidate ({ producer, wine, region, … } plus, via `extra`, the
// vintage the label reader saw). Every surface renders from this.
function wineView(src, extra) {
  if (!src) return null;
  const rec = !!src.identity;
  const id = rec ? src.identity : src;
  const f = rec ? (src.facts || {}) : src;
  const producer = String(id.producer || "").trim();
  const name = String(id.wine || "").trim();
  // the year is bottle-level truth: a 4-digit vintage or an explicit NV;
  // anything else is UNKNOWN and renders as nothing (D24 (10))
  const vRaw = String((rec ? id.vintage : (extra && extra.vintage)) || "").trim();
  const vintage = vRaw === "NV" || wineIsYear(vRaw) ? vRaw : "";
  const color = rec ? (f.color || null) : (src.type || (extra && extra.type) || null);
  const grapes = rec ? [...(f.grapes || []), ...(f.otherGrapes || [])].join(", ") : "";
  const subRegion = f.subRegion || null;
  // sub-region joins the location whenever LWIN has it (D24 (7))
  const loc = [subRegion, f.region, f.country].filter(Boolean).join(", ");
  const classification = f.classification || null;
  // one-line form: grand-vin names already carry the producer ("Chateau de
  // Fieuzal Blanc") — never print it twice
  const oneLine = producer && name.toLowerCase().startsWith(producer.toLowerCase())
    ? name : [producer, name].filter(Boolean).join(" ");
  return { producer, name, vintage, color, grapes, loc, subRegion, classification, oneLine,
    bottleSrc: wineBottleSrc(color), count: rec ? src.count : null };
}

// the stat rows a wine page shows — only what is actually known; never a
// designation code (AOP, DOCG… — D24 (7))
function wineStatsFor(v) {
  const rows = [];
  if (!v) return rows;
  if (v.grapes) rows.push(["GRAPE", v.grapes]);
  if (v.color) rows.push(["STYLE", v.color]);
  if (v.loc) rows.push(["REGION", v.loc]);
  if (v.classification) rows.push(["CLASSIFICATION", v.classification]);
  if (v.vintage) rows.push(["VINTAGE", v.vintage]);
  return rows;
}

// ---------- the bottle (decode-gated — the deck's img law: a fresh <img>
// blanks on iOS while it decodes; a cached one must appear WITH its row) ----------
function WineBottle({ src, view, style }) {
  const s = src || (view && view.bottleSrc) || WINE_BOTTLE_WHITE;
  return (
    <img className="ws-bot" src={s} alt="" decoding="async" draggable={false} style={style}
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

// ---------- the name block: producer · name · grapes/year · place ----------
// variant: "tile" (the rack) · "hero" (the wine page) · "row" (desktop rack)
function WineNameBlock({ view, variant }) {
  const v = view || {};
  const row = variant === "row";
  return (
    <div className={"ws-name " + (variant || "tile")}>
      <div className="ws-p">{row ? [v.vintage, v.producer].filter(Boolean).join(" · ") : v.producer}</div>
      <div className="ws-n">{v.name}</div>
      {/* grapes and year are two spans: a long grape list clips, the year
          never does (B-008) */}
      {!row && (v.grapes || v.vintage) ? (
        <div className="ws-gy">
          {v.grapes ? <span className="g">{v.grapes}</span> : null}
          {v.grapes && v.vintage ? <span className="sep">·</span> : null}
          {v.vintage ? <span className="y">{v.vintage}</span> : null}
        </div>
      ) : null}
      {!row && v.loc ? <div className="ws-lc">{v.loc}</div> : null}
    </div>
  );
}

// ---------- the stat rows ----------
function WineStats({ rows }) {
  if (!rows || !rows.length) return null;
  return (
    <div className="cd-stats">
      {rows.map(([k, v]) => (
        <div className="cd-stat" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
      ))}
    </div>
  );
}

// ---------- the palate (D24 (1): one vocabulary everywhere; the end the
// wine leans toward lights up) ----------
const WINE_SCALES = [["acid", "SOFT", "ACIDIC"], ["sweet", "DRY", "SWEET"], ["tannin", "SMOOTH", "TANNIC"], ["body", "LIGHT", "BOLD"]];
function WineScale({ l, r, v }) {
  return (
    <div className="ws-scale">
      <span className={"lab" + (v <= 0.5 ? " hot" : "")}>{l}</span>
      <div className="track"><div className="mark" style={{ left: v * 100 + "%" }}></div></div>
      <span className={"lab r" + (v > 0.5 ? " hot" : "")}>{r}</span>
    </div>
  );
}
function WineScales({ tastes }) {
  if (!tastes) return null;
  return (
    <React.Fragment>
      {WINE_SCALES.map(([k, l, r]) => tastes[k] == null ? null : <WineScale key={k} l={l} r={r} v={tastes[k]}></WineScale>)}
    </React.Fragment>
  );
}

// ---------- the drink window band (bottle-level: only rendered when the
// store computed one, which needs a real vintage — D24 (10)). Track spans
// [from−4, to+2] so the window floats inside it (the canvas proportions). ----------
function WineWindow({ w }) {
  if (!w) return null;
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

// ---------- the wine page hero: ONE layout, its states by prop (D24 (3)) —
// the match sheet (believes line, no count), the detail (count chip), and
// S3's settled detail are the same block ----------
function WineHero({ view, believes, count, onCount }) {
  return (
    <div className="cd-heroB">
      <div className="bot"><WineBottle view={view}></WineBottle></div>
      {believes ? <div className="clf-believes">The cellar believes</div> : null}
      <WineNameBlock view={view} variant="hero"></WineNameBlock>
      {count != null ? <span className="cl-qty clf-qty" onClick={onCount}>×{count}</span> : null}
    </div>
  );
}

Object.assign(window, { wineBottleSrc, wineView, wineStatsFor, WineBottle, WineNameBlock, WineStats, WineScales, WineWindow, WineHero });
