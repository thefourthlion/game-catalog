import React, { useState } from "react";
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
                className="nav nav-links "
                id={showLinks ? "nav-active" : "nav-hidden"}
            >
                <li className="nav-item links">
                    <a href="/" className="logo-header navbar-link phone-none">
                        The Bomb Roms
                    </a>
                </li>

                <li className="nav-item">
                    <Dropdown
                        title="Consoles"
                        param="/console?id="
                        options={consoleOptions}
                    />
                </li>

                <li className="nav-item">
                    <Dropdown
                        title="Handhelds"
                        param="/console?id="
                        options={handheldOption}
                    />
                </li>

                <li className="nav-item links">
                    <a className="navbar-link" href="/emulators">
                        Emulators
                    </a>
                </li>

                <li className="nav-item links">
                    <a className="navbar-link" href="/emulators">
                        Game Lists
                    </a>
                </li>

                <li className="nav-item links">
                    <a href="/login">
                        <button className="navbar-link login secondary-btn">
                            Login
                        </button>
                    </a>

                </li>
            </ul>

            <a href="/" className="pc-none">
                <h1 className="logo-header phone-logo">The Bomb Roms</h1>
            </a>
            <div className="burger" onClick={() => setShowLinks(!showLinks)}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </div>
    );
}
