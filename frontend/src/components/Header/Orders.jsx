import React, { useContext, useState, useEffect } from "react";
import { Package, Clock, CheckCircle, Truck, XCircle } from "react-feather";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import url from "../../utils/url";

const Orders = () => {
  const { handleApiCall, themeMode } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrdersByUser = async () => {
    try {
      setLoading(true);
      const response = await handleApiCall(
        `${url}/orders/user/getOrdersByUser`,
        "get"
      );
      console.log("response from getOrdersByUser", response);
      setOrders(response?.data?.orders);
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersByUser();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "shipped":
        return <Truck className="text-blue-500 w-5 h-5" />;
      case "processing":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "cancelled":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Package className="text-gray-500 w-5 h-5" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center ${
          themeMode === "dark" ? "bg-slate-900 text-white" : ""
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p
            className={`mt-3  ${
              themeMode === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={` ${
        themeMode === "dark" ? "bg-slate-900 text-white" : "bg-white"
      } min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-2xl font-bold mb-8 ${
            themeMode === "dark" ? "text-white" : "text-gray-900 "
          }`}
        >
          Your Orders
        </h1>

        {orders?.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-gray-500">
              Your order history will appear here once you make purchases.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.reverse()?.map((order) => (
              <div
                key={order._id}
                className={` shadow-lg overflow-hidden rounded-lg ${
                  themeMode === "dark" ? "bg-slate-800 text-white" : ""
                }`}
              >
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order?.orderStatus)}
                      <div>
                        <h3
                          className={`text-lg leading-6 font-medium  ${
                            themeMode === "dark"
                              ? "text-white"
                              : "text-gray-900"
                          } `}
                        >
                          Order #{order._id}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Placed on {formatDate(order.createdAt)} {" | "}{" "}
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Payment: <strong>{order.paymentStatus}</strong> via{" "}
                          <strong> {order.payMethod}</strong>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.orderStatus.toLowerCase() === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus.toLowerCase() === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.orderStatus.toLowerCase() === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-5 sm:p-6">
                  <div className="mb-4">
                    <h4
                      className={`font-medium mb-1 ${
                        themeMode === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  <h4
                    className={`font-medium  mb-3 ${
                      themeMode === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Order Summary
                  </h4>
                  <div className="border-t border-gray-200">
                    {order?.products?.map((item, index) => (
                      <div
                        key={index}
                        className="py-4 flex items-center justify-between border-b border-gray-200"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                            {item?.product?.images?.length > 0 && (
                              <img
                                src={item?.product?.images[0]}
                                alt={item?.product?.productName}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <h5
                              className={`text-sm font-medium  ${
                                themeMode === "dark"
                                  ? "text-white"
                                  : "text-gray-900"
                              } `}
                            >
                              {item?.product?.productName
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </h5>
                            <p className="text-sm text-gray-500">
                              Brand: {item?.product?.brand}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item?.quantity}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            <p className="line-through">
                              {item?.product?.price.toFixed(2)} Rs{" "}
                              <span className="text-xs">(each)</span>
                            </p>
                            <p className="text-sm text-red-400">
                              Discount: {item?.product?.discount}% (per item)
                            </p>
                          </div>

                          <div
                            className={`text-sm font-medium  mt-1 ${
                              themeMode === "dark"
                                ? "text-white"
                                : "text-gray-900"
                            }  `}
                          >
                            <p>
                              {item?.product?.discountedPrice?.toFixed(2)} Rs{" "}
                              <span className="text-xs">(each)</span>
                            </p>
                            <p className="text-green-600">
                              {item?.quantity} ×{" "}
                              {item?.product?.discountedPrice?.toFixed(2)} ={" "}
                              {(
                                item?.product?.discountedPrice * item?.quantity
                              ).toFixed(2)}{" "}
                              Rs
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end items-center">
                    <div className="text-right">
                      <p
                        className={`text-sm ${
                          themeMode === "dark" ? "text-white" : "text-gray-500"
                        }`}
                      >
                        Total ({order?.products?.length} item
                        {order?.products?.length !== 1 ? "s" : ""})
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          themeMode === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {order?.totalAmount.toFixed(2)} Rs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
