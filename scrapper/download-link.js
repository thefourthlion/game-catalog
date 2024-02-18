const puppeteer = require("puppeteer");
const axios = require("axios");

const { games } = require("./gameLists/gameBoy");

const start = 2000;
const end = games.length - 1;
const delayTime = 500;

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const downloadGames = async () => {
  console.log("Starting ✅");
  for (let num = start; num <= end; num++) {
    // await delay(delayTime)
    try {
      console.log(`🔢 GAME - ${games[num]}`);
      console.log(`⚛️ GAME - ${num}`);
      const gameDataResponse = await axios.get(
        `http://192.168.0.66:3017/api/games/read/game/${games[num]}`
      );
      const gameData = gameDataResponse.data;

      const gameDownloadLinkTitle = gameData.title.replace(/[,:\s]+/g, "-");

      const localRomHostUrl = `/roms/${gameData.console}/${gameDownloadLinkTitle}/${gameDownloadLinkTitle}.zip`;
      const oldDownloadLink = gameData.downloadSize;

      if (oldDownloadLink != "0 KB") {
        axios
          .post(
            `http://192.168.0.66:3017/api/games/update/game/${games[num]}`,
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
      } else {
        console.log("🛑🛑🛑 DON'T HAVE DOWNLOAD LINK");
      }
    } catch (e) {
      console.error(e);
    }
  }
};

downloadGames();
