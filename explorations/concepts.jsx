// META BOARDS — brief, ritual storyboards, resonance flows, voice guide
// Exports: BriefBoard, RitualBoard, ResonanceBoard, VoiceBoard

function BriefBoard() {
  return (
    <div className="cb" data-screen-label="Brief & Assumptions">
      <div className="cb-mono">VINTNER'S ARCANA — EXPLORATION 01 · READ ME FIRST</div>
      <div className="cb-title">Manufactured profundity, no purple gradients</div>
      <div className="cb-intro">
        The product thesis: <b>profound moments sear memories</b>, so we attach wine to
        a tarot reading and people learn wine without studying. The design must feel
        like <b>a message from the smoke</b> — dark, premium, intimate — while threading
        the needle you named: <b>ancient and modern at the same time, never corny.</b>
      </div>
      <div className="cb-hr"></div>
      <div className="cb-cols">
        <div>
          <div className="cb-h2">What's on this canvas</div>
          <ul className="cb-list">
            <li><b>Three aesthetic directions</b>, each with a style tile + the three core screens (Draw → Reveal &amp; Resonance → Pairing), phone-first at 390px.</li>
            <li><b>Interaction concepts</b> — three draw rituals and three "steer the lens" flows, shown as storyboards so we can decide before building.</li>
            <li><b>A voice calibration board</b> — the content-strategy rules that keep "knowing smile" from sliding into cringe, tested on The Devil.</li>
          </ul>
        </div>
        <div>
          <div className="cb-h2">Assumptions I made</div>
          <ul className="cb-list">
            <li>Major Arcana only (22 cards) for v1; The Moon is the working example because it stress-tests the mystery tone.</li>
            <li>Facet names ("The Beautiful Lie") are distilled from your framework's mapping ideas — each maps 1:1 to a mapping idea.</li>
            <li>Each direction pairs a different wine from The Moon's mappings, to show the framework's range.</li>
            <li>Cellar matches surface inline on the pairing screen — the spirits prefer bottles you own.</li>
          </ul>
        </div>
      </div>
      <div className="cb-hr"></div>
      <div className="cb-h2">How to respond</div>
      <ul className="cb-list">
        <li>Pick a direction — or mix ("A's palette, C's typography"). Mixing is expected, not rude.</li>
        <li>Pick one draw ritual + one resonance flow from the concept boards.</li>
        <li>Mark up anything: comment directly on artboards, or open one fullscreen to study it.</li>
        <li>Next step after your pass: build the full clickable flow (all 22 cards, memory, cellar) in the chosen direction.</li>
      </ul>
    </div>
  );
}

