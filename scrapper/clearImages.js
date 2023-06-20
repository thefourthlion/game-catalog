require("dotenv").config();
const axios = require("axios");

const { games } = require("./gameLists/gameBoy");

const starting = 0;
const ending = games.length;

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`🔢 GAME - ${games[num]}`);

    await axios
      .post(
        `https://api.games.everettdeleon.com/api/games/update/game/all/${games[num]}`,
        {
          oldBoxImg: "placeholder",
          oldScreenImg: "placeholder",
          oldCartImg: "placeholder",
          releaseDate: "placeholder",
          gameDbId: "placeholder",
        }
      )
      .then(() => {
        console.log(`✅ CHANGED DB  `);
      })
      .catch((error) => {
        console.log("🛑 COULDN'T CHANGE DB");
      });
  }
};

generate();