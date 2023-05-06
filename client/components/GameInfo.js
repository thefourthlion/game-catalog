import React, { useState } from "react";
import StarRatings from "react-star-ratings";
const GameInfo = ({
  title,
  console,
  downloadSize,
  boxImg,
  cartImg,
  screenImg,
  oldCartImg,
  description,
  overallReview,
  cartSize,
  cheatCode,
  cheatCodeDescription,
  year,
  region,
}) => {
  const [showScreenImg, setShowScreenImg] = useState(true);
  const [showBoxImg, setShowBoxImg] = useState(true);
  const [showCartImg, setShowCartImg] = useState(true);
  const [showCheatCodes, setShowCheatCodes] = useState(false);

  const rating = parseFloat(overallReview) / 2;

  // if (console == "Nintendo") {
  //   console = "NES";
  // }

  return (
    <div className="GameInfo">
      <div className="container">
        <div className="product-container">
          <div className="img-container">
            {showBoxImg == true && (
              <img
                src={boxImg}
                onError={() => {
                  setShowBoxImg(false);
                }}
              />
            )}

            {showCartImg == true && (
              <img
                src={cartImg}
                onError={() => {
                  setShowCartImg(false);
                }}
              />
            )}

            {showScreenImg == true && (
              <img
                src={screenImg}
                onError={() => {
                  setShowScreenImg(false);
                }}
              />
            )}
          </div>
          <div className="info-container">
            <h1>{title}</h1>

            <h4 className="content-header">
              Platform - <a href={`/console/${console}`}>{console}</a>
            </h4>

            <h4>Released - {year}</h4>

            <h4>Region - {region}</h4>
            {rating && (
              <StarRatings
                starRatedColor="red"
                rating={rating}
                starDimension="25px"
                starSpacing="5px"
              />
            )}
            <p>Size: {downloadSize}</p>

            <button>Free Download</button>

            <a href={`https://www.amazon.com/s?k=${title}+${console}`}>
              <button>Buy On Amazon</button>
            </a>

            {/* <div>
              <p>{description}</p>
            </div> */}
          </div>
        </div>
        <div className="descriptions">
          <h1>Product Description</h1>
          <p>{description}</p>
        </div>
        <div className="cheat-codes">
          <h1 className="header">Cheat Codes</h1>
          {!showCheatCodes ? (
            <h4
              onClick={() => {
                setShowCheatCodes(!showCheatCodes);
              }}
            >
              Show Cheats
            </h4>
          ) : (
            <h4
              onClick={() => {
                setShowCheatCodes(!showCheatCodes);
              }}
            >
              Hide Cheats
            </h4>
          )}

          {showCheatCodes && (
            <div className="cheats">
              <p className="code">
                {cheatCode &&
                  cheatCode.map((item, index) => {
                    return <p key={index}>{item}</p>;
                  })}
              </p>

              <p className="code-description">
                {cheatCodeDescription
                  ? cheatCodeDescription.map((item, index) => {
                      return <p key={index}>{item}</p>;
                    })
                  : " "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GameInfo;
