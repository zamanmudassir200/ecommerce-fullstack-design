import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RelatedProducts = ({ recommendedProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Location change ke baad jo bhi data fetch karna hai wo yahan kar sakte hain
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("Route changed to: ", location.pathname);
    // Example: fetchProductDetails(location.pathname);
  }, [location]);

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold py-2">Related Products</h1>
      <div className="flex justify-between  my-3">
        {recommendedProducts && recommendedProducts.length > 0 ? (
          recommendedProducts.map((recommendedProduct) => {
            return (
              <div
                onClick={() =>
                  navigate(`/product-detail/${recommendedProduct._id}`, {
                    replace: true,
                  })
                }
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
