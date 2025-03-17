import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [showTabsData, setShowTabsData] = useState("products");
  const [showDashboard, setShowDashboard] = useState(true);

  const [products, setProducts] = useState([]);
  const handleApiCall = async (url, method, data) => {
    try {
      const response = await axios({
        url,
        method,
        data,
        withCredentials: true,
      });
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        handleApiCall,
        showTabsData,
        setShowTabsData,
        products,
        setProducts,
        showDashboard,
        setShowDashboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
