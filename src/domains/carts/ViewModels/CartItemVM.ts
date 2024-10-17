import {makeAutoObservable} from 'mobx';
import CartsStore from "../store/CartsStore.ts";


export class CartItemVM {
    private cartsStore: CartsStore;
    private readonly cartName: string;

    constructor(cartsStore: CartsStore, cartName: string) {
        this.cartsStore = cartsStore;
        this.cartName = cartName;
        makeAutoObservable(this);
    }

    increaseQuantity(productId: number) {
        this.cartsStore.increaseQuantity(productId, this.cartName);
    }

    decreaseQuantity(productId: number) {
        this.cartsStore.decreaseQuantity(productId, this.cartName);
    }

    removeFromCart(productId: number) {
        this.cartsStore.removeFromCart(this.cartName, productId);
    }

    getCartByName() {
        return this.cartsStore.carts[this.cartName];
    }

    handleCheckout(): string {
        const orderDetails: string = this.getCartByName()
            .map(
                (item): string =>
                    `Name: ${item.name}, Price: $${item.price}, Quantity: ${item.amount}`
            )
            .join('\n');

        return (`Order details:\n${orderDetails}\nTotal Price: $${this.cartsStore.totalPriceWithDiscount('cart1').toFixed(2)}`);
    };


}

export default CartItemVM;