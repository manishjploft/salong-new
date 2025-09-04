"use server";

// import { revalidateTag } from "next/cache";
import { createServerAction } from "zsa";

import { getUserInfo } from "../auth/actions/session.action";
import { protectedProcedure } from "../auth/auth.procedure";
import cartRepository from "./cart.repository";
// import cartRepository from "./cart.repository";
import {
  CartItemAddSchema,
  CartItemRemoveSchema,
  CartItemUpdateSchema,
} from "./cart.schema";
import cartService from "./cart.service";
import { revalidateTag } from "next/cache";

export async function fetchCartItems() {
  try {
    
    const user = await getUserInfo();

    if (!user || !user.id) {
      console.log("No user or invalid user ID.");
      return [];
    }

    // console.log("Fetching cart for User ID:", user.id);
    const cartData = await cartService.getItems(user.id);

    if (!cartData) {
      console.log("Cart data is empty or null.");
      return [];
    }

    return cartData;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
}

export const addToCart = protectedProcedure
  .createServerAction()
  .input(CartItemAddSchema)
  .handler(async ({ input, ctx }) => {
    try {
      
      const cartData: any = await cartService.addItem(ctx.id, input);
      
      // Make sure to return a single response object
      if (cartData.status === "400") {
        return {
          status: cartData.status,
          msg: cartData.msg,
        };
      }
      revalidateTag(cartRepository.queryTags.getTotalItems);
      return {
        status: "200",
        msg: "Item added to cart successfully.",
      };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        status: "500",
        msg: "An error occurred while adding the item to the cart.",
      };
    }
  });

export const removeFromCart = protectedProcedure
  .createServerAction()
  .input(CartItemRemoveSchema)
  .handler(async ({ input, ctx }) => {
    await cartService.removeItem(ctx.id, input);
    // revalidateTag(cartRepository.queryTags.getItems);
    revalidateTag(cartRepository.queryTags.getTotalItems);
  });

export const updateCartItem = protectedProcedure
  .createServerAction()
  .input(CartItemUpdateSchema)
  .handler(async ({ input, ctx }) => {
    await cartService.updateItem(ctx.id, input);
    // revalidateTag(cartRepository.queryTags.getItems);
    revalidateTag(cartRepository.queryTags.getTotalItems);
  });

export const fetchCartTotalItems = protectedProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    return await cartService.getTotalItems(ctx.id);
  });
