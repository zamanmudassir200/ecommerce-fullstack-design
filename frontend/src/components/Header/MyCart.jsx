// import React, { useContext, useEffect, useState } from "react";
// import { IoIosLock } from "react-icons/io";
// import { MdMessage } from "react-icons/md";
// import { TbTruckDelivery } from "react-icons/tb";

// import { GlobalContext } from "../../context/GlobalContext";
// import url from "../../utils/url";
// import { toast } from "react-toastify";
// import SaveForLater from "./SaveForLater";
// import { useNavigate } from "react-router-dom";
// const MyCart = () => {
//   const { handleApiCall, loading, setLoading, cartNumber, setCartNumber } =
//     useContext(GlobalContext);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();
//   const fetchCartByUser = async () => {
//     setLoading(true);
//     try {
//       const response = await handleApiCall(`${url}/carts`, "get");
//       setLoading(false);
//       setCart(response.data.cart);
//     } catch (error) {
//       setLoading(false);
//     }
//   };
//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const response = await handleApiCall(
//         `${url}/carts/${productId}`,
//         "patch"
//       );
//       setCartNumber(cartNumber - 1);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.success("Product removed from the Cart");
//     }
//   };
//   const handleRemoveAllProductsFromCart = async () => {
//     try {
//       const response = await handleApiCall(`${url}/carts/delete-all`, "delete");
//       toast.success(response.data.message);
//       setCart([]);
//     } catch (error) {
//       toast.error("Error occured while removing all products from the cart");
//     }
//   };
//   useEffect(() => {
//     fetchCartByUser();
//   }, [cartNumber, cart]);
//   return (
//     <main className="container mx-auto px-30">
//       <div className="">
//         <h1 className="my-5 text-2xl font-semibold ">
//           My Cart ({cart?.items?.length ? cart?.items?.length : "0"})
//         </h1>
//         <div className="flex gap-6">
//           <div className="overflow-y-auto h-[552px] w-full flex flex-col border-[1px] border-gray-200 rounded-lg">
//             {cart?.items?.length === 0 ? (
//               <h1 className="text-center py-6 text-gray-500">
//                 No products found in the cart. Go shop something.
//               </h1>
//             ) : (
//               ""
//             )}
//             {cart &&
//               cart.items?.map((item, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className="flex hover:bg-gray-100 transition-all duration-200 p-6 border-b-[1px] border-gray-200 items-center justify-between"
//                   >
//                     <div className="flex min-h-[136px]  gap-4">
//                       <div className="w-[70px] h-[70px] border-[1px] border-gray-200 rounded-lg overflow-hidden">
//                         <img
//                           className="w-full h-full object-cover"
//                           src={item?.product?.images[0]}
//                           alt="image"
//                         />
//                       </div>
//                       <div className="flex flex-col ">
//                         <div className="">
//                           <h1 className="text-lg font-semibold ">
//                             {item?.product?.productName
//                               .split(" ")
//                               .map(
//                                 (char) => char[0].toUpperCase() + char.slice(1)
//                               )
//                               .join(" ")}
//                           </h1>
//                           <p>
//                             brand:{" "}
//                             {item?.product?.brand
//                               .split(" ")
//                               .map(
//                                 (char) => char[0].toUpperCase() + char.slice(1)
//                               )
//                               .join(" ")}
//                           </p>
//                         </div>
//                         <div className="flex gap-2 my-3">
//                           <button
//                             onClick={() =>
//                               handleRemoveFromCart(item?.product?._id)
//                             }
//                             className="text-red-500 font-semibold cursor-pointer px-2 py-1 rounded-xl border-[1px] border-gray-200"
//                           >
//                             Remove
//                           </button>
//                           <button className="text-blue-500 font-semibold cursor-pointer px-2 py-1 rounded-xl border-[1px] border-gray-200">
//                             Save for later
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-4">
//                       <h1 className="text-end text-lg font-semibold">
//                         {item?.product?.price} Rs{" "}
//                         <span className="text-xs">per qty</span>
//                       </h1>

//                       {item?.product?.discount > 0 && (
//                         <h1 className="text-end text-red-500 text-md font-semibold">
//                           {`-${item?.product?.discount}%`} -
//                           {(
//                             (item?.product?.price * item?.product?.discount) /
//                             100
//                           ).toFixed(2)}{" "}
//                           Rs <span className="text-xs"> per qty</span>
//                         </h1>
//                       )}
//                       <select
//                         className="border-[1px] border-gray-200 px-5 rounded-xl flex items-center justify-between py-2"
//                         name=""
//                         id=""
//                       >
//                         <option value="">Qty: {item?.quantity}</option>
//                       </select>
//                     </div>
//                   </div>
//                 );
//               })}
//             {cart && cart?.length === 0 ? (
//               <h1>No products found in the cart</h1>
//             ) : (
//               <div className="flex items-center p-6 justify-between ">
//                 <button
//                   onClick={() => navigate("/all-category")}
//                   className="bg-blue-700 text-white rounded-lg cursor-pointer font-semibold px-3 py-2"
//                 >
//                   Back to shop
//                 </button>
//                 <button
//                   onClick={handleRemoveAllProductsFromCart}
//                   className="bg-white text-blue-700 border-[1px] border-gray-200 cursor-pointer rounded-lg font-semibold px-3 py-2"
//                 >
//                   Remove all
//                 </button>
//               </div>
//             )}
//           </div>

