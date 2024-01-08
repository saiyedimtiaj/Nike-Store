import { Outlet } from "react-router-dom";
import { LgSidebar } from "../Components/Sidebar/LgSideBar";
import { Sidebar } from "../Components/Sidebar/Sidebar";

const Dashboard = () => {
    return (
       <div className="container mx-auto flex flex-col lg:flex-row lg:gap-2">
         <div>
         <div className="lg:hidden block"><Sidebar/></div>
          <div className="hidden lg:block" ><LgSidebar/></div>
         </div>
          <Outlet/>
       </div>
      );
    }

export default Dashboard;