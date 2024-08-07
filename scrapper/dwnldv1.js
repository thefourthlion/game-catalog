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

const start = 0;
const end = games.length;
const currentGameConsole = "PlayStation Portable";
const delayTime = 15000;
let retryCount = 0;
let minute = delayTime * 20;
let retryTimes = minute * 1;
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
        restartApp();
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
          "#main > div.innerMain > div > main > h2 > div.sectionTitle"
        ).innerText;
        return console;
      });

      const gameTitle = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div:nth-child(2)"
        ).innerText;
        title = title.replace(/[,:\s]+/g, "-");
        title = `${title}`;
        return title;
      });

      console.log(`🤬🤬${gameTitle}`)

      const title = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div:nth-child(2)"
        ).innerText;
        return title;
      });

      console.log(`🤬🤬${title}`)

      const downloadDir = `./downloads/${gameTitle}/`;

      let currentFile = path.join(
        __dirname,
        `${downloadDir}` + `${gameTitle}.zip`
      );

      let fileWithoutDash = path.join(
        __dirname,
        `${downloadDir}` + `${title}.zip`
      );

      console.log(
        `-------------------- #${num} - ${getConsole} ${parseInt(games.length) - parseInt(num)} -------------------------`
      );

      let gameExists = false;

      if (isDownloadable == "Download") {
        if (
          getConsole == currentGameConsole &&
          fs.existsSync(currentFile) == false &&
          fs.existsSync(newCurrentFile) == false
        ) {
          console.log(`🕎🕎🕎`);
          let current_num = num;

          // while (!gameExists) {
          if (current_num == num) {
            retryCount++;
            console.log(`Retrying...${retryCount}`);
            if (retryCount == retryTimes) {
              num = num + 1;
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
            await page.click("#download_form > button"),
            console.log("Downloading..."),
            // If the game isn't downloaded yet, don't move forward
            (num = num - 1),
          ]);

          try {
            await delay(delayTime);
            // }

            const files = fs.readdirSync(`${downloadDir}`);

            const breakUpFile = files[0].split(".");

            if (breakUpFile[breakUpFile.length - 1] == "zip") {
              newCurrentFile = `${__dirname}\\downloads\\${gameTitle}\\${files[0]}`;
            }

            console.log(fileWithoutDash);
            console.log(fs.existsSync(fileWithoutDash));

            if (fs.existsSync(fileWithoutDash) != false) {
              console.log(`👾🔎🥶 FILE EXISTS: ${num}`);
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
            console.log("zip file");
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
        let localRomHostUrl = `https://bombroms.com/roms/${getConsole}/${gameTitle}/${gameTitle}.zip`;

        console.log(`Is ${currentFile} downloaded? ${exists}`);
        // axios
        //   .post(
        //     `http://localhost:4010/api/games/update/game/${games[num]}`,
        //     {
        //       downloadLink: localRomHostUrl,
        //     }
        //   )
        //   .then(() => {
        //     console.log("✅ CHANGED DESCRIPTION");
        //   })
        //   .catch((error) => {
        //     console.log("🛑 COULDN'T CHANGE DESCRIPTION");
        //   });
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
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
