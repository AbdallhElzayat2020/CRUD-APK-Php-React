import TopBarDashboard from "./TopBarDashboard";
import SideBarDashboard from "./SideBarDashboard";
import { Outlet } from "react-router-dom";

const Dashbord = () => {
  return (
    <div>
      <TopBarDashboard />
      <div className="flex ">
        <SideBarDashboard />
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
