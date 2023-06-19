import React from "react";
import Link from "next/link";
const Handhelds = () => {
  const handheldOption = [
    "Game Boy",
    "Virtual Boy",
    "Game Boy Color",
    "Game Boy Advance",
    "Nintendo DS",
    "PSP",
  ];
  return (
    <div className="Handhelds">
      <div className="container page">
        {handheldOption.map((val, index) => (
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
export default Handhelds;
