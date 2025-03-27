// import React, { useContext } from "react";
// import LeftSidebar from "./LeftSidebar";
// import RightSidebar from "./RightSidebar";
// import { GlobalContext } from "../../context/GlobalContext";

// const AdminDashboard = () => {
//   const { showDashboard } = useContext(GlobalContext);

//   return (
//     <main className="min-h-screen flex flex-col sm:flex-row">
//       {/* Left Sidebar */}
//       <div
//         className={` bg-slate-600 h-[130px] sticky top-0 z-40  sm:min-h-screen  transition-all duration-300`}
//       >
//         <LeftSidebar />
//       </div>

//       {/* Right Sidebar */}
//       <div className="flex-1 transition-all duration-300 min-h-screen">
//         <RightSidebar />
//       </div>
//     </main>
//   );
// };

// export default AdminDashboard;

import React, { useContext } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { GlobalContext } from "../../context/GlobalContext";

const AdminDashboard = () => {
  const { showDashboard } = useContext(GlobalContext);

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
