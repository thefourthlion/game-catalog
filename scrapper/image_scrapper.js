const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "111387581544911691922",
  keyFilename: "./personal-site-377920-53ef05f0a38d.json",
});

const bucketName = "games-catalog";

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

let firstGame = 439;
let lastGame = 88085;
const delayTime = 1000;

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for (let num = firstGame; num <= lastGame; num++) {
    try {
      // delay(delayTime);
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
      try {
        const screenImg = await page.$("#screenShot");

        await screenImg.screenshot({
          path: `./images/screen-${mediaId}.png`,
        });

        console.log("downloaded screenshot ✅");
      } catch (e) {
        console.log("Error downloading screenshot 🚫");
      }
      // try {
      //   await uploadFileToGoogleCloud(
      //     `screen-${mediaId}.png`,
      //     `./images/screen-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading screen image");
      // }

      // --------------------------------------------------- get boxImg -----------------------------
      try {
        const boxImg = await page.$(
          "#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(2) > table > tbody > tr > td > a > img"
        );
        await boxImg.screenshot({
          path: `./images/box-${mediaId}.png`,
        });

        console.log("downloaded box ✅");
      } catch (e) {
        console.log("Error downloading box 🚫");
      }

      // try {
      //   await uploadFileToGoogleCloud(
      //     `box-${mediaId}.png`,
      //     `./images/box-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading box image");
      // }

      // --------------------------------------------------- get CartImg  -----------------------------
      try {
        const cartImg = await page.$("#productimagethumb");

        await cartImg.cartshot({
          path: `./images/cart-${mediaId}.png`,
        });
        console.log("downloaded cart ✅");
      } catch (e) {
        console.log("Error downloading cart 🚫");
      }

      // try {
      //   await uploadFileToGoogleCloud(
      //     `cart-${mediaId}.png`,
      //     `./images/cart-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading cart image");
      // }
    } catch (e) {
      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
