"use server";
import { revalidateTag } from "next/cache";
import { getUserInfo } from "../auth/actions/session.action";

import orderService from "./order.service";
import cartRepository from "./cart.repository";

export async function fetchOrders() {
  try {
    const user = await getUserInfo();

    if (!user || !user.id) {
      console.log("No user or invalid user ID.");
      return [];
    }

    const orderData = await orderService.getItems(user.accessToken);

    if (!orderData) {
      console.log("Order data is empty or null.");
      return [];
    }

    return orderData;
  } catch (error) {
    console.error("Error fetching Order:", error);
    return [];
  }
}

export async function fetchOrderDetail(orderNo: string) {
  try {
    const user = await getUserInfo();

    if (!user || !user.id) {
      console.log("No user or invalid user ID.");
      return {};
    }

    const orderData = await orderService.getItemDetail(user.accessToken, orderNo);
    if (!orderData) {
      console.log("Order data is empty or null.");
      return {};
    }
    return orderData;
  } catch (error) {
    console.error("Error fetching Order:", error);
    return error;
  }
}

export async function addToOrder(payload: any) {
  try {
    const user = await getUserInfo();
    // console.log("User Info:", user);

    if (!user || !user.id) {
      console.log("No user or invalid user ID.");
      return [];
    }
    // console.log("Fetching cart for User ID:", user.id);
    const data = await orderService.addItem(user.accessToken, payload);
    revalidateTag(cartRepository.queryTags.getTotalItems);
    return data.data;
  } catch (error: any) {
    // console.error("Error fetching cart:", error.response);
    return error.response.data;
  }
}
