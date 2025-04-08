import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { AiOutlineProduct } from "react-icons/ai";
import { MdHistoryToggleOff } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Logout from "./Logout";

const tabs = [
  { name: "products", label: "Products", icon: <AiOutlineProduct size={20} /> },
  {
    name: "order history",
    label: "Order History",
    icon: <MdHistoryToggleOff size={20} />,
  },
];

const LeftSidebar = () => {
  const { setShowTabsData } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState("order history");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setShowTabsData(tabName);
    setActiveTab(tabName);
  };

  return (
    <div className="p-4 bg-slate-600 sm:min-h-screen sm:w-64 transition-all duration-300">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex flex-col cursor-pointer items-center text-white hover:text-gray-200 transition-colors"
        >
          <IoIosLogOut size={24} />
          <span className="text-xs sm:text-sm">Logout</span>
        </button>
      </div>

      <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 overflow-x-auto sm:overflow-x-visible">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg transition-colors ${
              activeTab === tab.name
                ? "bg-white text-black font-bold"
                : "text-white hover:bg-slate-500"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm sm:text-base">{tab.label}</span>
          </button>
        ))}
      </div>

      {isLogoutModalOpen && (
        <Logout setIsLogoutModalOpen={setIsLogoutModalOpen} />
      )}
    </div>
  );
};

export default LeftSidebar;
