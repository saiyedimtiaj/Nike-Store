import { Outlet } from "react-router-dom";
import { Nabvar } from "../Components/Nabvar/Nabvar";
import Footer from '../Components/Footer/Footer'


const MainLayout = () => {
    return (
        <div className="font-Afacad">
            <Nabvar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;