import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Details from "../Pages/Details/Details";
import Cart from "../Pages/Cart/Cart";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import Sucess from "../Pages/Stripe/Sucess";
import Cancel from "../Pages/Stripe/Cancel";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import All_Product from "../Pages/Dashboard/All_Product/All_Product";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";


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
        },
        {
          path:'/sucess',
          element:<Sucess/>,
        },
        {
          path:'/cancel',
          element:<Cancel/>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard/>,
      children:[
        {
          path:'/dashboard',
          element:<DashboardHome/>
        },
        {
          path:'/dashboard/all-product',
          element:<All_Product/>
        },
        {
          path:'/dashboard/add-product',
          element:<AddProduct/>
        }
      ]
    },
    {
      path:'/signin',
      element:<Signin/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
  ]);

export default Routes;