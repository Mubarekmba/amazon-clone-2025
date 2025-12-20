import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// API base URL
import { FakeStoreAPI_BaseURL } from "../../API/EndPoints";

// Layout wrapper
import Layout from "../../components/Layout/Layout";

// Loading indicator
import Loader from "../Loader/Loader";

// Reusable product card
import ProductCard from "../../components/Product/ProductCard";

const ProductDetail = () => {
  /* ===============================
     STATE
     =============================== */
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ===============================
     ROUTE PARAM
     =============================== */
  // Extract productId from URL
  const { productId } = useParams();

  /* ===============================
     FETCH PRODUCT BY ID
     =============================== */
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${FakeStoreAPI_BaseURL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]); // Re-fetch if URL param changes

  /* ===============================
     RENDER UI
     =============================== */
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        product && (
          <ProductCard
            product={product}
            flex={true}
            renderDesc={true}
            renderAdd={true}
          />
        )
      )}
    </Layout>
  );
};

export default ProductDetail;
