// React (needed for JSX)
import React from "react";

// Menu icon
import { AiOutlineMenu } from "react-icons/ai";

// CSS module for scoped styles
import styles from "./header.module.css";

const LowerHeader = () => {
  return (
    /* Lower navigation bar container */
    <div className={styles.lower__container}>
      <ul>
        {/* "All" menu with hamburger icon */}
        <li className={styles.menu}>
          <AiOutlineMenu />
          <p>All</p>
        </li>

        {/* Navigation links */}
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
