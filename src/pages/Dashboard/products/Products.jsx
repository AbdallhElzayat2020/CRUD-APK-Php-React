import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/product/show", {
          headers: {
            Accept: "appilcation/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProducts(response.data);
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
        `http://127.0.0.1:8000/api/product/delete/${id}`,
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

  const ShowProdusts =
    products.length > 0 ? (
      products.map((product, index) => (
        <tr key={product.id}>
          <td>{index + 1}</td>
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>
            <Link to={`${product.id}`}>
              <AiFillEdit
                size={25}
                className="inline-block text-blue-500 cursor-pointer "
              />
            </Link>
            <AiFillDelete
              onClick={() => deleteUser(product.id)}
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
                  Title
                </th>
                <th className="text-lg font-bold" scope="col">
                  Description
                </th>
                <th className="text-lg font-bold" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{ShowProdusts}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Products;
