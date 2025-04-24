import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <BrowserRouter>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </GlobalContextProvider>
);
