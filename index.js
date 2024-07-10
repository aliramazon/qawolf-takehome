const fs = require('fs')

// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  const locator = page.locator('.titleline > a');
  
  const articles = await locator.evaluateAll(nodes => {
    const rows = ["title, url"];
    for(let i = 0; i < 10; i ++) {
      const node = nodes[i];
      rows.push(`${node.innerText}, ${node.href}`);
    }

    return rows;
  })
  fs.writeFileSync('result.csv', articles.join("\n"));
  page.close()

}

(async () => {
  await saveHackerNewsArticles();
})();
