import React from "react";
import Category from "../../components/Category/Category";
import CarouselEffect from "../../components/Carousel/Carousel";
import Product from "../../components/Product/Product";
import Layout from "../../components/Layout/Layout";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing;
