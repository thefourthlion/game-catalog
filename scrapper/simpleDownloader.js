const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const fs = require("fs");

const app = express();
const port = process.env.PORT || 3002;

//ps1
// 7108, 7109, 7110, 7120, 7159, 7162, 7163, 7173, 7174, 7175, 7176, 7177, 7178,
// 7194, 7195, 7196, 7197, 7198, 7199, 7200, 7201, 7203, 7226, 7227, 7228, 7229,
// 7230, 7231,

//ps3

const gameNumbers = [24806, 24828];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // ps1 5942-7250=1308games25
  // ps2 7823-9775=1952games
  // ps3 24605-25752=1147games
  // 24612 25735 6131
  for (let num = 0; num <= 195; num++) {
    await delay(1000);

    try {
      // --------------------------------------------------- find link and wait for load  -----------------------------
      await page.setDefaultNavigationTimeout(0);

      await page.goto(`https://vimm.net/vault/${gameNumbers[num]}`, {
        waitUntil: "domcontentloaded",
      });

      // --------------------------------------------------- get title  -----------------------------
      const getTitle = await page.evaluate(() => {
        const title = document.querySelector("#data-good-title").innerText;
        const fileName = title + ".7z";
        return fileName;
      });

      console.log("Currently downloading: " + getTitle);

      // --------------------------------------------------- see if download file is on page -----------------------------
      const isDownloadable = await page.evaluate(() => {
        const download = document.querySelector(
          "#download_form > button"
        ).innerText;
        if (download != false) {
          return download;
        } else {
          return false;
        }
      });

      // --------------------------------------------------- see if file already exists -----------------------------
      const currentFile = path.join(__dirname, "./downloads/" + getTitle);
      console.log("Downloaded already? " + fs.existsSync(currentFile));

      // --------------------------------------------------- if a file is there, download it -----------------------------
      if (isDownloadable == "Download") {
        if (getTitle.includes("USA") || getTitle.includes("En")) {
          if (!fs.existsSync(currentFile)) {
            const client = await page.target().createCDPSession();
            await client.send("Page.setDownloadBehavior", {
              behavior: "allow",
              downloadPath: path.resolve(__dirname, "./downloads"),
            });
            await Promise.all([
              await page.click("#download_form > button"),
              console.log("🛑"),
              (num = num - 1),
            ]);
          } else {
          }
        }
      }
    } catch (e) {
      // --------------------------------------------------- if a file wont download move to next -----------------------------
      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
