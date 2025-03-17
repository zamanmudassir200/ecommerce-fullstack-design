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
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Suppliers by region</h1>
      <div className="my-10 flex flex-wrap gap-10">
        {suppliersByRegion.map((supplier, index) => {
          return (
            <div
              key={index}
              className="w-[221px] h-[36px] flex items-center gap-4"
            >
              <div className="">
                <img src={supplier.flag} alt="" />
              </div>
              <div className="">
                <h1 className="text-lg font-semibold">{supplier.name}</h1>
                <p className="text-gray-400">{supplier.shopName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuppliersByRegion;
