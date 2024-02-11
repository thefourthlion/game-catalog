import React from "react";
const GameLine = ({
    console,
    num,
    title,
    gameId,
    rating,
    language,
    region,
    size,
    downloadLink,
}) => {
    return (
        <div className="GameLine">
            <div className="GameLine-container">
                <p className="title">
                    <b>{num}.) </b>
                    <a href={`/game?id=${gameId}`}>{title}</a>
                </p>
                <p className="item size">{size}</p>
                {downloadLink != "download-link" ? (
                    <a
                        className="item download"
                        href={`https://games.bombroms.com${downloadLink}`}
                        download
                    >
                        <button className="primary-btn" type="submit">
                            Download
                        </button>
                    </a>
                ) : (
                    <button className="primary-btn" type="submit">
                        Coming Soon
                    </button>
                )}
            </div>
        </div>
    );
};
export default GameLine;
