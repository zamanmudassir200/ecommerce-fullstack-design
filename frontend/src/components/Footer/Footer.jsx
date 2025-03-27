// import React from "react";
// import { Link } from "react-router-dom";
// import { FaApple } from "react-icons/fa";
// import { FaGooglePlay } from "react-icons/fa";
// import { TiSocialFacebook } from "react-icons/ti";
// import { TiSocialTwitter } from "react-icons/ti";
// import { TiSocialLinkedin } from "react-icons/ti";
// import { AiOutlineInstagram } from "react-icons/ai";
// import { AiFillYoutube } from "react-icons/ai";

// const Footer = () => {
//   return (
//     <>
//       <div className="py-14">
//         <div className="flex items-center justify-evenly">
//           <div className="flex gap-4 w-[276px] flex-col items-start ">
//             <img src="./logo-colored.png" alt="" />
//             <h1>
//               Best information about the company gies here but now lorem ipsum
//               is
//             </h1>
//             <div className="flex justify-between text-white gap-3">
//               <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
//                 <TiSocialFacebook size={20} />
//               </Link>
//               <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
//                 <TiSocialTwitter size={20} />
//               </Link>
//               <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
//                 <TiSocialLinkedin size={20} />
//               </Link>
//               <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
//                 <AiOutlineInstagram size={20} />
//               </Link>
//               <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all  rounded-full p-2">
//                 <AiFillYoutube size={20} />
//               </Link>
//             </div>
//           </div>
//           <div className="">
//             <h1 className="font-semibold">About</h1>
//             <div className="flex flex-col gap-1 text-gray-500 mt-2">
//               <Link>About us</Link>
//               <Link>Find Store</Link>
//               <Link>Categories</Link>
//               <Link>Blogs</Link>
//             </div>
//           </div>
//           <div className="">
//             <h1 className="font-semibold">Partnership</h1>
//             <div className="flex flex-col gap-1 text-gray-500 mt-2">
//               <Link>About us</Link>
//               <Link>Find Store</Link>
//               <Link>Categories</Link>
//               <Link>Blogs</Link>
//             </div>
//           </div>{" "}
//           <div className="">
//             <h1 className="font-semibold">Information</h1>
//             <div className="flex flex-col gap-1 text-gray-500 mt-2">
//               <Link>About us</Link>
//               <Link>Find Store</Link>
//               <Link>Categories</Link>
//               <Link>Blogs</Link>
//             </div>
//           </div>{" "}
//           <div className="">
//             <h1 className="font-semibold">For users</h1>
//             <div className="flex flex-col gap-1 text-gray-500 mt-2">
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Register</Link>
//               <Link>Setting</Link>
//               <Link>My Orders</Link>
//             </div>
//           </div>
//           <div className="">
//             <h1 className="font-semibold">Get app</h1>
//             <div className="flex flex-col gap-1 text-gray-500 mt-2">
//               <Link className="bg-black p-2 rounded-lg flex gap-1 items-center justify-center text-white">
//                 <FaApple size={29} />

//                 <div className="">
//                   <p className="text-[10px] text-gray-300">Download on the </p>
//                   <h1>App Store</h1>
//                 </div>
//               </Link>
//               <Link className="bg-black p-2 rounded-lg flex gap-1 items-center justify-center text-white">
//                 <FaGooglePlay size={29} />
//                 <div className="">
//                   <p className="text-[10px] text-gray-300">GET IT ON </p>
//                   <h1>Google Play</h1>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-[#EFF2F4] py-6 text-gray-700">
//         <div className=" flex items-center justify-between px-28  ">
//           <div className="">&copy; {new Date().getFullYear()} Ecommerce.</div>
//           <div className="">
//             <select name="" id="">
//               <option value="">English</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti";
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <img
              src="./logo-colored.png"
              alt="Company Logo"
              className="h-8 w-auto"
            />
            <p className="text-gray-600 text-sm">
              Best information about the company gies here but now lorem ipsum
              is
            </p>
            <div className="flex gap-3">
              {[
                { icon: <TiSocialFacebook size={20} /> },
                { icon: <TiSocialTwitter size={20} /> },
                { icon: <TiSocialLinkedin size={20} /> },
                { icon: <AiOutlineInstagram size={20} /> },
                { icon: <AiFillYoutube size={20} /> },
              ].map((social, index) => (
                <Link
                  key={index}
                  className="bg-gray-200 hover:bg-gray-300 duration-300 transition-all rounded-full p-2 text-gray-700"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "About",
              links: ["About us", "Find Store", "Categories", "Blogs"],
            },
            {
              title: "Partnership",
              links: ["About us", "Find Store", "Categories", "Blogs"],
            },
            {
              title: "Information",
              links: ["About us", "Find Store", "Categories", "Blogs"],
            },
            {
              title: "For users",
              links: [
                { text: "Login", to: "/login" },
                { text: "Register", to: "/signup" },
                { text: "Setting", to: "#" },
                { text: "My Orders", to: "#" },
              ],
            },
          ].map((section, index) => (
            <div key={index} className="mt-4 sm:mt-0">
              <h3 className="font-semibold text-gray-800 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {typeof link === "string" ? (
                      <Link className="text-gray-600 hover:text-gray-900 text-sm">
                        {link}
                      </Link>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-gray-600 hover:text-gray-900 text-sm"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get App */}
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-gray-800 mb-3">Get app</h3>
            <div className="space-y-3">
              <Link className="bg-black hover:bg-gray-800 p-2 rounded-lg flex gap-2 items-center text-white text-sm">
                <FaApple size={20} />
                <div>
                  <p className="text-gray-300 text-xs">Download on the</p>
                  <p>App Store</p>
                </div>
              </Link>
              <Link className="bg-black hover:bg-gray-800 p-2 rounded-lg flex gap-2 items-center text-white text-sm">
                <FaGooglePlay size={20} />
                <div>
                  <p className="text-gray-300 text-xs">GET IT ON</p>
                  <p>Google Play</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#EFF2F4] py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-gray-700 text-sm">
          <div className="mb-2 sm:mb-0">
            &copy; {new Date().getFullYear()} Ecommerce.
          </div>
          <div className="flex items-center">
            <select className="bg-transparent border-none outline-none text-gray-700">
              <option value="">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
