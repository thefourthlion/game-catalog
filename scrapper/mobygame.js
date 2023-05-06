const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const axios = require("axios");

let firstGame = 7590;
let lastGame = 88096;
const delayTime = 1000;

async function iterateSlowly() {
  for (let num = firstGame; num <= lastGame; num++) {
    await new Promise((resolve) => setTimeout(resolve, delayTime)); // wait for 1 second
    try {
      const title = await axios
        .get(`http://localhost:3006/api/games/read/game/${num}`)
        .then((response) => {
          const data = response.data;
          let title = data.title;
          return title;
        })
        .catch((error) => {
          console.log(error);
        });

      const year = await axios
        .get(`http://localhost:3006/api/games/read/game/${num}`)
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
          `https://api.mobygames.com/v1/games?title=${title}&release_date=${year}&limit=5&offset=0&api_key=moby_BrC6i2Ixtl0JFBxIGeqfiBiHpdL`
        )
        .then((response) => {
          const data = response.data;
          const games = data.games[0];
          let thumbnail_image = games.thumbnail_image;
          return thumbnail_image;
        })
        .catch((error) => {
          console.log(error.type);
        });

      console.log(gameInfo);
      if (gameInfo[0] == undefined) {
        console.log("⛔ DESCRIPTION");
      } else {
        console.log(gameInfo);
        await axios
          .post(`http://localhost:3006/api/games/update/game/${num}`, {
            oldCartImg: gameInfo,
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
