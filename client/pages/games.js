import React, { useState, useEffect } from "react";
import GameLine from "../components/GameLine";
import Axios from "axios";
// import dotenv from "dotenv";

const Games = () => {
  const [games, setGames] = useState([]);

  // dotenv.config();
  // const apiUrl = process.env.API_URL;

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    Axios.get(`http://localhost:3005/api/games/read`).then((res) => {
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
                gameId={val._id}
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
