import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
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
  return (
    <header className="border-[1px] border-gray-300 ">
      <nav className="container mx-auto px-30 h-[56px] flex items-center justify-between ">
        <div className="w-[620px] flex gap-2 items-center justify-between  ">
          {navLinks.map((link, index) => {
            return (
              <Link
                key={index}
                className="flex gap-2 items-center justify-center"
                to={`${link.name.split(" ").join("-").toLowerCase()}`}
              >
                {link.name === "All Category" && <GiHamburgerMenu />}
                {link.name}
              </Link>
            );
          })}
          <select className="outline-none" name="" id="">
            <option value="">Help</option>
          </select>
        </div>
        <div className="flex items-center justify-center ">
          <select className="mr-6 outline-none " name="" id="">
            <option value="">English, USD</option>
          </select>
          Ship to
          <select name="" id="">
            <option value="">🏴</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default BottomHeader;
