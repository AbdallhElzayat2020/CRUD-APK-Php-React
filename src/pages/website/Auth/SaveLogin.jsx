import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import Loading from "../../../components/Loading/Loading";
import Cookies from "universal-cookie";
const SaveLogin = () => {
  // Get Current User
  const context = useContext(User);
  const token = context.auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  //loading
  const [loading, SetLoading] = useState(true);
  // refresh token
  useEffect(() => {
    const refresh = async () => {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Accept: "appilcation/json",
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((res) => {
            cookie.set("Bearer", res.data.token);
            context.setAuth(() => {
              return {
                token: res.data.token,
                userDetails: res.data.user,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        SetLoading(false);
      }
    };
    !token ? refresh() : SetLoading(false);
  }, []);
  return loading ? <Loading /> : <Outlet />;
};

export default SaveLogin;
