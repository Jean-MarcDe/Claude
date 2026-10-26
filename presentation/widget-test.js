/* Drives each of the six interactive widgets and prints what it produced, so a
   change that breaks a demonstration shows up as a wrong number rather than as
   a silent no-op.  Run: node widget-test.js */
const { chromium } = require('playwright');
const F='file://' + require('path').resolve(__dirname,'index.html');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport:{width:1600,height:950} });
  const pg = await ctx.newPage();
  const errs=[]; pg.on('pageerror',e=>errs.push(String(e).slice(0,120)));
  const goTo = async (n) => { await pg.goto('about:blank'); await pg.goto(F+'#'+n,{waitUntil:'load'}); await pg.waitForTimeout(350); };

  // --- neuron (slide 6) ---
  await goTo(6);
  let before = await pg.textContent('#nloss');
  await pg.click('#nstep');
  let after1 = await pg.textContent('#nloss');
  await pg.click('#nstep10');
  let after50 = await pg.textContent('#nloss');
  const rowsOK = await pg.evaluate(()=>document.querySelectorAll('#nrows tr').length);
  console.log(`neuron:  loss ${before} -> ${after1} -> ${after50} (${rowsOK} rows)  ${+after50 < +before ? 'LEARNS' : 'FAIL'}`);
  await pg.fill('#nw1','7.7'); await pg.dispatchEvent('#nw1','input');
  console.log('         slider w1=7.7 ->', await pg.textContent('#ow1'));

  // --- attention (slide 12) ---
  await goTo(12);
  const btns = await pg.$$('#aToks button');
  await btns[5].click(); await pg.waitForTimeout(120);
  const itRow = await pg.$$eval('#aBars .bar', els => els.map(e=>e.textContent.trim().replace(/\s+/g,' ')));
  console.log('attention: "it" attends ->', itRow.slice(0,4).join(' | '));

  // --- temperature (slide 14) ---
  await goTo(14);
  const tailAt = async v => { await pg.fill('#tT',v); await pg.dispatchEvent('#tT','input'); await pg.waitForTimeout(120);
    return pg.$eval('.bar--tail .bar__v', e=>e.textContent); };
  console.log(`temperature: tail at T=0.5 ${await tailAt('0.5')} · T=1.0 ${await tailAt('1')} · T=1.5 ${await tailAt('1.5')}`);

  // --- compare (slide 20) ---
  await goTo(20);
  const top = async () => pg.$eval('#mRows tr:first-child td:first-child', e=>e.textContent.trim());
  await pg.fill('#mq','100'); await pg.dispatchEvent('#mq','input');
  await pg.fill('#mc','0'); await pg.dispatchEvent('#mc','input');
  await pg.fill('#ml','0'); await pg.dispatchEvent('#ml','input'); await pg.waitForTimeout(120);
  const qWin = await top();
  await pg.fill('#mq','0'); await pg.dispatchEvent('#mq','input');
  await pg.fill('#mc','100'); await pg.dispatchEvent('#mc','input'); await pg.waitForTimeout(120);
  const cWin = await top();
  console.log(`compare: quality-weighted winner "${qWin}" · cost-weighted winner "${cWin}" ${qWin!==cWin?'RANKING FLIPS':'FAIL'}`);

  // --- cost (slide 22) ---
  await goTo(22);
  const agentic = async () => pg.$eval('#kRows tr:nth-child(4) td:nth-child(2)', e=>e.textContent);
  const cached = await agentic();
  await pg.uncheck('#kCache'); await pg.waitForTimeout(120);
  const uncached = await agentic();
  await pg.fill('#kRev','20'); await pg.dispatchEvent('#kRev','input'); await pg.waitForTimeout(100);
  const cmp = await pg.textContent('#kCmp');
  console.log(`cost: agentic cached ${cached} -> uncached ${uncached}`);
  console.log('      ', cmp.replace(/\s+/g,' ').trim().slice(0,110));

  // --- context (slide 23) ---
  await goTo(23);
  const sum = async () => (await pg.textContent('#cSum')).replace(/\s+/g,' ').trim();
  const curated = await sum();
  await pg.check('#cTog input[data-i="2"]');
  await pg.uncheck('#cTog input[data-i="3"]'); await pg.waitForTimeout(150);
  const full = await sum();
  console.log('context curated: ', curated.slice(0,80));
  console.log('context full:    ', full.slice(0,80));

  // --- keyboard + notes ---
  await goTo(1);
  await pg.keyboard.press('ArrowRight'); await pg.keyboard.press('ArrowRight');
  const idx = await pg.textContent('#counter');
  await pg.keyboard.press('s'); await pg.waitForTimeout(200);
  const notesOpen = await pg.evaluate(()=>document.getElementById('notes').classList.contains('is-open'));
  const notesText = await pg.evaluate(()=>document.getElementById('notes-body').textContent.trim().length);
  await pg.keyboard.press('d'); await pg.waitForTimeout(150);
  const theme = await pg.evaluate(()=>document.documentElement.getAttribute('data-theme'));
  console.log(`keyboard: counter ${idx} · notes open ${notesOpen} (${notesText} chars) · theme ${theme}`);
  console.log('page errors:', errs.length?errs:'none');
  await b.close();
})();
