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

// const uploadedFilename = await uploadFileToGoogleCloud(imagePath);

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

let firstGame = 3484;
let lastGame = 92357;
const missingGames = [];
const delayTime = 0;

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
        const data = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div:nth-child(2)"
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
          "#main > div.innerMain > div > main > h2 > div.sectionTitle"
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

      const cheatCode = await page.evaluate(() => {
        const listOfItems = [];
        const rows = document.querySelectorAll(
          "#main > div.innerMain > div > main > table.mainContent.rounded.striped > tbody > tr"
        );

        rows.forEach(row => {
          const codeCellText = row.querySelector('td:nth-child(1)').innerText;
          // Check if the second cell contains the specific note text
          const descriptionCell = row.querySelector('td:nth-child(2)');
          if (descriptionCell && !descriptionCell.innerText.includes("Note: There are two versions given for some of the following Codes.")) {
            listOfItems.push(codeCellText);
          }
        });

        return listOfItems;
      });


      // --------------------------------------------------- get cheatCode description -----------------------------
      const cheatCodeDescription = await page.evaluate(() => {
        const listOfItems = [];
        const rows = document.querySelectorAll("#main > div.innerMain > div > main > table.mainContent.rounded.striped > tbody > tr");
        rows.forEach(row => {
          // Check if the row contains the note and skip it
          const isNoteRow = row.innerText.includes("Note: There are two versions given for some of the following Codes.");
          if (isNoteRow) {
            return; // Skip this iteration
          }

          const secondCell = row.querySelector("td:nth-child(2)");
          if (secondCell) { // Make sure the second cell exists before accessing its text
            listOfItems.push(secondCell.innerText);
          }
          // If the cell doesn't exist, this iteration is automatically skipped
        });
        return listOfItems;
      });



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

      const format = await page.evaluate(() => {
        try {
          const row = Array.from(document.querySelectorAll(".rounded tr")).find(
            (row) => row.querySelector("td").textContent === "Format"
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
          const data = document.querySelector("#data-good-title").innerText;
          if (gameFileName != "") {
            return data;
          } else {
            return "Coming Soon";
          }
        } catch (e) {
          return "Coming Soon";
        }
      });

      // ---------------------------- print info on game being scrapped downloaded ----------------------
      console.log("---------------------------------------");
      console.log(`Game Title: ${title}`);
      // console.log(`Download Size : ${downloadSize}`);
      // console.log(`Console: ${gameConsole}`);
      // console.log(`Game File Name: ${gameFileName}`);
      // console.log(`Media Id : ${mediaId}`);
      // console.log(`Screen Img: "${oldScreenImg}`);
      // console.log(`Box Img: "${oldBoxImg}`);
      // console.log(`Cart Img: "${oldCartImg}`);
      // console.log(`CheatCode : ${cheatCode}`);
      // console.log(`CheatCode Description: "${cheatCodeDescription}`);
      // console.log(`Games Left : ${lastGame - num}  |  GAME#${num}`);

      const reviewName = ["placeholder", "placeholder"];
      const reviewDate = ["placeholder", "placeholder"];
      const reviewDescription = ["placeholder", "placeholder"];

      // await delay(delayTime);

      // --------------------------------------------------- get oldScreenImg link -----------------------------
      const oldScreenImg = `https://vimm.net/image.php?type=screen&id=${mediaId}`;
      const screenImg = `https://storage.googleapis.com/games-catalog/screen-${mediaId}.png`;

      // downloadImage(
      //   `https://vimm.net/vault/${num}`,
      //   "#screenShot",
      //   `./images/screen-${mediaId}.png`
      // )
      //   .then(() => {
      //     console.log("Image downloaded successfully");
      //   })
      //   .catch((err) => {
      //     console.error("Error downloading image", err);
      //   });

      // try {
      //   await uploadFileToGoogleCloud(
      //     `screen-${mediaId}.png`,
      //     `./images/screen-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading screen image");
      // }

      // --------------------------------------------------- get boxImg link -----------------------------
      const oldBoxImg = `https://vimm.net/image.php?type=box&id=${mediaId}`;
      const boxImg = `https://storage.googleapis.com/games-catalog/box-${mediaId}.png`;

      // downloadImage(
      //   `https://vimm.net/vault/${num}`,
      //   "#main > div.innerMain > div > div.mainContent > div.mainContent > div:nth-child(2) > table > tbody > tr > td > a > img",
      //   `./images/box-${mediaId}.png`
      // )
      //   .then(() => {
      //     console.log("Image downloaded successfully");
      //   })
      //   .catch((err) => {
      //     console.error("Error downloading image", err);
      //   });

      // try {
      //   await uploadFileToGoogleCloud(
      //     `box-${mediaId}.png`,
      //     `./images/box-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading box image");
      // }

      // --------------------------------------------------- get oldCartImg link -----------------------------
      const oldCartImg = `https://vimm.net/image.php?type=cart&id=${mediaId}`;
      const cartImg = `https://storage.googleapis.com/games-catalog/cart-${mediaId}.png`;

      // downloadImage(
      //   `https://vimm.net/vault/${num}`,
      //   "#productimagethumb",
      //   `./images/cart-${mediaId}.png`
      // )
      //   .then(() => {
      //     console.log("Image downloaded successfully");
      //   })
      //   .catch((err) => {
      //     console.error("Error downloading image", err);
      //   });

      // try {
      //   await uploadFileToGoogleCloud(
      //     `cart-${mediaId}.png`,
      //     `./images/cart-${mediaId}.png`,
      //     bucketName
      //   );
      // } catch (e) {
      //   console.log("Error uploading cart image");
      // }

      // await delay(delayTime);

      // --------------------------------------------------- get downloadLink -----------------------------
      const oldDownloadLink = `https://download3.vimm.net/download/?mediaId=${mediaId}`;
      const downloadLink = "download-link";
      const description = "placeholder";
      const rating = "placeholder";
      const gameDbId = "placeholder";
      const releaseDate = "placeholder";
      const developer = "placeholder";
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
        cheatCode: cheatCode, // []
        cheatCodeDescription: cheatCodeDescription, // []
        reviewName: reviewName, //[]
        rating: rating,
        gameDbId: gameDbId,
        releaseDate: releaseDate,
        developer: developer,
        reviewDate: reviewDate, //[]
        reviewDescription: reviewDescription, //[]
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
        format: format,
        cartSize: cartSize,
        year: year,
        players: players,
        oldDownloadLink: oldDownloadLink,
        downloadLink: downloadLink,
        description: description,
        timestamp: date,
      };

      console.log(games)
      // 37 inputs

      await axios({
        method: "POST",
        url: `http://localhost:3017/api/games/create`,
        data: games,
        timeout: 7000,
      })
        .then(() => {
          console.log("Successfully wrote data to db ✅");
        })
        .catch((error) => {
          console.error({ "Failed writing to db 🛑": error });
        });
    } catch (e) {
      const missingGame = `Missing game #${num}`;
      missingGames.push(missingGame);

      if (missingGames.length > 0) {
        console.log("Creating file with missing games...");
        fs.writeFile(
          `./missing-games/missing.txt`,
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
