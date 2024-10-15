import {makeAutoObservable} from 'mobx';
import {ICartItem} from "./CartItem.ts";


class CartModel {
    private _cartItems: ICartItem[] = [];
    cartId: number;

    constructor() {
        makeAutoObservable(this);
    }

    getCartById(): ICartItem[] {
        return this._cartItems
    }

    // addToCart(product: IProductEntity) {
    //     const productInCart = this._cartItems.find(product => product.id === product.id);
    //     if(productInCart) {
    //         alert ("Цей товар вже є в кошику!")
    //     } else {
    //         this._cartItems.push(product);
    //     }
    // }

    removeFromCart(productId: number) {
        this._cartItems = this._cartItems.filter(item => item.id !== productId);
    }

    increaseQuantity(productId: number): void {
        const item = this._cartItems.find(item => item.id === productId);
        if (item) {
            item.amount += 1;
        }
    }

    decreaseQuantity(productId: number): void {
        const item = this._cartItems.find(item => item.id === productId);
        if (item && item.amount > 1) {
            item.amount -= 1;
        }
    }

    totalItems(): number {
        return this._cartItems.reduce((sum, item) => sum + item.amount, 0);
    }

    totalPrice(): number {
        return this._cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    }

    discount ():number {
        if (this.totalItems() >= 3 && this.totalItems() < 10) {
            return 0.07;
        } else if (this.totalItems() >= 10) {
            return 0.10;
        }
        return 0;
    }

    totalPriceWithDiscount(): number {
        return this.totalPrice() - this.totalPrice() * this.discount();
    }

    getProductAvailability(productId: number): { cart: string; amount: number }[] {
        const availability = [];
        const cartItem = this._cartItems.find(item => item.id === productId);
        if (cartItem) availability.push({ cart: "Cart №1", amount: cartItem.amount });
        return availability;
    }

}

export default CartModel;
