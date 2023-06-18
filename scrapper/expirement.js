const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const app = express();
const { Storage } = require("@google-cloud/storage");

const { games } = require("./gameLists/gameBoyAdvanced");
const port = process.env.PORT || 3001;
const start = 0;
const end = games.length - 1;
const delayTime = 400;

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const storage = new Storage({
  projectId: "111387581544911691922",
  keyFilename: "./personal-site-377920-53ef05f0a38d.json",
});

const uploadFileToGoogleCloud = async function (
  fileName,
  filePath,
  bucketName
) {
  const options = {
    destination: fileName,
    // public: true,
  };
  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`☁️👍${filePath} uploaded to ${bucketName}`);
};

const bucketName = "game-catalog-roms";

const downloadGames = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let num = start; num <= end; num++) {
    try {
      await page.setDefaultNavigationTimeout(0);

      // Navigate to the vault page for the current id
      await page.goto(`https://vimm.net/vault/${num}`, {
        waitUntil: "domcontentloaded",
      });

      // Check if the download button is available for the game
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

      const getConsole = await page.evaluate(() => {
        const console = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2.mainContent > span.sectionTitle"
        ).innerText;
        return console;
      });

      // Get the title of the game
      const getTitle = await page.evaluate(() => {
        const title = document.querySelector("#data-good-title").innerText;
        let fileName = title.split(".");
        fileName[1] = "zip";
        let name = fileName.join(".");
        return name;
      });

      await delay(delayTime);

      console.log(
        `-------------------- #${num} - ${getTitle} -------------------------`
      );

      // Check if the game has already been downloaded

      const currentFile = path.join(__dirname, "/downloads/" + getTitle);

      if (fs.existsSync(currentFile)) {
        let exists = "✅";
        console.log(`Is #${currentFile} downloaded? ${exists}`);

        await uploadFileToGoogleCloud(
          `${getConsole}/${getTitle}`,
          `./downloads/${getTitle}`,
          bucketName
        ).then(() => {
          fs.unlink(`./downloads/${getTitle}`, (err) => {
            if (err) throw err;
            console.log("File deleted!");
          });

          let urlTitle = getTitle.replace(/\s+/g, "%20");
          let googleGCSUrl = `https://storage.googleapis.com/game-catalog-roms/${getConsole}/${urlTitle}`;
          console.log(googleGCSUrl);
          axios
            .post(`http://localhost:3006/api/games/update/game/${num}`, {
              downloadLink: googleGCSUrl,
            })
            .then(() => {
              console.log("✅ CHANGED DESCRIPTION");
            })
            .catch((error) => {
              console.log("🛑 COULDN'T CHANGE DESCRIPTION");
            });
        });
      } else {
        let exists = "⛔";
        console.log(`Is #${currentFile} downloaded? ${exists}`);
      }

      //storage.googleapis.com/game-catalog-roms/Nintendo/10-Yard%20Fight%20(USA%2C%20Europe).zip

      // Download the game if it's not already downloaded
      https: if (isDownloadable == "Download") {
        if (fs.existsSync(currentFile) == false) {
          const client = await page.target().createCDPSession();
          await client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: path.resolve(__dirname, "./downloads"),
          });
          await Promise.all([
            await page.click("#download_form > button"),
            console.log("Downloading..."),
            (num = num - 1),
          ]);
        } else {
        }
      }
      //
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();

app.listen(port, () => console.log(`Listening on port ${port}`));