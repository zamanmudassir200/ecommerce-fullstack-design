import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TfiUser } from "react-icons/tfi";
import url from "../../utils/url";
import { useNavigate } from "react-router-dom";
import JoinNowModal from "./JoinNowModal";

const WelcomeUser = ({ user, isUserLogin }) => {
  const navigate = useNavigate();
  const [isJoinNowModalOpen, setIsJoinNowModalOpen] = useState(false);

  return (
    <div className=" flex flex-col gap-4 my-1 md:my-2">
      <div className="flex gap-2">
        <div className="bg-blue-400 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <TfiUser className="text-white text-xl md:text-2xl" />
        </div>
        <div className="text-xs md:text-sm">
          {user?.name ? (
            <>
              Hi, <b>{user?.name}</b> <br />
              Let's get started <br />
              {user.userType === "seller" && (
                <button
                  onClick={() => navigate("/seller-dashboard")}
                  className="rounded-lg bg-green-400 text-white p-2 my-2"
                >
                  Admin Dashboard
                </button>
              )}
            </>
          ) : (
            <h1 className="text-lg font-semibold"> Welcome Guest</h1>
          )}
        </div>
      </div>
      <div className="">
        {!isUserLogin && (
          <div className="flex flex-col gap-1 md:gap-2">
            <button
              onClick={() => setIsJoinNowModalOpen(true)}
              className="bg-[#127FFF] py-1 md:py-1.5 cursor-pointer rounded-md text-xs md:text-sm text-white w-full"
            >
              Join Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-xs md:text-sm py-1 md:py-1.5 w-full cursor-pointer text-[#127fff] font-medium bg-white rounded-md border border-[#127FFF]"
            >
              Log in
            </button>
          </div>
        )}
      </div>

      {isJoinNowModalOpen && (
        <JoinNowModal setIsJoinNowModalOpen={setIsJoinNowModalOpen} />
      )}
    </div>
  );
};

export default WelcomeUser;
