import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Details from "../Pages/Details/Details";
import Cart from "../Pages/Cart/Cart";
import AllProducts from "../Pages/AllProducts/AllProducts";


const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
          path:'/product',
          element:<AllProducts/>
        },
        {
          path:'/product/:id',
          element:<Details/>
        },
        {
          path:'/cart',
          element:<Cart/>
        }
      ]
    },
  ]);

export default Routes;