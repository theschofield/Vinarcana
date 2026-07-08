// ROUND 4 — boards: reference decode, palette pairing, type II, body voice
// Exports: RefDecode, PaletteBoard, TypeU1, TypeU2, TypeU3, TypeU4, BodyVoice

function RefDecode() {
  const refs = [
    { img: "refs/ref-1.png", name: "Ziporah", chips: ["#f5aa5d", "#181717"], take: "THE leather one. Peach pressed into charcoal — soft, not red, never neon." },
    { img: "refs/ref-2.png", name: "Lovage", chips: ["#395ca8", "#e0e1e0"], take: "Cobalt on bone — the non-orange accent, ligatures with a wink." },
    { img: "refs/ref-3.png", name: "Elixir", chips: ["#c4603d", "#d1c9be"], take: "Terracotta as a surface, cream type. Apothecary-label structure." },
    { img: "refs/ref-4.png", name: "Nafia", chips: ["#ca7549", "#242321"], take: "Type interweaving with imagery — the dance that pulls you in." },
    { img: "refs/ref-5.png", name: "Life Cracked", chips: ["#3a3a38", "#efece4"], take: "Hairline editorial, overlapping baselines, unhurried." },
    { img: "refs/ref-6.png", name: "Hairline Caps", chips: ["#2f332e", "#efece3"], take: "Extreme-contrast caps with looping connectors — ink in a vein." },
    { img: "refs/ref-7.png", name: "Thorn & Tale", chips: ["#152231", "#c67f41", "#dddbd6"], take: "The north star: tendril swashes, greige field, one amber character." },
  ];
  return (
    <div className="r4-dark r4root" data-screen-label="R4 — References decoded">
      <div className="r4-mottle"></div>
      <div className="r4-refs">
        {refs.map((r) => (
          <div key={r.name} className="r4-ref">
            <img src={r.img} alt={r.name} />
            <div className="r4-ref-chips">
              {r.chips.map((c) => <div key={c} className="r4-ref-chip" style={{ background: c }}></div>)}
            </div>
            <div className="r4-ref-name">{r.name}</div>
            <div className="r4-ref-take">{r.take}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaletteBoard() {
  return (
    <div className="r4root" style={{ width: "100%", height: "100%" }} data-screen-label="R4 — Palette pairing">
      <div className="r4-pal" style={{ height: "100%" }}>
        <div className="r4-pal-half r4-dark">
          <div className="r4-mottle"></div>
          <div className="r4-pal-samples">
            <div className="r4-mono" style={{ color: "rgba(236,234,229,0.4)" }}>NIGHT — SAMPLED FROM ZIPORAH</div>
            <div>
              <div className="r4-pal-moon" style={{ color: "#f5aa5d", textAlign: "center" }}>THE MOON</div>
              <div className="r4-pal-num" style={{ color: "rgba(245,170,93,0.8)", textAlign: "center", marginTop: "6px" }}>XVIII</div>
            </div>
            <div className="r4-pal-moon" style={{ color: "#c67f41", fontSize: "30px" }}>THE MOON</div>
            <div className="r4-pal-moon" style={{ color: "#395ca8", fontSize: "30px" }}>THE MOON</div>
          </div>
          <div className="r4-pal-chips">
            <div className="r4-pal-chip"><div className="c" style={{ background: "#181717", border: "1px solid rgba(236,234,229,0.25)" }}></div><div className="h" style={{ color: "rgba(236,234,229,0.6)" }}>#181717</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#f5aa5d" }}></div><div className="h" style={{ color: "rgba(236,234,229,0.6)" }}>#F5AA5D</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#c67f41" }}></div><div className="h" style={{ color: "rgba(236,234,229,0.6)" }}>#C67F41</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#395ca8" }}></div><div className="h" style={{ color: "rgba(236,234,229,0.6)" }}>#395CA8</div></div>
          </div>
        </div>
        <div className="r4-pal-half r4-light">
          <div className="r4-mottle"></div>
          <div className="r4-pal-samples">
            <div className="r4-mono" style={{ color: "rgba(21,34,49,0.45)" }}>DAY — SAMPLED FROM THORN &amp; TALE</div>
            <div>
              <div className="r4-pal-moon" style={{ color: "#152231", textAlign: "center" }}>THE M<span style={{ color: "#c67f41" }}>O</span>ON</div>
              <div className="r4-pal-num" style={{ color: "rgba(21,34,49,0.7)", textAlign: "center", marginTop: "6px" }}>XVIII</div>
            </div>
            <div className="r4-pal-moon" style={{ color: "#395ca8", fontSize: "30px" }}>THE MOON</div>
            <div className="r4-pal-moon" style={{ color: "#c4603d", fontSize: "30px" }}>THE MOON</div>
          </div>
          <div className="r4-pal-chips">
            <div className="r4-pal-chip"><div className="c" style={{ background: "#dddbd6", border: "1px solid rgba(21,34,49,0.2)" }}></div><div className="h" style={{ color: "rgba(21,34,49,0.6)" }}>#DDDBD6</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#152231" }}></div><div className="h" style={{ color: "rgba(21,34,49,0.6)" }}>#152231</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#c67f41" }}></div><div className="h" style={{ color: "rgba(21,34,49,0.6)" }}>#C67F41</div></div>
            <div className="r4-pal-chip"><div className="c" style={{ background: "#c4603d" }}></div><div className="h" style={{ color: "rgba(21,34,49,0.6)" }}>#C4603D</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function R4TypeTile({ label, fonts, children, note }) {
  return (
    <div className="r4-dark r4root r4-tt">
      <div className="r4-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r4-tt-label">{label}</div>
        <div className="r4-tt-fonts">{fonts}</div>
      </div>
      <div className="r4-tt-stage" style={{ position: "relative", zIndex: 2 }}>{children}</div>
      <div className="r4-tt-note" style={{ position: "relative", zIndex: 2 }}>{note}</div>
    </div>
  );
}

function TypeU1() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type U1 — The Gin Label">
      <R4TypeTile
        label="U1 · THE GIN LABEL"
        fonts="Italiana + Ballet (tendrils) + Hanken Grotesk body"
        note="Closest open skeleton to your references — hairline, ancient-modern, island-distillery. For production we license a true swash face (Thorn & Tale, Nafia); Ballet stands in for the tendrils meanwhile."
      >
        <div className="u1-display">The Moon</div>
        <div className="u1-fl" style={{ marginTop: "-6px" }}>the beautiful lie</div>
        <div className="r4-tt-knowing">Things are not as they seem tonight.</div>
        <div className="r4-tt-lens-label">III · THE LENS</div>
        <div className="u1-lens">Nothing is what it appears</div>
      </R4TypeTile>
    </div>
  );
}

function TypeU2() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type U2 — The Hairline Didone">
      <R4TypeTile
        label="U2 · THE HAIRLINE DIDONE"
        fonts="Gilda Display + Hanken Grotesk body"
        note="Life Cracked's cousin — quiet, expensive, editorial. The most restrained of the four; ornament would come from layout, not letterforms."
      >
        <div className="u2-display">The Moon</div>
        <div className="r4-tt-knowing">Things are not as they seem tonight.</div>
        <div className="r4-tt-lens-label">III · THE LENS</div>
        <div className="u2-lens">Nothing is what it appears</div>
      </R4TypeTile>
    </div>
  );
}

function TypeU3() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type U3 — The Full Pour">
      <R4TypeTile
        label="U3 · THE FULL POUR"
        fonts="Prata + Hanken Grotesk body"
        note="Ziporah's weight lives here — fuller stems, same razor hairlines. Holds peach-on-charcoal at small sizes better than any of the others."
      >
        <div className="u3-display">The Moon</div>
        <div className="r4-tt-knowing">Things are not as they seem tonight.</div>
        <div className="r4-tt-lens-label">III · THE LENS</div>
        <div className="u3-lens">Nothing is what it appears</div>
      </R4TypeTile>
    </div>
  );
}

