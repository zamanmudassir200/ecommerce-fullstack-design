import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";

const SaveForLater = () => {
  const [user, setUser] = useState(null);
  const { handleApiCall, cartNumber, setCartNumber } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response.data.loggedIn) {
        setUser(response.data.wishList);
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error checking login status");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/carts/${productId}`,
        "post",
        { quantity: 1 }
      );
      setCartNumber(cartNumber + 1);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while adding to cart");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Saved for Later</h1>

        {user && user.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  {item.images?.[0] ? (
                    <img
                      className="h-full w-full object-contain"
                      src={item.images[0]}
                      alt={item.productName}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <h2 className="text-sm sm:text-base font-semibold line-clamp-2">
                    {item.productName}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <p className="font-bold text-sm sm:text-base mt-2">
                    {item.price} Rs
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="w-full text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-lg px-3 py-2 text-sm sm:text-base font-medium transition-colors"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              {user
                ? "No items saved for later"
                : "Please login to view saved items"}
            </p>
            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveForLater;
