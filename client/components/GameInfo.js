import React from "react";
const GameInfo = ({
  title,
  console,
  downloadSize,
  boxImg,
  cartImg,
  screenImg,
  gameInfoDescription,
  gameInfoTitle,
}) => {
  return (
    <div className="GameInfo">
      <div className="container">
        <h1 className="content-header">{console}</h1>
        <h1>{title}</h1>
        <div className="product-container">
          <div className="img-container">
            <img src={boxImg} />
            <img src={cartImg} />
            <img src={screenImg} />
          </div>
          <div className="info-container">
            <div className="info-title">
              {gameInfoTitle &&
                gameInfoTitle.map((option, index) => <p>{option}</p>)}
            </div>
            <div className="info-description">
              {gameInfoDescription &&
                gameInfoDescription.map((option, index) => <p>{option}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameInfo;
