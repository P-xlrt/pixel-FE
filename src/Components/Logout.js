// Form which allows the user to login into the app
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
    <>
      {(!user) && <Navigate to='/gallery' />}
      <h1>{user} You're being logged out...</h1>
    </>
  );
};
