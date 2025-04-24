import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { motion } from "framer-motion";

const BottomHeader = () => {
  const navLinks = [
    {
      name: "All Category",
    },
    {
      name: "Hot Offers",
    },
    {
      name: "Gift Boxes",
    },
    {
      name: "Projects",
    },
    {
      name: "Menu Item",
    },
  ];
  const { themeMode } = useContext(GlobalContext);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`border-t border-gray-300 ${
        themeMode === "dark"
          ? "bg-slate-900 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-14 overflow-x-hidden"
        >
          {/* Main Navigation Links */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center space-x-1 sm:space-x-4 overflow-x-hidden w-full sm:w-auto py-2 sm:py-0"
          >
            {navLinks.map((link, index) => {
              const path = `/${link.name.split(" ").join("-").toLowerCase()}`;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className="flex items-center whitespace-nowrap px-2 py-1 text-sm sm:text-base hover:text-blue-600"
                    to={link.name === "All Category" ? "/all-category" : "/"}
                    onClick={(e) => {
                      if (window.location.pathname === path) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {link.name === "All Category" && (
                      <GiHamburgerMenu className="mr-1" />
                    )}
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}

            {/* Help Dropdown - hidden on smallest screens */}
            <motion.div
              className="hidden xs:block ml-2 sm:ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.select
                className="outline-none text-sm sm:text-base bg-transparent"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Help</option>
              </motion.select>
            </motion.div>
          </motion.div>

          {/* Language and Country Selectors */}
          <motion.div
            className="flex items-center space-x-4 text-sm sm:text-base py-2 sm:py-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.select
              className="outline-none bg-transparent hidden sm:block"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="">English, USD</option>
            </motion.select>
            <div className="flex items-center">
              <span className="hidden sm:inline mr-1">Ship to</span>
              <motion.select
                className="outline-none bg-transparent"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">🏴</option>
              </motion.select>
            </div>
          </motion.div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default BottomHeader;
