"use server";

import axios from "axios";
import { auth } from "@/utils/auth.util";
import qs from "querystring";
import { revalidatePath } from "next/cache";

export async function fetchUserDetails() {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "user-details",
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
    // Sending GET request using axios to fetch featured products
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "sale-products"
    );

    // Assuming the response data contains the list of featured products
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching sale on products 2:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function fetchCustomerGroup() {
  try {
    const session = await auth();
    // Sending GET request using axios to fetch featured products
    if (session) {
      const user: any = session;
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          `checkUserGroup/${user.user.organizationNumber}`
      );

      // Assuming the response data contains the list of featured products
      return res.data.data; // Return the data as it is from the API response
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching sale on products 3:", error);
    return []; // Return an empty array in case of an error
  }
}

export async function deleteAccount() {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? { Authorization: `Bearer ${user.user.accessToken}` }
      : {};
    // Sending GET request using axios to fetch featured products
    const res = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + "delete-account",
      { headers }
    );

    // Assuming the response data contains the list of featured products
    return res.data; // Return the data as it is from the API response
  } catch (error: any) {
    console.error("Error deleting account:", error.response.data);
    return error.response.data; // Return an empty array in case of an error
  }
}

export async function updateNotification({ updateData }: any) {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? {
          Authorization: `Bearer ${user.user.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      : {};
    // Sending GET request using axios to fetch featured products
    const data = qs.stringify(updateData);

    const res = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_API_URL + "update-notification",
      headers: headers,
      data: data,
    });

    revalidatePath("/minside");
    // Assuming the response data contains the list of featured products
    return res.data; // Return the data as it is from the API response
  } catch (error: any) {
    console.error("Error deleting account:", error.response.data);
    return error.response.data; // Return an empty array in case of an error
  }
}
