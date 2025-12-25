// Router.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Auth from "./src/Pages/Auth/Auth";
import Payment from "./src/Pages/Payment/Payment";
import Landing from "./src/Pages/Landing/Landing";
import Cart from "./src/Pages/Cart/Cart";
import Orders from "./src/Pages/Orders/Orders";
import Results from "./src/Pages/Results/Results";
import ProductDetail from "./src/Pages/ProductDetail/ProductDetail";
import PageNotFound from "./src/Pages/PageNotFound/PageNotFound";

// Components
import Product from "./src/components/Product/Product";
import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe public key safely from env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Home / Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Payments (Protected + Stripe Elements wrapper) */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg="Please sign in to complete your payment. (You'll be redirected to the checkout page)"
              redirect="/payments"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Category results */}
        <Route path="/category/:categoryName" element={<Results />} />

        {/* Product details */}
        <Route path="/products/:productId" element={<ProductDetail />} />

        {/* All products */}
        <Route path="/products" element={<Product />} />

        {/* Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;
