// Canvas assembly — Round 13: The Reveal, rebuilt to the round-7 spec

function ArcanaRound13() {
  return (
    <DesignCanvas>
      <DCSection id="rv-reveal" title="The Reveal — Light Pour composition, surgically fixed" subtitle="Card left-aligned, real bottle overlaid as the hero, pour name close on its right. Body + stats below (stats in body font). Eyebrow slightly larger, single line. Buttons anchored to the bottom, subtle glow on the fill. Toned-down floor glow. Pagination dots swipe between the 3 pours that fit the lens.">
        <DCArtboard id="rv-pour1" label="Pour 1 of 3 · Vat 1 (real bottle) · Night" width={390} height={844}>
          <RevealX mode="dark" pour={0}></RevealX>
        </DCArtboard>
        <DCArtboard id="rv-pour2" label="Pour 2 of 3 · Dry Furmint (silhouette) · Night" width={390} height={844}>
          <RevealX mode="dark" pour={1}></RevealX>
        </DCArtboard>
        <DCArtboard id="rv-pour3" label="Pour 3 of 3 · the red option · Day" width={390} height={844}>
          <RevealX mode="light" pour={2}></RevealX>
        </DCArtboard>
      </DCSection>

      <DCSection id="rv-flip" title="The Reading — italic canon applied + the cellar dot" subtitle="Voice roman, lenses italic is now canon. The apricot dot on 'The beautiful lie' signals a bottle in your cellar pairs through that lens — same dot the Reveal uses beside THE POUR.">
        <DCArtboard id="rv-flip-b" label="Reading · new canon · cellar dot" width={390} height={844}>
          <ReadingX id="moon" mode="dark"></ReadingX>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR13Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR13Root.render(<ArcanaRound13></ArcanaRound13>);
