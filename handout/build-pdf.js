/* Renders each handout.html to a PDF beside it.
   Run: node build-pdf.js            (both languages)
        node build-pdf.js de         (one language)
   Chromium and Playwright are preinstalled; nothing to install. */
const { chromium } = require('playwright');
const path = require('path');

const EDITIONS = {
  en: { dir: '.',   label: 'How language models work — reference handout',
        page: 'Page %p of %t' },
  de: { dir: 'de',  label: 'Wie Sprachmodelle funktionieren — Referenzblatt',
        page: 'Seite %p von %t' }
};

function footer(ed) {
  const n = ed.page.replace('%p', '<span class="pageNumber"></span>')
                   .replace('%t', '<span class="totalPages"></span>');
  return `<div style="width:100%;padding:0 12mm;font:400 7pt 'Segoe UI',Arial,sans-serif;
          color:#5d6973;display:flex;justify-content:space-between;">
            <span>${ed.label}</span><span>${n}</span>
          </div>`;
}

(async () => {
  const want = process.argv.slice(2);
  const keys = want.length ? want : Object.keys(EDITIONS);
  const browser = await chromium.launch();
  for (const k of keys) {
    const ed = EDITIONS[k];
    if (!ed) { console.error('unknown edition: ' + k); process.exitCode = 1; continue; }
    const src = path.resolve(__dirname, ed.dir, 'handout.html');
    const out = path.resolve(__dirname, ed.dir, 'handout.pdf');
    const page = await browser.newPage();
    await page.goto('file://' + src, { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: out, format: 'A4', printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>', footerTemplate: footer(ed),
      margin: { top: '13mm', bottom: '15mm', left: '12mm', right: '12mm' }
    });
    await page.close();
    console.log(k + ' -> ' + out);
  }
  await browser.close();
})();
