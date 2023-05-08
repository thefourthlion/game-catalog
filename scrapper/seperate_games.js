const express = require("express");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const starting = 1;
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
      .get(`https://www.api.games.everettdeleon.com/api/games/read/game/${num}`)
      .then((response) => {
        const data = response.data;

        let gameId = data.gameId;
        return gameId;
      })
      .catch((error) => {
        console.log(error);
      });

    const platform = await axios
      .get(`https://www.api.games.everettdeleon.com/api/games/read/game/${num}`)
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

    if (platform == "Master System") {
      masterSystem.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/masterSystem.js",
        masterSystem.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Genesis") {
      genesis.push(`${gameId},`);
      fs.writeFile("./gameLists/genesis.js", genesis.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "Super Nintendo") {
      superNintendo.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/superNintendo.js",
        superNintendo.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Saturn") {
      saturn.push(`${gameId},`);
      fs.writeFile("./gameLists/saturn.js", saturn.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "PlayStation") {
      playstation.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/playstation.js",
        playstation.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Nintendo 64") {
      nintendo64.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/nintendo64.js",
        nintendo64.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Dreamcast") {
      dreamcast.push(`${gameId},`);
      fs.writeFile("./gameLists/dreamcast.js", dreamcast.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "PlayStation 2") {
      playstation2.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/playstation2.js",
        playstation2.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Xbox") {
      xbox.push(`${gameId},`);
      fs.writeFile("./gameLists/xbox.js", xbox.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "GameCube") {
      gameCube.push(`${gameId},`);
      fs.writeFile("./gameLists/gameCube.js", gameCube.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "Xbox 360") {
      xbox360.push(`${gameId},`);
      fs.writeFile("./gameLists/xbox360.js", xbox360.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "PlayStation 3") {
      playstation3.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/playstation3.js",
        playstation3.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Wii") {
      wii.push(`${gameId},`);
      fs.writeFile("./gameLists/wii.js", wii.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "WiiWare") {
      wiiWare.push(`${gameId},`);
      fs.writeFile("./gameLists/wiiWare.js", wiiWare.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
    if (platform == "Game Boy") {
      gamBoy.push(`${gameId},`);
      fs.writeFile("./gameLists/gamBoy.js", gamBoy.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }
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
    if (platform == "Game Boy Color") {
      gameBoyColor.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/gameBoyColor.js",
        gameBoyColor.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Game Boy Advance") {
      gameBoyAdvanced.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/gameBoyAdvanced.js",
        gameBoyAdvanced.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Nintendo DS") {
      nintendoDs.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/nintendoDs.js",
        nintendoDs.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "PlayStation Portable") {
      playstationPortable.push(`${gameId},`);
      fs.writeFile(
        "playstationPortable.js",
        playstationPortable.join("\n"),
        (err) => {
          if (err) throw err;
          console.log("List saved!");
        }
      );
    }
    if (platform == "Nintendo") {
      nintendo.push(`${gameId},`);
      fs.writeFile("./gameLists/Nintendo.js", nintendo.join("\n"), (err) => {
        if (err) throw err;
        console.log("List saved!");
      });
    }

    if (platform == "undefined") {
      undefinedList.push(`${gameId},`);
      fs.writeFile(
        "./gameLists/undefined.js",
        undefinedList.join("\n"),
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
