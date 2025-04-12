import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdMessage,
  MdHome,
  MdCategory,
  MdFavorite,
  MdShoppingBag,
  MdLanguage,
  MdContactSupport,
  MdInfo,
  MdPolicy,
} from "react-icons/md";
import { FaUser, FaRegUserCircle } from "react-icons/fa";
import { IoMdCart, IoMdMenu, IoMdClose } from "react-icons/io";
import BottomHeader from "./BottomHeader/BottomHeader";
import { GlobalContext } from "../../context/GlobalContext";

const Header = () => {
  const { cartNumber, user } = useContext(GlobalContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopNavLinks = [
    {
      icon: <MdShoppingBag />,
      name: "My Orders",
      route: "/orders",
      showOnMobile: true,
    },

    {
      icon: <FaUser />,
      name: "Profile",
      route: "/profile",
      showOnMobile: true,
    },
    {
      icon: <IoMdCart />,
      name: "My Cart",
      route: "/mycart",
      showOnMobile: true,
    },
  ];

  // Mobile menu links
  const mobileMenuLinks = [
    // User profile section
    {
      type: "profile",
      content: (
        <div className="flex flex-col items-center p-4 border-b">
          {user ? (
            <>
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <FaRegUserCircle className="text-2xl text-gray-500" />
              </div>
              <span className="font-medium">{user?.name}</span>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-blue-600 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      ),
    },
    // Main navigation links
    {
      icon: <MdHome />,
      name: "Home",
      route: "/",
    },
    {
      icon: <MdCategory />,
      name: "Categories",
      route: "/all-category",
    },
    {
      icon: <MdFavorite />,
      name: "Favorites",
      route: "/favorites",
    },
    {
      icon: <MdShoppingBag />,
      name: "My Orders",
      route: "/orders",
    },
    // Divider
    {
      type: "divider",
    },
    // Secondary links
    {
      icon: <MdLanguage />,
      name: "English",
      route: "#",
    },
    {
      icon: <MdContactSupport />,
      name: "Contact Us",
      route: "/contact",
    },
    {
      icon: <MdInfo />,
      name: "About",
      route: "/about",
    },
    // Divider
    {
      type: "divider",
    },
    // Policy links
    {
      name: "User Agreement",
      route: "/user-agreement",
    },
    {
      name: "Partnership",
      route: "/partnership",
    },
    {
      name: "Privacy Policy",
      route: "/privacy-policy",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Mobile Menu Button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-500 text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <IoMdMenu />
            </button>

            <Link to="/">
              <img
                src="./logo-colored.png"
                alt="Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Mobile Navigation Icons (only show cart and profile on mobile) */}
          <div className="flex md:hidden items-center gap-4">
            {desktopNavLinks.map((link, index) => (
              <Link
                key={index}
                className="relative flex items-center justify-center p-1"
                to={link.route}
              >
                {link.name === "My Cart" && cartNumber > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartNumber}
                  </span>
                )}
                <span className="text-xl text-gray-500">{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] flex items-center rounded-lg h-10 border-2 border-[#127FFF]">
          <input
            className="flex-1 p-2 outline-none text-sm sm:text-base"
            type="text"
            placeholder="Search"
          />
          <div className="flex items-center h-full">
            <select
              className="px-2 h-full outline-none border-l-[1px] border-gray-300 text-sm hidden sm:block"
              name="category"
            >
              <option value="">All Category</option>
            </select>
            <button className="bg-[#127FFF] cursor-pointer rounded-r-md text-white px-3 sm:px-5 h-full text-sm sm:text-base">
              Search
            </button>
          </div>
        </div>

        {/* Desktop Navigation Icons */}
        <div className="hidden md:flex items-center justify-center gap-4 md:gap-6">
          {desktopNavLinks.map((link, index) => (
            <div key={index} className="flex flex-col">
              <Link
                className="relative flex flex-col items-center justify-center gap-1 p-1 sm:p-2"
                to={link.route}
              >
                {link.name === "My Cart" && cartNumber > 0 && (
                  <p className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartNumber}
                  </p>
                )}
                <span className="text-xl md:text-2xl text-gray-500">
                  {link.icon}
                </span>
                <span className="text-gray-500 text-xs">{link.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-lg overflow-y-auto">
            <div className="flex flex-col">
              {mobileMenuLinks.map((item, index) => {
                if (item.type === "profile") {
                  return <div key={`profile-${index}`}>{item.content}</div>;
                } else if (item.type === "divider") {
                  return (
                    <hr
                      key={`divider-${index}`}
                      className="border-gray-200 my-2"
                    />
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      to={item.route}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && (
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                      )}
                      <span>{item.name}</span>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoMdClose />
          </button>
        </div>
      )}

      <BottomHeader />
    </header>
  );
};

export default Header;
