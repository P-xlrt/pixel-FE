//  Footer -
import { Link } from "react-router-dom";
import "../styling/footer.css";
export const Footer = () => {
  return (
    <footer className='footer_wrap'>
      <h2>Connect with Us</h2>
      <nav className='footer_nav'>
        <div>
          <Link to='/team'>Meet the Team</Link>
        </div>
        {/* Social Media Icons */}
        <ul>
          <li>
            <a href='#'>
              <i className='fab fa-facebook fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fab fa-instagram fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fab fa-twitter fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fab fa-pinterest fa-lg'></i>
            </a>
          </li>
        </ul>
      </nav>

      <p>© P:xlrt MMXXII</p>
    </footer>
  );
};
