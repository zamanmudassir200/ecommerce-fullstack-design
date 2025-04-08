import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import url from "../../utils/url";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";

const ProductDescription = ({ currentProduct }) => {
  const { categories, products, setProducts, handleApiCall, setLoading } =
    useContext(GlobalContext);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Description");

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

  useEffect(() => {
    fetchProducts();
  }, [currentProduct]);

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
              <div className="text-justify text-sm sm:text-base">
                {currentProduct?.description || "No reviews available"}
              </div>
            )}
            {selectedTab === "Shopping" && (
              <div className="text-justify text-sm sm:text-base">
                {currentProduct?.description || "No shipping info available"}
              </div>
            )}
            {selectedTab === "About seller" && (
              <div className="text-justify text-sm sm:text-base">
                {currentProduct?.description || "No seller info available"}
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
                  className="flex items-center cursor-pointer gap-3 p-2 hover:bg-gray-100 rounded transition-colors"
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
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          ${product.price}
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
