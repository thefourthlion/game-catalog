import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

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

        <li className="nav-item">Link</li>
        <li className="nav-item">Link</li>
        <li className="nav-item">Link</li>
        <li className="nav-item">Link</li>

        <li>
          <Link href="/ ">
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
