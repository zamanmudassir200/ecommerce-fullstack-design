import React, { Suspense, lazy, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const HeroSection = lazy(() => import("./HeroSection/HeroSection"));

const Home = () => {
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
        <HeroSection />
      </Suspense>
    </div>
  );
};

export default Home;
