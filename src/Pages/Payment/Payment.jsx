import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import styles from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";

// stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// axios
import { axiosInstance } from "../../API/axios";

// 🔥 FIREBASE v9 FIX
import { db } from "../../utility/firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((allocator, item) => {
    return item.price * item.amount + allocator;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // 1️⃣ get client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientPaymentSecret;

      // 2️⃣ confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3️⃣ SAVE ORDER (🔥 v9 syntax)
      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.error(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>

      <section className={styles.payment}>
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />

        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={styles.payment__price}>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order |</p>
                    <CurrencyFormat amount={total} />
                  </span>

                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
