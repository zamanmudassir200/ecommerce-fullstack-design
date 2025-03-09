import React from "react";

const RecommendedItem = ({ recommendedItems }) => {
  return (
    <>
      {recommendedItems.map((item, index) => {
        return (
          <div
            key={index}
            className="border-[1px]  rounded-md border-gray-300 p-4 w-[220px] h-[310px]"
          >
            <div className="">
              <img src={item.image} alt="" />
            </div>
            <div className="mt-5">
              <p className="font-bold text-[14px]">{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecommendedItem;
