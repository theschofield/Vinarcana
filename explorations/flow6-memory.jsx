// FLOW v6 — MEMORY: the journal of kept pours (the Annotated Ledger).
// Canon: "Memory - Final.html" boards (memory-final.css geometry, verbatim).
// · Newest-first, grouped by month under mono rules; last row per month
//   drops its divider. Row = the Pour pairing miniaturized + eyebrow +
//   wine + jot (Nothing You Could Do) + grape · region. Aside: heart + date.
// · Swipe a row left (−118px) → EDIT (apricot pen, opens the jot inline)
//   then DELETE (quiet, no alarm color).
// · Tap a row → root flies the row's card into The Pour (no re-draw).
// · Data rides window.MemoryStore (memory-store.js) — the storage seam.

function MemHeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
}
function MemPenIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
  );
}
function MemTrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
}
function MemWave({ cls }) {
  return (
    <svg className={cls || "mf-wave"} viewBox="0 0 120 10" preserveAspectRatio="none" fill="none">
      <path d="M2 5.5 C 25 2.5, 48 6.5, 70 4.5 S 108 3, 118 4.8" strokeWidth="1.3" strokeLinecap="round"></path>
    </svg>
  );
}

const memMonthLabel = (ts) => {
  const d = new Date(ts);
  const m = d.toLocaleString("en-US", { month: "long" });
  return d.getFullYear() === new Date().getFullYear() ? m : m + " " + d.getFullYear();
};
const memDateLabel = (ts) => new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric" });

// ---------- one ledger row ----------
function MemRow({ e, last, open, editing, picked, closing, onSwipe, onTap, onHeart, onEdit, onDelete, onJotSave, style }) {
  const c = window.ARCANA && ARCANA[e.card];
  const rowRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const drag = React.useRef(null);
  const [jotDraft, setJotDraft] = React.useState(e.jot || "");
  React.useEffect(() => { if (editing) setJotDraft(e.jot || ""); }, [editing]);

  const down = (ev) => {
    if (editing) return;
    drag.current = { x: ev.clientX, y: ev.clientY, on: false, dx: 0 };
  };
  const move = (ev) => {
    const d = drag.current; if (!d) return;
    const dx = ev.clientX - d.x, dy = ev.clientY - d.y;
    if (!d.on) {
      if (Math.abs(dx) < 9 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      d.on = true;
      ev.currentTarget.setPointerCapture(ev.pointerId);
      if (wrapRef.current) wrapRef.current.classList.add("drag");
    }
    const base = open ? -118 : 0;
    let off = base + dx;
    if (off > 0) off = 0;
    if (off < -118) off = -118 - Math.min(22, (-118 - off) * 0.25); // gentle resistance past the wells
    d.dx = off - base;
    const el = rowRef.current;
    if (el) { el.style.transition = "none"; el.style.transform = "translateX(" + off + "px)"; }
  };
  const up = (ev) => {
    const d = drag.current; drag.current = null;
    const el = rowRef.current;
    if (el) { el.style.transition = ""; el.style.transform = ""; }
    if (!d) return;
    // judge by TOTAL travel, not just streamed moves — a fast mouse drag can
    // reach pointerup with barely any pointermove events, and it must never
    // read as a tap
    const tx = ev.clientX - d.x, ty = ev.clientY - d.y;
    const horizontal = Math.abs(tx) > 20 && Math.abs(tx) > Math.abs(ty);
    if (d.on || horizontal) {
      const off = (open ? -118 : 0) + tx;
      const wrap = wrapRef.current;
      if (wrap) setTimeout(() => wrap.classList.remove("drag"), 340);
      onSwipe(off < -59 ? e.id : null);
      return;
    }
    if (Math.abs(tx) > 8 || Math.abs(ty) > 8) return; // ambiguous wobble: neither tap nor swipe
    if (editing) return;
    if (open) { onSwipe(null); return; }
    onTap(e, rowRef.current);
  };

  const jotCommit = () => onJotSave(e.id, jotDraft.trim());
  return (
    <div ref={wrapRef} className={"mf-swipewrap" + (open ? " open" : "") + (closing ? " closing" : "")} style={style}>
      <div className="mf-wells">
        <div className="mf-well edit" onClick={() => onEdit(e.id)}><span className="icobox"><MemPenIcon></MemPenIcon></span><span className="cap">EDIT</span></div>
        <div className="mf-well del" onClick={() => onDelete(e.id)}><span className="icobox"><MemTrashIcon></MemTrashIcon></span><span className="cap">DELETE</span></div>
      </div>
      <div ref={rowRef} className={"mf-row" + (last ? " noline" : "") + (open ? " swiped" : "") + (picked ? " picked" : "")}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div className="mf-pair">
          {c ? <img className="card" src={"assets/cards/thumbs/" + c.file + ".webp"} alt={c.name} draggable={false} /> : null}
          <img className="bottle" src={e.bottle || "assets/bottle-red.png"} alt={e.wine} draggable={false} />
        </div>
        <div className="mf-main">
          <div className="mf-eyebrow">{c ? c.num + " · " + c.name : ""}</div>
          <div className="mf-winewrap">
            <div className="mf-wine">{e.wine}</div>
            {e.hearted ? <MemWave></MemWave> : null}
          </div>
          {editing ? (
            <input className="mf-jot-input" value={jotDraft} autoFocus
              onChange={(ev) => setJotDraft(ev.target.value)}
              onBlur={jotCommit}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") ev.currentTarget.blur();
                if (ev.key === "Escape") { setJotDraft(e.jot || ""); onJotSave(e.id, null); }
              }}
              onPointerDown={(ev) => ev.stopPropagation()} />
          ) : (
            <div className="mf-jot">{e.jot}</div>
          )}
          <div className="mf-sub">{memorySubLine(e.sub)}</div>
        </div>
        <div className="mf-aside">
          <div className={"mf-heart" + (e.hearted ? " on" : "")}
            onClick={(ev) => { ev.stopPropagation(); onHeart(e.id, !e.hearted); }}
            onPointerDown={(ev) => ev.stopPropagation()}>
            <MemHeartIcon></MemHeartIcon>
          </div>
          <span className="mf-date">{memDateLabel(e.ts)}</span>
        </div>
      </div>
    </div>
  );
}

