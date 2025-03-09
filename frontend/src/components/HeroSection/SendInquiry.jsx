import React from "react";

const SendInquiry = () => {
  return (
    <main className="h-[420px] overflow-hidden  rounded-md">
      <div className="relative h-full w-full overflow-hidden ">
        <img
          className="h-full w-full object-cover"
          src="./Group 982.png"
          alt=""
        />

        <div className="absolute top-6 left-7 text-white">
          <h1 className="font-bold mb-4 text-[32px] w-[440px]">
            An easy way to send requests to all suppliers
          </h1>
          <p className="text-[17px] w-[390px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
        <div className="absolute right-8 rounded-md p-6 bg-white top-8 h-[364px] w-[491px]">
          <h1 className="text-[24px] mb-4 font-bold">
            Send quote to suppliers
          </h1>
          <form className="flex flex-col gap-5" action="">
            <input
              className="p-2 border-[1px] border-gray-300 rounded-md"
              type="text"
              placeholder="What item you need?"
            />
            <textarea
              className="p-2 border-[1px] border-gray-300 rounded-md"
              name=""
              rows={3}
              cols={10}
              id=""
              placeholder="Type more details"
            ></textarea>

            <div className="flex gap-3">
              <input
                className="border-[1px] border-gray-300 p-2 rounded-md"
                type="number"
                placeholder="Quantity"
              />
              <select
                className="border-[1px] w-[90px] border-gray-300 p-2 rounded-md"
                name=""
                id=""
              >
                <option value="">Pcs</option>
              </select>
            </div>

            <button
              className="px-4 cursor-pointer rounded-md text-lg py-2 bg-[#127FFF] text-white self-start"
              type="submit"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SendInquiry;