function TypeU4() {
  return (
    <div style={{ width: "100%", height: "100%" }} data-screen-label="Type U4 — The Closest, Restaged">
      <R4TypeTile
        label="U4 · THE CLOSEST, RESTAGED"
        fonts="Cormorant Light + Hanken Grotesk body (no garamond italic anywhere)"
        note="Your 'closest yet' from round 3, kept — but the garamond italic voice is gone. The whisper now speaks in a light sans, and the serif only ever appears at display sizes."
      >
        <div className="u4-display">The Moon</div>
        <div className="r4-tt-knowing">Things are not as they seem tonight.</div>
        <div className="r4-tt-lens-label">III · THE LENS</div>
        <div className="u4-lens">Nothing is what it appears</div>
      </R4TypeTile>
    </div>
  );
}

function BodyVoice() {
  const para = "Toast, lanolin, honeyed nuts — you'd swear it slept in oak. It never saw a stave. Bone-dry, eleven percent, all misdirection.";
  return (
    <div className="r4-dark r4root r4-bv" data-screen-label="R4 — The body problem">
      <div className="r4-mottle"></div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="r4-tt-label">THE BODY PROBLEM — WHAT READS AT 16PX ON A PHONE</div>
      </div>
      <div className="r4-bv-sample" style={{ position: "relative", zIndex: 2 }}>
        <div className="r4-bv-tag" style={{ color: "#f5aa5d" }}>HANKEN GROTESK — THE QUIET SANS · RECOMMENDED</div>
        <div className="r4-bv-text" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 300 }}>{para}</div>
      </div>
      <div className="r4-bv-sample" style={{ position: "relative", zIndex: 2 }}>
        <div className="r4-bv-tag" style={{ color: "rgba(236,234,229,0.5)" }}>NEWSREADER — IF IT MUST BE A SERIF</div>
        <div className="r4-bv-text" style={{ fontFamily: "Newsreader, serif" }}>{para}</div>
      </div>
      <div className="r4-bv-sample" style={{ position: "relative", zIndex: 2, opacity: 0.45 }}>
        <div className="r4-bv-tag" style={{ color: "rgba(236,234,229,0.5)", textDecoration: "line-through" }}>EB GARAMOND ITALIC — REJECTED, PER YOUR NOTE</div>
        <div className="r4-bv-text" style={{ fontFamily: "'EB Garamond', serif", fontStyle: "italic" }}>{para}</div>
      </div>
      <div className="r4-tt-note" style={{ position: "relative", zIndex: 2, marginTop: "auto" }}>
        Rule going forward: serif lives at display sizes only. Everything you actually
        read on a phone — whispers, pours, details — speaks sans. The juxtaposition of
        weights you liked comes from Hanken's 300/500 against the hairline display.
      </div>
    </div>
  );
}

Object.assign(window, { RefDecode, PaletteBoard, TypeU1, TypeU2, TypeU3, TypeU4, BodyVoice });
