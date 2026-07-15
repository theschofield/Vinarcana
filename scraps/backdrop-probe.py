#!/usr/bin/env python3
"""THE CHROME-BAND PROBE — detects iOS Safari's opaque toolbar backdrop in
the SIMULATOR (long believed device-only; Ed spotted it in sim footage,
Jul 12 2026). The tell: the app's texture behind/around the floating
bottom chrome. Clean pages read band stddev ≈ 3.4-3.7 (veil art + grain
visible through); the backdrop reads ≈ 2.0 (flat fill) with a hard top
edge. Calibrated on the stage-pin incident (pin ON 2.03 / OFF 3.45-3.62).

Run before shipping ANYTHING that touches pinned/sticky/viewport-sized
construction:
  1. Boot a sim (iPhone 17, iOS 26) + `safaridriver -p 4444`.
  2. python3 scraps/backdrop-probe.py http://localhost:8123
Drives the REAL page (deck mid-scroll, the reading, the pour, the
memory ledger mid-scroll) and measures the band where it carries
large-scale texture — the only places the tell is valid: the DECK at
MID-scroll (raw tiles run behind the chrome; clean ≈ sd 36-44), the
READING (veil art; clean ≈ 3.5), and the MEMORY ledger at MID-scroll
(a seeded row's card/bottle art parked in the band; the real ledger is
restored after). The APPROACH and the deck's BOTTOM are flat-on-flat
(gradient end color / the grid's end-of-scroll padding — A/B-verified
pixel-identical to the pre-field build, so a backdrop is
indistinguishable there in the sim); those are device-only evidence.
Screenshots land in the CWD.

Requires: PIL (host python). Every request hard-capped — never W3C touch
actions (they hang against the sim); taps are executeScript dispatch.
"""
import json, subprocess, sys, time, urllib.request
from PIL import Image, ImageStat

DRIVER = "http://127.0.0.1:4444"
UDID = "98C7B6D5-16A1-4085-9891-44868486B1CA"  # iPhone 17 · iOS 26.5

def req(method, path, body=None, timeout=15):
    r = urllib.request.Request(DRIVER + path, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=timeout) as f:
        return json.loads(f.read().decode())

def ex(sid, script, args=None, timeout=15):
    return req("POST", f"/session/{sid}/execute/sync",
               {"script": script, "args": args or []}, timeout)["value"]

