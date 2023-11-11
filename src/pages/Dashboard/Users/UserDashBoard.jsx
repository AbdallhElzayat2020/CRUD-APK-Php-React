import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
const UserDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/user/show", {
          headers: {
            Accept: "appilcation/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [run]);
  // delete user
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Accept: "appilcation/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showUsers =
    users.length > 0 ? (
      users.map((user, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <Link to={`${user.id}`}>
              <AiFillEdit
                size={25}
                className="inline-block text-blue-500 cursor-pointer "
              />
            </Link>
            <AiFillDelete
              onClick={() => deleteUser(user.id)}
              size={25}
              className="inline-block text-red-500 ml-3 cursor-pointer"
            />
          </td>
        </tr>
      ))
    ) : (
      <p>No Users Found</p>
    );
  return (
    <>
      {loading ? (
        <p className="text-center text-3xl flex font-bold items-center justify-center relative top-[50%]">
          Loading
        </p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th className="text-lg font-bold" scope="col">
                  ID
                </th>
                <th className="text-lg font-bold" scope="col">
                  User
                </th>
                <th className="text-lg font-bold" scope="col">
                  Email
                </th>
                <th className="text-lg font-bold" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{showUsers}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserDashBoard;