// ---------- the screen ----------
function MemoryScreen({ light, leaving, pickedId, onOpen, onDraw }) {
  const [entries, setEntries] = React.useState(() => MemoryStore.all());
  const [filterOn, setFilterOn] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [closingId, setClosingId] = React.useState(null);
  const refresh = () => setEntries(MemoryStore.all());

  const rows = filterOn ? entries.filter((e) => e.hearted) : entries;
  const months = [];
  rows.forEach((e) => { const m = memMonthLabel(e.ts); if (!months.includes(m)) months.push(m); });

  const heartedN = entries.filter((e) => e.hearted).length;
  const count = entries.length === 0 ? "NOTHING KEPT YET"
    : filterOn ? heartedN + " hearted · of " + entries.length + " kept"
    : entries.length + " kept · since " + memMonthLabel(entries[entries.length - 1].ts).split(" ")[0];

  const heart = (id, on) => { MemoryStore.update(id, { hearted: on }); refresh(); };
  const jotSave = (id, jot) => {
    if (jot != null && jot.length) MemoryStore.update(id, { jot });
    setEditId(null); refresh();
  };
  const startEdit = (id) => {
    setOpenId(null);
    // flushSync so the input exists inside the tap gesture — mobile Safari
    // only raises the keyboard for focus() run synchronously in the event
    ReactDOM.flushSync(() => setEditId(id));
  };
  const del = (id) => {
    setOpenId(null); setClosingId(id);
    setTimeout(() => { MemoryStore.remove(id); setClosingId(null); refresh(); }, 260);
  };
  const tapRow = (e, rowEl) => {
    if (openId) { setOpenId(null); return; }
    const va = vaRoot(); if (!va || !rowEl) return;
    const pair = rowEl.querySelector(".mf-pair");
    const img = pair && pair.querySelector(".card");
    if (!img) return;
    const v = va.getBoundingClientRect(), s = vaScale(), pr = pair.getBoundingClientRect();
    onOpen(e, {
      left: (pr.left - v.left) / s + img.offsetLeft,
      top: (pr.top - v.top) / s + img.offsetTop,
      width: img.offsetWidth, height: img.offsetHeight,
    });
  };

  let flat = -1;
  return (
    <div className={"va-layer mf-screen" + (leaving ? " leaving" : "")} data-screen-label="Flow — Memory">
      <div className="mf-head">
        <div className="mf-head-row">
          <div>
            <h2 className="mf-title">Memory</h2>
            <div className="mf-count">{count}</div>
          </div>
          {entries.length === 0 ? null : (
            <div className={"mf-pill" + (filterOn ? " on" : "")} onClick={() => { setOpenId(null); setFilterOn(!filterOn); }}>
              <MemHeartIcon></MemHeartIcon>
              <span>Hearted</span>
            </div>
          )}
        </div>
      </div>
      {entries.length === 0 ? (
        <div className="mf-empty">
          <img className="mf-snake" src={light ? "assets/bottle-snake-light.png" : "assets/bottle-snake-dark.png"} alt="" />
          <h3 className="mf-empty-title">No memories yet.</h3>
          <span className="mf-jotline">
            the first bottle is still out there
            <svg viewBox="0 0 120 10" preserveAspectRatio="none" fill="none">
              <path d="M2 5.5 C 25 2.5, 48 6.5, 70 4.5 S 108 3, 118 4.8" strokeWidth="1.3" strokeLinecap="round"></path>
            </svg>
          </span>
          <div className="mf-cta" onClick={onDraw}>Draw a card</div>
        </div>
      ) : (
        <div className="mf-list">
          {months.map((m) => {
            const inMonth = rows.filter((e) => memMonthLabel(e.ts) === m);
            if (!inMonth.length) return null;
            return (
              <React.Fragment key={m}>
                <div className="mf-group"><span className="txt">{m.toUpperCase()}</span><span className="rule"></span></div>
                {inMonth.map((e, i) => {
                  flat += 1;
                  return (
                    <MemRow key={e.id} e={e} last={i === inMonth.length - 1}
                      open={openId === e.id} editing={editId === e.id}
                      picked={pickedId === e.id} closing={closingId === e.id}
                      style={{ "--mfi": Math.min(flat * 30, 360) + "ms" }}
                      onSwipe={setOpenId} onTap={tapRow} onHeart={heart}
                      onEdit={startEdit} onDelete={del} onJotSave={jotSave}></MemRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MemoryScreen });
