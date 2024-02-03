import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const glass = {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    height: "80vh",
  };
  return (
    <div className=" h-[80vh]">
      <div
        className="w-[85%] pl-3 mx-auto my-5 border-2  flex justify-around items-center"
        style={glass}
      >
        <div className="min-h-[60vh] w-[600px] flex flex-col justify-around items-center">
          <div className="">
            <h1 className=" font-rubik font-extrabold text-3xl ">
              Hello Again!
            </h1>
            <p>Enter your details below to access your account</p>
          </div>

          <form className=" flex flex-col justify-center items-center">
            <label>Email</label>
            <input
              className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
              type="text"
              placeholder="Email"
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
              placeholder="Password"
            />
            <br />
            <button
              type="submit"
              className="w-[100px] h-[40px] rounded-[20px] border-2 border-[#7491e1] hover:bg-[#7491e1] hover:text-white hover:border-[#e6dcec] hover:border-2 transition duration-500"
            >
              Login
            </button>
            <br />
            <p>
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="underline">Sign Up</span>
              </Link>
            </p>
          </form>
        </div>
        <div>
          <img src="./login.svg" alt="login" height={600} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Login;
