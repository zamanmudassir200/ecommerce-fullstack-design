// import React from "react";

// const CategoryForm = ({
//   mainCategory,
//   setMainCategory,
//   subCategories,
//   setSubCategories,
//   description,
//   setDescription,
// }) => {
//   const handleSubCategoryChange = (index, value) => {
//     const updatedSubCategories = [...subCategories];
//     updatedSubCategories[index].name = value;
//     setSubCategories(updatedSubCategories);
//   };

//   const addSubCategory = () => {
//     setSubCategories([...subCategories, { name: "" }]);
//   };

//   const removeSubCategory = (index) => {
//     const updatedSubCategories = subCategories.filter((_, i) => i !== index);
//     setSubCategories(updatedSubCategories);
//   };

//   return (
//     <div className="">
//       <div className=" ">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Main Category (e.g, Men)"
//             value={mainCategory}
//             onChange={(e) => setMainCategory(e.target.value.toLowerCase())}
//             className="p-2 flex-[0.8] w-full border rounded"
//             required
//             name="mainCategory"
//           />

//           {/* Add Subcategory Button */}
//           <button
//             type="button"
//             onClick={addSubCategory}
//             className="p-2 flex-[0.2] cursor-pointer  bg-blue-500 text-white rounded"
//           >
//             Add +
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {subCategories.map((subCategory, index) => (
//             <div key={index} className="flex space-x-2 items-center">
//               <input
//                 type="text"
//                 placeholder={`Subcategory ${index + 1}(e.g,Tshirts)`}
//                 value={subCategory.name}
//                 name="subCategories"
//                 onChange={(e) =>
//                   handleSubCategoryChange(index, e.target.value.toLowerCase())
//                 }
//                 className="p-2 border rounded flex-1"
//                 required
//               />
//               {/* Remove Subcategory Button */}
//               {subCategories.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeSubCategory(index)}
//                   className="p-2 rounded-[45%] cursor-pointer  bg-red-700 text-white font-bold"
//                 >
//                   X
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         {/* Description Input */}
//         <textarea
//           placeholder="Description"
//           value={description}
//           name="description"
//           onChange={(e) => setDescription(e.target.value.toLowerCase())}
//           className="p-2 border rounded"
//         ></textarea>
//       </div>
//     </div>
//   );
// };

// export default CategoryForm;
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
  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].name = value;
    setSubCategories(updatedSubCategories);
  };

  const addSubCategory = () => {
    setSubCategories([...subCategories, { name: "" }]);
  };

  const removeSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  return (
    <div className="">
      <div className=" ">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Main Category (e.g, Electronics)"
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value.toLowerCase())}
            className="p-2 flex-[0.8] w-full border rounded"
            required
            name="mainCategory"
          />
          <textarea
            placeholder="Description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value.toLowerCase())}
            className="p-2 border rounded"
          ></textarea>

          {/* Add Subcategory Button */}
          {/* <button
            type="button"
            onClick={addSubCategory}
            className="p-2 flex-[0.2] cursor-pointer  bg-blue-500 text-white rounded"
          >
            Add +
          </button> */}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Subcategory (e.g, Mobiles)"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value.toLowerCase())}
            className="p-2 flex-[0.8] w-full border rounded"
            required
            name="mainCategory"
          />
          {/* {subCategories.map((subCategory, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder={`Subcategory ${index + 1}(e.g,Tshirts)`}
                value={subCategory.name}
                name="subCategories"
                onChange={(e) =>
                  handleSubCategoryChange(index, e.target.value.toLowerCase())
                }
                className="p-2 border rounded flex-1"
                required
              />
              {/* Remove Subcategory Button */}
          {/* {subCategories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSubCategory(index)}
                  className="p-2 rounded-[45%] cursor-pointer  bg-red-700 text-white font-bold"
                >
                  X
                </button>
              )}
            </div>
          ))} */}
        </div>
        {/* Description Input */}
        {/* <textarea
          placeholder="Description"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value.toLowerCase())}
          className="p-2 border rounded"
        ></textarea> */}
      </div>
    </div>
  );
};

export default CategoryForm;
