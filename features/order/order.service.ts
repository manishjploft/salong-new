import axios from "axios";
import cartRepository, { ICartRepository } from "./cart.repository";
import { OrderItemAdd } from "./order.schema";

export interface ICartService {
  // getItems: (userId: string) => Promise<CartItemDTO[]>;
}

class OrderService implements ICartService {
  private _baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  private _repository;
  constructor(repository: ICartRepository) {
    this._repository = repository;
  }

  async getItems(accessToken: string) {
    const url = `${this._baseUrl}orders`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data?.data;
    } catch (error: any) {
      console.error("Error fetching cart items:", error.response);
      throw error;
    }
  }

  async getItemDetail(accessToken: string, orderNo: string) {
    const url = `${this._baseUrl}order/${orderNo}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      // console.error("Error fetching order item:", error.response);
      throw error.response?.data;
    }
  }

  async addItem(accessToken: string, payload: OrderItemAdd) {
    const url = `${this._baseUrl}checkout`;
    try {
      
      const checkout: any = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      
      
      return checkout;
    } catch (error: any) {
      console.error("Error adding item to order:", error.response.data);
      throw error;
    }
  }
}

const orderService = new OrderService(cartRepository);

export default orderService;
