// Canvas assembly — Round 5: Resolving type, the reading, atmosphere, the weave

function ArcanaRound5() {
  return (
    <DesignCanvas>
      <DCSection id="r5-type" title="Type, resolved" subtitle="Instrument Serif as the display voice (the teardrop terminals you loved), a script used one word at a time and shown in context, and the body sans settled at a real reading weight.">
        <DCArtboard id="r5-typesystem" label="The Type System — display + script in context" width={1040} height={580}>
          <TypeSystem></TypeSystem>
        </DCArtboard>
        <DCArtboard id="r5-sanslab" label="The Body Sans — pick one (Hanken explained)" width={560} height={580}>
          <SansLab></SansLab>
        </DCArtboard>
      </DCSection>

      <DCSection id="r5-reading" title="The Reading — the Ledger meets the Veil" subtitle="Your favorite tappable list (V1 Ledger) now floats over the faint card veil (V2). Scales to five lenses. Selected state has no orange box — a tick, a wash, a lit numeral. Dark and light.">
        <DCArtboard id="r5-read-dark" label="The Reading · Night · 5 lenses" width={390} height={844}>
          <ReadingDark></ReadingDark>
        </DCArtboard>
        <DCArtboard id="r5-read-light" label="The Reading · Day · 5 lenses" width={390} height={844}>
          <ReadingLight></ReadingLight>
        </DCArtboard>
        <DCArtboard id="r5-tapstates" label="Tappable states — three ways, no orange box" width={900} height={460}>
          <TapStates></TapStates>
        </DCArtboard>
      </DCSection>

      <DCSection id="r5-pairing" title="Font-pairing test — was it the type, or the halloween?" subtitle="Your Round-3 pairing (Instrument Serif + Cormorant) dropped onto the new charcoal-and-apricot, and onto greige-and-ink. Same fonts you weren't sure about, minus the colors that soured them.">
        <DCArtboard id="r5-pair-dark" label="Old pairing · new color · Night" width={390} height={844}>
          <PairingTestDark></PairingTestDark>
        </DCArtboard>
        <DCArtboard id="r5-pair-light" label="Old pairing · new color · Day" width={390} height={844}>
          <PairingTestLight></PairingTestLight>
        </DCArtboard>
      </DCSection>

      <DCSection id="r5-atmosphere" title="The Veil — uneven transparency" subtitle="The radial fade you remembered from V2: present at the heart, dissolving at the edges. Flat-vs-fade, both modes.">
        <DCArtboard id="r5-veilcompare" label="Flat vs uneven fade — dark & light" width={900} height={520}>
          <VeilCompare></VeilCompare>
        </DCArtboard>
      </DCSection>

      <DCSection id="r5-weave" title="The Weave — developed" subtitle="The card name in a swash face (Italianno), drawn through the card so its flourishes ride over the face as it turns. Plus a longer-name scale test.">
        <DCArtboard id="r5-weave-moon" label="The Weave · The Moon" width={390} height={844}>
          <WeaveMoon></WeaveMoon>
        </DCArtboard>
        <DCArtboard id="r5-weave-long" label="The Weave · longer name test" width={390} height={844}>
          <WeaveLong></WeaveLong>
        </DCArtboard>
      </DCSection>

      <DCSection id="r5-lightpour" title="Light Pour — refined" subtitle="The layout you loved, kept. The display shout dialed back to a calmer Instrument Serif, body in Instrument Sans, faint veil behind.">
        <DCArtboard id="r5-lp" label="Light Pour · display dialed in" width={390} height={844}>
          <LightPourRefined></LightPourRefined>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR5Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR5Root.render(<ArcanaRound5></ArcanaRound5>);
