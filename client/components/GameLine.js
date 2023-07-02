import React from "react";
import Link from "next/link";
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
  let downloadTitle = title;
  let downloadGame = downloadTitle.replace(/[,:\s]+/g, "-");
  let newDownloadLink = `http://10.0.0.123/roms/${console}/${downloadGame}/${downloadGame}.zip`;

  return (
    <div className="GameLine">
      <div className="GameLine-container">
        <p className="title">
          <b>{num}.) </b>
          <Link href={`/game/${gameId}`}>{title}</Link>
        </p>
        <p className="item size">{size}</p>
        {downloadLink != "download-link" ? (
          <a className="item download" href={newDownloadLink}>
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
