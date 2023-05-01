import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import GameInfo from "../../components/GameInfo";
const Game = () => {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const findGame = () => {
    Axios.get(`http://localhost:3002/api/games/read/${id}`).then((res) => {
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
            downloadSize={game.downloadSize}
            boxImg={game.oldBoxImg}
            cartImg={game.oldCartImg}
            screenImg={game.oldScreenImg}
            gameInfoDescription={info}
            gameInfoTitle={game.gameInfoTitle}
          />
        ) : (
          "Loading Game..."
        )}
      </div>
    </div>
  );
};
export default Game;
