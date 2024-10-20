import {makeAutoObservable} from 'mobx';
import ProductsStore from "../../products/store/ProductsStore.ts";
import {IProductEntity} from "../../products/store/Product.ts";
import CartModel from "../Models/CartModel.ts";


export class CartItemVM {
    private _productsStore: ProductsStore;
    private _cart: CartModel

    constructor(productsStore: ProductsStore, cart: CartModel) {
        makeAutoObservable(this);
        this._productsStore = productsStore;
        this._cart = cart;
    }

    getProductById(productId: number): IProductEntity{
        return <IProductEntity>this._productsStore.getProductById(productId);
    }

    decreaseQuantity(productId: number) {
        this._cart.decreaseQuantity(productId);
    }

    increaseQuantity(productId: number) {
        this._cart.increaseQuantity(productId);
    }

    removeFromCart(productId: number) {
        this._cart.removeFromCart(productId);
    }

    totalPrice(): number {
        return this._cart.items.reduce((sum, item) => {
            const product = this.getProductById(item.productId);
            return sum + (product.price * item.amount);
        }, 0);
    }

    discount(): number {
        const itemCount = this._cart.totalItems();
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

    handleCheckout(): string {
        const orderDetails: string = this._cart.items
            .map((item): string => {
                const product = this.getProductById(item.productId);
                return `Name: ${product.name}, Price: $${product.price}, Quantity: ${item.amount}`;
            })
            .join('\n');

        const totalPriceWithDiscount = this.totalPriceWithDiscount().toFixed(2);

        return `Order details:\n${orderDetails}\nTotal Price: $${totalPriceWithDiscount}`;
    }
}

export default CartItemVM;