const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const axios = require("axios");
const fs = require("fs");
const port = process.env.PORT || 3001;
const os = require("os");

// Google Cloud Storage
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "your-project-id",
  keyFilename: "/path/to/your/keyfile.json",
});

const bucketName = "your-bucket-name";

async function uploadImageToGCS(imagePath) {
  const bucket = storage.bucket(bucketName);
  const filename = imagePath.split("/").pop();
  const file = bucket.file(filename);

  const uploadResponse = await file.save(fs.createReadStream(imagePath), {
    metadata: {
      contentType: "image/jpeg",
    },
  });

  console.log(`Image uploaded to GCS: ${filename}`);
  return uploadResponse[0].name;
}

// const uploadedFilename = await uploadImageToGCS(imagePath);

// ------------------------------------------ list of apis -------------------------------
// https://api.mobygames.com/v1/games?title=Super Mario Bros.&release_date=1985&limit=1&offset=0&api_key=moby_L18Orzm9hqHPK5N2ebgXI9yemLm

// ------------------------------------------ game info --------------------------------
// games link - https://vimm.net/vault/1-88080

// console - #main > div.innerMain > div > div.mainContent > h2.mainContent > span.sectionTitle
// title - #main > div.innerMain > div > div.mainContent > h2.mainContent > span:nth-child(3)
// #main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(1)
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

let firstGame = 1;
let lastGame = 88080;
const missingGames = [];
const delayTime = 3000;

