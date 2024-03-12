import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Details from "../Pages/Details/Details";
import Cart from "../Pages/Cart/Cart";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import All_Product from "../Pages/Dashboard/All_Product/All_Product";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Orders from "../Pages/Dashboard/Orders/Orders";
import Payment from "../Pages/Payment/Payment";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import Edit from "../Pages/Dashboard/Edit/Edit";
import News from "../Pages/News/News";


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
          path:'/news',
          element:<News/>
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
          path:'/payment',
          element:<PrivateRoutes><Payment/></PrivateRoutes>
        },
      ]
    },
    {
      path:'/dashboard',
      element:<AdminRoute><Dashboard/></AdminRoute>,
      children:[
        {
          path:'/dashboard',
          element:<AdminRoute><DashboardHome/></AdminRoute>
        },
        {
          path:'/dashboard/all-product',
          element:<AdminRoute><All_Product/></AdminRoute>
        },
        {
          path:'/dashboard/add-product',
          element:<AdminRoute><AddProduct/></AdminRoute>
        },
        {
          path:'/dashboard/orders',
          element:<AdminRoute><Orders/></AdminRoute>
        },
        {
          path:'/dashboard/all-users',
          element:<AdminRoute><AllUsers/></AdminRoute>
        },
        {
          path:'/dashboard/all-product/:id/edit',
          element:<Edit/>
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