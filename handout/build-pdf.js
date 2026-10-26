/* Renders handout.html to handout.pdf.
   Run: node build-pdf.js   (Chromium and Playwright are preinstalled) */
const { chromium } = require('playwright');
const path = require('path');

const src = 'file://' + path.resolve(__dirname, 'handout.html');
const out = path.resolve(__dirname, 'handout.pdf');

const foot = `
<div style="width:100%;padding:0 12mm;font:400 7pt 'Segoe UI',Arial,sans-serif;color:#5d6973;
            display:flex;justify-content:space-between;">
  <span>Tokens to Decisions — reference handout</span>
  <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
</div>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(src, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: foot,
    margin: { top: '13mm', bottom: '15mm', left: '12mm', right: '12mm' }
  });
  await browser.close();
  console.log('wrote ' + out);
})();
