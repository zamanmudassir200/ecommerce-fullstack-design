// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const RelatedProducts = ({ recommendedProducts }) => {
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
//   }, [location]);

//   return (
//     <div className="w-full">
//       <h1 className="text-lg font-semibold py-2">Related Products</h1>
//       <div className="flex justify-between  my-3">
//         {recommendedProducts && recommendedProducts.length > 0 ? (
//           recommendedProducts.map((recommendedProduct) => {
//             return (
//               <div
//                 onClick={() =>
//                   navigate(`/product-detail/${recommendedProduct._id}`, {
//                     replace: true,
//                   })
//                 }
//                 key={recommendedProduct._id}
//                 className="flex hover:bg-gray-100 cursor-pointer p-3 flex-col justify-center items-center gap-3"
//               >
//                 <div className="w-32  h-32 overflow-hidden">
//                   <img
//                     className="h-full w-full object-contain"
//                     src={recommendedProduct.images[0]}
//                   />
//                 </div>
//                 <div className="">
//                   <h1 className="text-xl font-semibold">
//                     {recommendedProduct.productName}
//                   </h1>
//                   <p className="text-sm text-center ">
//                     {recommendedProduct.price} Rs
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-sm text-gray-500 ">No recommendations available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RelatedProducts = ({ recommendedProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-lg md:text-xl font-semibold py-2">
        Related Products
      </h1>

      {recommendedProducts && recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-3">
          {recommendedProducts.map((product) => (
            <div
              onClick={() =>
                navigate(`/product-detail/${product._id}`, {
                  replace: true,
                })
              }
              key={product._id}
              className="flex flex-col items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200"
            >
              <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    className="h-full w-full object-contain p-2"
                    src={product.images[0]}
                    alt={product.productName}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No image</span>
                )}
              </div>
              <div className="w-full text-center">
                <h1 className="text-sm sm:text-base font-semibold line-clamp-2">
                  {product.productName}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{product.price} Rs</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-4 text-center">
          No recommendations available
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
