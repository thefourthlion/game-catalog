const axios = require("axios");
const fs = require("fs");

const starting = 1;
const ending = 88096;
let size = 0;

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    // ------------------------------- get data from db -------------------------------
    const res = await axios.get(
      `https://www.api.games.everettdeleon.com/api/games/read/game/${num}`
    );

    const data = res.data;

    if (data) {
      const gameSize = data.downloadSize;

      let gameSizeSplit = gameSize.split(" ");

      let gamesSize = parseFloat(gameSize.split(" ")[0]);

      if (gameSizeSplit[1] == "GB") {
        size = size + parseFloat(gamesSize);
      } else if (gameSizeSplit[1] == "MB") {
        size = size + parseFloat(gamesSize) / 1000;
      } else if (gameSizeSplit[1] == "KB") {
        size = size + (parseFloat(gamesSize) / 1000 )/ 1000;
      }

      console.log(
        `------------------------------ #${num} - ${size} GB - ${
          ending - num
        } ------------------------`
      );

      fs.writeFile("./size.txt", String(size), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
  }
};

generate();
