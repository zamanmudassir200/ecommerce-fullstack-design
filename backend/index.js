const express = require("express");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/configDB");
const productsRoutes = require("./routes/productsRoutes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const cartRoutes = require("./routes/cartRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api,
  api_secret: process.env.cloudinary_secret,
});

const app = express();

// Allow requests from any origin for development purposes
app.use(
  cors({
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    origin: "*", // Allow all origins (not recommended for production)
    credentials: true, // Enable cookies and credentials support
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/products/", productsRoutes);
app.use("/categories/", categoriesRoutes);
app.use("/carts", cartRoutes);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
