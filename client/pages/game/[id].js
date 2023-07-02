import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import GameInfo from "../../components/GameInfo";
// import dotenv from "dotenv";

const Game = () => {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [newDownloadLink, setNewDownloadLink] = useState("");

  // dotenv.config();
  // const apiUrl = process.env.API_URL;

  const findGame = async () => {
    try {
      const res = await Axios.get(
        `https://api.games.everettdeleon.com/api/games/read/${id}`
      );
      const data = res.data;
      console.log(data);
      setGame(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    findGame();
  }, [id]);

  const info = game.gameInfoDescription;
  console.log(info);
  // const gameInfoMap = info.map((item) => <p className="info-title">{item}</p>);

  return (
    <div className="Game page">
      <div className="container">
        {Game != [] ? (
          <GameInfo
            title={game.title}
            console={game.console}
            description={game.description}
            cheatCodeDescription={game.cheatCodeDescription}
            cheatCode={game.cheatCode}
            gameId={game.gameId}
            players={game.players}
            region={game.region}
            downloadLink={game.downloadLink}
            serial={game.serial}
            publisher={game.publisher}
            downloadSize={game.downloadSize}
            boxImg={game.boxImg}
            cartImg={game.cartImg}
            screenImg={game.screenImg}
            oldBoxImg={game.oldBoxImg}
            oldCartImg={game.oldCartImg}
            oldScreenImg={game.oldScreenImg}
            overallReview={game.overallReview}
            cartSize={game.cartSize}
            year={game.year}
          />
        ) : (
          "Loading Game..."
        )}
      </div>
    </div>
  );
};
export default Game;
