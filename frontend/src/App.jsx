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
const App = () => {
  return (
    <div className="">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<Message />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
