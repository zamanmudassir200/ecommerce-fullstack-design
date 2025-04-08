import React from "react";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";

const Products = ({
  setIsModalOpen,
  setIsCouponCodeModalOpen,
  products,
  setCategoryId,
  setProductToEdit,
  setProductToDelete,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
}) => {
  const navigate = useNavigate();
  return (
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
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 px-3 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-blue-600 transition-all duration-200"
        >
          Home
        </button>
      </div>

      <ProductList
        products={products}
        setCategoryId={setCategoryId}
        setProductToEdit={setProductToEdit}
        setProductToDelete={setProductToDelete}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default Products;
