import React, { useContext, useState } from "react";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ title }) => {
  const { handleApiCall } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    userType: `${title === "Buyer Register" ? "buyer" : "seller"}`,
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/`, "post", data);

      if (response && response.status === 201) {
        toast.success("You are registered. Please login now.");
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {title}
          </h1>

          <form
            className="bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

            <div className="space-y-4">
              <div>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>

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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
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

              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-4 text-slate-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="tel"
                  placeholder="Phone Number"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Street Address"
                    value={data.address.street}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: { ...data.address, street: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="City"
                    value={data.address.city}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: { ...data.address, city: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Postal Code"
                    value={data.address.postalCode}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: {
                          ...data.address,
                          postalCode: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Country"
                    value={data.address.country}
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: { ...data.address, country: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
                  loading
                    ? "bg-blue-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            <p className="text-center mt-6 text-slate-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
