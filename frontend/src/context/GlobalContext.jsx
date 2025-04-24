import axios, { isAxiosError } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const GlobalContext = createContext(null);
import myurl from "../utils/url";

export const GlobalContextProvider = ({ children }) => {
  const [showTabsData, setShowTabsData] = useState("products");
  const [showDashboard, setShowDashboard] = useState(true);
  const [productViewType, setProductViewType] = useState("list");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartNumber, setCartNumber] = useState(0);
  const [sellersAllProducts, setSellersAllProducts] = useState([]);
  // const [productReviews, setProductReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const handleApiCall = useCallback(async (url, method, data) => {
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
  });

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
  const checkUserLoggedIn = async () => {
    try {
      const response = await handleApiCall(`${myurl}/checkAuth`, "get");
      console.log("response from context checkauth:", response);
      if (response.data.loggedIn) {
        setIsUserLogin(true);
        setUser(response?.data?.user);
      } else {
        navigate("/login");
        setIsUserLogin(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <GlobalContext.Provider
      value={{
        handleApiCall,
        checkUserLoggedIn,
        setSellersAllProducts,
        sellersAllProducts,
        showTabsData,
        loading,
        setLoading,

        // productReviews,
        // setProductReviews,
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
        themeMode,
        setThemeMode,
        setCartNumber,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
