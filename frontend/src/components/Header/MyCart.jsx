import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { toast } from "react-toastify";

const MyCart = () => {
  const { handleApiCall, loading, setLoading, cartNumber } =
    useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const fetchCartByUser = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/carts`, "get");
      setLoading(false);
      setCart(response.data.cart);
    } catch (error) {
      setLoading(false);
      toast.error("Error during fetch carts");
    }
  };
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/carts/${productId}`,
        "patch"
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while removing product from cart");
    }
  };

  useEffect(() => {
    fetchCartByUser();
  }, [cartNumber, cart]);
  console.log("cart.items.length", cart?.items?.length);
  return (
    <main className="container mx-auto px-30">
      <div className="">
        <h1 className="my-5 text-2xl font-semibold ">
          My Cart ({cart?.items?.length})
        </h1>
        <div className="flex gap-6">
          <div className="overflow-y-auto h-[552px] w-full flex flex-col border-[1px] border-gray-200 rounded-lg">
            {cart?.items?.length === 0 && (
              <h1 className="text-center py-6 text-gray-500">
                No products found in the cart. Go shop something.
              </h1>
            )}
            {cart &&
              cart.items?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex p-6 border-b-[1px] border-gray-200 items-center justify-between"
                  >
                    <div className="flex min-h-[136px]  gap-4">
                      <div className="w-[70px] h-[70px] border-[1px] border-gray-200 rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={item.product.images[0]}
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col ">
                        <div className="">
                          <h1 className="text-lg font-semibold ">
                            {item.product.productName
                              .split(" ")
                              .map(
                                (char) => char[0].toUpperCase() + char.slice(1)
                              )
                              .join(" ")}
                          </h1>
                          {/* <p>Size: </p> */}
                          <p>
                            brand:{" "}
                            {item.product.brand
                              .split(" ")
                              .map(
                                (char) => char[0].toUpperCase() + char.slice(1)
                              )
                              .join(" ")}
                          </p>
                        </div>
                        <div className="flex gap-2 my-3">
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item?.product._id)
                            }
                            className="text-red-500 font-semibold cursor-pointer px-2 py-1 rounded-xl border-[1px] border-gray-200"
                          >
                            Remove
                          </button>
                          <button className="text-blue-500 font-semibold cursor-pointer px-2 py-1 rounded-xl border-[1px] border-gray-200">
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-end text-lg font-semibold">
                        {item.product.price.toFixed(2)} Rs
                      </h1>
                      {/* {item.product.discount > 0 && (
                        <h1 className="text-end text-md font-semibold">
                          {`Discount Added: ${item.product.discount}%`}
                        </h1>
                      )} */}
                      <select
                        className="border-[1px] border-gray-200 px-5 rounded-xl flex items-center justify-between py-2"
                        name=""
                        id=""
                      >
                        <option value="">Qty: {item.quantity}</option>
                      </select>
                    </div>
                  </div>
                );
              })}
          </div>
          {cart?.items?.length !== 0 && (
            <div className="min-w-[280px] flex flex-col gap-4  ">
              <div className=" h-[110px]  p-3 border-[1px] border-gray-200 rounded-lg">
                <p className="my-2">Have a coupon?</p>
                <div className="flex items-center justify-between border-[1px]  border-gray-200">
                  <div className="px-2">
                    <input
                      className="flex-[0.4] outline-0"
                      placeholder="Add coupon"
                      type="text"
                    />
                  </div>
                  <div className="flex-[0.5]">
                    <button className=" text-blue-600 font-semibold cursor-pointer border-l-[1px]  p-2 border-gray-200">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3 border-[1px] border-gray-200 rounded-lg">
                <div className="border-b-[1px] border-gray-200">
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center justify-between ">
                      <h1>Subtotal:</h1>
                      <h1 className="font-semibold">
                        {cart && (cart?.totalPrice / 0.9).toFixed(2)} Rs
                      </h1>
                    </div>
                    <div className="flex items-center justify-between">
                      <h1>Discount:</h1>
                      <h1 className="text-red-500 font-semibold">
                        -10%
                        {/* {cart &&
                        cart?.items?.map((prod, index) => {
                          if (prod.product.discount > 0)
                            return prod.product.discount + "%";
                        })} */}
                      </h1>
                    </div>
                    {/* <div className="flex items-center justify-between">
                    <h1>Tax:</h1>
                    <h1 className="text-green-400 font-semibold">+14</h1>
                  </div> */}
                  </div>
                </div>
                <div className="flex flex-col gap-4 justify-center my-5">
                  <div className="flex items-center justify-between ">
                    <h1>Total:</h1>
                    <h1 className="font-bold text-lg">
                      {cart && cart?.totalPrice?.toFixed(2)} Rs
                    </h1>
                  </div>
                  <button className="bg-green-500 cursor-pointer font-semibold text-white rounded-xl w-full py-3 ">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyCart;
