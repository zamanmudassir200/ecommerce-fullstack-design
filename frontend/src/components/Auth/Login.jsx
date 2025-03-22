import React, { useContext, useState } from "react";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/login`, "post", data);
      const { isAdmin } = response.data.user;
      if (response && response.status === 200) {
        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
        setLoading(false);
        toast.success(response.data.message);
      } else {
        setLoading(false);
        toast.error("Invalid Credentials. Please Try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="mx-auto bg-slate-900 font-semibold text-white min-h-screen">
      <div className="flex flex-col gap-10 px-3 items-center justify-center min-h-screen">
        <form
          className="flex flex-col w-full max-w-lg  border-2 p-6 gap-7"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <input
            className="py-2 rounded-2xl px-3 border-2 "
            type="email"
            placeholder="Email"
            value={data.email}
            name="email"
            onChange={(e) => setData({ ...data, email: e.target.value })} // Update email only
          />
          <input
            className="py-2 rounded-2xl px-3 border-2 "
            type="password"
            placeholder="Password"
            value={data.password}
            name="password"
            onChange={(e) => setData({ ...data, password: e.target.value })} // Update password only
          />
          <input
            className={`py-2 ${
              loading ? "bg-blue-400 " : "bg-blue-800"
            } border-white border-2  rounded-2xl px-3 cursor-pointer hover:bg-opacity-10 text-white`}
            type="submit"
            value={loading ? "Logining..." : "Login"}
          />
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600  hover:underline" to="/signup">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
