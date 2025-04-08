const { orderModel } = require("../models/orderModel");
const userModel = require("../models/userModel");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const { id } = req.user;

    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Unauthorized! User not found", success: false });
    }

    if (!shippingAddress || !paymentMethod) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const createdOrder = await orderModel.create({
      user: existingUser._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error ${error}`, success: false });
  }
};

module.exports = { createOrder };
