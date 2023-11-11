import axios from "axios";
import { useContext, useState } from "react";
import Nav from "../Nav";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [Err, setErr] = useState(false);
  const regUser = useContext(User);
  // Cookies
  const cookie = new Cookies();
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    setErr(false);
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;
      regUser.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      setAccept(false);
      if (err.response && err.response.status === 401) {
        setErr(true);
      } else {
        console.error("Login error:", err);
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="register flex items-center justify-center">
        <div className="container flex items-center justify-center flex-col h-[80vh]">
          <form onSubmit={handleSubmit} action="" className="">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
            {password.length < 8 && accept && (
              <p className="text-red-500 text-[12px] my-[15px]">
                Password must be more than 8 characters
              </p>
            )}
            <button
              className="py-[10px] btn transition-all text-center px-[25px] mx-auto mt-4 flex items-center justify-center"
              type="submit"
            >
              Login
            </button>
            {Err && (
              <p className="error text-center">Wrong Email or password</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
