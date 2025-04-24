import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import url from "../../utils/url";
import { Link, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import ReviewForm from "./ReviewForm";

const ProductDescription = ({ currentProduct }) => {
  const {
    categories,
    products,
    setProducts,
    handleApiCall,
    setLoading,
    fetchAllProductReviews,
    // productReviews,
    // setProductReviews,
    themeMode,
  } = useContext(GlobalContext);
  const [productReviews, setProductReviews] = useState([]);

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Description");

  const { productId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/products/`, "get");
      setLoading(false);
      setProducts(response.data.products);

      if (currentProduct) {
        const recommended = response.data.products.filter(
          (product) =>
            (product.category?.name === currentProduct.category?.name ||
              product.subCategory?.name === currentProduct.subCategory?.name) &&
            product._id !== currentProduct._id
        );
        setRecommendedProducts(recommended.slice(0, 10));
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const fetchProductByIdReviews = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(
        `${url}/products/${productId}`,
        "get"
      );
      setProductReviews(response.data.product.reviews || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error while fetching reviews");
    }
  };
  const handleReviewSubmit = async (data) => {
    const reviewData = {
      rating: data.rating,
      comment: data.comment,
    };
    try {
      const response = await handleApiCall(
        `${url}/reviews/${productId}`,
        "post",
        reviewData
      );

      setProductReviews((prev) => [...prev, response?.data?.review]);
      console.log("reposne from handleReview Submit", response.data.review);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while submitting review");
    }
  };

  console.log("productReviews", productReviews);
  useEffect(() => {
    fetchProducts();
  }, [currentProduct]);
  useEffect(() => {
    fetchProductByIdReviews();
  }, [productId]);
  const tabs = ["Description", "Reviews", "Shopping", "About seller"];

  return (
    <>
      <main className="flex flex-col lg:flex-row my-3 gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="flex-1 rounded-lg border border-gray-200">
          {/* Tabs */}
          <div className="h-12 flex items-center border-b border-gray-200 ">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setSelectedTab(tab)}
                className={`${
                  selectedTab === tab
                    ? "text-blue-600 border-b-2 font-semibold border-blue-600"
                    : "text-gray-600"
                } px-3 sm:px-4 py-3 whitespace-nowrap cursor-pointer`}
                key={index}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4">
            {selectedTab === "Description" && (
              <div className="text-justify text-sm sm:text-base">
                {currentProduct?.description || "No description available"}
              </div>
            )}
            {selectedTab === "Reviews" && (
              <div className="h-[500px] overflow-y-auto text-justify text-sm sm:text-base space-y-6">
                <ReviewForm
                  onSubmit={(data) => {
                    handleReviewSubmit(data);
                  }}
                />
                <hr className="border-gray-200 my-2" />
                <div className="space-y-4">
                  {productReviews?.length === 0 && (
                    <p className="text-gray-500">No reviews available.</p>
                  )}
                  {productReviews &&
                    productReviews?.length > 0 &&
                    productReviews?.map((review, index) => (
                      <div
                        key={index}
                        className={`border p-4 rounded-lg shadow-sm  ${
                          themeMode === "dark"
                            ? "bg-slate-700 text-white"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex  items-center justify-between">
                          <div
                            className={`flex items-center gap-3 font-semibold  ${
                              themeMode === "dark"
                                ? "text-white"
                                : "text-gray-800"
                            }`}
                          >
                            <div className="my-2 rounded-2xl w-10 h-10 overflow-hidden">
                              <img
                                className="w-full h-full rounded-2xl object-cover"
                                src={review?.user?.profilePic}
                                alt=""
                              />
                            </div>
                            <p className="capitalize">{review?.user?.name}</p>
                          </div>
                          <div
                            className={`text-sm  ${
                              themeMode === "dark"
                                ? "text-white opacity-55"
                                : "text-gray-500"
                            }`}
                          >
                            {new Date(review?.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="mt-2">
                          <span className="text-yellow-500 font-medium">
                            ⭐ Rating: {review?.rating}/5
                          </span>
                        </div>

                        <p
                          className={` mt-2 ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {review?.comment}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {selectedTab === "Shopping" && (
              <div className="text-justify text-sm sm:text-base">
                {currentProduct?.description || "No shipping info available"}
              </div>
            )}
            {selectedTab === "About seller" && currentProduct?.user && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-3 text-sm sm:text-base">
                <div className="flex items-center space-x-4">
                  <img
                    src={currentProduct.user.profilePic}
                    alt={currentProduct.user.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {currentProduct.user.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {currentProduct.user.userType}
                    </p>
                  </div>
                </div>

                <div className="mt-2 text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {currentProduct.user.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {currentProduct.user.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Products Listed:</span>{" "}
                    {currentProduct.user.products?.length || 0}
                  </p>
                  <p>
                    <span className="font-medium">Joined:</span>{" "}
                    {new Date(
                      currentProduct.user.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products Sidebar */}
        <div className="w-full lg:w-[310px] h-auto lg:h-[513px] border border-gray-200 rounded-lg shadow-sm">
          <h1 className="text-sm sm:text-md font-semibold p-3">You may like</h1>
          <div className="space-y-3 p-2 overflow-y-auto">
            {recommendedProducts?.length > 0 ? (
              recommendedProducts.map((product) => (
                <div
                  onClick={() =>
                    navigate(`/product-detail/${product._id}`, {
                      replace: true,
                    })
                  }
                  key={product._id}
                  className={`flex items-center cursor-pointer gap-3 p-2 hover:bg-gray-100 rounded transition-colors ${
                    themeMode === "dark"
                      ? "hover:bg-slate-700"
                      : "border-2 border-gray-200"
                  } `}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium line-clamp-2">
                      {product.productName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs sm:text-sm font-semibold">
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}{" "}
                        Rs
                      </span>
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          {product.price} Rs
                        </span>
                      )}
                    </div>
                    {product.rating > 0 && (
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-2">
                No recommendations available
              </p>
            )}
          </div>
        </div>
      </main>
      <RelatedProducts recommendedProducts={recommendedProducts} />
    </>
  );
};

export default ProductDescription;
