import React from "react";
import { MdClose } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const SellerProfile = ({ setSellerProfileModalOpen, product }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute h- top-0 flex items-center justify-center z-50 w-full bottom-0 right-0 left-0 inset-0 backdrop:brightness-50 ">
      <div className=" w-full p-4 rounded-lg border-[1px] border-gray-200 bg-gray-100">
        <div className="flex items-center justify-between ">
          <h1 className=" font-semibold ">Seller's Profile</h1>
          <MdClose
            onClick={() => setSellerProfileModalOpen(false)}
            className="cursor-pointer"
            size={24}
          />
        </div>
        <div className="my-4">
          <div className="flex items-center gap-2 my-3">
            <div className="w-20 h-20 overflow-hidden">
              <img
                className="rounded-full w-full h-full object-cover "
                src={product?.user?.profilePic}
                alt=""
              />
            </div>
            <div className="">
              <h1 className="text-sm">{product?.user?.name}</h1>
            </div>
          </div>
          <div className="">
            <h1>
              <b> Address:</b> {product.user?.address?.street}{" "}
              {product.user?.address.city} {product.user?.address.postalCode}{" "}
              {product?.user?.address?.country}
            </h1>
          </div>
          <button
            onClick={() => {
              navigate(`/seller's-profile/all-products/${product?.user?._id}`);
            }}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg  text-white font-semibold my-2"
          >
            View all Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
