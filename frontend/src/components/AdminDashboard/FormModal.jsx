// import React, { useContext, useEffect, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai"; // Import close icon
// import { GlobalContext } from "../../context/GlobalContext";
// import url from "../../utils/url";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import CategoryForm from "./CategoryForm";
// const FormModal = ({
//   setIsModalOpen,
//   setIsEditModalOpen,
//   isEditModalOpen,
//   productToEdit,
// }) => {
//   const navigate = useNavigate();
//   const { handleApiCall, products, setProducts } = useContext(GlobalContext);
//   const [selectedImages, setSelectedImages] = useState([]); // State to store selected images
//   const [loading, setLoading] = useState(false);

//   const [data, setData] = useState({
//     productName: "",
//     description: "",
//     stock: 0,
//     price: 0,
//     images: null,
//     category: null,
//     brand: "",
//   });

//   useEffect(() => {
//     // Pre-fill the form with productToEdit data when editing
//     if (isEditModalOpen && productToEdit) {
//       setData({
//         productName: productToEdit.productName,
//         description: productToEdit.description,
//         stock: productToEdit.stock,
//         price: productToEdit.price,
//         brand: productToEdit.brand,
//         images: productToEdit.images || [],
//       });
//       setSelectedImages(productToEdit.images || []);
//     }
//   }, [isEditModalOpen, productToEdit]);

//   const handleOnChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "images") {
//       const selectedFiles = Array.from(files); // Convert file list to an array
//       setSelectedImages(selectedFiles); // Update selectedImages state
//       setData({ ...data, images: selectedFiles }); // Update data state with images
//     } else {
//       setData({ ...data, [name]: value }); // Update other fields
//     }
//   };
//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
//     // handleAddCategory({ name: mainCategory, subCategories, description });
//     try {
//       const response = await handleApiCall(
//         `${url}/products/add-category`,
//         "post",
//         { name: mainCategory, subCategories, description }
//       );
//       console.log("Response from category", response);
//     } catch (error) {
//       console.log(error.response.data);
//       toast.error("Error occured while creating category");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleCategorySubmit();
//     const formData = new FormData();

//     // Append all form data to FormData object
//     formData.append("productName", data.productName);
//     formData.append("description", data.description);
//     formData.append("stock", data.stock);
//     formData.append("price", data.price);
//     formData.append("brand", data.brand);

//     selectedImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     setLoading(true);
//     try {
//       let response;
//       if (isEditModalOpen) {
//         // Edit product (PUT request)
//         const response = await handleApiCall(
//           `${url}/products/${productToEdit._id}`,
//           "patch",
//           formData
//         );
//         const updatedProducts = products.map((prod) =>
//           prod._id === productToEdit._id ? response.data.product : prod
//         );

//         setProducts(updatedProducts); // Update the product list with the edited product
//       } else {
//         // Add product (POST request)
//         response = await handleApiCall(`${url}/products/`, "post", formData);
//         setProducts([...products, response.data.product]); // Add the new product to the list
//         console.log("response product", response);
//         toast.success(response.data.message);
//       }
//       setLoading(false);
//       setIsModalOpen(false);
//       setIsEditModalOpen(false);
//       //   toast.success(response.data.message);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   return (
//     <main className="fixed top-0  left-0 px-3 overflow-y-scroll right-0 backdrop-brightness-50 bottom-0 border-2 h-screen w-full flex items-center justify-center z-50">
//       <div className="bg-white p-5  rounded-lg shadow-lg w-[800px] relative">
//         <AiOutlineClose
//           className="absolute bg-red-500 hover:bg-red-400 transition-all duration-300 rounded-2xl text-white top-3 right-3 cursor-pointer p-1"
//           size={24}
//           onClick={() => {
//             if (isEditModalOpen) {
//               setIsEditModalOpen(false);
//             }
//             setIsModalOpen(false);
//           }}
//         />

//         <h1 className="text-xl font-bold mb-4">
//           {isEditModalOpen ? "Edit Product" : "Add Product"}
//         </h1>

//         <form onSubmit={handleSubmit}>
//           {/* Form Fields */}
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Product Name</label>
//             <input
//               type="text"
//               name="productName"
//               className="w-full border p-2 rounded-md"
//               placeholder="Name"
//               value={data.productName}
//               onChange={handleOnChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Description</label>
//             <textarea
//               className="w-full border p-2 rounded-md"
//               placeholder="Description"
//               name="description"
//               value={data.description}
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
//                 value={data.brand}
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
//                 value={data.stock}
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
//                 value={data.price}
//                 onChange={handleOnChange}
//               />
//             </div>
//           </div>
//           <div className="">
//             <label className="block mb-2 text-sm font-bold">Category</label>

//             <CategoryForm />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-bold">Images</label>
//             <input
//               type="file"
//               name="images"
//               className="w-full border p-2 rounded-md"
//               multiple
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
//                       src={
//                         typeof image === "string"
//                           ? image
//                           : URL.createObjectURL(image)
//                       }
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
//             } text-white px-4 py-2 rounded-md`}
//           >
//             {loading
//               ? isEditModalOpen
//                 ? "Updating..."
//                 : "Submitting..."
//               : isEditModalOpen
//               ? "Update Product"
//               : "Submit"}
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
import { toast } from "react-toastify";
import CategoryForm from "./CategoryForm";

