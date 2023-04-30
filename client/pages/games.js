import React, { useState, useEffect } from "react";
import GameLine from "../components/GameLine";
import Axios from "axios";
const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    Axios.get("http://localhost:3002/api/games/read").then((res) => {
      const data = res.data;
      setGames(data);
      console.log(data);
    });
  };

  return (
    <div className="Games page">
      <div className="container">
        {games.map((val, key) => {
          console.log("🛑");
          return (
            <>
              <GameLine
                num={key + 1}
                gameId={val.gameId}
                title={val.title}
                size={val.downloadSize}
                downloadLink={val.oldDownloadLink}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Games;
