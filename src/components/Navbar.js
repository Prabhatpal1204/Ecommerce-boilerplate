import React from "react";
import { ShoppingCart } from "lucide-react";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState([]);
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // You may need to include additional headers, such as authentication headers
        },
      });

      if (!response.ok) {
        // Handle error responses here
        const errorMessage = await response.text();
        throw new Error(`Delete request failed: ${errorMessage}`);
      }

      // Deletion successful, you can handle the success response here
      const successMessage = await response.json();
      console.log("User deleted successfully:", successMessage);
    } catch (error) {
      console.error("Error during delete request:", error.message);
    }
  };

  const handelLogout = () => {
    deleteUser(user[0].id);
    window.location.reload();
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        setLoading(false);
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  const cart = useSelector((state) => state.cart);
  const totalCartQuantity = cart.cartItems.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );
  return (
    <>
      {loading ? null : (
        <nav className="w-[90%] mx-auto h-[90px] mb-1 rounded-full bg-[#a49cfdbd] mt-2 flex items-center shadow-lg justify-between">
          <Link to="/">
            <div className="flex justify-center items-center ml-20">
              <img src="/shopkart.png" alt={"logo"} height={60} width={60} />
              <h1 className=" font-protest font-bold text-3xl"> ShopKart. </h1>
            </div>
          </Link>

          <div>
            <ul className="flex justify-around items-center w-[300px] mr-20">
              <Link to="/">
                <li className=" font-protest font-bold text-xl hover:text-white cursor-pointer">
                  Products
                </li>
              </Link>
              {user[0] === undefined ? (
                <Link to="/login">
                  <li className=" font-protest font-bold text-xl hover:text-white cursor-pointer">
                    Login
                  </li>
                </Link>
              ) : (
                <Link to="/">
                  <li
                    className=" font-protest font-bold text-xl hover:text-white cursor-pointer"
                    onClick={() => handelLogout()}
                  >
                    Logout
                  </li>
                </Link>
              )}

              <Link to="/cart">
                <li className="relative">
                  <ShoppingCart size={25} />
                  {totalCartQuantity > 0 ? (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      {totalCartQuantity}
                    </span>
                  ) : null}
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
