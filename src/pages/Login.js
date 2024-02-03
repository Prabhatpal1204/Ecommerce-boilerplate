import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const [loading, setLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //since I only have json server and can't check the user from the server I will take  users array  to check the user
  const glass = {
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    height: "80vh",
  };
  const navigate = useNavigate();
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const data = await response.json();
        setLoading(false);
        setUser(data);
        if (user.length > 0) {
          if (user[0].loggedIn) navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handelLogin = (e) => {
    // console.log(user);
    // console.log(email, password);
    e.preventDefault();
    const regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    const userIndex = user.findIndex((u) => {
      console.log(u.email);
      return u.email === email;
    });
    if (userIndex !== -1) {
      if (user[userIndex].password === password) {
        fetch(`http://localhost:8000/users/${user[userIndex].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loggedIn: true }),
        })
          .then(() => {
            window.location.href = "http://localhost:3000/";
          })
          .catch((error) => {
            console.error("Error during login:", error.message);
          });
      } else {
        toast.error("Password did not match");
      }
    } else {
      alert("User not found");
    }
  };
  return (
    <>
      {loading ? null : (
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  className="p-2 w-[400px] h-[40px] border-2 border-[#ebe9e9] rounded-[10px]"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  type="submit"
                  className="w-[100px] h-[40px] rounded-[20px] border-2 border-[#7491e1] hover:bg-[#7491e1] hover:text-white hover:border-[#e6dcec] hover:border-2 transition duration-500"
                  onClick={(e) => handelLogin(e)}
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
      )}
      <Toaster />
    </>
  );
};

export default Login;
