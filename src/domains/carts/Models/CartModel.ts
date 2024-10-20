import { makeAutoObservable } from 'mobx';
import { ICartItem } from '../store/CartItem.ts';

class CartModel {
  private _name: string;
  private _items: ICartItem[];

  constructor(items: ICartItem[] = [], name: string) {
    makeAutoObservable(this);
    this._items = items;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get items() {
    return this._items;
  }

  totalItems(): number {
    return this._items.reduce((sum, item) => sum + item.amount, 0) || 0;

  }

  addToCart(productId: number) {
    const existing = this._items.find(p => p.productId === productId);
    if (existing) {
      alert('Цей товар вже у кошику');
    } else {
      this._items.push({ productId: productId, amount: 1 });
    }
  }

  removeFromCart(productId: number) {
    const index = this._items.findIndex((p) => p.productId === productId);
    if (index > -1) {
      this._items.splice(index, 1);
    }
  }

  increaseQuantity(productId: number) {
    const item = this._items.find(item => item.productId === productId);
    if (item) {
      item.amount += 1;
    }
  }

  decreaseQuantity(productId: number) {
    const item = this._items.find(item => item.productId === productId);
    if (item && item.amount > 1) {
      item.amount -= 1;
    }
  }

}

export default CartModel;
