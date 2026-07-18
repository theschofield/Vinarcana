#!/usr/bin/env python3
"""THE COUNT-SHEET EXPERIMENT — E-A measurement protocol (cellar-plan §5.6, D2).

Ed's construction is the primary hypothesis: a strictly TRANSIENT count
sheet, genuinely bottom-anchored (position:fixed, bottom:0), mounted on
count tap and unmounted after the close animation — nothing carries
`bottom:` at rest. The poison rule's convictions were all PERSISTENT
anchors; this transient one is untested territory, so it ships only on
evidence:

  1. resting rack BEFORE the sheet (band must be clean)
  2. sheet OPEN, held 5s (measured at +1s and +5s — the sheet itself
     covers the band, so these shots document the state, and any
     backdrop the anchor summons hides behind sheet+scrim by design)
  3. CLOSE, decay measured at +0.5s / +1s / +2s (the hypothesis's
     testable half: any summoned backdrop must EVAPORATE with the
     unmount — a lingering flat band here convicts E-A and E-B ships)
  4. resting rack AFTER (must match BEFORE)

Sim first; THE DECIDING EVIDENCE IS ED'S DEVICE EYE (chrome-settle
behavior and the slide-under feel are device-only). Numbers here are
dev-side evidence — NEVER analytics events (the two must not be
conflated; cellar-plan §6 S1).

Run: boot the sim + `safaridriver -p 4444`, then
  python3 scraps/count-sheet-probe.py http://localhost:8123
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
    im = Image.open(shot).convert("L")
    band = im.crop((10, 2340, 1196, 2370))
    band = band.resize((band.width // 8, max(1, band.height // 8)), Image.LANCZOS)
    sd = ImageStat.Stat(band).stddev[0]
    strip = im.crop((10, 2280, 200, 2420)).resize((24, 70), Image.LANCZOS)
    rows = [ImageStat.Stat(strip.crop((0, y, 24, y + 1))).mean[0] for y in range(0, 70, 2)]
    step = max(abs(rows[i + 1] - rows[i]) for i in range(len(rows) - 1))
    verdict = "BACKDROP" if sd < 2.7 else ("clean" if sd >= 2.9 else "ambiguous")
    return round(sd, 2), round(step, 1), verdict

def shot(tag):
    name = f"sheet-{tag}.png"
    subprocess.run(["xcrun", "simctl", "io", UDID, "screenshot", name], capture_output=True)
    sd, step, verdict = measure(name)
    print(f"{tag}: stddev {sd}, edge step {step} -> {verdict}", flush=True)
    return sd, step, verdict

def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8123").rstrip("/")
    s = req("POST", "/session", {"capabilities": {"alwaysMatch": {
        "browserName": "safari", "platformName": "iOS",
        "safari:useSimulator": True, "safari:deviceUDID": UDID}}}, timeout=120)
    sid = s["value"]["sessionId"]
    try:
        req("POST", f"/session/{sid}/url", {"url": base + "/index.html?va-off"}, timeout=30)
        t0 = time.time()
        while time.time() - t0 < 60 and not ex(sid, "return !!window.__vaDrive"): time.sleep(1)
        time.sleep(2.5)
        backup = ex(sid, "return localStorage.getItem('va-cellar')")
        ex(sid, """
          const seeds = { v: 1, wines: [] };
          for (let i = 0; i < 20; i++) seeds.wines.push({
            id: 'exp-' + i, addedTs: Date.now() - i * 86400000, updatedTs: Date.now(), count: 1 + (i % 3),
            identity: { producer: 'Probe Estate ' + i, wine: 'Probe Cuvée ' + i, vintage: String(2010 + (i % 15)), source: 'manual', matchedId: null, confidence: null },
            facts: { color: i % 2 ? 'Red' : 'White', grapes: ['Riesling'], otherGrapes: [], region: 'Probe Valley', country: 'France' },
            window: { from: '2020', to: '2030', status: 'ready', word: 'READY' },
            tastes: null, story: null, stats: null, labelPhoto: null, pairings: [], enrichment: { status: 'pending', ts: null },
          });
          localStorage.setItem('va-cellar', JSON.stringify(seeds));""")
        ex(sid, "window.__vaDrive.cellar()")
        t0 = time.time()
        while time.time() - t0 < 20 and ex(sid, "return window.__vaDrive.phase()") != "cellar": time.sleep(0.5)
        time.sleep(2)
        # texture in the band for a valid tell (the rack step's parking)
        ex(sid, """
          const s = document.querySelector('.cf-rack .cf-scroll');
          s.scrollTop = Math.round(s.scrollHeight * 0.5);
          let best = null, bd = 1e9;
          for (const b of document.querySelectorAll('.cl2-tile .bot')) {
            const r = b.getBoundingClientRect(); const c = r.top + r.height / 2;
            if (Math.abs(c - 785) < bd) { bd = Math.abs(c - 785); best = c; }
          }
          if (best != null) s.scrollTop += Math.round(best - 785);""")
        time.sleep(1.5)
        before = shot("rest-before")
        # open the sheet on a visible chip (executeScript dispatch — never
        # W3C touch actions; they hang against the sim)
        ex(sid, """
          const vh = window.innerHeight;
          const chips = [...document.querySelectorAll('.cl2-tile .cl-qty')];
          const chip = chips.find(c => { const b = c.getBoundingClientRect(); return b.top > vh * 0.2 && b.bottom < vh * 0.8; }) || chips[0];
          const o = { bubbles: true, cancelable: true };
          chip.dispatchEvent(new MouseEvent('click', o));""")
        time.sleep(1)
        shot("open-1s")
        time.sleep(4)
        shot("open-5s")
        ex(sid, "document.querySelector('.cl-done').dispatchEvent(new MouseEvent('click', { bubbles: true }))")
        time.sleep(0.5); shot("close-0.5s")
        time.sleep(0.5); shot("close-1s")
        time.sleep(1);   shot("close-2s")
        unmounted = ex(sid, "return !document.querySelector('.cl-sheet')")
        print(f"sheet unmounted after close: {unmounted}", flush=True)
        time.sleep(2)
        after = shot("rest-after")
        drift = abs(after[0] - before[0])
        print(f"resting band before {before[0]} / after {after[0]} (drift {round(drift,2)})", flush=True)
        lingering = after[2] != "clean" or not unmounted
        print("E-A PROTOCOL:", "LINGERING BACKDROP — E-B ships, E-A to the dead-ends list"
              if lingering else "no lingering backdrop in the sim — Ed's device eye decides")
        if backup is None: ex(sid, "localStorage.removeItem('va-cellar')")
        else: ex(sid, "localStorage.setItem('va-cellar', arguments[0])", [backup])
    finally:
        try: req("DELETE", f"/session/{sid}", timeout=30)
        except Exception as e: print("close:", e)

main()
