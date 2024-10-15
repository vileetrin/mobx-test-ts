import { makeAutoObservable } from 'mobx';
import { ICartItem } from "./CartItem.ts";
import { cartsFactory } from "../../../infrastructure/CartListService.ts";

class CartsStore {
    carts: { [key: string]: ICartItem[] };
    mainCart: ICartItem[];

    constructor() {
        makeAutoObservable(this);
        this.carts = cartsFactory.carts;
        this.mainCart = [];
    }

    addToCart(cartName: string, product: ICartItem) {
        if (this.carts[cartName]) {
            this.carts[cartName].push(product);
            this.mainCart.push(product);
        }
    }

    removeFromCart(cartName: string, productId: number) {
        if (this.carts[cartName]) {
            this.carts[cartName] = this.carts[cartName].filter(
                (p) => p.id !== productId
            );
            this.mainCart = this.mainCart.filter(p => p.id !== productId);
        }
    }

    increaseQuantity(productId: number, cartName: string) {
        const item = this.carts[cartName]?.find(item => item.id === productId);
        if (item) {
            item.amount += 1;
            const mainCartItem = this.mainCart.find(p => p.id === productId);
            if (mainCartItem) {
                mainCartItem.amount += 1;
            }
        }
    }

    decreaseQuantity(productId: number, cartName: string) {
        const item = this.carts[cartName]?.find(item => item.id === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
            const mainCartItem = this.mainCart.find(p => p.id === productId);
            if (mainCartItem) {
                mainCartItem.amount -= 1;
            }
        }
    }

    totalItems(cartName: string): number {
        return this.carts[cartName]?.reduce((sum, item) => sum + item.amount, 0) || 0;
    }

    totalPrice(cartName: string): number {
        return this.carts[cartName]?.reduce((sum, item) => sum + item.price * item.amount, 0) || 0;
    }

    discount(cartName: string): number {
        const itemCount = this.totalItems(cartName);
        if (itemCount >= 3 && itemCount < 10) {
            return 0.07;
        } else if (itemCount >= 10) {
            return 0.10;
        }
        return 0;
    }

    totalPriceWithDiscount(cartName: string): number {
        return this.totalPrice(cartName) - this.totalPrice(cartName) * this.discount(cartName);
    }

    getProductAvailability(productId: number): { cart: string; amount: number }[] {
        const availability = [];
        for (const [cartName, items] of Object.entries(this.carts)) {
            const item = items.find(item => item.id === productId);
            if (item) {
                availability.push({ cart: cartName, amount: item.amount });
            }
        }
        return availability;
    }

    getMainCart() {
        return this.mainCart;
    }
}

export default CartsStore;
