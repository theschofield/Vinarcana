// FLOW v6 — THE DECK: a browsable grid of every drawable card face.
// · StatusBar6 adds the DECK link to the persistent header.
// · Tap a card → the root flies it to the read slot and runs the tail of
//   The Draw timeline (settle → bleed → voice → lenses) — face already up.
// · Desktop (fine pointer): tiles float, tilting toward the cursor and
//   catching a specular shine at the cursor's position. Vars are written
//   straight onto the tile (no React state) so it stays 60fps.

function dkFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const DK_TILT = { rx: 9, ry: 11 };

function DeckGrid({ F, drawingId, pickedId, onPick }) {
  const ids = window.ARCANA_ORDER || [];
  const fine = React.useMemo(dkFinePointer, []);
  // the pour's scroll-armed top fade, grid edition (flow6.css)
  const [scrolled, setScrolled] = React.useState(false);

  const move = (e) => {
    if (!fine) return;
    const tile = e.currentTarget;
    const r = tile.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    const tl = tile.firstElementChild;
    // "toward the cursor": the edge under the cursor lifts toward the viewer
    tl.style.setProperty("--dk-rx", ((py - 0.5) * DK_TILT.rx).toFixed(2) + "deg");
    tl.style.setProperty("--dk-ry", (-(px - 0.5) * DK_TILT.ry).toFixed(2) + "deg");
    tl.style.setProperty("--dk-mx", (px * 100).toFixed(1) + "%");
    tl.style.setProperty("--dk-my", (py * 100).toFixed(1) + "%");
  };
  const leave = (e) => {
    if (!fine) return;
    const tl = e.currentTarget.firstElementChild;
    tl.style.setProperty("--dk-rx", "0deg");
    tl.style.setProperty("--dk-ry", "0deg");
  };

  const tap = (e, id) => {
    if (F.phase !== "deck") return;
    const va = vaRoot(); if (!va) return;
    const v = va.getBoundingClientRect(); const s = vaScale();
    const r = e.currentTarget.getBoundingClientRect();
    onPick(id, { left: (r.left - v.left) / s, top: (r.top - v.top) / s, width: r.width / s, height: r.height / s });
  };

  return (
    <div className={"va-layer dk-screen" + (drawingId ? " leaving" : "")} data-screen-label="Flow — Deck">
      <div className={"dk-scroll" + (scrolled ? " scrolled" : "")}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}>
        <div className="dk-grid">
          {ids.map((id, i) => {
            const c = ARCANA[id];
            return (
              <div key={id} className={"dk-tile" + (pickedId === id ? " picked" : "")}
                style={{ "--dki": (140 + Math.min(i * 13, 420)) + "ms" }}
                onClick={(e) => tap(e, id)} onPointerMove={move} onPointerLeave={leave}>
                <div className="dk-tilt">
                  {/* reveal discipline: a thumb that's ready QUICKLY (cache
                      hit — every visit after the first) appears WITH its
                      tile (ld-i, no fade); only a genuine network load gets
                      the 240ms fade (ld). decode() gates both so iOS never
                      paints a half-decoded pop (the img decode law). The
                      old complete-at-ref check missed cached images (the
                      cache resolves a microtask later), so every deck open
                      re-ran the fade — tiles read as "loading" forever. */}
                  <img src={"assets/cards/thumbs/" + c.file + ".webp"} alt={c.name} decoding="async" draggable={false}
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
                  <div className="dk-shine"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- persistent chrome, v6: + DECK + MEMORY + CELLAR ----------
function StatusBar6({ light, onHome, onDeck, deckOn, onMemory, memOn, onCellar, cellarOn, onToast }) {
  const dim = light ? "rgba(21,34,49,0.62)" : "rgba(239,236,228,0.7)";
  return (
    <div className="rx-status">
      <div className="rx-mono wordmark" style={{ fontSize: "9px", color: dim }} onClick={onHome}>VINTNER'S ARCANA</div>
      <div className="links">
        <div className={"rx-mono dk-link" + (deckOn ? " on" : "")} style={{ fontSize: "9px" }} onClick={onDeck}>DECK</div>
        <div className={"rx-mono dk-link" + (memOn ? " on" : "")} style={{ fontSize: "9px" }} onClick={onMemory}>MEMORY</div>
        <div className={"rx-mono dk-link" + (cellarOn ? " on" : "")} style={{ fontSize: "9px" }} onClick={onCellar}>CELLAR</div>
      </div>
    </div>
  );
}

Object.assign(window, { DeckGrid, StatusBar6 });
