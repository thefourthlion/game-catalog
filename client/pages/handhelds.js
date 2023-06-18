import React from "react";
import Link from "next/link";
const Handhelds = () => {
  const handheldOption = [
    "Game Boy",
    "Virtual Boy",
    "Game Boy Color",
    "Game Boy Advance",
    "Nintendo DS",
    "PlayStation Portable",
  ];
  return (
    <div className="Handhelds">
      <div className="container page">
        {handheldOption.map((val, index) => (
          <h1 key={index}>
            <Link href={`/console/${val}`}>{val}</Link>
          </h1>
        ))}
      </div>
    </div>
  );
};
export default Handhelds;
