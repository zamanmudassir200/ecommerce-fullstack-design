import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { IoGrid } from "react-icons/io5";
import { FaListUl, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import url from "../../utils/url";
const ProductGrid = lazy(() => import("./ProductGrid"));
const ProductList = lazy(() => import("./ProductList"));
const Newsletter = lazy(() => import("../HeroSection/Newsletter"));
import { GlobalContext } from "../../context/GlobalContext";

const ProductsListing = () => {
  const {
    products,
    productViewType,
    setProductViewType,
    categories,
    setLoading,
    setProducts,
    setCategories,
    loading,
    handleApiCall,
    themeMode,
  } = useContext(GlobalContext);

  // State for collapsible sections
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showConditions, setShowConditions] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // Mobile filters toggle

  // State for "See all" functionality
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // State for Price Range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // State for Ratings
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/products/`, "get");
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await handleApiCall(
        `${url}/categories/get-categories`,
        "get"
      );
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const conditionRadioBtn = ["Any", "Refurbished", "Brand new", "Old items"];

  return (
    <>
      <main
        className={`px-30  py-10 sm:px-6 lg:px-8 min-h-screen ${
          themeMode === "dark" ? "bg-slate-900 text-white" : ""
        }`}
      >
        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-between"
          >
            <span>Filters</span>
            {showFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Section - Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:flex-[0.3] lg:w-[240px] p-4 lg:p-2 bg-white lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none`}
          >
            {/* Categories */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Category</h1>
                <div
                  onClick={() => setShowCategories(!showCategories)}
                  className="cursor-pointer"
                >
                  {showCategories ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {showCategories && (
                <div>
                  {categories
                    .slice(0, showAllCategories ? categories.length : 4)
                    .map((category) => (
                      <h1
                        className="py-[6px] select-none cursor-pointer hover:text-blue-500"
                        key={category._id}
                      >
                        {category.name}
                      </h1>
                    ))}
                  <Link
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {showAllCategories ? "Show less" : "See all"}
                  </Link>
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-4" />

            {/* Brands */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Brands</h1>
                <div
                  onClick={() => setShowBrands(!showBrands)}
                  className="cursor-pointer"
                >
                  {showBrands ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {showBrands && (
                <div>
                  {products
                    .slice(0, showAllBrands ? products.length : 4)
                    .map((product) => (
                      <div
                        key={product._id}
                        className="flex gap-4 items-center"
                      >
                        <input
                          className="cursor-pointer"
                          id={product._id}
                          type="checkbox"
                        />
                        <label
                          className="cursor-pointer py-1 select-none hover:text-blue-500"
                          htmlFor={product._id}
                        >
                          {product.brand}
                        </label>
                      </div>
                    ))}
                  <Link
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {showAllBrands ? "Show less" : "See all"}
                  </Link>
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-4" />

            {/* Price Range */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Price Range</h1>
                <div
                  onClick={() => setShowPriceRange(!showPriceRange)}
                  className="cursor-pointer"
                >
                  {showPriceRange ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {showPriceRange && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="range"
                      name="min"
                      min="0"
                      max="1000"
                      value={minPrice}
                      onChange={handlePriceRangeChange}
                      className="w-full"
                    />
                    <input
                      type="range"
                      name="max"
                      min="0"
                      max="1000"
                      value={maxPrice}
                      onChange={handlePriceRangeChange}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm">Min</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm">Max</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                    Apply
                  </button>
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-4" />

            {/* Conditions */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Conditions</h1>
                <div
                  onClick={() => setShowConditions(!showConditions)}
                  className="cursor-pointer"
                >
                  {showConditions ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {showConditions && (
                <div className="space-y-2">
                  {conditionRadioBtn.map((radiobtn, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        id={`condition-${index}`}
                        type="radio"
                        name="condition"
                      />
                      <label
                        htmlFor={`condition-${index}`}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        {radiobtn}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <hr className="border border-gray-200 my-4" />

            {/* Ratings */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Ratings</h1>
                <div
                  onClick={() => setShowRatings(!showRatings)}
                  className="cursor-pointer"
                >
                  {showRatings ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              {showRatings && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className={`cursor-pointer text-xl ${
                          starValue <= (hoverRating || rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starValue)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Products */}
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg border-gray-200 gap-4 sm:gap-0">
                <div className="text-sm sm:text-base">
                  129911 items in <b>Mobile Accessory</b>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="verified" />
                    <label
                      htmlFor="verified"
                      className="cursor-pointer text-sm sm:text-base"
                    >
                      Verified Only
                    </label>
                  </div>
                  <select className="py-2 border w-full sm:w-[150px] border-gray-200 rounded text-sm sm:text-base">
                    <option value="">Featured</option>
                  </select>
                  <div className="flex border rounded-lg border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setProductViewType("grid")}
                      className={`${
                        productViewType === "grid" ? "bg-gray-400" : ""
                      } p-2 cursor-pointer transition-colors `}
                    >
                      <IoGrid size={20} />
                    </button>
                    <button
                      onClick={() => setProductViewType("list")}
                      className={`${
                        productViewType === "list" ? "bg-gray-400 " : ""
                      } p-2  overflow-hidden cursor-pointer transition-colors`}
                    >
                      <FaListUl size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`my-5 ${
                  productViewType === "list"
                    ? "flex flex-col gap-3"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                }`}
              >
                {loading && (
                  <div className="col-span-full text-center py-10">
                    Loading please wait...
                  </div>
                )}
                {products &&
                  products.length > 0 &&
                  products.map((product) => {
                    return productViewType === "list" ? (
                      <Suspense
                        key={product._id}
                        fallback={
                          <div
                            className={`text-center flex items-center h-screen ${
                              themeMode === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            Loading...
                          </div>
                        }
                      >
                        <ProductList product={product} />
                      </Suspense>
                    ) : (
                      <Suspense
                        key={product._id}
                        fallback={
                          <div
                            className={`text-center flex items-center h-screen ${
                              themeMode === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            Loading...
                          </div>
                        }
                      >
                        <ProductGrid key={product._id} product={product} />
                      </Suspense>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Suspense
        fallback={
          <div
            className={`text-center flex items-center h-screen ${
              themeMode === "dark" ? "text-white" : "text-black"
            }`}
          >
            Loading...
          </div>
        }
      >
        <Newsletter />
      </Suspense>
    </>
  );
};

export default ProductsListing;
