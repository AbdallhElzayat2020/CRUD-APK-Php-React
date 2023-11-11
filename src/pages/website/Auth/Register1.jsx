import axios from "axios";
import Nav from "../../website/Nav";
import { useContext, useState } from "react";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Register1 = () => {
  // Cookies
  const cookie = new Cookies();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  // Get User
  const regUser = useContext(User);

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    try {
      // Send data
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordRepeat,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;
      regUser.setAuth({ token, userDetails });
      nav("/dashboard");
      // regUser.setAuth({ token, userDetails });
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
        console.log(err.response.status);
      }
      setAccept(true);
    }
  };
  return (
    <>
      <Nav />
      <div className="register flex items-center justify-center">
        <div className="container flex items-center justify-center flex-col h-[80vh]">
          <form onSubmit={handleSubmit} action="" className="">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 3 && accept && (
              <p className="error">Name Must Be more than 3 characters</p>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            {accept && emailError && (
              <p className="error">Email Is already taken</p>
            )}
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
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input
              type="password"
              placeholder="Enter password Repeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              id="passwordRepeat"
            />
            {passwordRepeat !== password && accept && (
              <p className="text-red-500 text-[12px] my-[15px]">
                Passwords do not match
              </p>
            )}
            <button
              className="py-[10px] btn transition-all text-center px-[25px] mx-auto mt-4 flex items-center justify-center "
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register1;
