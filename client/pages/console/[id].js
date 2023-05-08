import React, { useState, useEffect } from "react";
import GameLine from "../../components/GameLine";
import { useRouter } from "next/router";
import Axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [limit, setLimit] = useState(50);
  const [letter, setLetter] = useState("");

  const getMoreGames = () => {
    setLimit(limit + 25);
    getGames();
  };

  const getGames = () => {
    Axios.get(
      `https://www.api.games.everettdeleon.com/api/games/read/console/${id}?limit=${limit}`
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
      <div className="letter-container">
        <p
          onClick={() => {
            setLetter("#");
          }}
        >
          #
        </p>
        <p
          onClick={() => {
            setLetter("A");
          }}
        >
          A
        </p>
        <p
          onClick={() => {
            setLetter("B");
          }}
        >
          B
        </p>
        <p
          onClick={() => {
            setLetter("C");
          }}
        >
          C
        </p>
        <p
          onClick={() => {
            setLetter("D");
          }}
        >
          D
        </p>
        <p
          onClick={() => {
            setLetter("E");
          }}
        >
          E
        </p>
        <p
          onClick={() => {
            setLetter("F");
          }}
        >
          F
        </p>
        <p
          onClick={() => {
            setLetter("G");
          }}
        >
          G
        </p>
        <p
          onClick={() => {
            setLetter("H");
          }}
        >
          H
        </p>
        <p
          onClick={() => {
            setLetter("I");
          }}
        >
          I
        </p>
        <p
          onClick={() => {
            setLetter("J");
          }}
        >
          J
        </p>
        <p
          onClick={() => {
            setLetter("K");
          }}
        >
          K
        </p>
        <p
          onClick={() => {
            setLetter("L");
          }}
        >
          L
        </p>
        <p
          onClick={() => {
            setLetter("M");
          }}
        >
          M
        </p>
        <p
          onClick={() => {
            setLetter("N");
          }}
        >
          N
        </p>
        <p
          onClick={() => {
            setLetter("O");
          }}
        >
          O
        </p>
        <p
          onClick={() => {
            setLetter("P");
          }}
        >
          P
        </p>
        <p
          onClick={() => {
            setLetter("Q");
          }}
        >
          Q
        </p>
        <p
          onClick={() => {
            setLetter("R");
          }}
        >
          R
        </p>
        <p
          onClick={() => {
            setLetter("S");
          }}
        >
          S
        </p>
        <p
          onClick={() => {
            setLetter("T");
          }}
        >
          T
        </p>
        <p
          onClick={() => {
            setLetter("U");
          }}
        >
          U
        </p>
        <p
          onClick={() => {
            setLetter("V");
          }}
        >
          V
        </p>
        <p
          onClick={() => {
            setLetter("W");
          }}
        >
          W
        </p>
        <p
          onClick={() => {
            setLetter("X");
          }}
        >
          X
        </p>
        <p
          onClick={() => {
            setLetter("Y");
          }}
        >
          Y
        </p>
        <p
          onClick={() => {
            setLetter("Z");
          }}
        >
          Z
        </p>
      </div>
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
