import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "../styling/dropdown.css";

export const Dropdown = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown menu'}>
                <li>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link 
                                className={item.cName} 
                                to={item.path} 
                                onClick={() => setClick(false)}>{item.name}</Link>
                            </li>
                        );
                    })}
                </li>
            </ul>
        </>
    );
};



{/* <li className='nav-item'>
            <Link to='/gallery' className='nav-links' onClick={closeMobileMenu}>
              Public Gallery
              </Link>
          </li>
          <li className='nav-item'>
            <Link to='/user' className='nav-links' onClick={closeMobileMenu}>
              Profile
              </Link>
          </li>
          <li className='nav-item'>
            <Link to='/settings' className='nav-links' onClick={closeMobileMenu}>
              Settings
              </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Log Out
              </Link>
          </li> */}