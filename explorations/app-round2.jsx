// Canvas assembly — Round 2: Ember & Ink

function ArcanaRound2() {
  return (
    <DesignCanvas>
      <DCSection id="r2-direction" title="Ember & Ink — the fused direction" subtitle="Stark ember on black · weathered Rider–Waite · Bodoni's ink-in-a-vein strokes. Decisions from your feedback are noted on the tile.">
        <DCArtboard id="r2-tile" label="Style Tile & Decisions" width={560} height={780}>
          <R2Tile></R2Tile>
        </DCArtboard>
      </DCSection>

      <DCSection id="r2-flow" title="The Flow — desktop" subtitle="Approach (whisper + one-tap draw) → Reveal (the image consumes) → Reading (four lenses) → The Pour">
        <DCArtboard id="r2-approach" label="01 · The Approach" width={1440} height={960}>
          <R2Approach></R2Approach>
        </DCArtboard>
        <DCArtboard id="r2-reveal" label="02 · The Reveal" width={1440} height={960}>
          <R2Reveal></R2Reveal>
        </DCArtboard>
        <DCArtboard id="r2-reading" label="03 · The Reading" width={1440} height={960}>
          <R2Reading></R2Reading>
        </DCArtboard>
        <DCArtboard id="r2-pour" label="04 · The Pour" width={1440} height={960}>
          <R2Pour></R2Pour>
        </DCArtboard>
      </DCSection>

      <DCSection id="r2-mobile" title="In the pocket" subtitle="The reading, scaled to the wine-store aisle">
        <DCArtboard id="r2-mobile-reading" label="Mobile · Reveal & Lenses" width={390} height={844}>
          <R2Mobile></R2Mobile>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR2Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR2Root.render(<ArcanaRound2></ArcanaRound2>);
