// Import necessary modules
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { games } = require("./gameLists/updated_consoles/playstationportable");
const { spawn } = require("child_process");

// Set starting and ending points for processing games
const start = 0;
const end = 3;
const timeToWaitAtEnd = 3;
const currentGameConsole = "PlayStation Portable";
const downloadTime = 1000;

// Function to have timeouts while running code
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

// Main function to download games
const downloadGames = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Starting ✅");

  while (true) {
    // Infinite loop to keep the script running
    for (let num = start; num <= end; num++) {
      // Navigate to the vault page for the current id
      await page.goto(`https://vimm.net/vault/${games[num]}`, {
        waitUntil: "domcontentloaded",
      });

      // Check if the download button is available for the game
      const isDownloadable = await page.evaluate(() => {
        const download = document.querySelector(
          "#download_form > button"
        ).innerText;
        return download != false ? download : false;
      });

      // Extract the console name from the page
      const gamesConsole = await page.evaluate(() => {
        const console = document.querySelector(
          "#main > div.innerMain > div > main > h2 > div.sectionTitle"
        ).innerText;
        return console;
      });

      // Format and extract the game title
      const gamesTitle = await page.evaluate(() => {
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

      const gameSizeInMB = await page.evaluate(() => {
        let size = document.querySelector("#download_size").innerText;
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

      // Rename downloaded files to remove any country labels (specific parsing logic)
      const rename7zFiles = (directory) => {
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
      };

      const downloadSpeedInMBPS = 3;
      let gamesDownloadTimeInSec =
        parseFloat(gameSizeInMB) / parseFloat(downloadSpeedInMBPS);

      // if download button is on screen
      if (isDownloadable == "Download") {
        if (gamesConsole == currentGameConsole) {
          console.log(
            `-------------------- #${num} - ${gamesConsole} ${
              parseInt(games.length) - parseInt(num)
            } -------------------------`
          );

          console.log("⏳ Starting Download Now...");
          console.log(`🕹️  Console: ${gamesConsole}`);
          console.log(`🟢 Edited Title: ${gamesTitle}`);

          // Path setup for downloads
          const downloadDir = `./downloads/${gamesTitle}/`;

          console.log(`Download Dir: ${downloadDir}${gamesTitle}.7z`);
          console.log(`Download Dir: ${downloadDir}${title}.7z`);

          let currentFile = path.join(
            __dirname,
            `${downloadDir}${gamesTitle}.7z`
          );
          let fileWithoutDash = path.join(
            __dirname,
            `${downloadDir}${title}.7z`
          );

          console.log(`Current File: ${currentFile}`);
          console.log(`File Without Dash: ${fileWithoutDash}`);

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
          ]);

          // Perform the click on the download button and log downloading status
          await Promise.all([
            page.click("#download_form > button"),
            console.log("Downloading..."),
            // If the game isn't downloaded yet, decrement to retry
          ]);

          console.log("📉 Downloading Game...");

          await wait(3);

          // Initiate the renaming process for downloaded files
          rename7zFiles("./downloads");

          const files = fs.readdirSync(`${downloadDir}`);

          console.log(`🌌🌌🌌🌌${files[0]}`);
        }
      }

      // When you get to the end, wait and then restart the loop
      if (num === end) {
        console.log(
          `Reached the end, restarting after ${timeToWaitAtEnd} seconds...`
        );
        await wait(timeToWaitAtEnd);
      }
    }
  }
};

downloadGames();
