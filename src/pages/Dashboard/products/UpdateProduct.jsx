import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Context/UserContext";
const UpdateProduct = () => {
  //get id for products
  const id = window.location.pathname.split("/").slice(-1)[0];

  // Cookies
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  // Get User
  const context = useContext(User);
  const token = context.auth.token;
  //Products Data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "appilcation/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTitle(res.data[0].title);
        setDescription(res.data[0].description);
        // setLoading(false);
      });
  }, []);
  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    try {
      //send data and image
      const form_Data = new FormData();
      form_Data.append("title", title);
      form_Data.append("description", Description);
      form_Data.append("image", image);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        form_Data,
        {
          headers: {
            Accept: "appilcation/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        nav("/dashboard/products");
      }
    } catch (err) {
      console.log(err);
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
        <div className="register flex items-center justify-center">
          <div className="container flex items-center justify-center flex-col h-[80vh]">
            <form onSubmit={handleSubmit} action="" className="">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Enter Your Title"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {title.length < 1 && accept && (
                <p className="error">Title Must Be more than 3 characters</p>
              )}
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
              />
              {Description.length === "" ||
                (Description.length < 2 && accept && (
                  <p className="error">
                    descriptions Must Be more than 3 characters
                  </p>
                ))}
              <label htmlFor="image">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files.item(0))}
                id="image"
              />
              {image.length === "" && accept && (
                <p className="error">Image Is required</p>
              )}
              <button
                className="py-[10px] btn transition-all text-center px-[25px] mx-auto mt-4 flex items-center justify-center "
                type="submit"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
