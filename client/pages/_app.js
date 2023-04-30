import "../styles/GameLine.scss";import "../styles/Input.scss";import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import "../styles/index.scss";
import "../styles/Footer.scss";
import "../styles/ProjectInfo.scss";
import "../styles/Landing.scss";
import "../styles/Navbar.scss";
import "../styles/AdvancedSearch.scss";
import "../styles/Search.scss";
import "../styles/Favorites.scss";
import "../styles/Register.scss";
import "../styles/Login.scss";
import "../styles/Game.scss";
import "../styles/Games.scss";

import { UserAuthContextProvider } from "../context/UserAuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </UserAuthContextProvider>
  );
}
export default MyApp;
