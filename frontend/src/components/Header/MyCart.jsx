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
  const [coupon, setCoupon] = useState("");
  const [couponCodeResponse, setCouponCodeResponse] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

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
  const handleCouponCodeApply = async () => {
    try {
      const response = await handleApiCall(
        `${url}/couponcodes/apply-coupon`,
        "post",
        { couponCode: coupon }
      );
      setCouponCodeResponse(response?.data?.couponCode);
      // console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      const { message } = error;
      console.log(message);
      if (error?.message) {
        setErrMsg("heello");
      }
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
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    onClick={handleCouponCodeApply}
                    className="bg-gray-100 text-blue-600 font-medium cursor-pointer px-3 py-2 text-sm sm:text-base hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {errMsg}
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
                    {cart?.couponApplied && (
                      <div className="flex justify-between">
                        <span className="text-sm sm:text-base">
                          Coupon Discount:
                        </span>
                        <span className="text-red-500 font-medium">
                          - {couponCodeResponse?.discount || 0}% {" -"}
                          {Number(
                            (
                              cart?.items?.reduce(
                                (acc, item) =>
                                  acc +
                                  (item?.product?.price || 0) *
                                    (item?.quantity || 0),
                                0
                              ) * (couponCodeResponse?.discount || 0)
                            ).toFixed(2) / 100
                          )}{" "}
                          Rs
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-sm sm:text-base">
                      Total:
                    </span>
                    <span className="font-bold text-lg">
                      {Number(
                        cart?.totalPrice -
                          cart?.items
                            ?.filter((item) => (item.product.discount || 0) > 0)
                            ?.reduce(
                              (total, item) =>
                                total +
                                (((item.product.price || 0) *
                                  (item.product.discount || 0)) /
                                  100) *
                                  (item.quantity || 0),
                              0
                            )
                      ).toFixed(2)}{" "}
                      Rs
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/checkout/order")}
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
