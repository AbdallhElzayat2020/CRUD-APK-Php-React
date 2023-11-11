import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Nav = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const nav = useNavigate();
  const Logout = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
        headers: {
          Accept: "appilcation/json",
          Authorization: `Bearer ${token}`,
        },
      });
      cookie.remove("Bearer");
      // window.location.pathname = "/";
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="nav bg-[#0063f7] flex items-center px-6 py-[15px]  ">
      <div className="container w-[1200px]  max-w-full flex items-center justify-between">
        <Link to="/" className="logo font-bold text-white">
          LOGO
        </Link>
        <ul className="nav-links text-white flex gap-[25px]">
          <li>
            <Link
              className="hover:underline transition-all duration-300 hover:text-gray-100"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline transition-all duration-300 hover:text-gray-100"
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
        <div className="buttons text-white flex gap-[30px]">
          <>
            {!token ? (
              <>
                <Link className="btn" to="/register">
                  Register
                </Link>
                <Link className="btn" to="/Login">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link className="btn" to="/dashboard">
                  DashBoard
                </Link>
                <div className="btn" onClick={Logout}>
                  Logout
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Nav;
