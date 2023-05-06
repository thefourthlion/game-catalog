import React from "react";
import Link from "next/link";
const GameLine = ({
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
        <p className=" title">
          <b>{num}.) </b>
          <Link href={`/game/${gameId}`}>{title}</Link>
        </p>

        {/* <p className=" rating">{rating}</p>
        <p className=" language">{language}</p>
        <p className=" region">{region}</p> */}
        <p className="item size">{size}</p>
        <a className="item download" href={downloadLink} download>
          <button className="primary-btn">download</button>
        </a>
      </div>
      <hr />
    </div>
  );
};
export default GameLine;
