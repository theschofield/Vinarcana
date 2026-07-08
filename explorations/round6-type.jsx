// ROUND 6 — Gin-label type hunt
// Exports: GinHunt

function GinHunt() {
  const faces = [
    { cls: "f-fraunces", tag: "FRAUNCES", hero: true, note: "Hero pick. Old-style with ball terminals and a wonky, hand-cut soul — ancient and modern at once. The opsz axis lets the thins go dramatic at display, tame at body. Closest to Thorn & Tale's thick-tipped flourishes." },
    { cls: "f-dmserif", tag: "DM SERIF DISPLAY", note: "High-drama Didone. The Empress-1908 / luxe-gin register — razor contrast, confident curves. Less quirk than Fraunces, more glamour." },
    { cls: "f-playfair", tag: "PLAYFAIR DISPLAY", note: "The classic apothecary Didone — what half the good gin labels actually use. Safe, handsome, a touch expected." },
    { cls: "f-cinzel", tag: "CINZEL", note: "Engraved Roman capitals, lapidary — feels chiseled into the bottle. Caps-only, so it sets titles, never sentences. Stately but cooler." },
    { cls: "f-italiana", tag: "ITALIANA", note: "Art-nouveau elegance, the narrowest here — fluid and feminine. Beautiful for a word, can feel delicate at length." },
  ];
  return (
    <div className="r6 r6-dark r6-hunt" data-screen-label="R6 — Gin-label type hunt">
      <div className="r6-mottle"></div>
      <div className="r6-hunt-head">
        <div className="r6-hunt-label">THE EXOTIC GIN-LABEL HUNT — FIVE DISPLAY FACES, SHOWN CLEAN</div>
        <div className="r6-hunt-sub">
          Back to the brief: an expensive spirit from a remote, naturally sexy island — fluid, ornamented,
          considered, never skinny. No script woven in this time; each face stands on its own. The script gets
          one real job, shown below.
        </div>
      </div>
      <div className="r6-hunt-grid">
        {faces.map((f) => (
          <div key={f.tag} className={"r6-spec" + (f.hero ? " hero" : "")}>
            <div className="r6-spec-tag">{f.tag}{f.hero ? " · LEAN" : ""}</div>
            <div className={"r6-spec-moon " + f.cls}>The Moon</div>
            <div className={"r6-spec-num " + f.cls}>III</div>
            <div className={"r6-spec-lens " + f.cls}>Nothing is what it appears</div>
            <div className="r6-spec-note">{f.note}</div>
          </div>
        ))}
      </div>
      <div className="r6-hunt-script">
        <div className="r6-hunt-label" style={{ flex: "none", alignSelf: "center" }}>THE SCRIPT'S ONE JOB →</div>
        <div className="r6-script" style={{ fontSize: "64px", color: "rgba(245,170,93,0.9)", lineHeight: 0.8 }}>Moon</div>
        <div className="r6-hunt-sub" style={{ flex: 1, marginTop: 0, alignSelf: "center" }}>
          Not sprinkled through the UI — reserved for the card's name set huge and faint behind the card
          (see the Reading). One indulgent gesture, earned, then gone.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GinHunt });
