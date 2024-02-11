import "./styles/game.css";
import "./styles/console.css";
import "./styles/Spark.css";
import "./styles/Sony.css";
import "./styles/Sega.css";
import "./styles/Search.css";
import "./styles/ProjectInfo.css";
import "./styles/Nintendo.css";
import "./styles/Navbar.css";
import "./styles/Mission.css";
import "./styles/Microsoft.css";
import "./styles/Landing.css";
import "./styles/Input.css";
import "./styles/HandheldSlider.css";
import "./styles/GameLine.css";
import "./styles/GameInfo.css";
import "./styles/Footer.css";
import "./styles/ConsoleSlide.css";
import "./styles/ConsoleGames.css";
import "./styles/AdvancedSearch.css";
import "./styles/register.css";
import "./styles/login.css";
import "./styles/handhelds.css";
import "./styles/games.css";
import "./styles/favorites.css";
import "./styles/Emulators.css";
import "./styles/Consoles.css";
import "./styles/globals.css";
import "./styles/dropdown.css"
import React from "react";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Spark from "./components/Spark";
import Footer from "./components/Footer";

import Console from "./pages/console";
import Consoles from "./pages/consoles";
import Emulators from "./pages/emulators";
import Favorites from "./pages/favorites";
import Game from "./pages/game";
import Games from "./pages/games";
import Handhelds from "./pages/handhelds";
import Login from "./pages/login";
import Register from "./pages/register";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Spark />
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="console" element={<Console />} />
                        <Route path="consoles" element={<Consoles />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="emulators" element={<Emulators />} />
                        <Route path="games" element={<Games />} />
                        <Route path="game" element={<Game />} />
                        <Route path="handhelds" element={<Handhelds />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
export default App;
