import React, { useEffect, useState } from "react";
import axios from "axios";
const SwitchGames = () => {
  const [switchGames, setSwitchGames] = useState([]);
  const getGames = async () => {
    try {
      const response = await axios.get(
        `https://api.thebombroms.com/api/SwitchGames/read`
      );
      const data = response.data;
      setSwitchGames(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="SwitchGames">
      <div className="container">
        <h1 className="content-header">SwitchGames</h1>

        {switchGames.map((game, index) => (
          <div key={index} className="game">
            <a href={game.torrentLink}>
              {/* <img src={game.image} /> */}
              <h2>{game.name}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SwitchGames;
