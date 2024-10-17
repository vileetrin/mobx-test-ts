import { makeAutoObservable } from 'mobx';
import { ICartItem } from "../store/CartItem.ts";

class CartModel {
    private _items: ICartItem[];

    constructor(items: ICartItem[] = []) {
        makeAutoObservable(this);
        this._items = items;
    }

    get items() {
        return this._items;
    }

    totalPrice(): number {
        return this._items.reduce((total, item) => total + item.price * item.amount, 0);
    }

    totalItems(): number {
        return this._items.reduce((total, item) => total + item.amount, 0);
    }
}

export default CartModel;
