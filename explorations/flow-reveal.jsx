// FLOW PROTOTYPE — Reveal (swipe pours) + root App (state machine + Tweaks).
// Loads after flow-app.jsx. Reads window.ARCANA / POURS / tweaks-panel exports.

function BottleSil() {
  return (
    <svg viewBox="0 0 93 336" fill="none">
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z" fill="currentColor" opacity="0.16"></path>
      <path d="M39 8 h15 v22 c0 8 1 12 4 18 c7 12 14 24 14 44 v218 c0 10 -6 18 -16 18 h-19 c-10 0 -16 -8 -16 -18 v-218 c0 -20 7 -32 14 -44 c3 -6 4 -10 4 -18 z" stroke="currentColor" opacity="0.35" strokeWidth="1"></path>
      <rect x="24" y="150" width="45" height="88" rx="3" fill="currentColor" opacity="0.1"></rect>
    </svg>
  );
}

function Scale({ l, r, v }) {
  return (
    <div className="rv-scale">
      <span className={"lab" + (v <= 0.5 ? " hot" : "")}>{l}</span>
      <div className="track"><div className="mark" style={{ left: v * 100 + "%" }}></div></div>
      <span className={"lab r" + (v > 0.5 ? " hot" : "")}>{r}</span>
    </div>
  );
}

