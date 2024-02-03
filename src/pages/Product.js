import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast("Added to Cart", {
      icon: "😊",
      style: { background: "#97eecc" },
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>; // or handle loading state
  }

  return (
    <div className="w-[80%] mx-auto h-[600px]  mt-4 flex justify-between items-center">
      <div>
        <img src={product.image} alt="product" width={300} />
      </div>
      <div className=" h-[80%] my-auto  bg-slate-500 rounded-full w-[0.6px] "></div>
      <div className="max-w-[650px] h-[80%] my-auto  flex flex-col justify-around">
        <div>
          <h1 className=" font-mono font-extrabold text-4xl">
            {product.title}
          </h1>
          <p className=" font-thin text-sm mt-2">{product.description}</p>
          <h2 className="text-2xl font-bold mt-4">Price - ₹{product.amount}</h2>
        </div>

        <div className=" w-[40%] flex justify-between">
          <button
            className="h-[60px] w-[120px] border-2 border-black hover:bg-black hover:text-white text-lg"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button className="h-[60px] w-[120px]  bg-black text-white hover:bg-white hover:border-2 hover:border-black hover:text-black text-lg">
            Buy Now
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Product;
