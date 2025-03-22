import React, { useContext } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { GlobalContext } from "../../context/GlobalContext";

const AdminDashboard = () => {
  const { showDashboard } = useContext(GlobalContext);

  return (
    <main className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Sidebar */}
      <div
        className={` bg-slate-600 h-[130px] sticky top-0 z-40  sm:min-h-screen  transition-all duration-300`}
      >
        <LeftSidebar />
      </div>

      {/* Right Sidebar */}
      <div className="flex-1 transition-all duration-300 min-h-screen">
        <RightSidebar />
      </div>
    </main>
  );
};

export default AdminDashboard;
