import React, { useEffect, useState } from "react";
import axios from "axios";

// CSS module for product layout
import classes from "./product.module.css";

// Loading spinner component
import Loader from "../../Pages/Loader/Loader";

// Individual product card component
import ProductCard from "./ProductCard";

// API base URL
import { FakeStoreAPI_BaseURL } from "../../API/endPoints";

const Product = () => {
  /* STATE MANAGEMENT */

  // Stores fetched products
  const [products, setProducts] = useState([]);

  // Controls loading spinner visibility
  const [isLoading, setIsLoading] = useState(false);

  /* FETCH PRODUCTS FROM API */
  useEffect(() => {
    // Show loader before API call
    setIsLoading(true);

    axios
      .get(`${FakeStoreAPI_BaseURL}/products`)
      .then((response) => {
        setProducts(response.data); // Save products to state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide loader (success or error)
      });
  }, []);

  /* RENDER UI */
  return (
    <>
      {isLoading ? (
        // Show loader while data is loading
        <Loader />
      ) : (
        // Display products once data is loaded
        <section className={classes.products_container}>
          {products.map((product) => (
            <ProductCard
              key={product.id} // Unique key for React
              product={product} // Product data
              renderAdd={true} // Show "Add to Cart" button
            />
          ))}
        </section>
      )}
    </>
  );
};

export default Product;
