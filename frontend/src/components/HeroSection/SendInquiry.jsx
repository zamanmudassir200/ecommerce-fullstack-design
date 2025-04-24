import React from "react";

const SendInquiry = () => {
  return (
    <main className="relative h-auto min-h-[500px] sm:h-[420px] overflow-hidden rounded-md">
      {/* Background Image */}
      <img
        className="absolute h-full w-full object-cover"
        src="./Group 982.png"
        alt="Supplier inquiry background"
        loading="lazy"
      />

      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col sm:block">
        {/* Text Content - Hidden on small screens */}
        <div className="hidden sm:block absolute top-6 left-7 text-white">
          <h1 className="font-bold mb-4 text-2xl sm:text-3xl lg:text-[32px] w-full sm:w-[440px]">
            An easy way to send requests to all suppliers
          </h1>
          <p className="text-base sm:text-lg lg:text-[17px] w-full sm:w-[390px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        {/* Form - Always visible */}
        <div className="relative sm:absolute bg-white rounded-md p-4 sm:p-6 mx-auto sm:mx-0 sm:right-8 sm:top-8 w-[90%] sm:w-[491px] max-w-full mt-10 sm:mt-0 sm:h-[364px]">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Send quote to suppliers
          </h1>
          <form className="flex flex-col gap-4 sm:gap-5">
            <input
              className="p-2 border border-gray-300 rounded-md"
              type="text"
              placeholder="What item you need?"
            />
            <textarea
              className="p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Type more details"
            ></textarea>

            <div className="flex gap-3">
              <input
                className="border border-gray-300 p-2 rounded-md flex-1"
                type="number"
                placeholder="Quantity"
              />
              <select className="border border-gray-300 p-2 rounded-md w-[90px]">
                <option value="">Pcs</option>
              </select>
            </div>

            <button
              className="px-4 cursor-pointer rounded-md text-base sm:text-lg py-2 bg-[#127FFF] text-white self-start"
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
