//  Footer -
import { Link } from "react-router-dom";
import "../styling/footer-style.css";
export const Footer = () => {
  return (
    <section className='footer_wrap'>
      <h2>Connect with Us</h2>
      <nav className='footer_nav'>
        <div>
          <Link to='/team'>Meet the Team</Link>
        </div>
        {/* Social Media Icons */}
        <ul>
          <li>
            <a href='#'>
              <i class='fab fa-facebook fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i class='fab fa-instagram fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i class='fab fa-twitter fa-lg'></i>
            </a>
          </li>
          <li>
            <a href='#'>
              <i class='fab fa-pinterest fa-lg'></i>
            </a>
          </li>
        </ul>
      </nav>

      <p>© P:xlrt MMXXII</p>
    </section>
  );
};
