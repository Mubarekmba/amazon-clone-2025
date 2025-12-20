// React hook for accessing context
import { useContext } from "react";

// CSS module for scoped styles
import styles from "./header.module.css";

// React Router link for navigation without page reload
import { Link } from "react-router-dom";

// Icons
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

// Assets
import amazonLogo from "../../assets/amazon_letter_white_logo.png";

// Global state (basket/cart data)
import { DataContext } from "../DataProvider/DataProvider.jsx";

// Lower navigation bar component
import LowerHeader from "./LowerHeader";

const Header = () => {
  /**
   * Access global state from DataContext
   * We only need `basket`, so we destructure it
   */
  const [{ basket }] = useContext(DataContext);

  /**
   * Calculate total number of items in the cart
   * `reduce` loops through the basket and sums item.amount
   */
  const totalItems = basket?.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <section className={styles.fixed}>
      {/* Main Header */}
      <section>
        <div className={styles.header__container}>
          {/* ---------------- LOGO & DELIVERY ---------------- */}
          <div className={styles.logo__container}>
            <Link to="/">
              <img src={amazonLogo} alt="Amazon logo" />
            </Link>

            <div className={styles.delivery}>
              <SlLocationPin />
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* ---------------- SEARCH BAR ---------------- */}
          <div className={styles.search}>
            <select>
              <option>All</option>
              <option>Art and Crafts</option>
              <option>Automotive</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Software</option>
              <option>Baby</option>
            </select>

            <input type="text" placeholder="Search Amazon" />
            <BsSearch size={42} />
          </div>

          {/* ---------------- RIGHT MENU ---------------- */}
          <div className={styles.order__container}>
            {/* Language selector */}
            <Link to="/" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US Flag"
              />
              <select>
                <option>EN</option>
              </select>
            </Link>

            {/* Account section (static – no authentication yet) */}
            <Link to="/">
              <div>
                <p>Hello, Guest</p>
                <span>Account & Lists</span>
              </div>
            </Link>

            {/* Orders page */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* Shopping Cart */}
            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lower navigation bar */}
      <LowerHeader />
    </section>
  );
};

export default Header;
