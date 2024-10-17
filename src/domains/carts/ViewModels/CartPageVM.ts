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

    getMainCart(){
        return this.cartStore.getMainCart();
    }


    totalPrice(cartName: string): number {
        return this.cartStore.totalPrice(cartName);
    }

    totalPriceWithDiscount(cartName?: string): number {
        if(cartName){
            return this.cartStore.totalPriceWithDiscount(cartName);
        } else {
            return this.cartStore.totalPriceWithDiscount();
        }
    }

    mainDiscount(): number {
        return this.cartStore.mainDiscount();
    }

    handleCheckout ()  {
        const orderDetails: string = this.getMainCart()
            .map(item => `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`)
            .join('\n');

        return `Order details:\n${orderDetails}\nTotal Price: $${this.totalPriceWithDiscount().toFixed(2)}`;
    };
}

export { CartPageVM };
