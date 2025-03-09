import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Header/Profile";
import Home from "./components/Home";
import Orders from "./components/Header/Orders";
import MyCart from "./components/Header/MyCart";
import Message from "./components/Header/Message";
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/mycart" element={<MyCart />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </div>
  );
};

export default App;
