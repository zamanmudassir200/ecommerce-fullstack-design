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
const couponCodeRoutes = require("./routes/couponCodeRoutes");

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
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

// app.options("*", cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/carts", cartRoutes);
app.use("/couponcodes", couponCodeRoutes);

app.get("/", (req, res) => {
  res.send("welcome to home page");
});
connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
