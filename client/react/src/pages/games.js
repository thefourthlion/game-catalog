import React, { useState, useEffect } from "react";
import GameLine from "../components/GameLine";
import Axios from "axios";

const Games = () => {
    const [games, setGames] = useState([]);
    const [limit, setLimit] = useState(50);

    useEffect(() => {
        getGames();
    }, []);

    const getMoreGames = () => {
        setLimit(limit + 25);
        getGames();
    };

    const getGames = () => {
        Axios.get(
            `http://localhost:4010/api/games/read?limit=${limit}`
        ).then((res) => {
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

            <button
                className="primary-btn view-more-btn"
                onClick={() => {
                    getMoreGames();
                }}
            >
                View More
            </button>
        </div>
    );
};
export default Games;
