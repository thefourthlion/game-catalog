const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const axios = require("axios");

const { games } = require("./gameLists/playstationPortable");

const start = 0;
const end = games.length - 1;
const delayTime = 1000;

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function iterateSlowly() {
  for (let num = start; num <= end; num++) {
    try {
      await delay(delayTime);
      console.log(`🔢 GAME - ${games[num]}`);
      console.log(`⚛️ GAME - ${num}`);
      const title = await axios
        .get(
          `http://192.168.0.66:3017/api/games/read/game/${games[num]}`
        )
        .then((response) => {
          const data = response.data;
          let title = data.title;
          return title;
        })
        .catch((error) => {
          console.log(error);
        });

      const year = await axios
        .get(
          `http://192.168.0.66:3017/api/games/read/game/${games[num]}`
        )
        .then((response) => {
          const data = response.data;
          let year = data.year;
          return year;
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(`----------------- ${year} - ${title} ----------------`);
      console.log(
        `https://api.mobygames.com/v1/games?platform=10&title=${title}&release_date=${year}&limit=5&offset=0&api_key=moby_BrC6i2Ixtl0JFBxIGeqfiBiHpdL `
      );

      const gameInfo = await axios
        .get(
          `https://api.mobygames.com/v1/games?platform=10&title=${title}&release_date=${year}&limit=5&offset=0&api_key=moby_BrC6i2Ixtl0JFBxIGeqfiBiHpdL `
        )
        .then((response) => {
          const data = response.data;
          const games = data.games[0];
          let sample_cover = games.sample_cover;
          let cover_image = sample_cover.image;
          console.log({ cover: cover_image });
          let sample_screenshots = games.sample_screenshots;
          let sample_image = sample_screenshots[0].image;
          console.log({ screenshot: sample_image });
          return cover_image;
        })
        .catch((error) => {
          console.log(error.type);
        });

      // console.log(gameInfo);

      if (gameInfo == undefined) {
        console.log("⛔ IMAGE");
      } else {
        console.log(gameInfo);
        // await axios
        //   .post(
        //     `http://192.168.0.66:3017/api/games/update/game/${games[num]}`,
        //     {
        //       oldCartImg: gameInfo,
        //     }
        //   )
        //   .then(() => {
        //     console.log("✅ CHANGED IMAGE");
        //   })
        //   .catch((error) => {
        //     console.log("🛑 COULDN'T CHANGE IMAGE");
        //   });
      }
    } catch (e) {
      process.on("uncaughtException", (e) => {
        console.log("uncaughtException:", e);
      });
      console.error(e);
    }
  }
}

iterateSlowly();
app.listen(port, () => console.log(`Listening on port ${port}`));
