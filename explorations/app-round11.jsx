// Canvas assembly — Round 11: content v3, deck shifted higher, The World added

function ArcanaRound11() {
  return (
    <DesignCanvas>
      <DCSection id="r11-readings" title="The Reading — voices & lenses polished" subtitle="Spirit's voice = a universal observation + sly acceptance (never says 'you'). Lens subtitles = statements to agree with that steer specificity. The World is the unseen-card test.">
        <DCArtboard id="r11-read-moon" label="The Moon · Night" width={390} height={844}>
          <ReadingX id="moon" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-death" label="Death · Night" width={390} height={844}>
          <ReadingX id="death" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-tower" label="The Tower · Night" width={390} height={844}>
          <ReadingX id="tower" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-wheel" label="Wheel of Fortune · Day · 5" width={390} height={844}>
          <ReadingX id="wheel" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-fool" label="The Fool · Night" width={390} height={844}>
          <ReadingX id="fool" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-hermit" label="The Hermit · Day" width={390} height={844}>
          <ReadingX id="hermit" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r11-read-world" label="The World · Day · unseen test" width={390} height={844}>
          <ReadingX id="world" mode="light"></ReadingX>
        </DCArtboard>
      </DCSection>

      <DCSection id="r11-approach" title="The Approach — deck shifted higher" subtitle="Deck and invite restored to roughly v9 position. Whisper circle centered in the zone below.">
        <DCArtboard id="r11-approach-closed" label="Closed · the quiet circle" width={390} height={844}>
          <ApproachXClosed></ApproachXClosed>
        </DCArtboard>
        <DCArtboard id="r11-approach-open" label="Opened · the field" width={390} height={844}>
          <ApproachXOpen></ApproachXOpen>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR11Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR11Root.render(<ArcanaRound11></ArcanaRound11>);
