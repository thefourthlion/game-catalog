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
  publisher,
  serial,
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
            {/* {showBoxImg == true && (
              <img
                src={boxImg}
                onError={() => {
                  setShowBoxImg(false);
                }}
              />
            )} */}

            {/* {showCartImg == true && (
              <img
                src={cartImg}
                onError={() => {
                  setShowCartImg(false);
                }}
              />
            )} */}

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

            {rating && (
              <StarRatings
                className="ratings"
                starRatedColor="red"
                rating={rating}
                starDimension="25px"
                starSpacing="5px"
              />
            )}

            <p className="game-information platform">
              Platform - <a href={`/console/${console}`}>{console}</a>
            </p>

            <p className="game-information">
              Publisher - {publisher}
              {publisher != "Coming Soon" && (
                <a
                  className="wiki-link"
                  href={`https://bootleggames.fandom.com/wiki/Special:Search?query=${publisher}&scope=cross-wiki`}
                >
                  Wiki
                </a>
              )}
            </p>

            <p className="game-information">Released - {year}</p>

            <p className="game-information">Region - {region}</p>

            <p className="game-information">Serial - {serial}</p>

            <p className="game-information">Size - {downloadSize}</p>

            <button>Free Download</button>

            <a href={`https://www.amazon.com/s?k=${title}+${console}`}>
              <button>Buy On Amazon</button>
            </a>
          </div>
        </div>

        {description != "placeholder" && (
          <div className="descriptions">
            <h1>Product Description</h1>
            <p>{description}</p>
          </div>
        )}

        {cheatCode != "" && (
          <div className="cheat-codes">
            <h1>Cheat Codes</h1>

            <div className="cheats">
              <table>
                <thead>
                  <tr>
                    <th>Codes</th>
                    <th>Cheats</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="code">
                      {cheatCode &&
                        cheatCode.map((item, index) => {
                          return <p key={index}>{item}</p>;
                        })}
                    </td>
                    <td className="code-description">
                      {cheatCodeDescription
                        ? cheatCodeDescription.map((item, index) => {
                            return <p key={index}>{item}</p>;
                          })
                        : " "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameInfo;
