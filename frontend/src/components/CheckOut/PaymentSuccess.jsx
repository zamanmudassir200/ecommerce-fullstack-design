import React, { useContext, useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import url from "../../utils/url";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const params = useParams();
  console.log("params", params);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const getAllOrders = async () => {
    try {
      const response = await handleApiCall(
        `${url}/orders/${params.orderId}`,
        "get"
      );
      console.log("response", response);
      setOrder(response.data.order);
    } catch (error) {
      toast.error("Error occured while fetching orders");
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="min-h-screen py-10 bg-gray-50 flex  justify-center ">
      <div className="bg-white mt-10 rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-bounce">
            <CheckCircle
              className="text-green-500 w-16 h-16"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6 text-left">
          <h2 className="font-medium text-green-800 mb-2">Order Details</h2>
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Order ID:</span>
            <span className="font-bold">{order._id}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Date:</span>
            <span className="font-bold">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Amount:</span>
            <span className="font-bold">{order.totalAmount} Rs</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          A confirmation email has been sent to your registered email address.
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            View Your Orders
          </button>
          <button
            onClick={() => navigate("/all-category")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
