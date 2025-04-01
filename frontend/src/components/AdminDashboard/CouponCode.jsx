import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import url from "../../utils/url";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify"; // Ensure you import toast if you're using it

const CouponCode = ({ setIsCouponCodeModalOpen }) => {
  const [couponData, setCouponData] = useState({
    couponCode: "",
    discount: 0,
  });
  const { handleApiCall } = useContext(GlobalContext);

  // Handle form submission
  const handleCouponCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send coupon data to API
      const response = await handleApiCall(`${url}/couponcodes/`, "post", {
        couponCode: couponData.couponCode,
        discount: couponData.discount,
      });

      // Handle successful submission
      if (response.data.success) {
        toast.success("Coupon code added successfully!");
        setIsCouponCodeModalOpen(false);
      } else {
        toast.error(response.message || "Failed to add coupon.");
      }
    } catch (error) {
      // Handle any errors
      toast.error(error?.message || "An error occurred.");
    }
  };

  // Handle input changes for both coupon code and discount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData({
      ...couponData,
      [name]: value, // Dynamically update state based on input field name
    });
  };

  return (
    <div className="absolute flex backdrop-brightness-50 z-55 items-center justify-center inset-0">
      <div className="bg-white p-4 max-w-xl w-lg m-2 rounded-lg">
        <div className="flex my-4 items-center justify-between">
          <h1 className="text-lg font-semibold">Add Coupon Code</h1>
          <RxCross1
            onClick={() => setIsCouponCodeModalOpen(false)}
            size={24}
            className="cursor-pointer"
          />
        </div>

        {/* Coupon Form */}
        <form onSubmit={handleCouponCodeSubmit} className="flex flex-col">
          {/* Coupon Code Input */}
          <div className="">
            <input
              className="border-[2px] border-gray-200 outline-none px-2 py-2 w-full mb-2 rounded-lg"
              type="text"
              name="couponCode"
              value={couponData.couponCode}
              placeholder="Enter Coupon Code"
              onChange={handleInputChange}
            />
          </div>

          {/* Discount Input */}
          <div className="">
            <input
              className="border-[1px] border-gray-200 outline-none px-2 py-2 w-full mb-3 rounded-lg"
              type="number"
              name="discount"
              value={couponData.discount}
              placeholder="Discount"
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="">
            <button
              type="submit"
              className="bg-green-500 w-full px-3 py-2 rounded-lg font-semibold text-white cursor-pointer"
            >
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponCode;
