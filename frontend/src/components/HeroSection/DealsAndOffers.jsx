import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const DealsAndOffers = ({ products }) => {
  const navigate = useNavigate();
  const { themeMode } = useContext(GlobalContext);
  const productCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
    whileHover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 200 },
    },
  };
  return (
    <div
      className={`my-5 min-h-[240px] border border-gray-300 rounded-md ${
        themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white"
      }`}
    >
      <div className="rounded-lg mx-auto">
        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="py-4 flex text-lg font-semibold items-center justify-center flex-col border-b border-gray-300">
            <h1 className="text-center">Deals and Offers</h1>
            <p className="text-gray-600">Hygiene Equipments</p>
          </div>

          <div className="overflow-x-auto">
            <div className="flex w-max min-w-full">
              {products.map(
                (product, index) =>
                  product.discount > 0 && (
                    <motion.div
                      key={index}
                      onClick={() => navigate(`/product-detail/${product._id}`)}
                      className={`flex cursor-pointer duration-200 transition-colors items-center min-w-[200px] justify-center gap-2 flex-col h-[200px] border-r border-gray-300 last:border-r-0 ${
                        themeMode === "dark" ? "" : "hover:bg-gray-100"
                      }`}
                      variants={productCardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="whileHover"
                      custom={index}
                    >
                      <div className="h-[80px] w-[80px] overflow-hidden">
                        <img
                          className="h-full w-full object-contain"
                          src={product.images[0]}
                          alt={product.productName}
                          loading="lazy"
                        />
                      </div>
                      <h1 className="font-semibold text-sm text-center px-2">
                        {product.productName}
                      </h1>
                      <p className="font-semibold bg-[#FFE3E3] text-xs rounded-2xl text-[#EB001B] px-3 py-1">
                        -{product.discount}%
                      </p>
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-col sm:flex-row">
          <div className="sm:h-[235px] py-4 sm:py-0 flex text-lg font-semibold items-center justify-center flex-col sm:flex-[0.32] sm:border-r border-gray-300">
            <h1 className="text-center">Deals and Offers</h1>
            <p className="text-gray-600">Hygiene Equipments</p>
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="flex w-max min-w-full h-[235px]">
              {products.map(
                (product, index) =>
                  product.discount > 0 && (
                    <motion.div
                      key={index}
                      onClick={() => navigate(`/product-detail/${product._id}`)}
                      className={`flex cursor-pointer duration-200 transition-colors items-center min-w-[25%] justify-center gap-2 flex-col h-full border-r border-gray-300 last:border-r-0 ${
                        themeMode === "dark"
                          ? "hover:bg-slate-800 "
                          : "hover:bg-gray-100"
                      }`}
                      variants={productCardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="whileHover"
                      custom={index}
                    >
                      <div className="h-[100px] w-[100px] overflow-hidden">
                        <img
                          className="h-full w-full object-contain"
                          src={product.images[0]}
                          alt={product.productName}
                          loading="lazy"
                        />
                      </div>
                      <h1 className="font-semibold text-base text-center px-2">
                        {product.productName}
                      </h1>
                      <p className="font-semibold bg-[#FFE3E3] text-sm rounded-2xl text-[#EB001B] px-3 py-1">
                        -{product.discount}%
                      </p>
                    </motion.div>
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
