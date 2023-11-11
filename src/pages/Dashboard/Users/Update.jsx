import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Update.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
const Update = () => {
  const id = window.location.pathname.split("/").slice(-1)[0];
  // Cookies
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  // Get User
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res.data[0].name);
        setEmail(res.data[0].email);
        setLoading(false);
      });
  }, []);

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    try {
      // Send data
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordRepeat,
        },
        {
          headers: {
            Accept: "appilcation/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        nav("/dashboard/users");
      }
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
    } finally {
      setAccept(true);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <p className="text-center text-3xl flex font-bold items-center justify-center relative top-[50%]">
          Loading
        </p>
      ) : (
        <>
          <h1 className="text-center text-2xl">Update User</h1>
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
                  Create User
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Update;
