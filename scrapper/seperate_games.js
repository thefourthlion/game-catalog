const express = require("express");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const starting = 84200;
const ending = 88096;

const app = express();
const port = process.env.PORT || 3001;

const undefinedList = [];
const nintendo = [];
const masterSystem = [];
const genesis = [];
const superNintendo = [];
const saturn = [];
const playstation = [];
const nintendo64 = [];
const dreamcast = [];
const playstation2 = [];
const xbox = [];
const gameCube = [];
const xbox360 = [];
const playstation3 = [];
const wii = [];
const wiiWare = [];
const gamBoy = [];
const virtualBoy = [];
const gameBoyColor = [];
const gameBoyAdvanced = [];
const nintendoDs = [];
const playstationPortable = [];

const createLists = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`-------------------------- Searching #${num}`);
    // ------------------------------- get data from db -------------------------------
    const gameId = await axios
      .get(`https://api.games.everettdeleon.com/api/games/read/game/${num}`)
      .then((response) => {
        const data = response.data;

        let gameId = data.gameId;
        return gameId;
      })
      .catch((error) => {
        console.log(error);
      });

    const platform = await axios
      .get(`https://api.games.everettdeleon.com/api/games/read/game/${num}`)
      .then((response) => {
        const data = response.data;

        let platform = data.console;
        return platform;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(`gameId: ${gameId}`);
    console.log(`platform: ${platform}`);

    if (platform == "Virtual Boy") {
      virtualBoy.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/virtualBoy.js",
        virtualBoy.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
  }
};

createLists();

app.listen(port, () => console.log(`Listening on port ${port}`));
