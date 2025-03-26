import React from "react";
import { useNavigate } from "react-router-dom";

const HomeAndOutDoor = ({ title, img, products }) => {
  const navigate = useNavigate();

  const filteredCategoriesProducts = products.filter((product) => {
    return product.category.name === title.toLowerCase();
  });
  console.log("filtered categories products", filteredCategoriesProducts);
  return (
    <main className="my-5 h-[257px] border-[1px] border-gray-300 rounded-md bg-white">
      <div className=" rounded-lg mx-auto ">
        <div className="flex  ">
          <div className="h-[235px] flex-[0.3] border-r-[1px] border-gray-300">
            <div className="relative h-[256px] overflow-hidden">
              <img className="h-full w-full object-cover" src={img} alt="" />
              <div className=" absolute top-3 left-5">
                <h1 className="w-[154px] mb-4 font-bold text-xl">
                  {title} <br />
                </h1>
                <button className="px-3 cursor-pointer rounded-md py-2 text-lg font-semibold bg-white ">
                  Source now
                </button>
              </div>
            </div>
          </div>
          <div className="flex-[0.89] overflow-y-auto h-[257px]  w-full grid grid-cols-4 ">
            {filteredCategoriesProducts.map((product, index) => {
              return (
                <div
                  onClick={() => navigate(`/product-detail/${product._id}`)}
                  key={index}
                  className="border-r-[1px] cursor-pointer transition-all duration-200 hover:bg-gray-200 border-b-[1px] border-gray-300 flex flex-col relative w-[242.2px] p-3  h-[128px]"
                >
                  <h1 className="font-bold text-2xl">{product.productName}</h1>
                  <div className="text-gray-500 flex flex-col justify-center  ">
                    <h1 className="text-[14px]"> From</h1>{" "}
                    <p className=""> {product.price} Rs</p>
                  </div>
                  <div className="absolute w-16 h-16 bottom-2 right-2 flex items-end justify-end ">
                    <img
                      className="w-full h-full object-contain  "
                      src={product.images[0]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeAndOutDoor;
