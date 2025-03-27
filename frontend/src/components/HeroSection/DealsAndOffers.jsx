// import React from "react";
// import { useNavigate } from "react-router-dom";

// const DealsAndOffers = ({ products }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="my-5 min-h-[240px] border border-gray-300 rounded-md bg-white">
//       <div className="rounded-lg mx-auto">
//         <div className="flex flex-col sm:flex-row">
//           {/* Title Section */}
//           <div className="sm:h-[235px] py-4 sm:py-0 flex text-lg font-semibold items-center justify-center flex-col sm:flex-[0.32] sm:border-r border-gray-300 border-b sm:border-b-0">
//             <h1 className="text-center">Deals and Offers</h1>
//             <p className="text-gray-600">Hygiene Equipments</p>
//           </div>

//           {/* Products Section */}
//           <div className="flex sm:flex-1 overflow-x-auto sm:overflow-x-visible">
//             <div className="flex flex-row sm:flex-wrap w-full">
//               {products.map(
//                 (product, index) =>
//                   product.discount > 0 && (
//                     <div
//                       onClick={() => navigate(`/product-detail/${product._id}`)}
//                       key={index}
//                       className="flex cursor-pointer hover:bg-gray-100 duration-200 transition-colors items-center min-w-[200px] sm:min-w-[25%] justify-center gap-2 flex-col h-[200px] sm:h-[235px] border-r border-b border-gray-300 sm:border-b-0 last:border-r-0"
//                     >
//                       <div className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] overflow-hidden">
//                         <img
//                           className="h-full w-full object-contain"
//                           src={product.images[0]}
//                           alt={product.productName}
//                         />
//                       </div>

//                       <h1 className="font-semibold text-sm sm:text-base text-center px-2">
//                         {product.productName}
//                       </h1>
//                       <p className="font-semibold bg-[#FFE3E3] text-xs sm:text-sm rounded-2xl text-[#EB001B] px-3 py-1">
//                         -{product.discount}%
//                       </p>
//                     </div>
//                   )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DealsAndOffers;

import React from "react";
import { useNavigate } from "react-router-dom";

const DealsAndOffers = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="my-5 min-h-[240px] border border-gray-300 rounded-md bg-white">
      <div className="rounded-lg mx-auto">
        {/* Mobile Layout (vertical) */}
        <div className="sm:hidden">
          {/* Title Section */}
          <div className="py-4 flex text-lg font-semibold items-center justify-center flex-col border-b border-gray-300">
            <h1 className="text-center">Deals and Offers</h1>
            <p className="text-gray-600">Hygiene Equipments</p>
          </div>

          {/* Products Section - Horizontal Scroll */}
          <div className="overflow-x-auto">
            <div className="flex w-max min-w-full">
              {products.map(
                (product, index) =>
                  product.discount > 0 && (
                    <div
                      onClick={() => navigate(`/product-detail/${product._id}`)}
                      key={index}
                      className="flex cursor-pointer hover:bg-gray-100 duration-200 transition-colors items-center min-w-[200px] justify-center gap-2 flex-col h-[200px] border-r border-gray-300 last:border-r-0"
                    >
                      <div className="h-[80px] w-[80px] overflow-hidden">
                        <img
                          className="h-full w-full object-contain"
                          src={product.images[0]}
                          alt={product.productName}
                        />
                      </div>
                      <h1 className="font-semibold text-sm text-center px-2">
                        {product.productName}
                      </h1>
                      <p className="font-semibold bg-[#FFE3E3] text-xs rounded-2xl text-[#EB001B] px-3 py-1">
                        -{product.discount}%
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout (horizontal) */}
        <div className="hidden sm:flex flex-col sm:flex-row">
          {/* Title Section */}
          <div className="sm:h-[235px] py-4 sm:py-0 flex text-lg font-semibold items-center justify-center flex-col sm:flex-[0.32] sm:border-r border-gray-300">
            <h1 className="text-center">Deals and Offers</h1>
            <p className="text-gray-600">Hygiene Equipments</p>
          </div>

          {/* Products Section - Horizontal Scroll */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex w-max min-w-full h-[235px]">
              {products.map(
                (product, index) =>
                  product.discount > 0 && (
                    <div
                      onClick={() => navigate(`/product-detail/${product._id}`)}
                      key={index}
                      className="flex cursor-pointer hover:bg-gray-100 duration-200 transition-colors items-center min-w-[25%] justify-center gap-2 flex-col h-full border-r border-gray-300 last:border-r-0"
                    >
                      <div className="h-[100px] w-[100px] overflow-hidden">
                        <img
                          className="h-full w-full object-contain"
                          src={product.images[0]}
                          alt={product.productName}
                        />
                      </div>
                      <h1 className="font-semibold text-base text-center px-2">
                        {product.productName}
                      </h1>
                      <p className="font-semibold bg-[#FFE3E3] text-sm rounded-2xl text-[#EB001B] px-3 py-1">
                        -{product.discount}%
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsAndOffers;
