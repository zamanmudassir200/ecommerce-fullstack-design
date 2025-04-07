// import React, { useContext, useState } from "react";
// import url from "../../utils/url";
// import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../context/GlobalContext";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const { handleApiCall } = useContext(GlobalContext);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await handleApiCall(`${url}/login`, "post", data);
//       const { isAdmin } = response.data.user;

//       if (response && response.status === 200) {
//         toast.success(response.data.message);
//         navigate(isAdmin ? "/admin-dashboard" : "/");
//       } else {
//         toast.error("Invalid Credentials. Please Try again");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-900 text-white">
//       <div className="container mx-auto px-4 py-8 sm:py-12">
//         <div className="max-w-md mx-auto">
//           <form
//             className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8"
//             onSubmit={handleSubmit}
//           >
//             <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

//             <div className="space-y-5">
//               <div>
//                 <input
//                   className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   type="email"
//                   placeholder="Email Address"
//                   value={data.email}
//                   onChange={(e) => setData({ ...data, email: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <input
//                   className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   type="password"
//                   placeholder="Password"
//                   value={data.password}
//                   onChange={(e) =>
//                     setData({ ...data, password: e.target.value })
//                   }
//                   required
//                   minLength="6"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
//                   loading
//                     ? "bg-blue-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>

//               <div className="text-center pt-4">
//                 <Link
//                   to="/forgot-password"
//                   className="text-blue-400 hover:text-blue-300 text-sm"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             <p className="text-center mt-8 text-slate-300">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-blue-400 hover:text-blue-300 underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;

// import React, { useContext, useState } from "react";
// import url from "../../utils/url";
// import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../context/GlobalContext";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const { handleApiCall } = useContext(GlobalContext);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await handleApiCall(`${url}/login`, "post", data);
//       const { isAdmin } = response.data.user;

//       if (response && response.status === 200) {
//         toast.success(response.data.message);
//         navigate(isAdmin ? "/admin-dashboard" : "/");
//       } else {
//         toast.error("Invalid Credentials. Please Try again");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="h-screen bg-slate-900 text-white">
//       <div className="container mx-auto px-4 py-8 sm:py-12">
//         <div className="max-w-md mx-auto">
//           <form
//             className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8"
//             onSubmit={handleSubmit}
//           >
//             <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

//             <div className="space-y-5">
//               <div>
//                 <input
//                   className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   type="email"
//                   placeholder="Email Address"
//                   value={data.email}
//                   onChange={(e) => setData({ ...data, email: e.target.value })}
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <input
//                   className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={data.password}
//                   onChange={(e) =>
//                     setData({ ...data, password: e.target.value })
//                   }
//                   required
//                   minLength="6"
//                 />
//                 <button
//                   type="button"
//                   className="absolute  right-3 top-4 text-slate-400 hover:text-white"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
//                   loading
//                     ? "bg-blue-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>

//               <div className="text-center pt-4">
//                 <Link
//                   to="/forgot-password"
//                   className="text-blue-400 hover:text-blue-300 text-sm"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             <p className="text-center mt-8 text-slate-300">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-blue-400 hover:text-blue-300 underline"
//               >
//                 Register
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;

import React, { useContext, useState } from "react";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/login`, "post", data);
      console.log("response from login", response);
      console.log("user type", response.data.userType);
      if (response && response.status === 200) {
        toast.success(response.data.message);
        navigate(
          response.data.userType === "seller" ? "/seller-dashboard" : "/"
        );
      } else {
        toast.error("Invalid Credentials. Please Try again");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md px-4">
        <form
          className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="space-y-4">
            <div>
              <input
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email Address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                minLength="6"
              />
              <button
                type="button"
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer py-3 px-4 rounded-lg font-bold transition-colors ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <p className="text-center mt-6 text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
