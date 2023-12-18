import { Outlet } from "react-router-dom";
import { Nabvar } from "../Components/Nabvar/Nabvar";


const MainLayout = () => {
    return (
        <div className="font-Afacad">
            <Nabvar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;