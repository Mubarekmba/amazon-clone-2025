import { useContext } from "react";
import { Link } from "react-router-dom";

// Icons
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

// Assets & styles
import amazon_letter_logo from "../../assets/amazon_letter_white_logo.png";
import styles from "./header.module.css";

// Context & Firebase
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utility/firebase";
import { Type } from "../../utility/action.type";

// Sub-header
import LowerHeader from "./LowerHeader";

const Header = () => {
  /**
   * Global state from Context
   * - user: logged-in user info
   * - basket: shopping cart items
   */
  const [{ user, basket }, dispatch] = useContext(DataContext);

  /**
   * Calculate total number of items in cart
   * (sums item.amount from basket)
   */
  const totalItem = basket?.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  /**
   * Handles user sign-out
   * - Clears basket
   * - Signs out user from Firebase Auth
   */
  const handleSignOutAndClearCart = () => {
    if (user) {
      dispatch({ type: Type.EMPTY_BASKET });
      auth.signOut();
    }
  };

  return (
    <section className={styles.fixed}>
      <section>
        <div className={styles.header__container}>
          {/* ================= Logo & Delivery ================= */}
          <div className={styles.logo__container}>
            <Link to="/">
              <img src={amazon_letter_logo} alt="Amazon logo" />
            </Link>

            <div className={styles.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* ================= Search Bar ================= */}
          <div className={styles.search}>
            <select>
              <option>All</option>
              <option>Art and crafts</option>
              <option>Automotive</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Software</option>
              <option>Baby</option>
            </select>

            <input type="text" placeholder="Search Amazon" />
            <BsSearch size={42} />
          </div>

          {/* ================= User / Orders / Cart ================= */}
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

            {/* Sign In / Sign Out */}
            <Link to={!user ? "/auth" : "#"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={handleSignOutAndClearCart}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* Orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
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
