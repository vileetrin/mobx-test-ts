import { makeAutoObservable } from 'mobx';
import { ICartItem } from "../store/CartItem.ts";

class CartModel {
    private _name: string;
    private _items: ICartItem[];

    constructor(items: ICartItem[] = [], name: string) {
        makeAutoObservable(this);
        this._items = items;
        this._name = name;
    }

    get name():string {
        return this._name;
    }

    get items() {
        return this._items;
    }

    // totalPrice(): number {
    //     return this._items.reduce((total, item) => total + item.price * item.amount, 0);
    // }

    totalItems(): number {
        return this._items.reduce((sum, item) => sum + item.amount, 0) || 0;

    }

    // totalPrice(): number {
    //     return this._items.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
    // }

    discount(cartName: string): number {
        const itemCount = this.totalItems(cartName);
        if (itemCount >= 3 && itemCount < 10) {
            return 0.07;
        } else if (itemCount >= 10) {
            return 0.10;
        }
        return 0;
    }

    totalPriceWithDiscount(): number {
        return this.totalPrice() - this.totalPrice() * this.discount();

    }

    addToCart(productId: number) {
            const existing = this._items.find(p => p.productId === productId);
            if (existing) {
                alert("Цей товар вже у кошику")
            } else {
                this._items.push({productId: productId, amount: 1})
        }
    }

    removeFromCart(productId: number) {
            this._items = this._items.filter((p) => p.productId !== productId);
            console.log(this._items)

    }

    increaseQuantity(productId: number) {
        const item = this._items.find(item  => item.productId === productId);
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
