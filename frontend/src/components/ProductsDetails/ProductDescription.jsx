// import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import { toast } from "react-toastify";
// import url from "../../utils/url";
// import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import RelatedProducts from "./RelatedProducts";

// const ProductDescription = ({ currentProduct }) => {
//   const { categories, products, setProducts, handleApiCall, setLoading } =
//     useContext(GlobalContext);
//   const [recommendedProducts, setRecommendedProducts] = useState([]);
//   const [selectedTab, setSelectedTab] = useState("Description");

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Location change ke baad jo bhi data fetch karna hai wo yahan kar sakte hain
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//     console.log("Route changed to: ", location.pathname);
//     // Example: fetchProductDetails(location.pathname);
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await handleApiCall(`${url}/products/`, "get");
//       setLoading(false);
//       setProducts(response.data.products);

//       // Filter recommended products once data is loaded
//       if (currentProduct) {
//         const recommended = response.data.products.filter(
//           (product) =>
//             // Show products from same category or subcategory
//             (product.category.name === currentProduct.category.name ||
//               product.subCategory.name === currentProduct.subCategory.name) &&
//             // Exclude the current product itself
//             product._id !== currentProduct._id
//         );
//         setRecommendedProducts(recommended.slice(0, 10)); // Show max 4 recommended items
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Error fetching products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [currentProduct]); // Refetch when currentProduct changes
//   const tabs = ["Description", "Reviews", "Shopping", "About seller"];
//   return (
//     <>
//       <main className="flex my-3 gap-6  justify-between">
//         <div className="flex w-full flex-col rounded-lg  border-[1px]  border-gray-200">
//           <div className="h-[48px] flex items-center pl-3  border-b-[1px] border-gray-200">
//             {tabs.map((tab, index) => {
//               return (
//                 <button
//                   onClick={() => setSelectedTab(tab)}
//                   className={` ${
//                     selectedTab === tab
//                       ? "text-blue-600 border-b-2 font-semibold border-blue-600"
//                       : ""
//                   } px-4 py-3  cursor-pointer`}
//                   key={index}
//                 >
//                   {tab}
//                 </button>
//               );
//             })}
//           </div>
//           <div className="">
//             {selectedTab === "Description" && (
//               <div className="p-3 text-justify">
//                 {currentProduct.description}
//               </div>
//             )}
//             {selectedTab === "Reviews" && (
//               <div className="p-3 text-justify">
//                 {currentProduct.description}
//               </div>
//             )}
//             {selectedTab === "Shopping" && (
//               <div className="p-3 text-justify">
//                 {currentProduct.description}
//               </div>
//             )}
//             {selectedTab === "About seller" && (
//               <div className="p-3 text-justify">
//                 {currentProduct.description}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-[310px] overflow-y-scroll h-[513px] border-[1px] border-gray-200 rounded-lg shadow-sm">
//           <h1 className="text-md font-semibold p-2">You may like</h1>
//           <div className="space-y-4 p-2">
//             {recommendedProducts?.length > 0 ? (
//               recommendedProducts?.map((product) => (
//                 <div
//                   onClick={() =>
//                     navigate(`/product-detail/${product._id}`, {
//                       replace: true,
//                     })
//                   }
//                   key={product._id}
//                   className="flex items-center cursor-pointer gap-3 p-2 hover:bg-gray-100 rounded"
//                 >
//                   <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
//                     {product.images?.length > 0 ? (
//                       <img
//                         src={product.images[0]}
//                         alt={product.productName}
//                         className="w-full h-full object-contain"
//                       />
//                     ) : (
//                       <span className="text-xs text-gray-400">No image</span>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-sm font-medium line-clamp-1">
//                       {product.productName}
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm font-semibold">
//                         $
//                         {(product.price * (1 - product.discount / 100)).toFixed(
//                           2
//                         )}
//                       </span>
//                       {product.discount > 0 && (
//                         <span className="text-xs text-gray-500 line-through">
//                           ${product.price}
//                         </span>
//                       )}
//                     </div>
//                     {product.rating > 0 && (
//                       <div className="flex items-center">
//                         <span className="text-xs text-yellow-500">★</span>
//                         <span className="text-xs ml-1">{product.rating}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500 p-2">
//                 No recommendations available
//               </p>
//             )}
//           </div>
//         </div>
//       </main>
//       <RelatedProducts recommendedProducts={recommendedProducts} />
//     </>
//   );
// };

// export default ProductDescription;

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
          <div className="h-12 flex items-center border-b border-gray-200 overflow-x-auto">
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
