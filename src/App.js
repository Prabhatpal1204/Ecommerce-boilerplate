import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.js";
import Product from "./pages/Product.js";
import Cart from "./pages/Cart.js";
import { Audio } from "react-loader-spinner";
const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        setLoading(false);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Audio type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            {user === undefined ? (
              <Route path="/" element={<ProductList />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {user === undefined ? (
              <Route path="/" element={<ProductList />} />
            ) : (
              <Route path="/signup" element={<SignUp />} />
            )}
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
};

export default App;
