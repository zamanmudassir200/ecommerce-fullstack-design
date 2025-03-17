const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: {
        street: {
          type: String,
        },
        city: {
          type: String,
        },
        postalCode: {
          type: String,
        },
        country: {
          type: String,
        },
      },
      trim: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&s",
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
