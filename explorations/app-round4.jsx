// Canvas assembly — Round 4: Decoded from the references

function ArcanaRound4() {
  return (
    <DesignCanvas>
      <DCSection id="r4-refs" title="The References, Decoded" subtitle="Your seven screenshots, sampled literally — the peach, the amber, the cobalt, the greige are these exact hexes, not approximations.">
        <DCArtboard id="r4-decode" label="Reference Decode — sampled colors & takeaways" width={1180} height={320}>
          <RefDecode></RefDecode>
        </DCArtboard>
        <DCArtboard id="r4-palette" label="Night & Day — the two fields" width={1000} height={460}>
          <PaletteBoard></PaletteBoard>
        </DCArtboard>
      </DCSection>

      <DCSection id="r4-type" title="Lettering II — the gin-house voices" subtitle="Cinzel Decorative is dead and buried. Four hairline candidates, all closer to your references; production would license a true swash face.">
        <DCArtboard id="r4-u1" label="U1 · The Gin Label" width={520} height={560}>
          <TypeU1></TypeU1>
        </DCArtboard>
        <DCArtboard id="r4-u2" label="U2 · The Hairline Didone" width={520} height={560}>
          <TypeU2></TypeU2>
        </DCArtboard>
        <DCArtboard id="r4-u3" label="U3 · The Full Pour" width={520} height={560}>
          <TypeU3></TypeU3>
        </DCArtboard>
        <DCArtboard id="r4-u4" label="U4 · The Closest, Restaged" width={520} height={560}>
          <TypeU4></TypeU4>
        </DCArtboard>
        <DCArtboard id="r4-body" label="The Body Problem — garamond italic retired" width={520} height={560}>
          <BodyVoice></BodyVoice>
        </DCArtboard>
      </DCSection>

      <DCSection id="r4-mobile" title="Mobile II — the veil pushed, daylight redone, the weave" subtitle="Veil gets two tappable treatments (you loved it; now it's thumbable). Light mode rebuilt on greige & ink with the faint veil imagery you asked for. Plus a Nafia-style reveal study.">
        <DCArtboard id="r4-veil-a" label="Veil II-A · Plaques — thumb-sized targets" width={390} height={844}>
          <VeilA></VeilA>
        </DCArtboard>
        <DCArtboard id="r4-veil-b" label="Veil II-B · Compass — tap a quarter" width={390} height={844}>
          <VeilB></VeilB>
        </DCArtboard>
        <DCArtboard id="r4-light-pour" label="Light Pour II · Greige & Ink, amber whispers" width={390} height={844}>
          <LightPourII></LightPourII>
        </DCArtboard>
        <DCArtboard id="r4-weave" label="The Weave · reveal motion study" width={390} height={844}>
          <Weave></Weave>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const arcanaR4Root = ReactDOM.createRoot(document.getElementById("root"));
arcanaR4Root.render(<ArcanaRound4></ArcanaRound4>);
