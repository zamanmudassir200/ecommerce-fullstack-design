import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const HomeAndOutDoor = ({ title, img, products }) => {
  const navigate = useNavigate();
  const { themeMode } = useContext(GlobalContext);
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 10,
      },
    }),
    whileHover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 300 },
    },
  };
  const filteredCategoriesProducts = products.filter((product) => {
    return product.category?.name?.toLowerCase() === title.toLowerCase();
  });

  return (
    <div
      className={`my-5 border border-gray-300 rounded-md ${
        themeMode === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="rounded-lg mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Category Banner Section */}
          <motion.div
            className="md:w-[30%] border-b md:border-b-0 md:border-r border-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={img}
                alt={title}
              />
              <div className="absolute top-3 left-3 md:left-5">
                <h1 className="w-full md:w-[154px] mb-2 md:mb-4 font-bold text-lg md:text-xl">
                  {title}
                </h1>
                <button className="px-2 md:px-3 py-1 md:py-2 text-sm md:text-lg font-semibold bg-white rounded-md hover:bg-gray-100 transition-colors">
                  Source now
                </button>
              </div>
            </div>
          </motion.div>

          {/* Products Grid Section */}
          <motion.div
            className="md:w-[70%] overflow-y-auto h-auto md:h-64"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {filteredCategoriesProducts.map((product, index) => (
                <motion.div
                  key={index}
                  className={`border-r border-b border-gray-300 cursor-pointer transition-all duration-200 flex flex-col relative p-5 h-32 sm:h-36 ${
                    themeMode === "dark"
                      ? "text-white hover:bg-slate-800 scale-105"
                      : ""
                  }`}
                  onClick={() => navigate(`/product-detail/${product._id}`)}
                  variants={productCardVariants}
                  custom={index}
                  // initial="hidden"
                  // animate="show"
                  whileHover="whileHover"
                >
                  <h1 className="font-bold text-sm sm:text-base md:text-lg line-clamp-2">
                    {product.productName}
                  </h1>
                  <div className="text-gray-500 mt-1">
                    <h1 className="text-xs sm:text-sm">From</h1>
                    <p className="text-sm sm:text-base">{product.price} Rs</p>
                  </div>
                  <div className="absolute w-12 h-12 sm:w-14 sm:h-14 bottom-1 right-1 flex items-end justify-end">
                    <img
                      className="w-full h-full object-contain"
                      src={product.images[0]}
                      alt={product.productName}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeAndOutDoor;