function PourPane({ p, light }) {
  return (
    <div className="rv-pane">
      <div className="rv-hero">
        <div className="hero-scale">
          <img className="card" src={p.cardSrc} alt="" />
          {p.bottle ? (
            <img className="bottle" src={p.bottle} alt={p.wine} />
          ) : (
            <div className="bottle-sil" style={{ color: light ? "#152231" : "#efece4" }}><BottleSil></BottleSil></div>
          )}
          <div className="rv-namewrap">
            <div className="rv-pour-label">THE POUR</div>
            <div className="rv-wine">{p.wine}</div>
            <div className="rv-sub">{p.sub[0]}<br />{p.sub[1]}</div>
            {p.cellarMatch ? <div className="rv-cellar-line"><span className="rv-cellar-dot"></span>ONE MATCH SLEEPS IN YOUR CELLAR</div> : null}
          </div>
        </div>
      </div>
      <div className="rv-scroll">
        <div className="rv-body">{p.body}</div>
        <div className="rv-stats">
          {Object.entries(p.stats).map(([k, v]) => (
            <div key={k} className="rv-stat"><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
        <div className="rv-scales">
          <div className="rv-scales-h">ON THE PALATE</div>
          <Scale l="SOFT" r="ACIDIC" v={p.tastes.acid}></Scale>
          <Scale l="DRY" r="SWEET" v={p.tastes.sweet}></Scale>
          <Scale l="SMOOTH" r="TANNIC" v={p.tastes.tannin}></Scale>
          <Scale l="LIGHT" r="BOLD" v={p.tastes.body}></Scale>
        </div>
      </div>
    </div>
  );
}

function Reveal({ card, lens, light, onKeep, onFade, onToast }) {
  const c = ARCANA[card];
  const pours = (POURS[card] || []).map((p) => ({ ...p, cardSrc: "assets/cards/" + c.file + ".png" }));
  const [idx, setIdx] = React.useState(0);
  const ref = React.useRef(null);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    setIdx(Math.max(0, Math.min(pours.length - 1, Math.round(el.scrollLeft / el.clientWidth))));
  };
  const jump = (i) => { const el = ref.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" }); };
  const hl = c.reveal.headline;
  return (
    <div className="rv-screen" data-screen-label="Flow — Reveal">
      <StatusBar light={light} onToast={onToast}></StatusBar>
      <div className="rv-eyebrow"><span className="txt"><span className="card-part">{c.num} · {c.name.toUpperCase()}</span><span className="lens-part"> — {lens.name.toUpperCase()}</span></span></div>
      <div className="rv-headline">{hl[0]}<span className="i">{hl[1]}</span></div>
      <div className="rv-pours" ref={ref} onScroll={onScroll}>
        {pours.map((p, i) => <PourPane key={i} p={p} light={light}></PourPane>)}
      </div>
      {pours.length > 1 ? (
        <div className="rv-dotswrap">
          <div className="rv-dots">
            {pours.map((_, i) => <div key={i} className={"dot" + (i === idx ? " on" : "")} onClick={() => jump(i)}></div>)}
          </div>
        </div>
      ) : null}
      <div className="rv-actions">
        <div className="rv-btn ghost" onClick={() => onFade(pours[idx])}>LET IT FADE</div>
        <div className="rv-btn fill" onClick={() => onKeep(pours[idx])}>KEEP THIS MEMORY</div>
      </div>
    </div>
  );
}

// ---------- ROOT APP ----------
// JS-driven crossfade: base state is VISIBLE (opacity 1); the brief opacity-0 entry
// only happens once a timer confirms JS is alive, so a stalled timeline never blanks the app.
let vaHasMounted = false;
function FadeScreen({ children }) {
  const first = React.useRef(!vaHasMounted);
  vaHasMounted = true;
  const [on, setOn] = React.useState(first.current); // very first screen renders visible, no fade
  React.useEffect(() => {
    if (on) return;
    const t = setTimeout(() => setOn(true), 20);
    return () => clearTimeout(t);
  }, []);
  return <div className="va-screen" style={on ? { opacity: 1 } : { opacity: 0, transition: "none" }}>{children}</div>;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_FLOW);
  const light = t.mode === "day";
  const [screen, setScreen] = React.useState("approach");
  const [invite, setInvite] = React.useState(() => pickInvitation());
  const [card, setCard] = React.useState(null);
  const [lens, setLens] = React.useState(null);
  const [whisper, setWhisper] = React.useState("");
  const [whispered, setWhispered] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const draw = () => {
    setWhispered(whisper.trim().length > 0);
    setCard(pickCard());
    setScreen("ritual");
  };
  const finishPull = (pour, kept) => {
    savePull({ ts: Date.now(), card, lens: lens.name, wine: pour.wine, kept });
    if (kept) showToast("KEPT · " + pour.wine.toUpperCase());
    setLens(null); setCard(null); setWhisper(""); setWhispered(false);
    setInvite(pickInvitation());
    setScreen("approach");
  };

  const vars = {
    "--va-grain-size": t.grainSize + "px",
    "--va-grain-o-dark": t.grainNight,
    "--va-grain-o-light": t.grainDay,
    "--va-veil-o-dark": t.veilNight,
    "--va-veil-o-light": t.veilDay,
    "--va-whisper-h": t.whisperH + "px",
    "--va-deck-w": t.deckW + "px",
    "--va-deck-w-desk": t.deckWDesk + "px",
    "--va-knowing-size": t.knowingSize + "px",
    "--va-lens-size": t.lensSize + "px",
    "--va-lens-pad": t.lensPad + "px",
    "--va-orbit-card": t.orbitCardVh + "vh",
    "--va-knowing-desk": t.knowingDesk + "px",
    "--va-shout": t.shoutSize + "px",
  };

  const c = card ? ARCANA[card] : null;
  return (
    <div className={"va rx " + (light ? "rx-light" : "rx-dark")} style={vars}>
      {(screen === "reading" || screen === "reveal") && c ? (
        <div className="rx-veil"><img src={"assets/cards/" + c.file + ".png"} alt="" /></div>
      ) : null}
      <div className="rx-grain"></div>
      {screen === "reveal" ? <div className="rv-glow"></div> : null}

      <FadeScreen key={screen + (card || "")}>
        {screen === "approach" ? (
          <Approach light={light} invite={invite} whisper={whisper} setWhisper={setWhisper} onDraw={draw} onToast={showToast}></Approach>
        ) : null}
        {screen === "ritual" ? <Ritual card={card} onDone={() => setScreen("reading")}></Ritual> : null}
        {screen === "reading" ? (
          <Reading card={card} light={light} whispered={whispered} flare={t.lensFlare}
            onPick={(l) => { setLens(l); setScreen("reveal"); }} onToast={showToast}></Reading>
        ) : null}
        {screen === "reveal" ? (
          <Reveal card={card} lens={lens} light={light}
            onKeep={(p) => finishPull(p, true)} onFade={(p) => finishPull(p, false)} onToast={showToast}></Reveal>
        ) : null}
      </FadeScreen>

      {toast ? <div className={"va-toast" + (light ? " light" : "")}>{toast}</div> : null}

      <TweaksPanel>
        <TweakSection label="Mode"></TweakSection>
        <TweakRadio label="Field" value={t.mode} options={["night", "day"]} onChange={(v) => setTweak("mode", v)}></TweakRadio>
        <TweakSection label="Texture"></TweakSection>
        <TweakSlider label="Grain scale" value={t.grainSize} min={120} max={600} step={10} unit="px" onChange={(v) => setTweak("grainSize", v)}></TweakSlider>
        <TweakSlider label="Grain · night" value={t.grainNight} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainNight", v)}></TweakSlider>
        <TweakSlider label="Grain · day" value={t.grainDay} min={0} max={0.5} step={0.01} onChange={(v) => setTweak("grainDay", v)}></TweakSlider>
        <TweakSlider label="Veil · night" value={t.veilNight} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilNight", v)}></TweakSlider>
        <TweakSlider label="Veil · day" value={t.veilDay} min={0} max={0.3} step={0.005} onChange={(v) => setTweak("veilDay", v)}></TweakSlider>
        <TweakSection label="Approach"></TweakSection>
        <TweakSlider label="Whisper region" value={t.whisperH} min={120} max={320} step={2} unit="px" onChange={(v) => setTweak("whisperH", v)}></TweakSlider>
        <TweakSlider label="Deck width · mobile" value={t.deckW} min={160} max={280} step={2} unit="px" onChange={(v) => setTweak("deckW", v)}></TweakSlider>
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
