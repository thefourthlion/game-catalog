const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const axios = require("axios");

let firstGame = 3;
let lastGame = 88085;
const delayTime = 10000;

async function iterateSlowly() {
  for (let num = firstGame; num <= lastGame; num++) {
    await new Promise((resolve) => setTimeout(resolve, delayTime)); // wait for 1 second
    try {
      const title = await axios
        .get(`http://localhost:3005/api/games/read/game/${num}`)
        .then((response) => {
          const data = response.data;
          let title = data.title;
          return title;
        })
        .catch((error) => {
          console.log(error);
        });

      const year = await axios
        .get(`http://localhost:3005/api/games/read/game/${num}`)
        .then((response) => {
          const data = response.data;
          let year = data.year;
          return year;
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(`----------------- ${year} - ${title} ----------------`);

      const gameInfo = await axios
        .get(
          `https://api.mobygames.com/v1/games?title=${title}&release_date=${year}&limit=5&offset=0&api_key=moby_L18Orzm9hqHPK5N2ebgXI9yemLm`
        )
        .then((response) => {
          const data = response.data;
          const games = data.games[0];
          let info = [];
          let description = games.description;
          info.push(description);
          let sample_cover = games.sample_cover;
          let thumbnail_image = sample_cover.thumbnail_image;
          info.push(thumbnail_image);
          return info;
        })
        .catch((error) => {
          console.log(error.type);
        });

      if (gameInfo[0] == undefined) {
        console.log("⛔ DESCRIPTION");
      } else {
        console.log(gameInfo);
        await axios
          .post(`http://localhost:3005/api/games/update/game/${num}`, {
            description: gameInfo[0],
            oldCartImg: gameInfo[1],
          })
          .then(() => {
            console.log("✅ CHANGED DESCRIPTION");
          })
          .catch((error) => {
            console.log("🛑 COULDN'T CHANGE DESCRIPTION");
          });
      }

      console.log(`========== ${num}`);
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
