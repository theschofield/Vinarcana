// Canvas assembly — Vintner's Arcana Exploration 01

function ArcanaExplorations() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="Read Me First" subtitle="Brief, assumptions, and how to respond">
        <DCArtboard id="brief-board" label="Brief & Assumptions" width={880} height={800}>
          <BriefBoard></BriefBoard>
        </DCArtboard>
      </DCSection>

      <DCSection id="dir-a" title="Direction A — Cellar Door" subtitle="Engraved wine-label elegance · vinous dark · a single candle's warmth">
        <DCArtboard id="a-tile" label="A · Style Tile" width={480} height={620}>
          <DirATile></DirATile>
        </DCArtboard>
        <DCArtboard id="a-draw" label="A · The Draw" width={390} height={844}>
          <DirADraw></DirADraw>
        </DCArtboard>
        <DCArtboard id="a-reveal" label="A · Reveal & Resonance" width={390} height={844}>
          <DirAReveal></DirAReveal>
        </DCArtboard>
        <DCArtboard id="a-pairing" label="A · The Pairing" width={390} height={844}>
          <DirAPairing></DirAPairing>
        </DCArtboard>
      </DCSection>

      <DCSection id="dir-b" title="Direction B — Charred Oak" subtitle="Wood-burned stamps · weathered Rider–Waite · tavern firelight">
        <DCArtboard id="b-tile" label="B · Style Tile" width={480} height={640}>
          <DirBTile></DirBTile>
        </DCArtboard>
        <DCArtboard id="b-draw" label="B · The Draw" width={390} height={844}>
          <DirBDraw></DirBDraw>
        </DCArtboard>
        <DCArtboard id="b-reveal" label="B · Reveal & Resonance" width={390} height={844}>
          <DirBReveal></DirBReveal>
        </DCArtboard>
        <DCArtboard id="b-pairing" label="B · The Pairing" width={390} height={844}>
          <DirBPairing></DirBPairing>
        </DCArtboard>
      </DCSection>

      <DCSection id="dir-c" title="Direction C — Ink & Ash" subtitle="Ancient-and-modern · monolithic type · smoke as the only imagery">
        <DCArtboard id="c-tile" label="C · Style Tile" width={480} height={620}>
          <DirCTile></DirCTile>
        </DCArtboard>
        <DCArtboard id="c-draw" label="C · The Draw" width={390} height={844}>
          <DirCDraw></DirCDraw>
        </DCArtboard>
        <DCArtboard id="c-reveal" label="C · Reveal & Resonance" width={390} height={844}>
          <DirCReveal></DirCReveal>
        </DCArtboard>
        <DCArtboard id="c-pairing" label="C · The Pairing" width={390} height={844}>
          <DirCPairing></DirCPairing>
        </DCArtboard>
      </DCSection>

      <DCSection id="interaction" title="The Ritual & The Lens" subtitle="Pick one draw ritual and one resonance flow — they combine freely with any direction">
        <DCArtboard id="ritual-board" label="Draw Ritual — 3 depths of ceremony" width={1120} height={900}>
          <RitualBoard></RitualBoard>
        </DCArtboard>
        <DCArtboard id="resonance-board" label="Steering the Lens — 3 flows" width={1120} height={680}>
          <ResonanceBoard></ResonanceBoard>
        </DCArtboard>
      </DCSection>

      <DCSection id="voice" title="The Voice" subtitle="Content rules for the knowing smile — calibrated on The Devil">
        <DCArtboard id="voice-board" label="Voice & Content Rules" width={1060} height={760}>
          <VoiceBoard></VoiceBoard>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaRoot = ReactDOM.createRoot(document.getElementById("root"));
arcanaRoot.render(<ArcanaExplorations></ArcanaExplorations>);
