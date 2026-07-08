// Canvas assembly — Round 12: voices fixed, Devil + Magician, Approach restructured + light

function ArcanaRound12() {
  return (
    <DesignCanvas>
      <DCSection id="r12-readings" title="The Reading — voices v4, Devil & Magician added" subtitle="Wheel & World voices fixed to convey the card's meaning. Devil and Magician written fresh from the framework. Lenses locked.">
        <DCArtboard id="r12-read-moon" label="The Moon · Night" width={390} height={844}>
          <ReadingX id="moon" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-wheel" label="Wheel of Fortune · Day · 5" width={390} height={844}>
          <ReadingX id="wheel" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-death" label="Death · Night" width={390} height={844}>
          <ReadingX id="death" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-tower" label="The Tower · Night" width={390} height={844}>
          <ReadingX id="tower" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-fool" label="The Fool · Night" width={390} height={844}>
          <ReadingX id="fool" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-hermit" label="The Hermit · Day" width={390} height={844}>
          <ReadingX id="hermit" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-world" label="The World · Day" width={390} height={844}>
          <ReadingX id="world" mode="light"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-devil" label="The Devil · Night · new" width={390} height={844}>
          <ReadingX id="devil" mode="dark"></ReadingX>
        </DCArtboard>
        <DCArtboard id="r12-read-magician" label="The Magician · Day · new" width={390} height={844}>
          <ReadingX id="magician" mode="light"></ReadingX>
        </DCArtboard>
      </DCSection>

      <DCSection id="r12-approach" title="The Approach — restructured + light mode" subtitle="Card + tagline in their own div (fills remaining space). Whisper region has a controllable height (currently 186px). Light mode added.">
        <DCArtboard id="r12-approach-dark" label="Dark · closed" width={390} height={844}>
          <ApproachXClosed></ApproachXClosed>
        </DCArtboard>
        <DCArtboard id="r12-approach-light" label="Light · closed" width={390} height={844}>
          <ApproachXClosedLight></ApproachXClosedLight>
        </DCArtboard>
        <DCArtboard id="r12-approach-open" label="Dark · opened" width={390} height={844}>
          <ApproachXOpen></ApproachXOpen>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR12Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR12Root.render(<ArcanaRound12></ArcanaRound12>);
