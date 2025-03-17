const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);
export const categoryModel = mongoose.model("category", categorySchema);
