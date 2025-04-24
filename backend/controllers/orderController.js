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

// const approveOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     // Find the order and validate status
//     const order = await orderModel.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         message: "Order not found",
//         success: false,
//       });
//     }

//     // Check if order is in processing state
//     if (order.orderStatus !== "Processing") {
//       return res.status(400).json({
//         message: `Order cannot be shipped from current status: ${order.orderStatus}`,
//         success: false,
//         validCurrentStatuses: ["Processing"], // For client-side reference
//       });
//     }

//     // Update the order status and set shipped timestamp
//     const updatedOrder = await orderModel.findByIdAndUpdate(
//       order._id,
//       {
//         orderStatus: "Shipped",
//         shippedAt: new Date(), // Optional: Track when it was shipped
//       },
//       { new: true } // Return the updated document
//     );

//     return res.status(200).json({
//       message: "Order shipped successfully",
//       success: true,
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error(`Shipping error for order ${orderId}:`, error);
//     return res.status(500).json({
//       message: "Failed to update order status",
//       error: error.message,
//     });
//   }
// };

const approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Validate current status
    if (order.orderStatus !== "Processing") {
      return res.status(400).json({
        success: false,
        message: `Cannot ship order with current status: ${order.orderStatus}`,
        validCurrentStatuses: ["Processing"], // Optional: for frontend logic
      });
    }

    // Update order to Shipped
    order.orderStatus = "Confirmed";
    order.shippedAt = new Date(); // Optional field
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order shipped successfully",
      order,
    });
  } catch (error) {
    console.error(`Shipping error for order ${req.params.orderId}:`, error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Define allowed status transitions in order
    const statusSequence = [
      "Processing",
      "Confirmed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    // Find order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const currentStatus = order.orderStatus;
    const currentIndex = statusSequence.indexOf(currentStatus);

    if (currentIndex === -1) {
      return res.status(400).json({
        success: false,
        message: `Invalid current status: ${currentStatus}`,
      });
    }

    // If already at final status, stop further transition
    if (currentIndex === statusSequence.length - 1) {
      return res.status(400).json({
        success: false,
        message: `Order already in final status: ${currentStatus}`,
      });
    }

    // Move to the next status
    const nextStatus = statusSequence[currentIndex + 1];
    order.orderStatus = nextStatus;

    // Optional timestamps
    if (nextStatus === "Shipped") {
      order.shippedAt = new Date();
    }
    if (nextStatus === "Delivered") {
      order.deliveredAt = new Date();
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${nextStatus}`,
      order,
    });
  } catch (error) {
    console.error("Error while updating order status:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Check if order exists
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    // Update order status to "Cancelled"
    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: `Order ${orderId} cancelled successfully`,
      success: true,
      order,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server error: ${error.message}`, success: false });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  approveOrder,
  changeOrderStatus,
  cancelOrder,
};
