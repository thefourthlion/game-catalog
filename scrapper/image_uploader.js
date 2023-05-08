const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const axios = require("axios");

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

let firstGame = 1;
let lastGame = 88096;
(async () => {
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

  for (let num = firstGame; num <= lastGame; num++) {
    try {
      const id = await axios
        .get(
          `https://www.api.games.everettdeleon.com/api/games/read/game/${num}`
        )
        .then((response) => {
          const data = response.data;
          let mediaId = data.mediaId;
          return mediaId;
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(`========== ${num}`);

      // --------------------------------------------------- get ScreenImg  -----------------------------

      await uploadFileToGoogleCloud(
        `screen-${id}.png`,
        `./images/screen-${id}.png`,
        bucketName
      );

      // --------------------------------------------------- get boxImg -----------------------------

      await uploadFileToGoogleCloud(
        `box-${id}.png`,
        `./images/box-${id}.png`,
        bucketName
      );

      // --------------------------------------------------- get CartImg  -----------------------------

      await uploadFileToGoogleCloud(
        `cart-${id}.png`,
        `./images/cart-${id}.png`,
        bucketName
      );
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
