import Sidebar from "../../Component/Sidebar";
import Topbar from "../../Component/Topbar";
import "../../pages/Dashboard/dashboard.css"
import Users from "../../pages/Dashboard/Users/Users"
import SignUp from "../Website/Auth/SignUp";
import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <div>
      <Topbar />
      <div className="content-flex">
        <Sidebar />
        <div style={{ width: "80%" }}>
         <Outlet/>
        </div>
      </div>
    </div>
  );
}
