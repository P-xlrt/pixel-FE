//  Footer -
import { Link } from "react-router-dom";
import "../styling/footer.css";
export const Footer = () => {
  return (
    <footer className='footer_wrap'>
      {/* <h2>Connect with us</h2> */}
      <nav className='footer_nav'>
        
        <div className="footer_item">
          <Link className="footer_link" to='/team'>Meet the Team</Link>
        </div>
        {/* Social Media Icons */}
        <ul className="footer_item">
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
        <p className="footer_item">© P:xlrt MMXXII</p>
      </nav>
      

      
    </footer>
  );
};
