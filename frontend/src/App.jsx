import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Header/Profile";
import Home from "./components/Home";
import Orders from "./components/Header/Orders";
import MyCart from "./components/Header/MyCart";
import Message from "./components/Header/Message";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import ProductsListing from "./components/ProductsListing/ProductsListing";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import SaveForLater from "./components/Header/SaveForLater";
import AllProductsByUser from "./components/ProductsDetails/AllProductsByUser";

import CheckOut from "./components/CheckOut/CheckOut";
const App = () => {
  return (
    <div className="">
      <Routes>
        {/* Normal routes with header and footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/message" element={<Message />} />
                <Route path="/mycart" element={<MyCart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/all-category" element={<ProductsListing />} />
                <Route path="/favorites" element={<SaveForLater />} />

                <Route
                  path="/product-detail/:productId"
                  element={<ProductsDetails />}
                />
                <Route path="/checkout/order" element={<CheckOut />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin routes without header and footer */}
        <Route path="/seller/signup" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/buyer/signup"
          element={<Signup title={"Buyer Register"} />}
        />
        <Route path="/seller-dashboard" element={<AdminDashboard />} />
        <Route
          path="/seller's-profile/all-products/:userId"
          element={<AllProductsByUser />}
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
