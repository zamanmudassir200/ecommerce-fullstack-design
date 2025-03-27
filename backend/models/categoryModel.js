// const mongoose = require("mongoose");

// const subCategorySchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     _id: false, // Disable subdocument _id generation
//   }
// );

// const categorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true, // Only this 'name' field should have a unique constraint
//     },
//     subCategories: [subCategorySchema], // Reference subCategorySchema for better reusability
//     description: {
//       type: String,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("category", categorySchema);
const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // If subcategories should be unique
  },
  description: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("subcategory", subCategorySchema);

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory", // Reference to subCategory
    },
  ],
  description: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.model("category", categorySchema);
