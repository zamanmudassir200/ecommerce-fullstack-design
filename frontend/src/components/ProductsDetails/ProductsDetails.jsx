import React, { useContext, useEffect, lazy, useState, Suspense } from "react";
import { motion } from "framer-motion";

import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
const SellerProfile = lazy(() => import("./SellerProfile"));
const ProductDescription = lazy(() => import("./ProductDescription"));

const ProductsDetails = () => {
  const { productId } = useParams();
  const {
    handleApiCall,
    productReviews,
    themeMode,
    setCartNumber,
    cartNumber,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [user, setUser] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [sellerProfileModalOpen, setSellerProfileModalOpen] = useState(false);

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
    } catch (error) {
      toast.error("Error checking login status");
    }
  };
  const fetchProductById = async () => {
    try {
      const response = await handleApiCall(`${url}/products/${productId}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
    fetchProductById();
  }, [productId]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleAddToCart = async () => {
    try {
      if (quantity <= 0) {
        toast.error("Quantity can't be 0");
        return;
      }
      const response = await handleApiCall(
        `${url}/carts/${productId}`,
        "post",
        { quantity }
      );
      setCartNumber(cartNumber + 1);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while adding to cart");
    }
  };

  if (!product) {
    return (
      <div
        className={`text-xl text-center h-[450px] flex items-center justify-center py-10 ${
          themeMode === "dark" ? "bg-slate-900 text-white" : ""
        }`}
      >
        Loading...
      </div>
    );
  }
  return (
    <main
      className={`relative ${
        themeMode === "dark" ? "bg-slate-900 text-white" : ""
      } px-30 py-10 sm:px-6 lg:px-8`}
    >
      <div className="w-full my-5 min-h-[580px] p-3 border rounded-lg border-gray-200">
        {/* Main Product Container */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6 justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Images Section */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <motion.div
              className="w-full sm:w-[380px] h-[300px] sm:h-[380px] rounded-lg overflow-hidden relative border border-gray-200 mx-auto"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product.images?.length > 0 && (
                <img
                  src={product.images[imageIndex]}
                  alt={product.productName}
                  className={`w-full h-full object-contain transition-transform duration-150 ease-in-out ${
                    isHovering ? "scale-[1.5] cursor-zoom-in" : "scale-[1]"
                  }`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                  loading="lazy"
                />
              )}
            </motion.div>

            {/* Thumbnail Images */}
            <div className="w-full sm:w-[382px] h-auto flex gap-2 overflow-x-auto pb-2 mx-auto">
              {product.images?.map((image, index) => (
                <motion.div
                  onClick={() => setImageIndex(index)}
                  key={index}
                  className={`min-w-[60px] h-[60px] border rounded-lg border-gray-200 cursor-pointer overflow-hidden ${
                    imageIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    className="h-full w-full object-contain"
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-green-500 font-bold text-lg">
                {product.stock > 0 ? "✔ In stock" : "Out of stock"}
              </span>
            </motion.div>
            <motion.h1
              className="text-xl sm:text-2xl font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product?.productName}
            </motion.h1>

            <motion.div
              className="flex items-center justify-between mb-4 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                {product?.reviews && product?.reviews?.length > 0 ? (
                  <span>
                    <strong>
                      {(
                        product?.reviews?.reduce(
                          (sum, review) => sum + review?.rating,
                          0
                        ) / product?.reviews?.length
                      ).toFixed(1)}
                    </strong>{" "}
                    rating
                  </span>
                ) : (
                  "No ratings yet"
                )}
              </p>
              <p>
                {product?.reviews?.length > 0 ? (
                  <span>
                    <b>{product?.reviews?.length}</b>{" "}
                    {product?.reviews?.length > 1 ? "reviews" : "review"}
                  </span>
                ) : (
                  "No reviews"
                )}
              </p>
              <p>{product?.stock} Sold</p>
            </motion.div>

            {/* Price Tiers */}
            <div
              className={`bg-[#FFF0DF] p-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-10 mb-4 ${
                themeMode === "dark" ? "bg-slate-800 text-white" : ""
              }`}
            >
              <div className="p-2">
                <h1 className="text-red-600 text-lg font-bold">
                  {product.price} Rs
                </h1>
                <p className="text-gray-500 text-sm">50-90 pcs</p>
              </div>
              <div className="p-2 sm:border-l border-gray-200">
                <h1 className="text-lg font-bold">{product.price - 200} Rs</h1>
                <p className="text-gray-500 text-sm">100-700 pcs</p>
              </div>
              <div className="p-2 sm:border-l border-gray-200">
                <h1 className="text-lg font-bold">{product.price - 500} Rs</h1>
                <p className="text-gray-500 text-sm">700+ pcs</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3 border-b border-gray-200 py-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-28">
                <h1 className="w-[80px] sm:w-[60px]">Price:</h1>
                <p className="font-semibold">Negotiable</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-28">
                <h1 className="w-[80px] sm:w-[60px]">Type:</h1>
                <p className="font-semibold">
                  {product.subCategory?.name
                    ?.split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-28">
                <h1 className="w-[80px] sm:w-[60px]">Warranty:</h1>
                <p className="font-semibold">2 years full warranty</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-28">
                <h1 className="w-[80px] sm:w-[60px]">Protection:</h1>
                <p className="font-semibold">Refund Policy</p>
              </div>
            </div>
          </div>

          {/* Supplier & Action Section */}
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full relative lg:w-[280px]">
              <div className="w-full flex flex-col justify-between p-3 h-auto lg:h-[325px] border rounded-lg border-gray-200 mb-4">
                <div>
                  <h1 className="font-bold">
                    Supplier: {product?.user?.name} <br />
                    Shop: {product?.brand}
                  </h1>
                </div>
                <hr className="my-2" />
                <div className="mb-4">
                  {product.user?.address?.street} {product.user?.address.city}{" "}
                  {product.user?.address.postalCode}{" "}
                  {product?.user?.address?.country}
                </div>
                <div className="flex flex-col gap-3">
                  <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors">
                    Send Inquiry
                  </button>
                  <button
                    onClick={() => setSellerProfileModalOpen(true)}
                    className={`w-full cursor-pointer text-black border border-gray-200 hover:bg-gray-100 rounded-lg py-2 transition-colors ${
                      themeMode === "dark"
                        ? "text-white hover:text-black"
                        : "border-gray-200"
                    }`}
                  >
                    Seller's Profile
                  </button>
                </div>
              </div>

              <div className="text-center font-semibold">
                <div className="flex text-blue-500 items-center justify-center gap-2 hover:text-blue-700 cursor-pointer">
                  <FaRegHeart size={20} />
                  <span>Save for later</span>
                </div>

                <div className="">
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
                    <h1 className="px-2">Quantity:</h1>
                    <div className="border flex border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className="border-r border-gray-300 rounded-l-lg cursor-pointer px-3 sm:px-4 py-2 bg-white text-black hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        ➖
                      </button>
                      <input
                        className="w-[60px] sm:w-[80px] text-center border-none focus:ring-0"
                        value={quantity}
                        type="number"
                        min="1"
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="border-l border-gray-300 rounded-r-lg px-3 sm:px-4 cursor-pointer py-2 bg-white text-black hover:bg-gray-100"
                      >
                        ➕
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={handleAddToCart}
                      className="cursor-pointer border px-3 py-2 text-white rounded-lg bg-green-600 hover:bg-green-700 w-full transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              {sellerProfileModalOpen && (
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
                  {" "}
                  <SellerProfile
                    product={product}
                    setSellerProfileModalOpen={setSellerProfileModalOpen}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
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
        <ProductDescription currentProduct={product} />
      </Suspense>
    </main>
  );
};

export default ProductsDetails;
