import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import ProductDescription from "./ProductDescription";

const ProductsDetails = () => {
  const { productId } = useParams(); // Extract product-id from URL
  const { handleApiCall, setCartNumber, cartNumber } =
    useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [user, setUser] = useState("");
  const [quantity, setQuantity] = useState(1);
  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response.data.user);
      } else {
        navigate("/login");
        setIsUserLogin(false);
      }
    } catch (error) {
      toast.error("Error checking login status");
    }
  };

  // Fetch product details by ID
  const fetchProductById = async () => {
    try {
      const response = await handleApiCall(`${url}/products/${productId}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    fetchProductById();
    checkUserLoggedIn();
  }, [productId]); // Add productId as a dependency

  // Handle mouse movement over the image
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  // If product is null, show loading message
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    try {
      const response = await handleApiCall(
        `${url}/carts/${productId}`,
        "post",
        { quantity }
      );
      if (quantity <= 0) {
        toast.error("Quantity can't be 0");
      } else {
        setCartNumber(cartNumber + 1);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("error while add to cart");
    }
  };
  return (
    <main className="px-30 container mx-auto">
      <div className="w-full my-5 min-h-[580px] p-3 border-[1px] rounded-lg border-gray-200">
        <div className="flex gap-6  justify-between">
          {/* Product Image */}
          <div className="flex flex-col gap-5">
            <div
              className="w-[380px] h-[380px] rounded-lg overflow-hidden relative border-[1px] border-gray-200"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[imageIndex]} // Display the selected image
                  alt={product.productName}
                  className={`w-full h-full object-contain transition-transform duration-150 ease-in-out ${
                    isHovering ? "scale-[1.5] cursor-zoom-in" : "scale-[1]"
                  }`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />
              )}
            </div>
            <div className="w-[382px] h-[56px] flex gap-2 items-center justify-between">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div
                    onClick={() => setImageIndex(index)}
                    key={index}
                    className="w-[60px] border-[1px] rounded-lg border-gray-200 cursor-pointer h-[60px] overflow-hidden"
                  >
                    <img
                      className="h-full w-full object-contain"
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* Product Name and Details */}
          <div className="flex flex-col w-full h-[514px]">
            <div>
              <span className="text-green-500 font-bold text-lg">
                {product.stock > 0 && "✔ In stock"}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{product.productName}</h1>
            <div className="flex items-center justify-between">
              <p>Rating</p>
              <p>Reviews</p>
              <p>Sold</p>
            </div>
            <div className="bg-[#FFF0DF] p-2 flex items-center justify-start gap-10">
              <div className="border-gray-200 p-2">
                <h1 className="text-red-600 text-lg font-bold">
                  {product.price} Rs
                </h1>
                <p className="text-gray-500 text-sm">50-90 pcs</p>
              </div>
              <div className="border-l-[1px] border-gray-200 p-2">
                <h1 className="text-lg font-bold">{product.price - 200} Rs</h1>
                <p className="text-gray-500 text-sm">100-700 pcs</p>
              </div>
              <div className="border-l-[1px] border-gray-200 p-2">
                <h1 className="text-lg font-bold">{product.price - 500} Rs</h1>
                <p className="text-gray-500 text-sm">700+ pcs</p>
              </div>
            </div>
            <div className="flex items-center gap-28 border-b-[1px] border-gray-200 py-4">
              <h1 className="w-[60px]">Price:</h1>
              <p className="font-semibold">Negotiable</p>
            </div>
            <div className="flex items-center gap-28 border-b-[1px] border-gray-200 py-4">
              <h1 className="w-[60px]">Type:</h1>
              <p className="font-semibold">
                {product.subCategory.name
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
            <div className="flex items-center gap-28 border-b-[1px] border-gray-200 py-4">
              <h1 className="w-[60px]">Warranty:</h1>
              <p className="font-semibold">2 years full warranty</p>
            </div>
            <div className="flex items-center gap-28 border-b-[1px] border-gray-200 py-4">
              <h1 className="w-[60px]">Protection:</h1>
              <p className="font-semibold">Refund Policy</p>
            </div>
          </div>
          {/* Additional Details (if any) */}
          <div className="">
            <div className="w-[280px] flex flex-col justify-between p-3 h-[325px] border-[1px] rounded-lg border-gray-200">
              <div>
                <h1>Supplier</h1>
              </div>
              <hr />
              <div className="">Address</div>
              <div className="flex flex-col gap-3">
                <button className="w-full cursor-pointer bg-blue-600 text-white rounded-lg py-2">
                  Send Inquiry
                </button>
                <button className="w-full cursor-pointer text-black border-[1px] border-gray-200 rounded-lg py-2">
                  Seller's Profile
                </button>
              </div>
            </div>
            <div className="text-center my-4 font-semibold">
              <div className="flex  text-blue-500 items-center justify-center gap-2">
                <FaRegHeart size={24} />
                <span> Save for later</span>
              </div>
              <div className="flex mt-6 items-center justify-evenly">
                <h1 className="px-2">Quantity:</h1>
                <div className="border-[1px] flex border-gray-300 rounded-lg">
                  <button
                    onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                    className="border-[1px] cursor-pointer px-4 py-2 bg-white text-black "
                  >
                    ➖{" "}
                  </button>
                  <input
                    className="w-[80px] text-lg text-center "
                    value={quantity}
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-[1px] px-4 cursor-pointer py-2 bg-white text-black "
                  >
                    ➕
                  </button>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleAddToCart}
                  className="cursor-pointer border-[1px] px-3 py-2 text-white my-5 rounded-lg bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription currentProduct={product} />
    </main>
  );
};

export default ProductsDetails;
