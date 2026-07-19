// /api/cellar-extract — the label reader (cellar-plan §3.2, §2.2).
// Downscaled label photo in → { fields, confidence, rawReading } out.
// One vision call does the one thing an LLM is uniquely good at here:
// reading a stylized, multilingual label the way a person does. The
// lookup step (cellar-resolve) is retrieval and never touches a model.
//
// Model: default Opus (claude-opus-4-8, plan §2.3); CELLAR_EXTRACT_MODEL
// is the sanctioned per-stage cost lever (e.g. claude-sonnet-5). The
// response shape is enforced server-side with structured outputs
// (output_config.format json_schema) so the client never parses prose.
// Unknown fields come back as "" — never invented.
//
// Privacy (§2.2): stateless — the photo lives in this request and dies
// with it; nothing is written server-side. Anthropic retains API inputs
// ~30 days under standard policy (the eventual privacy-note line).
// Missing ANTHROPIC_API_KEY → 503 and the app's manual path carries on.

const { cellarGuard } = require("./_lib/cellar-guards.js");

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["fields", "confidence", "rawReading"],
  properties: {
    fields: {
      type: "object",
      additionalProperties: false,
      required: ["producer", "wine", "vintage", "type", "region", "country", "grapes"],
      properties: {
        producer: { type: "string" },
        wine: { type: "string" },
        vintage: { type: "string" },
        type: { type: "string", enum: ["Red", "White", "Rosé", "Sparkling", "Orange", "Fortified", "Dessert", ""] },
        region: { type: "string" },
        country: { type: "string" },
        grapes: { type: "array", items: { type: "string" } },
      },
    },
    confidence: { type: "number" },
    rawReading: { type: "string" },
  },
};

const PROMPT = `Read this wine label photograph.

Return:
- fields.producer: who made the wine (the estate/house/brand — e.g. "Tyrrell's", "Domaine Zind Humbrecht").
- fields.wine: what the label calls this wine — the cuvée/bottling name WITHOUT repeating the producer (e.g. "Vat 1 Semillon", "Châteauneuf-du-Pape"). If the label is producer-only (a grand vin), use the appellation.
- fields.vintage: the 4-digit year, or "NV" if explicitly non-vintage, or "" if not visible.
- fields.type: the wine's style from the visible evidence (colour words, appellation rules, "brut"/"spumante" etc.), or "" if genuinely unclear.
- fields.region / fields.country: as stated or reliably implied by the appellation; "" if unclear.
- fields.grapes: grape varieties ONLY if printed on the label; empty array otherwise. Never infer grapes from the appellation.
- confidence: 0 to 1 — your confidence that producer+wine+vintage are read correctly (not guessed). Blurry, partial, or ambiguous reads score low.
- rawReading: the literal visible text of the label, top to bottom, separated by " · ". No interpretation.

Never invent. An empty string beats a plausible guess.`;

module.exports = async (req, res) => {
  const blocked = await cellarGuard(req, { costed: true });
  if (blocked) { res.status(blocked.status).json(blocked.body); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  let image = body && typeof body.image === "string" ? body.image : "";
  const m = /^data:image\/jpeg;base64,(.+)$/.exec(image);
  if (m) image = m[1];
  // client sends canvas-downscaled JPEG ≤1280px q0.8 (~150–250KB); the cap
  // is generous headroom, not an invitation
  if (!image || image.length < 100 || image.length > 2500000 || !/^[A-Za-z0-9+/=]+$/.test(image)) {
    res.status(400).json({ error: "bad image" }); return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(503).json({ reason: "extract not configured" }); return; }
  const model = process.env.CELLAR_EXTRACT_MODEL || "claude-opus-4-8";

  try {
    const ctl = new AbortController();
    const kill = setTimeout(() => ctl.abort(), 45000);
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1200,
        output_config: { format: { type: "json_schema", schema: SCHEMA } },
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
            { type: "text", text: PROMPT },
          ],
        }],
      }),
      signal: ctl.signal,
    });
    clearTimeout(kill);
    if (!r.ok) { res.status(502).json({ error: "extract failed" }); return; }
    const msg = await r.json();
    if (msg.stop_reason === "refusal") { res.status(502).json({ error: "extract failed" }); return; }
    const text = (msg.content || []).find((b) => b.type === "text");
    let out = null;
    try { out = JSON.parse(text.text); } catch (e) {}
    if (!out || !out.fields) { res.status(502).json({ error: "extract failed" }); return; }
    out.confidence = Math.max(0, Math.min(1, Number(out.confidence) || 0));
    res.status(200).json(out);
  } catch (err) {
    res.status(502).json({ error: "extract failed" });
  }
};
