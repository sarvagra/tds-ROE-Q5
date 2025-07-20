// sum-tables.js
const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=9',
  'https://sanand0.github.io/tdsdata/js_table/?seed=10',
  'https://sanand0.github.io/tdsdata/js_table/?seed=11',
  'https://sanand0.github.io/tdsdata/js_table/?seed=12',
  'https://sanand0.github.io/tdsdata/js_table/?seed=13',
  'https://sanand0.github.io/tdsdata/js_table/?seed=14',
  'https://sanand0.github.io/tdsdata/js_table/?seed=15',
  'https://sanand0.github.io/tdsdata/js_table/?seed=16',
  'https://sanand0.github.io/tdsdata/js_table/?seed=17',
  'https://sanand0.github.io/tdsdata/js_table/?seed=18',
];

function extractNumbersFromTable(table) {
  const rows = Array.from(table.rows);
  let sum = 0;

  for (const row of rows) {
    for (const cell of row.cells) {
      const num = parseFloat(cell.innerText.replace(/,/g, ''));
      if (!isNaN(num)) sum += num;
    }
  }
  return sum;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);
    const tables = await page.$$eval('table', tables =>
      tables.map(table => {
        let sum = 0;
        const rows = Array.from(table.rows);
        for (const row of rows) {
          for (const cell of row.cells) {
            const num = parseFloat(cell.innerText.replace(/,/g, ''));
            if (!isNaN(num)) sum += num;
          }
        }
        return sum;
      })
    );
    const pageSum = tables.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
  }

  console.log(`TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  await browser.close();
})();