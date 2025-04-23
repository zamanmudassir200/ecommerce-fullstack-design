import React from "react";
import { XCircle } from "react-feather";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 bg-gray-50 flex justify-center">
      <div className="bg-white mt-10 rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-pulse">
            <XCircle className="text-red-500 w-16 h-16" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again
          or use a different payment method.
        </p>

        <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-6 text-left">
          <h2 className="font-medium text-red-800 mb-2">Need Help?</h2>
          <p className="text-sm text-gray-700">
            Contact our support team if the issue persists. We're here to help!
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/mycart")}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Try Again
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

export default PaymentFailed;