function RitualBoard() {
  return (
    <div className="cb" data-screen-label="Draw Ritual Concepts">
      <div className="cb-mono">INTERACTION CONCEPT · 01</div>
      <div className="cb-title">The Draw Ritual — three depths of ceremony</div>

      <div className="cb-flow" style={{ marginTop: "20px" }}>
        <div className="cb-flow-name">R1 · The Slow Pull <span className="cb-flow-note" style={{ display: "inline" }}>— full ritual, ~12s, for when you have the evening</span></div>
        <div className="cb-frames">
          <div className="cb-frame">
            <div className="cb-frame-num">1 — IDLE</div>
            <div className="cb-frame-sketch"><div className="cb-sk-smoke"></div><div className="cb-sk-card dim"></div></div>
            <div className="cb-frame-cap">Deck breathes in smoke. Slow scale pulse, embers drift.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">2 — SPREAD</div>
            <div className="cb-frame-sketch">
              <div className="cb-sk-fan">
                <div className="cb-sk-card dim"></div><div className="cb-sk-card dim"></div>
                <div className="cb-sk-card"></div><div className="cb-sk-card dim"></div>
              </div>
            </div>
            <div className="cb-frame-cap">Swipe fans the deck. Cards drag under the thumb with inertia.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">3 — PRESS &amp; HOLD</div>
            <div className="cb-frame-sketch"><div className="cb-sk-card cb-sk-glow"></div></div>
            <div className="cb-frame-cap">Hold a card: it warms, glows, haptic heartbeat. Release elsewhere to keep browsing.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">4 — REVEAL</div>
            <div className="cb-frame-sketch"><div className="cb-sk-smoke"></div><div className="cb-sk-text">XVIII<br />THE MOON</div></div>
            <div className="cb-frame-cap">Flip on release. Smoke parts; name appears last, like a signature.</div>
          </div>
        </div>
      </div>

      <div className="cb-flow" style={{ marginTop: "24px" }}>
        <div className="cb-flow-name">R2 · One Breath <span className="cb-flow-note" style={{ display: "inline" }}>— quick elegance, ~3s, for the wine-store aisle</span></div>
        <div className="cb-frames">
          <div className="cb-frame">
            <div className="cb-frame-num">1 — TAP</div>
            <div className="cb-frame-sketch"><div className="cb-sk-smoke"></div><div className="cb-sk-card"></div></div>
            <div className="cb-frame-cap">Single card waits in the smoke. One tap.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">2 — RISE</div>
            <div className="cb-frame-sketch"><div className="cb-sk-card cb-sk-glow" style={{ transform: "translateY(-8px)" }}></div></div>
            <div className="cb-frame-cap">Card rises, smoke parts around it. No fanfare, all poise.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">3 — REVEAL</div>
            <div className="cb-frame-sketch"><div className="cb-sk-text">XVIII<br />THE MOON</div></div>
            <div className="cb-frame-cap">Flip and settle. Total: one breath in, one out.</div>
          </div>
        </div>
      </div>

      <div className="cb-flow" style={{ marginTop: "24px" }}>
        <div className="cb-flow-name">R3 · Cut by Feel <span className="cb-flow-note" style={{ display: "inline" }}>— agency illusion, ~6s; you stop the deck, the deck stops you</span></div>
        <div className="cb-frames">
          <div className="cb-frame">
            <div className="cb-frame-num">1 — INTENT</div>
            <div className="cb-frame-sketch"><div className="cb-sk-text">HOLD WHAT'S<br />ON YOUR MIND</div></div>
            <div className="cb-frame-cap">A single instruction. No typing, no chips — just a thought.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">2 — RIFFLE</div>
            <div className="cb-frame-sketch">
              <div className="cb-sk-fan">
                <div className="cb-sk-card dim"></div><div className="cb-sk-card dim"></div><div className="cb-sk-card dim"></div>
              </div>
            </div>
            <div className="cb-frame-cap">Thumb drags along the deck edge — cards riffle past with ticks, like shuffling in hand.</div>
          </div>
          <div className="cb-arrow">→</div>
          <div className="cb-frame">
            <div className="cb-frame-num">3 — CUT &amp; REVEAL</div>
            <div className="cb-frame-sketch"><div className="cb-sk-card cb-sk-glow"></div></div>
            <div className="cb-frame-cap">Lift the thumb: the deck cuts where you stopped. Your hand chose — or did it.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResonanceBoard() {
  return (
    <div className="cb" data-screen-label="Resonance Flow Concepts">
      <div className="cb-mono">INTERACTION CONCEPT · 02</div>
      <div className="cb-title">Steering the Lens — how the spirits learn what resonates</div>
      <div className="cb-intro">
        Every card carries 4–5 mapping ideas. The wine should feel chosen, not computed —
        so the question is when the user steers, and how much.
      </div>
      <div className="cb-cols3" style={{ marginTop: "22px" }}>
        <div>
          <div className="cb-flow-name">L1 · Reveal, then steer</div>
          <div className="cb-flow-note">shown in all three direction mocks</div>
          <div className="cb-frame" style={{ marginTop: "12px", minHeight: "130px" }}>
            <div className="cb-frame-sketch">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
                <div className="cb-sk-row"></div><div className="cb-sk-row hot"></div><div className="cb-sk-row"></div>
              </div>
            </div>
          </div>
          <ul className="cb-list">
            <li>Card first, then its facets as evocative phrases. You tap the one that lands.</li>
            <li><b>Strongest profundity</b> — the card "found" you, then you confess which part is true.</li>
            <li>Risk: a decision point mid-ritual. Phrases must be instant reads.</li>
          </ul>
        </div>
        <div>
          <div className="cb-flow-name">L2 · Whisper first</div>
          <div className="cb-flow-note">intent before the draw</div>
          <div className="cb-frame" style={{ marginTop: "12px", minHeight: "130px" }}>
            <div className="cb-frame-sketch">
              <div className="cb-sk-text">WHAT BRINGS YOU<br />TO THE TABLE?<br /><br />celebration · unease<br />craving · crossroads</div>
            </div>
          </div>
          <ul className="cb-list">
            <li>One soft question before the draw; the app picks the resonant facet silently.</li>
            <li><b>Zero friction after the reveal</b> — card flips straight into its wine.</li>
            <li>Risk: feels like a quiz if overdone. Must stay to one tap, skippable.</li>
          </ul>
        </div>
        <div>
          <div className="cb-flow-name">L3 · Both, gently</div>
          <div className="cb-flow-note">recommended</div>
          <div className="cb-frame" style={{ marginTop: "12px", minHeight: "130px" }}>
            <div className="cb-frame-sketch">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
                <div className="cb-sk-text" style={{ marginBottom: "6px" }}>(OPTIONAL WHISPER)</div>
                <div className="cb-sk-row hot"></div><div className="cb-sk-row"></div>
              </div>
            </div>
          </div>
          <ul className="cb-list">
            <li>Optional whisper before; after the reveal the facets appear <b>pre-ordered by the whisper</b>, the top one already glowing.</li>
            <li>Accept the spirits' read with one tap — or steer. Agency and fate, both.</li>
            <li>Skipped whisper = L1. Tapped whisper + accepted default = L2.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function VoiceBoard() {
  return (
    <div className="cb" data-screen-label="Voice & Content Rules">
      <div className="cb-mono">CONTENT STRATEGY · THE KNOWING SMILE</div>
      <div className="cb-title">Voice rules — calibrated on The Devil</div>
      <div className="cb-cols" style={{ marginTop: "18px" }}>
        <div>
          <div className="cb-h2">The rules</div>
          <ul className="cb-list">
            <li><b>Speak to one person, in the dark.</b> Second person, present tense. Banned opener: "This card represents…"</li>
            <li><b>One sly beat per passage, max.</b> If two lines are clever, kill the weaker one. No exclamation marks. No emoji. Ever.</li>
            <li><b>Ground every flourish in a true fact.</b> Grape, place, technique, history. The fact earns the mysticism; the mysticism carries the fact.</li>
            <li><b>End on the wine, concrete.</b> The card opens the door; the bottle walks through it.</li>
            <li><b>Never judge the puller.</b> The Devil indulges <i>with</i> you. The Tower rebuilds <i>with</i> you.</li>
            <li><b>Earth vocabulary:</b> smoke, candle, cellar, ember, barrel. Banned: magick, energy, vibes, ✨, "journey" as filler.</li>
            <li><b>Confidence is brevity.</b> Cut every sentence that explains itself — the gap the reader fills is the intimacy.</li>
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="cb-voice-card">
            <div className="cb-voice-tag bad">TOO DRY — THE FRAMEWORK'S FLOOR</div>
            <div className="cb-voice-quote">
              "The Devil represents materialism and attachment. This pairing examines
              cult wines and whether price reflects quality."
            </div>
            <div className="cb-voice-why">Accurate, dead. Reads like a syllabus. No one feels seen.</div>
          </div>
          <div className="cb-voice-card">
            <div className="cb-voice-tag bad">TOO MYSTIC — THE CRINGE CLIFF</div>
            <div className="cb-voice-quote">
              "Dark one… the crimson chains of desire coil around your chalice.
              Surrender, mortal, to the intoxicating shadows that bind your soul."
            </div>
            <div className="cb-voice-why">Costume-shop occultism. The moment it performs mystery, it loses it.</div>
          </div>
          <div className="cb-voice-card">
            <div className="cb-voice-tag good">JUST RIGHT — THE KNOWING SMILE</div>
            <div className="cb-voice-quote">
              "You already know you're having a second glass. The Devil isn't here
              to stop you — he's here to pour. Tonight: a Turley Zinfandel that's
              dangerously easy to drink, and not the least bit sorry."
            </div>
            <div className="cb-voice-why">
              Complicit, not preachy. One sly beat ("he's here to pour"), one true fact
              (Turley Zin, the framework's own example), ends on the bottle.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BriefBoard, RitualBoard, ResonanceBoard, VoiceBoard });
