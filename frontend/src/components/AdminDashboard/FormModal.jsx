// import React, { useContext, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai"; // Import close icon
// import { GlobalContext } from "../../context/GlobalContext";
// import url from "../../utils/url";
// import { useNavigate } from "react-router-dom";
// const FormModal = ({
//   setIsModalOpen,
//   setIsEditModalOpen,
//   isEditModalOpen,
//   productToEdit,
// }) => {
//   const navigate = useNavigate();
//   const { handleApiCall, products, setProducts } = useContext(GlobalContext);
//   const [selectedImages, setSelectedImages] = useState([]); // State to store selected
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     productName: "",
//     description: "",
//     stock: 0,
//     price: 0,
//     category: "",
//     images: null,
//     brand: "",
//   });
//   const handleOnChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "images") {
//       // Handle file input for images
//       const selectedFiles = Array.from(files); // Convert file list to an array
//       setSelectedImages(selectedFiles); // Update selectedImages state
//       setData({ ...data, images: selectedFiles }); // Update data state with images
//     } else {
//       setData({ ...data, [name]: value }); // Update other fields
//     }
//   };

//   // Handle file input change

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("data", data);
//     const formData = new FormData();

//     // Append all form data to FormData object
//     formData.append("productName", data.productName);
//     formData.append("description", data.description);
//     formData.append("stock", data.stock);
//     formData.append("price", data.price);
//     formData.append("category", data.category);
//     formData.append("brand", data.brand);

//     // Append selected images to FormData
//     selectedImages.forEach((image) => {
//       formData.append("images", image);
//     });
//     setLoading(true);
//     try {
//       const response = await handleApiCall(
//         `${url}/products/`,
//         "post",
//         formData
//       );

//       console.log(response.data.product, "product response");
//       setLoading(false);
//       setProducts(response.data.product);
//       setIsModalOpen(false);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   return (
//     <main className="fixed top-0 left-0 px-3 right-0 bottom-0 bg-blue-900  h-screen w-full flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] relative">
//         {/* Close button */}
//         <AiOutlineClose
//           className="absolute top-3 right-3 cursor-pointer text-red-600"
//           size={24}
//           onClick={() => {
//             setIsEditModalOpen(false);
//             // setIsModalOpen(false);
//           }} // Close modal on click
//         />

//         <h1 className="text-xl font-bold mb-4">
//           {setIsEditModalOpen ? "Edit Product" : "Add Product"}
//         </h1>
//         {/* Form Content */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Product Name</label>
//             <input
//               type="text"
//               name="productName"
//               className="w-full border p-2 rounded-md"
//               placeholder="Name"
//               onChange={handleOnChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Description</label>
//             <textarea
//               className="w-full border p-2 rounded-md"
//               placeholder="Description"
//               name="description"
//               onChange={handleOnChange}
//             />
//           </div>
//           <div className="mb-4 flex gap-2">
//             <div className="">
//               <label className="block mb-2 text-sm font-bold">Brand</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded-md"
//                 placeholder="Brand"
//                 name="brand"
//                 onChange={handleOnChange}
//               />
//             </div>
//             <div className="">
//               <label className="block mb-2 text-sm font-bold">Stock</label>
//               <input
//                 type="number"
//                 className="w-full border p-2 rounded-md"
//                 placeholder="Available stock"
//                 name="stock"
//                 onChange={handleOnChange}
//               />
//             </div>
//             <div className="">
//               <label className="block mb-2 text-sm font-bold">Price</label>
//               <input
//                 type="number"
//                 className="w-full border p-2 rounded-md"
//                 placeholder="Price"
//                 name="price"
//                 onChange={handleOnChange}
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Images</label>
//             <input
//               type="file"
//               name="images"
//               className="w-full border p-2 rounded-md"
//               multiple // Enable multiple file selection
//               onChange={handleOnChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Category</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded-md"
//               placeholder="e.g, Men, Women, kids, etc."
//               name="category"
//               onChange={handleOnChange}
//             />
//           </div>

