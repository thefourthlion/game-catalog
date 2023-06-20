import React from "react";
const Landing = () => {
  return (
    <div className="Landing">
      <div className="container">
        <iframe
          id="ejs-content-frame"
          width="420px"
          height="420px"
          border="0"
          frameborder="no"
          // style="width:100%; height:100%"
          scrolling="no"
          allowfullscreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          src="https://www.emulatorjs.com/embed/content.html"
        ></iframe>
      </div>
    </div>
  );
};
export default Landing;
