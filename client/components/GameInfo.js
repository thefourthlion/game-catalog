import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { Carousel } from "react-bootstrap";
// import puppeteer from "puppeteer";
const GameInfo = ({
  title,
  console,
  downloadSize,
  boxImg,
  cartImg,
  screenImg,
  oldBoxImg,
  oldCartImg,
  oldScreenImg,
  gameId,
  players,
  description,
  overallReview,
  cartSize,
  cheatCode,
  publisher,
  serial,
  cheatCodeDescription,
  year,
  downloadLink,
  region,
}) => {
  const [showScreenImg, setShowScreenImg] = useState(true);
  const [showBoxImg, setShowBoxImg] = useState(true);
  const [showCartImg, setShowCartImg] = useState(true);
  const [showOldScreenImg, setShowOldScreenImg] = useState(true);
  const [showOldBoxImg, setShowOldBoxImg] = useState(true);
  const [showOldCartImg, setShowOldCartImg] = useState(true);
  const [showCheatCodes, setShowCheatCodes] = useState(false);

  const rating = parseFloat(overallReview) / 2;

  // const downloadGame = async (link) => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(link);

  //   // Find the button using a CSS selector
  //   const button = await page.$("#download_form > button");

  //   // Click the button
  //   await button.click();

  //   await browser.close();
  // };

  // if (console == "Nintendo") {
  //   console = "NES";
  // }

  return (
    <div className="GameInfo">
      <div className="container">
        <div className="product-container">
          {/* {screenImg != false && cartImg != false && boxImg != false && ( */}
          <div className="img-container">
            <Carousel className="carousel">
              {showOldBoxImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={oldBoxImg}
                    onError={() => {
                      setShowOldBoxImg(false);
                    }}
                    alt="Slide One"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
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
                    alt="Slide Two"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
                  />
                </Carousel.Item>
              )}
              {showOldCartImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={oldCartImg}
                    onError={() => {
                      setShowOldCartImg(false);
                    }}
                    alt="Slide Three"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
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
                    alt="Slide Four"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
                  />
                </Carousel.Item>
              )}
              {showOldScreenImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={oldScreenImg}
                    onError={() => {
                      setShowOldScreenImg(false);
                    }}
                    alt="Slide Five"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
                  />
                </Carousel.Item>
              )}
              {showScreenImg == true && (
                <Carousel.Item className="carousel-item">
                  <img
                    src={screenImg}
                    onError={() => {
                      setShowScreenImg(false);
                    }}
                    alt="Slide Six"
                    layout="fill"
                    objectFit="cover"
                    className="carousel-img"
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </div>
          {/* )} */}
          <div className="info-container">
            <h1>{title}</h1>

            {rating && (
              <StarRatings
                className="ratings"
                starRatedColor="rgb(213,215,29)"
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
          </div>

          <div className="btn-container">
            {downloadLink != "download-link" ? (
              <a href={`https://games.bombroms.com${downloadLink}`} download>
                <button className="primary-btn" type="submit">
                  Free Download
                </button>
              </a>
            ) : (
              <button className="primary-btn" type="submit">
                Coming Soon
              </button>
            )}

            <br />

            <a href={`https://www.amazon.com/s?k=${title}+${console}`}>
              <button className="secondary-btn">Buy On Amazon</button>
            </a>
          </div>
        </div>

        {description != "placeholder" && (
          <div className="descriptions">
            <h1 className="info-header">Game Description</h1>
            <p>{description}</p>
          </div>
        )}

        {cheatCode != "" && (
          <div className="cheat-codes">
            <h1 className="info-header">Cheat Codes</h1>

            <div className="cheats">
              <table>
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
