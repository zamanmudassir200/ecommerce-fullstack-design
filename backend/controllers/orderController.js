const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const payment = require("./payment");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, payMethod, token } = req.body;

    if (!shippingAddress || !payMethod) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const { id } = req.user;
    const { cartId } = req.params;

    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Unauthorized! User not found", success: false });
    }

    const existingCart = await cartModel
      .findById(cartId)
      .populate("items.product");
    if (!existingCart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const cartItems = existingCart.items.map((item) => item);
    const totalPrices = existingCart.items.map((item) => {
      return (
        (item.product.price -
          (item.product.price * item.product.discount) / 100) *
        item.quantity
      );
    });
    const totalAmount = totalPrices
      .reduce((acc, price) => acc + price, 0)
      .toFixed(2);

    // 💳 Payment
    let paymentResult = null;
    if (payMethod === "Credit Card") {
      try {
        if (!token || !totalAmount) {
          return res
            .status(400)
            .json({ message: "Token and amount are required", success: false });
        }
        paymentResult = await payment(token, totalAmount);
        console.log("Stripe payment successful:", paymentResult.id);

        if (paymentResult.status !== "succeeded") {
          return res.status(400).json({
            message: `Payment failed: ${
              paymentResult.last_payment_error?.message || "Unknown error"
            }`,
            success: false,
          });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: `Stripe Error: ${error.message}`, success: false });
      }
    }

    // 🛒 Order Creation
    const createdOrder = await orderModel.create({
      user: id,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalAmount,
      shippingAddress,
      payMethod,
      paymentStatus: payMethod === "Credit Card" ? "Paid" : "Pending",
      paymentId: payMethod === "Credit Card" ? paymentResult.id : null,
    });

    const populatedOrder = await createdOrder.populate("products.product");

    return res.status(201).json({
      message: "Order placed successfully",
      order: populatedOrder,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};

const getAllOrders = async (_req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("products.product")
      .populate("user");
    if (!orders) {
      return res
        .status(200)
        .json({ message: "No orders found", success: false });
    }
    return res
      .status(200)
      .json({ message: "All orders", count: orders.length, orders });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found. Unauthorized" });
    }
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Order found", order, success: true });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    console.log("userId", id, user);
    if (!user) {
      return res.status(404).json({ message: "User not found. Unauthorized" });
    }
    const orders = await orderModel
      .find({ user: id })
      .populate("products.product");

    if (!orders) {
      return res
        .status(404)
        .json({ message: "No orders found", success: false });
    }

    return res.status(200).json({
      message: "Orders found",
      count: orders.length,
      orders,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};
module.exports = { createOrder, getAllOrders, getOrderById, getOrdersByUser };
