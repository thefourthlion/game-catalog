const express = require("express");
const puppeteer = require("puppeteer");

const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let gameCount = 0;
let totalDownloadSize = 0;
let gamesList = "";
let firstGame = 1;
let lastGame = 7251;
let delayTime = 2000;

// ps1 5936-7251=1315games
// ps2 7823-9775=1952games
// ps3 24605-25752=1147games

// ------------------------------------------ consoles info --------------------------------
// consoles link - https://vimm.net/?p=vault
// console list - #main > div > div.mainContent > div.mainContent > div:nth-child(3) > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(1) > a
// console date - #main > div > div.mainContent > div.mainContent > div:nth-child(3) > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(2)
// handheld list - #main > div > div.mainContent > div.mainContent > div:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(1)
// handheld dat - #main > div > div.mainContent > div.mainContent > div:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)

// ------------------------------------------ game info --------------------------------
// games link - https://vimm.net/vault/1-88080

// console - #main > div.innerMain > div > div.mainContent > h2.mainContent > span.sectionTitle
// title - #main > div.innerMain > div > div.mainContent > h2.mainContent > span:nth-child(3)
// body with info - #main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody
// header of info - #main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1)
// body of info - #main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(3)
// game size - #download_size

// get media link
// media link - #download_form > input[type=hidden]:nth-child(1)
// download link - https://download3.vimm.net/download/?mediaId=79667

// screen image - https://vimm.net/image.php?type=screen&id=1
// box image - https://vimm.net/image.php?type=box&id=6039
// cart image - https://vimm.net/image.php?type=cart&id=6039

// review REVIEWER UNAME - #reviewDiv > table > tbody > tr:nth-child(1) > td:nth-child(1)
// review DATE - #reviewDiv > table > tbody > tr:nth-child(1) > td:nth-child(2)
// review REVIEW - #reviewDiv > table:nth-child(1) > tbody > tr:nth-child(2) > td

// game gene codes title - #main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > caption'
// game gene code - #main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr:nth-child(1) > td:nth-child(1)
// game gene code description - #main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr:nth-child(1) > td:nth-child(2)

// more info
// cycle through tr's and get text info from inside
// github for cover images - https://github.com/libretro-thumbnails/libretro-thumbnails

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let num = firstGame; num <= lastGame; num++) {
    try {
      // --------------------------------------------------- find link and wait for load  -----------------------------
      await page.setDefaultNavigationTimeout(0);

      await page.goto(`https://vimm.net/vault/${num}`, {
        waitUntil: "domcontentloaded",
      });

      // --------------------------------------------------- get title  -----------------------------
      const title = await page.evaluate(() => {
        const title = document.querySelector("#data-good-title").innerText;
        const fileName = title + ".7z";
        return fileName;
      });

      console.log("---------------------------------------");
      console.log("Currently scanning: " + title);

      await delay(delayTime);

      // --------------------------------------------------- get games size -----------------------------
      const downloadSize = await page.evaluate(() => {
        const size = document.querySelector("#download_size").innerText;
        let actualSize = size.split(" ");
        if (actualSize[1] == "GB") {
          return actualSize[0];
        } else if (actualSize[1] == "MB") {
          return parseFloat(actualSize[0]) / 1000;
        }
      });

      console.log("Games Downloadable Size : " + downloadSize);

      // --------------------------------------------------- get games console -----------------------------
      const gameConsole = await page.evaluate(() => {
        const system = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2 > span.sectionTitle"
        ).innerText;
        return system;
      });

      console.log("Console: " + gameConsole);

      // ---------------------------- print info on game being scrapped downloaded ----------------------
      console.log(
        "Games Left : " +
          (lastGame - num) +
          " | " +
          `GAME#${num}` +
          " | " +
          "Games Collected : " +
          gameCount +
          " | Total Download Size : " +
          totalDownloadSize +
          " GB"
      );
    } catch (e) {
      // --------------------------------------------------- if a file wont download move to next -----------------------------
      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
