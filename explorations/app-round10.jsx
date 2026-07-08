// Canvas assembly — Round 10: content corrected, reading spacing, approach reverted

function ArcanaRound10() {
  return (
    <DesignCanvas>
      <DCSection id="rx-strategy" title="The content engine — corrected" subtitle="The lens is an invitation you accept because it understands you — not a clever label with attitude. The spirit's voice observes a feeling like a wise stranger at the bar, never narrating the card at you.">
        <DCArtboard id="rx-strat" label="The Lens & The Reveal — corrected" width={1320} height={600}>
          <StrategyBoardX></StrategyBoardX>
        </DCArtboard>
      </DCSection>

      <DCSection id="rx-readings" title="The Reading — spacing fixed, voices rewritten" subtitle="Status-bar moon removed; v2 breathing room between the status bar, the title and the card restored. Every spirit's voice and lens rewritten one by one to your notes. Real card art; the Wheel's five lenses are the scaling test.">
        <DCArtboard id="rx-read-moon" label="The Moon · Night" width={390} height={844}>
          <ReadingX id="moon" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="rx-read-tower" label="The Tower · Night" width={390} height={844}>
          <ReadingX id="tower" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="rx-read-death" label="Death · Night" width={390} height={844}>
          <ReadingX id="death" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="rx-read-wheel" label="Wheel of Fortune · Day · 5 (scaling)" width={390} height={844}>
          <ReadingX id="wheel" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="rx-read-fool" label="The Fool · Night" width={390} height={844}>
          <ReadingX id="fool" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="rx-read-hermit" label="The Hermit · Day" width={390} height={844}>
          <ReadingX id="hermit" mode="light"></ReadingX>
        </DCArtboard>
      </DCSection>

      <DCSection id="rx-approach" title="The Approach — reverted, whisper as just a circle" subtitle="Back to the round-8 layout exactly — deck and the big invite where they were. The only change is the whisper: a small icon-circle under the invite (closed), opening to a quiet field in place (no more half-screen takeover).">
        <DCArtboard id="rx-approach-closed" label="Closed · the quiet circle" width={390} height={844}>
          <ApproachXClosed></ApproachXClosed>
        </DCArtboard>
        <DCArtboard id="rx-approach-open" label="Opened · the field in place" width={390} height={844}>
          <ApproachXOpen></ApproachXOpen>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaRXRoot = ReactDOM.createRoot(document.getElementById("root"));
arcanaRXRoot.render(<ArcanaRound10></ArcanaRound10>);
