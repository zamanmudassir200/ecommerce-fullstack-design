import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [showTabsData, setShowTabsData] = useState("products");
  const [showDashboard, setShowDashboard] = useState(true);
  const [productViewType, setProductViewType] = useState("list");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartNumber, setCartNumber] = useState(0);
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
      // return error;
    }
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await handleApiCall(`${url}/products/`, "get");
      console.log("fetching all products", response.data.products);
      setLoading(false);
      setProducts(response.data.products);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await handleApiCall(
        `${url}/categories/get-categories`,
        "get"
      );
      setCategories(response.data.categories);
      console.log("response from getting categories", response);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        handleApiCall,
        showTabsData,
        loading,
        setLoading,
        setShowTabsData,
        fetchCategories,
        fetchProducts,
        products,
        setProducts,
        categories,
        setCategories,
        showDashboard,
        setShowDashboard,
        productViewType,
        setProductViewType,
        cartNumber,
        setCartNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
