import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { toast } from "react-toastify";
import ApprovedModal from "./ApprovedModal";
import ChangeOrderStatus from "./ChangeOrderStatus";
import CancelOrder from "./CancelOrder";

const OrderHistory = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);
  const [approvedModal, setApprovedModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderStatusModal, setOrderStatusModal] = useState(false);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);

  const getAllOrders = async () => {
    try {
      const response = await handleApiCall(`${url}/orders`, "get");
      console.log("response from orderhistory", response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Error while fetching orders");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleApproveOrder = async (orderId) => {
    try {
      const response = await handleApiCall(
        `${url}/orders/approve-order/${orderId}`,
        "patch"
      );
      toast.success(response.data.message);
      getAllOrders(); // 👈 Refresh the orders list after approval
      setApprovedModal(false);
    } catch (error) {
      toast.error("Error occurred while approving order");
    }
  };

  const handleChangeStatus = async (orderId) => {
    try {
      const response = await handleApiCall(
        `${url}/orders/change-order-status/${orderId}`,
        "post"
      );
      toast.success(response.data.message);
      getAllOrders(); // 👈 Refresh the orders list after status change
      setOrderStatusModal(false);
    } catch (error) {
      toast.error("Error occurred while changing order status");
      console.log(error);
    }
  };
  const handleOrderCancel = async (orderId) => {
    try {
      const response = await handleApiCall(
        `${url}/orders/cancel-order/${orderId}`,
        "post"
      );
      toast.success(response.data.message);
      getAllOrders(); // 👈 Refresh the orders list after status change
      setCancelOrderModal(false);
    } catch (error) {
      toast.error("Error occurred while changing order status");
      console.log(error);
    }
  };
  return (
    <div className="relative p-4">
      <h1 className="text-2xl font-bold mb-6">🛍️ Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.reverse().map((order) => (
            <div
              key={order._id}
              className={` ${
                order.orderStatus === "Cancelled" && "bg-red-100"
              } ${
                order.orderStatus === "Delivered" && "bg-green-100"
              } border p-4 rounded-lg shadow-md`}
            >
              <div className="mb-2 text-gray-700 text-sm">
                <strong>Order ID:</strong> {order._id}
              </div>

              <div className="my-3 border-[1px] break-alxxl border-gray-500 p-2 rounded-lg">
                <h1>
                  <strong>Username:</strong> {order.user.name}
                </h1>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                  <strong>Phone number:</strong> {order.user.phoneNumber}
                </p>
              </div>

              <div className="my-4">
                <strong>Products:</strong>
                <ul className="ml-4 list-disc text-sm text-gray-700">
                  {order?.products?.map((prod) => (
                    <li key={prod._id}>
                      <span className="text-lg">Name: </span>{" "}
                      <strong className="text-lg">
                        {prod?.product?.productName}
                      </strong>{" "}
                      <span className="font-medium">Qty:</span> {prod?.quantity}
                      ,<span className="font-medium ml-1">Price:</span> per qty{" "}
                      <b>{prod?.product?.discountedPrice} Rs</b>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm flex gap-2 justify-between items-center mb-3">
                <p className="text-gray-600">
                  <strong>Payment:</strong> {order?.payMethod} -{" "}
                  <span
                    className={` ${
                      order?.paymentStatus?.toLowerCase() === "paid"
                        ? "text-green-400"
                        : ""
                    } italic font-semibold `}
                  >
                    {" "}
                    {order?.paymentStatus}
                  </span>{" "}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {order?.orderStatus === "Processing" && (
                    <button
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        setApprovedModal(true);
                      }}
                      className="bg-green-500 px-2 cursor-pointer text-white rounded-2xl"
                    >
                      Approved
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setCancelOrderModal(true);
                    }}
                    disabled={
                      order.orderStatus === "Cancelled" ||
                      order.orderStatus === "Out for Delivery" ||
                      order.orderStatus === "Delivered"
                    }
                    className={`px-2 text-white rounded-2xl ${
                      order.orderStatus === "Cancelled" ||
                      order.orderStatus === "Out for Delivery" ||
                      order.orderStatus === "Delivered"
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 cursor-pointer"
                    }`}
                  >
                    {order.orderStatus === "Cancelled" ? "Cancelled" : "Cancel"}
                  </button>
                </div>
              </div>
              <div className="text-sm flex gap-2 justify-between items-center mb-3">
                <p className="text-gray-600">
                  <strong>Order Status:</strong>{" "}
                  <span
                    className={`italic font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-blue-500"
                        : order.orderStatus === "Out for Delivery"
                        ? "text-orange-400"
                        : order.orderStatus === "Shipped"
                        ? "text-purple-500"
                        : order.orderStatus === "Confirmed"
                        ? "text-green-600"
                        : order.orderStatus === "Cancelled"
                        ? "text-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>

                {order.orderStatus !== "Processing" && (
                  <button
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setOrderStatusModal(true);
                    }}
                    disabled={
                      order.orderStatus === "Delivered" ||
                      order.orderStatus === "Cancelled"
                    } // final or cancelled
                    className={`px-2 text-white rounded-2xl ${
                      order.orderStatus === "Delivered" ||
                      order.orderStatus === "Cancelled"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 cursor-pointer"
                    }`}
                    title={
                      order.orderStatus === "Delivered"
                        ? "Order already delivered"
                        : order.orderStatus === "Cancelled"
                        ? "Order has been cancelled"
                        : "Click to move to next status"
                    }
                  >
                    {order.orderStatus === "Delivered"
                      ? "Final Stage"
                      : order.orderStatus === "Cancelled"
                      ? "Cancelled"
                      : "Change Status"}
                  </button>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <strong>Created At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div className="mb-3">
                <strong>Shipping Address:</strong>
                <div className="text-sm ml-2">
                  {order.shippingAddress.street}, {order.shippingAddress.city},
                  <br />
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-lg">
                  <b>Total Amount:</b> {order.totalAmount} Rs
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {approvedModal && (
        <ApprovedModal
          orderId={selectedOrderId}
          onConfirm={() => handleApproveOrder(selectedOrderId)}
          onClose={() => setApprovedModal(false)}
        />
      )}
      {orderStatusModal && (
        <ChangeOrderStatus
          orderId={selectedOrderId}
          onConfirm={() => handleChangeStatus(selectedOrderId)}
          onClose={() => setOrderStatusModal(false)}
        />
      )}
      {cancelOrderModal && (
        <CancelOrder
          orderId={selectedOrderId}
          onConfirm={() => handleOrderCancel(selectedOrderId)}
          onClose={() => setCancelOrderModal(false)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
