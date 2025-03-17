const express = require("express");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/configDB");
const productsRoutes = require("./routes/productsRoutes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api,
  api_secret: process.env.cloudinary_secret,
});

const app = express();
app.use(
  cors({
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes);
app.use("/products/", productsRoutes);
connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