const date = new Date().toLocaleDateString("en-us", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function downloadImage(url, selector, path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const element = await page.$(selector);
  const imageURL = await element.screenshot({ path: path });
  await browser.close();
  return imageURL;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
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
        const data = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2.mainContent > span:nth-child(3)"
        ).innerText;
        return data;
      });

      // --------------------------------------------------- get game size -----------------------------
      const downloadSize = await page.evaluate(() => {
        const data = document.querySelector("#download_size").innerText;
        return data;
      });

      // --------------------------------------------------- get game console -----------------------------
      const gameConsole = await page.evaluate(() => {
        const data = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2.mainContent > span.sectionTitle"
        ).innerText;
        return data;
      });

      // --------------------------------------------------- get mediaId -----------------------------
      const mediaId = await page.evaluate(() => {
        const data = document.querySelector(
          "#download_form > input[type=hidden]:nth-child(1)"
        ).value;
        return data;
      });

      // --------------------------------------------------- get cheatCode code -----------------------------
      const cheatCode = await page.evaluate(() => {
        const listOfItems = [];
        const length = document.querySelectorAll(
          "#main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr"
        ).length;
        console.log(`Length: ${length}`);
        for (let i = 1; i < length + 1; i++) {
          const data = document.querySelector(
            `#main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr:nth-child(${i}) > td:nth-child(1)`
          ).innerText;
          listOfItems.push(data);
        }
        return listOfItems;
      });

      // --------------------------------------------------- get cheatCode description -----------------------------
      const cheatCodeDescription = await page.evaluate(() => {
        const listOfItems = [];
        const length = document.querySelectorAll(
          "#main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr"
        ).length;
        console.log(`Length: ${length}`);
        for (let i = 1; i < length + 1; i++) {
          const data = document.querySelector(
            `#main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr:nth-child(${i}) > td:nth-child(2)`
          ).innerText;
          listOfItems.push(data);
        }
        return listOfItems;
      });

      // // --------------------------------------------------- get game info titles -----------------------------
      // const gameInfoTitle = await page.evaluate(() => {
      //   const listOfItems = [];
      //   const length = document.querySelectorAll(
      //     "#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr"
      //   ).length;
      //   console.log(`Length: ${length}`);
      //   for (let i = 1; i < length; i++) {
      //     try {
      //       const data = document.querySelector(
      //         `#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
      //       ).innerHTML;
      //       if (data != '<hr style="margin:1px">') {
      //         listOfItems.push(data);
      //       }
      //     } catch (e) {}
      //   }
      //   return listOfItems;
      // });

      // // --------------------------------------------------- get game info descriptions -----------------------------
      // const gameInfoDescription = await page.evaluate(() => {
      //   const listOfItems = [];
      //   const length = document.querySelectorAll(
      //     "#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr"
      //   ).length;
      //   console.log(`Length: ${length}`);
      //   for (let i = 1; i < length; i++) {
      //     try {
      //       const data = document.querySelector(
      //         `#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(1) > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`
      //       ).innerText;
      //       if (data != '<hr style="margin:1px">') {
      //         listOfItems.push(data);
      //       }
      //     } catch (e) {}
      //   }
      //   return listOfItems;
      // });

      // --------------------------------------------------- get reviewName description -----------------------------
      // const reviewName = await page.evaluate(() => {
      //   const listOfItems = [];
      //   const length = document.querySelectorAll(
      //     "#reviewDiv > table:nth-child(1) > tbody"
      //   ).length;
      //   console.log(`Length: ${length}`);
      //   for (let i = 1; i < length + 1; i++) {
      //     const data = document.querySelector(
      //       `#main > div.innerMain > div > div.mainContent > table.mainContent.rounded.striped > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      //     ).innerText;
      //     listOfItems.push(data);
      //   }
      //   return length;
      // });

      const players = await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll(".rounded tr")).find(
          (row) => row.querySelector("td").textContent === "Players"
        );

        const data = row.querySelector("td:nth-child(3)").textContent.trim();

        return data;
      });

      const year = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Year"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const cartSize = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Cart size"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const publisher = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Publisher"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const graphicsReview = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Graphics"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const soundReview = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Sound"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const gameplayReview = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Gameplay"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const overallReview = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Overall"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const CRC = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "CRC"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const MD5 = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "MD5"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const SHA1 = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "SHA1"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const verified = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Verified"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const version = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Version"
          );

          const data = row
            .querySelector("td:nth-child(3)")
            .textContent.trim()
            .substring(0, 10);

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const serial = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Serial #"
          );

          const data = row.querySelector("td:nth-child(3)").textContent.trim();

          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const region = await page.evaluate(() => {
        try {
          const img = document.querySelector(
            "tbody tr:nth-child(1) td:nth-child(3) img"
          );
          let data = img.getAttribute("title");
          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const gameFileName = await page.evaluate(() => {
        try {
          const data = document.querySelector("span#data-good-title").innerText;
          return data;
        } catch (e) {
          return "Coming Soon";
        }
      });

      const reviewName = ["", ""];
      const reviewDate = ["", ""];
      const reviewDescription = ["", ""];

      await delay(delayTime);

      // --------------------------------------------------- get oldScreenImg link -----------------------------
      const oldScreenImg = `https://vimm.net/image.php?type=screen&id=${mediaId}`;
      const screenImg = `https://storage.googleapis.com/games-catalog/screen-${mediaId}.png`;

      downloadImage(
        `https://vimm.net/vault/${num}`,
        "#screenShot",
        `./images/screen-${mediaId}.png`
      )
        .then(() => {
          console.log("Image downloaded successfully");
        })
        .catch((err) => {
          console.error("Error downloading image", err);
        });

      // --------------------------------------------------- get boxImg link -----------------------------
      const oldBoxImg = `https://vimm.net/image.php?type=box&id=${mediaId}`;
      const boxImg = `https://storage.googleapis.com/games-catalog/box-${mediaId}.png`;

      downloadImage(
        `https://vimm.net/vault/${num}`,
        "#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(2) > table > tbody > tr > td > a > img",
        `./images/box-${mediaId}.png`
      )
        .then(() => {
          console.log("Image downloaded successfully");
        })
        .catch((err) => {
          console.error("Error downloading image", err);
        });

      // --------------------------------------------------- get oldCartImg link -----------------------------
      const oldCartImg = `https://vimm.net/image.php?type=cart&id=${mediaId}`;
      const cartImg = `https://storage.googleapis.com/games-catalog/cart-${mediaId}.png`;

      downloadImage(
        `https://vimm.net/vault/${num}`,
        "#productimagethumb",
        `./images/cart-${mediaId}.png`
      )
        .then(() => {
          console.log("Image downloaded successfully");
        })
        .catch((err) => {
          console.error("Error downloading image", err);
        });

      await delay(delayTime);

      // --------------------------------------------------- get downloadLink -----------------------------
      const oldDownloadLink = `https://download3.vimm.net/download/?mediaId=${mediaId}`;
      const downloadLink = "download-link";

      // get info ready for db
      let games = {
        gameId: num,
        mediaId: mediaId,
        title: title,
        console: gameConsole,
        downloadSize: downloadSize,
        screenImg: screenImg,
        boxImg: boxImg,
        cartImg: cartImg,
        oldScreenImg: oldScreenImg,
        oldBoxImg: oldBoxImg,
        oldCartImg: oldCartImg,
        cheatCode: cheatCode,
        cheatCodeDescription: cheatCodeDescription,
        reviewName: reviewName,
        reviewDate: reviewDate,
        reviewDescription: reviewDescription,
        gameFileName: gameFileName,
        region: region,
        serial: serial,
        version: version,
        verified: verified,
        SHA1: SHA1,
        MD5: MD5,
        CRC: CRC,
        overallReview: overallReview,
        gameplayReview: gameplayReview,
        soundReview: soundReview,
        graphicsReview: graphicsReview,
        publisher: publisher,
        cartSize: cartSize,
        year: year,
        players: players,
        // gameInfoTitle: gameInfoTitle,
        // gameInfoDescription: gameInfoDescription,
        oldDownloadLink: oldDownloadLink,
        downloadLink: downloadLink,
        timestamp: date,
      };
      // 36 inputs
      // ---------------------------- print info on game being scrapped downloaded ----------------------
      console.log("---------------------------------------");
      console.log(`Game Title: ${title}`);
      // console.log(`Download Size : ${downloadSize}`);
      console.log(`Console: ${gameConsole}`);
      // console.log(`Media Id : ${mediaId}`);
      // console.log(`Screen Img: "${oldScreenImg}`);
      // console.log(`Box Img: "${oldBoxImg}`);
      // console.log(`Cart Img: "${oldCartImg}`);
      // console.log(`CheatCode : ${cheatCode}`);
      // console.log(`CheatCode Description: "${cheatCodeDescription}`);
      // console.log(`Game Info Description: "${gameInfoDescription}`);
      // console.log(`Game Info Titles: "${gameInfoTitle}`);
      // console.log(`Review names: ${reviewName}`);
      // console.log(`Review Dates: ${reviewDate}`);
      // console.log(`Review Description: ${reviewDescription}`);
      console.log(`Games Left : ${lastGame - num}  |  GAME#${num}`);

      // await axios({
      //   method: "POST",
      //   url: `http://localhost:3002/api/games/create`,
      //   data: games,
      //   timeout: 7000,
      // })
      //   .then(() => {
      //     console.log("Successfully wrote data to db ✅");
      //   })
      //   .catch((error) => {
      //     console.error({ "Failed writing to db 🛑": error });
      //   });
    } catch (e) {
      const missingGame = `Missing game #${num}`;
      missingGames.push(missingGame);

      if (missingGames.length > 0) {
        console.log("Creating file with missing games...");
        fs.writeFile(
          `./missing-games${date}.txt`,
          JSON.stringify(missingGames),
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Missing games file created successfully.");
            }
          }
        );
      }
      // --------------------------------------------------- if a file wont download move to next -----------------------------
      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
