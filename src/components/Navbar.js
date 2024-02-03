import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-[90%] mx-auto h-[90px] rounded-full bg-[#a49cfdbd] mt-2 flex items-center shadow-lg justify-between">
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

          <Link to="/login">
            <li className="font-protest font-bold text-xl hover:text-white cursor-pointer">
              Login
            </li>
          </Link>
          <Link to="/cart">
            <li>
              <ShoppingCart size={25} />
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
