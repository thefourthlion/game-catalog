const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const fsExtra = require("fs-extra");
const { Storage } = require("@google-cloud/storage");

const { games } = require("./gameLists/updated_consoles/playstationportable");
const { spawn } = require("child_process");

function restartApp() {
  console.log("Restarting the application...");

  const app = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });

  app.unref();
  process.exit();
}

const start = 1;
const end = games.length;
console.log(`🔑🔑🔑 ${end}`)
// console doesnt matter right now
const currentGameConsole = "PlayStation Portable";
const delayTime = 15000;
let retryCount = 0;
let retryTimes = 5;
// let count = 0;
let newCurrentFile = false;
let errorCount = 0;
let maxErrorCount = 3;
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
  // for linux
  // const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote'] });
  const page = await browser.newPage();

  console.log("Starting ✅");
  for (let num = start; num <= end; num++) {
    try {
      // Call the restartApp function whenever you want to restart your application
      if (num == end - 1) {
        num = 0
      }

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
          "#dl_form > button:nth-child(3)"
        ).innerText;
        if (download != false) {
          return download;
        } else {
          return false;
        }
      });

      const getConsole = await page.evaluate(() => {
        const console = document.querySelector(
          ".sectionTitle"
        ).innerText;
        return console;
      });

      let gameTitle = await page.evaluate(() => {
        let title = document.querySelector("#canvas").getAttribute("data-v");
        // Decode Base64 string to buffer
        return title;
      });

      const buffer = Buffer.from(gameTitle, 'base64');

        // Convert buffer to text
        gameTitle = buffer.toString('utf8');

        // let gameTitle = document.querySelector(
        //   ".sectionTitle"
        // ).innerText;
        gameTitle = gameTitle.replace(/[,:\s]+/g, "-");
        gameTitle = `${gameTitle}`;

      const downloadDir = `./downloads/${gameTitle}/`;

      let currentZipFile = path.join(
        __dirname,
        `${downloadDir}` + `${gameTitle}.zip`
      );

      let current7zFile = path.join(
        __dirname,
        `${downloadDir}` + `${gameTitle}.7z`
      );

      console.log(
        `-------------------- #${num} / ${end} - ${getConsole} ${parseInt(games.length) - parseInt(num)
        } -------------------------`
      );

      let gameExists = false;

      const gameSizeInMB = await page.evaluate(() => {
        let size = document.querySelector("#dl_size").innerText;
        if (size.includes("KB")) {
          size = size.replace(/KB/g, "");
          size = parseFloat(size);
          size = size / 1000;
          return size;
        }

        if (size.includes("MB")) {
          size = size.replace(/MB/g, "");
          size = parseFloat(size);
          return size;
        }

        if (size.includes("GB")) {
          size = size.replace(/GB/g, "");
          size = parseFloat(size);
          size = size * 1000;
          return size;
        }
      });

      const downloadSpeedInMBPS = 3;
      let gamesDownloadTimeInSec =
        parseFloat(gameSizeInMB) / parseFloat(downloadSpeedInMBPS);

      if (isDownloadable == "Download") {
        if (
          getConsole == currentGameConsole &&
          (fs.existsSync(currentZipFile) == false && fs.existsSync(current7zFile) == false) &&
          fs.existsSync(newCurrentFile) == false
        ) {
          console.log(`🕎🕎🕎`);
          let current_num = num;

          // while (!gameExists) {
          if (current_num == num) {
            retryCount++;
            console.log(`Retrying...${retryCount}`);
            if (retryCount == retryTimes) {
              num++;
              console.log(`MOVING ON 👌...${retryCount}`);
              // await delay(delayTime);
            }
          }

          if (retryCount == retryTimes) {
            retryCount = 0;
          }

          const client = await page.target().createCDPSession();

          await client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: path.resolve(__dirname, `${downloadDir}`),
          });

          await Promise.all([
            await page.click("#dl_form > button:nth-child(3)"),
            console.log("Downloading..."),
            (num = num - 1),
          ]);

          await Promise.all([
            await page.click("#dl_form > button:nth-child(3)"),
            console.log("Downloading..."),            
          ]);

          console.log(`⏳⌛⌛ Waiting ${gamesDownloadTimeInSec} seconds for download...`)

          try {
            if (retryCount > 1) {
              await delay(gamesDownloadTimeInSec);
            } else {
              await delay(delayTime);
            }
            // }

            const files = fs.readdirSync(`${downloadDir}`);

            const breakUpFile = files[0].split(".");

            if (
              breakUpFile[breakUpFile.length - 1] == "zip" ||
              breakUpFile[breakUpFile.length - 1] == "7z"
            ) {
              newCurrentFile = `${__dirname}\\downloads\\${gameTitle}\\${files[0]}`;
            }

            errorCount = 0;
          } catch (e) {
            console.log("🌋 Error finding file: " + downloadDir);
            console.log("ERROR Count: " + errorCount);
            errorCount++;
            if (errorCount == maxErrorCount) {
              num++;
            }
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
            // Rename the downloaded file to game name
            const newFilePath = `${downloadDir}/${gameTitle}.zip`;
            try {
              fs.renameSync(originalFilePath, newFilePath);
            } catch (e) {
              console.log("wait...");
            }
          } else {
            const newFilePath = `${downloadDir}/${gameTitle}.zip`;
            try {
              fs.renameSync(originalFilePath, newFilePath);
            } catch (e) {
              console.log("wait...");
            }
          }

          if (fileType == "7z") {
            // Rename the downloaded file to game name
            const newFilePath = `${downloadDir}/${gameTitle}.7z`;
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
      if (fs.existsSync(currentZipFile) || fs.existsSync(current7zFile)) {
        if (
          fs.existsSync(newCurrentFile) == false
          && getConsole == currentGameConsole
        ) {
          // if the game exists, log it
          let exists = "✅";
          let localRomHostUrl = `https://bombroms.com/roms/${getConsole}/${gameTitle}/${gameTitle}.zip`;

          console.log(
            `Is ${currentZipFile || current7zFile} downloaded? ${exists}`
          );
          axios
            .post(
              `http://localhost:3017/api/games/update/game/${games[num]}`,
              {
                downloadLink: localRomHostUrl,
              }
            )
            .then(() => {
              console.log("✅ CHANGED DOWNLOAD LINK");
            })
            .catch((error) => {
              console.log("🛑 COULDN'T CHANGE DOWNLOAD LINK");
            });

          // upload it to google server if its downloaded
          // await uploadFileToGoogleCloud(
          //   `${getConsole}/${gameTitle}/${gameTitle}.zip`,
          //   `${downloadDir}/${gameTitle}.zip`,
          //   bucketName
          // ).then(() => {
          //   // upload it to google server if its downloaded

          //   let googleGCSUrl = `https://storage.googleapis.com/game-catalog-roms/${getConsole}/${gameTitle}.zip`;

          // post the google link to db

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
          // });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
