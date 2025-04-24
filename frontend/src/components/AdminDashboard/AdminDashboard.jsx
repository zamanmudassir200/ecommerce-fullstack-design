import React, { useContext, useEffect, lazy, Suspense } from "react";
const LeftSidebar = lazy(() => import("./LeftSidebar"));
const RightSidebar = lazy(() => import("./RightSidebar"));
import url from "../../utils/url.js";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { handleApiCall } = useContext(GlobalContext);
  const navigate = useNavigate();
  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${url}/checkAuth`, "get");

      if (response.data.user.userType === "buyer") {
        navigate("/");
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Sidebar - Sticky on mobile, fixed width on desktop */}
      <div className="sm:sticky sm:top-0 sm:h-screen sm:w-64 z-10">
        <Suspense
          fallback={
            <div className={`text-center flex items-center h-screen `}>
              Loading...
            </div>
          }
        >
          {" "}
          <LeftSidebar />
        </Suspense>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-x-hidden">
        <Suspense
          fallback={
            <div className={`text-center flex items-center h-screen `}>
              Loading...
            </div>
          }
        >
          {" "}
          <RightSidebar />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminDashboard;
