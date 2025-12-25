import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./orders.module.css";
import { db } from "../../utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { BiLoader } from "react-icons/bi";
import moment from "moment";

// 🔥 FIREBASE v9 IMPORTS
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    // 🔥 v9 Firestore query
    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          created: doc.data().created,
          amount: doc.data().amount,
          data: doc.data(),
        }))
      );
    });

    // cleanup listener
    return () => unsubscribe();
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2 style={{ margin: "20px" }}>Your Orders</h2>

          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}

          <div>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    fontWeight: "500",
                    borderBottom: "1px solid black",
                  }}
                >
                  <p>
                    Order ID:{" "}
                    <span style={{ color: "var(--primary-shade)" }}>
                      {eachOrder?.id}
                    </span>
                  </p>

                  <p>
                    Total Amount:{" "}
                    <span style={{ color: "var(--primary-shade)" }}>
                      ${eachOrder?.amount.toLocaleString()}
                    </span>
                  </p>

                  <p>
                    Purchased Date:{" "}
                    <span style={{ color: "var(--primary-shade)" }}>
                      {moment(eachOrder?.created * 1000).format(
                        "dddd, MMM DD, YYYY h:mm A"
                      )}
                    </span>
                  </p>
                </div>

                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard
                    key={order.id}
                    flex={true}
                    product={order}
                    itemAmount={order.amount}
                    total={true}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
