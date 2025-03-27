import React from "react";

const SuppliersByRegion = () => {
  const suppliersByRegion = [
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
    { flag: "./icon.png", name: "Arab Emirates", shopName: "shopname.ae" },
  ];

  return (
    <div className="w-full px-4 sm:px-0">
      <h1 className="text-2xl font-semibold text-center sm:text-left">
        Suppliers by region
      </h1>
      <div className="my-10 flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10">
        {suppliersByRegion.map((supplier, index) => (
          <div
            key={index}
            className="w-full sm:w-[221px] flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
          >
            <div className="w-8 h-8">
              <img
                src={supplier.flag}
                alt={`${supplier.name} flag`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{supplier.name}</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {supplier.shopName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersByRegion;
