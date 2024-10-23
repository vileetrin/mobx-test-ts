import { computed, makeObservable, observable } from 'mobx';
import CartModel from '../Models/CartModel.ts';
import { ICartItem } from './CartItem.ts';


class CartsStore {
  private _carts: Array<CartModel>;

  constructor(carts: Record<string, CartModel>) {
    this._carts = Object.values(carts);
    makeObservable(this, {
      carts: computed,
      totalAmount: computed,
      discount: computed,
      getProductAvailability: observable,
    });
  }

  get carts(): Array<CartModel> {
    return this._carts;
  }

  get totalAmount(): number {
    return this._carts.reduce((total: number, cart: CartModel): number => {
      return total + cart.totalItems;
    }, 0);
  }

  get discount(): number {
    const itemCount: number = this.totalAmount;
    if (itemCount >= 3 && itemCount < 10) {
      return 0.07;
    } else if (itemCount >= 10) {
      return 0.10;
    }
    return 0;
  }

  getProductAvailability(productId: number): Array<{ cartName: string; amount: number }> {
    const availability = [];

    for (const cart of this._carts) {
      const item: ICartItem | undefined = cart.items.find(item => item.productId === productId);
      if (item) {
        availability.push({ cartName: cart.name, amount: item.amount });
      }
    }
    return availability;
  }
}

export default CartsStore;
