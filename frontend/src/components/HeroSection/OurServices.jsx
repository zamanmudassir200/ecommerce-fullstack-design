import React, { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { GlobalContext } from "../../context/GlobalContext";

const OurServices = () => {
  const { themeMode } = useContext(GlobalContext);

  const services = [
    {
      image: "./Mask group.png",
      icon: <IoSearch className="text-blue-600" />,
      name: "Source from Industry Hubs",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch className="text-blue-600" />,
      name: "Customize your product",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch className="text-blue-600" />,
      name: "Fast, reliable shipping by ocean or air",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch className="text-blue-600" />,
      name: "Product monitoring and inspection",
    },
  ];

  return (
    <section
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10 ${
        themeMode === "dark" ? "" : ""
      }`}
    >
      <h1
        className={`text-xl md:text-2xl font-bold mb-6 ${
          themeMode === "dark" ? "text-white" : ""
        }`}
      >
        Our extra services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="h-40 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={service.image}
                alt={service.name}
              />
            </div>

            <div className="absolute -top-6 right-4 bg-[#D1E7FF] p-3 rounded-full border-4 border-white text-xl md:text-2xl shadow-sm">
              {service.icon}
            </div>

            <div className="p-4 pt-8">
              <h2 className="font-semibold text-base md:text-lg">
                {service.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
