// /api/track — the analytics sink (docs/analytics.md).
// Receives the client outbox's batches (explorations/arcana-analytics.js)
// and forwards them to Supabase (table va_events) via PostgREST, deduping
// on event id so the client's at-least-once delivery (retry + beacon)
// can never double-count. Zero npm deps — Vercel runs /api/*.js as Node
// functions with global fetch, no package.json, no build step.
// Until SUPABASE_URL + SUPABASE_SERVICE_KEY exist in Vercel, it answers
// 503 and clients simply hold their outbox — nothing is lost; events
// arrive later with their original timestamps.
// Privacy: no IP, no user-agent, no cookies are read or stored — only
// the whitelisted, size-capped fields below ever reach the table.

const NAME = /^[a-z0-9_]{1,40}$/;
const TOKEN = /^[A-Za-z0-9_-]{1,64}$/;

function cleanProps(p) {
  const out = {};
  if (p && typeof p === "object" && !Array.isArray(p)) {
    for (const k of Object.keys(p).slice(0, 12)) {
      if (!NAME.test(k)) continue;
      const v = p[k];
      if (typeof v === "number" || typeof v === "boolean") out[k] = v;
      else if (typeof v === "string") out[k] = v.slice(0, 120);
    }
  }
  return out;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ error: "POST only" }); return; }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const events = body && Array.isArray(body.events) ? body.events.slice(0, 50) : null;
  if (!events || !events.length) { res.status(400).json({ error: "no events" }); return; }

  const now = Date.now();
  const rows = [];
  for (const e of events) {
    if (!e || typeof e !== "object") continue;
    if (!TOKEN.test(String(e.id || "")) || !TOKEN.test(String(e.install || ""))) continue;
    if (!NAME.test(String(e.event || ""))) continue;
    const ts = Number(e.ts);
    // sane window: post-2025, at most a day of clock skew into the future
    if (!Number.isFinite(ts) || ts < 1735689600000 || ts > now + 86400000) continue;
    rows.push({
      id: String(e.id),
      install_id: String(e.install),
      session_id: TOKEN.test(String(e.session || "")) ? String(e.session) : null,
      event: String(e.event),
      ts: Math.round(ts),
      tz_min: Number.isFinite(Number(e.tzm)) ? Math.max(-840, Math.min(840, Math.round(Number(e.tzm)))) : null,
      affinity: ["wine", "tarot", "neither"].includes(e.affinity) ? e.affinity : null,
      standalone: typeof e.standalone === "boolean" ? e.standalone : null,
      dev: e.dev === true,
      props: cleanProps(e.props),
    });
  }
  if (!rows.length) { res.status(400).json({ error: "no valid events" }); return; }

  // accept both hand-set names and the ones Vercel's Supabase marketplace
  // integration auto-injects (SERVICE_ROLE legacy JWT or new secret key)
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) { res.status(503).json({ stored: false, reason: "sink not configured" }); return; }

  try {
    const ctl = new AbortController();
    const kill = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(url.replace(/\/+$/, "") + "/rest/v1/va_events?on_conflict=id", {
      method: "POST",
      headers: {
        apikey: key,
        authorization: "Bearer " + key,
        "content-type": "application/json",
        prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify(rows),
      signal: ctl.signal,
    });
    clearTimeout(kill);
    if (r.ok) { res.status(200).json({ stored: true, n: rows.length }); return; }
    res.status(502).json({ stored: false });
  } catch (err) {
    res.status(502).json({ stored: false });
  }
};
