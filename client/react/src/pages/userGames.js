import { useState, useEffect } from "react";
import AuthService from "../services/auth.services";

const UserGames = () => {
    const [games, setGames] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
          console.log(user)
        }
      }, []);
  return (
    <div className="UserGames">

        <h1>user-games</h1>
     </div>
  );
};

export default UserGames;
