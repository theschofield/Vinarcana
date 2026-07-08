// Canvas assembly — Round 9: content strategy + the reading, corrected

function ArcanaRound9() {
  return (
    <DesignCanvas>
      <DCSection id="r9-strategy" title="The content engine — codified" subtitle="The correction from your note: the lens is a felt human response, never a description of the wine. The reveal connects that feeling to the bottle. This is the three-beat engine that replicates across all 78 cards.">
        <DCArtboard id="r9-strat" label="The Lens & The Reveal — strategy" width={1320} height={600}>
          <StrategyBoard></StrategyBoard>
        </DCArtboard>
      </DCSection>

      <DCSection id="r9-readings" title="The Reading — rewritten & redesigned" subtitle="Status bar restored, the card noticeably bigger, the spirit's voice sitting close beneath it, lenses upright below. Real card art, and every lens now a felt response you choose because it's true for you tonight. The Wheel's five lenses are the scaling test.">
        <DCArtboard id="r9-read-moon" label="The Moon · Night · 4" width={390} height={844}>
          <Reading9 id="moon" mode="dark"></Reading9>
        </DCArtboard>
        <DCArtboard id="r9-read-death" label="Death · Night · 4 · real scan" width={390} height={844}>
          <Reading9 id="death" mode="dark"></Reading9>
        </DCArtboard>
        <DCArtboard id="r9-read-tower" label="The Tower · Night · 4 · real scan" width={390} height={844}>
          <Reading9 id="tower" mode="dark"></Reading9>
        </DCArtboard>
        <DCArtboard id="r9-read-wheel" label="Wheel of Fortune · Day · 5 (scaling test)" width={390} height={844}>
          <Reading9 id="wheel" mode="light"></Reading9>
        </DCArtboard>
        <DCArtboard id="r9-read-hermit" label="The Hermit · Day · 4 · froggy bonus" width={390} height={844}>
          <Reading9 id="hermit" mode="light"></Reading9>
        </DCArtboard>
        <DCArtboard id="r9-read-fool" label="The Fool · Night · 4" width={390} height={844}>
          <Reading9 id="fool" mode="dark"></Reading9>
        </DCArtboard>
      </DCSection>

      <DCSection id="r9-approach" title="The Approach — whisper, demoted properly" subtitle="The whisper is now a faint icon-circle sitting midway between the invite and the draw cue — easy to miss on purpose, since the default path is just to tap. Tapping it opens a quiet underlined field in the same spot.">
        <DCArtboard id="r9-approach-closed" label="Closed · the quiet circle" width={390} height={844}>
          <Approach9Closed></Approach9Closed>
        </DCArtboard>
        <DCArtboard id="r9-approach-open" label="Opened · 'something on your mind?'" width={390} height={844}>
          <Approach9Open></Approach9Open>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR9Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR9Root.render(<ArcanaRound9></ArcanaRound9>);
