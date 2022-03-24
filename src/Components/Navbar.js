import { Link } from "react-router-dom";
import "../styling/navbar.css";
export const Navbar = () => {
  return (
    <nav className='main_nav'>
      <Link to='/logo'>
        <img src='' alt='logo' />
      </Link>
      <Link to='/settings'>Settings</Link>
      <Link to='/login'>Login</Link>
      <Link to='/gallery'>Gallery</Link>
      <Link to='/create'>Create</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/settings'>Settings</Link>
    </nav>
  );
};
