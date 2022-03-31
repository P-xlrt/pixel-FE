// Form which allows the user to login into the app
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUser, login, tokenLogin } from "../utils";
import "../styling/login.css";

export const Login = ({ user, setUser }) => {
  //set variables
  const [username, setUsername] = useState(); // getter and setter - user is the default state, setUser
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [bool, setBool] = useState(false);
  // const [loginMsg, setLoginMsg] = useState(
  //   "Already have an account? (Sign-in)"
  // );

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
      {user && <Navigate to='/Landing' />}
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
        <button className='login_btn' type='sign-up'>
          Submit
        </button>
        <button
          className='signin_btn'
          onClick={() => {
            setBool(!bool);
          }}
        >
          {!bool
            ? "Already have an account? (Sign-in)"
            : "Create an Account Instead"}{" "}
          <i className='fas fa-sign-in-alt'></i>
        </button>
      </form>
    </>
  );
};
