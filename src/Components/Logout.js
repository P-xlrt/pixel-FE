import { Navigate, Link } from "react-router-dom";
import { useEffect } from "react";

import { logout } from "../utils";
import "../styling/login.css";

// export const Logout = () => {
export const Logout = ({ user, setUser }) => {

  useEffect(() => {
    if (localStorage.key("myToken")) {
        logout(setUser);
    }
  }, []);

  // if (localStorage.key("myToken")) {
  //   logout(setUser);
  // }



  
  return (
    <div>
      { !user && <Navigate to='/gallery' /> }
      { user ?  <h1>${user}, You're being logged out...</h1> : <h1>You've been logged out...</h1> }
      <Link to='/gallery'>Go back to the public gallery!</Link>

      <Link to='/create'>Go create beautiful art!</Link>

      <Link to='/login' >Go to the Login/Sign-up page!</Link>

    </div>
  );
};
