import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import FormModal from "./FormModal";
import { toast } from "react-toastify";
import CouponCode from "./CouponCode";
import { useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const { showTabsData, handleApiCall, products, setProducts } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isCouponCodeModalOpen, setIsCouponCodeModalOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);

  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response.data.user);

        setUserId(response.data.user._id);
      } else {
        navigate("/login");
        setIsUserLogin(false);
      }
    } catch (error) {}
  };
  const { _id } = user;
  const fetchProductsByUser = async (_id) => {
    try {
      const response = await handleApiCall(
        `${url}/products/getAllProductsByUser/${_id}`,
        "get"
      );
      setProducts(response.data.allProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
    if (_id) {
      fetchProductsByUser(_id);
    }
  }, [_id]);
  useEffect(() => {
    if (isDeleteModalOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDeleteModalOpen, isModalOpen]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await handleApiCall(`${url}/products/${productToDelete}`, "delete");
      setProducts(
        products.filter((product) => product._id !== productToDelete)
      );
      toast.success("Product Deleted Successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Error occurred during delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {showTabsData === "products" && (
        <>
          <div className="mb-6 flex gap-4 ">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer px-4 py-2 rounded-lg transition-colors"
            >
              Add Product
            </button>
            <button
              onClick={() => setIsCouponCodeModalOpen(true)}
              className="bg-blue-500 px-3 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-blue-600 transition-all duration-200"
            >
              Add Coupon Code
            </button>
          </div>

          <div>
            <h1 className="text-lg font-semibold mb-4">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products && products.length > 0 ? (
                [...products]?.reverse().map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-full h-48 overflow-hidden mb-3">
                      <img
                        className="h-full w-full object-contain"
                        src={product.images[0]}
                        alt={product.productName}
                      />
                    </div>
                    <h2 className="font-bold text-lg mb-1">
                      {product?.productName}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Description:</span>{" "}
                      {product?.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Brand:</span>{" "}
                      {product?.brand}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Stock:</span>{" "}
                      {product?.stock}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setProductToEdit(product);
                          setCategoryId(product?.category?._id);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product?._id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500">No products found</p>
              )}
            </div>
          </div>
        </>
      )}

      {showTabsData === "order history" && (
        <div className="mt-6">
          <h1 className="text-xl font-bold">Order History</h1>
          {/* Order history content here */}
        </div>
      )}

      {/* Modals */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p className="mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <FormModal
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          productToEdit={productToEdit}
          categoryId={categoryId}
        />
      )}

      {isModalOpen && (
        <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
      {isCouponCodeModalOpen && (
        <CouponCode setIsCouponCodeModalOpen={setIsCouponCodeModalOpen} />
      )}
    </div>
  );
};

export default RightSidebar;
