import React, { useState } from "react";
import Link from "next/link";
import Dropdown from "../context/dropdown";
export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
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
    <div className="Navbar" id="Navbar">
      <ul
        className="nav nav-links"
        id={showLinks ? "nav-active" : "nav-hidden"}
      >
        <li>
          <Link href="/" className="phone-none">
            <h1>Logo</h1>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="http://localhost:3000/games">Games</Link>
        </li>

        <li className="nav-item">
          <Dropdown
            title="Handhelds"
            param="/console/"
            options={handheldOption}
          />
        </li>

        <li className="nav-item">
          <Dropdown
            title="Consoles"
            param="/console/"
            options={consoleOptions}
          />
        </li>

        <li>
          <Link href="/login">
            <button className="primary-btn">Login</button>
          </Link>
        </li>
      </ul>

      <Link href="/" className="pc-none">
        <h1>Logo</h1>
      </Link>
      <div className="burger" onClick={() => setShowLinks(!showLinks)}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
}
