import React from "react";
import HandheldSlider from "./HandheldSlider";
import ConsoleSlide from "./ConsoleSlide";
const Landing = () => {
  return (
    <div className="Landing">
      <div className="container">
        <h1 className="landing-header landing-comp">
          Journey to the Heart of Retro Gaming
        </h1>
        <HandheldSlider className="landing-comp" />
        <ConsoleSlide className="landing-comp" />
      </div>
    </div>
  );
};
export default Landing;
