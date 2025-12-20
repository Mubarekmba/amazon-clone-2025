import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// API base URL
import { FakeStoreAPI_BaseURL } from "../../API/EndPoints";

// Layout wrapper
import Layout from "../../components/Layout/Layout";

// Loading indicator
import Loader from "../Loader/Loader";

// Product card component
import ProductCard from "../../components/Product/ProductCard";

// Styles
import styles from "./results.module.css";

const Results = () => {
  /* ===============================
     ROUTE PARAM
     =============================== */
  // Get category name from URL
  const { categoryName } = useParams();

  /* ===============================
     STATE
     =============================== */
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ===============================
     FETCH PRODUCTS BY CATEGORY
     =============================== */
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${FakeStoreAPI_BaseURL}/products/category/${categoryName}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category results:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryName]);

  /* ===============================
     RENDER UI
     =============================== */
  return (
    <Layout>
      <section>
        {/* Page heading */}
        <h1 className={styles.title}>Results</h1>
        <p className={styles.category}>
          Category / <strong>{categoryName}</strong>
        </p>

        <hr />

        {/* Loading or product list */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {results.length === 0 ? (
              <p className={styles.no_results}>
                No products found in this category.
              </p>
            ) : (
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Results;
