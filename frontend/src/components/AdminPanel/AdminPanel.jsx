import React, { Suspense, lazy } from "react";
const Signup = lazy(() => import("./Auth/Signup"));

const AdminPanel = () => {
  const { themeMode } = useContext(GlobalContext);

  return (
    <div>
      <Suspense
        fallback={
          <div
            className={`text-center flex items-center h-screen ${
              themeMode === "dark" ? "text-white" : "text-black"
            }`}
          >
            Loading...
          </div>
        }
      >
        {" "}
        <Signup title={"Seller Register "} />
      </Suspense>
    </div>
  );
};

export default AdminPanel;
