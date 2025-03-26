import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import BottomHeader from "./BottomHeader/BottomHeader";
import { GlobalContext } from "../../context/GlobalContext";
const Header = () => {
  const { cartNumber } = useContext(GlobalContext);
  const navLinks = [
    {
      icon: <FaUser />,
      name: "Profile",
      route: "/profile",
    },
    {
      icon: <MdMessage />,
      name: "Message",
      route: "/message",
    },
    {
      icon: <FaHeart />,
      name: "Orders",
      route: "/orders",
    },
    {
      icon: <IoMdCart />,
      name: "My Cart",
      route: "/mycart",
    },
  ];
  return (
    <header className="  ">
      <nav className="container mx-auto px-30 flex items-center justify-between h-[86px]">
        <div className="">
          <Link to={"/"}>
            {" "}
            <img src="./logo-colored.png" alt="" />
          </Link>
        </div>
        <div className="w-[665px] overflow-hidden flex items-center justify-between  rounded-lg h-[40px] border-2 border-[#127FFF]">
          <input
            className="flex-1 p-2 outline-none"
            type="text"
            placeholder="Search"
          />
          <div className="flex items-center gap-4 overflow-hidden justify-center">
            <select
              className="px-2 py-2 flex items-center justify-center gap-4 outline-none border-l-[1px]"
              name=""
              id=""
            >
              <option value="">All Category</option>
            </select>
            <button className="bg-[#127FFF] cursor-pointer  rounded-r-lg text-white px-5 py-2">
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          {navLinks.map((link, index) => {
            return (
              <div key={index} className="flex flex-col">
                <Link
                  className="relative flex flex-col items-center justify-center gap-1"
                  to={link.route}
                >
                  {link.name === "My Cart" && cartNumber > 0 && (
                    <p className="absolute top-[-14px] bg-red-500 text-[13px] text-white rounded-full p-[3px] right-0">
                      {cartNumber}
                    </p>
                  )}
                  <h1 className="text-2xl text-gray-500">{link.icon}</h1>
                  <p className="text-gray-500 text-[12px]">{link.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      <BottomHeader />
    </header>
  );
};

export default Header;
