import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const DealsAndOffers = ({ products }) => {
  const navigate = useNavigate();
  const { themeMode } = useContext(GlobalContext);
  return (
    <div
      className={`my-5 min-h-[240px] border border-gray-300 rounded-md  ${
        themeMode === "dark" ? "bg-slate-900 text-white  " : "bg-white"
      }`}
    >
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
                      className={` ${
                        themeMode === "dark" ? "" : "hover:bg-gray-100 "
                      } flex cursor-pointer duration-200 transition-colors items-center min-w-[200px] justify-center gap-2 flex-col h-[200px] border-r border-gray-300 last:border-r-0`}
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
