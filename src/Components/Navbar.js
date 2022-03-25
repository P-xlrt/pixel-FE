import React, {useState} from 'react'
import { Link } from "react-router-dom";
import {Dropdown} from "./Dropdown"
import "../styling/navbar.css";

export const Navbar = () => {
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
      <nav className='main-nav'>
        <Link to='/gallery' className='navbar-logo'>WebsiteLogo</Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/create' className='nav-links' onClick={closeMobileMenu}>
              Create
              </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
              Log In or Sign Up
              </Link>
          </li>
          <li className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Menu
              </Link>
              {dropdown && <Dropdown />}
          </li>

        </ul>
        {/* <Link to='/create'>Create</Link>
        <Link to='/login'>Login</Link>
        <Link to='/gallery'>Gallery</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/settings'>Settings</Link>
        <Link to='/'>Log Out</Link> */}
      </nav>
    </>
  );
};


// export const Navbar = () => {
//   return (
//     <nav className='main_nav'>
//       <Link to='/logo'>
//         <img src='' alt='logo' />
//       </Link>
//       <Link to='/settings'>Settings</Link>
//       <Link to='/login'>Login</Link>
//       <Link to='/gallery'>Gallery</Link>
//       <Link to='/create'>Create</Link>
//       <Link to='/profile'>Profile</Link>
//       <Link to='/settings'>Settings</Link>
//     </nav>
//   );
// };
