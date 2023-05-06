import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Carousel } from "react-bootstrap";

const GameInfo = ({
  title,
  console,
  downloadSize,
  boxImg,
  cartImg,
  screenImg,
  gameId,
  players,
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
            <Carousel className="carousel">
              {showScreenImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={screenImg}
                    onError={() => {
                      setShowScreenImg(false);
                    }}
                    alt="Slide One"
                    layout="fill"
                    objectFit="cover"
                  />
                </Carousel.Item>
              )}
              {showCartImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={cartImg}
                    onError={() => {
                      setShowCartImg(false);
                    }}
                    alt="Slide Two"
                    layout="fill"
                    objectFit="cover"
                  />
                </Carousel.Item>
              )}
              {showBoxImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={boxImg}
                    onError={() => {
                      setShowBoxImg(false);
                    }}
                    alt="Slide Three"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
                  />
                </Carousel.Item>
              )}
            </Carousel>
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

            <p className="game-information">Players - {players}</p>

            <p className="game-information">Serial - {serial}</p>

            <p className="game-information">Size - {downloadSize}</p>
            <a href={`https://vimm.net/vault/${gameId}`}>
              <button type="submit">Free Download</button>
            </a>

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
                    <th>Cheat Codes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="code">
                      {cheatCode &&
                        cheatCode.map((item, index) => {
                          return (
                            <p key={index}>
                              {item} - {cheatCodeDescription[index]}
                              <hr />
                            </p>
                          );
                        })}
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
