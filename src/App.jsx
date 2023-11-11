import { Routes, Route } from "react-router-dom";
// users
import Dashbord from "./pages/Dashboard/Dashbord";
import UserDashBoard from "./pages/Dashboard/Users/UserDashBoard";
import Update from "./pages/Dashboard/Users/Update";
import CreateUser from "./pages/Dashboard/Users/CreateUser";
//website Pages
// Auth
import Register1 from "./pages/website/Auth/Register1";
import Login from "./pages/website/Auth/Login";
import Home from "./pages/website/Home";
import About from "./pages/website/About";
import RequireAuth from "./pages/website/Auth/RequireAuth";
import SaveLogin from "./pages/website/Auth/SaveLogin";
import Products from "./pages/Dashboard/products/Products";
import CreateProduct from "./pages/Dashboard/products/CreateProduct";
import UpdateProduct from "./pages/Dashboard/products/UpdateProduct";
function App() {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <SingUp /> */}
        <Route path="/register" element={<Register1 />} />
        {/* <login /> */}
        <Route path="/login" element={<Login />} />
        {/* dashboard proteced Routes */}
        <Route element={<SaveLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashbord />}>
              <Route path="users" element={<UserDashBoard />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<Update />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
