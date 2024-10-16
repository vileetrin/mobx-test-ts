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
            const existing = this.carts[cartName].find(p => p.id === product.id);
            if (existing) {
                alert("Цей товар вже у кошику")
            } else {
                this.carts[cartName].push({...product, amount: 1})
                this.mainCart.push({...product, amount: 1});
            }
        }
    }

    removeFromCart(cartName: string, productId: number) {
        if (this.carts[cartName]) {
            this.carts[cartName] = this.carts[cartName].filter(
                (p) => p.id !== productId);
            this.mainCart = this.mainCart.filter(p => p.id !== productId);
            console.log(this.mainCart);
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
                console.log(this.mainCart);
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
        // const callback = ((sum, item) => {
        //     const existing = sum.find(p => p.id === item.id)
        //     if (existing) {
        //         existing.amount += item.amount
        //     } else {
        //         sum.push({...item})
        //     }
        //     return sum;
        // });

        // const combined = this.mainCart.reduce((sum, item) => {
        //     console.log(sum, item)
        //     const existing = sum.find(p => p.id === item.id)
        //     if(existing){
        //         existing.amount += item.amount
        //     } else {
        //         sum.push({...item})
        //     }
        //     return sum;
        // });
        // return this.mainCart = combined;
    }
}

export default CartsStore;
