require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const payment = async (paymentMethodId, totalAmount) => {
  try {
    // Create and confirm the paymentIntent directly with the paymentMethodId
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents/paisa and round to integer
      currency: "pkr", // Stripe uses lowercase currency codes
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      return_url: "http://localhost:3000/",
    });

    return paymentIntent;
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = payment;
