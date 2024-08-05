import React, { useEffect, useState } from "react";
import axios from "axios"
const PCGames = () => {
  const [pcGames, setPCGames] = useState([]);
  const getGames = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/pcgames/read`
      );
      const data = response.data;
      setPCGames(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="PCGames">
      <div className="container">
        <h1 className="content-header">PCGames</h1>

        {pcGames.map((game, index) => (
            <div key={index} className="game">
              <a href={game.link}>
              <img src={game.image}/>

<h2>{game.title}</h2>
              </a>
            
            </div>
          ))}


      </div>
    </div>
  );
};
export default PCGames;
