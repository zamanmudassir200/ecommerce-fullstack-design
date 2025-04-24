import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti";
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { themeMode } = useContext(GlobalContext);
  return (
    // <footer
    //   className={`${
    //     themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
    //   }`}
    // >
    //   {/* Main Footer Content */}
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
    //       {/* Company Info */}
    //       <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
    //         <Link
    //           to="/"
    //           className="block max-w-[160px] w-full h-auto sm:max-w-[200px] md:max-w-[240px]"
    //         >
    //           <img
    //             src="/logo-colored.png"
    //             alt="Company Logo"
    //             className="w-full h-auto object-contain"
    //           />
    //         </Link>

    //         <p className="text-gray-600 text-sm">
    //           Best information about the company gies here but now lorem ipsum
    //           is
    //         </p>
    //         <div className="flex  gap-3">
    //           {[
    //             { icon: <TiSocialFacebook size={20} /> },
    //             { icon: <TiSocialTwitter size={20} /> },
    //             { icon: <TiSocialLinkedin size={20} /> },
    //             { icon: <AiOutlineInstagram size={20} /> },
    //             { icon: <AiFillYoutube size={20} /> },
    //           ].map((social, index) => (
    //             <Link
    //               key={index}
    //               className="bg-gray-200 hover:bg-gray-300 duration-300 transition-all rounded-full p-2 text-gray-700"
    //             >
    //               {social.icon}
    //             </Link>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Footer Links */}
    //       {[
    //         {
    //           title: "About",
    //           links: ["About us", "Find Store", "Categories", "Blogs"],
    //         },
    //         {
    //           title: "Partnership",
    //           links: ["About us", "Find Store", "Categories", "Blogs"],
    //         },
    //         {
    //           title: "Information",
    //           links: ["About us", "Find Store", "Categories", "Blogs"],
    //         },
    //         {
    //           title: "For users",
    //           links: [
    //             { text: "Login", to: "/login" },
    //             { text: "Register", to: "/signup" },
    //             { text: "Setting", to: "#" },
    //             { text: "My Orders", to: "#" },
    //           ],
    //         },
    //       ].map((section, index) => (
    //         <div key={index} className="mt-4 sm:mt-0">
    //           <h3 className="font-semibold text-gray-600 mb-3">
    //             {section.title}
    //           </h3>
    //           <ul className="space-y-2">
    //             {section.links.map((link, linkIndex) => (
    //               <li key={linkIndex}>
    //                 {typeof link === "string" ? (
    //                   <Link className="text-gray-600 hover:text-gray-700 text-sm">
    //                     {link}
    //                   </Link>
    //                 ) : (
    //                   <Link
    //                     to={link.to}
    //                     className="text-gray-600 hover:text-gray-700 text-sm"
    //                   >
    //                     {link.text}
    //                   </Link>
    //                 )}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}

    //       {/* Get App */}
    //       <div className="mt-4 sm:mt-0">
    //         <h3 className="font-semibold text-gray-800 mb-3">Get app</h3>
    //         <div className="space-y-3">
    //           <Link className="bg-black hover:bg-gray-600 p-2 rounded-lg flex gap-2 items-center text-white text-sm">
    //             <FaApple size={20} />
    //             <div>
    //               <p className="text-gray-300 text-xs">Download on the</p>
    //               <p>App Store</p>
    //             </div>
    //           </Link>
    //           <Link className="bg-black hover:bg-gray-800 p-2 rounded-lg flex gap-2 items-center text-white text-sm">
    //             <FaGooglePlay size={20} />
    //             <div>
    //               <p className="text-gray-300 text-xs">GET IT ON</p>
    //               <p>Google Play</p>
    //             </div>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Copyright Section */}
    //   <div
    //     className={`bg-[#EFF2F4] py-4 ${
    //       themeMode === "dark" ? "bg-slate-800 text-white" : "bg-white"
    //     }`}
    //   >
    //     <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
    //       <div className="mb-2 sm:mb-0">
    //         &copy; {new Date().getFullYear()} Ecommerce.
    //       </div>
    //       <div className="flex items-center">
    //         <select className="bg-transparent border-none outline-none text-gray-700">
    //           <option value="">English</option>
    //           <option value="es">Español</option>
    //           <option value="fr">Français</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <footer
      className={`${
        themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/"
              className="block max-w-[160px] w-full h-auto sm:max-w-[200px] md:max-w-[240px]"
            >
              <img
                src="/logo-colored.png"
                alt="Company Logo"
                className="w-full h-auto object-contain"
              />
            </Link>

            <p className="text-gray-600 text-sm">
              Best information about the company gies here but now lorem ipsum
              is
            </p>

            <div className="flex  gap-3">
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
          </motion.div>

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
            <motion.div
              key={index}
              className="mt-4 sm:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
            >
              <h3 className="font-semibold text-gray-600 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-600 hover:text-gray-700 text-sm"
                  >
                    {typeof link === "string" ? (
                      <Link className="">{link}</Link>
                    ) : (
                      <Link to={link.to} className="">
                        {link.text}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Get App */}
          <motion.div
            className="mt-4 sm:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="font-semibold text-gray-800 mb-3">Get app</h3>
            <div className="space-y-3">
              <Link className="bg-black hover:bg-gray-600 p-2 rounded-lg flex gap-2 items-center text-white text-sm">
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
          </motion.div>
        </div>
      </div>

      {/* Copyright Section */}
      <motion.div
        className={`bg-[#EFF2F4] py-4 ${
          themeMode === "dark" ? "bg-slate-800 text-white" : "bg-white"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
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
      </motion.div>
    </footer>
  );
};

export default Footer;