const FormModal = ({
  setIsModalOpen,
  setIsEditModalOpen,
  isEditModalOpen,
  productToEdit,
  isModalOpen,
  categoryId,
}) => {
  const { handleApiCall, products, setProducts } = useContext(GlobalContext);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([{ name: "" }]);
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [data, setData] = useState({
    productName: "",
    description: "",
    stock: 0,
    price: 0,
    discount: 0,
    images: null,
    category: null,
    brand: "",
  });

  const handleMainCategorySubmit = async () => {
    try {
      const response = await handleApiCall(
        `${url}/products/create-category`,
        "post",
        { name: mainCategory, description }
      );
      return response;
      // console.log("response from main category", response);
    } catch (error) {
      console.log(`Error from main category ${error}`);
    }
  };
  const handleSubCategorySubmit = async (categoryId) => {
    try {
      const response = await handleApiCall(
        `${url}/products/create-subcategory`,
        "post",
        { name: subCategory, categoryId, description }
      );
      return response;
    } catch (error) {
      console.log(`Error from subcategory ${error}`);
    }
  };
  // const handleCategorySubmit = async (e) => {
  //   e.preventDefault();
  //   // handleAddCategory({ name: mainCategory, subCategories, description });
  //   try {
  //     const response = await handleApiCall(
  //       `${url}/products/create-category`,
  //       "post",
  //       { name: mainCategory, subCategories, description }
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error.response.data);
  //     toast.error("Error occured while creating category");
  //   }
  // };
  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    // handleAddCategory({ name: mainCategory, subCategories, description });
    try {
      const response = await handleApiCall(
        `${url}/products/edit-category/${productToEdit.category._id}`,
        "patch",
        { name: mainCategory, subCategories, description }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
      toast.error("Error occured while creating category");
    }
  };
  const handleEditSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleApiCall(
        `${url}/products/edit-subcategory/${productToEdit.subCategory._id}`,
        "patch",
        { name: subCategory, description }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
      toast.error("Error occured while creating category");
    }
  };
  useEffect(() => {
    // Pre-fill form with productToEdit data
    if (isEditModalOpen && productToEdit) {
      setData({
        productName: productToEdit.productName,
        description: productToEdit.description,
        stock: productToEdit.stock,
        price: productToEdit.price,
        discount: productToEdit.discount,
        brand: productToEdit.brand,
        images: productToEdit.images || [],
      });
      setSelectedImages(productToEdit.images || []);
      setMainCategory(productToEdit.category?.name || ""); // Assuming productToEdit.category has mainCategory
      setSubCategory(productToEdit.subCategory?.name); // Assuming category has subCategories
      setDescription(productToEdit.category?.description || ""); // Assuming category has description
    }
  }, [isEditModalOpen, productToEdit]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files); // Convert file list to array
      setSelectedImages(selectedFiles);
      setData({ ...data, images: selectedFiles });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  console.log("isModal open", isModalOpen, "isEditModalOpen", isEditModalOpen);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await handleCategorySubmit(e);
    const response = await handleMainCategorySubmit();
    console.log("Response from main category", response);

    const response1 = await handleSubCategorySubmit(response.data.category._id);
    console.log("Response from subcategory", response1);

    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("discount", data.discount);
    formData.append("category", response.data.category._id);
    formData.append("subCategory", response1.data.subCategory._id);
    // formData.append("category", productToEdit.category._id);
    // formData.append("mainCategory", mainCategory);
    // formData.append("subCatergories", subCategories.name);
    // formData.append("description", description);

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    setLoading(true);

    try {
      const response = await handleApiCall(
        `${url}/products/`,
        "post",
        formData
      );
      setProducts([...products, response.data.product]);
      toast.success(response.data.message);
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("productName", data.productName);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("price", data.price);
      formData.append("brand", data.brand);
      formData.append("discount", data.discount);
      formData.append("category", productToEdit.category._id);
      formData.append("subCategory", productToEdit.subCategory._id);
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
      const editCatergoryResponse = await handleEditCategorySubmit(e);
      const editSubCategoryResponse = await handleEditSubCategorySubmit(e);
      console.log(
        "editCatergoryResponse",
        editCatergoryResponse,
        "editSubCategoryResponse",
        editSubCategoryResponse
      );
      const response = await handleApiCall(
        `${url}/products/${productToEdit._id}`,
        "patch",
        formData
      );

      const updatedProducts = products.map((prod) =>
        prod._id === productToEdit._id ? response.data.product : prod
      );
      console.log("first", response);
      setProducts(updatedProducts); // Update the product list

      setIsEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="fixed inset-0 top-0 left-0 px-3 right-0 backdrop-brightness-50 bottom-0 min-h-screen w-full flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-5 h-[720px] rounded-lg shadow-lg max-w-xl relative">
        <AiOutlineClose
          className="absolute bg-red-500 hover:bg-red-400 rounded-2xl text-white top-3 right-3 cursor-pointer p-1"
          size={24}
          onClick={() => {
            isModalOpen ? setIsModalOpen(false) : setIsEditModalOpen(false);
          }}
        />
        <h1 className="text-xl font-bold mb-4">
          {isEditModalOpen ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={isModalOpen ? handleSubmit : handleEditSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full border p-2 rounded-md"
              placeholder="Name"
              value={data.productName}
              onChange={handleOnChange}
              required
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
              required
            />
          </div>

          <div className="mb-4 flex gap-2">
            <div>
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

            <div>
              <label className="block mb-2 text-sm font-bold">Stock</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Stock"
                name="stock"
                value={data.stock}
                onChange={handleOnChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-bold">Price</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Price"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold">
                Discount (%)
              </label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                placeholder="Discount"
                name="discount"
                value={data.discount}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold">Category</label>

            <CategoryForm
              subCategory={subCategory}
              setSubCategory={setSubCategory}
              mainCategory={mainCategory}
              subCategories={subCategories}
              description={description}
              setMainCategory={setMainCategory}
              setSubCategories={setSubCategories}
              setDescription={setDescription}
            />
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
