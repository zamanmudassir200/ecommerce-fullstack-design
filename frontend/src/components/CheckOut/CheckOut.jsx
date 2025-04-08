import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../../utils/url";
const CheckOut = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const params = useParams();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingAddress = {
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    const payload = {
      shippingAddress,
      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await handleApiCall(
        `${url}/orders/${params.cartId}`,
        "post",
        payload
      );
      console.log("response from checkout", response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  return (
    <div className="min-h-screen flex py-6 justify-center bg-gray-50">
      <div className="border border-gray-300 rounded-xl max-w-xl w-full p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
