import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import url from "../../utils/url";
import { GlobalContext } from "../../context/GlobalContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const { handleApiCall, themeMode } = useContext(GlobalContext);
  const navigate = useNavigate();
  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response?.data?.loggedIn) {
        setUser(response.data.user);
        setUpdatedUser(response.data.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await handleApiCall(`${url}/logout`, "post");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Logout failed!");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setUpdatedUser((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await handleApiCall(
        `${url}/editUser`,
        "patch",
        updatedUser
      );
      if (response?.data?.success) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch {
      toast.error("Error updating profile");
    }
  };

  const handleRemoveFromWishList = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/products/remove-from-wishlist/${productId}`,
        "patch"
      );

      // setUser(response.data.user);
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data.user,
      }));
    } catch (error) {
      console.log("Error removing item from wishlist:", error);
    }
  };
  if (!user) {
    return (
      <p
        className={`text-center text-lg pt-10 h-[500px] flex items-center justify-center ${
          themeMode === "dark" ? "bg-slate-900 text-white " : ""
        }`}
      >
        Loading...
      </p>
    );
  }

  return (
    <div
      className={`min-h-screen relative flex flex-col items-center p-6 ${
        themeMode === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div
        className={`w-full max-w-md shadow-md rounded-lg p-6 ${
          themeMode === "dark" ? "bg-slate-700 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            src={user?.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <h2 className="text-2xl font-bold capitalize mt-3">{user?.name}</h2>
          <p
            className={` ${
              themeMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {user?.email}
          </p>
          <p
            className={` ${
              themeMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {user?.phoneNumber}
          </p>
        </div>

        {/* Address Section */}
        {user && user?.address && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <p
              className={`${
                themeMode === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {user?.address?.street} {user?.address?.city},{" "}
              {user?.address?.country} - {user?.address?.postalCode}
            </p>
            {/* <p className="text-gray-600">
              {user?.address?.city}, {user?.address?.country} -{" "}
              {user?.address?.postalCode}
            </p> */}
          </div>
        )}

        {/* Wishlist Section */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Wishlist</h3>
          {user?.wishList?.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {user?.wishList.map((product) => (
                <li
                  key={product._id}
                  className="p-2 flex items-center justify-between border-b"
                >
                  <div className="">
                    <span className="font-semibold">{product.productName}</span>{" "}
                    - {product.price} Rs
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleRemoveFromWishList(product._id)}
                      className="bg-red-600 text-white w-6 h-6 cursor-pointer flex items-center justify-center   rounded-full"
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items in wishlist</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-brightness-50 bg-opacity-50 overflow-auto">
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full 
        absolute top-10 left-1/2 transform -translate-x-1/2 
        max-h-[80vh] "
          >
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-2">
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />
              <label className="block">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={updatedUser.phoneNumber || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />

              {/* Address Inputs */}
              <label className="block">Street</label>
              <input
                type="text"
                name="address.street"
                value={updatedUser.address?.street || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />
              <label className="block">City</label>
              <input
                type="text"
                name="address.city"
                value={updatedUser.address?.city || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />
              <label className="block">Country</label>
              <input
                type="text"
                name="address.country"
                value={updatedUser.address?.country || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />
              <label className="block">Postal Code</label>
              <input
                type="text"
                name="address.postalCode"
                value={updatedUser.address?.postalCode || ""}
                onChange={handleEditChange}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
