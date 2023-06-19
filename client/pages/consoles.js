import React from "react";
import Link from "next/link";
const Consoles = () => {
  const consoleOptions = [
    "Nintendo",
    "Master System",
    "Genesis",
    "Super Nintendo",
    "Saturn",
    "PlayStation",
    "Nintendo 64",
    "Dreamcast",
    "PlayStation 2",
    "Xbox",
    "GameCube",
    "Xbox 360",
    "PlayStation 3",
    "Wii",
    "WiiWare",
  ];

  return (
    <div className="Consoles">
      <div className="container page">
        {consoleOptions.map((val, index) => (
          <Link href={`/console/${val}`}>
            <h1 className="consoles" key={index}>
              {val}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Consoles;
