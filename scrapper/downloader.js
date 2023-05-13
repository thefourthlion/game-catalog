const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const fsExtra = require("fs-extra");
const { Storage } = require("@google-cloud/storage");

const { games } = require("./gameLists/Nintendo");

const start = 1;
const end = 88065;
const delayTime = 1000;
// let count = 0;
let newCurrentFile = false;

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
      await delay(delayTime);
      await page.setDefaultNavigationTimeout(0);

      // Navigate to the vault page for the current id

      console.log(`GAME #${num}`);
      await page.goto(`https://vimm.net/vault/${num}`, {
        waitUntil: "domcontentloaded",
      });

      function getFileNameFromDir(dirPath) {
        const filenames = [];
        fs.readdirSync(dirPath).forEach((file) => {
          filenames.push(file);
        });
        return filenames;
      }

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

      const gameTitle = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2.mainContent > span:nth-child(3)"
        ).innerText;
        title = title.replace(/[,:\s]+/g, "-");
        title = `${title}`;
        return title;
      });

      const downloadDir = `./downloads/${gameTitle}/`;

      let currentFile = path.join(
        __dirname,
        `${downloadDir}` + `${gameTitle}.zip`
      );

      console.log(
        `-------------------- #${num} - ${getConsole} -------------------------`
      );

      if (isDownloadable == "Download") {
        if (
          getConsole == "Nintendo" &&
          fs.existsSync(currentFile) == false &&
          fs.existsSync(newCurrentFile) == false
        ) {
          console.log(`🕎🕎🕎`);
          // Download the game if it's not already downloaded
          const client = await page.target().createCDPSession();
          await client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: path.resolve(__dirname, `${downloadDir}`),
          });
          await Promise.all([
            await page.click("#download_form > button"),
            console.log("Downloading..."),
            // If the game isn't downloaded yet, don't move forward
            (num = num - 1),
          ]);

          await delay(1000);

          const files = fs.readdirSync(`${downloadDir}`);

          const breakUpFile = files[0].split(".");
          if (breakUpFile[breakUpFile.length - 1] == "zip") {
            newCurrentFile = `${__dirname}\\downloads\\${gameTitle}\\${files[0]}`;
          }
        } else {
          console.log(`🔎🔎🔎`);

          // If the game is already downloaded
          // Check game folder for files
          const files = fs.readdirSync(`${downloadDir}`);

          // Check what filetype it is to rename correctly
          let fileType = files[0].split(".")[1];

          const originalFilePath = `${downloadDir}${files[0]}`;
          if (fileType == "zip") {
            // Rename the downloaded file to game name
            const newFilePath = `${downloadDir}/${gameTitle}.zip`;
            try {
              fs.renameSync(originalFilePath, newFilePath);
            } catch (e) {
              console.log("wait...");
            }
          } else {
            const newFilePath = `${downloadDir}/${gameTitle}.7z`;
            try {
              fs.renameSync(originalFilePath, newFilePath);
            } catch (e) {
              console.log("wait...");
            }
          }
        }
      }

      // check if the game exists and we're working on the current console
      if (
        (fs.existsSync(currentFile) ||
          fs.existsSync(newCurrentFile) == false) &&
        getConsole == "Nintendo"
      ) {
        // if the game exists, log it
        let exists = "✅";

        console.log(`Is ${currentFile} downloaded? ${exists}`);

        // upload it to google server if its downloaded
        await uploadFileToGoogleCloud(
          `${getConsole}/${gameTitle}/${gameTitle}.zip`,
          `${downloadDir}/${gameTitle}.zip`,
          bucketName
        ).then(() => {
          // upload it to google server if its downloaded

          let googleGCSUrl = `https://storage.googleapis.com/game-catalog-roms/${getConsole}/${gameTitle}.zip`;

          // post the google link to db
          axios
            .post(
              `https://www.api.games.everettdeleon.com/api/games/update/game/${num}`,
              {
                downloadLink: googleGCSUrl,
              }
            )
            .then(() => {
              console.log("✅ CHANGED DESCRIPTION");
            })
            .catch((error) => {
              console.log("🛑 COULDN'T CHANGE DESCRIPTION");
            });

          // Delete game once it is uploaded to google storage
          // fs.unlink(`./downloads/${gameTitle}/${gameTitle}.zip`, (err) => {
          //   if (err) throw err;
          //   console.log("File deleted!");
          // });

          fsExtra.remove(`./downloads/${gameTitle}/`, (err) => {
            console.log("Folder deleted successfully");
          });
          // fs.unlink(`./downloads/${gameTitle}/`, (err) => {
          //   if (err) throw err;
          //   console.log("Folder deleted!");
          // });
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
