import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import FormModal from "./FormModal";
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";
const RightSidebar = () => {
  const { showTabsData, handleApiCall, products, setProducts } =
    useContext(GlobalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Track the product to delete
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await handleApiCall(`${url}/products/`, "get");
        const { products } = response.data;
        console.log("Category", products);
        setCategoryId(products);
        setProducts(response.data.products);
      } catch (error) {
        toast.error("Error occured while fetching products");
      }
    };
    fetchProducts();
  }, []);

  // Disable background scrolling when the modal is open
  useEffect(() => {
    if (isDeleteModalOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component is unmounted or the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDeleteModalOpen, isModalOpen]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(
        `${url}/products/${productToDelete}`,
        "delete"
      );

      setProducts(
        products.filter((product) => product._id !== productToDelete)
      );
      toast.success("Product Deleted Successfully");
      setLoading(false);
      setIsDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      setLoading(false);
      toast.error("Error occured during delete product");
    }
  };

  return (
    <div className="relative">
      {showTabsData === "products" && (
        <>
          <main className="p-3 w-full">
            <div className="">
              <div className="flex gap-2">
                <button
                  className="bg-green-500 px-3 my-7 sm:my-4 text-white font-bold cursor-pointer py-2 rounded-2xl"
                  onClick={() => setIsModalOpen(true)} // Open modal on button click
                >
                  Add products
                </button>
              </div>

              <div className="">
                <h1 className="font-semibold underline my-2">Product List</h1>
                <div className="flex flex-wrap sm:justify-start justify-center gap-4">
                  {products && products.length > 0 ? (
                    products.reverse().map((product, index) => {
                      return (
                        <div
                          className="border-2 p-2 rounded-lg w-full md:w-1/1.4 lg:w-1/3 xl:w-1/4 flex-shrink-0"
                          key={product._id}
                        >
                          <div className="w-full h-52 overflow-hidden ">
                            <img
                              className="h-full w-full object-contain"
                              key={index}
                              src={product.images[0]}
                            />
                          </div>
                          <h1 className="font-bold mt-4 text-2xl break-words ">
                            {product.productName}
                          </h1>
                          <p className="break-words">
                            <b>Description:</b> {product.description}
                          </p>
                          <p>
                            <b>Brand:</b> {product.brand}
                          </p>
                          <p>
                            <b>Stock Available:</b> {product.stock}
                          </p>
                          <div className="flex gap-3 my-2">
                            <button
                              onClick={() => {
                                setProductToEdit(product);
                                setCategoryId(product.category._id);
                                console.log(
                                  "product category._id",
                                  product.category._id,
                                  "product",
                                  product
                                );
                                setIsEditModalOpen(true);
                              }}
                              className="bg-yellow-500 px-2 py-1 rounded-lg cursor-pointer  text-white"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setProductToDelete(product._id);
                                setIsDeleteModalOpen(true);
                              }}
                              className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h1 className="text-red-500">No products found</h1>
                  )}
                </div>
              </div>
            </div>
            {isDeleteModalOpen && (
              <div className="fixed inset-0 px-3 backdrop-brightness-50 bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-white p-5 rounded-2xl shadow-xl">
                  <h1 className="font-bold text-center text-xl py-4">
                    Delete Product Alert
                  </h1>
                  <p className="text-lg">
                    Are you sure you want to delete this product?
                  </p>
                  <div className="flex justify-center gap-2 my-2">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 cursor-pointer rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 cursor-pointer px-4 py-2 text-white rounded-lg"
                    >
                      {loading ? "Deleting..." : "Yes, Delete"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
      {showTabsData === "order history" && (
        <h1 className="mt-10">Order History</h1>
      )}
      {/* Form Modal */}
      {isEditModalOpen && (
        <FormModal
          setIsModalOpen={setIsModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          productToEdit={productToEdit}
          categoryId={categoryId}
        />
      )}
      {/* Render FormModal when the state is true */}
      {isModalOpen && (
        <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      {isCategoryModalOpen && (
        <CategoryForm setIsCategoryModalOpen={setIsCategoryModalOpen} />
      )}
    </div>
  );
};

export default RightSidebar;
