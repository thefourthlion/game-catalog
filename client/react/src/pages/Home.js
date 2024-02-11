import Landing from "../components/Landing";
import Mission from "../components/Mission";
import Nintendo from "../components/Nintendo";
import Sony from "../components/Sony";
import React from "react";

import "../styles/Home.css";
const Home = () => {
    return (
        <div className="Home pages">
            <Landing />
            <Mission />
            <Sony />
            <Nintendo />
        </div>
    );
};
export default Home; 