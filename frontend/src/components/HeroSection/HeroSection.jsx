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
import { GiCage } from "react-icons/gi";

const HeroSection = () => {
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [user, setUser] = useState("");
  const { handleApiCall, products, categories, setCategories, setProducts } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response.data.user);
      } else {
        navigate("/login");
        setIsUserLogin(false);
      }
    } catch (error) {}
  };

  const fetchCategories = async () => {
    try {
      const response = await handleApiCall(
        `${url}/categories/get-categories`,
        "get"
      );
      setCategories(response.data.categories);
    } catch (error) {}
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/products/`, "get");
      setLoading(false);
      setProducts(response.data.products);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    checkUserLoggedIn();
    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main Hero Section */}
        <div className="min-h-[400px] w-full bg-white flex flex-col lg:flex-row justify-between items-start p-3 gap-4 border border-gray-300 rounded-md shadow-sm">
          {/* Categories Sidebar - Hidden on small screens, shown on medium and up */}
          <div className="hidden md:flex w-full lg:w-[25%] flex-col bg-gray-50 rounded-lg">
            <ul className="max-h-[370px] overflow-y-auto">
              {categories.map((category) => (
                <Link
                  to={`./${category.name.split(" ").join("-")}`}
                  key={category._id}
                  className="py-2 px-3 block hover:font-semibold transition-all rounded-md cursor-pointer hover:bg-[#E5F1FF] text-sm md:text-base"
                >
                  {category.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                </Link>
              ))}
            </ul>
          </div>

          {/* Main Banner - Takes full width on mobile, 2/3 on desktop */}
          <div className="relative h-64 md:h-auto w-full lg:w-[50%] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="./Banner-board-800x420 2.png"
              alt="Latest trending electronic items"
            />
            <div className="absolute top-4 left-4 md:top-10 md:left-10 flex flex-col gap-2 md:gap-4">
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl">
                  Latest trending
                </h1>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Electronic Items
                </h1>
              </div>
              <button className="bg-white self-start rounded-md py-1 px-3 md:py-2 md:px-4 font-medium md:font-semibold cursor-pointer text-sm md:text-base">
                Learn more
              </button>
            </div>
          </div>

          {/* User Info and Offers - Stacked below on mobile, sidebar on desktop */}
          <div className="flex flex-col w-full lg:w-[23%] gap-3">
            {/* User Card */}
            <div className="bg-[#E3F0FF] p-3 md:p-4 rounded-md">
              <div className="flex gap-2 my-1 md:my-2 items-center">
                <div className="bg-blue-400 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <TfiUser className="text-white text-xl md:text-2xl" />
                </div>
                <p className="text-xs md:text-sm">
                  {user?.name ? (
                    <>
                      Hi, <b>{user.name}</b> <br />
                      Let's get started
                    </>
                  ) : (
                    "Welcome Guest"
                  )}
                </p>
              </div>
              {!isUserLogin && (
                <div className="flex flex-col gap-1 md:gap-2">
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-[#127FFF] py-1 md:py-1.5 cursor-pointer rounded-md text-xs md:text-sm text-white w-full"
                  >
                    Join Now
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-xs md:text-sm py-1 md:py-1.5 w-full cursor-pointer text-[#127fff] font-medium bg-white rounded-md border border-[#127FFF]"
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>

            {/* Offer Cards */}
            <div className="bg-orange-400 h-20 md:h-24 rounded-lg flex items-center p-3 md:p-4">
              <h1 className="text-xs md:text-sm text-white">
                Get US $10 off <br /> with a new <br />
                supplier
              </h1>
            </div>
            <div className="bg-[#55BDC3] h-20 md:h-24 rounded-lg flex items-center p-3 md:p-4">
              <h1 className="text-xs md:text-sm text-white">
                Send quotes with <br />
                supplier preferences
              </h1>
            </div>
          </div>
        </div>

        {/* Mobile Categories Dropdown - Visible only on small screens */}
        <div className="md:hidden mt-4 w-full">
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) =>
              navigate(`./${e.target.value.split(" ").join("-")}`)
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name.replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Other Sections */}
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
