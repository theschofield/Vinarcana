// Shared guardrails for the cellar pipeline functions (cellar-plan §3.2).
// Underscore-prefixed path: Vercel never serves this as an endpoint; the
// functions require() it. Zero npm deps, like everything in api/.
//
// The endpoint is public, so every pipeline call passes through:
//   1. the kill-switch (CELLAR_PIPELINE_DISABLED=1 → the app degrades to
//      the manual-only S1, which ships usable by design)
//   2. a same-origin allowlist (prod + preview deploys + localhost)
//   3. quotas keyed PER-INSTALL (~10 adds/hour) with a per-IP backstop
//      for id-less abuse, plus a global daily budget — §8.13: today's
//      quota seam IS tomorrow's entitlement meter, so the key is the
//      analytics install id, not the IP.
//
// Quota state: serverless instances share nothing, so durable counting
// rides Supabase (the analytics project) via one atomic RPC —
// va_quota_bump(qkey, window_ms, cap) → boolean. Until Ed runs the SQL
// (docs/analytics.md go-live addendum), the RPC 404s and we fall back to
// a per-instance in-memory bucket: weaker, but the origin allowlist and
// Anthropic-side spend caps still stand, and nothing blocks the user.
// Quota-infra FAILURES fail open (availability over strictness at this
// scale); quota EXCEEDED always blocks.

const TOKEN = /^[A-Za-z0-9_-]{1,64}$/;

function originOk(req) {
  const src = req.headers.origin || req.headers.referer || "";
  if (!src) return false;
  let host;
  try { host = new URL(src).hostname; } catch (e) { return false; }
  if (host === "vinarcana.vercel.app") return true;
  if (host.startsWith("vinarcana-") && host.endsWith(".vercel.app")) return true;
  if (host === "localhost" || host === "127.0.0.1") return true;
  return false;
}

function clientIp(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "");
  return fwd.split(",")[0].trim() || "unknown";
}

// ---------- in-memory fallback bucket (per warm instance) ----------
const memBuckets = new Map();
function memBump(key, windowMs, cap) {
  const now = Date.now();
  let b = memBuckets.get(key);
  if (!b || now - b.start > windowMs) { b = { start: now, n: 0 }; memBuckets.set(key, b); }
  b.n += 1;
  if (memBuckets.size > 2000) memBuckets.clear(); // crude leak guard
  return b.n <= cap;
}

// ---------- durable bucket (Supabase RPC; same env vars as api/track) ----------
async function rpcBump(key, windowMs, cap) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svc = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
    || process.env.SUPABASE_SECRET_KEY;
  if (!url || !svc) return null; // not configured → caller falls back
  try {
    const ctl = new AbortController();
    const kill = setTimeout(() => ctl.abort(), 3000);
    const r = await fetch(url.replace(/\/+$/, "") + "/rest/v1/rpc/va_quota_bump", {
      method: "POST",
      headers: { apikey: svc, authorization: "Bearer " + svc, "content-type": "application/json" },
      body: JSON.stringify({ qkey: key, window_ms: windowMs, cap }),
      signal: ctl.signal,
    });
    clearTimeout(kill);
    if (!r.ok) return null;              // RPC missing (SQL not run yet) → fallback
    return (await r.json()) === true;    // false = over cap
  } catch (e) { return null; }           // network trouble → fallback
}

async function bump(key, windowMs, cap) {
  const durable = await rpcBump(key, windowMs, cap);
  if (durable !== null) return durable;
  return memBump(key, windowMs, cap);
}

// The gate. `costed` = the call spends money (extract); resolve passes
// costed:false and skips the daily budget + tight caps.
// Returns null when clear, or { status, body } to answer with.
async function cellarGuard(req, { costed }) {
  if (req.method !== "POST") return { status: 405, body: { error: "POST only" } };
  if (process.env.CELLAR_PIPELINE_DISABLED === "1")
    return { status: 503, body: { disabled: true, reason: "pipeline disabled" } };
  if (!originOk(req)) return { status: 403, body: { error: "origin" } };

  const install = String((req.body && req.body.install) || "");
  const ip = clientIp(req);
  const HOUR = 3600000;

  if (costed) {
    // per-install first-class meter (~10 adds/hour), IP as backstop only
    if (TOKEN.test(install)) {
      if (!(await bump("i:" + install, HOUR, 10)))
        return { status: 429, body: { error: "quota", scope: "install" } };
    }
    if (!(await bump("ip:" + ip, HOUR, 30)))
      return { status: 429, body: { error: "quota", scope: "ip" } };
    const budget = parseInt(process.env.CELLAR_DAILY_BUDGET || "200", 10);
    const day = new Date().toISOString().slice(0, 10);
    if (!(await bump("day:" + day, 26 * HOUR, budget)))
      return { status: 429, body: { error: "quota", scope: "budget" } };
  } else {
    // resolve is free — a loose per-IP lid is plenty
    if (!(await bump("r:" + ip, HOUR, 240)))
      return { status: 429, body: { error: "quota", scope: "ip" } };
  }
  return null;
}

module.exports = { cellarGuard, TOKEN };
