import React, { useContext, useState } from "react";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = ({ title }) => {
  const { handleApiCall } = useContext(GlobalContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    isAdmin: true,
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleApiCall(`${url}/`, "post", data);

      if (response && response.status === 201) {
        toast.success("You are registered. Please login now.");
        navigate("/login");
      } else {
        console.log("Signup failed", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during signup", error.response.data.message);
    }
  };

  return (
    <main className="mx-auto bg-slate-900 text-white font-semibold min-h-screen">
      <div className="mx-auto">
        <div className="flex flex-col px-3 gap-10 items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold">{title}</h1>
          <form
            className="flex flex-col w-full max-w-lg  border-2 p-6 gap-7"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-center font-bold">Signup</h1>

            <input
              className="py-2 rounded-2xl px-3 border-2 w-full"
              type="text"
              placeholder="Name"
              value={data.name}
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              className="py-2 rounded-2xl px-3 border-2 w-full"
              type="email"
              placeholder="Email"
              value={data.email}
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
              className="py-2 rounded-2xl px-3 border-2 w-full"
              type="password"
              placeholder="Password"
              value={data.password}
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <input
              className="py-2 rounded-2xl px-3 border-2 w-full"
              type="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />

            <input
              className="py-2 rounded-2xl px-3 border-2 w-full"
              type="text"
              placeholder="Phone Number"
              value={data.phoneNumber}
              name="phoneNumber"
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
            />

            <div className="flex w-full justify-between gap-2">
              <input
                className="py-2 rounded-2xl px-3 border-2 w-full"
                type="text"
                placeholder="Street Address"
                value={data.address.street}
                name="street"
                onChange={(e) =>
                  setData({
                    ...data,
                    address: { ...data.address, street: e.target.value },
                  })
                }
              />

              <input
                className="py-2 rounded-2xl px-3 border-2 w-full"
                type="text"
                placeholder="City"
                value={data.address.city}
                name="city"
                onChange={(e) =>
                  setData({
                    ...data,
                    address: { ...data.address, city: e.target.value },
                  })
                }
              />
            </div>

            <div className="gap-2 flex w-full justify-between">
              <input
                className="py-2 rounded-2xl px-3 border-2 w-full"
                type="text"
                placeholder="Postal Code"
                value={data.address.postalCode}
                name="postalCode"
                onChange={(e) =>
                  setData({
                    ...data,
                    address: { ...data.address, postalCode: e.target.value },
                  })
                }
              />

              <input
                className="py-2 rounded-2xl px-3 border-2 w-full"
                type="text"
                placeholder="Country"
                value={data.address.country}
                name="country"
                onChange={(e) =>
                  setData({
                    ...data,
                    address: { ...data.address, country: e.target.value },
                  })
                }
              />
            </div>

            <input
              className="py-2 bg-blue-800 border-white border-[2px] rounded-2xl px-3 cursor-pointer hover:bg-opacity-10 w-full text-white"
              type="submit"
              value={"Signup"}
            />

            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-blue-600 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
