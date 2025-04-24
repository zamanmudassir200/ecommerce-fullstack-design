import React from "react";

const CategoryForm = ({
  mainCategory,
  setMainCategory,
  subCategories,
  setSubCategories,
  description,
  setSubCategory,
  setDescription,
  subCategory,
}) => {
  return (
    <div className="space-y-4">
      {/* Main Category and Description - stacked on mobile, side by side on larger screens */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Category
          </label>
          <input
            type="text"
            placeholder="e.g., Electronics"
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value.toLowerCase())}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            name="mainCategory"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Category description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value.toLowerCase())}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[38px]"
            rows={2}
          />
        </div>
      </div>

      {/* Subcategory - full width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subcategory
        </label>
        <input
          type="text"
          placeholder="e.g., Mobiles"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value.toLowerCase())}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
          name="subCategory"
        />
      </div>

      {/* Display existing subcategories if needed */}
      {subCategories?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-1">
            {/* Subcategories: */}
          </p>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((cat, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {cat?.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
