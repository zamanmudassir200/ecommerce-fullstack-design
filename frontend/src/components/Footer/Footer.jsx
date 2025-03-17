import React from "react";
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="py-14">
        <div className="flex items-center justify-evenly">
          <div className="flex gap-4 w-[276px] flex-col items-start ">
            <img src="./logo-colored.png" alt="" />
            <h1>
              Best information about the company gies here but now lorem ipsum
              is
            </h1>
            <div className="flex justify-between text-white gap-3">
              <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
                <TiSocialFacebook size={20} />
              </Link>
              <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
                <TiSocialTwitter size={20} />
              </Link>
              <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
                <TiSocialLinkedin size={20} />
              </Link>
              <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all rounded-full p-2">
                <AiOutlineInstagram size={20} />
              </Link>
              <Link className="bg-gray-400 hover:bg-gray-500 duration-300 transition-all  rounded-full p-2">
                <AiFillYoutube size={20} />
              </Link>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold">About</h1>
            <div className="flex flex-col gap-1 text-gray-500 mt-2">
              <Link>About us</Link>
              <Link>Find Store</Link>
              <Link>Categories</Link>
              <Link>Blogs</Link>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold">Partnership</h1>
            <div className="flex flex-col gap-1 text-gray-500 mt-2">
              <Link>About us</Link>
              <Link>Find Store</Link>
              <Link>Categories</Link>
              <Link>Blogs</Link>
            </div>
          </div>{" "}
          <div className="">
            <h1 className="font-semibold">Information</h1>
            <div className="flex flex-col gap-1 text-gray-500 mt-2">
              <Link>About us</Link>
              <Link>Find Store</Link>
              <Link>Categories</Link>
              <Link>Blogs</Link>
            </div>
          </div>{" "}
          <div className="">
            <h1 className="font-semibold">For users</h1>
            <div className="flex flex-col gap-1 text-gray-500 mt-2">
              <Link to="/login">Login</Link>
              <Link to="/signup">Register</Link>
              <Link>Setting</Link>
              <Link>My Orders</Link>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold">Get app</h1>
            <div className="flex flex-col gap-1 text-gray-500 mt-2">
              <Link className="bg-black p-2 rounded-lg flex gap-1 items-center justify-center text-white">
                <FaApple size={29} />

                <div className="">
                  <p className="text-[10px] text-gray-300">Download on the </p>
                  <h1>App Store</h1>
                </div>
              </Link>
              <Link className="bg-black p-2 rounded-lg flex gap-1 items-center justify-center text-white">
                <FaGooglePlay size={29} />
                <div className="">
                  <p className="text-[10px] text-gray-300">GET IT ON </p>
                  <h1>Google Play</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF2F4] py-6 text-gray-700">
        <div className=" flex items-center justify-between px-28  ">
          <div className="">&copy; {new Date().getFullYear()} Ecommerce.</div>
          <div className="">
            <select name="" id="">
              <option value="">English</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
