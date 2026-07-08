// Canvas assembly — Round 3: Materials · Lettering · Mobile Readings

function ArcanaRound3() {
  return (
    <DesignCanvas>
      <DCSection id="r3-material" title="Material — Stamped Leather" subtitle="Muddy oiled-hide near-black; orange pressed in like hot foil, not glowing. Pick your orange on the calibration board — the exact hue is the whole game.">
        <DCArtboard id="r3-lthr-tile" label="Stamped Leather · Material Tile" width={560} height={760}>
          <LthrTile></LthrTile>
        </DCArtboard>
        <DCArtboard id="r3-cal" label="Orange Calibration — pick one" width={1100} height={420}>
          <CalBoard></CalBoard>
        </DCArtboard>
        <DCArtboard id="r3-lthr-draw" label="Mobile Draw on Leather" width={390} height={844}>
          <LthrDraw></LthrDraw>
        </DCArtboard>
      </DCSection>

      <DCSection id="r3-daylight" title="Material — Daylight" subtitle="Brief amended: the app ships dark AND light. Same stamps and bones on parchment — the weathered cards belong on this surface too.">
        <DCArtboard id="r3-day-pour" label="Mobile Pour · Light Mode" width={390} height={844}>
          <DayPour></DayPour>
        </DCArtboard>
      </DCSection>

      <DCSection id="r3-type" title="Lettering — four voices" subtitle="Identical content, four faces. Looking for fluid, exotic, ebb-and-flow strokes — Bodoni was too loud; these each pull differently.">
        <DCArtboard id="r3-t1" label="T1 · The Modern Tongue" width={520} height={560}>
          <TypeT1></TypeT1>
        </DCArtboard>
        <DCArtboard id="r3-t2" label="T2 · The Flourish" width={520} height={560}>
          <TypeT2></TypeT2>
        </DCArtboard>
        <DCArtboard id="r3-t3" label="T3 · The Old Press" width={520} height={560}>
          <TypeT3></TypeT3>
        </DCArtboard>
        <DCArtboard id="r3-t4" label="T4 · The Engraver's Tendril" width={520} height={560}>
          <TypeT4></TypeT4>
        </DCArtboard>
      </DCSection>

      <DCSection id="r3-mobile" title="Mobile Readings — four layouts" subtitle="The respond-by-selection moment, four ways. Each uses a different lettering voice (noted in its footer) so layout and type can be mixed freely.">
        <DCArtboard id="r3-v1" label="V1 · The Ledger — refined list" width={390} height={844}>
          <MobV1></MobV1>
        </DCArtboard>
        <DCArtboard id="r3-v2" label="V2 · The Veil — the image becomes the room" width={390} height={844}>
          <MobV2></MobV2>
        </DCArtboard>
        <DCArtboard id="r3-v3" label="V3 · The Letter — tap the phrase that stings" width={390} height={844}>
          <MobV3></MobV3>
        </DCArtboard>
        <DCArtboard id="r3-v4" label="V4 · The Procession — one face at a time" width={390} height={844}>
          <MobV4></MobV4>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>);

}

const arcanaR3Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR3Root.render(<ArcanaRound3></ArcanaRound3>);