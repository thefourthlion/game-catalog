// Import necessary modules
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { games } = require("./gameLists/updated_consoles/playstationportable");
const { spawn } = require("child_process");

// Function to restart the application
function restartApp() {
  console.log("Restarting the application...");
  const app = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });
  app.unref();
  process.exit();
}

// Set starting and ending points for processing games
const start = 0;
const end = games.length;
const currentGameConsole = "PlayStation Portable";
const delayTime = 15000; // 15 seconds delay
let retryCount = 0;
let minute = delayTime * 20; // Calculate total delay time in minutes
let retryTimes = minute * 1;
let newCurrentFile = false; // To track if a new file is created during the process
let errorCount = 0;
let maxErrorCount = 3; // Maximum allowed errors before skipping a game
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Utility to create delays

// Main function to download games
const downloadGames = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Starting ✅");
  for (let num = start; num <= end; num++) {
    try {
      // Restart the app when you get to the end of the collection
      if (num == end - 1) {
        restartApp();
      }
      await page.setDefaultNavigationTimeout(0);

      // Navigate to the vault page for the current id
      console.log(`GAME #${games[num]}`);
      await page.goto(`https://vimm.net/vault/${games[num]}`, {
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

      // Extract the console name from the page
      const getConsole = await page.evaluate(() => {
        const console = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div.sectionTitle"
        ).innerText;
        return console;
      });

      // Format and extract the game title
      const gameTitle = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div:nth-child(2)"
        ).innerText;
        title = title.replace(/[,:\s]+/g, "-");
        title = `${title}`;
        return title;
      });

      const title = await page.evaluate(() => {
        let title = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div:nth-child(2)"
        ).innerText;
        return title;
      });

      console.log(`Title:${title}`);
      console.log(`Edited Title: ${gameTitle}`);

      // Path setup for downloads
      const downloadDir = `./downloads/${gameTitle}/`;

      console.log(`Download Dir: ${downloadDir}${gameTitle}.7z`);
      console.log(`Download Dir: ${downloadDir}${title}.7z`);

      let currentFile = path.join(
        __dirname,
        `${downloadDir}` + `${gameTitle}.7z`
      );

      let fileWithoutDash = path.join(
        __dirname,
        `${downloadDir}` + `${title}.7z`
      );

      console.log(
        `-------------------- #${num} - ${getConsole} ${
          parseInt(games.length) - parseInt(num)
        } -------------------------`
      );

      // if the download is possible, the console matches, and the game doesn't exist
      // Check if the current game's download button is active and labeled "Download"
      if (isDownloadable == "Download") {
        // Ensure the console matches the desired type and the file does not already exist
        if (
          getConsole == currentGameConsole &&
          !fs.existsSync(currentFile) &&
          !fs.existsSync(newCurrentFile)
        ) {
          console.log(`🕎🕎🕎`);
          let current_num = num;

          // Increment retry count if still on the same game
          if (current_num == num) {
            retryCount++;
            console.log(`Retrying...${retryCount}`);
            // Move to the next game if retry limit is reached
            if (retryCount == retryTimes) {
              num = num + 1;
              console.log(`MOVING ON 👌...${retryCount}`);
            }
          }

          // Reset retry count if maximum retries have been reached
          if (retryCount == retryTimes) {
            retryCount = 0;
          }

          // Establish a Chrome DevTools Protocol session with the browser page
          const client = await page.target().createCDPSession();

          // Set the behavior to allow downloads without user intervention and specify the download path
          await client.send("Page.setDownloadBehavior", {
            behavior: "allow",
            downloadPath: path.resolve(__dirname, `${downloadDir}`),
          });

          // Perform the click on the download button and log downloading status
          await Promise.all([
            page.click("#download_form > button"),
            console.log("Downloading..."),
            // If the game isn't downloaded yet, decrement to retry
            (num = num - 1),
          ]);

          try {
            // Wait for a specified delay to ensure download completes
            await delay(delayTime);

            // Rename downloaded files to remove any country labels (specific parsing logic)
            function rename7zFiles(directory) {
              fs.readdir(directory, { withFileTypes: true }, (err, entries) => {
                if (err) {
                  console.error("Failed to read directory:", err);
                  return;
                }

                entries.forEach((entry) => {
                  const fullPath = path.join(directory, entry.name);
                  if (entry.isDirectory()) {
                    // Recursively handle subdirectories
                    rename7zFiles(fullPath);
                  } else if (path.extname(entry.name) === ".7z") {
                    // Process only .7z files
                    const newFilename = entry.name.replace(/\s*\([^)]+\)/g, "");
                    if (newFilename !== entry.name) {
                      // Check if renaming is necessary
                      const newPath = path.join(directory, newFilename);

                      fs.rename(fullPath, newPath, (err) => {
                        if (err) {
                          console.error(`Failed to rename ${entry.name}:`, err);
                        } else {
                          console.log(
                            `${entry.name} has been renamed to ${newFilename}`
                          );
                        }
                      });
                    }
                  }
                });
              });
            }

            // Initiate the renaming process for downloaded files
            rename7zFiles("./downloads");

            const files = fs.readdirSync(`${downloadDir}`);
            const breakUpFile = files[0].split(".");

            // Set a new current file if it has the expected .7z extension
            if (breakUpFile[breakUpFile.length - 1] == "7z") {
              newCurrentFile = `${__dirname}\\downloads\\${gameTitle}\\${files[0]}`;
            }

            console.log(fileWithoutDash);
            console.log(fs.existsSync(fileWithoutDash));

            // Check and log if the file exists in the directory
            if (fs.existsSync(fileWithoutDash)) {
              console.log(`👾🔎🥶 FILE EXISTS: ${num}`);
            }

            errorCount = 0; // Reset error count after successful operation
          } catch (e) {
            // Handle any errors during download or file handling
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
          // If the game is already downloaded, check the existing files to rename them
          const files = fs.readdirSync(`${downloadDir}`);
          let fileType = files[0].split(".")[1];

          const originalFilePath = `${downloadDir}${files[0]}`;
          if (fileType == "7z") {
            console.log("7z file");
            // Attempt to rename the file to a standardized name
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
      if (
        (fs.existsSync(currentFile) ||
          fs.existsSync(newCurrentFile) == false) &&
        getConsole == currentGameConsole
      ) {
        // if the game exists, log it
        let exists = "✅";
        console.log(`Is ${currentFile} downloaded? ${exists}`);

        // let localRomHostUrl = `https://bombroms.com/roms/${getConsole}/${gameTitle}/${gameTitle}.7z`;
        // axios
        //   .post(
        //     `http://localhost:3017/api/games/update/game/${games[num]}`,
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
      }
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
