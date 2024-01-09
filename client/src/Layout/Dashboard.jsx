import { Outlet } from "react-router-dom";
import { LgSidebar } from "../Components/Sidebar/LgSideBar";
import { Sidebar } from "../Components/Sidebar/Sidebar";

const Dashboard = () => {
    return (
       <div className="container mx-auto flex gap-2">
         <div className="w-[320px]">
         <div className="lg:hidden block"><Sidebar/></div>
          <div className="hidden lg:block" ><LgSidebar/></div>
         </div>
          <div className="w-full"><Outlet/></div>
       </div>
      );
    }

export default Dashboard;