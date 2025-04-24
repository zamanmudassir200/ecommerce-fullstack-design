import React from "react";

const CancelOrder = ({ orderId, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Cancel Order</h2>
        <p className="mb-6 text-gray-700 text-center">
          Are you sure you want to cancel this order{" "}
          <span className="font-semibold text-red-600">{orderId}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
