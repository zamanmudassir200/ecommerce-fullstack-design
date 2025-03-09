import React from "react";
import { TfiUser } from "react-icons/tfi";
import { Link } from "react-router-dom";
import DealsAndOffers from "./DealsAndOffers";
import HomeAndOutDoor from "./HomeAndOutDoor";
import SendInquiry from "./SendInquiry";
import RecommendedItems from "./RecommendedItems";
import OurServices from "./OurServices";
const HeroSection = () => {
  const tabsLink = [
    {
      name: "Automobiles",
      route: "/",
    },
    {
      name: "Clothes and Wear",
      route: "/",
    },
    {
      name: "Home Interiors",
      route: "/",
    },
    {
      name: "Computer and tech",
      route: "/",
    },
    {
      name: "Tools, Equipments",
      route: "/",
    },
    {
      name: "Sports and Outdoor",
      route: "/",
    },
    {
      name: "Animal and pets",
      route: "/",
    },
    {
      name: "Machinery tools",
      route: "/",
    },
    {
      name: "More category",
      route: "/",
    },
  ];
  return (
    <main className="min-h-screen">
      <div className="container py-3 mx-auto px-30">
        <div className="h-[400px] w-full bg-white flex justify-between items-start p-3 gap-4  border-[1px] border-gray-400 rounded-md">
          <div className="flex w-[30%] flex-col">
            <ul>
              {tabsLink.map((tabLink, index) => {
                return (
                  <Link
                    key={index}
                    className="py-2 px-2 block hover:font-semibold transition-all  rounded-md cursor-pointer hover:bg-[#E5F1FF]"
                    to={tabLink.route}
                  >
                    {tabLink.name}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="relative h-full w-[72%] ">
            <img
              className="w-full h-full object-cover"
              src="./Banner-board-800x420 2.png"
              alt=""
            />
            <div className="absolute top-10 left-10 flex flex-col gap-4">
              <div className="">
                <h1 className="text-2xl">Latest trending</h1>
                <h1 className="text-3xl font-bold">Electronic Items</h1>
              </div>
              <button className="bg-white self-start rounded-md py-2 px-4 font-semibold cursor-pointer">
                Learn more
              </button>
            </div>
          </div>
          <div className="flex flex-col w-[25%] gap-3">
            <div className="bg-[#E3F0FF] p-4 rounded-md">
              <div className="flex gap-2 my-2 items-center">
                <p className="bg-blue-400 rounded-[40%] p-4 flex items-center justify-center">
                  {" "}
                  <TfiUser className="text-white text-2xl" />
                </p>
                <p>
                  Hi, user <br />
                  Let's get started
                </p>
              </div>
              <div className="flex flex-col">
                <button className="bg-[#127FFF] py-1 mb-2 cursor-pointer rounded-md text-sm text-white w-full">
                  Join Now
                </button>
                <button className="text-sm py-1 w-full cursor-pointer text-[#127fff] text-bold bg-white rounded-md">
                  Log in
                </button>
              </div>
            </div>
            <div className="bg-orange-400 h-[95px] rounded-lg flex items-center pt-[16px] pb-[22px] pl-[16px] pr-[40px] justify-center">
              <h1 className="text-sm w-[144px] text-white h-[57px]">
                Get US $10 off <br /> with a new <br />
                supplier
              </h1>
            </div>
            <div className="bg-[#55BDC3] h-[95px] rounded-lg flex items-center pt-[16px] pb-[22px] pl-[16px] pr-[40px] justify-center">
              <h1 className=" text-sm w-[144px] text-white h-[57px]">
                Send quotes with supplier <br />
                preferences
              </h1>
            </div>
          </div>
        </div>
        <DealsAndOffers />
        <HomeAndOutDoor title="Home and outdoor" img="./Group 969.png" />
        <HomeAndOutDoor
          title="Consumer electronics and gadgets"
          img="./image 98.png"
        />
        <SendInquiry />
        <RecommendedItems />
        <OurServices />
      </div>
    </main>
  );
};

export default HeroSection;
