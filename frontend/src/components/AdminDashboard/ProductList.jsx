import React from "react";

const ProductList = ({ products, setProductToDelete, setProductToEdit }) => {
  return (
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
              <h2 className="font-bold text-lg mb-1">{product?.productName}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Description:</span>{" "}
                {product?.description}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Brand:</span> {product?.brand}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Stock:</span> {product?.stock}
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
  );
};

export default ProductList;
