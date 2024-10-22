import { action, computed, observable } from 'mobx';
import { ICartItem } from '../store/CartItem.ts';

class CartModel {
  @observable private _name: string;
  @observable private _items: ICartItem[];

  constructor(items: ICartItem[] = [], name: string) {
    this._items = items;
    this._name = name;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get items(): ICartItem[] {
    return this._items;
  }

  @computed
  get totalItems(): number {
    return this._items.reduce((sum: number, item: ICartItem): number => sum + item.amount, 0) || 0;
  }

  @action
  addToCart(productId: number): void {
    const existing: ICartItem | undefined = this._items.find(p => p.productId === productId);
    if (existing) {
      alert('Цей товар вже у кошику');
    } else {
      this._items.push({ productId: productId, amount: 1 });
    }
  }

  @action
  removeFromCart(productId: number): void {
    const index: number = this._items.findIndex((p): boolean => p.productId === productId);
    if (index > -1) {
      this._items.splice(index, 1);
    }
  }

  @action
  increaseQuantity(productId: number): void {
    const item: ICartItem | undefined = this._items.find(item => item.productId === productId);
    if (item) {
      item.amount += 1;
    }
  }

  @action
  decreaseQuantity(productId: number): void {
    const item: ICartItem | undefined = this._items.find(item => item.productId === productId);
    if (item && item.amount > 1) {
      item.amount -= 1;
    }
  }

  @computed
  get discount(): number {
    const itemCount: number = this.totalItems;
    if (itemCount >= 3 && itemCount < 10) {
      return 0.07;
    } else if (itemCount >= 10) {
      return 0.10;
    }
    return 0;
  }
}

export default CartModel;
