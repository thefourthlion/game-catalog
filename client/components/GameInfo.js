import React, { useState } from "react";
import StarRatings from "react-star-ratings";
const GameInfo = ({
  title,
  console,
  downloadSize,
  boxImg,
  cartImg,
  screenImg,
  gameInfoDescription,
  gameInfoTitle,
  overallReview,
  cartSize,
}) => {
  const [showScreenImg, setShowScreenImg] = useState(true);
  const [showBoxImg, setShowBoxImg] = useState(true);
  const [showCartImg, setShowCartImg] = useState(true);

  const rating = parseFloat(overallReview) / 2;

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
            <a href="/">
              <h4 className="content-header">{console}</h4>
            </a>
            {rating && (
              <StarRatings
                starRatedColor="red"
                rating={rating}
                starDimension="25px"
                starSpacing="5px"
              />
            )}
            <p>Size: {cartSize}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameInfo;
