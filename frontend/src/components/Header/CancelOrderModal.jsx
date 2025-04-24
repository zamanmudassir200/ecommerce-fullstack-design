import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const CancelOrderModal = ({ onClose, orderId, onConfirm }) => {
  const { themeMode } = useContext(GlobalContext);
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center backdrop-brightness-50 bg-opacity-50 z-50 `}
    >
      <div
        className={` p-6 rounded-lg shadow-lg max-w-2xl ${
          themeMode === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to cancel this order{" "}
          <span className="text-red-400 font-semibold">{orderId}</span> ?
        </h2>
        <div className="flex justify-end gap-5">
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
