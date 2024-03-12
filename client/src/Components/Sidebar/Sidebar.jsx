import React from "react";
import { IconButton, Drawer, Card } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoClose } from "react-icons/io5";
import profile from "../../assets/picture.jpg";
import { NavLink } from "react-router-dom";
import { BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { FaBox, FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import useAuth from "../../hooks/useAuth";

export function Sidebar() {
  const {user} = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 text-black w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-screen bg-black rounded-none w-full p-4"
        >
          <div className="flex justify-between px-4 items-center">
            <img className="w-14" src="../../assets/logo.png" alt="" />
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-3xl text-black"
            >
              <IoClose />
            </button>
          </div>
          <div className="flex mt-3 flex-col items-center">
            <div
              className="w-20 h-20 rounded-full bg-center bg-cover"
              style={{ backgroundImage: `url(${user?.photoURL})` }}
            />
            <h1 className="text-xl font-semibold text-white uppercase mt-1">
              Saiyed Imtiaj
            </h1>
          </div>
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive && location.pathname.endsWith("/dashboard")
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "bg-gray-800 px-3 py-1.5 text-sm rounded-md mt-1 text-white font-medium"
                : "mt-1 hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white font-medium"
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
          <div className="mt-1 flex gap-1 cursor-pointer items-center font-medium hover:bg-gray-800 px-3 py-1.5 text-sm rounded-md text-white">
            <span className="text-xl">
              <BiLogOut />
            </span>
            Logout
          </div>
        </Card>
      </Drawer>
    </>
  );
}
