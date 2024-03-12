import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaProductHunt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa6";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const route = useLocation()
  const menus = [
    { name: "dashboard", link: "/dashboard/", icon: MdOutlineDashboard },
    {
      name: "All Creation",
      link: "/dashboard/all-product",
      icon: FaProductHunt,
    },
    { name: "Add Shoes", link: "/dashboard/add-product", icon: CgAddR },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: LiaShippingFastSolid,
      margin: true,
    },
    { name: "Account holders", link: "/dashboard/all-users", icon: FaUsers },
  ];

  return (
    <div className="font-Afacad">
      <section className="flex">
        <div className={`bg-[#0e0e0e] ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 flex flex-col justify-between fixed left-0 top-0 bottom-0 z-50 transition-all`}>
          <div>
            <div className="py-3 flex justify-end">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 relative">
              {menus?.map((menu, i) => (
                <Link
                  to={menu?.link}
                  key={i}
                  className={` ${menu?.margin && "mt-5"} ${route?.pathname == menu.link && 'bg-gray-800'} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-50 `}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-2 space-y-1">
            <Link
              to="/"
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <FaHome size={20} />
              </div>
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Home
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-50 `}
              >
                Home
              </h2>
            </Link>
            <h1
              to="/"
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>
                <MdLogout size={20} />
              </div>
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Sign Out
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-50 `}
              >
                Sign Out
              </h2>
            </h1>
          </div>
        </div>
        <div className={`ml-16 w-full px-3 overflow-y-auto h-screen ${open ? 'pl-60' : ''} transition-all duration-500`}>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