def measure(shot):
    """(band_stddev, edge_step, verdict) for a 1206x2622 sim screenshot."""
    im = Image.open(shot).convert("L")
    band = im.crop((10, 2340, 1196, 2370))
    band = band.resize((band.width // 8, max(1, band.height // 8)), Image.LANCZOS)
    sd = ImageStat.Stat(band).stddev[0]
    strip = im.crop((10, 2280, 200, 2420)).resize((24, 70), Image.LANCZOS)
    rows = [ImageStat.Stat(strip.crop((0, y, 24, y + 1))).mean[0] for y in range(0, 70, 2)]
    step = max(abs(rows[i + 1] - rows[i]) for i in range(len(rows) - 1))
    verdict = "BACKDROP" if sd < 2.7 else ("clean" if sd >= 2.9 else "ambiguous")
    return round(sd, 2), round(step, 1), verdict

def shot_and_measure(tag):
    name = f"band-{tag}.png"
    subprocess.run(["xcrun", "simctl", "io", UDID, "screenshot", name], capture_output=True)
    sd, step, verdict = measure(name)
    print(f"{tag}: stddev {sd}, edge step {step} -> {verdict}", flush=True)
    return verdict

def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8123").rstrip("/")
    s = req("POST", "/session", {"capabilities": {"alwaysMatch": {
        "browserName": "safari", "platformName": "iOS",
        "safari:useSimulator": True, "safari:deviceUDID": UDID}}}, timeout=120)
    sid = s["value"]["sessionId"]
    fails = []
    try:
        req("POST", f"/session/{sid}/url", {"url": base + "/index.html"}, timeout=30)
        t0 = time.time()
        while time.time() - t0 < 60 and not ex(sid, "return !!window.__vaDrive"): time.sleep(1)
        time.sleep(2.5)
        ex(sid, "window.__vaDrive.deck()")
        t0 = time.time()
        while time.time() - t0 < 15 and ex(sid, "return window.__vaDrive.phase()") != "deck": time.sleep(0.5)
        time.sleep(2)
        # MID-scroll of the GRID (an independent scroller — the document
        # never moves): raw tiles behind the chrome. The grid's bottom is
        # its own fade+padding — flat even when clean; see docstring.
        ex(sid, "const s = document.querySelector('.dk-scroll'); s.scrollTop = Math.round(s.scrollHeight * 0.5)")
        time.sleep(1)
        if shot_and_measure("deck-mid") != "clean": fails.append("deck")
        ex(sid, """
          const el = document.querySelectorAll('.dk-tile')[11];
          const o = { bubbles: true, cancelable: true, pointerId: 9, pointerType: 'touch', isPrimary: true };
          const r = el.getBoundingClientRect();
          o.clientX = r.left + r.width/2; o.clientY = r.top + r.height/2;
          el.dispatchEvent(new PointerEvent('pointerdown', o));
          el.dispatchEvent(new PointerEvent('pointerup', o));
          el.dispatchEvent(new MouseEvent('click', o));""")
        t0 = time.time()
        while time.time() - t0 < 30 and ex(sid, "return window.__vaDrive.phase()") != "reading": time.sleep(0.5)
        time.sleep(1.5)
        if shot_and_measure("reading") != "clean": fails.append("reading")
        # THE POUR (keeps the veil -> same clean signature as the reading);
        # scroll the active pane's own scroller, never the document
        ex(sid, "window.__vaDrive.pick(0)")
        t0 = time.time()
        while time.time() - t0 < 20 and ex(sid, "return window.__vaDrive.phase()") != "reveal": time.sleep(0.5)
        time.sleep(1.5)
        ex(sid, "const v = document.querySelector('.rv-vscroll'); if (v) v.scrollTop = Math.round(v.scrollHeight * 0.4)")
        time.sleep(1)
        if shot_and_measure("pour") != "clean": fails.append("pour")
        # THE MEMORY LEDGER (its own layer since Jul 14 2026): seed a full
        # throwaway ledger (the real va-memory is restored below), enter
        # from the reveal, scroll the LAYER's scroller — never the
        # document — and park a row's card/bottle art in the chrome band
        # so the tell is valid (rows are sparser than deck tiles; a
        # text-only stripe would read flat even when clean).
        backup = ex(sid, "return localStorage.getItem('va-memory')")
        ex(sid, """
          const P = window.POURS || {}; const seeds = [];
          const cards = Object.keys(P).filter(id => window.ARCANA && ARCANA[id]);
          for (let i = 0; i < 18 && cards.length; i++) {
            const cid = cards[i % cards.length]; const byLens = P[cid] || {};
            const ln = Object.keys(byLens).find(k => (byLens[k] || []).length);
            if (!ln) continue; const p = byLens[ln][0];
            seeds.push({ id: 'probe-' + i, ts: Date.now() - i * 9 * 86400000, card: cid, lens: ln,
              wine: p.wine, sub: p.sub || ['', ''], bottle: p.bottle || 'assets/bottle-red.png',
              jot: 'probe row ' + i, hearted: i % 3 === 0 });
          }
          localStorage.setItem('va-memory', JSON.stringify(seeds));""")
        ex(sid, "window.__vaDrive.memory()")
        t0 = time.time()
        while time.time() - t0 < 20 and ex(sid, "return window.__vaDrive.phase()") != "memory": time.sleep(0.5)
        time.sleep(2)
        # THE CUTOFF GATE (Ed's device eye, Jul 14 2026): a mask-free
        # scroller's layer must overshoot the layout viewport by >=100px
        # or its bottom edge shows as a hard line mid-chrome. 100lvh+safe
        # alone left the ledger ~40px past innerHeight and the cutoff sat
        # halfway behind the bar on device — while the band stddev still
        # read "clean" (the tell was the EDGE STEP, 22.5 vs the pour's
        # 7.1, which the verdict didn't gate). Assert geometry directly.
        over = ex(sid, """
          const r = document.querySelector('.mf-screen').getBoundingClientRect();
          return Math.round(r.bottom - window.innerHeight);""")
        print(f"memory layer overshoot past layout viewport: {over}px", flush=True)
        if over < 100: fails.append(f"memory-cutoff (overshoot {over}px < 100)")
        ex(sid, """
          const m = document.querySelector('.mf-scroll');
          m.scrollTop = Math.round(m.scrollHeight * 0.5);
          // band center: device y 2355 / 3 = pt 785 — align the nearest
          // pair's art center to it
          let best = null, bd = 1e9;
          for (const p of document.querySelectorAll('.mf-pair')) {
            const r = p.getBoundingClientRect(); const c = r.top + r.height / 2;
            if (Math.abs(c - 785) < bd) { bd = Math.abs(c - 785); best = c; }
          }
          if (best != null) m.scrollTop += Math.round(best - 785);""")
        time.sleep(1)
        if shot_and_measure("memory-mid") != "clean": fails.append("memory")
        if backup is None: ex(sid, "localStorage.removeItem('va-memory')")
        else: ex(sid, "localStorage.setItem('va-memory', arguments[0])", [backup])
        print("BAND PROBE:", "FAIL — " + ", ".join(fails) if fails else "PASS (deck + reading + pour + memory clean)")
    finally:
        try: req("DELETE", f"/session/{sid}", timeout=30)
        except Exception as e: print("close:", e)

main()
