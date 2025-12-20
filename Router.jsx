import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./src/Pages/Landing/Landing";
import Cart from "./src/Pages/Cart/Cart";
import Orders from "./src/Pages/Orders/Orders";
import Results from "./src/Pages/Results/Results";
import ProductDetail from "./src/Pages/ProductDetail/ProductDetail";
import Product from "./src/components/Product/Product";
import PageNotFound from "./src/Pages/PageNotFound/PageNotFound";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;
