// DEEPER READING — the guidebook content registry, keyed by ARCANA id.
// Informative voice, like the booklet in a tarot deck ("you" is allowed;
// this is not the spirit). House rules: no em dashes, no negation-contrast
// pivots.
//
// ONLY THE MOON IS WRITTEN. Do not improvise card meanings here — guidebook
// copy for every other card flows through the content pipeline
// (content/voice-prompt.md, batches + user grading) before it lands.
// Cards with no entry simply get no flip affordance and no CARD MEANING
// pill until their copy arrives.
//
// Placeholder structure for a new card:
// {
//   surface: "The Guidebook",
//   keywords: ["…", "…"],                       // shown nowrap, dot-separated
//   meaning: { label: "What the card means", paras: ["…", "…"] },
//   reading: { label: "As a reading", paras: ["…", "…"] },
//   closing: { label: "Before you return", para: "…", line: "…" },
// }
// (num/name resolve from ARCANA at render; the closing button is always
// "TURN THE CARD BACK".)

const GUIDES = {
  moon: {
    surface: "The Guidebook",
    keywords: ["Illusion", "Intuition", "Dreams", "The subconscious", "Fear", "The hidden"],
    meaning: {
      label: "What the card means",
      paras: [
        "The Moon is the night card of the deck. It stands for illusion, dreams, instinct, and everything a situation keeps beneath its surface. Where the Sun shows things exactly as they are, The Moon shows them as they feel, which is sometimes more honest and sometimes much less.",
        "Drawing it means some part of life is currently moonlit. The full picture has not come out yet, facts are missing, and imagination is busy filling the gaps. Fear tends to draw those gaps larger than they really are. The card carries an old reassurance: the road in the picture continues through the dark and comes out the other side. Confusion, here, is a phase, and phases pass.",
      ],
    },
    reading: {
      label: "As a reading",
      paras: [
        "Drawn tonight, The Moon points at the place in your life where certainty is thinnest. A decision that refuses to settle. A story that does not quite add up. A mood with no visible cause. It counsels patience over force: let the situation finish revealing itself before you act on it.",
        "It also asks you to take your intuition seriously. Under this card, a feeling is information arriving early. If something has seemed off lately, the card sides with you. And if fear has been doing the narrating, make it prove its claims. Moonlight exaggerates, and most of its monsters turn out to be rocks.",
      ],
    },
    closing: {
      label: "Before you return",
      para: "One card holds several truths, and the lenses are how this deck splits them apart. For The Moon they read: something that will not hold still, a pull you feel but cannot see, a deception you may already suspect, an instinct that has been right all along. Only you know which of those is tonight's truth.",
      line: "Turn toward the one that knows you.",
    },
  },
};

if (typeof window !== "undefined") { window.GUIDES = GUIDES; }
