const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3002;

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

let firstGame = 196;
let lastGame = 88085;

(async () => {
  const delayTime = 30000;

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
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
    };
    await storage.bucket(bucketName).upload(filePath, options);
    console.log(`☁️👍${filePath} uploaded to ${bucketName}`);
  };

  const bucketName = "games-catalog";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let num = firstGame; num <= lastGame; num++) {
    delay(delayTime);
    try {
      await page.setDefaultNavigationTimeout(0);

      await page.goto(`https://vimm.net/vault/${num}`);

      const mediaId = await page.evaluate(() => {
        const data = document.querySelector(
          "#download_form > input[type=hidden]:nth-child(1)"
        ).value;
        return data;
      });

      console.log(`========== ${num}`);

      // --------------------------------------------------- get ScreenImg  -----------------------------

      await uploadFileToGoogleCloud(
        `screen-${mediaId}.png`,
        `./images/screen-${mediaId}.png`,
        bucketName
      );

      // --------------------------------------------------- get boxImg -----------------------------

      await uploadFileToGoogleCloud(
        `box-${mediaId}.png`,
        `./images/box-${mediaId}.png`,
        bucketName
      );

      // --------------------------------------------------- get CartImg  -----------------------------

      await uploadFileToGoogleCloud(
        `cart-${mediaId}.png`,
        `./images/cart-${mediaId}.png`,
        bucketName
      );

      process.on("uncaughtException", (e) => {
        console.log("uncaughtException:", e);
      });
    } catch (e) {
      process.on("uncaughtException", (e) => {
        console.log("uncaughtException:", e);
      });

      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
