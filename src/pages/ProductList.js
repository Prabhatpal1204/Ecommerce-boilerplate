import React from "react";
import ProductCard from "../components/ProductCard.js";

import { DNA } from "react-loader-spinner";
const ProductList = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <main className="w-[80%] mx-auto mt-8 flex items-center justify-around flex-wrap gap-6 mb-2">
      {loading ? (
        <DNA type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
        <ProductCard products={products} />
      )}
    </main>
  );
};

export default ProductList;
