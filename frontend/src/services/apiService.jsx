import handleApiCall from "../context/GlobalContext.jsx";
import url from "../utils/url.js";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await handleApiCall(`${url}/products/`, "get");
    return response.data.products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// Fetch Categories
export const fetchCategories = async () => {
  try {
    const response = await handleApiCall(
      `${url}/products/get-categories`,
      "get"
    );
    return response.data.categories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

// Check User Login Status
export const checkUserLoggedIn = async () => {
  try {
    const response = await handleApiCall(`${url}/checkAuth`, "get");
    return response.data;
  } catch (error) {
    throw new Error("Error checking login status");
  }
};
