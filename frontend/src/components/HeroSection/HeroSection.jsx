import React, { useContext, useEffect, useState } from "react";
import { TfiUser } from "react-icons/tfi";
import { Link } from "react-router-dom";
import DealsAndOffers from "./DealsAndOffers";
import HomeAndOutDoor from "./HomeAndOutDoor";
import SendInquiry from "./SendInquiry";
import RecommendedItems from "./RecommendedItems";
import OurServices from "./OurServices";
import { useNavigate } from "react-router-dom";
import url from "../../utils/url";
import { GlobalContext } from "../../context/GlobalContext";
import SuppliersByRegion from "./SuppliersByRegion";
import Newsletter from "./Newsletter";
import { toast } from "react-toastify";

const HeroSection = () => {
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [user, setUser] = useState("");
  const { handleApiCall, products, setProducts } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/products/`, "get");
      console.log("fetching all products", response.data.products);
      setLoading(false);
      setProducts(response.data.products);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response.data.user);
      } else {
        setIsUserLogin(false);
      }
    } catch (error) {
      toast.error("Error checking login status");
    }
  };

  useEffect(() => {
    fetchProducts();
    checkUserLoggedIn(); // Component mount hone par login status check karega
  }, []);

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
                <p className="text-sm">
                  Hi, <b>{user.name}</b> <br />
                  Let's get started
                </p>
              </div>
              {isUserLogin ? null : (
                <div className="flex flex-col">
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-[#127FFF] py-1 mb-2 cursor-pointer rounded-md text-sm text-white w-full"
                  >
                    Join Now
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm py-1 w-full cursor-pointer text-[#127fff] text-bold bg-white rounded-md"
                  >
                    Log in
                  </button>
                </div>
              )}
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
        <DealsAndOffers products={products} />
        <HomeAndOutDoor
          title="Home and outdoor"
          img="./Group 969.png"
          products={products}
        />
        <HomeAndOutDoor
          title="Consumer electronics and gadgets"
          img="./image 98.png"
          products={products}
        />
        <SendInquiry />
        <RecommendedItems />
        <OurServices />
        <SuppliersByRegion />
      </div>
      <Newsletter />
    </main>
  );
};

export default HeroSection;
