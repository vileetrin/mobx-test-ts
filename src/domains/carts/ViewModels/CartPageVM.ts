import CartsStore from '../store/CartsStore.ts';
import CartModel from "../Models/CartModel.ts";
import ProductsStore from "../../products/store/ProductsStore.ts";
import {IProductEntity} from "../../products/store/Product.ts";

class CartPageVM {
    private _cartsStore: CartsStore;
    private _productsStore: ProductsStore;

    constructor(cartStore: CartsStore, productsStore: ProductsStore) {
        this._cartsStore = cartStore;
        this._productsStore = productsStore;
    }

    getCarts(): Array<CartModel> {
        return this._cartsStore.getCarts()
    }

    getProductById(productId: number): IProductEntity {
        return <IProductEntity>this._productsStore.getProductById(productId);
    }

    cartsPrice(): number {
        return Object.values(this._cartsStore.getCarts()).reduce((total: number, cart: CartModel): number => {
            cart.items.map(item => {
                const product: IProductEntity = this.getProductById(item.productId);
                return total = total + (product.price * item.amount);
            })
            return total;
        }, 0);
    }

    discount(): number {
        return this._cartsStore.discount();
    }

    totalPriceWithDiscount(): number {
        return this.cartsPrice() - (this.cartsPrice() * this.discount());
    }

    handleCheckout(): string {
        const orderDetails: string[] = Object.values(this._cartsStore.getCarts()).map((cart: CartModel): string => {
            return cart.items.map(item => {
                const product: IProductEntity = this.getProductById(item.productId);
                return `Name: ${product.name}, Price: $${product.price}, Quantity: ${item.amount}`;
            }).join('\n');
        })
        const totalPriceWithDiscount: string = this.totalPriceWithDiscount().toFixed(2);

        return `Order details:\n${orderDetails}\nTotal Price: $${totalPriceWithDiscount}`;
    }
}

export {CartPageVM};
