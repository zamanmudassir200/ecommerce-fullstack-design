import React from "react";

const DealsAndOffers = () => {
  const dealItems = [
    {
      image: "./Banner-board-800x420 2.png",
      name: "Smart Watches",
      discount: "-25%",
    },
    {
      image: "./Banner-board-800x420 2.png",
      name: "Laptops",
      discount: "-15%",
    },
    {
      image: "./Banner-board-800x420 2.png",
      name: "GoPro Cameras",
      discount: "-40%",
    },
    {
      image: "./Banner-board-800x420 2.png",
      name: "Headphones",
      discount: "-25%",
    },
    {
      image: "./Banner-board-800x420 2.png",
      name: "Cannon Cameras",
      discount: "-25%",
    },
  ];
  return (
    <main className=" my-5 h-[240px] border-[1px] border-gray-300 rounded-md bg-white">
      <div className=" rounded-lg mx-auto ">
        <div className="flex flex-wrap ">
          <div className="h-[235px] flex-1 border-r-[1px] border-gray-300">
            <h1>Deals and Offers</h1>
            <p>Hygiene Equipments</p>
          </div>
          {dealItems.map((dealItem, index) => {
            return (
              <div
                key={index}
                className="flex flex-[0.6] items-center justify-center gap-2 flex-col h-[235px] border-r-[1px] border-gray-300"
              >
                <div className="h-[140px] w-[140px] overflow-hidden">
                  <img
                    className="h-full w-full object-cemter"
                    src={dealItem.image}
                    alt=""
                  />
                </div>
                <h1 className="font-semibold">{dealItem.name}</h1>
                <p className="inline bg-[#FFE3E3] text-[14px] rounded-2xl text-[#EB001B] px-3 py-1">
                  {dealItem.discount}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default DealsAndOffers;
