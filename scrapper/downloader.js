const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const fsExtra = require("fs-extra");
const { Storage } = require("@google-cloud/storage");

<<<<<<< HEAD
const { games } = require("./curratedGamesList/playstation2");

const start = 0;
const end = games.length - 1;
const currentGameConsole = "PlayStation 2";
const delayTime = 60000;
=======
const { games } = require("./gameLists/nintendoDs");

const start = 0;
const end = games.length - 1;
const currentGameConsole = "Nintendo DS";
const delayTime = 0;
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794
let retryCount = 0;
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

  console.log("Starting ✅");
  for (let num = start; num <= end; num++) {
    try {
      // await delay(delayTime);
      await page.setDefaultNavigationTimeout(0);

      // Navigate to the vault page for the current id

      console.log(`GAME #${games[num]}`);
      await page.goto(`https://vimm.net/vault/${games[num]}`, {
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
          "#main > div.innerMain > div > div.mainContent > h2 > span.sectionTitle"
        ).innerText;
        return console;
      });

      const gameTitle = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > div.mainContent > h2 > span:nth-child(3)"
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
          getConsole == currentGameConsole &&
          fs.existsSync(currentFile) == false &&
          fs.existsSync(newCurrentFile) == false
        ) {
          console.log(`🕎🕎🕎`);
          let current_num = num;

          if (current_num == num) {
            retryCount++;
            console.log(`Retrying...${retryCount}`);
<<<<<<< HEAD
            if (retryCount > 10) {
=======
            if (retryCount > 4) {
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794
              num = num + 1;
              console.log(`MOVING ON 👌...${retryCount}`);
              // delay(1000);
            }
          }

<<<<<<< HEAD
          if (retryCount == 10) {
=======
          if (retryCount == 5) {
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794
            retryCount = 0;
          }
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

<<<<<<< HEAD
          await delay(delayTime);
=======
          await delay(3000);
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794

          const files = fs.readdirSync(`${downloadDir}`);

          const breakUpFile = files[0].split(".");
          if (breakUpFile[breakUpFile.length - 1] == "zip") {
            newCurrentFile = `${__dirname}\\downloads\\${gameTitle}\\${files[0]}`;
          }
        } else {
          console.log(`🔎🔎🔎`);
          retryCount = 0;
          // If the game is already downloaded
          // Check game folder for files
          const files = fs.readdirSync(`${downloadDir}`);

          // Check what filetype it is to rename correctly
          let fileType = files[0].split(".")[1];

          const originalFilePath = `${downloadDir}${files[0]}`;
          if (fileType == "zip") {
            console.log("Zip file");
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
        getConsole == currentGameConsole
      ) {
        // if the game exists, log it
        let exists = "✅";

        console.log(`Is ${currentFile} downloaded? ${exists}`);

        // // upload it to google server if its downloaded
        // await uploadFileToGoogleCloud(
        //   `${getConsole}/${gameTitle}/${gameTitle}.zip`,
        //   `${downloadDir}/${gameTitle}.zip`,
        //   bucketName
        // ).then(() => {
        //   // upload it to google server if its downloaded

        //   let googleGCSUrl = `https://storage.googleapis.com/game-catalog-roms/${getConsole}/${gameTitle}.zip`;

<<<<<<< HEAD
        //   // post the google link to db
        //   axios
        //     .post(
        //       `https://www.api.games.everettdeleon.com/api/games/update/game/${games[num]}`,
        //       {
        //         downloadLink: googleGCSUrl,
        //       }
        //     )
        //     .then(() => {
        //       console.log("✅ CHANGED DESCRIPTION");
        //     })
        //     .catch((error) => {
        //       console.log("🛑 COULDN'T CHANGE DESCRIPTION");
        //     });
=======
          // post the google link to db
          axios
            .post(`http://localhost:3017/api/games/update/game/${games[num]}`, {
              downloadLink: googleGCSUrl,
            })
            .then(() => {
              console.log("✅ CHANGED DESCRIPTION");
            })
            .catch((error) => {
              console.log("🛑 COULDN'T CHANGE DESCRIPTION");
            });
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794

          // Delete game once it is uploaded to google storage
          // fs.unlink(`./downloads/${gameTitle}/${gameTitle}.zip`, (err) => {
          //   if (err) throw err;
          //   console.log("File deleted!");
          // });

          // fsExtra.remove(`./downloads/${gameTitle}/`, (err) => {
          //   console.log("Folder deleted successfully");
          // });
          // fs.unlink(`./downloads/${gameTitle}/`, (err) => {
          //   if (err) throw err;
          //   console.log("Folder deleted!");
          // });
          if(num == games.length - 2){
            console.log("🎉🎉�");
            num = 0;
          }
        // });
      }
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
