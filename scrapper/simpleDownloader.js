const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const fs = require("fs");

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 3002;
=======
const port = process.env.PORT || 3001;
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794

//ps1
// 7108, 7109, 7110, 7120, 7159, 7162, 7163, 7173, 7174, 7175, 7176, 7177, 7178,
// 7194, 7195, 7196, 7197, 7198, 7199, 7200, 7201, 7203, 7226, 7227, 7228, 7229,
// 7230, 7231,

<<<<<<< HEAD
//ps3

const gameNumbers = [
 7926, 7929, 7930, 7931, 7970, 7972, 7973, 7981, 7995,
  7996, 8000, 17038, 8030, 8031, 8033, 8085, 8128, 8129, 8138, 8139, 8209, 8295,
  8297, 8402, 8403, 8414, 8415, 8384, 8426, 74680, 8427, 8430, 8431, 8433, 8435,
  8436, 8445, 8470, 8476, 8477, 8478, 8479, 8480, 8481, 8483, 8508, 8510, 8511,
  8522, 8537, 8555, 74042, 8559, 8586, 8587, 9590, 8644, 8645, 8646, 8004, 8694,
  8710, 8711, 8722, 8735, 8736, 8739, 8745, 8746, 8747, 8748, 8676, 8758, 8759,
  8032, 8806, 8808, 71094, 8936, 8089, 8932, 8933, 8934, 9013, 9015, 9034, 9037,
  9070, 9074, 9084, 9085, 9088, 9086, 9087, 9099, 9100, 9101, 9109, 9117, 9244,
  9250, 9251, 9252, 9253, 9262, 9260, 9268, 9264, 9266, 9288, 9289, 9290, 9307,
  9326, 9323, 9324, 9345, 9346, 9362, 9361, 9456, 9454, 9457, 9583, 9584, 9585,
  9587, 9592, 9595, 9596, 9636, 9638, 9730, 9843, 9845, 9847,
=======
const gameNumbers = [
  24611, 24653, 24654, 24655, 24671, 24680, 24685, 24686, 24705, 24706, 25750,
  24730, 24727, 24758, 24760, 24761, 24764, 24765, 24815, 24819, 24820, 24821,
  24853, 24934, 24976, 24978, 24983, 25017, 25018, 25019, 25020, 25029, 25032,
  25128, 25137, 25232, 25233, 25234, 25246, 25248, 25255, 25267, 25268, 25201,
  25352, 25368, 25374, 25405, 25428, 25436, 25483, 25488, 25517, 25518, 25519,
  25528, 25617, 25621, 25646, 25659, 25657, 25660, 25691,
>>>>>>> 1408456e6c442e67160bdfe6614ca784f00c2794
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // ps1 5942-7250=1308games25
  // ps2 7823-9775=1952games
  // ps3 24605-25752=1147games
  // 24612 25735 6131
  for (let num = 0; num <= 195; num++) {
    await delay(1000);

    try {
      // --------------------------------------------------- find link and wait for load  -----------------------------
      await page.setDefaultNavigationTimeout(0);

      await page.goto(`https://vimm.net/vault/${gameNumbers[num]}`, {
        waitUntil: "domcontentloaded",
      });

      // --------------------------------------------------- get title  -----------------------------
      const getTitle = await page.evaluate(() => {
        const title = document.querySelector("#data-good-title").innerText;
        const fileName = title + ".7z";
        return fileName;
      });

      console.log("Currently downloading: " + getTitle);

      // --------------------------------------------------- see if download file is on page -----------------------------
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

      // --------------------------------------------------- see if file already exists -----------------------------
      const currentFile = path.join(__dirname, "./downloads/" + getTitle);
      console.log("Downloaded already? " + fs.existsSync(currentFile));

      // --------------------------------------------------- if a file is there, download it -----------------------------
      if (isDownloadable == "Download") {
        if (getTitle.includes("USA") || getTitle.includes("En")) {
          if (!fs.existsSync(currentFile)) {
            const client = await page.target().createCDPSession();
            await client.send("Page.setDownloadBehavior", {
              behavior: "allow",
              downloadPath: path.resolve(__dirname, "./downloads"),
            });
            await Promise.all([
              await page.click("#download_form > button"),
              console.log("🛑"),
              (num = num - 1),
            ]);
          } else {
          }
        }
      }
    } catch (e) {
      // --------------------------------------------------- if a file wont download move to next -----------------------------
      console.error(e);
    }
  }
})();

[];

app.listen(port, () => console.log(`Listening on port ${port}`));
