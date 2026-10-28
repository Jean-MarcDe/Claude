/* Walks every slide with all steps revealed and reports any that overflow the
   720px frame, any missing speaker notes, and any console errors.
   Run: node deck-test.js */
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport:{width:1600,height:950} });
  const pg = await ctx.newPage();
  const errs = [];
  pg.on('console', m => { if (m.type()==='error') errs.push(m.text().slice(0,140)); });
  pg.on('pageerror', e => errs.push('PAGEERROR: '+String(e).slice(0,160)));
  await pg.goto('file://' + require('path').resolve(__dirname, process.argv[2] || 'index.html'), {waitUntil:'load'});
  await pg.waitForTimeout(500);

  const n = await pg.evaluate(() => document.querySelectorAll('.slide').length);
  console.log('slides:', n);

  // walk every slide, fully expanding steps, and measure overflow
  const bad = [];
  for (let i = 0; i < n; i++) {
    await pg.evaluate(k => { location.hash = '#'+(k+1); }, i);
    await pg.keyboard.press('Home');            // reset
    for (let j=0;j<i;j++) await pg.keyboard.press('ArrowDown');
    // expand all steps on this slide
    const steps = await pg.evaluate(() => document.querySelector('.slide.is-current').querySelectorAll('.step').length);
    for (let s=0;s<steps;s++) await pg.keyboard.press('ArrowRight');
    await pg.waitForTimeout(90);
    const r = await pg.evaluate(() => {
      const s = document.querySelector('.slide.is-current');
      const box = s.getBoundingClientRect();
      const over = [];
      s.querySelectorAll('*').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.height === 0 && b.width === 0) return;
        // compare in slide-local coords (slide is scaled; use scrollWidth/Height instead)
        if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflowY === 'visible'
            && el.classList.contains('slide')) over.push('vertical overflow');
      });
      return {
        idx: [...document.querySelectorAll('.slide')].indexOf(s)+1,
        h1: (s.querySelector('h1,h2')||{}).textContent||'',
        scrollH: s.scrollHeight, clientH: s.clientHeight,
        scrollW: s.scrollWidth, clientW: s.clientWidth,
        steps: s.querySelectorAll('.step').length,
        shown: s.querySelectorAll('.step.is-shown').length,
        hasNotes: !!s.querySelector('template.notes')
      };
    });
    const vOver = r.scrollH > r.clientH + 2, hOver = r.scrollW > r.clientW + 2;
    if (vOver || hOver || !r.hasNotes || r.steps !== r.shown) {
      bad.push(`slide ${r.idx} "${r.h1.slice(0,38)}" ${vOver?`V-OVERFLOW ${r.scrollH}/${r.clientH} `:''}${hOver?`H-OVERFLOW ${r.scrollW}/${r.clientW} `:''}${!r.hasNotes?'NO-NOTES ':''}${r.steps!==r.shown?`steps ${r.shown}/${r.steps}`:''}`);
    }
  }
  console.log(bad.length ? 'LAYOUT ISSUES:\n  ' + bad.join('\n  ') : `all ${n} slides fit, all have notes, all steps reveal`);
  console.log('console errors:', errs.length ? errs : 'none');
  await b.close();
})();
