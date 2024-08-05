const axios = require("axios");
const fs = require("fs").promises;

const starting = 1;
const ending = 92357;

// Initialize the console arrays in an object for easy access
const consoles = {
  undefinedlist: [],
  nintendo: [],
  mastersystem: [],
  genesis: [],
  supernintendo: [],
  saturn: [],
  playstation: [],
  nintendo64: [],
  dreamcast: [],
  playstation2: [],
  xbox: [],
  gamecube: [],
  xbox360: [],
  playstation3: [],
  wii: [],
  wiiware: [],
  gamboy: [],
  virtualboy: [],
  gameboycolor: [],
  gameboyadvance: [],
  nintendods: [],
  playstationportable: [],
  atari2600: [],
  atari5200: [],
  atari7800: [],
  sega32x: [],
  lynx: [],
  gamegear: [],
};

const normalizePlatformName = (platformName) => {
  return platformName.replace(/\s+/g, '').toLowerCase();
};

const createLists = async () => {
  for (let num = starting; num <= ending; num++) {
    console.log(`-------------------------- Searching #${num}`);

    try {
      const response = await axios.get(`http://localhost:4010/api/games/read/game/${num}`);
      const data = response.data;

      const gameId = data.gameId;
      let platform = normalizePlatformName(data.console || 'undefinedList');

      if (!consoles[platform]) {
        console.log(`Normalized platform '${platform}' not found, adding to undefinedList.`);
        platform = 'undefinedlist'; // Note the normalization
      }

      consoles[platform].push(`${gameId},`);

      console.log(`gameId: ${gameId}`);
      console.log(`Normalized platform: ${platform}`);
    } catch (error) {
      console.log(error);
    }
  }

  // After all game IDs have been processed, write each console's list to a file
  for (const [platform, gameIds] of Object.entries(consoles)) {
    if (gameIds.length > 0) {
      try {
        await fs.writeFile(`./updated_consoles/${platform}.js`, gameIds.join("\n"));
        console.log(`${platform} list saved!`);
      } catch (err) {
        console.error(`Error saving ${platform} list:`, err);
      }
    }
  }
};

createLists();
