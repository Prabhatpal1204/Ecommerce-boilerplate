import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        console.log(data);
        if (user[0].loggedIn) navigate("/");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");
  const glass = {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    height: "80vh",
  };
  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Handle error responses here
        const errorMessage = await response.text();
        throw new Error(`Signup failed: ${errorMessage}`);
      }

      // Signup successful, you can handle the success response here
      const successMessage = await response.json();
      toast.success("Signup successful");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
      console.log("Signup successful:", successMessage);
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  // Example usage:
  const userCredentials = {
    email,
    password,
    username,
    loggedIn: false,
  };

  const handleSignup = (e) => {
    e.preventDefault();
    //regx for email
    const regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Invalid Email");
      setEmail("");

      return;
    }
    if (password.length < 6) {
      toast.error("Password should be atleast 6 characters long");

      setPassword("");

      return;
    }
    if (username.length < 3) {
      toast.error("Username should be atleast 3 characters long");

      setuserName("");
      return;
    }
    signup(userCredentials);
    setEmail("");
    setPassword("");
    setuserName("");
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
              Hey First Time!
            </h1>
            <p>Enter your details below to start accessing your account</p>
          </div>
          <br />
          <form className=" flex flex-col justify-center items-center">
            <label>Name</label>
            <input
              className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            <br />
            <label>Email</label>
            <input
              className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button
              type="submit"
              className="w-[100px] h-[40px] rounded-[20px] border-2 border-[#7491e1] hover:bg-[#7491e1] hover:text-white hover:border-[#e6dcec] hover:border-2 transition duration-500"
              onClick={(e) => handleSignup(e)}
            >
              Sign Up
            </button>
            <br />
            <p>
              Have an account?{" "}
              <Link to="/Login">
                <span className="underline p-1">Login</span>
              </Link>
            </p>
          </form>
        </div>
        <div>
          <img src="./login.svg" alt="Signup" height={600} width={600} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
