import React from "react";
import { useNavigate } from "react-router-dom";

const DealsAndOffers = ({ products }) => {
  const navigate = useNavigate();

  return (
    <main className=" my-5 min-h-[240px] border-[1px] border-gray-300 rounded-md bg-white">
      <div className=" rounded-lg mx-auto ">
        <div className="flex flex-wrap ">
          <div className="h-[235px] flex items-center justify-center flex-col flex-[0.32] border-r-[1px] border-gray-300">
            <h1>Deals and Offers</h1>
            <p>Hygiene Equipments</p>
          </div>
          <div className="flex flex-1 overflow-x-auto">
            {products.map((product, index) => {
              return (
                product.discount > 0 && (
                  <div
                    onClick={() => navigate(`/product-detail/${product._id}`)}
                    key={index}
                    className="flex cursor-pointer hover:bg-gray-200 duration-200 transition-colors  items-center  min-w-[200px] scroll-x-auto justify-center gap-2 flex-col h-[235px] border-r-[1px] border-gray-300"
                  >
                    <div className="h-[100px] w-[100px] overflow-hidden">
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
