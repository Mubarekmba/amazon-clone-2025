import React, { useContext } from "react";
import { Link } from "react-router-dom";

// UI & utilities
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { BsFillCartXFill } from "react-icons/bs";

// Styles & state
import styles from "./product.module.css";
import { Type } from "../../utility/action.type.js";
import { DataContext } from "../DataProvider/DataProvider.jsx";

function ProductCard({
  product, // product object (image, title, price, etc.)
  flex, // enables horizontal (flex) layout
  renderDesc, // shows description when true
  renderAdd, // shows "Add to Cart" button
  showRemoveItem, // shows "Remove Item" button
  itemAmount, // quantity of this product (used in orders/cart)
  total, // shows total price (price × quantity)
}) {
  /**
   * Destructure product safely
   */
  const { image, title, id, rating, price, description } = product;

  /**
   * Access global state & dispatch from Context API
   */
  const [, dispatch] = useContext(DataContext);

  /**
   * Add product to basket
   */
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${styles.card__container} ${
        flex ? styles.product__flexed : ""
      }`}
    >
      {/* ================= Product Image ================= */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={styles.img_container} />
      </Link>

      <div>
        {/* ================= Product Title ================= */}
        <h3>{title}</h3>

        {/* ================= Description (optional) ================= */}
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}

        {/* ================= Rating ================= */}
        <div className={styles.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>

        {/* ================= Price & Quantity ================= */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Price */}
          <CurrencyFormat amount={price} />

          {/* Quantity (Orders / Cart) */}
          {itemAmount && (
            <p style={{ fontWeight: "500", color: "var(--primary-color)" }}>
              Quantity: {itemAmount}
            </p>
          )}

          {/* Total price (Orders page) */}
          {total && (
            <p style={{ fontWeight: "500", color: "var(--primary-color)" }}>
              Total: ${price * itemAmount}
            </p>
          )}

          {/* ================= Remove Item Button ================= */}
          {showRemoveItem && (
            <button
              className={styles.button}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
                padding: "5px",
              }}
              onClick={() =>
                dispatch({
                  type: Type.REMOVE_ITEM_IMMEDIATELY,
                  id,
                })
              }
            >
              <BsFillCartXFill size={20} />
              Remove Item
            </button>
          )}
        </div>

        {/* ================= Add to Cart Button ================= */}
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
