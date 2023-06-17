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

  const handheldOption = [
    "Game Boy",
    "Virtual Boy",
    "Game Boy Color",
    "Game Boy Advance",
    "Nintendo DS",
    "PlayStation Portable",
  ];
  return (
    <div className="Consoles">
      <div className="container page">
        {consoleOptions.map((val, index) => (
          <h1 key={index}>
            <Link href={`/console/${val}`}>{val}</Link>
          </h1>
        ))}
      </div>
    </div>
  );
};
export default Consoles;
