// Form which allows the user to login into the app
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser, login, tokenLogin } from "../utils";
import "../styling/login-style.css";

export const Login = ({ user, setUser }) => {
  //set variables
  const [username, setUsername] = useState(); // getter and setter - user is the default state, setUser
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenLogin(setUser);
    }
  }, [setUser]);

  // Define handler
  const submitHandler = (e) => {
    e.preventDefault();
    // setUser({ username: username, email: email, pass: pass });
    if (bool) {
      login(username, pass, setUser);
    } else if (email && email.includes("@")) {
      createUser(username, email, pass, setUser);
    }
  };
  return (
    <>
      {user && <Navigate to='/home' />}
      <form className='form_wrap' onSubmit={submitHandler}>
        <input
          className='form_item'
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Username'
        />

        {!bool && (
          <input
            className='form_item'
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Email'
            type='email'
          />
        )}

        <input
          className='form_item'
          onChange={(event) => setPass(event.target.value)}
          placeholder='Password'
          type='password'
        />
        <button className='login_btn' type='submit'>
          Submit
        </button>
        <button className='signin_btn' onClick={() => setBool(!bool)}>
          Log-in or Sign-up
        </button>
      </form>
    </>
  );
};
