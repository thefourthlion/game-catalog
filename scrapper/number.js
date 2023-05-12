const fs = require("fs");

const gameBoy = require("./gameLists/gameBoy.js");
const gameBoyAdvanced = require("./gameLists/gameBoyAdvanced.js");
const gameBoyColor = require("./gameLists/gameBoyColor.js");
const gameCube = require("./gameLists/gameCube.js");
const genesis = require("./gameLists/genesis.js");
const masterSystem = require("./gameLists/masterSystem.js");
const Nintendo = require("./gameLists/Nintendo.js");
const nintendo64 = require("./gameLists/nintendo64.js");
const nintendoDs = require("./gameLists/nintendoDs.js");
const playstation = require("./gameLists/playstation.js");
const playstation2 = require("./gameLists/playstation2.js");
const playstation3 = require("./gameLists/playstation3.js");
const saturn = require("./gameLists/saturn.js");
const superNintendo = require("./gameLists/superNintendo.js");
const wii = require("./gameLists/wii.js");
const wiiWare = require("./gameLists/wiiWare.js");
const xbox = require("./gameLists/xbox.js");
const xbox360 = require("./gameLists/xbox360.js");
const dreamCast = require("./gameLists/dreamcast.js");

// < GB - GB GBC MSYS 

// < 10 GB - GEN NES SNES 

// < 50 GB - GBA N64 

// < 1000 GB - DRMCA NDS SAT WIIW 

// < 2000 GB - GC 

// < 5000 GB 

const gameBoySize = fs.readFileSync("./gameLists/gameBoySize.txt", "utf-8");
const gameBoyAdvancedSize = fs.readFileSync(
  "./gameLists/gameBoyAdvancedSize.txt",
  "utf-8"
);
const gameBoyColorSize = fs.readFileSync(
  "./gameLists/gameBoyColorSize.txt",
  "utf-8"
);
const gameCubeSize = fs.readFileSync("./gameLists/gameCubeSize.txt", "utf-8");
const genesisSize = fs.readFileSync("./gameLists/genesisSize.txt", "utf-8");
const masterSystemSize = fs.readFileSync(
  "./gameLists/masterSystemSize.txt",
  "utf-8"
);
const NintendoSize = fs.readFileSync("./gameLists/NintendoSize.txt", "utf-8");
const nintendo64Size = fs.readFileSync(
  "./gameLists/nintendo64Size.txt",
  "utf-8"
);
const nintendoDsSize = fs.readFileSync(
  "./gameLists/nintendoDsSize.txt",
  "utf-8"
);
const playstationSize = fs.readFileSync(
  "./gameLists/playstationSize.txt",
  "utf-8"
);
const playstation2Size = fs.readFileSync(
  "./gameLists/playstation2Size.txt",
  "utf-8"
);
const playstation3Size = fs.readFileSync(
  "./gameLists/playstation3Size.txt",
  "utf-8"
);
const saturnSize = fs.readFileSync("./gameLists/saturnSize.txt", "utf-8");
const superNintendoSize = fs.readFileSync(
  "./gameLists/superNintendoSize.txt",
  "utf-8"
);
const wiiSize = fs.readFileSync("./gameLists/wiiSize.txt", "utf-8");
const wiiWareSize = fs.readFileSync("./gameLists/wiiWareSize.txt", "utf-8");
const xboxSize = fs.readFileSync("./gameLists/xboxSize.txt", "utf-8");
const xbox360Size = fs.readFileSync("./gameLists/xbox360Size.txt", "utf-8");
const dreamCastSize = fs.readFileSync("./gameLists/dreamCastSize.txt", "utf-8");

console.log(
  ` Game Boy Games Available - #${gameBoy.games.length} (${
    gameBoy.games[0]
  } - ${gameBoy.games[gameBoy.games.length - 1]}) @ ${gameBoySize}GB`
);

