import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { User } from "./Context/UserContext";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  }, []);
  //show users
  const ShowProdusts = products.map((product) => (
    <div className="box" key={product.id}>
      <h1>{product.title}</h1>
      <h1>{product.description}</h1>
    </div>
  ));
  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Nav />
          <div className="home">
            <div className="container">
              <div className="boxes">
                <div className="box flex items-center justify-center">
                  {ShowProdusts}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
