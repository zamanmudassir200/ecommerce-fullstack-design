// import React, { useContext, useState } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import url from "../../utils/url";
// const CheckOut = () => {
//   const { handleApiCall } = useContext(GlobalContext);
//   const params = useParams();
//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     paymentMethod: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const shippingAddress = {
//       street: formData.street,
//       city: formData.city,
//       postalCode: formData.postalCode,
//       country: formData.country,
//     };

//     const payload = {
//       shippingAddress,
//       paymentMethod: formData.paymentMethod,
//     };

//     try {
//       const response = await handleApiCall(
//         `${url}/orders/${params.cartId}`,
//         "post",
//         payload
//       );
//       console.log("response from checkout", response);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error("Error placing order");
//     }
//   };

//   return (
//     <div className="min-h-screen flex py-6 justify-center bg-gray-50">
//       <div className="border border-gray-300 rounded-xl max-w-xl w-full p-6 bg-white shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//             <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//               className="border p-2 w-full rounded-md"
//               required
//             >
//               <option value="">Select Payment Method</option>
//               <option value="Cash on Delivery">Cash on Delivery</option>
//               <option value="Credit Card">Credit Card</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;

// import React, { useContext, useState } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import url from "../../utils/url";

// const CheckOut = () => {
//   const { handleApiCall } = useContext(GlobalContext);
//   const params = useParams();

//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     paymentMethod: "",
//     cardNumber: "",
//     cvc: "",
//     expiryMonth: "",
//     expiryYear: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const shippingAddress = {
//       street: formData.street,
//       city: formData.city,
//       postalCode: formData.postalCode,
//       country: formData.country,
//     };

//     const paymentDetails =
//       formData.paymentMethod === "Credit Card"
//         ? {
//             cardNumber: formData.cardNumber,
//             cvc: formData.cvc,
//             expiryMonth: formData.expiryMonth,
//             expiryYear: formData.expiryYear,
//           }
//         : null;

//     const payload = {
//       shippingAddress,
//       paymentMethod: formData.paymentMethod,
//       paymentDetails,
//     };

//     try {
//       const response = await handleApiCall(
//         `${url}/orders/${params.cartId}`,
//         "post",
//         payload
//       );
//       console.log("response from checkout", response);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error("Error placing order");
//     }
//   };

//   return (
//     <div className="min-h-screen flex py-6 justify-center bg-gray-50">
//       <div className="border border-gray-300 rounded-xl max-w-xl w-full p-6 bg-white shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Shipping Address */}
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//             <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//               className="border p-2 w-full rounded-md"
//               required
//             >
//               <option value="">Select Payment Method</option>
//               <option value="Cash on Delivery">Cash on Delivery</option>
//               <option value="Credit Card">Credit Card</option>
//             </select>
//           </div>

//           {/* Credit Card Fields (conditionally rendered) */}
//           {formData.paymentMethod === "Credit Card" && (
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="cardNumber"
//                 placeholder="Card Number"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded-md"
//                 required
//               />
//               <div className="grid grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="cvc"
//                   placeholder="CVC"
//                   value={formData.cvc}
//                   onChange={handleChange}
//                   className="border p-2 rounded-md"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="expiryMonth"
//                   placeholder="Expiry Month (MM)"
//                   value={formData.expiryMonth}
//                   onChange={handleChange}
//                   className="border p-2 rounded-md"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="expiryYear"
//                   placeholder="Expiry Year (YYYY)"
//                   value={formData.expiryYear}
//                   onChange={handleChange}
//                   className="border p-2 rounded-md col-span-2"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;

// import React, { useContext, useState } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import url from "../../utils/url";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Replace this with your actual publishable key
// const stripePromise = loadStripe(
//   "pk_test_51RBfWhBBRvVhCtAuWtV4o6gRjqcjre56MLQ93TFw54IdxvMJfLDa9VKQBgSG1GoVejNyOjpk3tVpjGmLlRvk8sXC00XPFqKJgp"
// );

// const CheckoutForm = () => {
//   const { handleApiCall } = useContext(GlobalContext);
//   const params = useParams();
//   const stripe = useStripe();
//   const elements = useElements();
//   // const [totalAmount, setTotalAmount] = useState(0);

//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     payMethod: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const shippingAddress = {
//       street: formData.street,
//       city: formData.city,
//       postalCode: formData.postalCode,
//       country: formData.country,
//     };

//     if (formData.payMethod === "Credit Card") {
//       if (!stripe || !elements) return;

//       const cardElement = elements.getElement(CardElement);
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         toast.error(error.message);
//         return;
//       } else {
//         console.log("Stripe Payment Method: ", paymentMethod);

//         const payload = {
//           shippingAddress,
//           payMethod: formData.payMethod,
//           token: paymentMethod.id, // Send Payment Method ID as token to backend
//         };

//         try {
//           const response = await handleApiCall(
//             `${url}/orders/${params.cartId}`,
//             "post",
//             payload
//           );
//           toast.success(response.data.message);
//         } catch (error) {
//           toast.error("Error placing order");
//         }
//       }
//     } else {
//       // Handle Cash on Delivery
//       const payload = {
//         shippingAddress,
//         payMethod: formData.payMethod,
//       };

//       try {
//         const response = await handleApiCall(
//           `${url}/orders/${params.cartId}`,
//           "post",
//           payload
//         );
//         toast.success(response.data.message);
//       } catch (error) {
//         toast.error("Error placing order");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen mx-2 flex py-6 justify-center bg-gray-50">
//       <div className="border border-gray-300 rounded-xl max-w-xl w-full p-6 bg-white shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="street"
//                 placeholder="Street"
//                 value={formData.street}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="postalCode"
//                 placeholder="Postal Code"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//             <select
//               name="payMethod"
//               value={formData.payMethod}
//               onChange={handleChange}
//               className="border p-2 w-full rounded-md"
//               required
//             >
//               <option value="">Select Payment Method</option>
//               <option value="Cash on Delivery">Cash on Delivery</option>
//               <option value="Credit Card">Credit Card</option>
//             </select>
//           </div>

//           {formData.payMethod === "Credit Card" && (
//             <div className="space-y-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Card Details
//               </label>
//               <div className="border p-3 rounded-md">
//                 <CardElement
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "16px",
//                         color: "#32325d",
//                         "::placeholder": {
//                           color: "#a0aec0",
//                         },
//                       },
//                       invalid: {
//                         color: "#fa755a",
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
//           >
//             Place Order
//             {/* {`Place Order (${
//               formData.paymentMethod === "Credit Card"
//                 ? `Pay $${totalAmount}`
//                 : `Total: $${totalAmount}`
//             })`} */}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Wrap component with Stripe Elements
// const CheckOut = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default CheckOut;

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

const stripePromise = loadStripe(
  "pk_test_51RBfWhBBRvVhCtAuWtV4o6gRjqcjre56MLQ93TFw54IdxvMJfLDa9VKQBgSG1GoVejNyOjpk3tVpjGmLlRvk8sXC00XPFqKJgp"
);

const CheckoutForm = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const params = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

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
