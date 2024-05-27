// important linux install
// sudo apt-get install chromium-browser

// important windows install
// npx @puppeteer/browsers install chrome@stable
const puppeteer = require("puppeteer");
const axios = require("axios");

const url = "https://api.thebombroms.com/api/pcgames";


const getData = (callback) => {
  axios
    .get(`${url}/read`)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error);
    });
};

const postData = (data) => {
  axios
    .post(`${url}/create`, data)
    .then(function (response) {
      // console.log(response.data);
      console.log("Created data");
    })
    .catch(function (error) {
      console.log(error);
    });
};

async function scrapeTorrents() {
  const browser = await puppeteer.launch({ headless: true });
  let currentPageNumber = 1;
  let shouldContinue = true;

  while (shouldContinue) {
    const page = await browser.newPage();

    // pc games = https://www.1377x.to/sort-sub/17/seeders/desc/
    // switch games = https://www.1377x.to/sort-sub/23/seeders/desc/
    const url = `https://www.1377x.to/sort-sub/17/seeders/desc/${currentPageNumber}/`;
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log(`Scraping page ${currentPageNumber}...`);

    let trElements = await page.$$("table.table-list > tbody > tr");

    for (const tr of trElements) {
      const name = await tr.$eval(".name", (e) => e.textContent.trim());
      const seeds = await tr.$eval(".seeds", (e) => e.textContent.trim());
      const date = await tr.$eval(".coll-date", (e) => e.textContent.trim());
      const size = await tr.$eval(".size", (e) => e.textContent.trim());

      // Click on the torrent detail link
      const detailsLink = await tr.$("td.coll-1.name > a:nth-child(2)");
      if (detailsLink) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: "networkidle0" }),
          detailsLink.click(),
        ]);

        // Extract the torrent download link
        const torrentLinkSelector =
          "div.no-top-radius > div.clearfix > ul > li > a";
        const torrentLink = await page.$eval(
          torrentLinkSelector,
          (a) => a.href
        );

        const data = { name, seeds, date, size, torrentLink };

        console.log(data);

        // postData(data);

        // Check if seeds are 0
        if (parseInt(seeds, 10) === 0) {
          shouldContinue = false;
          break;
        }

        // Go back to the list page
        await page.goBack({ waitUntil: "networkidle0" });

        // Re-query the table rows after navigation
        trElements = await page.$$("table.table-list > tbody > tr");
      }
    }

    await page.close();

    if (shouldContinue) {
      currentPageNumber++;
    }
  }

  await browser.close();
  console.log("Finished scraping all pages.");
}

scrapeTorrents();
