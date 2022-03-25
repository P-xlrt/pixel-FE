import { Link } from "react-router-dom";
import { usePopper } from "react-popper";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from "react-bootstrap"
import "../styling/navbar.css";

export const Navbar = () => {
  return (
    // <nav className='main_nav'>
    //   <Link to='/logo'>
    //     <img src='' alt='logo' />
    //   </Link>
    //   <Link to='/create'>Create</Link>
    //   <Link to='/login'>Login</Link>
    //   <Dropdown>
    //     <Dropdown.Toggle variant="success" id="userDropdown">Menu</Dropdown.Toggle>
    //     <Dropdown.Menu variant="dark">
    //       <Dropdown.Item><Link to='/gallery'>Public gallery</Link></Dropdown.Item>
    //       <Dropdown.Item><Link to='/profile'>Profile</Link></Dropdown.Item>
    //       <Dropdown.Item><Link to='/settings'>Settings</Link></Dropdown.Item>
    //       <Dropdown.Divider />
    //       <Dropdown.Item style="color:#8A1953"><Link to='/'>Log Out</Link></Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown>
    // </nav>
  );
};
