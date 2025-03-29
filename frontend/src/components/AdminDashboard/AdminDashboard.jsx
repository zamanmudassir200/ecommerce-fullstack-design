import React, { useContext } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { GlobalContext } from "../../context/GlobalContext";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Sidebar - Sticky on mobile, fixed width on desktop */}
      <div className="sm:sticky sm:top-0 sm:h-screen sm:w-64 z-10">
        <LeftSidebar />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-x-hidden">
        <RightSidebar />
      </div>
    </div>
  );
};

export default AdminDashboard;
