import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";

const Newsletter = () => {
  return (
    <div className="bg-[#EFF2F4] flex items-center justify-center h-[190px] ">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-bold mt-4 ">
          Subscribe on our newsletter
        </h1>
        <p className="text-lg ">
          Get daily news on upcoming offers from many suppliers all over the
          world
        </p>
        <div className="flex gap-3 w-[392px]  items-center justify-center my-6">
          <div className="bg-white py-1 w-[274px] flex rounded-lg items-center justify-center gap-1">
            <MdOutlineMailOutline size={34} className="text-gray-600 pl-2" />

            <input
              className="text-lg w-full px-2 outline-none"
              type="email"
              placeholder="Email"
            />
          </div>
          <button className="bg-[#0067FF] text-white px-5  cursor-pointer rounded-lg font-semibold py-2">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
