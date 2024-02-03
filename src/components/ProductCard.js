import React from "react";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
const ProductCard = ({ products }) => {
  const [isHoveredC, setIsHoveredC] = React.useState(false);
  const [isHoveredF, setIsHoveredF] = React.useState(false);

  return (
    <>
      {products.map((product) => {
        return (
          <div
            className=" rounded-[30px] group shadow-md relative w-[280px] hover:cursor-pointer "
            key={product.id}
          >
            <Link to={`/product/${product.id}`}>
              <div className="bg-[#f1f1f2] p-4 rounded-[30px] h-[330px] w-[280px] flex justify-center items-center">
                <div
                  className=" bg-white h-[240px] flex
         justify-center items-center w-[240px] rounded-[50%] overflow-hidden"
                >
                  <img src={product.image} alt="product" width={150} />
                </div>
              </div>

              <div className="h-[330px] w-[280px] group-hover:bg-[#00000032] absolute  top-0 rounded-[30px] transition duration-500"></div>
            </Link>
            <div className="w-[40%] left-[30%] hidden group-hover:flex justify-around absolute top-[87%] ">
              <div
                className="h-[35px] flex justify-center items-center hover:scale-[1.2] transition duration-500 w-[35px] hover:bg-blue-800 rounded-[50%] bg-white"
                onMouseEnter={() => setIsHoveredC(true)}
                onMouseLeave={() => setIsHoveredC(false)}
              >
                <ShoppingCart color={isHoveredC ? "white" : "black"} />
              </div>
              <div
                className="h-[35px] flex justify-center items-center w-[35px] rounded-[50%] hover:scale-[1.2] transition duration-500 bg-white hover:bg-red-600"
                onMouseEnter={() => setIsHoveredF(true)}
                onMouseLeave={() => setIsHoveredF(false)}
              >
                <Heart color={isHoveredF ? "white" : "black"} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
