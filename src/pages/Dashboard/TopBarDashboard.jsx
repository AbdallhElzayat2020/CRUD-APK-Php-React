import { Link } from "react-router-dom";

const TopBarDashboard = () => {
  return (
    <div className="top pt-5 pb-3 shadow-lg  ">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <Link to="/" className="btn">
          Back To WebSite
        </Link>
      </div>
    </div>
  );
};

export default TopBarDashboard;
