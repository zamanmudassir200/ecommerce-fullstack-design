// import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link } from "react-router-dom";
// const BottomHeader = () => {
//   const navLinks = [
//     {
//       name: "All Category",
//     },
//     {
//       name: "Hot Offers",
//     },
//     {
//       name: "Gift Boxes",
//     },
//     {
//       name: "Projects",
//     },
//     {
//       name: "Menu Item",
//     },
//   ];
//   return (
//     <header className="border-[1px] min-w-full  border-gray-300 ">
//       <nav className="container mx-auto px-30 h-[56px] flex items-center justify-between ">
//         <div className="max-w-[70%] md:gap-4 md:flex-row flex-col flex gap-2 items-center justify-between  ">
//           {navLinks.map((link, index) => {
//             return (
//               <Link
//                 key={index}
//                 className="flex gap-2 items-center justify-center"
//                 to={`${link.name.split(" ").join("-").toLowerCase()}`}
//               >
//                 {link.name === "All Category" && <GiHamburgerMenu />}
//                 {link.name}
//               </Link>
//             );
//           })}
//           <select className="outline-none" name="" id="">
//             <option value="">Help</option>
//           </select>
//         </div>
//         <div className="flex items-center justify-center ">
//           <select className="mr-6 outline-none " name="" id="">
//             <option value="">English, USD</option>
//           </select>
//           Ship to
//           <select name="" id="">
//             <option value="">🏴</option>
//           </select>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default BottomHeader;

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
    <header className="border-t border-gray-300 bg-white">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-14 overflow-x-auto">
          {/* Main Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto w-full sm:w-auto py-2 sm:py-0">
            {navLinks.map((link, index) => {
              const path = `/${link.name.split(" ").join("-").toLowerCase()}`;
              return (
                <Link
                  key={index}
                  className="flex items-center whitespace-nowrap px-2 py-1 text-sm sm:text-base hover:text-blue-600"
                  to={path}
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
              );
            })}

            {/* Help Dropdown - hidden on smallest screens */}
            <div className="hidden xs:block ml-2 sm:ml-4">
              <select className="outline-none text-sm sm:text-base bg-transparent">
                <option value="">Help</option>
              </select>
            </div>
          </div>

          {/* Language and Country Selectors */}
          <div className="flex items-center space-x-4 text-sm sm:text-base py-2 sm:py-0">
            <select className="outline-none bg-transparent hidden sm:block">
              <option value="">English, USD</option>
            </select>
            <div className="flex items-center">
              <span className="hidden sm:inline mr-1">Ship to</span>
              <select className="outline-none bg-transparent">
                <option value="">🏴</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default BottomHeader;
