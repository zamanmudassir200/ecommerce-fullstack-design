import React, { useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";

const Newsletter = () => {
  const { themeMode } = useContext(GlobalContext);
  return (
    <div
      className={` py-8 px-4 sm:py-12 ${
        themeMode === "dark" ? "bg-slate-800 text-white " : "bg-[#EFF2F4]"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
          Subscribe to our newsletter
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md sm:max-w-lg">
          <div className="bg-white py-1 px-3 flex items-center rounded-lg w-full">
            <MdOutlineMailOutline className="text-gray-500 text-xl sm:text-2xl mr-2" />
            <input
              className={`w-full py-2 px-1 outline-none text-sm sm:text-base ${
                themeMode === "dark" ? " text-black" : ""
              }`}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <button className="bg-[#0067FF] hover:bg-[#0055CC] text-white px-4 sm:px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
