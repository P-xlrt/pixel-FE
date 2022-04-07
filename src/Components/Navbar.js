import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import "../styling/navbar.css";

export const Navbar = ({ user }) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/gallery' className='navbar-logo'>
          <h1>
            P<span>:</span>xlrt
          </h1>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className='nav-item'>
            <Link to='/create' className='nav-links create_link' onClick={closeMobileMenu}>
              Create
            </Link>
          </li>
          <li className='nav-item'>

          {(!user) && <Link to='/login' className='nav-links login_text' onClick={closeMobileMenu}>Login/Sign-up</Link>}
            
          </li>
          <li
            className='nav-item user_icon'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={closeMobileMenu}
            id='nav-links'
          >
            <i className="fas fa-user-cog"></i>
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </nav>
    </>
  );
};
