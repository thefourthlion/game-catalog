import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/consoles">Consoles</Link>
          </li>
          <li>
            <Link href="/handhelds">Handhelds</Link>
          </li>
          <li>
            <Link href="/">Emulators</Link>
          </li>
          <li>
            <Link href="/">Emulators</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
