// ANALYTICS — the cohort's pulse, taken quietly. (docs/analytics.md)
// One anonymous install id, a localStorage OUTBOX, one POST endpoint
// (/api/track). No PII, no cookies, no third-party script: events describe
// the ritual (draw → reading → pour), never the person.
// · The outbox is the durability story: every event queues locally first,
//   so nothing is lost while the sink (api/track → Supabase) isn't live —
//   the queue flushes retroactively, original timestamps intact. Delivery
//   is at-least-once (retries + beacons); the server dedupes on event id.
// · Kill switch for Ed's own devices: visit once with ?va-off (persists;
//   ?va-on re-arms). localhost marks events dev:true instead of dropping
//   them, so harness tests can watch the queue.
// · Every entry point is try/caught — analytics must never be able to
//   break the ritual.

(() => {
  const LS = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };

  try {
    if (/[?&]va-off\b/.test(location.search)) LS.set("va-an-off", "1");
    if (/[?&]va-on\b/.test(location.search)) LS.del("va-an-off");
  } catch (e) {}
  const OFF = LS.get("va-an-off") === "1";
  const DEV = /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname);

  const rid = () => {
    try { return crypto.randomUUID(); }
    catch (e) { return "x" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }
  };

  // ---------- identity ----------
  let install = LS.get("va-an-id");
  if (!install) { install = rid(); LS.set("va-an-id", install); LS.set("va-an-born", String(Date.now())); }
  const born = parseInt(LS.get("va-an-born") || "", 10) || Date.now();
  const standalone = !!((window.matchMedia && matchMedia("(display-mode: standalone)").matches)
    || window.navigator.standalone === true);

  // ---------- outbox ----------
  const QKEY = "va-an-q", QCAP = 600;
  let queue;
  try { queue = JSON.parse(LS.get(QKEY) || "[]"); } catch (e) { queue = []; }
  if (!Array.isArray(queue)) queue = [];
  const persist = () => {
    if (queue.length > QCAP) queue = queue.slice(queue.length - QCAP);
    LS.set(QKEY, JSON.stringify(queue));
  };

  // ---------- affinity (wine / tarot / neither) ----------
  // Behavioral, never asked: the core ritual is neutral (everyone draws,
  // everyone sees a pour), so only the OPTIONAL behaviors discriminate —
  // wine: keeping bottles to Memory, the Cellar, re-opening a kept pour;
  // tarot: the Deeper Reading, browsing the Deck. A side wins at 2+
  // signals; ties keep the earlier tag (else wine — the bridge the
  // business plan most needs to see). The tag rides EVERY event, so
  // retention reads per-segment without a join.
  const WINE = { memory_saved: 1, cellar_added: 1 };
  const TAROT = { deeper_opened: 1, deck_viewed: 1 };
  let aff;
  try { aff = JSON.parse(LS.get("va-an-aff") || "{}"); } catch (e) { aff = {}; }
  aff = { wine: aff.wine || 0, tarot: aff.tarot || 0 };
  let tag = LS.get("va-an-tag") || "neither";
  const scoreEvent = (event, props, now) => {
    let w = WINE[event] || 0, t = TAROT[event] || 0;
    if (event === "pour_viewed" && props && props.origin === "memory") w += 1;
    if (!w && !t) return;
    aff.wine += w; aff.tarot += t;
    LS.set("va-an-aff", JSON.stringify(aff));
    let next = tag;
    if (aff.wine >= 2 || aff.tarot >= 2) {
      if (aff.wine > aff.tarot) next = "wine";
      else if (aff.tarot > aff.wine) next = "tarot";
      else if (tag === "neither") next = "wine";
    }
    if (next !== tag) { tag = next; LS.set("va-an-tag", tag); push("affinity_set", { tag }, now); }
  };

  // ---------- sessions ----------
  // A 30-minute silence starts a new one — checked on load, on every
  // track, and on return-to-visible, because the home-screen app can
  // stay alive for days without ever reloading.
  const GAP = 30 * 60 * 1000;
  let sess = LS.get("va-an-sess") || null;
  const rollSession = (now) => {
    const last = parseInt(LS.get("va-an-last") || "0", 10) || 0;
    if (!sess || now - last > GAP) {
      sess = rid(); LS.set("va-an-sess", sess);
      const day = Math.floor((now - born) / 86400000);
      push("session_start", { day, returning: day > 0 }, now);
    }
    LS.set("va-an-last", String(now));
  };

  const push = (event, props, now) => {
    const e = {
      id: rid(), install, session: sess, event, ts: now,
      tzm: -new Date().getTimezoneOffset(), affinity: tag, standalone,
      props: props || {},
    };
    if (DEV) e.dev = true;
    queue.push(e); persist(); schedule();
  };

  const sanitize = (props) => {
    const out = {};
    if (props && typeof props === "object") {
      Object.keys(props).slice(0, 12).forEach((k) => {
        const v = props[k];
        if (v == null) return;
        if (typeof v === "number" || typeof v === "boolean") out[k] = v;
        else out[k] = String(v).slice(0, 120);
      });
    }
    return out;
  };

  // ---------- delivery ----------
  const EP = "/api/track";
  let timer = null, backoff = 5000, inflight = false;
  const schedule = (ms) => {
    if (OFF || timer) return;
    timer = setTimeout(flush, ms || 2500);
  };
  const flush = () => {
    timer = null;
    if (inflight || !queue.length) return;
    if (navigator.onLine === false) { schedule(60000); return; }
    const batch = queue.slice(0, 25);
    inflight = true;
    fetch(EP, {
      method: "POST", keepalive: true,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ events: batch }),
    }).then((r) => {
      inflight = false;
      if (r.ok) {
        const sent = new Set(batch.map((e) => e.id));
        queue = queue.filter((e) => !sent.has(e.id)); persist();
        backoff = 5000;
        if (queue.length) schedule(400);
      } else { backoff = Math.min(backoff * 2, 600000); schedule(backoff); }
    }).catch(() => {
      inflight = false; backoff = Math.min(backoff * 2, 600000); schedule(backoff);
    });
  };

  // Backgrounding: fire-and-forget a beacon with the freshest batch.
  // Success is unknowable, so the outbox KEEPS them — the next confirmed
  // flush clears them, and the server's id-dedupe absorbs the overlap.
  document.addEventListener("visibilitychange", () => {
    try {
      if (document.visibilityState === "visible") { if (!OFF) rollSession(Date.now()); return; }
      if (OFF || !queue.length || !navigator.sendBeacon) return;
      const batch = queue.slice(0, 25);
      navigator.sendBeacon(EP, new Blob([JSON.stringify({ events: batch })], { type: "application/json" }));
    } catch (e) {}
  });

  // ---------- public seam ----------
  const track = (event, props) => {
    try {
      if (OFF) return;
      if (typeof event !== "string" || !/^[a-z0-9_]{1,40}$/.test(event)) return;
      const now = Date.now();
      const p = sanitize(props);
      rollSession(now);
      scoreEvent(event, p, now);
      push(event, p, now);
    } catch (e) {}
  };
  window.VAAnalytics = { track, install };

  try { if (!OFF) { rollSession(Date.now()); schedule(4000); } } catch (e) {}
})();
