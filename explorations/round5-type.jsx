// ROUND 5 — Type system boards
// Exports: TypeSystem, SansLab

function TypeSystem() {
  return (
    <div className="r5 r5-dark r5-ts" data-screen-label="R5 — Type system, resolved">
      <div className="r5-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r5-ts-label">THE TYPE SYSTEM — RESOLVED</div>
        <div className="r5-ts-sub" style={{ maxWidth: "70ch" }}>
          Instrument Serif is the display voice — the "Modern Tongue" you keep returning to. Its
          teardrop terminals are exactly the "thin flourishes with thicker ends" you loved in Thorn &amp; Tale.
          A script (Pinyon) handles one word at a time — the dance, never the whole ballet. Body is sans, settled at right.
        </div>
      </div>

      <div className="r5-ts-cols" style={{ position: "relative", zIndex: 2, marginTop: "22px" }}>
        <div>
          <div className="r5-ctx-eyebrow">DISPLAY · INSTRUMENT SERIF — THE ANATOMY</div>
          <div className="r5-anat">
            <span className="r5-anat-i">M</span>oon
            <span className="r5-anat-mark" style={{ left: "150px", top: "16px" }}></span>
            <span className="r5-anat-cap" style={{ left: "164px", top: "10px" }}>teardrop terminal — the thick end of a thin stroke</span>
            <span className="r5-anat-mark" style={{ left: "16px", top: "104px" }}></span>
            <span className="r5-anat-cap" style={{ left: "0", top: "126px" }}>high contrast · fluid · ancient-modern</span>
          </div>
          <div className="r5-ts-sub" style={{ marginTop: "34px", maxWidth: "44ch" }}>
            Not a ghost story (Gilda), not a fashion house (Prata), not a wavering voice (Cormorant).
            An expensive thing that has existed a long time.
          </div>
        </div>

        <div>
          <div className="r5-ctx">
            <div className="r5-ctx-eyebrow">SCRIPT IN CONTEXT — THE REVEAL LINE</div>
            <div style={{ marginTop: "10px" }}>
              <span className="r5-serif" style={{ fontSize: "34px", color: "var(--bone)" }}>The </span>
              <span className="r5-script" style={{ fontSize: "52px", color: "var(--apri)" }}>Moon</span>
            </div>
            <div className="r5-ts-sub" style={{ marginTop: "4px" }}>Only the card's proper noun gets the script. Everything around it stays upright.</div>
          </div>

          <div className="r5-ctx">
            <div className="r5-ctx-eyebrow">SCRIPT IN CONTEXT — THE CHOSEN LENS</div>
            <div style={{ marginTop: "8px" }}>
              <span className="r5-mono" style={{ fontSize: "9px", color: "rgba(245,170,93,0.85)" }}>III · THE LENS</span>
              <div className="r5-script" style={{ fontSize: "40px", color: "var(--bone)", marginTop: "2px", lineHeight: 1 }}>the beautiful lie</div>
            </div>
            <div className="r5-ts-sub" style={{ marginTop: "6px" }}>When you commit to a lens, its name blooms into script — a small reward for choosing.</div>
          </div>

          <div className="r5-ctx">
            <div className="r5-ctx-eyebrow">SCRIPT IN CONTEXT — KEPT TO ONE WORD</div>
            <div className="r5-serif-i" style={{ fontSize: "23px", color: "rgba(239,236,228,0.72)", marginTop: "8px", lineHeight: 1.3 }}>
              Things are not as they <span className="r5-script" style={{ fontStyle: "normal", fontSize: "34px", color: "var(--apri)" }}>seem</span> tonight.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SansLab() {
  const para = "Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. Bone-dry, eleven percent, all misdirection.";
  return (
    <div className="r5 r5-dark r5-sl" data-screen-label="R5 — The body sans, settled">
      <div className="r5-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r5-ts-label">THE BODY SANS — SAME SIZE, SAME WEIGHT, PICK ONE</div>
        <div className="r5-ts-sub">All at 15.5px / 400 — the weight that read well in "Light Pour II." The openness you felt in Hanken was a light-300/tiny-size problem, not the family.</div>
      </div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1, marginTop: "6px" }}>
        <div className="r5-sl-row">
          <div className="r5-sl-tag" style={{ color: "var(--apri)" }}>INSTRUMENT SANS — THE SIBLING · RECOMMENDED</div>
          <div className="r5-sl-text" style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400 }}>{para}</div>
          <div className="r5-ts-sub" style={{ marginTop: "6px" }}>Drawn as the literal companion to Instrument Serif — tighter aperture, quietly closed, made to sit beneath it.</div>
        </div>
        <div className="r5-sl-row">
          <div className="r5-sl-tag" style={{ color: "rgba(239,236,228,0.55)" }}>SCHIBSTED GROTESK — MORE CHARACTER</div>
          <div className="r5-sl-text" style={{ fontFamily: "'Schibsted Grotesk', sans-serif", fontWeight: 400 }}>{para}</div>
        </div>
        <div className="r5-sl-row">
          <div className="r5-sl-tag" style={{ color: "rgba(239,236,228,0.55)" }}>MULISH — THE QUIETEST</div>
          <div className="r5-sl-text" style={{ fontFamily: "Mulish, sans-serif", fontWeight: 400 }}>{para}</div>
        </div>
        <div className="r5-sl-row" style={{ opacity: 0.4, borderBottom: "none" }}>
          <div className="r5-sl-tag" style={{ color: "rgba(239,236,228,0.5)", textDecoration: "line-through" }}>HANKEN GROTESK — TOO OPEN, PER YOUR NOTE</div>
          <div className="r5-sl-text" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 300, fontSize: "12.5px" }}>{para}</div>
        </div>
        <div className="r5-sl-note">
          Veil II-B felt worse than Light Pour II for one reason: it ran Hanken at 300 weight, 12.5px.
          Same family, starved of ink. Lock body to ≥400 / ≥15px and the "too open" feeling goes away —
          but Instrument Sans closes it further and ties the system together.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TypeSystem, SansLab });
