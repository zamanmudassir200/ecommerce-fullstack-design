import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
const FormModal = lazy(() => import("./FormModal"));
import { toast } from "react-toastify";
const CouponCode = lazy(() => import("./CouponCode"));
import { useNavigate } from "react-router-dom";
const OrderHistory = lazy(() => import("./OrderHistory"));
const Products = lazy(() => import("./Products"));

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
        <Suspense
          fallback={
            <div className={`text-center flex items-center h-screen `}>
              Loading...
            </div>
          }
        >
          <Products
            setIsModalOpen={setIsModalOpen}
            setIsCouponCodeModalOpen={setIsCouponCodeModalOpen}
            products={products}
            setCategoryId={setCategoryId}
            setProductToEdit={setProductToEdit}
            setProductToDelete={setProductToDelete}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </Suspense>
      )}

      {showTabsData === "order history" && (
        <Suspense
          fallback={
            <div className={`text-center flex items-center h-screen `}>
              Loading...
            </div>
          }
        >
          {" "}
          <OrderHistory />
        </Suspense>
      )}
      {/* Modals */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
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
        <Suspense fallback={<div className="text-center p-2">Loading...</div>}>
          <FormModal
            setIsEditModalOpen={setIsEditModalOpen}
            isEditModalOpen={isEditModalOpen}
            productToEdit={productToEdit}
            categoryId={categoryId}
          />
        </Suspense>
      )}

      {isModalOpen && (
        <Suspense fallback={<div className="text-center p-2">Loading...</div>}>
          <FormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Suspense>
      )}
      {isCouponCodeModalOpen && (
        <Suspense fallback={<div className="text-center p-2">Loading...</div>}>
          {" "}
          <CouponCode setIsCouponCodeModalOpen={setIsCouponCodeModalOpen} />
        </Suspense>
      )}
    </div>
  );
};

export default RightSidebar;
