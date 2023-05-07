import React, { useState, useEffect } from "react";
import GameLine from "../../components/GameLine";
import { useRouter } from "next/router";
import Axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [limit, setLimit] = useState(50);

  const getMoreGames = () => {
    setLimit(limit + 25);
    getGames();
  };

  const getGames = () => {
    Axios.get(
      `http://localhost:3006/api/games/read/console/${id}?limit=${limit}`
    ).then((res) => {
      const data = res.data;
      setGames(data);
      console.log(data);
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getGames();
  }, [id]);

  return (
    <div className="ConsoleGames page">
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

        <div className="btn-container">
          <button
            className="primary-btn view-more-btn"
            onClick={() => {
              getMoreGames();
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};
export default Games;
