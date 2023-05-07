import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import GameInfo from "../../components/GameInfo";
// import dotenv from "dotenv";

const Game = () => {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // dotenv.config();
  // const apiUrl = process.env.API_URL;

  const findGame = () => {
    Axios.get(`http://localhost:3006/api/games/read/${id}`).then((res) => {
      const data = res.data;
      console.log(data);
      setGame(data);
    });
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
            oldCartImg={game.oldCartImg}
            cheatCodeDescription={game.cheatCodeDescription}
            cheatCode={game.cheatCode}
            gameId={game.gameId}
            players={game.players}
            region={game.region}
            serial={game.serial}
            publisher={game.publisher}
            downloadSize={game.downloadSize}
            boxImg={game.boxImg}
            cartImg={game.cartImg}
            screenImg={game.screenImg}
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
