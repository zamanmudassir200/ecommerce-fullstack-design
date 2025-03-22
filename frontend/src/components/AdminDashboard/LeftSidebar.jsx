// LeftSidebar Component
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { AiOutlineProduct } from "react-icons/ai";
import { MdHistoryToggleOff } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import url from "../../utils/url";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
const tabs = [
  { name: "products", label: "Products", icon: <AiOutlineProduct /> },
  {
    name: "order history",
    label: "Order History",
    icon: <MdHistoryToggleOff />,
  },
];

const LeftSidebar = () => {
  const { setShowTabsData, handleApiCall } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState("products");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const handleTabClick = (tabName) => {
    setShowTabsData(tabName);
    setActiveTab(tabName);
  };

  return (
    <div className="p-5 sticky  top-0  bg-slate-600 sm:min-h-screen sm:w-72 transition-all duration-300 sm:relative sm:left-0">
      <div className="flex  mb-5 items-center justify-between">
        <h1 className="text-xl font-bold underline text-white ">Dashboard</h1>
        <div
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex flex-col text-white cursor-pointer items-center justify-center gap-1"
        >
          <IoIosLogOut
            className="text-white cursor-pointer font-extrabold"
            size={29}
          />
          <span className="text-sm">Logout</span>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-1">
        {tabs.map((tab) => (
          <p
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`${
              activeTab === tab.name
                ? "font-bold text-black underline bg-white px-2 py-2 rounded-2xl flex items-center gap-2"
                : "font-semibold text-white"
            } py-2 mt-2 flex sm:flex-row items-center gap-1 cursor-pointer`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </p>
        ))}
      </div>
      {isLogoutModalOpen && (
        <Logout setIsLogoutModalOpen={setIsLogoutModalOpen} />
      )}
    </div>
  );
};

export default LeftSidebar;
