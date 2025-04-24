import { MdClose } from "react-icons/md";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const JoinNowModal = ({ setIsJoinNowModalOpen, isJoinNowModalOpen }) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg px-2 py-5 bg-white w-[90%] sm:w-[400px]"
      >
        <div className="flex items-center justify-between px-3">
          <h1 className="text-lg text-black font-semibold">Join now</h1>
          <MdClose
            className="text-black cursor-pointer"
            onClick={() => setIsJoinNowModalOpen(false)}
            size={24}
          />
        </div>

        <div className="my-5 flex flex-col sm:flex-row gap-4 px-3">
          <button
            onClick={() => navigate("/buyer/signup")}
            className="bg-green-500 p-3 text-white rounded-lg text-lg font-semibold w-full"
          >
            Signup as a Buyer
          </button>
          <button
            onClick={() => navigate("/seller/signup")}
            className="bg-blue-500 p-3 text-white rounded-lg text-lg font-semibold w-full"
          >
            Signup as a Seller
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JoinNowModal;
