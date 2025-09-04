// import { CartItemDTO, toCartItemDTO } from './cart.dto';
import cartRepository, { ICartRepository } from './cart.repository';
import { CartItemAdd, CartItemRemove, CartItemUpdate } from './cart.schema';

export interface ICartService {
  // getItems: (userId: string) => Promise<CartItemDTO[]>;
}

class CartService implements ICartService {
  private _repository;
  constructor(repository: ICartRepository) {
    this._repository = repository;
  }

  async getItems(userId: string) {
    const cartItems = await this._repository.getItems(userId);
    return cartItems;
  }

  async addItem(userId: string, payload: CartItemAdd) {
    return await this._repository.addItem(userId, payload);
  }

  async removeItem(userId: string, payload: CartItemRemove) {
    return await this._repository.removeItem(userId, payload);
  }

  async updateItem(userId: string, payload: CartItemUpdate) {
    return await this._repository.updateItem(userId, payload);
  }

  async getTotalItems(userId: string) {
    return await this._repository.getTotalItems(userId);
  }

  async deleteAllItems(userId: string) {
    return await this._repository.deleteAllItems(userId);
  }
}

const cartService = new CartService(cartRepository);

export default cartService;
