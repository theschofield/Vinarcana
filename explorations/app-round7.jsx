// Canvas assembly — Round 7: DM Serif locked, Reveal to mockup, pre-draw

function ArcanaRound7() {
  return (
    <DesignCanvas>
      <DCSection id="r7-approach" title="The Approach — pre-draw, restyled" subtitle="The new charcoal-and-apricot system applied to the screen before the draw, using your deck-back art. Whisper field, one-breath draw — no halloween.">
        <DCArtboard id="r7-approach-art" label="The Approach · your card back + whisper" width={390} height={844}>
          <Approach></Approach>
        </DCArtboard>
      </DCSection>

      <DCSection id="r7-reveal" title="The Reveal — rebuilt to your mockup" subtitle="Back to the Light Pour composition. Bigger eyebrow, left card with the real bottle overlaid (the bottle is the hero now), text moved down for room, multi-wine dots, DM Serif throughout, and the button glow toned right down.">
        <DCArtboard id="r7-reveal-day" label="Reveal · Day · to your spec" width={390} height={844}>
          <RevealDay></RevealDay>
        </DCArtboard>
        <DCArtboard id="r7-reveal-night" label="Reveal · Night" width={390} height={844}>
          <RevealNight></RevealNight>
        </DCArtboard>
      </DCSection>

      <DCSection id="r7-reading" title="The Reading — DM Serif, list dropped lower" subtitle="Lenses moved down so the gap below them matches the gap under the footer. Two title treatments to compare card size: name beneath the card, or no name and a bigger card. Plus the 5-lens case in daylight.">
        <DCArtboard id="r7-read-titled" label="A · Title beneath (4 lenses)" width={390} height={844}>
          <ReadingTitled></ReadingTitled>
        </DCArtboard>
        <DCArtboard id="r7-read-bare" label="B · No title, bigger card (4 lenses)" width={390} height={844}>
          <ReadingBare></ReadingBare>
        </DCArtboard>
        <DCArtboard id="r7-read-five" label="Day · 5 lenses, dropped lower" width={390} height={844}>
          <ReadingFive></ReadingFive>
        </DCArtboard>
      </DCSection>

      <DCSection id="r7-orbit" title="The Orbit — bigger card, calmer titles" subtitle="You like this one. Card enlarged, the apricot lens title removed (now bone), and a soft off-screen dark backing lifts each option off the artwork — the anti-lens-flare.">
        <DCArtboard id="r7-orbit-art" label="Orbit · 5 lenses, bigger card" width={390} height={844}>
          <OrbitFive7></OrbitFive7>
        </DCArtboard>
      </DCSection>

      <DCSection id="r7-smoke" title="The Reveal motion — name to smoke" subtitle="Now drawn in DM Serif Display instead of script. The name dissolves to smoke as the card strikes it.">
        <DCArtboard id="r7-smokeboard" label="Smoke reveal — DM Serif" width={1140} height={560}>
          <SmokeReveal7></SmokeReveal7>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR7Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR7Root.render(<ArcanaRound7></ArcanaRound7>);
