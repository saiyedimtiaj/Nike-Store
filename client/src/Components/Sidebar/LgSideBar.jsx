import { Card, List } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { FaBox, FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import useAuth from "../../hooks/useAuth";

export function LgSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <Card className="min-h-screen flex flex-col justify-between max-w-[20rem] px-4 bg-black text-white rounded-none">
      <List>
        <div className="flex mt-3 flex-col items-center">
          <div
            className="w-24 h-24 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user?.photoURL})` }}
          />
          <h1 className="text-xl font-semibold text-white uppercase mt-2">
            {user?.displayName}
          </h1>
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive && location.pathname.endsWith("/dashboard")
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <BiSolidDashboard />
            </span>
            Dashboard
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/all-product"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          {" "}
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <FaBox />
            </span>
            All-Product
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          {" "}
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <IoMdAdd />
            </span>
            Add-Product
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          {" "}
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <FaShoppingCart />
            </span>
            Orders
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/all-users"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          {" "}
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <FaUser />
            </span>
            All-Users
          </div>
        </NavLink>
      </List>
      <List>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "bg-gray-800 px-3 py-2 rounded-md mt-1 text-white font-medium"
              : "mt-1 hover:bg-gray-800 px-3 py-2 rounded-md text-white font-medium"
          }
        >
          {" "}
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <FaHome />
            </span>
            Home
          </div>
        </NavLink>
        <div className="mt-1 flex gap-1 cursor-pointer items-center font-medium hover:bg-gray-800 px-3 py-2 rounded-md text-white">
          <span className="text-xl">
            <BiLogOut />
          </span>
          Logout
        </div>
      </List>
    </Card>
  );
}