console.log(
  ` Dreamcast Games Available - #${dreamCast.games.length} (${
    dreamCast.games[0]
  } - ${dreamCast.games[dreamCast.games.length - 1]}) @ ${dreamCastSize}GB`
);
console.log(
  ` GameBoy Advanced Games Available - #${gameBoyAdvanced.games.length} (${
    gameBoyAdvanced.games[0]
  } - ${
    gameBoyAdvanced.games[gameBoyAdvanced.games.length - 1]
  }) @ ${gameBoyAdvancedSize}GB`
);
console.log(
  ` Game Boy Color Games Available - #${gameBoyColor.games.length} (${
    gameBoyColor.games[0]
  } - ${
    gameBoyColor.games[gameBoyColor.games.length - 1]
  }) @ ${gameBoyColorSize}GB`
);
console.log(
  ` Game Cube Games Available - #${gameCube.games.length} (${
    gameCube.games[0]
  } - ${gameCube.games[gameCube.games.length - 1]}) @ ${gameCubeSize}GB`
);
console.log(
  ` Genesis Games Available - #${genesis.games.length} (${genesis.games[0]} - ${
    genesis.games[genesis.games.length - 1]
  }) @ ${genesisSize}GB`
);
console.log(
  ` Master System Games Available - #${masterSystem.games.length} (${
    masterSystem.games[0]
  } - ${
    masterSystem.games[masterSystem.games.length - 1]
  }) @ ${masterSystemSize}GB`
);
console.log(
  ` Nintendo Games Available - #${Nintendo.games.length} (${
    Nintendo.games[0]
  } - ${Nintendo.games[Nintendo.games.length - 1]}) @ ${NintendoSize}GB`
);
console.log(
  ` Nintendo 64 Games Available - #${nintendo64.games.length} (${
    nintendo64.games[0]
  } - ${nintendo64.games[nintendo64.games.length - 1]}) @ ${nintendo64Size}GB`
);
console.log(
  ` Nintendo DS Games Available - #${nintendoDs.games.length} (${
    nintendoDs.games[0]
  } - ${nintendoDs.games[nintendoDs.games.length - 1]}) @ ${nintendoDsSize}GB`
);
console.log(
  ` Playstation Games Available - #${playstation.games.length} (${
    playstation.games[0]
  } - ${
    playstation.games[playstation.games.length - 1]
  }) @ ${playstationSize}GB`
);
console.log(
  ` Playstation 2 Games Available - #${playstation2.games.length} (${
    playstation2.games[0]
  } - ${
    playstation2.games[playstation2.games.length - 1]
  }) @ ${playstation2Size}GB`
);
console.log(
  ` Playstation 3 Games Available - #${playstation3.games.length} (${
    playstation3.games[0]
  } - ${
    playstation3.games[playstation3.games.length - 1]
  }) @ ${playstation3Size}GB`
);
console.log(
  ` Sega Saturn Games Available - #${saturn.games.length} (${
    saturn.games[0]
  } - ${saturn.games[saturn.games.length - 1]}) @ ${saturnSize}GB`
);
console.log(
  ` Super Nintendo Games Available - #${superNintendo.games.length} (${
    superNintendo.games[0]
  } - ${
    superNintendo.games[superNintendo.games.length - 1]
  }) @ ${superNintendoSize}GB`
);
console.log(
  ` Wii Games Available - #${wii.games.length} (${wii.games[0]} - ${
    wii.games[wii.games.length - 1]
  }) @ ${wiiSize}GB`
);
console.log(
  ` Wii Ware Games Available - #${wiiWare.games.length} (${
    wiiWare.games[0]
  } - ${wiiWare.games[wiiWare.games.length - 1]}) @ ${wiiWareSize}GB`
);
console.log(
  ` Xbox Games Available - #${xbox.games.length} (${xbox.games[0]} - ${
    xbox.games[xbox.games.length - 1]
  }) @ ${xboxSize}GB`
);
console.log(
  ` Xbox 360 Games Available - #${xbox360.games.length} (${
    xbox360.games[0]
  } - ${xbox360.games[xbox360.games.length - 1]}) @ ${xbox360Size}GB`
);
