const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
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
    const cartItems = existingCart.items.map((item) => {
      return item;
    });
    let totalPrices = [];
    existingCart.items.map((item) => {
      const totalPrice =
        (item.product.price -
          (item.product.price * item.product.discount) / 100) *
        item.quantity;
      totalPrices.push(totalPrice);
    });

    // if (paymentMethod === "Credit Card") {
    //   return;
    // }
    const createdOrder = await orderModel.create({
      user: id,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalPrices
        .reduce((acc, price) => {
          return acc + price;
        }, 0)
        .toFixed(2),
      shippingAddress,
      paymentMethod,
    });
    const populatedOrder = await createdOrder.populate("products.product");

    return res
      .status(201)
      .json({ message: "Order Placed", populatedOrder, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error ${error}`, success: false });
  }
};

const getAllOrders = async (req, res) => {
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
module.exports = { createOrder, getAllOrders };
