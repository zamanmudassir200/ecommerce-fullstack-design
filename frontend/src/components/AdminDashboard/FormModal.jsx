import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
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

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleApiCall(
        `${url}/products/edit-category/${productToEdit.category._id}`,
        "patch",
        { name: mainCategory, subCategories, description }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
      toast.error("Error occurred while creating category");
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
      toast.error("Error occurred while creating category");
    }
  };

  useEffect(() => {
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
      setMainCategory(productToEdit.category?.name || "");
      setSubCategory(productToEdit.subCategory?.name);
      setDescription(productToEdit.category?.description || "");
    }
  }, [isEditModalOpen, productToEdit]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);
      setSelectedImages(selectedFiles);
      setData({ ...data, images: selectedFiles });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleMainCategorySubmit();
    const response1 = await handleSubCategorySubmit(response.data.category._id);

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("discount", data.discount);
    formData.append("category", response.data.category._id);
    formData.append("subCategory", response1.data.subCategory._id);

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

      const editCategoryResponse = await handleEditCategorySubmit(e);
      const editSubCategoryResponse = await handleEditSubCategorySubmit(e);

      const response = await handleApiCall(
        `${url}/products/${productToEdit._id}`,
        "patch",
        formData
      );

      const updatedProducts = products.map((prod) =>
        prod._id === productToEdit._id ? response.data.product : prod
      );
      setProducts(updatedProducts);
      setIsEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">
                {isEditModalOpen ? "Edit Product" : "Add Product"}
              </h1>
              <button
                onClick={() => {
                  isModalOpen
                    ? setIsModalOpen(false)
                    : setIsEditModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <form onSubmit={isModalOpen ? handleSubmit : handleEditSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name"
                    value={data.productName}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description"
                    name="description"
                    value={data.description}
                    onChange={handleOnChange}
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brand"
                    name="brand"
                    value={data.brand}
                    onChange={handleOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Stock"
                    name="stock"
                    value={data.stock}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Price"
                    name="price"
                    value={data.price}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Discount"
                    name="discount"
                    value={data.discount}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
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

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images
                  </label>
                  <input
                    type="file"
                    name="images"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    multiple
                    onChange={handleOnChange}
                  />
                </div>

                {selectedImages.length > 0 && (
                  <div className="col-span-2">
                    <h2 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Images:
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {selectedImages.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square border rounded-md overflow-hidden"
                        >
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
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? "bg-blue-300"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  {loading
                    ? isEditModalOpen
                      ? "Updating..."
                      : "Submitting..."
                    : isEditModalOpen
                    ? "Update Product"
                    : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
