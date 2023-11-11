import { NavLink } from "react-router-dom";
import { FaUsers, FaProductHunt } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
const SideBarDashboard = () => {
  return (
    <div className="sidebar p-[25px] h-screen border-r-2   border-[#eee] w-[20%]">
      <NavLink
        to="/dashboard/users"
        className="item-link p-3  rounded-lg mb-2 hover:bg-[#0063f7] hover:text-white transition-all duration-300  flex   text-xl text-black font-semibold  "
      >
        <FaUsers className="mr-3 " size={30} />
        Users
      </NavLink>
      <NavLink
        to="/dashboard/user/create"
        className="item-link p-3  rounded-lg mb-2 hover:bg-[#0063f7] hover:text-white transition-all duration-300  flex   text-xl text-black font-semibold  "
      >
        <AiOutlinePlusCircle className="mr-3 " size={30} />
        NewUser
      </NavLink>
      <NavLink
        to="/dashboard/products"
        className="item-link p-3  rounded-lg mb-2 hover:bg-[#0063f7] hover:text-white transition-all duration-300  flex   text-lg text-black font-semibold  "
      >
        <FaProductHunt className="mr-3 " size={30} />
        Products
      </NavLink>
      <NavLink
        to="/dashboard/product/create"
        className="item-link p-3  rounded-lg mb-2 hover:bg-[#0063f7] hover:text-white transition-all duration-300  flex   text-lg text-black font-semibold  "
      >
        <AiOutlinePlusCircle className="mr-3 " size={40} />
        New Product
      </NavLink>
    </div>
  );
};

export default SideBarDashboard;
