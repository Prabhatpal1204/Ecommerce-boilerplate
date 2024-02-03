import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.js";
import Product from "./pages/Product.js";
import Cart from "./pages/Cart.js";
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