//           {/* Preview Selected Images */}
//           {selectedImages.length > 0 && (
//             <div className="mb-4">
//               <h2 className="text-lg font-semibold mb-2">Selected Images:</h2>
//               <div className="flex gap-2 flex-wrap">
//                 {selectedImages.map((image, index) => (
//                   <div key={index} className="w-24 h-24 border rounded-md">
//                     <img
//                       src={URL.createObjectURL(image)} // Create a temporary URL for preview
//                       alt="Selected"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`${
//               loading ? "bg-blue-300" : "bg-blue-500"
//             }  text-white px-4 py-2 rounded-md`}
//           >
//             {loading ? "Submitting..." : "Submit"}
//             {/* {isEditModalOpen && loading ? "Updating" : "Update"} */}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default FormModal;

import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { GlobalContext } from "../../context/GlobalContext";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";

const FormModal = ({
  setIsModalOpen,
  setIsEditModalOpen,
  isEditModalOpen,
  productToEdit,
}) => {
  const navigate = useNavigate();
  const { handleApiCall, products, setProducts } = useContext(GlobalContext);
  const [selectedImages, setSelectedImages] = useState([]); // State to store selected images
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    productName: "",
    description: "",
    stock: 0,
    price: 0,
    category: "",
    images: null,
    brand: "",
  });

  useEffect(() => {
    // Pre-fill the form with productToEdit data when editing
    if (isEditModalOpen && productToEdit) {
      setData({
        productName: productToEdit.productName,
        description: productToEdit.description,
        stock: productToEdit.stock,
        price: productToEdit.price,
        category: productToEdit.category,
        brand: productToEdit.brand,
        images: productToEdit.images || [],
      });
      setSelectedImages(productToEdit.images || []);
    }
  }, [isEditModalOpen, productToEdit]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files); // Convert file list to an array
      setSelectedImages(selectedFiles); // Update selectedImages state
      setData({ ...data, images: selectedFiles }); // Update data state with images
    } else {
      setData({ ...data, [name]: value }); // Update other fields
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all form data to FormData object
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("brand", data.brand);

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    setLoading(true);
    try {
      let response;
      if (isEditModalOpen) {
        // Edit product (PUT request)
        const response = await handleApiCall(
          `${url}/products/${productToEdit._id}`,
          "patch",
          formData
        );
        console.log("updated product", response);
        const updatedProducts = products.map((prod) =>
          prod._id === productToEdit._id ? response.data.product : prod
        );
        setProducts(updatedProducts); // Update the product list with the edited product
      } else {
        // Add product (POST request)
        response = await handleApiCall(`${url}/products/`, "post", formData);
        setProducts([...products, response.data.product]); // Add the new product to the list
      }
      setLoading(false);
      setIsModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="fixed top-0 left-0 px-3 right-0 bottom-0 bg-slate-700 h-screen w-full flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[600px] relative">
        <AiOutlineClose
          className="absolute bg-red-500 hover:bg-red-400 transition-all duration-300 rounded-2xl text-white top-3 right-3 cursor-pointer p-1"
          size={24}
          onClick={() => {
            if (isEditModalOpen) {
              setIsEditModalOpen(false);
            }
            setIsModalOpen(false);
          }}
        />

        <h1 className="text-xl font-bold mb-4">
          {isEditModalOpen ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full border p-2 rounded-md"
              placeholder="Name"
              value={data.productName}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Description</label>
            <textarea
              className="w-full border p-2 rounded-md"
              placeholder="Description"
              name="description"
              value={data.description}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4 flex gap-2">
            <div className="">
              <label className="block mb-2 text-sm font-bold">Brand</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                placeholder="Brand"
                name="brand"
                value={data.brand}
                onChange={handleOnChange}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-bold">Stock</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Available stock"
                name="stock"
                value={data.stock}
                onChange={handleOnChange}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-bold">Price</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Price"
                name="price"
                value={data.price}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Images</label>
            <input
              type="file"
              name="images"
              className="w-full border p-2 rounded-md"
              multiple
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Category</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder="e.g., Men, Women, kids, etc."
              name="category"
              value={data.category}
              onChange={handleOnChange}
            />
          </div>

          {/* Preview Selected Images */}
          {selectedImages.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Selected Images:</h2>
              <div className="flex gap-2 flex-wrap">
                {selectedImages.map((image, index) => (
                  <div key={index} className="w-24 h-24 border rounded-md">
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`${
              loading ? "bg-blue-300" : "bg-blue-500"
            } text-white px-4 py-2 rounded-md`}
          >
            {loading
              ? isEditModalOpen
                ? "Updating..."
                : "Submitting..."
              : isEditModalOpen
              ? "Update Product"
              : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default FormModal;
