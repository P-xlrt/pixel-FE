import { Navigate } from "react-router-dom";
import { useEffect } from "react";

import { logout } from "../utils";
import "../styling/login.css";

export const Logout = ({ user, setUser }) => {

  useEffect(() => {
    if (localStorage.key("myToken")) {
        logout(setUser);
    }
  }, [user]);



  
  return (
    <div>
      {(user) ?  <h1>${user} You're being logged out...</h1> : <h1>You've been logged out...</h1>}
      {(!user) && <Navigate to='/gallery' />}

    </div>
  );
};
