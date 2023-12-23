
import logo from "../../assets/logo.png";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Search from "../Search/Search";

export function Nabvar() {
  const [openNav, setOpenNav] = useState(false);
  const [showSearch,setShowSearch] = useState(false)

 useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  //Collapse

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 font-medium lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? ""
            : isActive
            ? "text-red-700"
            : "flex items-center gap-x-1 p-1 text-black font-medium"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/product"
        className={({ isActive, isPending }) =>
          isPending
            ? ""
            : isActive
            ? "text-red-700"
            : "flex items-center gap-x-1 p-1 text-black font-medium"
        }
      >
        Product
      </NavLink>
    </ul>
  );

  return (
   <>
     <Navbar className="mx-auto max-w-screen-xl px-4 py-2 shadow-none rounded-none lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
          <img src={logo} className="h-3 md:h-5 lg:h-6" alt="" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-3">
          <Link to='/cart'><MdShoppingCart className="text-2xl cursor-pointer" /></Link>
          <button onClick={()=>setShowSearch(true)} className="cursor-pointer"><FaSearch className="text-xl" /></button>
          <Link to='/signin' className="hidden lg:inline-block">
          <Button
            variant="gradient"
            size="sm"
          >
            <span>Sign in</span>
          </Button>
          </Link>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        <Link to='/signi' className="lg:hidden ml-1">
          <Button
            variant="gradient"
            size="sm"
          >
            <span>Sign in</span>
          </Button>
          </Link>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
      {showSearch && <Search setShowSearch={setShowSearch}/>}
   </>
  );
}
