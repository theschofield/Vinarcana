// Canvas assembly — Round 6: Gin type, rebuilt Reading & Reveal, smoke

function ArcanaRound6() {
  return (
    <DesignCanvas>
      <DCSection id="r6-type" title="The gin-label hunt" subtitle="Instrument Serif retired (squashed). Five real display serifs for the 'expensive 300-year-old island gin' brief — shown clean, no script woven in. Fraunces is my lean.">
        <DCArtboard id="r6-hunt" label="Five gin-label display faces" width={1260} height={620}>
          <GinHunt></GinHunt>
        </DCArtboard>
      </DCSection>

      <DCSection id="r6-reading" title="The Reading — rebuilt" subtitle="Bigger card. Name dropped from below and set huge + faint in script behind the card (z-space). Nudged lens = full-bleed shimmer, no tick, no arrow; pressing deepens the fill. Footer trimmed to one line. Veil opacity corrected: faint center, mottled fade to almost nothing at the edges.">
        <DCArtboard id="r6-read-night" label="Reading · Night · 5 lenses" width={390} height={844}>
          <ReadingNight></ReadingNight>
        </DCArtboard>
        <DCArtboard id="r6-read-day" label="Reading · Day · 5 lenses" width={390} height={844}>
          <ReadingDay></ReadingDay>
        </DCArtboard>
        <DCArtboard id="r6-orbit" label="Orbit · 5 lenses (you asked)" width={390} height={844}>
          <OrbitFive></OrbitFive>
        </DCArtboard>
      </DCSection>

      <DCSection id="r6-reveal" title="The Reveal — rebuilt" subtitle="A bottle (placeholder representation) overlaps the card. Pagination dots → swipe across the 3–4 wines that fit the lens, white through red, or a producer/style instead of one bottle. Display enlarged, gin serif, and the 'Keep this memory' glow is back.">
        <DCArtboard id="r6-reveal-day" label="Reveal · Day · bottle + swipe + glow" width={390} height={844}>
          <RevealLight></RevealLight>
        </DCArtboard>
        <DCArtboard id="r6-reveal-night" label="Reveal · Night · swiped to the red" width={390} height={844}>
          <RevealNight></RevealNight>
        </DCArtboard>
      </DCSection>

      <DCSection id="r6-smoke" title="The Reveal motion — name to smoke" subtitle="Replacing the Weave. The script name ignites and disperses into smoke the instant the card strikes it. Three motion frames.">
        <DCArtboard id="r6-smokeboard" label="Smoke reveal — motion study" width={1140} height={560}>
          <SmokeReveal></SmokeReveal>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR6Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR6Root.render(<ArcanaRound6></ArcanaRound6>);