//           {cart?.items?.length !== 0 && (
//             <div className="min-w-[280px] flex flex-col gap-4  ">
//               <div className=" h-[110px]  p-3 border-[1px] border-gray-200 rounded-lg">
//                 <p className="my-2">Have a coupon?</p>
//                 <div className="flex items-center justify-between border-[1px]  border-gray-200">
//                   <div className="px-2">
//                     <input
//                       className="flex-[0.4] outline-0"
//                       placeholder="Add coupon"
//                       type="text"
//                     />
//                   </div>
//                   <div className="flex-[0.5]">
//                     <button className=" text-blue-600 font-semibold cursor-pointer border-l-[1px]  p-2 border-gray-200">
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-3 border-[1px] border-gray-200 rounded-lg">
//                 <div className="border-b-[1px] border-gray-200">
//                   <div className="flex flex-col gap-4 mb-4">
//                     <div className="flex items-center justify-between ">
//                       <h1>Subtotal:</h1>
//                       <h1 className="font-semibold">
//                         {cart &&
//                           cart?.items
//                             ?.reduce((acc, item) => {
//                               const originalPrice =
//                                 item?.product?.price * item?.quantity;
//                               return acc + originalPrice; // Summing up original price for all items
//                             }, 0)
//                             .toFixed(2)}{" "}
//                         Rs
//                       </h1>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <h1 className="">Discount:</h1>
//                       <h1 className="text-red-500 font-semibold">
//                         -{" "}
//                         {cart &&
//                           cart?.items
//                             ?.filter((prod) => prod.product.discount > 0)
//                             ?.reduce((totalDiscount, prod) => {
//                               const discountedAmount =
//                                 ((prod.product.price * prod.product.discount) /
//                                   100) *
//                                 prod.quantity; // Calculate discount amount for each product
//                               return totalDiscount + discountedAmount;
//                             }, 0)
//                             .toFixed(2)}{" "}
//                         Rs
//                       </h1>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-4 justify-center my-5">
//                   <div className="flex items-center justify-between ">
//                     <h1>Total:</h1>
//                     <h1 className="font-bold text-lg">
//                       {cart &&
//                         cart?.items
//                           ?.reduce((acc, item) => {
//                             const originalPrice =
//                               item?.product?.price * item?.quantity; // Subtotal for each item
//                             const discountAmount =
//                               (item?.product?.discount > 0
//                                 ? (item?.product?.price *
//                                     item?.product?.discount) /
//                                   100
//                                 : 0) * item?.quantity; // Discount for each item
//                             return acc + (originalPrice - discountAmount); // Subtotal - Discount for each item
//                           }, 0)
//                           ?.toFixed(2)}{" "}
//                       Rs
//                     </h1>
//                   </div>
//                   <button
//                     onClick={() =>
//                       alert("Checkout will be implementing soon. Insha Allah ❤")
//                     }
//                     className="bg-green-500 cursor-pointer font-semibold text-white rounded-xl w-full py-3 "
//                   >
//                     Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex w-[70%] my-8 items-center justify-between">
//           <div className="flex gap-3">
//             <div className="cursor-pointer bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center ">
//               <IoIosLock size={25} />
//             </div>
//             <div className="">
//               <h1 className="text-lg font-bold">Secure Payment</h1>
//               <p>Have you ever finally just </p>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <div className="cursor-pointer bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center ">
//               <MdMessage size={25} />
//             </div>
//             <div className="">
//               <h1 className="text-lg font-bold">Customer Support</h1>
//               <p>Have you ever finally just </p>
//             </div>
//           </div>{" "}
//           <div className="flex gap-3">
//             <div className="cursor-pointer bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center ">
//               <TbTruckDelivery size={25} />
//             </div>
//             <div className="">
//               <h1 className="text-lg font-bold">Free Delivery</h1>
//               <p>Have you ever finally just </p>
//             </div>
//           </div>
//         </div>

//         <SaveForLater />
//       </div>
//     </main>
//   );
// };

// export default MyCart;

