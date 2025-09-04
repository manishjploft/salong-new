"use server";

import axios from "axios";

export async function fetchFeaturedCategories() {
  try {
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "category-with-product-count"
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchProductPageTopMenu(
  brand: any = null,
  category: any = null
) {
  try {

    let url = process.env.NEXT_PUBLIC_API_URL + "product-top-menu?";

    // Append category as a query parameter if provided
    if (category) {
      const firstCategory = category; // Get the first part before the comma
      url += `&category=${firstCategory}`;
    }

    // Append category as a query parameter if provided
    if (brand) {
      url += `&brand=${brand}`;
    }
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(url);

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchProductPageTopMenuWithCategory(
  brand: any = null,
  category: any = null,
  mainCategoryByGetCategory: null,
  mainCategory: any = null,
  subCategory: any = null,
  childSubCategory: any = null
) {
  try {
    let url =
      process.env.NEXT_PUBLIC_API_URL +
      "product-top-menu-with-category?mainCategory=" +
      mainCategoryByGetCategory;

    // Append category as a query parameter if provided
    if (mainCategory) {
      const firstCategory = mainCategory; // Get the first part before the comma
      url += `&firstCategory=${firstCategory}`;
    }

    // Append category as a query parameter if provided
    if (subCategory) {
      const secondCategory = subCategory; // Get the first part before the comma
      url += `&secondCategory=${secondCategory}`;
    }

    // Append category as a query parameter if provided
    if (childSubCategory) {
      const thirdCategory = childSubCategory; // Get the first part before the comma
      url += `&thirdCategory=${thirdCategory}`;
    }

    // Append category as a query parameter if provided
    if (category) {
      const firstCategory = category; // Get the first part before the comma
      url += `&category=${firstCategory}`;
    }

    // Append category as a query parameter if provided
    if (brand) {
      url += `&brand=${brand}`;
    }

    // Sending GET request using axios to fetch featured products
    const res = await axios.get(url);

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchSaleOnProducts() {
  try {
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "sale-products"
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching sale on products 1:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchCategorieDetail(slug: any = null) {
  try {
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "category-detail/" + slug
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching category detail:", error);
    return []; // Return an empty array in case of an error
  }
}
