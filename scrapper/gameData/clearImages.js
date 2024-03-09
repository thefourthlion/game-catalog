require("dotenv").config();
const axios = require("axios");

const { games } = require("../gameLists/consoles/virtualBoy");

const starting = 0;
const ending = games.length;

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`🔢 GAME - ${games[num]}`);

    await axios
      .post(
        `http://localhost:3017/api/games/update/game/all/${games[num]}`,
        {
          oldBoxImg: "placeholder",
          oldScreenImg: "placeholder",
          oldCartImg: "placeholder",
          screenImg: "placeholder",
          boxImg: "placeholder",
          cartImg: "placeholder",
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
