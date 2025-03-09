import React from "react";

const HomeAndOutDoor = ({ title, img }) => {
  const items = [
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
    {
      name: "hello",
      price: "19",
      image: "./rasm.png",
    },
  ];
  return (
    <main className="my-5 h-[257px] border-[1px] border-gray-300 rounded-md bg-white">
      <div className=" rounded-lg mx-auto ">
        <div className="flex  ">
          <div className="h-[235px] flex-[0.3] border-r-[1px] border-gray-300">
            <div className="relative h-[256px] overflow-hidden">
              <img className="h-full w-full object-cover" src={img} alt="" />
              <div className=" absolute top-3 left-5">
                <h1 className="w-[154px] mb-4 font-bold text-xl">
                  {title} <br />
                </h1>
                <button className="px-3 cursor-pointer rounded-md py-2 text-lg font-semibold bg-white ">
                  Source now
                </button>
              </div>
            </div>
          </div>
          <div className="flex-[0.89]  w-full grid grid-cols-4 ">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-r-[1px] border-b-[1px] border-gray-300 flex flex-col relative w-[242.2px] p-3  h-[128px]"
                >
                  <h1 className="font-bold text-2xl">{item.name}</h1>
                  <p className="">
                    From <br />
                    USD {item.price}
                  </p>
                  <div className="absolute bottom-2 right-2 flex items-end justify-end ">
                    <img className="  " src={item.image} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeAndOutDoor;
