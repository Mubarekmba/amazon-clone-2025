import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Layout wrapper (Header + Footer)
import Layout from "../../components/Layout/Layout";

// Global state context
import { DataContext } from "../../components/DataProvider/DataProvider";

// Action types for reducer
import { Type } from "../../Utility/action.type";

// Styles
import styles from "./cart.module.css";

// Utility components
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import ProductCard from "../../components/Product/ProductCard";

// Icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillCartXFill } from "react-icons/bs";

const Cart = () => {
  /**
   * Access global state and dispatch function
   * - user: logged-in user
   * - basket: cart items
   */
  const [{ user, basket }, dispatch] = useContext(DataContext);

  /**
   * Calculate total cart price
   * price × quantity for each item
   */
  const totalAmount = basket.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  /**
   * Increase item quantity
   */
  const incrementItem = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  /**
   * Decrease item quantity
   */
  const decrementItem = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={styles.container}>
        {/* ================= CART ITEMS ================= */}
        <div className={styles.cart__container}>
          {/* Header section */}
          <div className={styles.cart_header}>
            <div>
              <h2>Hello {user?.email?.split("@")[0]}</h2>
              <h3>Your shopping basket</h3>
            </div>

            {/* Clear all items button */}
            {basket.length > 0 && (
              <button
                className={styles.clear_all_items_btn}
                onClick={() => dispatch({ type: Type.EMPTY_BASKET })}
              >
                <BsFillCartXFill size={20} />
                Clear All Items
              </button>
            )}
          </div>

          <hr />

          {/* Empty cart message */}
          {basket.length === 0 ? (
            <p className={styles.empty_cart}>Oops! No items in your cart.</p>
          ) : (
            basket.map((item) => (
              <section className={styles.cart_product} key={item.id}>
                {/* Product info */}
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                  showRemoveItem={true}
                />

                {/* Quantity controls */}
                <div className={styles.btn_container}>
                  <button
                    className={styles.btn}
                    onClick={() => incrementItem(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>

                  <span>{item.amount}</span>

                  <button
                    className={styles.btn}
                    onClick={() => decrementItem(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {/* ================= SUBTOTAL ================= */}
        {basket.length > 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={totalAmount} />
            </div>

            <div className={styles.gift_option}>
              <input type="checkbox" id="giftCheckBox" />
              <label htmlFor="giftCheckBox">
                <small>This order contains a gift</small>
              </label>
            </div>

            <Link to="/payments" className={styles.checkout_btn}>
              Continue to checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
