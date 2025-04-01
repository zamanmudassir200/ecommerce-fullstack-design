import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AllProductsByUser = () => {
  const { sellersAllProducts, handleApiCall, setSellersAllProducts } =
    useContext(GlobalContext);
  const { userId } = useParams();

  // State to track quantity for each product
  const [quantities, setQuantities] = useState({});

  // Fetch all products of a specific seller
  const getAllProductsByUser = async (userId) => {
    try {
      const response = await handleApiCall(
        `${url}/products/getAllProductsByUser/${userId}`,
        "get"
      );
      if (response.data.success) {
        setSellersAllProducts(response?.data?.allProducts);
        // Initialize quantity state for each product
        const initialQuantities = {};
        response?.data?.allProducts?.forEach((product) => {
          initialQuantities[product._id] = 1;
        });
        setQuantities(initialQuantities);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error occurred while fetching seller's products");
    }
  };

  useEffect(() => {
    getAllProductsByUser(userId);
  }, []);

  // Function to handle adding to wishlist
  const addToWishlist = (productId) => {
    toast.success("Added to Wishlist!");
  };

  // Function to handle adding to cart
  const addToCart = (productId) => {
    toast.success(`Added ${quantities[productId]} item(s) to Cart!`);
  };

  // Function to update quantity
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Seller's Products</h2>
      {sellersAllProducts && sellersAllProducts.length > 0 ? (
        <ul className="space-y-4">
          {sellersAllProducts.map((product) => (
            <li
              key={product._id}
              className="flex justify-between items-center border p-3 rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600">Price: {product.price} Rs</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Quantity Input */}
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product._id, e.target.value)
                  }
                  className="w-16 p-1 border rounded"
                />
                {/* Add to Wishlist Button */}
                <button
                  onClick={() => addToWishlist(product._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add to Wishlist
                </button>
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AllProductsByUser;
