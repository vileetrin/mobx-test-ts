import { makeAutoObservable } from 'mobx';
import CartsStore from '../store/CartsStore.ts';

class CartPageVM {
    private cartStore: CartsStore;

    constructor(cartStore: CartsStore) {
        this.cartStore = cartStore;
        makeAutoObservable(this);
    }

    getCarts() {
        return Object.entries(this.cartStore.carts).map(([key, items]) => ({
            cartId: key,
            items,
            totalPrice: this.totalPrice(key),
            discount: this.cartStore.discount(key),
            totalPriceWithDiscount: this.totalPriceWithDiscount(key),
        }));
    }

    totalPrice(cartName: string): number {
        return this.cartStore.totalPrice(cartName);
    }

    totalPriceWithDiscount(cartName: string): number {
        return this.cartStore.totalPriceWithDiscount(cartName);
    }
}

export { CartPageVM };
