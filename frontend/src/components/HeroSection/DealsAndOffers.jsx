import React from "react";
const DealsAndOffers = ({ products }) => {
  return (
    <main className=" my-5 min-h-[240px] border-[1px] border-gray-300 rounded-md bg-white">
      <div className=" rounded-lg mx-auto ">
        <div className="flex flex-wrap ">
          <div className="h-[235px] flex-[0.32] border-r-[1px] border-gray-300">
            <h1>Deals and Offers</h1>
            <p>Hygiene Equipments</p>
          </div>
          <div className="flex flex-1 overflow-x-scroll">
            {products.map((product, index) => {
              return (
                product.discount > 0 && (
                  <div
                    key={index}
                    className="flex p-3 items-center scroll-x-auto justify-center gap-2 flex-col h-[235px] border-r-[1px] border-gray-300"
                  >
                    <div className="h-[140px] w-[140px] overflow-hidden">
                      <img
                        className="h-full w-full object-center"
                        src={product.images[0]}
                      />
                    </div>
                    <h1 className="font-semibold">{product.productName}</h1>
                    <p className="inline font-semibold bg-[#FFE3E3] text-[14px] rounded-2xl text-[#EB001B] px-3 py-1">
                      -{product.discount}%
                    </p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DealsAndOffers;
