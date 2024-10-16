import { makeAutoObservable } from 'mobx';
// import { ICartItem } from '../store/CartItem.ts';
import CartsStore from "../store/CartsStore.ts";


export class CartItemVM {
    private cartsStore: CartsStore;
    private cartName: string;
    // public product: ICartItem;

    constructor(cartsStore: CartsStore, cartName: string) {
        this.cartsStore = cartsStore;
        this.cartName = cartName;
        // this.product = product;
        makeAutoObservable(this);
    }

    increaseQuantity(productId:number) {
        this.cartsStore.increaseQuantity(productId, this.cartName);
    }

    decreaseQuantity(productId: number) {
        this.cartsStore.decreaseQuantity(productId, this.cartName);
    }

    removeFromCart(productId: number) {
        this.cartsStore.removeFromCart(this.cartName, productId);
    }

}

export default CartItemVM;