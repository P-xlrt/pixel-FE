//  Footer -
import { Link } from "react-router-dom";
import "../styling/footer.css";
export const Footer = () => {
  return (
    <nav className='footer_nav'>
      <Link to='/team'>Meet the Team</Link>
      <p>©Copyright p:xlrt MMXXII</p>
    </nav>
  );
};
