const mongoose = require("mongoose");

const couponCodeSchema = mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("couponcode", couponCodeSchema);
