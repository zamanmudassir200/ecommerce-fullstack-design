import React from "react";
import { IoSearch } from "react-icons/io5";
const OurServices = () => {
  const services = [
    {
      image: "./Mask group.png",
      icon: <IoSearch />,
      name: "Source from Industry Hubs",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch />,
      name: "Customize your product",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch />,
      name: "Fast, reliable shipping by ocean or air",
    },
    {
      image: "./Mask group.png",
      icon: <IoSearch />,
      name: "Product monitoring and inspection",
    },
  ];
  return (
    <main className="min-w-[1180px]  mb-10  min-h-[236px]">
      <h1 className="text-xl font-bold">Our extra services</h1>

      <div className="flex justify-between my-5">
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className="relative w-[280px] h-[200] bg-white border-[1px] border-gray-300"
            >
              <div className=" overflow-hidden">
                <img className="" src={service.image} alt="" />
              </div>
              <p className="absolute top-24 right-5 bg-[#D1E7FF] p-3 rounded-[50%] border-2 border-white text-2xl">
                {service.icon}
              </p>
              <div className="p-5">
                <h1 className="font-semibold w-[145px]">{service.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default OurServices;
