// Canvas assembly — Round 8: the writing, the reading nailed, approach fixed

function ArcanaRound8() {
  return (
    <DesignCanvas>
      <DCSection id="r8-writing" title="The Writing — five flows, voice-locked" subtitle="The writing exercise: The Moon, Wheel of Fortune, Death, The Tower, The Fool — each with its post-pull line, its lenses (distilled from your framework's pairings), and the reveal copy for the nudged lens. This is the content we'll plug into the screens once the reading lands.">
        <DCArtboard id="r8-content" label="The Writing · all five flows" width={1500} height={760}>
          <ContentBoard></ContentBoard>
        </DCArtboard>
      </DCSection>

      <DCSection id="r8-reading" title="The Reading — nailed (v2 hierarchy)" subtitle="Name above the card. The knowing line larger + italic — the spirits' voice. Lenses smaller and upright so the hierarchy reads instantly and scales. Real written content; the 5-lens Wheel is the scaling stress-test.">
        <DCArtboard id="r8-read-moon" label="The Moon · Night · 4 lenses" width={390} height={844}>
          <ReadingCard id="moon" mode="dark"></ReadingCard>
        </DCArtboard>
        <DCArtboard id="r8-read-wheel" label="Wheel of Fortune · Day · 5 lenses (scaling test)" width={390} height={844}>
          <ReadingCard id="wheel" mode="light"></ReadingCard>
        </DCArtboard>
        <DCArtboard id="r8-read-tower" label="The Tower · Night · real scan" width={390} height={844}>
          <ReadingCard id="tower" mode="dark"></ReadingCard>
        </DCArtboard>
        <DCArtboard id="r8-read-fool" label="The Fool · Night" width={390} height={844}>
          <ReadingCard id="fool" mode="dark"></ReadingCard>
        </DCArtboard>
      </DCSection>

      <DCSection id="r8-approach" title="The Approach — whisper as an alternate path" subtitle="The whisper is no longer an always-open field — it's a quiet outline button that opens the field on tap, so the default journey stays 'just draw.' Two hero lines + two footer strings to choose between.">
        <DCArtboard id="r8-approach-a" label="A · whisper closed · 'tap the deck when ready'" width={390} height={844}>
          <ApproachA></ApproachA>
        </DCArtboard>
        <DCArtboard id="r8-approach-b" label="B · whisper opened · 'one tap, one card'" width={390} height={844}>
          <ApproachB></ApproachB>
        </DCArtboard>
      </DCSection>

      <DCSection id="r8-atmosphere" title="The background — the experiment you asked for" subtitle="Uneven vignette fading on all edges vs the constant 8% you'd settle for.">
        <DCArtboard id="r8-vignette" label="Vignette vs constant 8%" width={720} height={460}>
          <VignetteCompare></VignetteCompare>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR8Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR8Root.render(<ArcanaRound8></ArcanaRound8>);
