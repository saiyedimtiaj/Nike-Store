import logo from "../../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { AiOutlineClose } from "react-icons/ai"; // Import AiOutlineClose icon

export function Nabvar() {
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout,isMenuOpen, setIsMenuOpen } = useAuth();

  const [userInfo] = useUser();

  const handelLogout = () => {
    logout()
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/news", label: "News" },
    userInfo?.role === "admin" && { href: "/dashboard", label: "Dashboard" }, // Ensure the NavLink structure is correct
  ].filter(Boolean); // Filter out falsy values

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const rightSide = (
    <div className="flex items-center gap-2">
      <Link to="/cart">
        <MdShoppingCart className="text-2xl cursor-pointer" />
      </Link>
      <button onClick={() => setShowSearch(true)} className="cursor-pointer">
        <FaSearch className="text-xl" />
      </button>
     {user ?  <button onClick={handelLogout} className="rounded-lg border-2 border-black text-xs py-1.5 md:text-lg md:py-2 hover:bg-black hover:text-white duration-500 px-3 text-black">
        <span>Sign Out</span>
      </button> :  <Link to='/signin'>
      <button className="rounded-lg border-2 border-black text-xs py-1.5 md:text-lg md:py-2 hover:bg-black hover:text-white duration-500 px-3 text-black">
        <span>Sign In</span>
      </button>
      </Link>}
    </div>
  );

  return (
    <div className="container mx-auto">
      <header className="sm:px-8 px-4 py-2 z-10 w-full">
        <nav className="flex justify-between items-center max-w-container"> {/* Corrected classname */}
          <Link to="/" className="text-3xl font-bold">
            <img src={logo} className="h-3 md:h-5" alt="" />
          </Link>
          <ul className="hidden lg:flex gap-8">
            {navLinks.map((item) => (
              <motion.li
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={item.href}
                  className="font-montserrat leading-normal font-medium tet-xl lg:text-lg text-slate-gray"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="lg:flex hidden gap-2 text-lg leading-normal font-medium font-montserrat ">
            {rightSide}
          </div>
          <div className="flex lg:hidden items-center gap-2">
            <RxHamburgerMenu
              onClick={toggleMenu}
              className="text-xl cursor-pointer"
            />
             <div className="flex lg:hidden gap-2 text-lg leading-normal font-medium font-montserrat lg:mr-24">
            {rightSide}
          </div>
          </div>
        </nav>
      </header>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden"
      >
        {isMenuOpen && (
          <nav className="fixed top-0 right-0 left-0 bottom-0 bg-slate-100">
            <div
              className="max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
              onClick={toggleMenu}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className="flex flex-col gap-y-3 items-center justify-center bg-white z-50 h-full">
              {navLinks.map((item) => (
                <motion.li
                  key={item.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                  onClick={toggleMenu}
                    to={item.href}
                    className="font-montserrat leading-normal text-xl font-medium lg:text-lg text-slate-gray"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        )}
      </motion.div>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
}

export default Nabvar;
