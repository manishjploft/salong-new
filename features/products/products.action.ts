"use server";

import axios from "axios";
import { auth } from "@/utils/auth.util";

export async function fetchProducts(
  page = 1,
  brand: any = null,
  category: any = null,
  sizeFilters: any = null,
  skinTypeFilters: any = null,
  colorFilters: any = null,
  type: any = null,
  mainCategoryFilters: any = null,
  brandSlug: any = null
) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    let url = `${process.env.NEXT_PUBLIC_API_URL}product-page?page=${page}`;

    if (brandSlug) {
      url += `&brandSlug=${brandSlug}`;
    }
    if (type) {
      url += `&type=${type}`;
    }
    // Append category as a query parameter if provided
    if (category) {
      url += `&category=${category}`;
    }

    // Append category as a query parameter if provided
    if (brand) {
      url += `&brand=${brand}`;
    }

    if (sizeFilters) {
      url += `&size=${sizeFilters}`;
    }

    if (skinTypeFilters) {
      url += `&skinType=${skinTypeFilters}`;
    }

    if (colorFilters) {
      url += `&color=${colorFilters}`;
    }

    if (mainCategoryFilters && mainCategoryFilters.length > 0) {
      url += `&mainCategoryFilters=${mainCategoryFilters}`;
    }
    //console.log("url", url);
    // Sending GET request to fetch products
    const res = await axios.get(url, { headers });

    // Return the data from the API response
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchProductsWithCategory(
  page = 1,
  brand: any = null,
  category: any = null,
  sizeFilters: any = null,
  skinTypeFilters: any = null,
  colorFilters: any = null,
  type: any = null,
  categoryBy: any = null,
  mainCategory: any = null,
  subCategory: any = null,
  childSubCategory: any = null
) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    let url = `${process.env.NEXT_PUBLIC_API_URL}product-page-with-category?page=${page}`;

    if (type) {
      url += `&type=${type}`;
    }
    // Append category as a query parameter if provided
    if (category) {
      url += `&category=${category}`;
    }

    // Append category as a query parameter if provided
    if (brand) {
      url += `&brand=${brand}`;
    }

    if (sizeFilters) {
      url += `&size=${sizeFilters}`;
    }

    if (skinTypeFilters) {
      url += `&skinType=${skinTypeFilters}`;
    }

    if (colorFilters) {
      url += `&color=${colorFilters}`;
    }

    if (categoryBy) {
      url += `&categoryBy=${categoryBy}`;
    }

    if (mainCategory) {
      url += `&mainCategory=${mainCategory}`;
    }

    if (subCategory) {
      url += `&subCategory=${subCategory}`;
    }

    if (childSubCategory) {
      url += `&childSubCategory=${childSubCategory}`;
    }
    //console.log("urllllll", url);

    // Sending GET request to fetch products
    const res = await axios.get(url, { headers });

    // Return the data from the API response
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchProductDetail(slug: any) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `product/${slug}`,
      { headers }
    );

    // Assuming the response data contains the list of products
    return res.data.data; // Return the data as it is from the API response
  } catch (error: any) {
    console.error("Error fetching products:", error?.response?.status);
    return 404; // Return an empty array in case of an error
  }
}

export async function fetchFeaturedProducts() {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "featured-products",
      { headers }
    );
    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchSaleOnProducts() {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "sale-products",
      { headers }
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching sale on products 4:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchSeeOurProducts(type: string) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `our-products/${type}`,
      { headers }
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching sale on products 5:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchSearchProducts(search: string) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    let url = `${process.env.NEXT_PUBLIC_API_URL}navbar-search`;

    // Append search as a query parameter if provided
    if (search) {
      url += `?search=${search}`;
    }

    // Sending GET request to fetch products
    const res = await axios.get(url, { headers });
    // Return the data from the API response
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}
