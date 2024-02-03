import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lottie/shoppingCart.json";
import animationData2 from "../lottie/orderPlaced.json";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [conform, setConform] = useState(false);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

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
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast("Cart Increased", {
      icon: "😊",
      style: { background: "#97eecc" },
    });
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
    toast("Cart Decreased", {
      icon: "😒",
      style: { background: "#f84949" },
    });
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
    toast.error("Cart Removed");
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = () => {
    if (user.length === 0) {
      navigate("/login");
    } else {
      setConform(true);
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return loading ? null : (
    <div className="cart-container relative">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img
                      src={cartItem.image}
                      style={{ width: "100px", height: "100px" }}
                      alt={cartItem.title}
                    />
                    <div>
                      <h3>{cartItem.title}</h3>

                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">₹{cartItem.amount}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ₹{cartItem.amount * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">₹{cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={() => handleCheckout()}>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
      {conform && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={() => {
            handleClearCart();
            navigate("/");
            setConform(false);
          }}
        ></div>
      )}
      {!conform ? null : (
        <div>
          <div className="h-[320px] w-[500px] absolute bg-white shadow-lg top-[20%] left-[35%] flex flex-col justify-around items-center">
            <div>
              <Lottie options={defaultOptions2} height={200} width={200} />
            </div>
            <h1>Your Order is Placed</h1>
            <button
              className="w-[100px] h-[40px] rounded-[20px] border-2 border-[#7491e1] hover:bg-[#7491e1] hover:text-white hover:border-[#e6dcec] hover:border-2 transition duration-500 mb-2"
              onClick={() => {
                setConform(false);
                handleClearCart();
                navigate("/");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
