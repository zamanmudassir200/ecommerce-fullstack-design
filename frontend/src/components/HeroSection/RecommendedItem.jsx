import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { motion } from "framer-motion";

const RecommendedItem = ({ image, price, description }) => {
  const { themeMode } = useContext(GlobalContext);
  return (
    <motion.div
      className={`border border-gray-200 rounded-md p-3 w-full h-full flex flex-col hover:shadow-md transition-shadow duration-200 ${
        themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Image Section */}
      <motion.div
        className="aspect-square overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img
          src={image}
          alt={description}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </motion.div>

      {/* Text Section */}
      <div className="mt-4 flex-grow">
        <p className="font-bold text-base text-gray-600">{price}</p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default RecommendedItem;
