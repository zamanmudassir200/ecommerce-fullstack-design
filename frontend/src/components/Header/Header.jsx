import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaUser, FaRegUserCircle } from "react-icons/fa";
import { IoMdCart, IoMdMenu, IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import url from "../../utils/url";
const BottomHeader = lazy(() => import("./BottomHeader/BottomHeader"));

import { GlobalContext } from "../../context/GlobalContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const { cartNumber, themeMode, setThemeMode, user, handleApiCall } =
    useContext(GlobalContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);
  const [closeSearchedResult, setCloseSearchedResult] = useState(false);

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
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchValue.trim().length > 0) {
        const response = await handleApiCall(
          `${url}/products/search/product?name=${searchValue.trim()}`,
          "get"
        );
        setCloseSearchedResult(true);
        setSearchedResult(response.data.products);
      } else {
        toast.warn("Please enter product name");
      }
    } catch (error) {}
  };
  const toggleThemeMode = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("themeMode", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (themeMode) {
      localStorage.setItem("themeMode", themeMode);
    }
  }, [themeMode]);

  // Define framer-motion variants
  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const itemHoverEffect = {
    whileHover: { scale: 1.03 },
  };
  return (
    <header
      className={`${
        themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      } sticky top-0 z-50 shadow-sm`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Mobile Menu Button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.button
              className="md:hidden text-gray-500 text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <IoMdMenu />
            </motion.button>

            <Link
              to="/"
              className="block max-w-[160px] w-full h-auto sm:max-w-[200px] md:max-w-[240px]"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                src="/logo-colored.png"
                alt="Company Logo"
                className="w-full h-auto object-contain"
              />
            </Link>

            <div className="cursor-pointer">
              {themeMode === "light" ? (
                <MdDarkMode onClick={toggleThemeMode} size={28} />
              ) : (
                <MdLightMode onClick={toggleThemeMode} size={28} />
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-4">
            {desktopNavLinks?.map((link, index) => (
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
                <span className="text-xl text-center text-gray-500">
                  {/* {link.icon} */}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative md:w-[60%] w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col rounded-t-lg border-2 border-[#127FFF]"
          >
            <div className="flex items-center h-10 w-full">
              <div className="relative w-full">
                <input
                  onChange={(e) => {
                    setCloseSearchedResult(true);
                    setSearchValue(e.target.value);
                  }}
                  className="flex-1 p-2 outline-none text-sm sm:text-base rounded-l-lg w-full"
                  value={closeSearchedResult === false ? "" : searchValue}
                  type="text"
                  placeholder="Search products..."
                />
                {closeSearchedResult &&
                  searchValue &&
                  searchValue.length > 0 &&
                  searchedResult.length > 0 && (
                    <IoMdClose
                      onClick={() => setCloseSearchedResult(false)}
                      size={22}
                      className="absolute cursor-pointer top-3 right-4"
                    />
                  )}
              </div>
              <div className="flex items-center h-full">
                <select
                  className="px-2 h-full outline-none border-l border-gray-300 text-sm hidden sm:block"
                  name="category"
                >
                  <option value="">All Categories</option>
                </select>
                <motion.button
                  type="submit"
                  className="bg-[#127FFF] text-white px-3 sm:px-5 h-full text-sm sm:text-base hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={searchValue.length === 0}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </div>
            </div>
          </form>

          {/* Search Dropdown */}
          <AnimatePresence>
            {closeSearchedResult &&
              searchedResult &&
              searchedResult.length > 0 && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`absolute w-full mt-[-2px] h-[200px] min-h-[450px] overflow-y-auto border-2 border-t-0 rounded-b-lg shadow-lg z-10 ${
                    themeMode === "dark"
                      ? "bg-slate-800 border-[#127FFF]"
                      : "bg-white border-[#127FFF]"
                  }`}
                >
                  {searchedResult.map((product) => (
                    <motion.div
                      key={product._id}
                      {...itemHoverEffect}
                      className={`p-2 cursor-pointer border-b first:border-t-[2px] border-gray-100 flex items-center gap-2 last:border-b-0 ${
                        themeMode === "dark"
                          ? "hover:bg-slate-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        navigate(`/product-detail/${product._id}`);
                        setCloseSearchedResult(false);
                      }}
                    >
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={product.images[0]}
                          alt=""
                        />
                      </div>
                      <div>
                        <h1 className="text-md font-semibold">
                          {product.productName}
                        </h1>
                        <p className="text-sm font-mono">
                          {product.discountedPrice > 0
                            ? `${product.discountedPrice} Rs`
                            : `${product.price} Rs`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation Icons */}
        <div className="hidden md:flex items-center justify-center gap-4 md:gap-6">
          {desktopNavLinks.map((link, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Link
                className="relative flex flex-col items-center justify-center gap-1 p-1 sm:p-2"
                to={link.route}
              >
                {link.name === "My Cart" && cartNumber > 0 && (
                  <p className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartNumber}
                  </p>
                )}
                <span className="text-xl text-center md:text-2xl text-gray-500">
                  {link.icon}
                </span>
                <span className="text-center text-gray-500 text-xs">
                  {link.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 backdrop-brightness-50 bg-opacity-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-lg z-50 overflow-y-auto"
            >
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
                          <span className="mr-3 text-gray-500">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.name}</span>
                      </Link>
                    );
                  }
                })}
              </div>
            </motion.div>

            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-50"
              whileTap={{ scale: 0.9 }}
            >
              <IoMdClose />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <Suspense
        fallback={<div className="text-center py-2">Loading header...</div>}
      >
        <BottomHeader />
      </Suspense>
    </header>
  );
};

export default Header;
