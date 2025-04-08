import axios, { isAxiosError } from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [showTabsData, setShowTabsData] = useState("order history");
  const [showDashboard, setShowDashboard] = useState(true);
  const [productViewType, setProductViewType] = useState("list");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartNumber, setCartNumber] = useState(0);
  const [sellersAllProducts, setSellersAllProducts] = useState([]);

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
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        return error?.response?.data?.message;
      }
    }
  };
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await handleApiCall(`${url}/products/`, "get");
  //     console.log("fetching all products", response?.data?.products);
  //     setLoading(false);
  //     setProducts(response.data.products);
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(`${error?.reponse?.data}`);
  //   }
  // };

  return (
    <GlobalContext.Provider
      value={{
        handleApiCall,
        setSellersAllProducts,
        sellersAllProducts,
        showTabsData,
        loading,
        setLoading,
        setShowTabsData,
        // fetchCategories,
        // fetchProducts,
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
