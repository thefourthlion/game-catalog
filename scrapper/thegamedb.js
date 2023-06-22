require("dotenv").config();
const axios = require("axios");
const { games } = require("./gameLists/gameBoyColor");
const starting = 0;
const ending = games.length;

const platform = 41; // find gameDb platform num

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`🔢 GAME - ${games[num]}`);
    console.log(`🔢 GAME - ${num}`);
    const gameTitle = await axios
      .get(
        `https://api.games.everettdeleon.com/api/games/read/game/${games[num]}`
      )
      .then((response) => {
        let data = response.data;
        data = data.title;
        return data;
      })
      .catch((error) => {
        console.log(error.type);
      });

    const gameConsole = await axios
      .get(
        `https://api.games.everettdeleon.com/api/games/read/game/${games[num]}`
      )
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
        `https://api.thegamesdb.net/v1/Games/ByGameName?apikey=${process.env.GAME_DB_API_KEY}&name=${gameTitle}&include=screenshot`
      )
      .then((response) => {
        let data = response.data;
        console.log(`${data.remaining_monthly_allowance} games DB calls left.`);
        data = data.data;
        const games = data.games;

        const game = games.find((game) => {
          const gameTitleWords = new Set(gameTitle.toLowerCase().split(/\W+/));
          const gameNameWords = new Set(
            game.game_title.toLowerCase().split(/\W+/)
          );

          // Calculate Jaccard similarity coefficient
          const intersection = new Set(
            [...gameTitleWords].filter((word) => gameNameWords.has(word))
          );
          const union = new Set([...gameTitleWords, ...gameNameWords]);
          const similarity = intersection.size / union.size;

          return (
            game.platform === platform && similarity >= 0.5 // Adjust similarity threshold as needed
          );
        });

        if (game) {
          const { id, release_date: releaseDate } = game;
          return {
            id: id,
            releaseDate: releaseDate,
          };
        } else {
          console.log(`No game found on platform ${platform}`);
          return null;
        }
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
        .post(
          `https://api.games.everettdeleon.com/api/games/update/game/all/${games[num]}`,
          {
            oldBoxImg: boxArtLink,
            oldScreenImg: titleScreenLink,
            oldCartImg: screenshotLink,
            releaseDate: gameDbId.releaseDate,
            gameDbId: gameDbId.id,
          }
        )
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
