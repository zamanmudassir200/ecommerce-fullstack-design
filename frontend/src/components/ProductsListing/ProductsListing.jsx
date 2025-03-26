import React, { useContext, useEffect, useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { toast } from "react-toastify";
import url from "../../utils/url";
import ProductList from "./ProductList";
import ProductGrid from "./ProductGrid";
import Newsletter from "../HeroSection/Newsletter";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaStar } from "react-icons/fa";

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
  } = useContext(GlobalContext);

  // State for collapsible sections
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [showConditions, setShowConditions] = useState(true);
  const [showRatings, setShowRatings] = useState(true);

  // State for "See all" functionality
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // State for Price Range
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // State for Ratings
  const [rating, setRating] = useState(0); // Selected rating
  const [hoverRating, setHoverRating] = useState(0); // Hover rating

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
        `${url}/products/getCategories`,
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

  // Handle Price Range Change
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "min") {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  // Handle Rating Click
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const conditionRadioBtn = ["Any", "Refurbished", "Brand new", "Old items"];

  return (
    <>
      <main className="container my-5 mx-auto min-h-screen px-30">
        <div className="flex gap-4">
          {/* Left Section */}
          <div className="flex-[0.3] w-[240px] p-2 min-h-[1011px]">
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
                        className="py-[6px] select-none cursor-pointer"
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
            <hr className="border-[1px] border-gray-200 my-4" />

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
                      <div key={product._id} className="flex gap-4">
                        <input
                          className="cursor-pointer"
                          id={product._id}
                          type="checkbox"
                        />
                        <label
                          className="cursor-pointer py-1 select-none"
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
            <hr className="border-[1px] border-gray-200 my-4" />

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
                <div>
                  <input
                    type="range"
                    name="min"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={handlePriceRangeChange}
                  />
                  <input
                    type="range"
                    name="max"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={handlePriceRangeChange}
                  />
                  <div className="flex gap-4">
                    <div>
                      <label>Min</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <label>Max</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Apply
                  </button>
                </div>
              )}
            </div>
            <hr className="border-[1px] border-gray-200 my-4" />

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
                <div>
                  {conditionRadioBtn.map((radiobtn, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input id={index} type="radio" name="condition" />
                      <label htmlFor={index}>{radiobtn}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <hr className="border-[1px] border-gray-200 my-4" />

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
                        className={`cursor-pointer ${
                          starValue <= (hoverRating || rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverRating(starValue)} // Hover par color change
                        onMouseLeave={() => setHoverRating(0)} // Hover hatne par color reset
                        onClick={() => setRating(starValue)} // Click par rating set
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 border-[1px] rounded-lg border-gray-200">
                <div>
                  129911 items in <b>Mobile Accessory</b>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <input type="checkbox" /> <span>Verified Only</span>
                  </div>
                  <select
                    className="py-2 border-[1px] w-[150px] border-gray-200"
                    name=""
                    id=""
                  >
                    <option value="">Featured</option>
                  </select>
                  <div className="flex border-[1px] rounded-lg border-gray-200">
                    <button
                      onClick={() => setProductViewType("grid")}
                      className={`${
                        productViewType === "grid" ? "bg-gray-300 " : ""
                      } p-2 cursor-pointer overflow-hidden`}
                    >
                      <IoGrid size={23} />
                    </button>
                    <button
                      onClick={() => setProductViewType("list")}
                      className={`${
                        productViewType === "list" ? "bg-gray-300 " : ""
                      } p-2 cursor-pointer overflow-hidden`}
                    >
                      <FaListUl size={23} />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  productViewType === "list"
                    ? "flex flex-col gap-3"
                    : "grid grid-cols-3 gap-4"
                } my-5`}
              >
                {loading && <h1>Loading please wait....</h1>}
                {products &&
                  products.length > 0 &&
                  products.map((product) => {
                    return productViewType === "list" ? (
                      <ProductList key={product._id} product={product} />
                    ) : (
                      <ProductGrid key={product._id} product={product} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
    </>
  );
};

export default ProductsListing;
