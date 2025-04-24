import React, { useContext, useEffect, useState } from "react";
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
import WelcomeUser from "./WelcomeUser";

const HeroSection = () => {
  const {
    handleApiCall,
    themeMode,
    products,
    categories,
    setCategories,
    setProducts,
  } = useContext(GlobalContext);
  const [user, setUser] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      console.log("response from herosection checkauth:", response);
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response.data.user);
      } else {
        navigate("/login");
        setIsUserLogin(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await handleApiCall(
        `${url}/categories/get-categories`,
        "get"
      );
      setLoading(false);

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
    fetchCategories();
  }, []);
  return (
    <main
      className={`min-h-screen ${
        themeMode === "dark" ? "bg-slate-900" : "bg-white "
      } `}
    >
      <div
        className={`${
          themeMode === "dark" ? "bg-slate-900" : "bg-white "
        } container mx-auto px-4 sm:px-6 lg:px-8 py-3 `}
      >
        {/* Main Hero Section */}
        <div
          className={`min-h-[400px] w-full flex flex-col lg:flex-row justify-between items-start p-3 gap-4 border border-gray-300 rounded-md shadow-sm `}
        >
          {/* Categories Sidebar - Hidden on small screens, shown on medium and up */}
          <div
            className={`hidden md:flex w-full lg:w-[25%] flex-col bg-gray-50 rounded-lg ${
              themeMode === "dark"
                ? "bg-slate-900 text-white "
                : "bg-white text-black "
            } `}
          >
            <ul className="max-h-[370px] overflow-y-auto">
              {loading && (
                <h1 className="flex min-h-[400px] items-center justify-center">
                  Loading...
                </h1>
              )}
              {categories.map((category) => (
                <Link
                  to={`./${category.name.split(" ").join("-")}`}
                  key={category._id}
                  className={`py-2 px-3 block hover:font-semibold transition-all rounded-md cursor-pointer  text-sm md:text-base ${
                    themeMode === "light"
                      ? "hover:bg-[#E5F1FF] "
                      : "hover:bg-[#E5F1FF] hover:text-black"
                  }`}
                >
                  {category.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                </Link>
              ))}
            </ul>
          </div>

          {/* Main Banner - Takes full width on mobile, 2/3 on desktop */}
          <div className="relative h-full xl:h-[50%] w-full xl:w-[50%] rounded-lg overflow-hidden">
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
              <WelcomeUser user={user} isUserLogin={isUserLogin} />
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
