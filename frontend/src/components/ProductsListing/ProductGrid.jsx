import React, { useContext, useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import url from "../../utils/url";

const ProductGrid = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { handleApiCall } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if the user is logged in and update the wishlist status
  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");

      if (response.data.loggedIn) {
        const currentUser = response.data.user;
        setUser(currentUser);
        const { wishList } = currentUser;

        // Check if the product is in the user's wishlist
        if (wishList.some((item) => item._id === product._id)) {
          setIsInWishlist(true);
        } else {
          setIsInWishlist(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error checking login status");
    }
  };

  // Initialize wishlist status on component mount or when product changes
  useEffect(() => {
    if (product && product._id) {
      checkUserLoggedIn();
    }
  }, [product]);

  const addToWishList = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/products/add-to-wishlist/${productId}`,
        "patch"
      );
      setIsInWishlist(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while adding to wishlist");
    }
  };

  const removeFromWishList = async (productId) => {
    try {
      const response = await handleApiCall(
        `${url}/products/remove-from-wishlist/${productId}`,
        "patch"
      );
      setIsInWishlist(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error while removing from wishlist");
    }
  };

  return (
    <div className="h-[405px]   w-[295px] border-[1px] border-gray-200 rounded-md">
      <div
        onClick={() => navigate(`/product-detail/${product._id}`)}
        className="w-full cursor-pointer  h-52 overflow-hidden p-2"
      >
        <img
          className="h-full hover:scale-125 transition-transform duration-150 w-full object-contain"
          src={product.images[0]}
        />
      </div>
      <div className="p-3 relative">
        <p className=" flex gap-2 items-center">
          <span className="text-[20px] font-bold">{product.price} Rs</span>

          <span className="line-through text-md text-gray-400">
            {product.discount > 0 && (
              <span>
                {(product.price / (1 - product.discount / 100)).toFixed(2)}
                Rs
              </span>
            )}
          </span>
        </p>
        <p>Rating</p>
        <h1 className="font-semibold text-xl py-2">{product.productName}</h1>
        <div
          onClick={() =>
            isInWishlist
              ? removeFromWishList(product._id)
              : addToWishList(product._id)
          }
          className="absolute top-5 right-5 border-[1px] p-2 rounded-md border-gray-200"
        >
          {isInWishlist ? (
            <FaHeart className="cursor-pointer text-blue-500" size={22} />
          ) : (
            <FaRegHeart className="cursor-pointer text-blue-500" size={22} />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
