import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../../utils/url";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51RBfWhBBRvVhCtAuWtV4o6gRjqcjre56MLQ93TFw54IdxvMJfLDa9VKQBgSG1GoVejNyOjpk3tVpjGmLlRvk8sXC00XPFqKJgp"
);

const CheckoutForm = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const params = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
    payMethod: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const shippingAddress = {
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    if (formData.payMethod === "Credit Card") {
      if (!stripe || !elements) {
        setProcessing(false);
        return;
      }

      try {
        const cardElement = elements.getElement(CardElement);

        // Create payment method
        const { error: paymentMethodError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });

        if (paymentMethodError) {
          toast.error(paymentMethodError.message);
          setProcessing(false);
          return;
        }

        const payload = {
          shippingAddress,
          payMethod: formData.payMethod,
          token: paymentMethod.id, // This is the payment method ID
        };

        const response = await handleApiCall(
          `${url}/orders/${params.cartId}`,
          "post",
          payload
        );

        navigate(
          `/checkout/order/${response.data.order._id}/payment-sucessful`
        );

        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Payment failed");
      }
    } else {
      // Handle Cash on Delivery
      const payload = {
        shippingAddress,
        payMethod: formData.payMethod,
      };

      try {
        const response = await handleApiCall(
          `${url}/orders/${params.cartId}`,
          "post",
          payload
        );
        navigate(
          `/checkout/order/${response.data.order._id}/payment-sucessful`
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Order failed");
      }
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen mx-2 flex py-6 justify-center bg-gray-50">
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
              name="payMethod"
              value={formData.payMethod}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          {formData.payMethod === "Credit Card" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Card Details
              </label>
              <div className="border p-3 rounded-md">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                          color: "#a0aec0",
                        },
                      },
                      invalid: {
                        color: "#fa755a",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full disabled:opacity-50"
          >
            {processing ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

const CheckOut = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckOut;
