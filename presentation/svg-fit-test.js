/* Finds SVG <text> that is wider than the <rect> it sits in — the failure that
   appears when a label is translated and no longer fits its box.

   Run: node svg-fit-test.js index.html
        node svg-fit-test.js de/index.html

   It must visit each slide, because getComputedTextLength() returns 0 on a
   slide that is not currently displayed.

   KNOWN FALSE POSITIVES: two labels on slide 13 sit deliberately outside the
   dashed transformer block, to its right. Their anchor still falls inside that
   720px-wide rect, so they are reported. Both decks report exactly those two;
   compare against the other language rather than expecting zero. */
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const file = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1500, height: 900 } });
  await p.goto('file://' + path.resolve(file), { waitUntil: 'load' });
  await p.waitForTimeout(400);
  const n = await p.evaluate(() => document.querySelectorAll('.slide').length);
  const bad = [];
  for (let i = 1; i <= n; i++) {
    await p.evaluate(k => { location.hash = '#' + k; }, i);
    await p.waitForTimeout(60);
    const hits = await p.evaluate(() => {
      const out = [], sl = document.querySelector('.slide.is-current');
      if (!sl) return out;
      sl.querySelectorAll('svg.dgm').forEach(svg => {
        const rects = [...svg.querySelectorAll('rect')].map(r => ({
          x: +r.getAttribute('x'), y: +r.getAttribute('y'),
          w: +r.getAttribute('width'), h: +r.getAttribute('height')
        })).filter(r => !isNaN(r.x) && !isNaN(r.w));
        svg.querySelectorAll('text').forEach(t => {
          let len; try { len = t.getComputedTextLength(); } catch (e) { return; }
          if (!len) return;
          const x = +t.getAttribute('x'), y = +t.getAttribute('y');
          if (isNaN(x) || isNaN(y)) return;
          const a = t.getAttribute('text-anchor') || 'start';
          const left = a === 'middle' ? x - len / 2 : a === 'end' ? x - len : x;
          const right = left + len;
          const host = rects
            .filter(r => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h)
            .sort((u, v) => u.w * u.h - v.w * v.h)[0];
          if (!host) return;
          const pad = 3;
          const over = Math.max(host.x + pad - left, right - (host.x + host.w - pad));
          if (over > 0) out.push({ text: t.textContent.trim().slice(0, 44), over: Math.round(over), box: host.w });
        });
      });
      return out;
    });
    hits.forEach(h => bad.push({ slide: i, ...h }));
  }
  console.log(path.basename(path.dirname(file)) + '/' + path.basename(file) + ' — overflowing labels: ' + bad.length);
  bad.forEach(x => console.log(`  slide ${x.slide}  +${x.over}px (box ${x.box})  "${x.text}"`));
  await b.close();
  if (bad.length) process.exitCode = 1;
})();