import React, { useContext, useEffect, useState } from "react";
import { IoIosLock } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { toast } from "react-toastify";
import SaveForLater from "./SaveForLater";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const { handleApiCall, loading, setLoading, cartNumber, setCartNumber } =
    useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCartByUser = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/carts`, "get");
      setLoading(false);
      setCart(response.data.cart);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/carts/${productId}`,
        "patch"
      );
      setCartNumber(cartNumber - 1);
      toast.success(response.data.message);
    } catch (error) {
      toast.success("Product removed from the Cart");
    }
  };

  const handleRemoveAllProductsFromCart = async () => {
    try {
      const response = await handleApiCall(`${url}/carts/delete-all`, "delete");
      toast.success(response.data.message);
      setCart([]);
    } catch (error) {
      toast.error("Error occurred while removing all products from the cart");
    }
  };

  useEffect(() => {
    fetchCartByUser();
  }, [cartNumber, cart]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div>
        <h1 className="my-5 text-xl sm:text-2xl font-semibold">
          My Cart ({cart?.items?.length ? cart?.items?.length : "0"})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
            {cart?.items?.length === 0 ? (
              <div className="text-center py-10">
                <h1 className="text-gray-500 mb-4">
                  No products found in the cart.
                </h1>
                <button
                  onClick={() => navigate("/all-category")}
                  className="bg-blue-700 text-white rounded-lg cursor-pointer font-semibold px-4 py-2 hover:bg-blue-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-[552px] overflow-y-auto">
                  {cart?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row hover:bg-gray-50 transition-colors duration-200 p-4 border-b border-gray-200 justify-between"
                    >
                      <div className="flex gap-4 mb-4 sm:mb-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            className="w-full h-full object-contain"
                            src={item?.product?.images?.[0]}
                            alt={item?.product?.productName}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-sm sm:text-base font-semibold line-clamp-2">
                            {item?.product?.productName}
                          </h1>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Brand: {item?.product?.brand}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item?.product?._id)
                              }
                              className="text-xs sm:text-sm text-red-500 font-medium cursor-pointer px-2 py-1 rounded border border-gray-200 hover:bg-red-50"
                            >
                              Remove
                            </button>
                            <button className="text-xs sm:text-sm text-blue-500 font-medium cursor-pointer px-2 py-1 rounded border border-gray-200 hover:bg-blue-50">
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="text-right">
                          <h1 className="text-sm sm:text-base font-semibold">
                            {item?.product?.price} Rs{" "}
                            <span className="text-xs text-gray-500">
                              per qty
                            </span>
                          </h1>
                          {item?.product?.discount > 0 && (
                            <h1 className="text-xs sm:text-sm text-red-500 font-medium">
                              {`-${item?.product?.discount}%`} -
                              {(
                                (item?.product?.price *
                                  item?.product?.discount) /
                                100
                              ).toFixed(2)}{" "}
                              Rs <span className="text-xs">per qty</span>
                            </h1>
                          )}
                        </div>
                        <select
                          className="border border-gray-200 px-3 py-1 rounded text-xs sm:text-sm"
                          value={item?.quantity}
                        >
                          <option value={item?.quantity}>
                            Qty: {item?.quantity}
                          </option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate("/all-category")}
                    className="bg-blue-700 text-white rounded-lg cursor-pointer font-medium px-4 py-2 mb-2 sm:mb-0 hover:bg-blue-800 transition-colors w-full sm:w-auto"
                  >
                    Back to shop
                  </button>
                  <button
                    onClick={handleRemoveAllProductsFromCart}
                    className="bg-white text-blue-700 border border-gray-200 cursor-pointer rounded-lg font-medium px-4 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                  >
                    Remove all
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          {cart?.items?.length !== 0 && (
            <div className="w-full lg:w-[300px] flex flex-col gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="mb-2 text-sm sm:text-base">Have a coupon?</p>
                <div className="flex border border-gray-200 rounded overflow-hidden">
                  <input
                    className="flex-1 outline-none px-3 py-2 text-sm"
                    placeholder="Add coupon"
                    type="text"
                  />
                  <button className="bg-gray-100 text-blue-600 font-medium cursor-pointer px-3 py-2 text-sm sm:text-base hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base">Subtotal:</span>
                      <span className="font-medium">
                        {cart?.items
                          ?.reduce(
                            (acc, item) =>
                              acc + item?.product?.price * item?.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        Rs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base">Discount:</span>
                      <span className="text-red-500 font-medium">
                        -{" "}
                        {cart?.items
                          ?.filter((item) => item.product.discount > 0)
                          ?.reduce(
                            (total, item) =>
                              total +
                              ((item.product.price * item.product.discount) /
                                100) *
                                item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        Rs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-sm sm:text-base">
                      Total:
                    </span>
                    <span className="font-bold text-lg">
                      {cart?.items
                        ?.reduce((total, item) => {
                          const price = item.product.price;
                          const discount = item.product.discount || 0;
                          return (
                            total +
                            (price - (price * discount) / 100) * item.quantity
                          );
                        }, 0)
                        .toFixed(2)}{" "}
                      Rs
                    </span>
                  </div>
                  <button
                    onClick={() => toast.info("Checkout feature coming soon!")}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg w-full py-3 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <IoIosLock size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base">Secure Payment</h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Your payment information is processed securely
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <MdMessage size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base">
                Customer Support
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                24/7 customer support available
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              <TbTruckDelivery size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base">Free Delivery</h1>
              <p className="text-xs sm:text-sm text-gray-600">
                On orders over $50
              </p>
            </div>
          </div>
        </div>

        <SaveForLater />
      </div>
    </main>
  );
};

export default MyCart;
