import {makeAutoObservable} from 'mobx';
import CartModel from '../Models/CartModel.ts';
import {Carts} from '../Models/Carts.ts';
import {ICartItem} from "./CartItem.ts";

class CartsStore {
    private _carts: Carts;

    constructor(carts: Carts) {
        makeAutoObservable(this);
        this._carts = carts;
    }

    get carts(): Carts {
        return this._carts;
    }

    getCarts(): Array<CartModel> {
        return Object.values(this._carts);
    }

    get totalAmount(): number {
        return Object.values(this._carts).reduce((total: number, cart: CartModel): number => {
            return total + cart.totalItems();
        }, 0);
    }

    discount(): number {
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

        for (const cart of Object.values(this._carts)) {
            const item: ICartItem | undefined = cart.items.find(item => item.productId === productId);
            if (item) {
                availability.push({cartName: cart.name, amount: item.amount});
            }
        }
        return availability;
    }

}

export default CartsStore;

