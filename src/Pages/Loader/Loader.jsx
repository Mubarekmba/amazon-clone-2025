import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      {/* Spinner */}
      <ClipLoader size={50} color="#febd69" />

      {/* Loading text */}
      <p className={styles.loadingText}>Loading products...</p>
    </div>
  );
};

export default Loader;
