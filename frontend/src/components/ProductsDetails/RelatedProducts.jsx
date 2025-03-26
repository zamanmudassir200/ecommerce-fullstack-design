import React from "react";

const RelatedProducts = ({ recommendedProducts }) => {
  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold py-2">Related Products</h1>
      <div className="flex justify-between  my-3">
        {recommendedProducts && recommendedProducts.length > 0 ? (
          recommendedProducts.map((recommendedProduct) => {
            return (
              <div
                key={recommendedProduct._id}
                className="flex hover:bg-gray-100 cursor-pointer p-3 flex-col justify-center items-center gap-3"
              >
                <div className="w-32  h-32 overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    src={recommendedProduct.images[0]}
                  />
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">
                    {recommendedProduct.productName}
                  </h1>
                  <p className="text-sm text-center ">
                    {recommendedProduct.price} Rs
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 ">No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
