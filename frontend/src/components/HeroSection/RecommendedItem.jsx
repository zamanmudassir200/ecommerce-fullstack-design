import React from "react";

const RecommendedItem = ({ image, price, description }) => {
  return (
    <div className="border border-gray-200 rounded-md p-3 w-full h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={description}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="mt-4 flex-grow">
        <p className="font-bold text-base text-gray-800">{price}</p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default RecommendedItem;
