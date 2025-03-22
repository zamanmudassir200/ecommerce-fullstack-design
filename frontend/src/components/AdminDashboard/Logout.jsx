import React, { useContext, useState } from "react";
import url from "../../utils/url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Logout = ({ setIsLogoutModalOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleApiCall } = useContext(GlobalContext);
  const handleLogout = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        const response = await handleApiCall(`${url}/logout`, "post");
        setLoading(false);
        toast.success(response.data.message);
        navigate("/login");
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error("Error occured during logout");
    }
  };
  return (
    <div className="fixed inset-0 px-3 backdrop-brightness-50  z-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-2xl shadow-xl">
        <h1 className="font-bold text-center text-xl py-4">Logout </h1>
        <p className="text-lg mb-3">Are you sure you want to Logout?</p>
        <div className="flex justify-center gap-2 my-2">
          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="bg-gray-300 px-4 py-2 cursor-pointer rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className={`${
              loading ? "bg-red-400 disabled:" : "bg-red-600"
            } cursor-pointer px-4 py-2 text-white rounded-lg`}
          >
            {loading ? "Please wait..." : "Yes, Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
