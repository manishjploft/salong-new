import axios from "axios";
// import { CartItemWithVariants } from "./cart.dto";
import { CartItemAdd, CartItemRemove, CartItemUpdate } from "./cart.schema";

export interface ICartRepository {
  queryTags: {
    getItems: "cart_get_items";
    getTotalItems: "cart_get_total_items";
  };
  getItems: (userId: string) => Promise<void[]>;
  addItem: (userId: string, payload: CartItemAdd) => Promise<void>;
  removeItem: (userId: string, payload: CartItemRemove) => Promise<void>;
  updateItem: (userId: string, payload: CartItemUpdate) => Promise<void>;
  getTotalItems: (userId: string) => Promise<number>;
  deleteAllItems: (userId: string) => Promise<void>;
}

class CartRepository implements ICartRepository {
  private _baseUrl = `${process.env.NEXT_PUBLIC_API_URL}cart`; // Base URL for all cart actions

  private _queryTags = {
    getItems: "cart_get_items" as const,
    getTotalItems: "cart_get_total_items" as const,
  };

  constructor() {}

  get queryTags() {
    return this._queryTags;
  }

  // Get items in the cart
  async getItems(userId: string) {
    const url = `${this._baseUrl}/${userId}/items`;
    try {
      const response = await axios.get(url);
      // console.log("response", response.data.data);

      return response.data?.data;
    } catch (error: any) {
      console.error("Error fetching cart items:", error.response);
      throw error;
    }
  }

  // Add item to the cart
  async addItem(userId: string, payload: CartItemAdd) {
    const url = `${this._baseUrl}/${userId}/add`;
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
      
    } catch (error:any) {
      console.error("Error adding item to cart1:", error.response.data);
      return error.response.data;
    }
  }

  // Remove item from the cart
  async removeItem(userId: string, payload: CartItemRemove) {
    const url = `${this._baseUrl}/${userId}/remove`;

    try {
      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  }

  // Update item quantity in the cart
  async updateItem(userId: string, payload: CartItemUpdate) {
    const url = `${this._baseUrl}/${userId}/update`;
    try {
      await axios.put(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }

  // Get the total number of items in the cart
  async getTotalItems(userId: string) {
    const url = `${this._baseUrl}/${userId}/total`;
    
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching total items:", error);
      throw error;
    }
  }

  // Delete all items in the cart
  async deleteAllItems(userId: string) {
    const url = `${this._baseUrl}/${userId}/delete`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error("Error deleting all items from cart:", error);
      throw error;
    }
  }
}

// Create an instance of CartRepository
const cartRepository = new CartRepository();

export default cartRepository;
