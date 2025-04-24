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
import PaymentSuccess from "./components/CheckOut/PaymentSuccess";

import CheckOut from "./components/CheckOut/CheckOut";
import PaymentFailed from "./components/CheckOut/PaymentFailed";

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
                <Route path="/checkout/order/:cartId" element={<CheckOut />} />
                <Route
                  path="/checkout/order/:orderId/payment-sucessful"
                  element={<PaymentSuccess />}
                />
                <Route
                  path="/checkout/order/payment-failed"
                  element={<PaymentFailed />}
                />
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

// import React, { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// // Lazy imports
// const Profile = lazy(() => import("./components/Header/Profile"));
// const Home = lazy(() => import("./components/Home"));
// const Orders = lazy(() => import("./components/Header/Orders"));
// const MyCart = lazy(() => import("./components/Header/MyCart"));
// const Message = lazy(() => import("./components/Header/Message"));
// const AdminPanel = lazy(() => import("./components/AdminPanel/AdminPanel"));
// const AdminDashboard = lazy(() =>
//   import("./components/AdminDashboard/AdminDashboard")
// );
// const Login = lazy(() => import("./components/Auth/Login"));
// const Signup = lazy(() => import("./components/Auth/Signup"));
// const Header = lazy(() => import("./components/Header/Header"));
// const Footer = lazy(() => import("./components/Footer/Footer"));
// const ProductsListing = lazy(() =>
//   import("./components/ProductsListing/ProductsListing")
// );
// const ProductsDetails = lazy(() =>
//   import("./components/ProductsDetails/ProductsDetails")
// );
// const SaveForLater = lazy(() => import("./components/Header/SaveForLater"));
// const AllProductsByUser = lazy(() =>
//   import("./components/ProductsDetails/AllProductsByUser")
// );
// const PaymentSuccess = lazy(() =>
//   import("./components/CheckOut/PaymentSuccess")
// );
// const CheckOut = lazy(() => import("./components/CheckOut/CheckOut"));
// const PaymentFailed = lazy(() => import("./components/CheckOut/PaymentFailed"));

// const App = () => {
//   return (
//     <div>
//       <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <>
//                 <Header />
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/profile" element={<Profile />} />
//                   <Route path="/message" element={<Message />} />
//                   <Route path="/mycart" element={<MyCart />} />
//                   <Route path="/orders" element={<Orders />} />
//                   <Route path="/all-category" element={<ProductsListing />} />
//                   <Route path="/favorites" element={<SaveForLater />} />
//                   <Route
//                     path="/product-detail/:productId"
//                     element={<ProductsDetails />}
//                   />
//                   <Route
//                     path="/checkout/order/:cartId"
//                     element={<CheckOut />}
//                   />
//                   <Route
//                     path="/checkout/order/:orderId/payment-sucessful"
//                     element={<PaymentSuccess />}
//                   />
//                   <Route
//                     path="/checkout/order/payment-failed"
//                     element={<PaymentFailed />}
//                   />
//                 </Routes>
//                 <Footer />
//               </>
//             }
//           />
//           <Route path="/seller/signup" element={<AdminPanel />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/buyer/signup"
//             element={<Signup title={"Buyer Register"} />}
//           />
//           <Route path="/seller-dashboard" element={<AdminDashboard />} />
//           <Route
//             path="/seller's-profile/all-products/:userId"
//             element={<AllProductsByUser />}
//           />
//         </Routes>
//       </Suspense>

//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// };

// export default App;
