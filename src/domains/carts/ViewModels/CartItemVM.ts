import { makeAutoObservable } from 'mobx';
import { ICartItem } from '../store/CartItem.ts';
import CartsStore from "../store/CartsStore.ts";

export class CartItemVM {
    private cartsStore: CartsStore;
    private cartName: string;
    public product: ICartItem;

    constructor(cartsStore: CartsStore, cartName: string, product: ICartItem) {
        this.cartsStore = cartsStore;
        this.cartName = cartName;
        this.product = product;
        makeAutoObservable(this);
    }

    increaseQuantity() {
        this.cartsStore.increaseQuantity(this.product.id, this.cartName);
    }

    decreaseQuantity() {
        this.cartsStore.decreaseQuantity(this.product.id, this.cartName);
    }

    removeFromCart() {
        this.cartsStore.removeFromCart(this.cartName, this.product.id);
    }

    get totalPrice(): number {
        return this.product.price * this.product.amount;
    }
}

export default CartItemVM;