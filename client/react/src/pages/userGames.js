import { useState, useEffect } from "react";
import AuthService from "../services/auth.services";
import AddPCGames from "../components/AddPCGames";
import PCGames from "../components/PCGames";
import SwitchGames from "../components/SwitchGames";
const UserGames = () => {
  const [games, setGames] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(user);
    }
  }, []);
  return (
    <div className="UserGames">
      <SwitchGames/>
      <AddPCGames />
      <PCGames/>
      <h1>user-games</h1>
    </div>
  );
};

export default UserGames;
