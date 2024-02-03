import React from "react";
import ProductCard from "../components/ProductCard.js";
import data from "../data.json";

const ProductList = () => {
  const products = data.product;

  return (
    <main className="w-[80%] mx-auto mt-8 flex items-center justify-around flex-wrap gap-6 mb-2">
      <ProductCard products={products} />
    </main>
  );
};

export default ProductList;
