const axios = require("axios");
const fs = require("fs");

const starting = 1;
const ending = 92357;
let size = 0;
let nintendoSize = 0;
let masterSystemSize = 0;
let genesisSize = 0;
let superNintendoSize = 0;
let saturnSize = 0;
let playstationSize = 0;
let nintendo64Size = 0;
let dreamcastSize = 0;
let playstation2Size = 0;
let xboxSize = 0;
let gameCubeSize = 0;
let xbox360Size = 0;
let playstation3Size = 0;
let wiiSize = 0;
let wiiWareSize = 0;
let gamBoySize = 0;
let virtualBoySize = 0;
let gameBoyColorSize = 0;
let gameBoyAdvancedSize = 0;
let nintendoDsSize = 0;
let playstationPortableSize = 0;
let Atari2600 = 0;
let Atari5200 = 0;
let Atari7800 = 0;
let Sega32X = 0;
let Lynx = 0;
let GameGear = 0;

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    // ------------------------------- get data from db -------------------------------
    const res = await axios.get(
      `http://localhost:4010/api/games/read/game/${num}`
    );

    const data = res.data;
    const gameSize = data.downloadSize;
    const platform = data.console;

    // console.log("hello", { data: data });
    if (data) {
      let gameSizeSplit = gameSize.split(" ");

      if (platform == "Game Gear") {
        if (gameSizeSplit[1] == "GB") {
          GameGear = GameGear + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          GameGear = GameGear + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          GameGear = GameGear + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${GameGear} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/GameGear.txt", String(GameGear), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Lynx") {
        if (gameSizeSplit[1] == "GB") {
          Lynx = Lynx + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          Lynx = Lynx + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          Lynx = Lynx + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${Lynx} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/Lynx.txt", String(Lynx), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Sega 32X") {
        if (gameSizeSplit[1] == "GB") {
          Sega32X = Sega32X + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          Sega32X = Sega32X + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          Sega32X = Sega32X + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${Sega32X} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/Sega32X.txt", String(Sega32X), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Atari 7800") {
        if (gameSizeSplit[1] == "GB") {
          Atari7800 = Atari7800 + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          Atari7800 = Atari7800 + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          Atari7800 = Atari7800 + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${Atari7800} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/Atari7800.txt", String(Atari7800), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Atari 5200") {
        if (gameSizeSplit[1] == "GB") {
          Atari5200 = Atari5200 + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          Atari5200 = Atari5200 + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          Atari5200 = Atari5200 + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${Atari5200} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/Atari5200.txt", String(Atari5200), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Atari 2600") {
        if (gameSizeSplit[1] == "GB") {
          Atari2600 = Atari2600 + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          Atari2600 = Atari2600 + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          Atari2600 = Atari2600 + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${Atari2600} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/Atari2600.txt", String(Atari2600), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "Nintendo") {
        if (gameSizeSplit[1] == "GB") {
          nintendoSize = nintendoSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          nintendoSize = nintendoSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          nintendoSize =
            nintendoSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${nintendoSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/nintendoSize.txt",
          String(nintendoSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Genesis") {
        if (gameSizeSplit[1] == "GB") {
          genesisSize = genesisSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          genesisSize = genesisSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          genesisSize =
            genesisSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${genesisSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/genesisSize.txt",
          String(genesisSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Super Nintendo") {
        if (gameSizeSplit[1] == "GB") {
          superNintendoSize = superNintendoSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          superNintendoSize =
            superNintendoSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          superNintendoSize =
            superNintendoSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${superNintendoSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/superNintendoSize.txt",
          String(superNintendoSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Saturn") {
        if (gameSizeSplit[1] == "GB") {
          saturnSize = saturnSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          saturnSize = saturnSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          saturnSize = saturnSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${saturnSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/saturnSize.txt",
          String(saturnSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "PlayStation") {
        if (gameSizeSplit[1] == "GB") {
          playstationSize = playstationSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          playstationSize =
            playstationSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          playstationSize =
            playstationSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${playstationSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/playstationSize.txt",
          String(playstationSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Nintendo 64") {
        if (gameSizeSplit[1] == "GB") {
          nintendo64Size = nintendo64Size + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          nintendo64Size = nintendo64Size + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          nintendo64Size =
            nintendo64Size + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${nintendo64Size} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/nintendo64Size.txt",
          String(nintendo64Size),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Dreamcast") {
        if (gameSizeSplit[1] == "GB") {
          dreamcastSize = dreamcastSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          dreamcastSize = dreamcastSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          dreamcastSize =
            dreamcastSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${dreamcastSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/dreamcastSize.txt",
          String(dreamcastSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "PlayStation 2") {
        if (gameSizeSplit[1] == "GB") {
          playstation2Size = playstation2Size + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          playstation2Size =
            playstation2Size + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          playstation2Size =
            playstation2Size + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${playstation2Size} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/playstation2Size.txt",
          String(playstation2Size),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Xbox") {
        if (gameSizeSplit[1] == "GB") {
          xboxSize = xboxSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          xboxSize = xboxSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          xboxSize = xboxSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${xboxSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/xboxSize.txt", String(xboxSize), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "GameCube") {
        if (gameSizeSplit[1] == "GB") {
          gameCubeSize = gameCubeSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          gameCubeSize = gameCubeSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          gameCubeSize =
            gameCubeSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${gameCubeSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/gameCubeSize.txt",
          String(gameCubeSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Xbox 360") {
        if (gameSizeSplit[1] == "GB") {
          xbox360Size = xbox360Size + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          xbox360Size = xbox360Size + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          xbox360Size =
            xbox360Size + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${xbox360Size} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/xbox360Size.txt",
          String(xbox360Size),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "PlayStation 3") {
        if (gameSizeSplit[1] == "GB") {
          playstation3Size = playstation3Size + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          playstation3Size =
            playstation3Size + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          playstation3Size =
            playstation3Size + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${playstation3Size} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/playstation3Size.txt",
          String(playstation3Size),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Wii") {
        if (gameSizeSplit[1] == "GB") {
          wiiSize = wiiSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          wiiSize = wiiSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          wiiSize = wiiSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${wiiSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile("./consoleSizes/wiiSize.txt", String(wiiSize), (err) => {
          if (err) throw err;
          console.log("List saved!");
        });
      }

      if (platform == "WiiWare") {
        if (gameSizeSplit[1] == "GB") {
          wiiWareSize = wiiWareSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          wiiWareSize = wiiWareSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          wiiWareSize =
            wiiWareSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${wiiWareSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/wiiWareSize.txt",
          String(wiiWareSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Game Boy") {
        if (gameSizeSplit[1] == "GB") {
          gamBoySize = gamBoySize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          gamBoySize = gamBoySize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          gamBoySize = gamBoySize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${gamBoySize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/gamBoySize.txt",
          String(gamBoySize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Virtual Boy") {
        if (gameSizeSplit[1] == "GB") {
          virtualBoySize = virtualBoySize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          virtualBoySize = virtualBoySize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          virtualBoySize =
            virtualBoySize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${virtualBoySize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/virtualBoySize.txt",
          String(virtualBoySize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Game Boy Color") {
        if (gameSizeSplit[1] == "GB") {
          gameBoyColorSize = gameBoyColorSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          gameBoyColorSize =
            gameBoyColorSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          gameBoyColorSize =
            gameBoyColorSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${gameBoyColorSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/gameBoyColorSize.txt",
          String(gameBoyColorSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Game Boy Advance") {
        if (gameSizeSplit[1] == "GB") {
          gameBoyAdvancedSize =
            gameBoyAdvancedSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          gameBoyAdvancedSize =
            gameBoyAdvancedSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          gameBoyAdvancedSize =
            gameBoyAdvancedSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${gameBoyAdvancedSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/gameBoyAdvancedSize.txt",
          String(gameBoyAdvancedSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Nintendo DS") {
        if (gameSizeSplit[1] == "GB") {
          nintendoDsSize = nintendoDsSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          nintendoDsSize = nintendoDsSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          nintendoDsSize =
            nintendoDsSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${nintendoDsSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/nintendoDsSize.txt",
          String(nintendoDsSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "PlayStation Portable") {
        if (gameSizeSplit[1] == "GB") {
          playstationPortableSize =
            playstationPortableSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          playstationPortableSize =
            playstationPortableSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          playstationPortableSize =
            playstationPortableSize +
            parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${playstationPortableSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/playstationPortableSize.txt",
          String(playstationPortableSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }

      if (platform == "Master System") {
        if (gameSizeSplit[1] == "GB") {
          masterSystemSize = masterSystemSize + parseFloat(gameSizeSplit[0]);
        } else if (gameSizeSplit[1] == "MB") {
          masterSystemSize =
            masterSystemSize + parseFloat(gameSizeSplit[0]) / 1000;
        } else if (gameSizeSplit[1] == "KB") {
          masterSystemSize =
            masterSystemSize + parseFloat(gameSizeSplit[0]) / 1000 / 1000;
        }

        console.log(
          `------------------------------ #${num} - ${platform} - ${masterSystemSize} GB - ${
            ending - num
          } ------------------------`
        );

        fs.writeFile(
          "./consoleSizes/masterSystemSize.txt",
          String(masterSystemSize),
          (err) => {
            if (err) throw err;
            console.log("List saved!");
          }
        );
      }
    }
  }
};

generate();
