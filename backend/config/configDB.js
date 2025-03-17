const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure  }
  }
};
module.exports = connectDb;
