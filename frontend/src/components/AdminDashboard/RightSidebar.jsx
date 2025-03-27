// import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
// import url from "../../utils/url";
// import FormModal from "./FormModal";
// import { toast } from "react-toastify";
// import CategoryForm from "./CategoryForm";
// const RightSidebar = () => {
//   const { showTabsData, handleApiCall, products, setProducts } =
//     useContext(GlobalContext);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [productToDelete, setProductToDelete] = useState(null); // Track the product to delete
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [productToEdit, setProductToEdit] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [categoryId, setCategoryId] = useState(null);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await handleApiCall(`${url}/products/`, "get");
//         const { products } = response.data;
//         console.log("Category", products);
//         setCategoryId(products);
//         setProducts(response.data.products);
//       } catch (error) {
//         toast.error("Error occured while fetching products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Disable background scrolling when the modal is open
//   useEffect(() => {
//     if (isDeleteModalOpen || isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Clean up when the component is unmounted or the modal is closed
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isDeleteModalOpen, isModalOpen]);

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       const response = await handleApiCall(
//         `${url}/products/${productToDelete}`,
//         "delete"
//       );

//       setProducts(
//         products.filter((product) => product._id !== productToDelete)
//       );
//       toast.success("Product Deleted Successfully");
//       setLoading(false);
//       setIsDeleteModalOpen(false); // Close the modal after deletion
//     } catch (error) {
//       setLoading(false);
//       toast.error("Error occured during delete product");
//     }
//   };

//   return (
//     <div className="relative">
//       {showTabsData === "products" && (
//         <>
//           <main className="p-3 w-full">
//             <div className="">
//               <div className="flex gap-2">
//                 <button
//                   className="bg-green-500 px-3 my-7 sm:my-4 text-white font-bold cursor-pointer py-2 rounded-2xl"
//                   onClick={() => setIsModalOpen(true)} // Open modal on button click
//                 >
//                   Add products
//                 </button>
//               </div>

//               <div className="">
//                 <h1 className="font-semibold underline my-2">Product List</h1>
//                 <div className="flex flex-wrap sm:justify-start justify-center gap-4">
//                   {products && products.length > 0 ? (
//                     products.reverse().map((product, index) => {
//                       return (
//                         <div
//                           className="border-2 p-2 rounded-lg w-full md:w-1/1.4 lg:w-1/3 xl:w-1/4 flex-shrink-0"
//                           key={product._id}
//                         >
//                           <div className="w-full h-52 overflow-hidden ">
//                             <img
//                               className="h-full w-full object-contain"
//                               key={index}
//                               src={product.images[0]}
//                             />
//                           </div>
//                           <h1 className="font-bold mt-4 text-2xl break-words ">
//                             {product.productName}
//                           </h1>
//                           <p className="break-words">
//                             <b>Description:</b> {product.description}
//                           </p>
//                           <p>
//                             <b>Brand:</b> {product.brand}
//                           </p>
//                           <p>
//                             <b>Stock Available:</b> {product.stock}
//                           </p>
//                           <div className="flex gap-3 my-2">
//                             <button
//                               onClick={() => {
//                                 setProductToEdit(product);
//                                 setCategoryId(product.category._id);
//                                 console.log(
//                                   "product category._id",
//                                   product.category._id,
//                                   "product",
//                                   product
//                                 );
//                                 setIsEditModalOpen(true);
//                               }}
//                               className="bg-yellow-500 px-2 py-1 rounded-lg cursor-pointer  text-white"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setProductToDelete(product._id);
//                                 setIsDeleteModalOpen(true);
//                               }}
//                               className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <h1 className="text-red-500">No products found</h1>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {isDeleteModalOpen && (
//               <div className="fixed inset-0 px-3 backdrop-brightness-50 bg-opacity-50 z-50 flex items-center justify-center">
//                 <div className="bg-white p-5 rounded-2xl shadow-xl">
//                   <h1 className="font-bold text-center text-xl py-4">
//                     Delete Product Alert
//                   </h1>
//                   <p className="text-lg">
//                     Are you sure you want to delete this product?
//                   </p>
//                   <div className="flex justify-center gap-2 my-2">
//                     <button
//                       onClick={() => setIsDeleteModalOpen(false)}
//                       className="bg-gray-300 px-4 py-2 cursor-pointer rounded-lg"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleDelete}
//                       className="bg-red-600 cursor-pointer px-4 py-2 text-white rounded-lg"
//                     >
//                       {loading ? "Deleting..." : "Yes, Delete"}{" "}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </main>
//         </>
//       )}
//       {showTabsData === "order history" && (
//         <h1 className="mt-10">Order History</h1>
//       )}
//       {/* Form Modal */}
//       {isEditModalOpen && (
//         <FormModal
//           setIsModalOpen={setIsModalOpen}
//           setIsEditModalOpen={setIsEditModalOpen}
//           isEditModalOpen={isEditModalOpen}
//           productToEdit={productToEdit}
//           categoryId={categoryId}
//         />
//       )}
//       {/* Render FormModal when the state is true */}
//       {isModalOpen && (
//         <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//       )}

//       {isCategoryModalOpen && (
//         <CategoryForm setIsCategoryModalOpen={setIsCategoryModalOpen} />
//       )}
//     </div>
//   );
// };

// export default RightSidebar;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await handleApiCall(`${url}/products/`, "get");
        setCategoryId(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        toast.error("Error occurred while fetching products");
      }
    };
    fetchProducts();
  }, []);

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
          <div className="mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Add Product
            </button>
          </div>

          <div>
            <h1 className="text-lg font-semibold mb-4">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products && products.length > 0 ? (
                [...products].reverse().map((product) => (
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
                      {product.productName}
                    </h2>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Description:</span>{" "}
                      {product.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Brand:</span>{" "}
                      {product.brand}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Stock:</span>{" "}
                      {product.stock}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setProductToEdit(product);
                          setCategoryId(product.category._id);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product._id);
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
    </div>
  );
};

export default RightSidebar;
