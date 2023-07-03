import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Handhelds.scss";
import "../styles/Consoles.scss";
import "../styles/emulators.scss";
import "../styles/ConsoleGames.scss";
import "../styles/dropdown.scss";
import "../styles/GameInfo.scss";
import "../styles/GameLine.scss";
import "../styles/Input.scss";
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
import "../styles/font.css";
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
