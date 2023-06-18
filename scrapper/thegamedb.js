require("dotenv").config();
const axios = require("axios");

const { games } = require("./gameLists/Nintendo");

const starting = 0;
const ending = games.length - 1;

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`🔢 GAME - ${games[num]}`);
    const gameTitle = await axios
      .get(`http://localhost:3017/api/games/read/game/${games[num]}`)
      .then((response) => {
        let data = response.data;
        data = data.title;
        return data;
      })
      .catch((error) => {
        console.log(error.type);
      });

    const gameConsole = await axios
      .get(`http://localhost:3017/api/games/read/game/${games[num]}`)
      .then((response) => {
        let data = response.data;
        data = data.console;
        return data;
      })
      .catch((error) => {
        console.log(error.type);
      });

    const gameDbId = await axios
      .get(
        `https://api.thegamesdb.net/v1/Games/ByGameName?apikey=${process.env.GAME_DB_API_KEY}&name=${gameTitle}&platform=${gameConsole}&include=screenshot`
      )
      .then((response) => {
        let data = response.data;
        console.log(`${data.remaining_monthly_allowance} games DB calls left.`);
        data = data.data;
        data = data.games[0];
        let id = data.id;
        let releaseDate = data.release_date;
        return {
          id: id,
          releaseDate: releaseDate,
        };
      })
      .catch((error) => {
        console.log(error.type);
      });

    if (gameDbId != undefined) {
      console.log(gameTitle);
      console.log(gameConsole);

      let boxArtLink = `https://cdn.thegamesdb.net/images/original/boxart/front/${gameDbId.id}-1.jpg`;
      console.log(boxArtLink);

      let titleScreenLink = `https://cdn.thegamesdb.net/images/original/titlescreen/${gameDbId.id}-1.jpg`;
      console.log(titleScreenLink);

      let fanArtLink = `https://cdn.thegamesdb.net/images/original/fanart/${gameDbId.id}-1.jpg`;
      console.log(fanArtLink);

      let screenshotLink = `https://cdn.thegamesdb.net/images/original/screenshot/${gameDbId.id}-1.jpg`;
      console.log(screenshotLink);

      let clearLogoLink = `https://cdn.thegamesdb.net/images/original/clearlogo/${gameDbId.id}-1.png`;
      console.log(clearLogoLink);

      await axios
        .post(`http://localhost:3017/api/games/update/game/all/${games[num]}`, {
          oldBoxImg: boxArtLink,
          oldScreenImg: titleScreenLink,
          oldCartImg: screenshotLink,
          releaseDate: gameDbId.releaseDate,
          gameDbId: gameDbId.id,
        })
        .then(() => {
          console.log(`✅ CHANGED DB  `);
        })
        .catch((error) => {
          console.log("🛑 COULDN'T CHANGE DB");
        });
    }
  }
};

generate();
